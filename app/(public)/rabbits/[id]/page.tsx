import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Mars, Venus } from "lucide-react";

import { getDailyPhotos } from "@/app/admin/rabbits/daily-photo-actions";

export default async function RabbitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const cookieStore = await cookies();
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
              <div className="bg-stone-100 p-1">
                <div className="aspect-square relative overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[0]}
                    alt={rabbit.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Thumbnails if multiple (mockup) */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                    {images.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="w-20 h-20 flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-primary rounded-lg overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold font-noto-sans-tc">
                    {rabbit.name}
                  </h1>
                  {rabbit.status === "open" && (
                    <Badge className="bg-green-500 text-lg">開放認養</Badge>
                  )}
                  {rabbit.status === "reserved" && (
                    <Badge className="bg-amber-500 text-lg">已預訂</Badge>
                  )}
                  {rabbit.status === "medical" && (
                    <Badge variant="destructive" className="text-lg">
                      醫療中
                    </Badge>
                  )}
                  {rabbit.status === "closed" && (
                    <Badge variant="secondary" className="text-lg">
                      已結案
                    </Badge>
                  )}
                </div>

                <p className="text-xl text-stone-600 mb-6 font-medium leading-relaxed">
                  {rabbit.short_description}
                </p>

                <div className="bg-stone-50 rounded-xl p-6 mb-8 grid grid-cols-2 gap-y-4 gap-x-8 text-stone-700">
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-400 mb-1">性別</span>
                    <div className="flex items-center font-medium">
                      {rabbit.gender === "M" ? (
                        <Mars className="w-5 h-5 mr-1 text-blue-500" />
                      ) : rabbit.gender === "F" ? (
                        <Venus className="w-5 h-5 mr-1 text-pink-500" />
                      ) : null}
                      <span>
                        {rabbit.gender === "M"
                          ? "男生"
                          : rabbit.gender === "F"
                          ? "女生"
                          : "未知"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-400 mb-1">年紀</span>
                    <span className="font-medium">
                      {rabbit.age_category || "未知"} (
                      {rabbit.age_year ? `${rabbit.age_year}歲` : "?"})
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-400 mb-1">品種</span>
                    <span className="font-medium">
                      {rabbit.breed || "米克斯"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-400 mb-1">體重</span>
                    <span className="font-medium">{rabbit.weight || "?"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-400 mb-1">
                      便溺習慣
                    </span>
                    <span className="font-medium">
                      {rabbit.litter_habits || "未知"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-400 mb-1">所在地</span>
                    <span className="font-medium">{rabbit.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-stone-500 border-t border-b border-stone-100 py-4">
                  <div>
                    <span className="block text-xs text-stone-400">
                      介紹人/單位
                    </span>
                    <span>
                      {rabbit.introducer_name}{" "}
                      {rabbit.introducer_org
                        ? `(${rabbit.introducer_org})`
                        : ""}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400">
                      救援時間
                    </span>
                    <span>{rabbit.rescue_date || "-"}</span>
                  </div>
                </div>

                <div className="prose max-w-none text-slate-700 mb-8">
                  <p className="whitespace-pre-wrap">
                    {rabbit.description || "目前沒有詳細介紹。"}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="flex-1 rounded-full text-lg"
                    disabled={rabbit.status !== "open"}
                  >
                    {rabbit.status === "open" ? "申請認養" : "暫停認養"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 rounded-full text-lg"
                  >
                    助養他
                  </Button>
                </div>
              </div>
            </div>
            {/* Daily Photos Section */}
            {dailyPhotos.length > 0 && (
              <div className="p-8 border-t border-stone-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-2xl">📸</span> 生活照
                </h3>
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                  {dailyPhotos.map((photo: any) => (
                    <div
                      key={photo.id}
                      className="break-inside-avoid bg-stone-50 rounded-lg overflow-hidden border mb-4"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.image_url}
                        alt="Daily"
                        className="w-full h-auto object-cover"
                      />
                      {photo.description && (
                        <p className="p-3 text-sm text-stone-600 bg-white/50 backdrop-blur-sm">
                          {photo.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
