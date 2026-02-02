"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

export function FundraisingProgressV2() {
  // Mock Data
  const currentCampaign = {
    title: "2024年第一季醫療基金募款",
    target: 500000,
    current: 320000,
    donors: 156,
    endDate: "2024/04/30",
  };

  const percentage = Math.min(
    100,
    Math.round((currentCampaign.current / currentCampaign.target) * 100),
  );

  return (
    <section className="py-20 bg-orange-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-orange-100/50 border border-orange-100 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-3">
                  <HeartHandshake className="w-3 h-3" />
                  急難募款進行中
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-800">
                  {currentCampaign.title}
                </h2>
              </div>
              <div className="text-right hidden md:block">
                <span className="block text-sm text-stone-500">截止日期</span>
                <span className="block font-mono font-bold text-stone-700">
                  {currentCampaign.endDate}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-orange-500">目前進度 {percentage}%</span>
                <span className="text-stone-400">
                  目標 ${currentCampaign.target.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-stone-500">
                <span>已募得 ${currentCampaign.current.toLocaleString()}</span>
                <span>{currentCampaign.donors} 位善心人士參與</span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-95"
              >
                立即捐款支持
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
