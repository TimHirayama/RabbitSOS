"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { CalendarIcon, Upload, Loader2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submitDonation } from "@/app/(public)/donate/actions";
import { toast } from "sonner";

// Schema (unchanged)
const donationSchema = z.object({
  donor_name: z.string().min(2, "請輸入捐款人姓名"),
  donor_email: z.string().email("請輸入有效的 Email"),
  donor_phone: z.string().min(8, "請輸入聯絡電話"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "請輸入有效的金額",
  }),
  transfer_date: z.date({
    message: "請選擇轉帳日期",
  }),
  last_5_digits: z.string().length(5, "請輸入剛好 5 碼數字"),
  need_receipt: z.boolean(),
  donor_tax_id: z.string().optional(),
  receipt_address: z.string().optional(),
  note: z.string().optional(),
  proof_image: z.any().optional(),
});

export function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof donationSchema>>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donor_name: "",
      donor_email: "",
      donor_phone: "",
      amount: "",
      last_5_digits: "",
      need_receipt: false,
      donor_tax_id: "",
      receipt_address: "",
      note: "",
      transfer_date: new Date(),
    },
  });

  const needReceipt = form.watch("need_receipt");

  async function onSubmit(values: z.infer<typeof donationSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("donor_name", values.donor_name);
      formData.append("donor_email", values.donor_email);
      formData.append("donor_phone", values.donor_phone);
      formData.append("amount", values.amount);
      formData.append("transfer_date", format(values.transfer_date, "yyyy-MM-dd"));
      formData.append("last_5_digits", values.last_5_digits);
      formData.append("note", values.note || "");
      
      if (values.need_receipt) {
         if (values.donor_tax_id) formData.append("donor_tax_id", values.donor_tax_id);
         if (values.receipt_address) formData.append("receipt_address", values.receipt_address);
      }

      // Handle File
      const fileInput = document.getElementById("proof_image") as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append("proof_image", fileInput.files[0]);
      }

      const result = await submitDonation(null, formData);

      if (!result.success) {
        toast.error("提交失敗", {
          description: result.error || "請稍後再試",
        });
      } else {
        setIsSuccess(true);
        toast.success("提交成功", {
          description: "感謝您的愛心！我們已收到您的回報。",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("發生錯誤", {
          description: "請稍後再試",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <Card className="max-w-xl mx-auto border-green-200 bg-green-50">
        <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800">感謝您的愛心捐款！</h2>
          <p className="text-green-700 max-w-md">
            我們已收到您的回報資料。工作人員將在核對款項後（約 3-5 個工作天）開立收據。
            <br />
            您可以隨時透過「查詢功能」追蹤進度並下載電子收據。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
             <Button 
               asChild
               variant="outline"
               className="bg-white hover:bg-green-50 text-green-700 border-green-200"
             >
                <a href="/donate/check" target="_blank">查詢捐款與下載收據</a>
             </Button>

             <Button 
               onClick={() => {
                  setIsSuccess(false);
                  form.reset();
               }}
               className="bg-green-600 hover:bg-green-700"
             >
               再次回報
             </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>填寫匯款回報單</CardTitle>
          <CardDescription>
            請在完成銀行轉帳後填寫此表單，以利我們核對款項並開立收據。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="donor_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>捐款人姓名 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="王小明" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="donor_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>聯絡電話 <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="0912-345-678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="donor_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電子信箱 <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border-t pt-4 mt-4">
                 <h3 className="text-lg font-semibold mb-4 text-stone-700">匯款資訊</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>捐款金額 <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="1000" type="number" step={100} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_5_digits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>帳號末五碼 <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="12345" maxLength={5} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>

                 <FormField
                  control={form.control}
                  name="transfer_date"
                  render={({ field }) => {
                    const date = field.value || new Date();
                    const currentYear = new Date().getFullYear();
                    // Generate years: Current+1 down to Current-5
                    const years = Array.from({ length: 7 }, (_, i) => currentYear + 1 - i);
                    const months = Array.from({ length: 12 }, (_, i) => i + 1);
                    const days = Array.from({ length: 31 }, (_, i) => i + 1);

                    const setDatePart = (type: "year" | "month" | "day", value: string) => {
                      const newDate = new Date(date);
                      if (type === "year") newDate.setFullYear(parseInt(value));
                      if (type === "month") newDate.setMonth(parseInt(value) - 1);
                      if (type === "day") newDate.setDate(parseInt(value));
                      field.onChange(newDate);
                    };

                    return (
                      <FormItem className="flex flex-col mt-4">
                        <FormLabel>轉帳日期 <span className="text-red-500">*</span></FormLabel>
                        <div className="flex gap-2">
                          <Select
                            value={date.getFullYear().toString()}
                            onValueChange={(v) => setDatePart("year", v)}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="年" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((y) => (
                                <SelectItem key={y} value={y.toString()}>
                                  {y}年
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={(date.getMonth() + 1).toString()}
                            onValueChange={(v) => setDatePart("month", v)}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="月" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((m) => (
                                <SelectItem key={m} value={m.toString()}>
                                    {m}月
                                </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={date.getDate().toString()}
                            onValueChange={(v) => setDatePart("day", v)}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="日" />
                            </SelectTrigger>
                            <SelectContent>
                                {days.map((d) => (
                                <SelectItem key={d} value={d.toString()}>
                                    {d}日
                                </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                
                
                
                <div className="mt-4">
                   <FormLabel>轉帳明細截圖 (選填)</FormLabel>
                   <Input 
                      id="proof_image" 
                      type="file" 
                      accept="image/*" 
                      className="cursor-pointer mt-2"
                   />
                   <p className="text-xs text-muted-foreground mt-1">
                      上傳明細可加速核對作業，支援 JPG/PNG 格式。
                   </p>
                </div>
              </div>

              <div className="border-t pt-4 mt-4 bg-stone-50 p-4 rounded-lg">
                <FormField
                  control={form.control}
                  name="need_receipt"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          我需要開立捐款收據
                        </FormLabel>
                        <FormDescription>
                          若勾選，我們將依據填寫資訊寄送紙本或電子收據。
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {needReceipt && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4 animate-in fade-in slide-in-from-top-2">
                    <FormField
                      control={form.control}
                      name="donor_tax_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>統一編號 (選填)</FormLabel>
                          <FormControl>
                            <Input placeholder="公司行號需填寫" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="receipt_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>收據寄送地址</FormLabel>
                          <FormControl>
                            <Input placeholder="請輸入完整地址" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>備註留言 (選填)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="有什麼話想對我們說嗎？" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    提交中...
                  </>
                ) : (
                  "確認送出"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
