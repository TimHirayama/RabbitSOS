"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSiteSetting } from "@/app/admin/actions"; // Adjust import path if needed
import { toast } from "sonner"; // Assuming sonner or useToast is available
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { FundraisingCard } from "@/components/home/FundraisingCard";

interface FundraisingFormProps {
  initialData: {
    title: string;
    dateRange: string;
    income: string;
    expense: string;
    target: string;
  };
}

export function FundraisingForm({ initialData }: FundraisingFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Promise.all([
        updateSiteSetting("fundraising_title", formData.title),
        updateSiteSetting("fundraising_date_range", formData.dateRange),
        updateSiteSetting("fundraising_income", formData.income),
        updateSiteSetting("fundraising_expense", formData.expense),
        updateSiteSetting("fundraising_target", formData.target),
      ]);
      toast.success("更新成功！");
    } catch (error) {
      console.error(error);
      toast.error("更新失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  // Safe parsing for preview
  const previewData = {
    title: formData.title || "(未設定標題)",
    dateRange: formData.dateRange || "(未設定日期區間)",
    income: parseInt(formData.income, 10) || 0,
    expense: parseInt(formData.expense, 10) || 0,
    target: parseInt(formData.target, 10) || 100,
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
      {/* Left: Form */}
      <Card>
        <CardHeader>
          <CardTitle>募資進度設定</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">標題文字</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="您的愛心是..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">統計區間說明</Label>
              <Input
                id="dateRange"
                name="dateRange"
                value={formData.dateRange}
                onChange={handleChange}
                placeholder="113/12/27~114/11/30止捐款+義賣之收入/支出金額"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="income">收入金額</Label>
                <Input
                  id="income"
                  name="income"
                  type="number"
                  value={formData.income}
                  onChange={handleChange}
                  placeholder="16622402"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense">支出金額</Label>
                <Input
                  id="expense"
                  name="expense"
                  type="number"
                  value={formData.expense}
                  onChange={handleChange}
                  placeholder="17538726"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">目標金額 (用於進度條計算)</Label>
                <Input
                  id="target"
                  name="target"
                  type="number"
                  value={formData.target}
                  onChange={handleChange}
                  placeholder="30000000"
                />
                <p className="text-xs text-muted-foreground">
                  設定 100%
                  對應的金額，建議設定為預期募款目標或稍大於目前最大金額。
                </p>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              儲存設定
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Right: Preview */}
      <div className="space-y-4 sticky top-6">
        <div className="border border-dashed border-stone-300 rounded-xl p-4 bg-stone-50/50 flex justify-center">
          <div className="w-full max-w-[360px] origin-top scale-90">
            <FundraisingCard {...previewData} hideActions />
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          實際顯示會隱藏按鈕，並隨著輸入即時更新
        </p>
      </div>
    </div>
  );
}
