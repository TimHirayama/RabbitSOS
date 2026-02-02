"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";

const photos = [
  {
    src: "/images/environment/env1.jpg",
    alt: "乾淨舒適的兔兔宿舍",
    title: "五星級宿舍",
    desc: "每隻兔兔擁有獨立大空間，恆溫空調，每日專人打掃，確保居住品質。",
  },
  {
    src: "/images/environment/env2.jpg",
    alt: "寬敞的放風區",
    title: "陽光放風區",
    desc: "寬敞明亮的室內活動場，鋪設防滑地墊，讓兔兔盡情奔跑玩耍。",
  },
  {
    src: "/images/environment/env3.jpg",
    alt: "醫療照護",
    title: "專業醫療室",
    desc: "設備齊全的醫療照護空間，與特約獸醫合作，提供即時的健康檢查與治療。",
  },
  {
    src: "/images/environment/env4.jpg",
    alt: "志工互動",
    title: "愛心互動角",
    desc: "舒適的沙發區，讓志工與參觀民眾能近距離陪伴兔兔，建立信任感。",
  },
];

export function EnvironmentGalleryV2() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-stone-50 text-stone-900 relative overflow-hidden text-left">
      {/* Background blobs (Light Mode) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E11D48]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="text-[#E11D48] font-bold tracking-wider text-sm uppercase mb-2 block">
                Our Environment
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-stone-800">
                不僅是收容所，
                <br />
                更是
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-[#FB7185]">
                  溫暖的中途之家
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className={`pl-6 border-l-4 transition-all cursor-pointer py-2 ${activeIndex === idx ? "border-[#E11D48] opacity-100" : "border-stone-200 opacity-40 hover:opacity-70"}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <h3 className="text-xl font-bold mb-1">{photo.title}</h3>
                  <p
                    className={`text-stone-500 text-sm leading-relaxed max-w-md ${activeIndex === idx ? "block" : "hidden md:block"}`}
                  >
                    {photo.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Display */}
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-white shadow-2xl shadow-stone-200/50 border border-stone-100 group">
            {/* Main Image */}
            <img
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
            />

            {/* Overlay Gradient (Light) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm font-mono text-white/80 mb-1">
                SECTION {activeIndex + 1} / {photos.length}
              </p>
              <h3 className="text-2xl font-bold">
                {photos[activeIndex].title}
              </h3>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + photos.length) % photos.length,
                  )
                }
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors border border-white/20 text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % photos.length)
                }
                className="p-3 rounded-full bg-[#E11D48] hover:bg-[#BE123C] transition-colors shadow-lg shadow-[#E11D48]/30 text-white"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
