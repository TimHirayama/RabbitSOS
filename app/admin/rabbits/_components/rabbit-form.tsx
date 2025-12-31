'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./image-upload";
import { createRabbit, updateRabbit } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface RabbitFormProps {
  initialData?: any;
}

export function RabbitForm({ initialData }: RabbitFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.image_urls || []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // Append images
    imageUrls.forEach(url => formData.append('image_urls', url));

    try {
      if (initialData) {
        const res = await updateRabbit(initialData.id, formData);
        if (res?.error) throw new Error(res.error);
        toast.success("更新成功");
      } else {
        const res = await createRabbit(formData);
        if (res?.error) throw new Error(res.error);
        toast.success("新增成功");
      }
      // Redirect handled in server action but good to have fallback or client side redirect awareness
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
          <Label>照片上傳 (第一張將作為封面)</Label>
          <ImageUpload 
            value={imageUrls} 
            onChange={setImageUrls}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">名字</Label>
            <Input id="name" name="name" defaultValue={initialData?.name} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">狀態</Label>
            <Select name="status" defaultValue={initialData?.status || "open"}>
              <SelectTrigger>
                <SelectValue placeholder="選擇狀態" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">開放認養 (Open)</SelectItem>
                <SelectItem value="reserved">已預訂 (Reserved)</SelectItem>
                <SelectItem value="medical">醫療中 (Medical)</SelectItem>
                <SelectItem value="closed">已結案 (Closed)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="gender">性別</Label>
            <Select name="gender" defaultValue={initialData?.gender || "unknown"}>
              <SelectTrigger>
                <SelectValue placeholder="選擇性別" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">公 (Boy)</SelectItem>
                <SelectItem value="F">母 (Girl)</SelectItem>
                <SelectItem value="unknown">未知 (Unknown)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age_year">年齡 (歲)</Label>
            <Input 
              id="age_year" 
              name="age_year" 
              type="number" 
              defaultValue={initialData?.age_year} 
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">所在地</Label>
          <Input 
            id="location" 
            name="location" 
            defaultValue={initialData?.location} 
            placeholder="台北市 / 中途之家" 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">詳細描述 / 故事</Label>
          <Textarea 
            id="description" 
            name="description" 
            defaultValue={initialData?.description} 
            className="min-h-[150px]"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button disabled={loading} type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "儲存變更" : "建立兔子資料"}
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
