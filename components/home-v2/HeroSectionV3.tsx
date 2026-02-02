"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export function HeroSectionV3() {
  // Parallax Effect
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.5); // Move background at half speed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft Earthy Shadow for Green Background Contrast
  const textShadowStyle = {
    textShadow:
      "0px 4px 12px rgba(60, 40, 20, 0.6), 0px 2px 4px rgba(60, 40, 20, 0.8)",
  };

  return (
    <section
      className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-32 ${outfit.className} bg-sky-200`}
    >
      {/* Background Layer - Nature Scene */}
      <div
        className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: "url('/images/hero/hero-top-down-rabbits.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transform: `translateY(${offsetY * 0.3}px)`, // Parallax
          willChange: "transform",
        }}
      >
        {/* Overlay to ensure text readability against the image */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Decorative Overlay - Warm Sunlight */}
      <div className="absolute inset-0 z-1 bg-linear-to-tr from-orange-200/20 to-transparent pointer-events-none" />

      {/* Interactive Side Rabbits Container */}
      <div className="absolute inset-0 z-5 pointer-events-none flex justify-between items-end pb-10 px-4 overflow-hidden">
        {/* Left Rabbit (Eating -> Waving) */}
        <div className="group pointer-events-auto relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 -ml-4 md:ml-0 transition-transform duration-500 hover:scale-105 hover:-translate-y-4 cursor-pointer">
          {/* Default State: Eating */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 translate-y-8">
            {/* Placeholder Visual */}
            <span className="text-9xl drop-shadow-xl filter grayscale-[0.2] contrast-125">
              🐇
            </span>
          </div>
          {/* Hover State: Waving */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 -rotate-12 translate-y-4">
            <span className="text-9xl drop-shadow-2xl scale-110">👋🐇</span>
          </div>
        </div>

        {/* Right Rabbit (Sleeping -> Jumping) */}
        <div className="group pointer-events-auto relative w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 -mr-4 md:mr-0 transition-transform duration-500 hover:scale-105 hover:-translate-y-6 cursor-pointer delay-100">
          {/* Default State: Sleeping */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 translate-y-10 scale-x-[-1]">
            <span className="text-9xl drop-shadow-xl opacity-90">💤🐇</span>
          </div>
          {/* Hover State: Jumping */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 -translate-y-12 rotate-6 scale-x-[-1]">
            <span className="text-9xl drop-shadow-2xl scale-125">🌪️🐇</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg shadow-green-900/10 mb-8 animate-fade-in-up border border-green-100 cursor-default hover:scale-105 transition-transform">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-800 font-bold text-sm tracking-wide">
            緊急救援依舊進行中
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight select-none"
          style={textShadowStyle}
        >
          為每一隻兔子
          <br />
          <span className="text-orange-100">找回溫暖的家</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-xl md:text-2xl text-white font-bold mb-10 max-w-2xl mx-auto leading-relaxed shadow-green-900/50"
          style={{ textShadow: "0px 2px 4px rgba(40, 50, 20, 0.6)" }}
        >
          我們致力於救援、醫療照顧與安置流浪兔。
          <br />
          加入我們，用愛點亮牠們的生命，
          <br />
          讓每一個生命都被溫柔以待。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 justify-center relative z-20">
          <Link
            href="/adoption/apply"
            className="group inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            立即認養
          </Link>
          <Link
            href="/donate"
            className="group inline-flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm px-8 py-4 text-lg font-bold text-stone-700 shadow-md border border-white/50 transition-all hover:bg-white hover:scale-105 active:scale-95"
          >
            支持我們
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Stats Bento - Adjusted for Nature Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-16 mt-8 border-t border-white/30">
          {[
            { label: "已救援", value: "500+" },
            { label: "送養成功", value: "320+" },
            { label: "待家中", value: "85" },
            { label: "志工夥伴", value: "100+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/30 hover:bg-white/50 transition-colors group cursor-default backdrop-blur-md border border-white/40 shadow-sm"
            >
              <span className="text-3xl font-black text-white drop-shadow-md">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-white/90 drop-shadow-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
