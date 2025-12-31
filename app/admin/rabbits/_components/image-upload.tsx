'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { X, ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function ImageUpload({ value = [], onChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      onChange([...value, publicUrl]);
      toast.success("圖片上傳成功");
      
    } catch (error: any) {
      toast.error("上傳失敗: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const onRemove = (url: string) => {
    onChange(value.filter((current) => current !== url));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden border">
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img 
              src={url} 
              alt="Rabbit Image" 
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <div>
        <Button
          type="button"
          disabled={disabled || uploading}
          variant="secondary"
          className="relative"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <ImagePlus className="h-4 w-4 mr-2" />
          )}
          上傳圖片
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={onUpload}
            disabled={disabled || uploading}
          />
        </Button>
      </div>
    </div>
  );
}
