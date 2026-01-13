"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database } from "lucide-react";

interface StorageStatusProps {
  usedBytes: number;
  totalBytes?: number; // Default to 1GB (1024 * 1024 * 1024)
}

export function StorageStatus({
  usedBytes,
  totalBytes = 200 * 1024 * 1024, // 200MB default
}: StorageStatusProps) {
  const percentage = Math.min(100, (usedBytes / totalBytes) * 100);

  const formatSize = (bytes: number) => {
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="bg-stone-50 border-stone-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-stone-600">
          <Database className="h-4 w-4" />
          儲存空間使用量
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-stone-900">
              {formatSize(usedBytes)}
            </span>
            <span className="text-muted-foreground">
              / {formatSize(totalBytes)}
            </span>
          </div>
          <Progress
            value={percentage}
            className={percentage > 90 ? "bg-red-200" : ""}
          />
          <p className="text-xs text-muted-foreground pt-1">
            目前使用方案：Project Limit (200MB)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
