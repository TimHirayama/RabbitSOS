import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FundraisingProgress } from "./FundraisingProgress";

export async function NewsSection() {
  const supabase = await createClient();

  // Parallel Fetching for Categories
  // Note: Assuming 'news' category is used for general/pinned updates if 'is_pinned' column doesn't exist yet.
  // We'll treat the 'Pinned' tab as 'Latest News' or check for 'is_pinned' if schema allows.
  // For safety, we'll fetch 'news' category for 'Pinned' and specific categories for others.

  const fetchCategory = async (category: string) => {
    return supabase
      .from("posts")
      .select("id, title, published_at, category")
      .eq("published", true)
      .eq("category", category)
      .order("published_at", { ascending: false })
      .limit(5);
  };

  const [pinnedParams, rescueParams, fundraisingParams, eventParams] =
    await Promise.all([
      fetchCategory("news"), // Mapping 'news' to 'Pinned' tab for now
      fetchCategory("rescue"),
      fetchCategory("fundraising"),
      fetchCategory("event"),
    ]);

  const categories = [
    {
      id: "pinned",
      label: "置頂公告",
      data: pinnedParams.data,
      color: "text-red-500",
    },
    {
      id: "rescue",
      label: "拾獲棄兔",
      data: rescueParams.data,
      color: "text-amber-500",
    },
    {
      id: "fundraising",
      label: "公益募款",
      data: fundraisingParams.data,
      color: "text-rose-500",
    },
    {
      id: "event",
      label: "活動文章",
      data: eventParams.data,
      color: "text-blue-500",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: News Tabs */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-2">
                  最新公告
                </h2>
                <p className="text-stone-600">
                  隨時掌握協會的最新動態與救援故事
                </p>
              </div>
              <Button
                variant="link"
                className="text-orange-500 hover:text-orange-600 p-0"
                asChild
              >
                <Link href="/posts" className="flex items-center gap-1">
                  所有公告 <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              <Tabs defaultValue="pinned" className="w-full">
                <TabsList className="w-full justify-start h-auto p-0 bg-stone-50 border-b border-stone-100 rounded-none">
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="flex-1 py-4 rounded-none border-b-0 data-[state=active]:bg-orange-500/10 data-[state=active]:text-orange-800 data-[state=active]:shadow-none text-stone-500 font-medium text-base transition-all hover:text-orange-600 hover:bg-orange-50/50"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((cat) => (
                  <TabsContent
                    key={cat.id}
                    value={cat.id}
                    className="p-0 m-0 focus-visible:ring-0"
                  >
                    {/* Fixed Height Container: 5 lines approx ~300px or strict calculation */}
                    <div className="h-[280px] overflow-y-auto p-4 custom-scrollbar">
                      {cat.data && cat.data.length > 0 ? (
                        <ul className="space-y-3">
                          {cat.data.map((item) => (
                            <li
                              key={item.id}
                              className="group border-b border-stone-50 last:border-0 pb-3 last:pb-0"
                            >
                              <Link
                                href={`/posts/${item.id}`}
                                className="block"
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span
                                      className={cn(
                                        "text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 whitespace-nowrap",
                                        cat.color.replace("text-", "text-")
                                      )}
                                    >
                                      {cat.label.substring(0, 2)}
                                    </span>
                                    <span className="font-medium text-stone-700 group-hover:text-orange-600 transition-colors truncate text-base">
                                      {item.title}
                                    </span>
                                  </div>
                                  <span className="text-sm text-stone-400 whitespace-nowrap font-mono shrink-0">
                                    {new Date(
                                      item.published_at!
                                    ).toLocaleDateString("zh-TW")}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-stone-400 gap-2">
                          <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center">
                            <span className="text-2xl">🐰</span>
                          </div>
                          <p>目前沒有{cat.label}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Fundraising Progress Widget */}
            <FundraisingProgress />
          </div>

          {/* Right: Featured Video */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-2">
                精選影片
              </h2>
              <p className="text-stone-600">透過影像，看見兔兔們的生命力</p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-black text-white group cursor-pointer">
              {/* Placeholder for Video */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/V2EqtDLMmJY?si=ZcxWHTWxpFPmHTIa"
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
