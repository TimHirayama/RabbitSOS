"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserForm } from "./user-form";
import { updateUserProfile } from "../actions";
import { toast } from "sonner";
import { Edit } from "lucide-react";

interface EditUserSheetProps {
  user: any;
  currentUserRole?: string;
  currentUserId?: string;
}

export function EditUserSheet({
  user,
  currentUserRole,
  currentUserId,
}: EditUserSheetProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await updateUserProfile(user.id, formData);
      if (res.success) {
        toast.success("使用者資料已更新");
        setOpen(false);
      } else {
        toast.error(res.error || "更新失敗");
      }
    } catch (error) {
      toast.error("發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
          <Edit className="h-4 w-4 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-[700px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>編輯人員資料</SheetTitle>
          <SheetDescription>
            修改 {user.full_name || user.email} 的詳細資料。
          </SheetDescription>
        </SheetHeader>

        <UserForm
          initialData={user}
          isEdit={true}
          onSubmit={handleSubmit}
          loading={loading}
          currentUserRole={currentUserRole}
          currentUserId={currentUserId}
        />
      </SheetContent>
    </Sheet>
  );
}
