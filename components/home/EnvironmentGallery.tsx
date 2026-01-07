import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

const photos = [
    {
        src: "https://images.unsplash.com/photo-1591382386627-fa16ca58f553?q=80&w=1000&auto=format&fit=crop",
        alt: "乾淨舒適的兔兔宿舍",
        title: "乾淨舒適的個別宿舍"
    },
    {
        src: "https://images.unsplash.com/photo-1585110396067-c3d6e3d27388?q=80&w=1000&auto=format&fit=crop",
        alt: "寬敞的放風區",
        title: "每日輪流放風活動"
    },
    {
        src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop",
        alt: "醫療照護",
        title: "專業獸醫定期巡診"
    },
    {
        src: "https://images.unsplash.com/photo-1559214369-a6b1d7919865?q=80&w=1000&auto=format&fit=crop",
        alt: "志工互動",
        title: "充滿愛的互動時光"
    },
];

export function EnvironmentGallery() {
  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-4">協會環境</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
                我們致力於提供最優質的照護環境，定期清潔消毒，確保每一隻兔兔都能健康快樂地等待新家。
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={photo.src} 
                        alt={photo.alt}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-white font-bold text-lg">{photo.title}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
