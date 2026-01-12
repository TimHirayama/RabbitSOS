import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 60; // Revalidate every minute

interface PostPageProps {
  params: Promise<{ id: string }>; // Next.js 15+ params are async
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20 pt-10">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="text-stone-500 hover:text-orange-600 pl-0"
            asChild
          >
            <Link href="/posts?category=news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回列表
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-10 text-center">
          <Badge
            variant="secondary"
            className="bg-orange-50 text-orange-600 hover:bg-orange-100 mb-4 px-3 py-1 text-sm"
          >
            {post.category === "news" ? "公告" : "紀錄"}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold font-noto-sans-tc text-stone-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-stone-500 gap-6 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.published_at).toLocaleDateString()}
            </div>
            {/* Social Share Placeholder */}
            <Button
              variant="ghost"
              size="sm"
              className="text-stone-400 hover:text-orange-500"
            >
              <Share2 className="w-4 h-4 mr-1" />
              分享
            </Button>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg bg-stone-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-stone prose-headings:font-noto-sans-tc prose-headings:font-bold prose-img:rounded-xl prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          {/* Render HTML content from TipTap editor */}
          <div
            className="font-noto-sans-tc text-stone-700 leading-loose"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>

        {/* Attachment / PDF */}
        {post.file_url && (
          <div className="mt-12 p-6 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-800">附件下載</h3>
              <p className="text-sm text-stone-500">相關文件或詳細說明</p>
            </div>
            <Button asChild>
              <a href={post.file_url} target="_blank" rel="noopener noreferrer">
                下載檔案
              </a>
            </Button>
          </div>
        )}
      </article>
    </main>
  );
}
