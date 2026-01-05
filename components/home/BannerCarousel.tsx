'use client';

import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface BannerCarouselProps {
  banners: any[];
  layout?: string;
}

export function BannerCarousel({ banners = [], layout = 'contained' }: BannerCarouselProps) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const getImageUrl = (path: string) => {
    // Construct public URL. Assuming standard Supabase path structure.
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/banners/${path}`;
  };

  if (banners.length === 0) {
    // Fallback Static Hero if no banners
    return (
      <header className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl overflow-hidden mb-12 border border-orange-100 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-800 tracking-tight leading-tight mb-6">
            給流浪兔一個<br />
            <span className="text-orange-500">溫暖的家</span>
          </h1>
          <p className="text-lg text-stone-600 mb-8 max-w-xl leading-relaxed">
            我們致力於救援流浪兔，提供醫療照護與中途安置，並協助尋找適合的認養家庭。
            您的支持，是我們持續前行的動力。
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="rounded-full px-8 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200" asChild>
              <Link href="/rabbits">
                看兔子 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-orange-200 text-orange-700 hover:bg-orange-50" asChild>
              <Link href="/donate">
                立即捐款
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-10 lg:opacity-20 pointer-events-none">
           <img src="/rabbit-hero-bg.png" className="w-full h-full object-contain object-bottom" alt="bg"/>
        </div>
      </header>
    );
  }

  return (
    <div className="relative mb-12 group">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-0">
          {banners.map((banner) => {
             const isFull = layout === 'full';
             return (
              <CarouselItem key={banner.id} className="pl-0">
                 {/* pl-0 to remove default spacing if we want full bleed */}
                 <div className={`relative w-full ${isFull ? '' : 'container mx-auto px-4'}`}>
                    <div className={`relative overflow-hidden ${isFull ? '' : 'rounded-2xl'}`}>
                      <AspectRatio ratio={isFull ? 21 / 9 : 16 / 9} className="bg-muted">
                        <Image
                          src={getImageUrl(banner.image_path)}
                          alt={banner.title || 'Banner'}
                          fill
                          className="object-cover"
                          priority={banner.sort_order === 1}
                        />
                        {banner.link_url && (
                            <Link href={banner.link_url} className="absolute inset-0 z-10">
                              <span className="sr-only">Go to link</span>
                            </Link>
                        )}
                      </AspectRatio>
                    </div>
                 </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {banners.length > 1 && (
            <>
                <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            </>
        )}
      </Carousel>
    </div>
  );
}
