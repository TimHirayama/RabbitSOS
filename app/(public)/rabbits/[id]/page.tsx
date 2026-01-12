import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Mars,
  Venus,
  Rabbit,
  Scale,
  Sparkles,
  Utensils,
} from "lucide-react";

import { getDailyPhotos } from "@/app/admin/rabbits/daily-photo-actions";
import { MainGallery } from "./_components/main-gallery";
import { DailyPhotosGrid } from "./_components/daily-photos-grid";

export default async function RabbitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Validate UUID to avoid DB error
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return notFound();
  }

  const { data: rabbit, error } = await supabase
    .from("rabbits")
    .select("*")
    .eq("id", id)
    .single();

  const dailyPhotos = await getDailyPhotos(id);

  if (error || !rabbit) {
    return notFound();
  }

  const images =
    rabbit.image_urls && rabbit.image_urls.length > 0
      ? rabbit.image_urls
      : [
          "https://images.unsplash.com/photo-1585110396067-c1d6389710cc?q=80&w=600&auto=format&fit=crop",
        ];

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 pl-0 hover:pl-2 transition-all"
            asChild
          >
            <Link href="/rabbits">
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回認養清單
            </Link>
          </Button>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Section */}
              <MainGallery images={images} rabbitName={rabbit.name} />

              {/* Info Section */}
              <div className="p-8 flex flex-col h-full relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold font-noto-sans-tc text-stone-800 tracking-wide mb-2">
                      {rabbit.name}
                    </h1>
                    <div className="flex gap-2">
                      {rabbit.status === "open" && (
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 text-base">
                          開放認養
                        </Badge>
                      )}
                      {rabbit.status === "reserved" && (
                        <Badge className="bg-amber-500 hover:bg-amber-600 px-3 py-1 text-base">
                          已預訂
                        </Badge>
                      )}
                      {rabbit.status === "medical" && (
                        <Badge
                          variant="destructive"
                          className="px-3 py-1 text-base"
                        >
                          醫療中
                        </Badge>
                      )}
                      {rabbit.status === "closed" && (
                        <Badge
                          variant="secondary"
                          className="px-3 py-1 text-base"
                        >
                          已結案
                        </Badge>
                      )}
                    </div>

                    {/* Short Intro Description */}
                    <div className="mt-4 text-stone-600 leading-relaxed font-medium">
                      {rabbit.short_description ||
                        "這隻兔兔還在等待您的溫暖關注喔！"}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block mb-1">
                      救援編號
                    </span>
                    <span className="font-mono text-stone-500 font-bold bg-stone-100 px-2 py-1 rounded">
                      {rabbit.legacy_id || id.slice(0, 8)}
                    </span>
                  </div>
                </div>

                {/* Info Grid with Icons */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8 mt-4">
                  <InfoItem
                    icon={<Mars className="w-5 h-5 text-blue-500" />}
                    label="性別"
                    value={
                      rabbit.gender === "M"
                        ? "男生"
                        : rabbit.gender === "F"
                        ? "女生"
                        : "未知"
                    }
                  />
                  <InfoItem
                    icon={<Calendar className="w-5 h-5 text-orange-500" />}
                    label="年紀"
                    value={`${rabbit.age_category || "未知"} (${
                      rabbit.age_year ? rabbit.age_year + "歲" : "?"
                    })`}
                  />
                  <InfoItem
                    icon={<Rabbit className="w-5 h-5 text-stone-500" />}
                    label="品種"
                    value={rabbit.breed || "米克斯"}
                  />
                  <InfoItem
                    icon={<Scale className="w-5 h-5 text-rose-500" />}
                    label="體重"
                    value={rabbit.weight || "?"}
                  />
                  <InfoItem
                    icon={<Sparkles className="w-5 h-5 text-purple-500" />}
                    label="便溺習慣"
                    value={rabbit.litter_habits || "未知"}
                  />
                  <InfoItem
                    icon={<Utensils className="w-5 h-5 text-amber-600" />}
                    label="主食"
                    value={rabbit.feed_type || "不挑食"}
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-stone-100 mt-auto">
                  <Button
                    size="lg"
                    className="flex-1 rounded-full text-lg font-bold shadow-md shadow-orange-100"
                    disabled={rabbit.status !== "open"}
                  >
                    {rabbit.status === "open" ? "申請認養" : "暫停認養"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 rounded-full text-lg border-stone-200 hover:bg-stone-50"
                  >
                    助養他
                  </Button>
                </div>
              </div>
            </div>

            {/* Detailed Description with Reporter Avatar (Full Width) */}
            <div className="px-8 py-10 border-t border-stone-100 bg-white">
              <div className="flex items-start gap-6 max-w-4xl mx-auto">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-orange-50 border-4 border-white shadow-md overflow-hidden p-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/avatar-vol.jpg"
                      alt="Reporter"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-bold text-stone-500 mt-3 px-3 py-1 bg-stone-100 rounded-full">
                    {rabbit.introducer_name || "志工"}
                  </span>
                </div>

                <div className="relative bg-orange-50 p-8 rounded-lg rounded-tl-none shadow-sm border border-orange-100 border-l-[5px] border-l-orange-400 flex-1 mt-4 ml-2">
                  {/* CSS Triangle Tail (Left Side) - Matching the orange border */}
                  <div className="absolute top-6 -left-[15px] w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-orange-400 border-b-[10px] border-b-transparent"></div>

                  {/* Quotation Mark */}
                  <div className="absolute top-4 left-4 text-6xl text-orange-200 font-serif leading-none select-none opacity-50">
                    “
                  </div>

                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-stone-800 relative z-10 pl-2 mt-4">
                    關於 {rabbit.name}
                  </h3>
                  <div className="prose max-w-none text-stone-700 leading-loose font-medium relative z-10">
                    <p className="whitespace-pre-wrap">
                      {rabbit.description ||
                        rabbit.short_description ||
                        "目前沒有詳細介紹。"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Photos Section (Waterfalls) */}
            <DailyPhotosGrid photos={dailyPhotos} />
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 p-2 bg-stone-50 rounded-lg">{icon}</div>
      <div>
        <span className="text-xs text-stone-400 block mb-0.5">{label}</span>
        <span className="font-bold text-stone-700">{value}</span>
      </div>
    </div>
  );
}
