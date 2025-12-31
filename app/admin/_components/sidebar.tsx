'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Rabbit,
  HeartHandshake,
  Newspaper,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface SidebarProps {
  role: 'admin' | 'volunteer' | 'user';
}

export function AdminSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // Redirect to login
    router.refresh();
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      roles: ['admin', 'volunteer']
    },
    {
      title: "志工管理",
      href: "/admin/users",
      icon: Users,
      roles: ['admin'] // Admin only
    },
    {
      title: "兔子管理",
      href: "/admin/rabbits",
      icon: Rabbit,
      roles: ['admin', 'volunteer']
    },
    {
      title: "捐款核對",
      href: "/admin/donations",
      icon: HeartHandshake,
      roles: ['admin', 'volunteer']
    },
    {
      title: "公告管理",
      href: "/admin/posts",
      icon: Newspaper,
      roles: ['admin', 'volunteer']
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex lg:w-64">
      <div className="border-b p-4 lg:h-[60px] lg:px-6 flex items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Rabbit className="h-6 w-6 text-primary" />
          <span className="hidden lg:inline">RabbitSOS Admin</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          if (!item.roles.includes(role)) return null;
          
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
      <div className="mt-auto p-4 border-t">
         <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-red-500" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
            <span className="hidden lg:inline">登出</span>
         </Button>
      </div>
    </aside>
  );
}
