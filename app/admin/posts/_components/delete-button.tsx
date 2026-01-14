"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePost } from "../actions";
import { toast } from "sonner";
import { useTransition, useState } from "react";
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

export function DeletePostButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deletePost(id);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("已刪除");
        setOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          disabled={isPending}
          suppressHydrationWarning
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確定要刪除這篇文章嗎？</AlertDialogTitle>
          <AlertDialogDescription>
            此動作無法復原。這篇文章將會從資料庫中永久移除。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isPending ? "刪除中..." : "確認刪除"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
