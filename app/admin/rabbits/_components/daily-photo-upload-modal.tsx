"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Upload, CloudUpload } from "lucide-react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { uploadDailyPhoto } from "../daily-photo-actions";

interface DailyPhotoUploadModalProps {
  rabbitId: string;
  onUploadSuccess?: () => void;
  children?: React.ReactNode;
}

export function DailyPhotoUploadModal({
  rabbitId,
  onUploadSuccess,
  children,
}: DailyPhotoUploadModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Create previews
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Batch upload logic
  const handleUpload = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setProgress({ current: 0, total: files.length });

    try {
      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Update progress
        setProgress({ current: i + 1, total: files.length });

        try {
          let uploadFile = file;
          // Compress if needed (> 1MB)
          if (file.size > 1 * 1024 * 1024) {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };
            try {
              uploadFile = await imageCompression(file, options);
            } catch (err) {
              console.error("Compression failed", err);
            }
          }

          const formData = new FormData();
          formData.append("rabbitId", rabbitId);
          formData.append("file", uploadFile);
          formData.append("description", ""); // Empty description for now, edit later

          const res = await uploadDailyPhoto(formData);
          if (!res.success) throw new Error(res.error);

          successCount++;
        } catch (err) {
          console.error(err);
          errorCount++;
        }
      }

      if (errorCount === 0) {
        toast.success(`成功上傳 ${successCount} 張照片`);
      } else {
        toast.warning(`上傳完成：${successCount} 成功, ${errorCount} 失敗`);
      }

      setFiles([]);
      setPreviews([]);
      setOpen(false);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error: any) {
      toast.error("上傳過程發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <CloudUpload className="mr-2 h-4 w-4" />
            批次上傳
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>批次上傳生活照</DialogTitle>
          <DialogDescription>
            你可以一次選擇多張照片。上傳後再編輯描述。
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-stone-50 hover:bg-stone-100 border-stone-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-stone-500" />
                <p className="mb-2 text-sm text-stone-500">
                  <span className="font-semibold">點擊選擇</span> 或拖曳多張照片
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {/* Preview Grid */}
          {files.length > 0 && (
            <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto p-1">
              {previews.map((src, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded overflow-hidden border group"
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt="preview"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-2 text-sm text-stone-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              正在上傳 {progress.current} / {progress.total}...
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            取消
          </Button>
          <Button
            onClick={handleUpload}
            disabled={files.length === 0 || loading}
          >
            {loading ? "處理中..." : `確認上傳 (${files.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
