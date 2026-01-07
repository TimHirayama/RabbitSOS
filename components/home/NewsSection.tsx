import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export async function NewsSection() {
  const supabase = await createClient();

  // Fetch News
  const { data: news } = await supabase
    .from("posts")
    .select("id, title, published_at, category")
    .eq("published", true)
    .eq("category", "news")
    .order("published_at", { ascending: false })
    .limit(5);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: News List */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-2">最新公告</h2>
                <p className="text-stone-600">隨時掌握協會的最新動態與救援故事</p>
              </div>
              <Button variant="link" className="text-orange-500 hover:text-orange-600 p-0" asChild>
                <Link href="/posts?category=news" className="flex items-center gap-1">
                  查看更多 <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-stone-50 rounded-2xl p-6 shadow-sm border border-stone-100">
              {news && news.length > 0 ? (
                <ul className="space-y-4">
                  {news.map((item) => (
                    <li key={item.id} className="group">
                      <Link href={`/posts/${item.id}`} className="block">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-medium text-stone-700 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {item.title}
                          </span>
                          <span className="text-sm text-stone-400 whitespace-nowrap">
                            {new Date(item.published_at!).toLocaleDateString('zh-TW')}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-stone-500">
                  目前沒有最新公告
                </div>
              )}
            </div>
            
            {/* Quick Donation Stats (Mock for now or real if we have logic) */}
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex items-center justify-between">
                <div>
                   <h3 className="font-bold text-orange-800 mb-1">急難救助募資中</h3>
                   <p className="text-sm text-orange-700">幫助重傷兔兔「棉花糖」度過難關</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md shadow-orange-200" asChild>
                    <Link href="/donate">立即捐款</Link>
                </Button>
            </div>
          </div>

          {/* Right: Featured Video */}
          <div className="space-y-6">
             <div>
                <h2 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-2">精選影片</h2>
                <p className="text-stone-600">透過影像，看見兔兔們的生命力</p>
              </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-black text-white group cursor-pointer">
                 {/* Placeholder for Video - In real app, verify Origin for iframe */}
                 <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Ad33_kGu4y4X4oV-" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                 ></iframe>
            </div>
            <div className="flex gap-4">
                <Card className="flex-1 bg-amber-50 border-amber-100 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                        <PlayCircle className="w-8 h-8 text-amber-500" />
                        <div>
                            <p className="font-bold text-amber-900 text-sm">救援紀錄</p>
                            <p className="text-xs text-amber-700">重傷免免救援實錄</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="flex-1 bg-rose-50 border-rose-100 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                        <PlayCircle className="w-8 h-8 text-rose-500" />
                        <div>
                            <p className="font-bold text-rose-900 text-sm">送養特輯</p>
                            <p className="text-xs text-rose-700">快樂回家的免免們</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
