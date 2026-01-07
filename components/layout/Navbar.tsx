"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

const navItems = [
  { label: "找兔兔", href: "/rabbits" },
  { label: "愛心捐款", href: "/donate" },
  { label: "新手專區", href: "/posts?category=knowledge" },
  { label: "最新消息", href: "/posts?category=news" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Check active session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-sm h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
        {/* Logo - Breaking out of bounds */}
        <div className="absolute top-1/2 -translate-y-[40%] left-4 z-50 transition-transform hover:scale-105">
           <Link href="/" className="block relative">
              <div className="bg-white rounded-full p-2 shadow-lg border border-orange-100">
                <Image 
                    src="/logo.svg" 
                    alt="RabbitSOS Logo" 
                    width={90} 
                    height={90} 
                    className="w-20 h-20 md:w-24 md:h-24 object-contain"
                    priority
                />
              </div>
           </Link>
        </div>

        {/* Desktop Nav - Centered/Right aligned, pushed by logo */}
        <nav className="hidden md:flex items-center gap-8 ml-32">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-stone-600 transition-colors hover:text-orange-600 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
             {user ? (
             <Button variant="ghost" size="icon" asChild title="進入管理後台" className="rounded-full">
               <Link href="/admin">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                    {user.email?.[0].toUpperCase() || "U"}
                  </div>
               </Link>
             </Button>
          ) : (
             <Button className="rounded-full bg-stone-800 hover:bg-stone-700 text-white px-6" asChild>
                <Link href="/login">管理員登入</Link>
             </Button>
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
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
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
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex w-full items-center py-3 px-4 text-lg font-medium text-stone-600 transition-colors hover:bg-orange-50 hover:text-orange-600 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4">
                    {user ? (
                        <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                            <Link href="/admin">進入管理後台</Link>
                        </Button>
                    ) : (
                        <Button className="w-full bg-stone-800 hover:bg-stone-700" asChild>
                           <Link href="/login" onClick={() => setIsOpen(false)}>管理員登入</Link>
                        </Button>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

