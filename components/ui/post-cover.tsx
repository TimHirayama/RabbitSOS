import { Rabbit } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCoverProps {
  src?: string | null;
  alt: string;
  category: string;
  className?: string;
}

const CATEGORY_MAP: Record<string, string> = {
  top: "置頂公告",
  found: "拾獲棄兔",
  fundraising: "公益募款",
  event: "活動公告",
  news: "最新公告",
  knowledge: "衛教知識",
};

export function PostCover({ src, alt, category, className }: PostCoverProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "w-full h-full bg-orange-50 flex items-center justify-center p-4",
        className
      )}
    >
      <div className="flex items-center justify-center gap-3 opacity-80">
        <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
          <Rabbit className="w-8 h-8 text-orange-500" />
        </div>
        <span className="text-orange-900 font-bold text-xl tracking-wider whitespace-nowrap">
          {CATEGORY_MAP[category] || "公告"}
        </span>
      </div>
    </div>
  );
}
