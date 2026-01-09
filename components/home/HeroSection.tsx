"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden pt-16">
      {/* Background with warm gradient overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?q=80&w=1974&auto=format&fit=crop"
          alt="Rabbit Banner"
          className="w-full h-full object-cover object-center"
        />
        {/* Left-heavy gradient to make text readable */}
        <div className="absolute inset-0 bg-linear-to-r from-orange-100/90 via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Leaves Animation */}
      <div
        id={styles.leaves}
        aria-hidden="true"
        className="pointer-events-none"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <i key={i}></i>
        ))}
      </div>

      <div className="relative z-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          <div className="inline-block mb-4 animate-fade-in-up delay-100">
            <span className="bg-white/80 backdrop-blur-sm text-orange-600 px-5 py-1.5 rounded-full text-base font-bold shadow-sm border border-orange-200">
              🐇 歡迎來到流浪兔保護協會
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-noto-sans-tc text-stone-800 drop-shadow-sm tracking-tight leading-tight animate-fade-in-up delay-300">
            給浪兔一個
            <br />
            <span className="text-orange-600 block mt-2">溫暖的家</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 text-stone-700 font-medium leading-relaxed drop-shadow-md animate-fade-in-up delay-500 bg-white/30 backdrop-blur-[2px] p-2 rounded-lg -ml-2">
            每一隻兔子都值得被溫柔對待。
            <br />
            我們致力於救援、醫療與安置，期盼為牠們找到永遠的歸宿。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-700">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-xl bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/rabbits">尋找家人</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-full shadow-lg bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 ring-1 ring-orange-100"
              asChild
            >
              <Link href="/donate">支持我們</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Wave Animation */}
      <div className={`${styles.waveWrapper} ${styles.waveAnimation}`}>
        <div className={`${styles.waveWrapperInner} ${styles.bgTop}`}>
          <div className={`${styles.wave} ${styles.waveTop}`}></div>
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgMiddle}`}>
          <div className={`${styles.wave} ${styles.waveMiddle}`}></div>
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgBottom}`}>
          <div className={`${styles.wave} ${styles.waveBottom}`}></div>
        </div>
      </div>
    </section>
  );
}
