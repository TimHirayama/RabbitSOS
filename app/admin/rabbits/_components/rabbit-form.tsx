"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import { DailyPhotoManager } from "./daily-photo-manager";
import { createRabbit, updateRabbit } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface RabbitFormProps {
  initialData?: any;
  initialDailyPhotos?: any[];
}

export function RabbitForm({
  initialData,
  initialDailyPhotos = [],
}: RabbitFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.image_urls || []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // Append images
    imageUrls.forEach((url) => formData.append("image_urls", url));

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
      router.push("/admin/rabbits");
      router.refresh();
    } catch (error: any) {
      toast.error("儲存失敗: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {initialData ? `編輯: ${initialData.name}` : "新增兔子資料"}
        </h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.back()}
            disabled={loading}
          >
            取消
          </Button>
          <Button disabled={loading} type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "儲存變更" : "建立資料"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Main Content (2/3) */}
        <div className="md:col-span-2 space-y-6">
          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📸</span> 照片管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>照片上傳 (第一張將作為封面)</Label>
                <ImageUpload
                  value={imageUrls}
                  onChange={setImageUrls}
                  disabled={loading}
                />
              </div>
            </CardContent>
          </Card>

          {/* Basic Info & Story */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">📝</span> 基本資料與故事
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">名字</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={initialData?.name}
                  required
                  className="text-lg font-bold"
                  placeholder="請輸入兔子名字"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="short_description">一句話簡介 (約20字)</Label>
                <Input
                  id="short_description"
                  name="short_description"
                  defaultValue={initialData?.short_description}
                  placeholder="例如：安靜乖巧的白色小天使，喜歡摸頭"
                  maxLength={40}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">完整故事 / 詳細描述</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={initialData?.description}
                  className="min-h-[300px] text-base leading-relaxed"
                  placeholder="請詳細描述兔子的個性、救援經過、相處細節..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Daily Photos (Only for existing rabbits) */}
          {initialData?.id && (
            <DailyPhotoManager
              rabbitId={initialData.id}
              initialPhotos={initialDailyPhotos}
            />
          )}
        </div>

        {/* Right Column: Metadata (1/3) */}
        <div className="space-y-6">
          {/* Status & Location */}
          <Card className="border-l-4 border-l-orange-500 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">狀態設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="status">目前狀態</Label>
                <Select
                  name="status"
                  defaultValue={initialData?.status || "open"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="選擇狀態" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">🟢 開放認養 (Open)</SelectItem>
                    <SelectItem value="reserved">
                      🟡 已預訂 (Reserved)
                    </SelectItem>
                    <SelectItem value="medical">🔴 醫療中 (Medical)</SelectItem>
                    <SelectItem value="adopted">🏠 已送養 (Adopted)</SelectItem>
                    <SelectItem value="rainbow">🌈 當天使 (Rainbow)</SelectItem>
                    <SelectItem value="closed">⛔️ 已結案 (Closed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">所在地</Label>
                <Select
                  name="location"
                  defaultValue={initialData?.location || "台北市"}
                >
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
            </CardContent>
          </Card>

          {/* Identity Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">特徵與生理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="gender">性別</Label>
                  <Select
                    name="gender"
                    defaultValue={initialData?.gender || "unknown"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">♂ 公 (Boy)</SelectItem>
                      <SelectItem value="F">♀ 母 (Girl)</SelectItem>
                      <SelectItem value="unknown">? 未知</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="breed">品種</Label>
                  <Input
                    id="breed"
                    name="breed"
                    defaultValue={initialData?.breed}
                    placeholder="例:道奇"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="age_category">年齡層</Label>
                <Select
                  name="age_category"
                  defaultValue={initialData?.age_category || "成兔"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="選擇年齡層" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="幼兔">👶 幼兔 (Baby)</SelectItem>
                    <SelectItem value="年輕成兔">
                      🧑 年輕成兔 (Young)
                    </SelectItem>
                    <SelectItem value="成兔">👨 成兔 (Adult)</SelectItem>
                    <SelectItem value="老兔">👴 老兔 (Senior)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="age_year">歲數 (數字)</Label>
                  <Input
                    id="age_year"
                    name="age_year"
                    type="number"
                    defaultValue={initialData?.age_year}
                    placeholder="ex: 2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weight">體重 (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    defaultValue={initialData?.weight}
                    placeholder="ex: 1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habits */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">生活習慣</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="litter_habits">便溺習慣</Label>
                <Select
                  name="litter_habits"
                  defaultValue={initialData?.litter_habits || "會用便盆"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="選擇習慣" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="會用便盆">會用便盆</SelectItem>
                    <SelectItem value="部分會用">部分會用</SelectItem>
                    <SelectItem value="不會用便盆">不會用便盆</SelectItem>
                    <SelectItem value="訓練中">訓練中</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="feed_type">飼料種類</Label>
                <Input
                  id="feed_type"
                  name="feed_type"
                  defaultValue={initialData?.feed_type}
                  placeholder="ex: 提摩西"
                />
              </div>
            </CardContent>
          </Card>

          {/* Source Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">來源紀錄</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="introducer_name">通報人/介紹人</Label>
                <Input
                  id="introducer_name"
                  name="introducer_name"
                  defaultValue={initialData?.introducer_name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="introducer_org">單位 (若有)</Label>
                <Input
                  id="introducer_org"
                  name="introducer_org"
                  defaultValue={initialData?.introducer_org}
                  placeholder="ex: 愛兔協會"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">
                    救援日期
                  </Label>
                  <Input
                    className="h-8 text-sm"
                    id="rescue_date"
                    name="rescue_date"
                    type="date"
                    defaultValue={initialData?.rescue_date}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="text-xs text-muted-foreground">
                    接手日期
                  </Label>
                  <Input
                    className="h-8 text-sm"
                    id="intake_date"
                    name="intake_date"
                    type="date"
                    defaultValue={initialData?.intake_date}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
