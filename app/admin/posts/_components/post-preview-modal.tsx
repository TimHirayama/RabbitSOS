import { PostCover } from "@/components/ui/post-cover";

// ... inside component ...

// Removed stray code

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
            <Badge variant="outline">
              {{
                top: "置頂",
                found: "拾獲棄兔",
                fundraising: "公益募款",
                event: "活動",
                news: "最新消息(舊)",
                knowledge: "衛教知識(舊)",
              }[post.category as string] || post.category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {post.published ? "已發布" : "草稿"}
            </span>
          </div>
          <DialogTitle className="text-2xl">{post.title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 pr-1">
          <div className="pr-2">
            <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-stone-100 shrink-0">
              <PostCover
                src={post.cover_image}
                alt={post.title}
                category={post.category}
              />
            </div>

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
