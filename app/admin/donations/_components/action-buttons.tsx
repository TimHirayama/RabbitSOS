'use client';

import { Button } from "@/components/ui/button";
import { verifyDonation, rejectDonation, revertDonation } from "../actions";
import { toast } from "sonner";
import { Check, X, AlertCircle, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function VerifyButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    const res = await verifyDonation(id);
    if (res.error) toast.error(res.error);
    else {
      toast.success("已核銷成功");
      setOpen(false);
    }
    setLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
          <Check className="mr-1 h-4 w-4" />
          核銷
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確認核銷此筆捐款？</AlertDialogTitle>
          <AlertDialogDescription>
            此操作將標記款項為已收到，並自動生成電子收據編號。此動作無法復原。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>取消</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => { e.preventDefault(); handleVerify(); }} disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? "處理中..." : "確認核銷"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function IssueButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleIssue = async () => {
    const res = await rejectDonation(id, note);
    if (res.error) toast.error(res.error);
    else {
      toast.success("已標記為有問題");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 border-amber-200">
          <AlertCircle className="mr-1 h-4 w-4" />
          有問題
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>標記為問題案件</DialogTitle>
          <DialogDescription>
             請輸入問題原因 (例如：未收到款項、截圖模糊等)。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <Label>問題說明</Label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="default" className="bg-amber-600 hover:bg-amber-700 text-white" onClick={handleIssue}>確認送出</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export function RevertButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRevert = async () => {
    setLoading(true);
    const res = await revertDonation(id);
    if (res.error) toast.error(res.error);
    else {
      toast.success("已復原為待核對狀態");
      setOpen(false);
    }
    setLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-6 w-6 text-stone-400 hover:text-stone-600 hover:bg-stone-100" title="復原至待核對">
           <RotateCcw className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確認復原此筆捐款？</AlertDialogTitle>
          <AlertDialogDescription>
            此操作將把狀態重置為「待核對」，並清除相關收據編號與備註。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>取消</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => { e.preventDefault(); handleRevert(); }} disabled={loading} className="bg-stone-600 hover:bg-stone-700">
            {loading ? "處理中..." : "確認復原"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
