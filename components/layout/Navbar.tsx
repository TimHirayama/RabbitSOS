"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, KeyRound } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Define Nav Structure
const navStructure = [
  {
    label: "關於我們",
    items: [
      { label: "協會介紹", href: "/about" },
      { label: "聯絡我們", href: "/contact" },
    ],
  },
  { label: "待認養兔寶", href: "/rabbits" },
  { label: "愛心義賣", href: "/shop" },
  { label: "救援申請", href: "/rescue" },
  { label: "志工招募", href: "/volunteer" },
  {
    label: "更多紀錄",
    items: [
      { label: "成功送養", href: "/rabbits?status=adopted" },
      { label: "救援紀錄", href: "/posts?category=rescue" },
      { label: "紀念天堂", href: "/rabbits?status=rainbow" },
    ],
  },
  {
    label: "捐款支持",
    href: "/donate",
    highlight: true,
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Easter Egg States
  const [isHovering, setIsHovering] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  // Timers
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const supabase = createClient();

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auth Check
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Desktop Hover Logic
  const handleMouseEnter = () => {
    if (user || showLogin) return; // Already logged in or shown
    setIsHovering(true);
    timerRef.current = setTimeout(() => {
      setIsHovering(false);
      setShowLogin(true);
    }, 5000); // 5 seconds
  };

  const handleMouseLeave = () => {
    if (showLogin) return; // Keep showing if already revealed
    setIsHovering(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Mobile Touch Logic
  const handleTouchStart = () => {
    if (user) return;
    setIsHovering(true); // Re-use hovering state for shake effect
    timerRef.current = setTimeout(() => {
      setIsHovering(false);
      router.push("/login"); // Direct redirect for mobile
    }, 3000); // 3 seconds for mobile
  };

  const handleTouchEnd = () => {
    setIsHovering(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-sm transition-all duration-300 ease-in-out",
        isScrolled ? "h-16" : "h-24"
      )}
    >
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
        {/* Logo Container */}
        <div
          className={cn(
            "absolute left-4 z-50 transition-all duration-500 ease-in-out flex items-center gap-2",
            isScrolled
              ? "top-1/2 -translate-y-1/2"
              : "top-1/2 -translate-y-[40%]",
            // Move logo left when login is shown (Desktop only)
            showLogin && !isScrolled ? "-translate-x-4" : ""
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onContextMenu={(e) => e.preventDefault()} // Prevent context menu on long press
        >
          <Link href="/" className="block relative z-20">
            <div
              className={cn(
                "bg-white rounded-full shadow-lg border border-orange-100 transition-all duration-300 flex items-center justify-center relative",
                isScrolled ? "p-1" : "p-2",
                isHovering &&
                  "animate-shake border-orange-300 shadow-orange-200"
              )}
            >
              <Image
                src="/logo.svg"
                alt="RabbitSOS Logo"
                width={90}
                height={90}
                className={cn(
                  "object-contain transition-all duration-300",
                  isScrolled ? "w-10 h-10" : "w-20 h-20 md:w-24 md:h-24"
                )}
                priority
              />
            </div>
          </Link>

          {/* Hidden Login Button (Desktop Reveal) */}
          <div
            className={cn(
              "transition-all duration-500 ease-in-out overflow-hidden z-10",
              showLogin ? "w-10 opacity-100 ml-2" : "w-0 opacity-0"
            )}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white border-orange-200 hover:bg-orange-50 hover:text-orange-600 shadow-sm"
              asChild
            >
              <Link href="/login" title="管理員登入">
                <KeyRound className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div
          className={cn(
            "hidden md:flex flex-1 justify-end transition-all duration-300",
            isScrolled ? "ml-16" : "ml-32"
          )}
        >
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-2">
              {navStructure.map((item, index) => {
                if (item.items) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger className="bg-transparent text-base font-medium text-stone-600 hover:text-orange-600 focus:text-orange-600 data-active:bg-orange-50 data-[state=open]:bg-orange-50">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-3 p-4 bg-white rounded-lg shadow-xl border border-stone-100/50">
                          {item.items.map((subItem) => (
                            <li key={subItem.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {subItem.label}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                if (item.highlight) {
                  return (
                    <NavigationMenuItem key={index} className="ml-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-orange-500 text-white hover:bg-orange-600 hover:text-white focus:bg-orange-600 focus:text-white font-bold px-6 rounded-full"
                          )}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent text-base font-medium text-stone-600 hover:text-orange-600 hover:bg-orange-50 focus:text-orange-600"
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Avatar - Only shown when logged in */}
          {user && (
            <div className="ml-4 pl-4 border-l">
              <Button
                variant="ghost"
                size="icon"
                asChild
                title="進入管理後台"
                className="rounded-full"
              >
                <Link href="/admin">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                    {user.email?.[0].toUpperCase() || "U"}
                  </div>
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden ml-auto">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] overflow-y-auto"
            >
              <div className="flex flex-col gap-4 mt-8 px-2">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/logo.svg"
                    alt="RabbitSOS Logo"
                    width={120}
                    height={120}
                    className="w-32 h-32 object-contain"
                  />
                </div>

                <div className="space-y-2">
                  {navStructure.map((item, index) => {
                    if (item.items) {
                      return (
                        <div key={index} className="space-y-1">
                          <div className="px-4 py-2 font-bold text-lg text-stone-800 border-b border-stone-100 flex items-center justify-between">
                            {item.label}
                            <ChevronDown className="w-4 h-4 text-stone-400" />
                          </div>
                          <div className="pl-4 space-y-1 bg-stone-50/50 rounded-lg">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block px-4 py-3 text-stone-600 hover:text-orange-600 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex w-full items-center py-3 px-4 text-lg font-medium transition-colors rounded-lg",
                          item.highlight
                            ? "bg-orange-500 text-white hover:bg-orange-600 text-center justify-center font-bold shadow-md my-4"
                            : "text-stone-600 hover:bg-orange-50 hover:text-orange-600"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Only show User button in mobile menu if logged in */}
                {user && (
                  <div className="mt-4 border-t pt-4">
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      asChild
                    >
                      <Link href="/admin">進入管理後台</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
