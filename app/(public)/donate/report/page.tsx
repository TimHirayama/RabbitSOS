"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitDonation } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Upload, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ApiResponse } from "@/types/api";

const initialState: ApiResponse<null> = {
  success: false,
  message: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-orange-600 hover:bg-orange-700 h-11 text-lg font-bold"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          資料送出中...
        </>
      ) : (
        <>
          <Send className="mr-2 h-5 w-5" />
          送出回報
        </>
      )}
    </Button>
  );
}

export default function DonationReportPage() {
  const [state, formAction] = useActionState(submitDonation, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("檔案大小不能超過 5MB");
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  if (state?.success) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8 border-green-200 bg-green-50">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Send className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">回報成功！</h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            謝謝您的愛心捐款！❤️
            <br />
            我們已收到您的回報，志工將會盡快核對款項。
            <br />
            核對完成後，您可以至「查詢捐款」下載收據。
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/donate/check">前往查詢收據</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">回首頁</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="mb-6 absolute top-6 left-4 z-30">
        <Button
          variant="ghost"
          asChild
          className="pl-0 text-white hover:text-orange-200 hover:bg-transparent"
        >
          <Link href="/donate">
            <ArrowLeft className="mr-2 w-4 h-4" /> 返回捐款說明
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-linear-to-r from-orange-900 to-stone-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Send className="w-16 h-16 text-orange-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-bold font-noto-sans-tc mb-4 md:mb-6 leading-tight">
            捐款人捐款通知單
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            感謝您的捐款支持！
            <br className="hidden md:block" />
            請填寫下列資訊以利我們核對款項與開立收據。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl -translate-y-8 md:-translate-y-10 relative z-20">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <form action={formAction} className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2">
                  捐款資訊
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donor_name">捐款人姓名 *</Label>
                    <Input
                      id="donor_name"
                      name="donor_name"
                      placeholder="收據抬頭"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">捐款金額 *</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="NT$ 1000"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transfer_date">轉帳日期 *</Label>
                    <Input
                      id="transfer_date"
                      name="transfer_date"
                      type="date"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_5_digits">帳號末五碼 *</Label>
                    <Input
                      id="last_5_digits"
                      name="last_5_digits"
                      placeholder="存摺帳號後 5 碼"
                      maxLength={5}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2">
                  聯絡資訊
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donor_phone">手機號碼 *</Label>
                    <Input
                      id="donor_phone"
                      name="donor_phone"
                      type="tel"
                      placeholder="09xxxxxxxx"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor_email">電子信箱 *</Label>
                    <Input
                      id="donor_email"
                      name="donor_email"
                      type="email"
                      placeholder="寄送收據通知用"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donor_tax_id">身分證字號 / 統編 (選填)</Label>
                  <Input
                    id="donor_tax_id"
                    name="donor_tax_id"
                    placeholder="如需申報抵稅請務必填寫"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receipt_address">收據寄送地址 (選填)</Label>
                  <Input
                    id="receipt_address"
                    name="receipt_address"
                    placeholder="如需紙本收據請填寫"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2">
                  其他
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="proof_image">轉帳明細截圖 (選填)</Label>
                  <div className="border-2 border-dashed border-stone-200 rounded-lg p-6 text-center hover:border-orange-300 hover:bg-orange-50/50 transition-colors relative">
                    <Input
                      id="proof_image"
                      name="proof_image"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleImageChange}
                    />
                    {previewUrl ? (
                      <div className="relative h-40 w-full">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-stone-400">
                        <Upload className="w-8 h-8 mb-2" />
                        <span>點擊上傳圖片 (5MB以下)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">給協會的話 (選填)</Label>
                  <Textarea
                    id="note"
                    name="note"
                    placeholder="有什麼想對我們說的嗎？"
                  />
                </div>
              </div>

              {state?.error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
                  {state.error}
                </div>
              )}

              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
