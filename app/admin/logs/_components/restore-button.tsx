"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { restoreResource } from "../actions";

interface RestoreButtonProps {
  logId: string;
  action: string;
  targetResource: string;
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// ... existing state and imports ...

export function RestoreButton({
  logId,
  action,
  targetResource,
}: RestoreButtonProps) {
  const [loading, setLoading] = useState(false);

  // Only show for supported actions
  if (action !== "DELETE_RABBIT") {
    return null;
  }

  const handleRestore = async () => {
    setLoading(true);
    try {
      const res = await restoreResource(logId, action, targetResource);
      if (res.success) {
        toast.success("資料已復原");
      } else {
        toast.error(res.error || "復原失敗");
      }
    } catch (error) {
      toast.error("發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          className="h-7 text-xs px-2 ml-2 border-stone-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
        >
          {loading ? (
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
          ) : (
            <RotateCcw className="h-3 w-3 mr-1" />
          )}
          復原
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確定要復原這筆資料嗎？</AlertDialogTitle>
          <AlertDialogDescription>
            資料將會重新顯示於列表中。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRestore}
            className="bg-orange-500 hover:bg-orange-600"
          >
            確認復原
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
