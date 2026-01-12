"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitRescueApplication } from "../actions";
import { rescueApplicationSchema, type RescueApplicationData } from "../schema";
import { createClient } from "@/lib/supabase/client";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Loader2, Upload, AlertCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

const STEPS = [
  { id: 1, title: "照片證據 (Evidence)" },
  { id: 2, title: "救援資訊 (Rescue Info)" },
  { id: 3, title: "通報人資料 (Reporter)" },
];

export function RescueForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  // Removed useToast hook
  const supabase = createClient();

  const form = useForm<RescueApplicationData>({
    resolver: zodResolver(rescueApplicationSchema),
    defaultValues: {
      is_rescued: "false",
      rabbit_gender: "unknown",
      rabbit_breed: "mix",
    },
    mode: "onBlur",
  });

  // Helper to upload file
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof RescueApplicationData
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validations
    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      toast.error("檔案太大", {
        description: "請上傳小於 5MB 的照片",
      });
      return;
    }

    try {
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 10 }));
      const uniqueSuffix = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;
      const fileName = `rescue-${uniqueSuffix}-${file.name.replace(
        /[^a-zA-Z0-9.-]/g,
        ""
      )}`;
      const { data, error } = await supabase.storage
        .from("rescue-evidence")
        .upload(fileName, file, { upsert: false });

      if (error) throw error;
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 100 }));

      // Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("rescue-evidence").getPublicUrl(fileName);
      form.setValue(fieldName, publicUrl, { shouldValidate: true });
    } catch (error) {
      console.error(error);
      toast.error("上傳失敗", { description: "請稍後再試，或檢查網路連線" });
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
    }
  };

  const onSubmit = async (data: RescueApplicationData) => {
    setIsSubmitting(true);
    try {
      const result = await submitRescueApplication(data);
      if (result.error) {
        toast.error("提交失敗", { description: result.error });
      } else {
        toast.success("提交成功", {
          description: "我們會儘快審核並與您聯繫！",
        });
        // Redirect or show success state
        window.location.href = "/rescue/success";
      }
    } catch (error) {
      toast.error("發生錯誤", { description: "未知錯誤，請稍後再試" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    // Validate fields for current step
    let fieldsToValidate: (keyof RescueApplicationData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = [
        "photo_rabbit_1",
        "photo_rabbit_2",
        "photo_environment_1",
        "photo_environment_2",
        "photo_reporter_id",
        "photo_reporter_rabbit",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "discovery_date",
        "discovery_location",
        "rescue_reason",
      ];
    }

    const isStepValid = await form.trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      toast.error("資料不完整", {
        description: "請填寫完該步驟必填欄位後再繼續。",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 -z-10 rounded-full transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
          }}
        ></div>

        {STEPS.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center bg-stone-50 px-2"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors",
                currentStep >= step.id
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-400 border-gray-300"
              )}
            >
              {currentStep > step.id ? <Check className="w-6 h-6" /> : step.id}
            </div>
            <span
              className={cn(
                "text-xs font-bold mt-2",
                currentStep >= step.id ? "text-orange-600" : "text-gray-400"
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <Card className="border-stone-200 shadow-md">
        <CardHeader className="bg-stone-50/50 border-b border-stone-100">
          <CardTitle className="text-xl flex items-center gap-2">
            {STEPS[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "請上傳必要的照片證據 (必填)"}
            {currentStep === 2 && "請描述兔子的狀況與發現過程"}
            {currentStep === 3 && "請提供真實的聯絡資訊以便後續聯絡"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* STEP 1: PHOTOS */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="p-4 bg-orange-50 text-orange-800 text-sm rounded-md flex gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>
                      照片建議小於
                      5MB。必須包含「身分證合照」與「人兔合照」，這是為了防止假通報真棄養的重要機制，請務必配合。
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUploadField
                      form={form}
                      name="photo_rabbit_1"
                      label="拾獲兔照 1 (必填)"
                      handleFileUpload={handleFileUpload}
                      progress={uploadProgress["photo_rabbit_1"]}
                    />
                    <ImageUploadField
                      form={form}
                      name="photo_rabbit_2"
                      label="拾獲兔照 2 (必填)"
                      handleFileUpload={handleFileUpload}
                      progress={uploadProgress["photo_rabbit_2"]}
                    />
                    <ImageUploadField
                      form={form}
                      name="photo_environment_1"
                      label="發現環境照 1 (必填)"
                      handleFileUpload={handleFileUpload}
                      progress={uploadProgress["photo_environment_1"]}
                    />
                    <ImageUploadField
                      form={form}
                      name="photo_environment_2"
                      label="發現環境照 2 (必填)"
                      handleFileUpload={handleFileUpload}
                      progress={uploadProgress["photo_environment_2"]}
                    />
                    <ImageUploadField
                      form={form}
                      name="photo_reporter_id"
                      label="手持身分證合照 (必填)"
                      description="身分證字號需清晰可見"
                      handleFileUpload={handleFileUpload}
                      progress={uploadProgress["photo_reporter_id"]}
                    />
                    <ImageUploadField
                      form={form}
                      name="photo_reporter_rabbit"
                      label="通報人與兔合照 (必填)"
                      description="看得到兔子的樣子自拍，無須抱起來"
                      handleFileUpload={handleFileUpload}
                      progress={uploadProgress["photo_reporter_rabbit"]}
                    />

                    <ImageUploadField
                      form={form}
                      name="photo_accommodation_1"
                      label="目前安置環境照 1 (選填)"
                      handleFileUpload={handleFileUpload}
                      progress={uploadProgress["photo_accommodation_1"]}
                    />
                    <ImageUploadField
                      form={form}
                      name="photo_accommodation_2"
                      label="目前安置環境照 2 (選填)"
                      handleFileUpload={handleFileUpload}
                      progress={uploadProgress["photo_accommodation_2"]}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: RESCUE INFO */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="discovery_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>發現待救援兔日期 *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discovery_location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>發現地址 (含縣市) *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="例如：台北市大安區..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="rabbit_gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>性別</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="選擇" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="M">公</SelectItem>
                              <SelectItem value="F">母</SelectItem>
                              <SelectItem value="unknown">未知</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rabbit_size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>體型</FormLabel>
                          <FormControl>
                            <Input placeholder="如：幼兔/成兔" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rabbit_breed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>品種</FormLabel>
                          <FormControl>
                            <Input placeholder="如：道奇/獅子" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rabbit_nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>自行取名 (選填)</FormLabel>
                          <FormControl>
                            <Input placeholder="幫兔兔取個名字" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="rescue_reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>判斷為須救援原因 *</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-24"
                            placeholder="例如：受傷、流浪顯著、被遺棄..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="is_rescued"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>是否已成功救援？</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="選擇" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="true">是，已救起</SelectItem>
                              <SelectItem value="false">
                                否，尚未抓到
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discovery_method"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>如何發現待救援兔</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="例如：散步看到、鄰居告知"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="medical_status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>是否已就醫</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="例如：未就醫 / 已送往xx醫院"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="current_condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>待救援兔目前狀況</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="例如：精神尚可、有外傷..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: REPORTER INFO */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 text-blue-800 text-sm rounded-md">
                    此資料僅供協會留存通報紀錄及核對身分使用，依照個資法規定，絕對不會公開或外洩，請放心填寫。
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="reporter_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>真實姓名 *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reporter_nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>通報人稱呼 (選填)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="顯示在網站上的稱呼"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="reporter_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>手機號碼 *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reporter_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>電子信箱 *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="我們會透過 Email 聯繫您"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="reporter_id_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>身分證字號 *</FormLabel>
                        <FormControl>
                          <Input placeholder="核對身分證照片使用" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-stone-100 mt-6">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    上一步
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    下一步
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        送出中...
                      </>
                    ) : (
                      "提交救援申請"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// Sub-component for Image Upload Field to reduce clutter
function ImageUploadField({
  form,
  name,
  label,
  description,
  handleFileUpload,
  progress,
}: any) {
  const value = form.watch(name);

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <div className="mt-2">
            {value ? (
              <div className="relative group rounded-md overflow-hidden border border-stone-200 aspect-video bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => form.setValue(name, "")}
                    type="button"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> 移除
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-stone-200 rounded-md p-6 flex flex-col items-center justify-center text-stone-400 hover:border-orange-300 hover:bg-orange-50/50 transition-colors cursor-pointer relative">
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => handleFileUpload(e, name)}
                />
                {progress > 0 && progress < 100 ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-2" />
                    <span className="text-xs">上傳中...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-xs">點擊上傳</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
