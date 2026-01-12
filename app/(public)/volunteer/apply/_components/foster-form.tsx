"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { submitFosterApplication } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Home,
  Heart,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
      className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg font-bold rounded-full shadow-lg shadow-orange-200"
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
          確認送出申請
        </>
      )}
    </Button>
  );
}

export function FosterForm() {
  const [state, formAction] = useFormState(
    submitFosterApplication,
    initialState
  );
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length > 3) {
        alert("最多只能上傳 3 張照片");
        return;
      }
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);
    }
  };

  if (state?.success) {
    return (
      <Card className="border-green-200 bg-green-50 text-center p-12">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-stone-800 mb-4">申請已送出！</h2>
        <p className="text-xl text-stone-600 leading-relaxed mb-8">
          感謝您的愛心！❤️
          <br />
          協會志工將會儘快審核您的資料，並透過 Email 與您聯繫。
          <br />
          <span className="text-sm text-stone-500 mt-2 block">
            (若一週內未收到回覆，請檢查垃圾郵件信箱)
          </span>
        </p>
        <Button asChild variant="outline" className="bg-white">
          <a href="/">回首頁</a>
        </Button>
      </Card>
    );
  }

  return (
    <form action={formAction} className="space-y-10">
      {/* 1. Environment Photos */}
      <section>
        <Card className="overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-100 p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
              1
            </div>
            <h2 className="text-xl font-bold text-stone-800">
              上傳環境照{" "}
              <span className="text-sm font-normal text-stone-500">(必填)</span>
            </h2>
          </div>
          <CardContent className="p-6 md:p-8">
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex gap-3 text-blue-800 text-sm">
              <Home className="w-5 h-5 shrink-0" />
              <p>
                請附上 <strong>3 張</strong> 您家中預計給兔兔生活的環境照片，
                需包含：<strong>未來中途兔的籠子放置處</strong> 及{" "}
                <strong>放風空間</strong>。
              </p>
            </div>

            <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-center hover:border-orange-300 hover:bg-orange-50/30 transition-colors relative min-h-[200px] flex flex-col justify-center items-center">
              <Input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleImageChange}
                required
              />
              <Upload className="w-10 h-10 text-stone-400 mb-3" />
              <p className="text-stone-600 font-medium mb-1">
                點擊或拖使得以上傳 (最多 3 張)
              </p>
              <p className="text-stone-400 text-sm">
                支援 JPG, PNG (單檔建議小於 3MB)
              </p>

              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-lg z-20 relative pointer-events-none">
                  {previews.map((src, idx) => (
                    <div
                      key={idx}
                      className="aspect-square relative rounded-lg overflow-hidden border border-stone-200 shadow-sm"
                    >
                      <Image
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. Basic Info */}
      <section>
        <Card className="overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-100 p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
              2
            </div>
            <h2 className="text-xl font-bold text-stone-800">基本資料</h2>
          </div>
          <CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="applicant_name">真實姓名 *</Label>
              <Input
                id="applicant_name"
                name="applicant_name"
                placeholder="請填寫全名"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">職業 (選填)</Label>
              <Input
                id="occupation"
                name="occupation"
                placeholder="例：學生、工程師"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">聯絡電話 *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="09xxxxxxxx"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="協會將以此為主聯繫"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">居住地址 *</Label>
              <Input
                id="address"
                name="address"
                placeholder="請填寫完整地址 (含樓層/室號)"
                required
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Rabbit Experience & Environment */}
      <section>
        <Card className="overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-100 p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
              3
            </div>
            <h2 className="text-xl font-bold text-stone-800">飼養經驗與環境</h2>
          </div>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current_pets">家中寵物狀況 *</Label>
              <Textarea
                id="current_pets"
                name="current_pets"
                placeholder="請描述目前家中寵物種類、數量、年齡、是否結紮..."
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">養兔經歷 *</Label>
              <Textarea
                id="experience"
                name="experience"
                placeholder="請簡述您的養兔經驗 (多久、幾隻、飲食照顧方式...)"
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplies">目前自備用品 (選填)</Label>
              <Textarea
                id="supplies"
                name="supplies"
                placeholder="例：已有 2 尺籠、便盆、水瓶..."
                className="min-h-[80px]"
              />
              <p className="text-xs text-stone-500">
                * 若協會無法募集到所需用品，中途需願意自行負擔購買。
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="housing_environment">居住環境簡述 *</Label>
              <Textarea
                id="housing_environment"
                name="housing_environment"
                placeholder="例：同住家人/室友狀況、房東是否同意、是否有隔離空間..."
                className="min-h-[100px]"
                required
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. Agreement */}
      <section>
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-orange-50 border-b border-orange-100 p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
              4
            </div>
            <h2 className="text-xl font-bold text-stone-800">中途守則</h2>
          </div>
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="prose prose-sm max-w-none text-stone-600 bg-stone-50 p-6 rounded-lg max-h-[400px] overflow-y-auto border border-stone-200">
              <ol className="list-decimal pl-4 space-y-2">
                <li>我已滿18歲，能認真負責並獨立照顧自己和兔兔。</li>
                <li>具備基本且正確養兔知識，可盡心照顧中途兔生活。</li>
                <li>
                  協會基於推廣寵物節育，若你家中有飼養尚未節育的兔兔，要請您等兔兔完成節育手術後再來協會申請中途喔!
                </li>
                <li>具有寬裕的經濟能力來負擔兔兔的食、醫、住、行、育、樂。</li>
                <li>有足夠的時間和心思來陪伴兔兔。</li>
                <li>家中有合適地點擺放兔籠，有足夠安全空間讓兔兔放風運動。</li>
                <li>同住的親友、室友以及住所主人同意您收留兔兔。</li>
                <li>
                  有愛心和耐心來照顧遭遺棄導致生病、怕生、怕人、具有攻擊性的兔兔。
                </li>
                <li>
                  當協會中途後，可以依協會規定，定期，至少1個月，回報中途兔最新狀況，提供中途兔之生活紀錄與照片，給協會刊載於網頁上。
                </li>
                <li>
                  可為中途兔仔細評沽、過濾認養申請人，挑選出最合適的認養人。
                </li>
                <li>
                  中途兔送養後，主動與認養人保持聯繫，關心中途兔後續的生活狀況。
                </li>
                <li>
                  即使中途兔沒遇到適合的新主人，也會一直愛護照顧兔兔一輩子直到合適的主人出現為止。
                </li>
                <li>若協會無法募集到所需用品，中途願意負擔並購買所需用品。</li>
              </ol>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="agreement" name="agreement" required />
              <Label
                htmlFor="agreement"
                className="font-bold text-stone-800 cursor-pointer"
              >
                我已詳閱並同意以上中途守則
              </Label>
            </div>
          </CardContent>
        </Card>
      </section>

      {state?.error && (
        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {state.error}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
