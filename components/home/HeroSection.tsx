import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-16">
      {/* Background with warm gradient overlay */}
      <div className="absolute inset-0 z-0">
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?q=80&w=1974&auto=format&fit=crop"
          alt="Rabbit Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/80 via-white/30 to-blue-100/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-12">
        <div className="inline-block mb-6 animate-bounce-slow">
            <span className="bg-orange-100 text-orange-600 px-6 py-2 rounded-full text-lg font-bold shadow-sm border border-orange-200">
                🐇 歡迎來到流浪兔保護協會
            </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 font-noto-sans-tc text-stone-800 drop-shadow-sm tracking-tight leading-tight">
          給浪兔一個<span className="text-orange-500">溫暖的家</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-stone-700 font-medium max-w-3xl mx-auto leading-relaxed shadow-white drop-shadow-md">
          每一隻兔子都值得被溫柔對待。
          <br className="hidden md:block" />
          我們致力於救援、醫療與安置，期盼為牠們找到永遠的歸宿。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button size="lg" className="text-xl px-10 py-8 rounded-full shadow-xl bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-300" asChild>
            <Link href="/rabbits">尋找家人</Link>
          </Button>
          <Button size="lg" variant="secondary" className="text-xl px-10 py-8 rounded-full shadow-lg bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 ring-1 ring-orange-100" asChild>
            <Link href="/donate">支持我們</Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative Shape Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
