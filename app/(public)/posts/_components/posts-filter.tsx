"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";

export function PostsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";

  const categories = [
    { value: "all", label: "所有公告" },
    { value: "top", label: "置頂" },
    { value: "found", label: "拾獲" },
    { value: "fundraising", label: "募款" },
    { value: "event", label: "活動" },
    { value: "news", label: "公告" },
    { value: "knowledge", label: "知識" },
  ];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.set("page", "1"); // Reset page
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (val: string) => {
    router.push(pathname + "?" + createQueryString("category", val));
  };

  const handleSortChange = (val: string) => {
    router.push(pathname + "?" + createQueryString("sort", val));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
      {/* Categories - Horizontal Scroll on Mobile */}
      <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((c) => (
          <Button
            key={c.value}
            variant={category === c.value ? "default" : "outline"}
            className={cn(
              "rounded-full whitespace-nowrap",
              category === c.value
                ? "bg-orange-600 hover:bg-orange-700"
                : "text-stone-600 border-stone-200"
            )}
            onClick={() => handleCategoryChange(c.value)}
          >
            {c.label}
          </Button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm text-stone-500 whitespace-nowrap">排序：</span>
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[140px] rounded-full border-stone-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">最新發布</SelectItem>
            <SelectItem value="oldest">最早發布</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
