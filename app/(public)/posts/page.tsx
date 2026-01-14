import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { PostCover } from "@/components/ui/post-cover";
import { PostsFilter } from "./_components/posts-filter";

export const revalidate = 60; // Revalidate every minute

interface PostsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = (resolvedSearchParams.category as string) || "";
  const sort = (resolvedSearchParams.sort as string) || "newest";
  const page = Number(resolvedSearchParams.page) || 1;
  const pageSize = 12;

  const supabase = await createClient();

  // Calculate range
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("published", true);

  // Sorting
  if (sort === "oldest") {
    query = query.order("published_at", { ascending: true });
  } else {
    query = query.order("published_at", { ascending: false });
  }

  // Filtering
  if (category) {
    query = query.eq("category", category);
  }

  query = query.range(from, to);

  const { data: posts, count } = await query;

  const totalPages = count ? Math.ceil(count / pageSize) : 0;
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const categoryNameMap: Record<string, string> = {
    top: "置頂",
    found: "拾獲",
    fundraising: "募款",
    event: "活動",
    news: "公告",
    knowledge: "知識",
  };

  // Helper to generate pagination links
  const getPageLink = (newPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (sort !== "newest") params.set("sort", sort);
    params.set("page", newPage.toString());
    return `/posts?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="bg-orange-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 font-noto-sans-tc">
            {{
              top: "置頂公告",
              found: "拾獲棄兔",
              fundraising: "公益募款",
              event: "活動",
              news: "最新公告",
              knowledge: "衛教知識",
            }[category] || "所有公告"}
          </h1>
          <p className="text-orange-100 max-w-2xl text-lg">
            {{
              top: "最重要與緊急的協會公告。",
              found: "即時更新的拾獲與棄兔資訊，協助他們回家。",
              fundraising: "支持我們的救援行動，每一份力量都值得被記錄。",
              event: "與我們相見！參與協會舉辦的各類活動。",
              news: "掌握協會的最新動態、活動資訊與與緊急公告。",
              knowledge: "每一個生命都值得被記錄，看看他們的故事。",
            }[category] || "掌握協會的最新動態，了解我們的救援故事。"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 space-y-8">
        {/* Filter Bar */}
        <PostsFilter />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-lg transition-all duration-300 border-none shadow-sm flex flex-col h-full bg-white overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden bg-stone-100">
                  <PostCover
                    src={post.cover_image}
                    alt={post.title}
                    category={post.category}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-orange-50 text-orange-600 hover:bg-orange-100 mb-2"
                    >
                      {categoryNameMap[post.category] || "公告"}
                    </Badge>
                    <div className="flex items-center text-xs text-stone-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {format(new Date(post.published_at), "yyyy/MM/dd")}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-orange-600 transition-colors">
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                  <Button
                    variant="ghost"
                    className="w-full justify-between items-center text-stone-500 hover:text-orange-600 hover:bg-orange-50 mt-4 group/btn"
                    asChild
                  >
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 bg-white p-4 rounded-xl shadow-sm w-fit mx-auto border border-stone-100">
            <Button
              variant="outline"
              disabled={!hasPrevPage}
              asChild={hasPrevPage}
              className="w-24"
            >
              {hasPrevPage ? (
                <Link href={getPageLink(page - 1)}>上一頁</Link>
              ) : (
                "上一頁"
              )}
            </Button>

            <span className="text-stone-600 text-sm font-medium">
              第 {page} 頁 / 共 {totalPages} 頁
            </span>

            <Button
              variant="outline"
              disabled={!hasNextPage}
              asChild={hasNextPage}
              className="w-24"
            >
              {hasNextPage ? (
                <Link href={getPageLink(page + 1)}>下一頁</Link>
              ) : (
                "下一頁"
              )}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
