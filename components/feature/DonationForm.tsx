"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarIcon, Loader2 } from "lucide-react";

// Form Schema
const formSchema = z.object({
  donorName: z.string().min(2, "請輸入收據抬頭"),
  donorTaxId: z.string().optional(),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "捐款金額必須大於 0"),
  transferDate: z.string().refine((val) => !isNaN(Date.parse(val)), "請輸入有效日期"), // Using string input type="date"
  last5Digits: z.string().length(5, "請輸入帳號末 5 碼").regex(/^\d+$/, "必須為數字"),
  // receiptImage: z.instanceof(FileList)... (Fix SSR error)
  receiptImage: z.any()
    .refine((files) => typeof FileList !== 'undefined' && files instanceof FileList, "請上傳檔案")
    .refine((files) => files?.length === 1, "請上傳一張匯款截圖"),
});

export function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donorName: "",
      donorTaxId: "",
      amount: "",
      transferDate: new Date().toISOString().split("T")[0],
      last5Digits: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const file = values.receiptImage[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `donations/${fileName}`;

      // 1. Upload Image
      const { error: uploadError } = await supabase.storage
        .from("receipts")
        .upload(filePath, file);

      if (uploadError) throw new Error("圖片上傳失敗: " + uploadError.message);

      // 2. Insert Record
      const { error: insertError } = await supabase.from("donations").insert({
        donor_name: values.donorName,
        donor_tax_id: values.donorTaxId,
        amount: Number(values.amount),
        transferDate: values.transferDate,
        last_5_digits: values.last5Digits,
        proof_image_url: filePath,
        receipt_status: "pending",
        user_id: null, // Guest donation
      });

      if (insertError) throw insertError;

      toast.success("捐款回報成功！我們會儘快核對。");
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "發生錯誤，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="donorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>收據抬頭 (真實姓名)</FormLabel>
              <FormControl>
                <Input placeholder="王大明" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="donorTaxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>身分證/統編 (選填)</FormLabel>
              <FormControl>
                <Input placeholder="A123456789" {...field} />
              </FormControl>
              <FormDescription>若需申報抵稅請務必填寫</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>捐款金額</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last5Digits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>帳號末五碼</FormLabel>
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
          name="transferDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>匯款日期</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receiptImage"
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <FormItem>
              <FormLabel>匯款成功截圖</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                />
              </FormControl>
              <FormDescription>請上傳網銀匯款成功畫面或明細</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              資料傳送中...
            </>
          ) : (
            "送出回報"
          )}
        </Button>
      </form>
    </Form>
  );
}
