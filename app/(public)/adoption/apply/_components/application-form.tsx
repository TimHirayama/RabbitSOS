"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rabbit, CheckCircle2 } from "lucide-react";
import {
  adoptionApplicationSchema,
  type AdoptionApplicationData,
} from "../schema";
import { submitAdoptionApplication } from "../actions";
// Schema imported from ../schema.ts

export function ApplicationForm() {
  const searchParams = useSearchParams();
  const rabbitNameParam = searchParams.get("rabbit_name") || "";
  const rabbitIdParam = searchParams.get("rabbit_id") || "";
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<AdoptionApplicationData>({
    resolver: zodResolver(adoptionApplicationSchema),
    defaultValues: {
      rabbitName: rabbitNameParam,
      rabbitId: rabbitIdParam,
      applicantName: "",
      age: "",
      occupation: "",
      salary: "",
      phone: "",
      email: "",
      lineId: "",
      address: "",
      fbLink: "",
      housingType: undefined,
      roommates: "",
      landlordConsent: undefined,
      familyConsent: undefined,
      experience: "",
      currentPets: "",
      pastPets: "",
      rabbitSpace: "",
      acAvailable: undefined,
      dailyTime: "",
      scenarioAllergy: "",
      scenarioMoving: "",
      scenarioDestructive: "",
      scenarioMedical: "",
      vetKnowledge: "",
      agreeToVisit: false,
      agreeToSign: false,
    },
  });

  async function onSubmit(values: AdoptionApplicationData) {
    try {
      const result = await submitAdoptionApplication(values);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        setIsSubmitted(true);
        toast.success("申請送出成功！");
      }
    } catch (error) {
      toast.error("發生錯誤，請稍後再試");
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-xl mx-auto border-none shadow-lg bg-white mt-8">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold font-noto-sans-tc text-stone-800">
            申請已送出！
          </h2>
          <p className="text-stone-600 max-w-sm">
            感謝您對 <b>{form.getValues("rabbitName")}</b> 的愛心。
            <br />
            志工將會在 3-7 個工作天內審核完畢，並透過 Email 或電話與您聯繫。
          </p>
          <Button asChild className="mt-4">
            <a href="/rabbits">查看其他兔兔</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {/* Rabbit Info Section */}
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 flex items-center gap-4 sticky top-4 z-10 shadow-sm">
          <div className="p-3 bg-white rounded-full border border-orange-200">
            <Rabbit className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <FormLabel className="text-stone-500 text-xs uppercase tracking-wider font-bold">
              申請認養對象
            </FormLabel>
            <div className="text-xl font-bold text-stone-800">
              {rabbitNameParam || "未指定"}
            </div>
            <input type="hidden" {...form.register("rabbitName")} />
            <input type="hidden" {...form.register("rabbitId")} />
          </div>
        </div>

        {/* Section 1: 個人資料 */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold border-b pb-2 text-stone-700">
            一、個人基本資料
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>真實姓名</FormLabel>
                  <FormControl>
                    <Input placeholder="王小明" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>性別</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="請選擇" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">男</SelectItem>
                      <SelectItem value="female">女</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>年齡</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>職業</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 軟體工程師" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>經濟狀況 (大略年收或來源)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: 月薪約 4-5 萬 / 學生由父母支持"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>居住地址 (請填寫實際居住地)</FormLabel>
                  <FormControl>
                    <Input placeholder="台北市..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>手機號碼</FormLabel>
                  <FormControl>
                    <Input placeholder="0912-345-678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="lineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LINE ID (選填)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fbLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook/IG 連結 (選填)</FormLabel>
                  <FormControl>
                    <Input placeholder="方便志工初步認識您" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 2: 居住環境 */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold border-b pb-2 text-stone-700">
            二、居住環境與成員
          </h3>

          <FormField
            control={form.control}
            name="housingType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>目前的居住型態</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="owned" />
                      </FormControl>
                      <FormLabel className="font-normal">自有住宅</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="family" />
                      </FormControl>
                      <FormLabel className="font-normal">與家人同住</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="rented" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        租屋 (整層/套房)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="dorms" />
                      </FormControl>
                      <FormLabel className="font-normal">學校宿舍</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="roommates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>居住成員概況</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="獨居 / 父母 / 配偶 / 室友2人..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyConsent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>家人/同住者是否同意養兔？</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="請選擇" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">非常支持，全票通過</SelectItem>
                      <SelectItem value="discussing">
                        溝通中/尚不知情
                      </SelectItem>
                      <SelectItem value="no">反對</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="landlordConsent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>房東是否同意飼養寵物？(自有住宅請選無需)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">房東書面/口頭同意</SelectItem>
                    <SelectItem value="no">房東不同意 (偷養)</SelectItem>
                    <SelectItem value="na">自有/無需經過他人同意</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 3: 飼養經驗 */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold border-b pb-2 text-stone-700">
            三、飼養經驗與方式
          </h3>

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>養兔經驗</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">無經驗 (完全新手)</SelectItem>
                    <SelectItem value="beginner">
                      新手 (曾在童年養過/經驗不多)
                    </SelectItem>
                    <SelectItem value="experienced">
                      有經驗 (目前持續飼養或曾長期飼養)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentPets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>家中目前有的寵物 (種類/數量/年紀)</FormLabel>
                <FormControl>
                  <Input placeholder="ex: 1隻貓(5歲)、1隻狗" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pastPets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>過去曾養過的寵物與下落</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ex: 養過一隻兔子，養了8年後自然老死..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rabbitSpace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>您預計給兔子的居住環境與活動空間 (請詳述)</FormLabel>
                <FormDescription>
                  請描述籠子大小、放風時間、是否會關籠等。
                </FormDescription>
                <FormControl>
                  <Textarea
                    className="min-h-[100px]"
                    placeholder="預計準備 90x60 的籠子，早晚放風各1小時..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dailyTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>預計每天能撥出多少時間陪伴/照顧兔子？</FormLabel>
                <FormControl>
                  <Input placeholder="ex: 每天下班後2小時" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acAvailable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>夏天是否能提供24小時冷氣或溫控環境？</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">可以，夏天全天開冷氣</SelectItem>
                    <SelectItem value="no">無法，但有電扇/冰磚</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 4: 情境考驗 */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold border-b pb-2 text-stone-700">
            四、觀念與情境題 (請認真回答)
          </h3>

          <FormField
            control={form.control}
            name="scenarioAllergy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Q1: 如果您或家人/伴侶/未來的小孩對兔子過敏，您會怎麼處理？
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scenarioMoving"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Q2:
                  如果遇到搬家、結婚、懷孕、出國留學/工作等人生變動，兔子怎麼辦？
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scenarioDestructive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Q3:
                  兔子可能會咬壞電線、家具、隨地大小便，您能接受並有耐心教導嗎？
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scenarioMedical"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Q4:
                  兔子看醫生沒有健保，老年醫療費用可能高達數萬，您的經濟能力可以負擔吗？
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[80px]"
                    placeholder="請簡述您的想法..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vetKnowledge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Q5: 您知道居住地附近有哪些「特寵(兔科)醫院」嗎？請列舉 1-2
                  間。
                </FormLabel>
                <FormControl>
                  <Input placeholder="ex: 獴獴加、剛果..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 5: 確認 */}
        <div className="space-y-4 pt-4 border-t">
          <FormField
            control={form.control}
            name="agreeToVisit"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg bg-stone-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    我同意配合協會的審核流程（包含電話訪談、可能的家訪或視訊查看環境）。
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreeToSign"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg bg-stone-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    我已詳閱認養須知，並同意在認養時簽署認養切結書，承諾照顧牠一輩子。
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full font-bold bg-orange-600 hover:bg-orange-700 text-lg py-6"
        >
          送出認養申請
        </Button>
      </form>
    </Form>
  );
}
