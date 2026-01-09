"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createVolunteer } from "@/app/actions/auth";
import { toast } from "sonner";
import { UserForm } from "./user-form";

interface CreateVolunteerDialogProps {
  currentUserRole?: string;
}

export function CreateVolunteerDialog({
  currentUserRole,
}: CreateVolunteerDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      const res = await createVolunteer(formData);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("志工帳號已建立");
        setOpen(false);
      }
    } catch {
      toast.error("發生錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>新增人員</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>新增人員帳號</DialogTitle>
          <DialogDescription>
            建立新的管理員或志工帳號。請填寫詳細資料。
          </DialogDescription>
        </DialogHeader>

        <UserForm
          onSubmit={handleSubmit}
          loading={loading}
          isEdit={false}
          currentUserRole={currentUserRole}
        />
      </DialogContent>
    </Dialog>
  );
}
