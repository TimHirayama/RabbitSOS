'use client';

import { Button } from "@/components/ui/button";
import { verifyDonation, rejectDonation } from "../actions";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function VerifyButton({ id }: { id: string }) {
  const handleVerify = async () => {
    if (confirm("確認已收到款項並核銷？系統將自動生成收據編號。")) {
      const res = await verifyDonation(id);
      if (res.error) toast.error(res.error);
      else toast.success("已核銷成功");
    }
  };

  return (
    <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={handleVerify}>
      <Check className="mr-1 h-4 w-4" />
      核銷
    </Button>
  );
}

export function RejectButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleReject = async () => {
    const res = await rejectDonation(id, note);
    if (res.error) toast.error(res.error);
    else {
      toast.success("已標記為問題案件");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <X className="mr-1 h-4 w-4" />
          駁回
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>標記為問題案件</DialogTitle>
          <DialogDescription>
             請輸入駁回原因 (例如：未收到款項、截圖模糊等)。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <Label>備註原因</Label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={handleReject}>確認駁回</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
