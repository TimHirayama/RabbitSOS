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
      let res;
      if (initialData) {
        res = await updateRabbit(initialData.id, formData);
      } else {
        res = await createRabbit(formData);
      }

      if (!res.success) {
        console.log("API Error Response:", res);
        throw new Error(res.error || "操作失敗");
      }
      
      console.log("API Success Response:", res);
      
      toast.success(initialData ? "更新成功" : "新增成功");
      router.push('/admin/rabbits');
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
                <SelectItem value="adopted">已送養 (Adopted)</SelectItem>
                <SelectItem value="rainbow">當天使 (Rainbow)</SelectItem>
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
          <Label htmlFor="location">所在地 (縣市)</Label>
          <Select name="location" defaultValue={initialData?.location || "台北市"}>
            <SelectTrigger>
              <SelectValue placeholder="選擇所在縣市" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="台北市">台北市</SelectItem>
              <SelectItem value="新北市">新北市</SelectItem>
              <SelectItem value="桃園市">桃園市</SelectItem>
              <SelectItem value="新竹縣市">新竹縣市</SelectItem>
              <SelectItem value="台中市">台中市</SelectItem>
              <SelectItem value="台南市">台南市</SelectItem>
              <SelectItem value="高雄市">高雄市</SelectItem>
              <SelectItem value="基隆市">基隆市</SelectItem>
              <SelectItem value="宜蘭縣">宜蘭縣</SelectItem>
              <SelectItem value="花蓮縣">花蓮縣</SelectItem>
              <SelectItem value="其他">其他地區</SelectItem>
            </SelectContent>
          </Select>
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
