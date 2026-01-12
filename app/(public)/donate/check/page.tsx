"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { searchDonation, SearchResult } from "./actions";
import { ApiResponse } from "@/types/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import { ReceiptDocument } from "@/components/feature/ReceiptDocument";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button variant="outline" disabled>
        載入PDF引擎...
      </Button>
    ),
  }
);

const initialState: ApiResponse<SearchResult[]> = {
  success: false,
  data: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-orange-600 hover:bg-orange-700"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          查詢中...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          查詢
        </>
      )}
    </Button>
  );
}

export default function CheckDonationPage() {
  const [state, formAction] = useActionState<
    ApiResponse<SearchResult[]>,
    FormData
  >(searchDonation, initialState);

  // Debug: Log response for verification
  if (state.success || state.error) {
    console.log("Donation Search API Response:", state);
  }
  const [verifyType, setVerifyType] = useState("digits");

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-linear-to-r from-orange-900 to-stone-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FileText className="w-16 h-16 text-orange-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-bold font-noto-sans-tc mb-4 md:mb-6 leading-tight">
            查詢捐款與收據
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            輸入您的捐款資訊，
            <br className="hidden md:block" />
            查詢處理進度並下載電子收據。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl -translate-y-8 md:-translate-y-10 relative z-20">
        <Card>
          <CardHeader>
            <CardTitle>捐款查詢</CardTitle>
            <CardDescription>請輸入當初填寫回報單時的資訊</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="donor_name">捐款人姓名</Label>
                <Input
                  id="donor_name"
                  name="donor_name"
                  placeholder="王小明"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>驗證方式</Label>
                <RadioGroup
                  defaultValue="digits"
                  name="verify_type"
                  onValueChange={setVerifyType}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="digits" id="r1" />
                    <Label htmlFor="r1">帳號末五碼</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="date" id="r2" />
                    <Label htmlFor="r2">轉帳日期</Label>
                  </div>
                </RadioGroup>

                {verifyType === "digits" ? (
                  <Input
                    name="verify_value"
                    placeholder="請輸入帳號末五碼 (例: 12345)"
                    maxLength={5}
                    required
                  />
                ) : (
                  <Input name="verify_value" type="date" required />
                )}
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

        {/* Results */}
        {state?.success && state.data && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              查詢結果 ({state.data.length} 筆)
            </h2>

            {state.data.map((donation: any) => (
              <Card key={donation.id} className="overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-stone-800">
                        NT$ {donation.amount.toLocaleString()}
                      </span>
                      <Badge
                        variant={
                          donation.status === "verified"
                            ? "default"
                            : "secondary"
                        }
                        className={cn(
                          donation.status === "verified"
                            ? "bg-green-600 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-500 text-white"
                        )}
                      >
                        {donation.status === "verified" ? "已認證" : "審核中"}
                      </Badge>
                    </div>
                    <div className="text-sm text-stone-500">
                      捐款日期: {donation.transfer_date}
                      <span className="mx-2">|</span>
                      回報時間:{" "}
                      {format(
                        new Date(donation.created_at),
                        "yyyy-MM-dd HH:mm"
                      )}
                    </div>
                  </div>

                  {donation.status === "verified" ? (
                    <div className="flex flex-col gap-2">
                      <PDFDownloadLink
                        document={
                          <ReceiptDocument
                            receiptNo={donation.receipt_no || "N/A"}
                            date={format(
                              new Date(donation.created_at),
                              "yyyy-MM-dd"
                            )}
                            donorName={donation.donor_name}
                            taxId={donation.donor_tax_id || undefined}
                            amount={donation.amount}
                          />
                        }
                        fileName={`donation_receipt_${
                          donation.receipt_no || donation.id
                        }.pdf`}
                      >
                        {/* @ts-ignore - render props type mismatch often happens with this lib */}
                        {({ blob, url, loading, error }: any) => (
                          <Button
                            variant="outline"
                            className="border-green-600 text-green-700 hover:bg-green-50 w-full"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                產生中...
                              </>
                            ) : (
                              <>
                                <Download className="mr-2 h-4 w-4" />
                                下載收據
                              </>
                            )}
                          </Button>
                        )}
                      </PDFDownloadLink>
                    </div>
                  ) : (
                    <Button variant="ghost" disabled className="text-stone-400">
                      收據製作中
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
