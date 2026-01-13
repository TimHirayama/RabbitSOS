import {
  LayoutDashboard,
  Users,
  Rabbit,
  HeartHandshake,
  Newspaper,
  ScrollText,
  Image,
  TrendingUp,
  Settings,
  ToggleLeft,
  FileText,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: any;
  roles: string[];
  featureFlag?: string;
};

export const adminNavItems: NavItem[] = [
  {
    title: "系統總覽",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["super_admin", "admin", "volunteer"],
  },
  {
    title: "功能模組",
    href: "/admin/features",
    icon: ToggleLeft,
    roles: ["super_admin"],
  },
  {
    title: "人員管理",
    href: "/admin/users",
    icon: Users,
    roles: ["super_admin", "admin"],
    featureFlag: "module_volunteers",
  },
  {
    title: "兔子管理",
    href: "/admin/rabbits",
    icon: Rabbit,
    roles: ["super_admin", "admin", "volunteer"],
  },
  {
    title: "捐款管理",
    href: "/admin/donations",
    icon: HeartHandshake,
    roles: ["super_admin", "admin"],
    featureFlag: "module_donations",
  },
  {
    title: "公告管理",
    href: "/admin/posts",
    icon: Newspaper,
    roles: ["super_admin", "admin", "volunteer"],
    featureFlag: "module_articles",
  },
  {
    title: "募資進度",
    href: "/admin/fundraising",
    icon: TrendingUp,
    roles: ["super_admin", "admin"],
  },
  {
    title: "操作紀錄",
    href: "/admin/logs",
    icon: ScrollText,
    roles: ["super_admin"],
  },
  {
    title: "檔案管理",
    href: "/admin/files",
    icon: FileText,
    roles: ["super_admin", "admin"],
  },
  {
    title: "首頁橫幅",
    href: "/admin/banners",
    icon: Image,
    roles: ["super_admin"],
  },
  {
    title: "網站首頁",
    href: "/",
    icon: Rabbit,
    roles: ["super_admin", "admin", "volunteer"],
  },
];
