"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

interface PostsTableToolbarProps {
  totalCount: number;
}

export function PostsTableToolbar({ totalCount }: PostsTableToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filters
  const category = searchParams.get("category") || "all";
  const status = searchParams.get("status") || "all";
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("q") || "";

  // Update URL helper
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Reset page when filter changes
      if (name !== "page") {
        params.set("page", "1");
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  }, 300);

  const isFiltered = category !== "all" || status !== "all" || !!search;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          placeholder="搜尋標題..."
          defaultValue={search}
          onChange={(event) => handleSearch(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="flex gap-2">
          <Select
            value={category}
            onValueChange={(value) =>
              router.push(pathname + "?" + createQueryString("category", value))
            }
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="分類" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有分類</SelectItem>
              <SelectItem value="top">置頂</SelectItem>
              <SelectItem value="found">拾獲棄兔</SelectItem>
              <SelectItem value="fundraising">公益募款</SelectItem>
              <SelectItem value="event">活動</SelectItem>
              <SelectItem value="news">最新消息</SelectItem>
              <SelectItem value="knowledge">衛教知識</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={status}
            onValueChange={(value) =>
              router.push(pathname + "?" + createQueryString("status", value))
            }
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="狀態" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有狀態</SelectItem>
              <SelectItem value="published">已發布</SelectItem>
              <SelectItem value="draft">草稿</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) =>
              router.push(pathname + "?" + createQueryString("sort", value))
            }
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="排序" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">最新發布</SelectItem>
              <SelectItem value="oldest">最早發布</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => router.push(pathname)}
            className="h-8 px-2 lg:px-3"
          >
            重置
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="text-sm text-muted-foreground">共 {totalCount} 筆</div>
    </div>
  );
}
