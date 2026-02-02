"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export function HeroSectionV2() {
  // Parallax Effect
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.5); // Move background at half speed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // YouTube-style Text Outline (White text, Black stroke/shadow)
  const textOutlineStyle = {
    textShadow:
      "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
  };

  return (
    <section
      className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-32 ${outfit.className}`}
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]" // Made taller for parallax room
        style={{
          backgroundImage: "url('/images/hero/hero-top-down-rabbits.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center", // Centered vertically
          transform: `translateY(${offsetY}px)`,
          willChange: "transform",
        }}
      >
        {/* Warm Overlay - Reduced opacity to let grass show more */}
        <div className="absolute inset-0 bg-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-8 animate-fade-in-up border border-orange-100">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-orange-600 font-bold text-sm tracking-wide">
            緊急救援依舊進行中
          </span>
        </div>

        {/* Main Heading with Outline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight"
          style={textOutlineStyle}
        >
          為每一隻兔子
          <br />
          <span className="text-orange-400" style={textOutlineStyle}>
            找回溫暖的家
          </span>
        </h1>

        {/* Subheading with Outline */}
        <p
          className="text-xl md:text-2xl text-white font-bold mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)", // Softer shadow for body text
          }}
        >
          我們致力於救援、醫療照顧與安置流浪兔。
          <br />
          加入我們，用愛點亮牠們的生命，
          <br />
          讓每一個生命都被溫柔以待。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 justify-center">
          <Link
            href="/adoption/apply"
            className="group inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            立即認養
          </Link>
          <Link
            href="/donate"
            className="group inline-flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm px-8 py-4 text-lg font-bold text-stone-700 shadow-md border border-orange-100 transition-all hover:bg-white/80 hover:scale-105 active:scale-95"
          >
            支持我們
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Stats Bento - Warm Glass Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-12 mt-8 border-t border-orange-200/50">
          {[
            { label: "已救援", value: "500+" },
            { label: "送養成功", value: "320+" },
            { label: "待家中", value: "85" },
            { label: "志工夥伴", value: "100+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/40 hover:bg-white/60 transition-colors group cursor-default backdrop-blur-sm border border-white/50 shadow-sm"
            >
              <span className="text-3xl font-black text-orange-600 group-hover:text-orange-500 transition-colors">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-stone-600 group-hover:text-stone-800">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
