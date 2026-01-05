import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?q=80&w=1974&auto=format&fit=crop"
          alt="Rabbit Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-noto-sans-tc drop-shadow-lg">
          給浪兔一個溫暖的家
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed font-noto-sans-tc drop-shadow-md">
          RabbitSOS 致力於救援流浪兔，提供醫療照護與安置。
          <br className="hidden md:block" />
          每一隻兔子都值得被溫柔對待，請以領養代替購買。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 rounded-full shadow-lg" asChild>
            <Link href="/rabbits">尋找家人</Link>
          </Button>
          <Button size="lg" variant="secondary" className="text-lg px-8 rounded-full shadow-lg" asChild>
            <Link href="/donate">支持我們</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
