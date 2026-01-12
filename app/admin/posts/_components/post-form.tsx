"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "../../_components/image-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { createPost, updatePost } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface PostFormProps {
  initialData?: any;
}

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coverImages, setCoverImages] = useState<string[]>(
    initialData?.cover_image ? [initialData.cover_image] : []
  );
  const [published, setPublished] = useState(initialData?.published || false);
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (coverImages.length > 0) {
      formData.set("cover_image", coverImages[0]);
    }
    formData.set("published", published.toString());

    try {
      let res;
      if (initialData) {
        res = await updatePost(initialData.id, formData);
      } else {
        res = await createPost(formData);
      }

      if (!res.success) {
        throw new Error(res.error || "操作失敗");
      }

      toast.success(initialData ? "更新成功" : "新增成功");
      router.push("/admin/posts");
      router.refresh();
    } catch (error: any) {
      toast.error("儲存失敗: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>封面圖片</Label>
          <ImageUpload
            value={coverImages}
            onChange={(urls) => setCoverImages(urls.slice(-1))} // Keep only last one
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground">僅限一張</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="title">標題</Label>
          <Input
            id="title"
            name="title"
            defaultValue={initialData?.title}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">分類</Label>
            <Select
              name="category"
              defaultValue={initialData?.category || "news"}
            >
              <SelectTrigger>
                <SelectValue placeholder="選擇分類" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="news">最新消息 (News)</SelectItem>
                <SelectItem value="knowledge">衛教知識 (Knowledge)</SelectItem>
                <SelectItem value="event">活動公告 (Event)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 items-end pb-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
              <Label htmlFor="published">立即發布</Label>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="content">內容</Label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            disabled={loading}
          />
          {/* Hidden input for FormData to pick up automatically */}
          <input type="hidden" name="content" value={content} />
        </div>
      </div>

      <div className="flex gap-4">
        <Button disabled={loading} type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "儲存公告" : "發布公告"}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => router.back()}
          disabled={loading}
        >
          取消
        </Button>
      </div>
    </form>
  );
}
