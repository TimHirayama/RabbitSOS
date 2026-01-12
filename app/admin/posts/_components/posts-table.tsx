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

interface PostsTableProps {
  posts: any[];
}

export function PostsTable({ posts }: PostsTableProps) {
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">標題</TableHead>
              <TableHead>分類</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>發布時間</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    {post.cover_image && (
                      <div className="w-12 h-8 rounded overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img
                          src={post.cover_image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                    )}
                    <button
                      className="font-medium hover:underline text-left"
                      onClick={() => setSelectedPost(post)}
                    >
                      {post.title}
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={post.published ? "default" : "secondary"}
                    className={
                      post.published
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                    }
                  >
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
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

      <PostPreviewModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
}
