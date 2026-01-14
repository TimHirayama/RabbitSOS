"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Rabbit, Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { adminNavItems } from "../_config/nav";
import { useState } from "react";

interface MobileNavProps {
  profile: {
    role: string;
    full_name?: string | null;
    email?: string | null;
  };
  featureFlags: Record<string, boolean>;
}

export function AdminMobileNav({ profile, featureFlags }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // Redirect to login
    router.refresh();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="lg:hidden"
          suppressHydrationWarning
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="sm:max-w-xs flex flex-col p-6 bg-background border-r w-[300px]"
      >
        <div className="flex items-center gap-3 font-bold text-xl px-2 mb-8">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Rabbit className="h-6 w-6 text-primary" />
          </div>
          <span>RabbitSOS</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {adminNavItems.map((item) => {
            if (!item.roles.includes(profile.role)) return null;

            // Feature Flag check: Skip if flag is disabled AND user is NOT super_admin
            if (
              item.featureFlag &&
              !featureFlags?.[item.featureFlag] &&
              profile.role !== "super_admin"
            ) {
              return null;
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-4 rounded-xl px-4 py-3 text-base text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                  isActive && "bg-muted text-primary font-medium"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t space-y-4">
          <div className="flex items-center gap-4 px-4 py-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {profile.full_name?.[0] ||
                profile.email?.[0]?.toUpperCase() ||
                "U"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-base font-medium truncate">
                {profile.full_name || "使用者"}
              </span>
              <span className="text-sm text-muted-foreground truncate capitalize">
                {profile.role}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-4 py-6 h-auto text-base text-muted-foreground hover:text-red-500 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            <span>登出</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
