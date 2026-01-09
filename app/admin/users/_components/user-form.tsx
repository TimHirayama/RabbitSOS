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
import { Loader2, Camera, Palette, Upload, ShieldAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UserFormProps {
  initialData?: any;
  isEdit?: boolean;
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
  canEditRole?: boolean;
  currentUserRole?: string;
  currentUserId?: string;
}

export function UserForm({
  initialData,
  isEdit,
  onSubmit,
  loading,
  currentUserRole,
  currentUserId,
}: UserFormProps) {
  // ... (keep state)
  const [avatarMode, setAvatarMode] = useState<"image" | "color">(
    initialData?.avatar_url ? "image" : "color"
  );
  const [selectedColor, setSelectedColor] = useState(
    initialData?.avatar_color || "#3b82f6"
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.avatar_url || null
  );

  const colors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#64748b",
    "#000000",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (avatarMode === "color") {
      formData.delete("avatar_file");
      formData.set("avatar_color", selectedColor);
      formData.set("avatar_mode", "color");
    } else {
      formData.set("avatar_mode", "image");
    }
    onSubmit(formData);
  };

  const isSelf = initialData?.id === currentUserId;
  const targetIsVolunteer =
    initialData?.role === "volunteer" || !initialData?.role;

  // Permission Logic
  const canManageStatus =
    isEdit &&
    !isSelf &&
    (currentUserRole === "super_admin" ||
      (currentUserRole === "admin" && targetIsVolunteer));

  const canManageRole = isEdit && !isSelf && currentUserRole === "super_admin";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4 px-6 md:px-8 mb-4">
      {/* Hidden Fields: Only if role not managed manually */}
      {!canManageRole && (
        <input
          type="hidden"
          name="role"
          value={initialData?.role || "volunteer"}
        />
      )}

      {/* Avatar Section ... (Keep existing) */}
      <div className="space-y-3 pb-4 border-b">
        <Label>頭像設定</Label>
        <Tabs
          value={avatarMode}
          onValueChange={(v) => setAvatarMode(v as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Camera className="h-4 w-4" /> 上傳圖片
            </TabsTrigger>
            <TabsTrigger value="color" className="flex items-center gap-2">
              <Palette className="h-4 w-4" /> 選擇背景色
            </TabsTrigger>
          </TabsList>
          <TabsContent value="image" className="space-y-4 pt-4">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full border-2 border-dashed flex items-center justify-center bg-muted overflow-hidden relative shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground opacity-50" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="avatar_file" className="cursor-pointer">
                  <div className="flex items-center justify-center w-full h-10 border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium">
                    選擇檔案...
                  </div>
                  <input
                    id="avatar_file"
                    name="avatar_file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
                <p className="text-xs text-muted-foreground">
                  支援 JPG, PNG, GIF
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="color" className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div
                className="h-20 w-20 rounded-full flex items-center justify-center font-bold text-2xl text-white shrink-0 shadow-sm transition-colors"
                style={{ backgroundColor: selectedColor }}
              >
                {initialData?.full_name?.[0] || "?"}
              </div>
              <div className="flex-1 grid grid-cols-5 gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`h-8 w-8 rounded-full border-2 ${
                      selectedColor === c
                        ? "border-foreground shadow-sm scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Basic Info Fields ... */}
      <div className="grid gap-2">
        <Label htmlFor="email">Email (帳號)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={initialData?.email}
          required
          disabled={isEdit}
          placeholder="user@example.com"
        />
        {isEdit && (
          <p className="text-xs text-muted-foreground">
            Email 作為帳號識別，無法修改
          </p>
        )}
      </div>

      {!isEdit && (
        <div className="grid gap-2">
          <Label htmlFor="password">密碼</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="預設密碼"
            minLength={6}
            required
          />
          <p className="text-xs text-muted-foreground">
            建立後使用者可自行修改
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="full_name">姓名</Label>
          <Input
            id="full_name"
            name="full_name"
            defaultValue={initialData?.full_name || ""}
            required
            placeholder="王小明"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role_title">角色稱謂</Label>
          <Input
            id="role_title"
            name="role_title"
            defaultValue={initialData?.role_title || ""}
            placeholder="如：清潔組長"
          />
        </div>
      </div>

      {/* Contact Info ... */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="phone">聯絡電話</Label>
          <Input
            id="phone"
            name="phone"
            defaultValue={initialData?.phone || ""}
            placeholder="0912-345-678"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="national_id">身分證字號</Label>
          <Input
            id="national_id"
            name="national_id"
            defaultValue={initialData?.national_id || ""}
            placeholder="A123456789"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="address">聯絡地址</Label>
        <Input
          id="address"
          name="address"
          defaultValue={initialData?.address || ""}
          placeholder="台北市..."
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="note">備註</Label>
        <Textarea
          id="note"
          name="note"
          defaultValue={initialData?.note || ""}
          placeholder="其他註記事項..."
          className="min-h-[80px]"
        />
      </div>

      {/* Account Permissions Section */}
      {(canManageStatus || canManageRole) && (
        <div className="rounded-lg border bg-muted/20 p-4 space-y-4">
          <h3 className="font-semibold text-sm flex items-center gap-2 text-foreground">
            <ShieldAlert className="w-4 h-4 text-orange-500" />
            帳號權限管理
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {canManageStatus && (
              <div className="grid gap-2">
                <Label>帳號狀態</Label>
                <Select
                  name="status"
                  defaultValue={initialData?.status || "active"}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">正常使用</SelectItem>
                    <SelectItem
                      value="suspended"
                      className="text-red-500 font-medium"
                    >
                      停權
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {canManageRole && (
              <div className="grid gap-2">
                <Label>系統權限</Label>
                <Select
                  name="role"
                  defaultValue={initialData?.role || "volunteer"}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="super_admin"
                      className="text-purple-600 font-medium"
                    >
                      超級管理員
                    </SelectItem>
                    <SelectItem
                      value="admin"
                      className="text-blue-600 font-medium"
                    >
                      管理員
                    </SelectItem>
                    <SelectItem value="volunteer">志工</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "儲存變更" : "建立帳號"}
        </Button>
      </div>
    </form>
  );
}
