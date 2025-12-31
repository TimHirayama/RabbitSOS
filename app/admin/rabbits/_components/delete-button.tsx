'use client';

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteRabbit } from "../actions";
import { toast } from "sonner";
import { useTransition } from "react";

export function DeleteRabbitButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("確定要刪除這筆資料嗎？此動作無法復原。")) {
      startTransition(async () => {
        const res = await deleteRabbit(id);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("已刪除");
        }
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-500 hover:bg-red-50 hover:text-red-600"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
