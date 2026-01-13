"use client";

import { useState } from "react";
import { FileUploader } from "./_components/file-uploader";
import { FileList } from "./_components/file-list";
import { Separator } from "@/components/ui/separator";
import { StorageStatus } from "./_components/storage-status";

export default function FilesPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [usedBytes, setUsedBytes] = useState(0);

  const handleUploadComplete = () => {
    // Increment specific trigger to cause FileList to reload
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">檔案管理</h1>
        <p className="text-muted-foreground mt-2">
          上傳並管理文件檔案 (PDF, Word, Excel
          等)。上傳後可複製連結並貼到文章中供人下載。
        </p>
      </div>
      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Uploader */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <StorageStatus usedBytes={usedBytes} />

            <FileUploader onUploadComplete={handleUploadComplete} />

            <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm leading-relaxed">
              <p className="font-semibold mb-1">💡 小撇步</p>
              上傳後，請點擊檔案右側的選單
              (三個點)，選擇「複製連結」，然後到文章編輯器中將文字設定為超連結即可。
            </div>
          </div>
        </div>

        {/* Right: File List */}
        <div className="lg:col-span-2 space-y-4">
          <FileList
            refreshTrigger={refreshTrigger}
            onStorageUpdate={setUsedBytes}
          />
        </div>
      </div>
    </div>
  );
}
