"use client";

import Link from "next/link";
import { Copy, MapPin } from "lucide-react";

export function LocationSectionV2() {
  return (
    <section className="relative h-[600px] w-full bg-white flex flex-col md:flex-row border-t border-stone-100 text-left">
      {/* Content Side */}
      <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-white order-2 md:order-1 relative z-10">
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#E11D48] text-xs font-bold uppercase tracking-wider mb-6">
            <MapPin className="w-3 h-3" />
            Visit Us
          </div>

          <h2 className="text-4xl font-extrabold text-stone-800 mb-6">
            歡迎預約參觀
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">
                協會地址 · Address
              </h3>
              <p className="text-xl font-medium text-stone-800 flex items-center gap-2 group cursor-pointer hover:text-[#E11D48] transition-colors">
                新北市中和區民享街６號２樓
                <Copy className="w-4 h-4 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">
                開放時間 · Opening Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-stone-600 border-b border-stone-100 pb-2">
                  <span>週一至週五</span>
                  <span className="font-mono text-stone-900 font-bold">
                    10:00 - 20:00
                  </span>
                </div>
                <div className="flex justify-between text-stone-600 border-b border-stone-100 pb-2">
                  <span>週末假日</span>
                  <span className="font-mono text-stone-900 font-bold">
                    12:00 - 18:00
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#E11D48] text-white font-bold rounded-xl hover:bg-[#BE123C] hover:shadow-lg hover:shadow-rose-200 transition-all active:scale-95"
              >
                預約參觀
              </Link>
              <p className="mt-4 text-xs text-stone-400">
                * 為了維護兔兔的休息品質，請務必提前來電或線上預約。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Side */}
      <div className="w-full md:w-1/2 h-full order-1 md:order-2 bg-slate-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.87611848729!2d121.4690642832491!3d25.004325082354075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a82e55555555%3A0x517f7478d6945954!2z5Y-w54Gj5rWB5rWq5YWU5L-d6K235Y2U5pyD!5e0!3m2!1szh-TW!2stw!4v1767941826921!5m2!1szh-TW!2stw"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        />

        {/* Overlay Label on Map */}
        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
          <span className="text-xs font-bold text-stone-900">
            RabbitSOS 總部
          </span>
        </div>
      </div>
    </section>
  );
}
