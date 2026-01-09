import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

interface PostsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> // Next.js 15+ searchParams are async
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams; // Await the promise
  const category = (resolvedSearchParams.category as string) || "news";
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .order("published_at", { ascending: false });

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="bg-orange-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 font-noto-sans-tc">
            {category === "news" ? "最新公告" : "救援紀錄"}
          </h1>
          <p className="text-orange-100 max-w-2xl text-lg">
             {category === "news" 
                ? "掌握協會的最新動態、活動資訊與與緊急公告。" 
                : "每一個生命都值得被記錄，看看他們的故事。"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-none shadow-sm flex flex-col h-full bg-white overflow-hidden">
                {post.cover_image && (
                   <div className="aspect-video w-full overflow-hidden bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={post.cover_image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                   </div>
                )}
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                         <Badge variant="secondary" className="bg-orange-50 text-orange-600 hover:bg-orange-100 mb-2">
                            {category === "news" ? "公告" : "紀錄"}
                         </Badge>
                         <div className="flex items-center text-xs text-stone-400">
                             <Calendar className="w-3 h-3 mr-1" />
                             {new Date(post.published_at).toLocaleDateString()}
                         </div>
                    </div>
                  <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-orange-600 transition-colors">
                    <Link href={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <Button variant="ghost" className="w-full justify-between items-center text-stone-500 hover:text-orange-600 hover:bg-orange-50 mt-4 group/btn" asChild>
                    <Link href={`/posts/${post.id}`}>
                        閱讀更多
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-stone-500">
               <p className="text-xl">目前沒有相關文章</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
