"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Eye } from "lucide-react";
import { DeletePostButton } from "./delete-button";
import { PostPreviewModal } from "./post-preview-modal";
import { togglePostStatus } from "../actions";
import { toast } from "sonner";
import { PostCover } from "@/components/ui/post-cover";

interface PostsTableProps {
  posts: any[];
  totalPages: number;
  currentPage: number;
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PostsTable({
  posts,
  totalPages,
  currentPage,
}: PostsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(pathname + "?" + params.toString());
  };
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await togglePostStatus(id, !currentStatus);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(currentStatus ? "已取消發布" : "已發布");
      }
    });
  };

  return (
    <>
      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg border p-4 space-y-3 shadow-sm"
          >
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="w-20 h-14 rounded overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                <PostCover
                  src={post.cover_image}
                  alt=""
                  category={post.category}
                  className="[&_span]:hidden [&_svg]:w-4 [&_svg]:h-4 [&_div]:p-1"
                />
              </div>

              {/* Title & Category */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className="shrink-0">
                    {{
                      top: "置頂",
                      found: "拾獲",
                      fundraising: "募款",
                      event: "活動",
                      news: "公告",
                      knowledge: "知識",
                    }[post.category as string] || post.category}
                  </Badge>
                  <Badge
                    variant={post.published ? "default" : "secondary"}
                    className={`shrink-0 ${
                      post.published
                        ? "bg-green-600"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {post.published ? "Pub" : "Draft"}
                  </Badge>
                </div>
                <h3
                  className="font-medium mt-1 line-clamp-2 text-sm"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-xs text-muted-foreground">
                {post.published_at
                  ? new Date(post.published_at).toLocaleString("zh-TW", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "-"}
              </span>

              <div className="flex items-center gap-1">
                <div className="flex items-center gap-2 mr-2 scale-90 origin-right">
                  <span
                    className={`text-xs ${
                      post.published
                        ? "text-green-600 font-medium"
                        : "text-stone-400"
                    }`}
                  >
                    {post.published ? "ON" : "OFF"}
                  </span>
                  <Switch
                    checked={post.published}
                    onCheckedChange={() =>
                      handleToggleStatus(post.id, post.published)
                    }
                    disabled={isPending}
                    className="scale-75 data-[state=checked]:bg-green-600"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPost(post)}
                  className="h-8 w-8 text-stone-500"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 text-stone-500"
                >
                  <Link href={`/admin/posts/${post.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeletePostButton id={post.id} />
              </div>
            </div>
          </div>
        ))}
        {!posts?.length && (
          <div className="text-center py-10 text-muted-foreground bg-stone-50 rounded-lg">
            尚無公告
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%] min-w-[300px] max-w-[300px] lg:max-w-[500px]">
                  標題
                </TableHead>
                <TableHead className="w-[15%] min-w-[100px]">分類</TableHead>
                <TableHead className="w-[15%] min-w-[100px]">狀態</TableHead>
                <TableHead className="w-[20%] min-w-[150px]">
                  發布時間
                </TableHead>
                <TableHead className="text-right min-w-[180px]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts?.map((post) => (
                <TableRow key={post.id} className="group">
                  <TableCell className="max-w-[300px] lg:max-w-[500px]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <PostCover
                          src={post.cover_image}
                          alt=""
                          category={post.category}
                          className="[&_span]:hidden [&_svg]:w-4 [&_svg]:h-4 [&_div]:p-1"
                        />
                      </div>
                      <button
                        className="font-medium hover:underline text-left line-clamp-2 truncate"
                        title={post.title}
                        onClick={() => setSelectedPost(post)}
                      >
                        {post.title}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="whitespace-nowrap">
                      {{
                        top: "置頂",
                        found: "拾獲棄兔",
                        fundraising: "公益募款",
                        event: "活動",
                        news: "最新消息(舊)",
                        knowledge: "衛教知識(舊)",
                      }[post.category as string] || post.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={post.published ? "default" : "secondary"}
                      className={
                        post.published
                          ? "bg-green-600 hover:bg-green-700 whitespace-nowrap"
                          : "bg-stone-200 text-stone-700 hover:bg-stone-300 whitespace-nowrap"
                      }
                    >
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleString("zh-TW", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <div className="flex items-center gap-2 mr-2">
                        <span
                          className={`text-xs ${
                            post.published
                              ? "text-green-600 font-medium"
                              : "text-stone-400"
                          }`}
                        >
                          {post.published ? "ON" : "OFF"}
                        </span>
                        <Switch
                          checked={post.published}
                          onCheckedChange={() =>
                            handleToggleStatus(post.id, post.published)
                          }
                          disabled={isPending}
                          className="scale-75 data-[state=checked]:bg-green-600"
                        />
                      </div>
                      <div className="h-4 w-px bg-stone-200 mx-1" />

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedPost(post)}
                        className="text-stone-500 hover:text-stone-700 hover:bg-stone-100"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-stone-500 hover:text-stone-700 hover:bg-stone-100"
                      >
                        <Link href={`/admin/posts/${post.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeletePostButton id={post.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!posts?.length && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center h-24 text-muted-foreground"
                  >
                    尚無公告
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <PostPreviewModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          上一頁
        </Button>
        <div className="text-sm text-muted-foreground">
          第 {currentPage} 頁 / 共 {totalPages} 頁
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          下一頁
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </>
  );
}
