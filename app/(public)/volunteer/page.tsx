import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Baby,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  HeartHandshake,
  Home,
  MapPin,
  Mail,
  ShieldAlert,
  Users2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          {/* Placeholder for hero image, using a pattern or color for now */}
          <div className="w-full h-full bg-linear-to-r from-orange-900 to-stone-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-noto-sans-tc mb-4 md:mb-6 leading-tight">
            加入我們，成為兔兔的守護者
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            無論是提供暫時的避風港或是貢獻您的閒暇時間，
            <br className="hidden md:block" />
            您的每一分力量，都是流浪兔重獲新生的關鍵。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -translate-y-8 md:-translate-y-10 relative z-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Foster (Midway) Card */}
          <Card className="border-0 shadow-lg overflow-hidden flex flex-col">
            <div className="bg-orange-100 p-6 md:p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 shadow-sm">
                <Home className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">
                中途之家 (Foster)
              </h2>
              <p className="text-stone-600">
                提供暫時的安置空間，照顧等待家的孩子
              </p>
            </div>

            <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8 flex-1 bg-white">
              {/* Checklist Section */}
              <div>
                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  我適合當中途嗎？自我評估
                </h3>
                <ul className="space-y-3">
                  {[
                    "年滿 18 歲且有自主能力",
                    "具備正確養兔知識 (家中兔已絕育)",
                    "經濟能力寬裕 (負擔食衣住行)",
                    "有足夠時間陪伴與照顧",
                    "有合適的隔離與放風空間",
                    "同住家人/室友完全同意",
                    "有耐心照顧生病、怕生或有攻擊性的兔兔",
                    "能堅持到底，直到兔兔找到家",
                    "能理性篩選認養人，不感情用事",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-stone-600 text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div className="bg-stone-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-stone-800 mb-4">
                  中途爸爸/媽媽的任務
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <HeartHandshake className="w-5 h-5 text-orange-500 shrink-0" />
                    <div className="text-sm text-stone-600">
                      <span className="font-bold block text-stone-800 mb-1">
                        細心照顧
                      </span>
                      照顧生活起居，觀察健康狀況，給予醫療照護（醫療費由協會負擔）。
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <div className="text-sm text-stone-600">
                      <span className="font-bold block text-stone-800 mb-1">
                        回報狀況
                      </span>
                      每月至少回報一次近況與照片，協助篩選合適的認養人。
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 text-center">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600 rounded-full font-bold text-lg h-12"
                >
                  <Link href="/volunteer/apply">
                    <Mail className="mr-2 h-5 w-5" /> 我願意申請中途
                  </Link>
                </Button>
                <p className="text-xs text-stone-400 mt-3">
                  點擊填寫線上申請表單
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Volunteer (On-site) Card */}
          <Card className="border-0 shadow-lg overflow-hidden flex flex-col">
            <div className="bg-blue-100 p-6 md:p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-sm">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">
                志工夥伴 (Volunteer)
              </h2>
              <p className="text-stone-600">
                協助安置中心清潔、餵食，給兔兔愛的抱抱
              </p>
            </div>

            <CardContent className="p-6 md:p-8 space-y-8 flex-1 bg-white">
              <div>
                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <Baby className="w-5 h-5 text-blue-500" />
                  志工做什麼？
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  安置中心非常需要志工協助照顧兔兔、打掃環境。只要您有空，隨時歡迎來幫忙！
                  幫助兔兔們的夥伴永遠不嫌少，多一分力量就是多一線希望。
                </p>
                <ul className="grid grid-cols-1 gap-3">
                  <li className="flex items-center gap-3 p-3 border border-stone-100 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      1
                    </div>
                    <span className="text-sm text-stone-600">
                      協助清理兔籠與環境
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-3 border border-stone-100 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      2
                    </div>
                    <span className="text-sm text-stone-600">
                      餵食牧草與飼料
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-3 border border-stone-100 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      3
                    </div>
                    <span className="text-sm text-stone-600">
                      陪兔兔玩耍、社會化訓練
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-stone-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-stone-800 mb-4">
                  報名須知
                </h3>
                <div className="space-y-4 text-sm text-stone-600">
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-stone-400 shrink-0" />
                    <div>
                      <span className="font-bold text-stone-800">
                        時間要求：
                      </span>
                      最晚入場時間為下午 1 點前，至少服務 2
                      小時。完成指派工作後才能與兔兔玩耍喔！
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-stone-400 shrink-0" />
                    <div>
                      <span className="font-bold text-stone-800">地點：</span>
                      台灣流浪兔保護協會安置中心 (內湖)
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-stone-400 shrink-0" />
                    <div>
                      <span className="font-bold text-stone-800">
                        注意事項：
                      </span>
                      請穿著耐髒衣物，
                      <span className="text-red-600 font-bold">請勿噴香水</span>
                      （氣味可能導致兔兔攻擊）。
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 space-y-3">
                <div className="p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg mb-4 text-center">
                  👋 個人志工直接<span className="font-bold">現場報名</span>
                  即可！
                  <br />
                  5人以上團體請先 Email 預約。
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full font-bold h-12 border-blue-200 text-blue-700 hover:bg-blue-50 uppercase"
                >
                  <Link href="/contact">
                    <MapPin className="mr-2 h-5 w-5" /> 查看交通資訊
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full text-stone-400"
                >
                  <a href="mailto:rabbitsos@gmail.com?subject=團體志工報名">
                    團體報名信箱: rabbitsos@gmail.com
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
