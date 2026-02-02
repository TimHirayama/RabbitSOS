"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Pin,
  Bell,
  HeartHandshake,
  AlertCircle,
} from "lucide-react";

// Mock data types (replace with real DB types)
type Post = {
  id: string;
  title: string;
  category: "news" | "found" | "event" | "fundraising";
  date: string;
  excerpt: string;
  isPinned?: boolean;
};

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "2024年春季義賣活動開跑！",
    category: "event",
    date: "2024-03-15",
    excerpt: "一年一度的義賣活動來了，歡迎兔友們共襄盛舉...",
    isPinned: true,
  },
  {
    id: "2",
    title: "急難救助：三重被棄養的雷克斯兔",
    category: "fundraising",
    date: "2024-03-10",
    excerpt: "急需手術費用，請大家伸出援手...",
    isPinned: true,
  },
  {
    id: "3",
    title: "【拾獲】新北市板橋區 灰色垂耳兔",
    category: "found",
    date: "2024-03-08",
    excerpt: "已掃描無晶片，目前安置中...",
    isPinned: false,
  },
  {
    id: "4",
    title: "協會辦公室搬遷公告",
    category: "news",
    date: "2024-03-01",
    excerpt: "我們搬家囉！新地址位於中和區...",
    isPinned: false,
  },
  {
    id: "5",
    title: "新手養兔指南課程報名",
    category: "event",
    date: "2024-02-28",
    excerpt: "適合新手的基礎護理課程...",
    isPinned: false,
  },
  {
    id: "6",
    title: "感謝各界捐贈飼料與物資",
    category: "news",
    date: "2024-02-25",
    excerpt: "感謝大家的愛心，讓兔兔不愁吃穿...",
    isPinned: false,
  },
];

const CATEGORIES = [
  { id: "all", label: "全部" },
  { id: "news", label: "最新動態" },
  { id: "found", label: "拾獲公告" },
  { id: "event", label: "活動訊息" },
  { id: "fundraising", label: "急難募款" },
];

export function NewsSectionV2({
  topPosts,
  foundPosts,
  fundraisingPosts,
  eventPosts,
}: {
  topPosts?: any[];
  foundPosts?: any[];
  fundraisingPosts?: any[];
  eventPosts?: any[];
}) {
  const [activeTab, setActiveTab] = useState("all");

  // In real app, filter `topPosts` or fetch new data. Here using MOCK_POSTS for V2 demo
  const displayPosts = MOCK_POSTS.filter(
    (post) => activeTab === "all" || post.category === activeTab,
  ).slice(0, 5);

  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-orange-500 font-bold tracking-wider text-sm uppercase mb-2 block">
              Latest Updates
            </span>
            <h2 className="text-4xl font-extrabold text-stone-800 relative inline-block">
              最新消息與公告
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

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === cat.id
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-white text-stone-500 hover:bg-orange-50 hover:text-orange-500 border border-stone-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          {/* Main Feature (First Item) */}
          {displayPosts[0] && (
            <div className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden bg-white shadow-sm border border-stone-100 cursor-pointer hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
              {/* Fallback image logic would go here */}
              <div className="absolute inset-0 bg-stone-200 group-hover:scale-105 transition-transform duration-700">
                <img
                  src={`/images/news-placeholder-${displayPosts[0].category === "found" ? "1" : "2"}.jpg`}
                  className="w-full h-full object-cover opacity-50"
                  alt=""
                />
              </div>

              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-orange-500/90 text-white text-xs font-bold backdrop-blur-sm">
                    {
                      CATEGORIES.find((c) => c.id === displayPosts[0].category)
                        ?.label
                    }
                  </span>
                  {displayPosts[0].isPinned && (
                    <div className="flex items-center gap-1 text-yellow-300 text-xs font-bold">
                      <Pin className="w-3 h-3 fill-current" />
                      <span>置頂</span>
                    </div>
                  )}
                  <span className="text-white/80 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {displayPosts[0].date}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3 leading-tight group-hover:text-orange-200 transition-colors">
                  {displayPosts[0].title}
                </h3>
                <p className="text-white/80 line-clamp-2 mb-4 max-w-xl">
                  {displayPosts[0].excerpt}
                </p>
                <div className="flex items-center text-white font-bold text-sm gap-2">
                  閱讀更多{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          )}

          {/* Secondary Items (Right Column) */}
          <div className="flex flex-col gap-6 md:col-span-1 md:row-span-2 h-full">
            {displayPosts.slice(1, 4).map((post, i) => (
              <div
                key={post.id}
                className="flex-1 bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-lg hover:border-orange-100 transition-all group cursor-pointer flex flex-col justify-center"
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-md ${
                      post.category === "fundraising"
                        ? "bg-red-50 text-red-500"
                        : post.category === "found"
                          ? "bg-blue-50 text-blue-500"
                          : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {CATEGORIES.find((c) => c.id === post.category)?.label}
                  </span>
                  <span className="text-xs text-stone-400">{post.date}</span>
                </div>
                <h4 className="font-bold text-stone-800 text-lg mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                  {post.title}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            ))}

            {/* View All Overlay/Button if more posts */}
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex items-center justify-between group cursor-pointer hover:bg-orange-100 transition-colors">
              <span className="font-bold text-orange-700">查看所有文章</span>
              <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
