
import {
  LayoutDashboard,
  Users,
  Rabbit,
  HeartHandshake,
  Newspaper,
  ScrollText,
  Image
} from "lucide-react";

export const adminNavItems = [
    {
      title: "回到首頁",
      href: "/",
      icon: Rabbit,
      roles: ['admin', 'volunteer']
    },
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
    {
      title: "操作紀錄",
      href: "/admin/logs",
      icon: ScrollText,
      roles: ['admin', 'volunteer']
    },
    {
      title: "首頁橫幅",
      href: "/admin/banners",
      icon: Image,
      roles: ['admin', 'volunteer']
    },
];
