'use client';

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createVolunteer } from "@/app/actions/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function CreateVolunteerDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
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
        <Button>新增志工</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增志工帳號</DialogTitle>
          <DialogDescription>
            請輸入志工的 Email 與姓名。預設密碼將設為 email 前綴 (或自行設定)。
            此帳號將擁有後台管理權限 (無法管理人員)。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                姓名
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="王小明"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="volunteer@example.com"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                密碼
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="至少 6 碼"
                className="col-span-3"
                required
                minLength={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              建立帳號
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
