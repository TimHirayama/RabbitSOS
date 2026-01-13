"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onUploadComplete: () => void;
}

export function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    // Basic validation
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast.error("檔案太大", { description: "請上傳小於 10MB 的檔案" });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Create a unique filename to avoid collisions but keep original extension
      // Format: timestamp-random-base64.ext
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);

      // Get extension
      const parts = file.name.split(".");
      const ext = parts.length > 1 ? `.${parts.pop()}` : "";
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

      // Base64 encode the filename (safe for any charset)
      // window.btoa(encodeURIComponent(str)) handles unicode correctly
      const base64Name = window
        .btoa(encodeURIComponent(nameWithoutExt))
        .replace(/\+/g, "-") // URL safe
        .replace(/\//g, "_")
        .replace(/=/g, ""); // Remove padding

      const fileName = `${timestamp}-${random}-${base64Name}${ext}`;

      const { error } = await supabase.storage
        .from("documents")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      setProgress(100);
      toast.success("上傳成功", { description: file.name });
      onUploadComplete();

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("上傳失敗", { description: error.message });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 transition-colors text-center",
        isDragOver
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50",
        uploading && "pointer-events-none opacity-60"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
      />

      <div className="flex flex-col items-center gap-2">
        {uploading ? (
          <>
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <div className="w-full max-w-xs mt-4">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">上傳中...</p>
          </>
        ) : (
          <>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mt-2">點擊或拖曳檔案至此</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              支援 PDF, Word, Excel, 圖片等格式 (最大 10MB)
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = ""; // Reset to allow re-selection of same file
                  fileInputRef.current.click();
                }
              }}
            >
              選擇檔案
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
