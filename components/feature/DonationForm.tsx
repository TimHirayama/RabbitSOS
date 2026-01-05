'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitDonationReport } from "@/app/donate/actions";
import { toast } from "sonner";
import { Loader2, UploadCloud } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// ... imports

export function DonationForm() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Default date to today
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget;

    try {
      const res = await submitDonationReport(formData);
      if (res.error) {
        toast.error(res.error);
      } else {
        // toast.success("回報成功！我們會儘快進行核對。");
        setShowSuccessDialog(true);
        // Reset form
        formElement.reset();
        setFileName("");
      }
    } catch (error) {
      toast.error("發生未預期的錯誤");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-noto-sans-tc text-stone-800">
            填寫匯款回報單
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="donor_name">捐款人姓名 <span className="text-red-500">*</span></Label>
                <Input id="donor_name" name="donor_name" required placeholder="請輸入姓名" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">捐款金額 (TWD) <span className="text-red-500">*</span></Label>
                <Input id="amount" name="amount" type="number" min="1" required placeholder="例如：1000" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="transfer_date">轉帳日期 <span className="text-red-500">*</span></Label>
                <Input 
                   id="transfer_date" 
                   name="transfer_date" 
                   type="date" 
                   required
                   defaultValue={today} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last_5_digits">帳號後五碼 <span className="text-red-500">*</span></Label>
                <Input 
                  id="last_5_digits" 
                  name="last_5_digits" 
                  maxLength={5} 
                  required 
                  placeholder="請輸入轉出帳號後五碼" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof_image">轉帳明細截圖 (憑證) <span className="text-red-500">*</span></Label>
              <div className="flex items-center gap-4">
                 <div className="relative flex-1">
                    <Input 
                      id="proof_image" 
                      name="proof_image" 
                      type="file" 
                      accept="image/*" 
                      required 
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                      onChange={handleFileChange}
                    />
                    <div className="flex items-center justify-center w-full border-2 border-dashed border-stone-300 rounded-lg p-6 bg-stone-50 hover:bg-stone-100 transition-colors">
                       <div className="text-center">
                          <UploadCloud className="mx-auto h-8 w-8 text-stone-400 mb-2" />
                          <p className="text-sm text-stone-500 font-medium">
                             {fileName ? fileName : "點擊上傳圖片"}
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">備註留言 (選填)</Label>
              <Textarea 
                id="note" 
                name="note" 
                placeholder="有什麼想對我們或兔兔說的話嗎？" 
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full text-lg h-12" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  正在送出...
                </>
              ) : (
                "送出回報"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>感謝您的愛心！</AlertDialogTitle>
            <AlertDialogDescription>
              我們已經收到您的匯款回報。志工將於近期進行核對，確認無誤後將會開立收據寄送給您。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              好的，我知道了
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
