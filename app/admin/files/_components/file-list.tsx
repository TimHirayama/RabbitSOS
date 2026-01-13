"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  FileText,
  Trash2,
  Copy,
  ExternalLink,
  MoreVertical,
  File as FileIcon,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FileObject {
  name: string;
  id: string | null;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>; // Allow dynamic metadata to match Supabase type
}

interface FileListProps {
  refreshTrigger: number;
  onStorageUpdate?: (bytes: number) => void;
}

export function FileList({ refreshTrigger, onStorageUpdate }: FileListProps) {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copyingId, setCopyingId] = useState<string | null>(null); // For showing checkmark

  const supabase = createClient();

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from("documents")
        .list(undefined, {
          sortBy: { column: "created_at", order: "desc" },
          limit: 100, // Reasonable limit for now
        });

      if (error) throw error;
      setFiles(data || []);

      // Calculate total size
      const totalBytes =
        data?.reduce((acc, file) => acc + (file.metadata?.size || 0), 0) || 0;
      onStorageUpdate?.(totalBytes);
    } catch (error) {
      console.error("Fetch files error:", error);
      toast.error("無法載入檔案列表");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  const getPublicUrl = (fileName: string) => {
    const { data } = supabase.storage.from("documents").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleCopyLink = (fileName: string) => {
    const url = getPublicUrl(fileName);
    navigator.clipboard.writeText(url);
    toast.success("連結已複製到剪貼簿", {
      description: "您現在可以在文章中貼上此連結",
    });
    setCopyingId(fileName);
    setTimeout(() => setCopyingId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase.storage
        .from("documents")
        .remove([deleteId]);

      if (error) throw error;

      toast.success("檔案已刪除");
      fetchFiles();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("刪除失敗");
    } finally {
      setDeleteId(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFileIcon = (mimetype: string) => {
    if (mimetype?.startsWith("image/"))
      return <ImageIcon className="h-5 w-5 text-purple-500" />;
    if (mimetype?.includes("pdf"))
      return <FileText className="h-5 w-5 text-red-500" />;
    return <FileIcon className="h-5 w-5 text-gray-500" />;
  };

  const getDisplayName = (originalName: string) => {
    // New Format: timestamp-random-base64.ext
    // Old Format: timestamp-random-encodedName

    // Try matching new Base64 format first
    // parts: timestamp, random, base64+ext
    const parts = originalName.split("-");
    if (parts.length >= 3) {
      // The last part contains base64string.ext
      const lastPart = parts.slice(2).join("-"); // Join back if random had dashes (unlikely but safe)
      const dotIndex = lastPart.lastIndexOf(".");

      let base64Str = lastPart;
      let ext = "";
      if (dotIndex !== -1) {
        base64Str = lastPart.substring(0, dotIndex);
        ext = lastPart.substring(dotIndex);
      }

      // Try decoding as Base64
      try {
        const urlSafeBase64 = base64Str.replace(/-/g, "+").replace(/_/g, "/");
        // Add padding if needed (though usually atob handles it or we can ignore)
        const pad = urlSafeBase64.length % 4;
        const paddedBase64 = pad
          ? urlSafeBase64 + "=".repeat(4 - pad)
          : urlSafeBase64;

        const decodedName = decodeURIComponent(atob(paddedBase64));
        return decodedName + ext;
      } catch (e) {
        // Fallback to old regex or return original
      }
    }

    // Fallback: Old Format Regex
    const match = originalName.match(/^\d+-[a-z0-9]+-(.+)$/);
    if (!match) return originalName;

    try {
      return decodeURIComponent(match[1]);
    } catch (e) {
      return match[1];
    }
  };

  if (loading && files.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">載入中...</div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="border rounded-md p-12 text-center text-muted-foreground bg-stone-50">
        <div className="flex justify-center mb-4">
          <FileText className="h-10 w-10 text-stone-300" />
        </div>
        目前沒有任何檔案，請上傳新檔案。
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>檔案名稱</TableHead>
              <TableHead className="w-[100px] hidden md:table-cell">
                大小
              </TableHead>
              <TableHead className="w-[150px] hidden md:table-cell">
                上傳時間
              </TableHead>
              <TableHead className="w-[100px] text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id || file.name}>
                <TableCell>{getFileIcon(file.metadata?.mimetype)}</TableCell>
                <TableCell className="max-w-[300px]">
                  <a
                    href={getPublicUrl(file.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-blue-600 hover:underline block truncate"
                    title={getDisplayName(file.name)}
                  >
                    {getDisplayName(file.name)}
                  </a>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatSize(file.metadata?.size || 0)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm hidden md:table-cell">
                  {file.created_at
                    ? format(new Date(file.created_at), "yyyy/MM/dd")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleCopyLink(file.name)}
                      >
                        {copyingId === file.name ? (
                          <Check className="mr-2 h-4 w-4" />
                        ) : (
                          <Copy className="mr-2 h-4 w-4" />
                        )}
                        複製連結
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          window.open(getPublicUrl(file.name), "_blank")
                        }
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        預覽/下載
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => setDeleteId(file.name)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        刪除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確定要刪除此檔案嗎？</AlertDialogTitle>
            <AlertDialogDescription>
              此動作無法復原。如果此檔案已被文章引用，刪除後文章內的連結將會失效。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
