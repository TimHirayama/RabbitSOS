'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { uploadBanner } from '../actions';
import { toast } from 'sonner';

import imageCompression from 'browser-image-compression';

// ...

export function BannerUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    // Copy form data first
    const formData = new FormData(e.currentTarget);
    
    try {
      let uploadFile = file;

      // Auto-compress if > 2MB
      if (file.size > 2 * 1024 * 1024) {
        toast.info('圖片大於 2MB，正在自動壓縮中...', { duration: 3000 });
        const options = {
          maxSizeMB: 1.5, // Target < 2MB (leave some buffer)
          maxWidthOrHeight: 1920, // Reasonable max dimension for web
          useWebWorker: true,
        };
        try {
           uploadFile = await imageCompression(file, options);
           // Update the file in FormData
           formData.set('file', uploadFile);
        } catch (error) {
           console.error('Compression failed:', error);
           toast.warning('壓縮失敗，嘗試以上傳原圖...');
        }
      }

      const result = await uploadBanner(formData);
      if (result.error) {
        toast.error('上傳失敗：' + result.error);
      } else {
        toast.success('上傳成功！');
        (e.target as HTMLFormElement).reset();
        setFile(null);
      }
    } catch (err) {
      toast.error('上傳發生錯誤');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>新增橫幅廣告</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-sm font-medium">圖片 (建議 16:9, Max 2MB)</label>
            <Input 
              name="file" 
              type="file" 
              accept="image/*" 
              required
              disabled={isUploading}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
             <label className="text-sm font-medium">標題 / Alt Text (選填)</label>
             <Input name="title" placeholder="例如：兔子送養活動" disabled={isUploading} />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
             <label className="text-sm font-medium">連結網址 (選填)</label>
             <Input name="link_url" placeholder="https://..." disabled={isUploading} />
          </div>



          <Button type="submit" disabled={!file || isUploading}>
            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            {isUploading ? '上傳中...' : '新增 Banner'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
