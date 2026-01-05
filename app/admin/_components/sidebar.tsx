'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Rabbit,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { adminNavItems } from "../_config/nav";

interface SidebarProps {
  profile: {
    role: 'admin' | 'volunteer' | 'user';
    full_name?: string | null;
    email?: string | null;
  };
}

export function AdminSidebar({ profile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // Redirect to login
    router.refresh();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background lg:flex">
      <div className="border-b p-4 lg:h-[60px] lg:px-6 flex items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Rabbit className="h-6 w-6 text-primary" />
          <span className="hidden lg:inline">RabbitSOS Admin</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-2 p-4 flex-1">
        {adminNavItems.map((item) => {
          if (!item.roles.includes(profile.role)) return null;
          
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden lg:inline">{item.title}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto border-t p-4 space-y-4">
         <div className="hidden lg:flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {profile.full_name?.[0] || profile.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
               <span className="text-sm font-medium truncate">{profile.full_name || "使用者"}</span>
               <span className="text-xs text-muted-foreground truncate capitalize">{profile.role}</span>
            </div>
         </div>

         <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-red-500" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
            <span className="hidden lg:inline">登出</span>
         </Button>
      </div>
    </aside>
  );
}
