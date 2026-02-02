"use client";

import Link from "next/link";
import {
  Rabbit,
  Mars,
  Venus,
  HelpCircle,
  ArrowRight,
  Heart,
} from "lucide-react";

// Mock data structure matching Supabase return
type Rabbit = {
  id: string;
  name: string;
  gender: string;
  age_year: number;
  location: string;
  image_urls: string[];
  weight: number;
  breed: string;
  age_category: string;
  description: string;
};

export function FeaturedRabbitsV2({ rabbits = [] }: { rabbits?: any[] }) {
  // Safe Fallback: Force render even if empty for V2 verification
  const displayRabbits = rabbits || [];

  return (
    <section
      className="py-24 bg-white relative overflow-hidden"
      id="featured-rabbits"
    >
      {/* Background Decorative */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-bold tracking-wider text-sm uppercase mb-2 block">
              Adopt a Friend
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-800 mb-4 leading-tight">
              等待家的
              <span className="relative inline-block">
                兔寶們
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-orange-300"
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
              </span>
            </h2>
            <p className="text-stone-500 text-lg">
              每一隻兔子都有獨特的個性與故事。您願意成為牠們生命中的光嗎？
            </p>
          </div>
          <Link
            href="/adoption/list"
            className="group flex items-center gap-2 text-orange-500 font-bold text-lg hover:text-orange-600 transition-colors"
          >
            查看更多待認養兔兔
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {displayRabbits.length > 0 ? (
          /* Grid Layout Fix: Mobile 1col, Tablet 2col, Desktop 4col */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayRabbits.map((rabbit: Rabbit) => (
              <div
                key={rabbit.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-100 transition-all duration-500 border border-stone-100"
              >
                {/* Image Area */}
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-stone-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  {rabbit.image_urls && rabbit.image_urls[0] ? (
                    <img
                      src={rabbit.image_urls[0]}
                      alt={rabbit.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-orange-200 bg-orange-50">
                      <Rabbit className="w-20 h-20" />
                    </div>
                  )}

                  {/* Floating Action Button on Hover */}
                  <Link
                    href={`/adoption/${rabbit.id}`}
                    className="absolute bottom-6 right-6 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 bg-white text-orange-500 p-3 rounded-full shadow-lg hover:bg-orange-500 hover:text-white"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-stone-800 mb-1 group-hover:text-orange-500 transition-colors">
                        {rabbit.name}
                      </h3>
                      <p className="text-sm text-stone-500 font-medium">
                        {rabbit.breed || "米克斯"} ·{" "}
                        {rabbit.age_category || "成兔"}
                      </p>
                    </div>
                    <div className="bg-stone-50 p-2 rounded-full">
                      {rabbit.gender === "M" ? (
                        <Mars className="w-5 h-5 text-blue-500" />
                      ) : rabbit.gender === "F" ? (
                        <Venus className="w-5 h-5 text-rose-500" />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-stone-400" />
                      )}
                    </div>
                  </div>

                  <p className="text-stone-500 line-clamp-2 h-12 mb-6 text-sm leading-relaxed">
                    {rabbit.description || "暫無介紹..."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-500">
                      {rabbit.location || "中心安置"}
                    </span>
                    {/* Decorative Solid Heart (No Hover) */}
                    <Heart className="w-5 h-5 fill-stone-200 text-stone-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State - Always render this if no rabbits */
          <div className="flex flex-col items-center justify-center py-12 text-center bg-stone-50 rounded-3xl border border-stone-100 border-dashed">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-300">
              <Rabbit className="w-10 h-10" />
            </div>
            <p className="text-stone-500 font-medium text-lg">
              目前暫無待認養兔兔資料
            </p>
            <p className="text-stone-400 text-sm mt-2">請稍後再回來查看</p>
          </div>
        )}
      </div>
    </section>
  );
}
