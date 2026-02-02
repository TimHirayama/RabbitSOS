"use client";

import { PlayCircle } from "lucide-react";

export function FeaturedVideosV2() {
  // Mock Video IDs (YouTube)
  const videos = [
    { id: "dQw4w9WgXcQ", title: "新手養兔必看！基礎照顧指南" }, // Replace with real rabbit videos
    { id: "M7lc1UVf-VE", title: "浪兔協會的一天：志工日常" },
    { id: "DXD48wX4Q-w", title: "救援實錄：小黑的故事" },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-bold tracking-wider text-sm uppercase mb-2 block">
            Featured Videos
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 inline-block relative">
            精選影片
            <svg
              className="absolute w-full h-3 -bottom-2 left-0 text-orange-200"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
              />
            </svg>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <div
              key={idx}
              className="group relative aspect-video bg-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100"
            >
              {/* Placeholder for iframe to avoid heavy loading in Dev, or use real iframe */}
              {/* In a real app, use 'react-lite-youtube-embed' or similar for performance */}
              <div className="absolute inset-0 bg-stone-200 flex items-center justify-center group-hover:bg-stone-300 transition-colors cursor-pointer">
                <PlayCircle className="w-16 h-16 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
              </div>
              <iframe
                className="w-full h-full absolute inset-0 opacity-90 hover:opacity-100 transition-opacity"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>

              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <h3 className="text-white font-bold text-sm truncate">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
