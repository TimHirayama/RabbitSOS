"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface PostPreviewModalProps {
  post: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PostPreviewModal({
  post,
  isOpen,
  onClose,
}: PostPreviewModalProps) {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">
              {post.published ? "已發布" : "草稿"}
            </span>
          </div>
          <DialogTitle className="text-2xl">{post.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 pr-1">
          <div className="pr-2">
            {post.cover_image && (
              <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-stone-100 shrink-0">
                <img
                  src={post.cover_image}
                  className="w-full h-full object-cover"
                  alt={post.title}
                />
              </div>
            )}

            <div
              className="prose prose-sm max-w-none prose-stone dark:prose-invert font-noto-sans-tc"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
