import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  Building2,
  Receipt,
  Heart,
  Download,
  FileText,
  Globe2,
  AlertCircle,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-linear-to-r from-orange-900 to-stone-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold font-noto-sans-tc mb-6">
            支持我們，讓愛延續
          </h1>
          <p className="text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            您的每一筆捐款，都將成為兔兔康復的力量。
            <br />
            所有捐款皆可開立抵稅收據。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid gap-8 max-w-4xl mx-auto">
          {/* Important Receipt Notice */}
          <Card className="border-l-4 border-l-yellow-500 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                <div className="text-stone-700 text-sm space-y-2">
                  <h3 className="font-bold text-lg text-stone-800">
                    關於捐款收據與抵稅
                  </h3>
                  <p>
                    協會每筆捐款皆會開立收據。若您需要<strong>真實姓名</strong>
                    的收據作為抵稅依據，且使用<strong>銀行轉帳</strong>
                    捐款，請務必填寫「捐款人捐款通知單」。
                  </p>
                  <p>
                    若無填寫，將統一以「善心人士」開立。收據可於捐款次月 15
                    日後至官網查詢列印。
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-yellow-200 hover:bg-yellow-50 text-yellow-700"
                      asChild
                    >
                      <Link href="/donate/report">
                        <FileText className="w-4 h-4 mr-2" /> 填寫捐款通知單
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-stone-200 text-stone-600"
                      asChild
                    >
                      <Link href="/donate/check">
                        <Receipt className="w-4 h-4 mr-2" /> 查詢/列印收據
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Online Donation (ECPay) */}
          <Card className="border-0 shadow-lg overflow-hidden border-t-4 border-t-pink-500">
            <CardHeader className="bg-white pb-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-stone-800">
                    線上捐款 (ECPay)
                  </CardTitle>
                  <CardDescription>
                    支援信用卡、網路 ATM、超商條碼，快速方便
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 bg-white grid md:grid-cols-2 gap-4">
              <Button
                asChild
                size="lg"
                className="w-full bg-pink-500 hover:bg-pink-600 font-bold h-14 text-lg shadow-md shadow-pink-200"
              >
                <a
                  href="https://payment.ecpay.com.tw/QuickCollect/PayData?pmptkFK9YKe6F41hkPquw%2fCVFadKq8OiVvhcwA22E5s%3d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Heart className="mr-2 h-5 w-5 fill-current" /> 單次線上捐款
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 font-bold h-14 text-lg"
              >
                <a
                  href="https://payment.ecpay.com.tw/QuickCollect/PayData?pmptkFK9YKe6F41hkPquwwJiLItnMZW4lgR%2bJGwzJ8I%3d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Receipt className="mr-2 h-5 w-5" /> 定期定額捐款
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Bank Transfer */}
          <Card className="border-0 shadow-lg overflow-hidden border-t-4 border-t-blue-500">
            <CardHeader className="bg-white pb-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-stone-800">
                    銀行匯款 / ATM 轉帳
                  </CardTitle>
                  <CardDescription>
                    適合大額捐款，轉帳後請記得填寫通知單
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 bg-stone-50 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white text-xs font-bold rounded-bl-xl">
                    銀行帳號
                  </div>
                  <div className="space-y-2 text-stone-600">
                    <p>
                      <span className="font-bold text-stone-800">銀行代碼</span>
                      ：004 (台灣銀行 民權分行)
                    </p>
                    <p>
                      <span className="font-bold text-stone-800">帳號</span>
                      ：046-001-001-235
                    </p>
                    <p>
                      <span className="font-bold text-stone-800">戶名</span>
                      ：台灣流浪兔保護協會
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-green-500 text-white text-xs font-bold rounded-bl-xl">
                    郵局劃撥
                  </div>
                  <div className="space-y-2 text-stone-600 h-full flex flex-col justify-center">
                    <p>
                      <span className="font-bold text-stone-800">劃撥帳號</span>
                      ：50191826
                    </p>
                    <p>
                      <span className="font-bold text-stone-800">戶名</span>
                      ：台灣流浪兔保護協會
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Donation */}
          <Card className="border-0 shadow-lg overflow-hidden border-t-4 border-t-orange-500">
            <CardHeader className="bg-white pb-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-stone-800">
                    發票捐贈 (愛心碼 17922)
                  </CardTitle>
                  <CardDescription>
                    結帳時口頭告知、或設定手機載具
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 bg-stone-50">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 text-center md:text-left flex-1">
                  <div className="text-4xl font-black text-orange-600 mb-2">
                    17922
                  </div>
                  <div className="text-stone-500 text-sm font-medium mb-4">
                    一起救兔兔
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    於結帳時口頭告知店員捐贈碼，或將載具預設捐贈對象設為「台灣流浪兔保護協會」。
                  </p>
                </div>
                <div className="flex-1 space-y-2 text-sm text-stone-600">
                  <p className="font-bold text-stone-800">其他發票捐贈方式：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>列印愛心碼條碼供店員掃描</li>
                    <li>親至安置中心或合作店家投入募集箱</li>
                    <li>中獎發票將自動匯入協會帳戶</li>
                  </ul>
                  <p className="text-xs text-stone-400 pt-2">
                    歡迎收集實體發票寄至本會 (請來信索取地址)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Methods */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <Download className="w-10 h-10 mx-auto text-stone-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">信用卡授權書</h3>
                <p className="text-stone-500 text-sm mb-4">
                  下載填寫後傳真或寄回 (需親筆簽名)
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://www.rabbitsos.org/doc-uploads/%E5%8F%B0%E7%81%A3%E6%B5%81%E6%B5%AA%E5%85%94%E4%BF%9D%E8%AD%B7%E5%8D%94%E6%9C%83%E4%BF%A1%E7%94%A8%E5%8D%A1%E6%8D%90%E6%AC%BE%E6%8E%88%E6%AC%8A%E6%9B%B8.docx"
                    download
                  >
                    下載表格 (Word)
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <Building2 className="w-10 h-10 mx-auto text-stone-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">現場捐款</h3>
                <p className="text-stone-500 text-sm mb-4">
                  親送至安置中心或送養會場
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">查看地址</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Overseas Donation Accordion */}
          <Accordion
            type="single"
            collapsible
            className="w-full bg-white rounded-lg shadow-sm border border-stone-200 px-6"
          >
            <AccordionItem value="overseas" className="border-none">
              <AccordionTrigger className="text-stone-800 font-bold hover:no-underline hover:text-orange-500">
                <span className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5" /> Overseas Donation
                  (海外匯款資訊)
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 text-sm space-y-4 pb-6">
                <p>
                  The Taiwan Stray Bunny Protection Association is now able to
                  receive overseas donation. Your generous support will be spent
                  on the medical and living expenses of rabbits in need.
                </p>

                <div className="bg-stone-50 p-4 rounded border border-stone-100 space-y-2">
                  <p>
                    <span className="font-bold block text-stone-800">
                      Beneficiary’s bank:
                    </span>{" "}
                    BANK OF TAIWAN XINZHUANG FUDUXIN BRANCH
                  </p>
                  <p>
                    <span className="font-bold block text-stone-800">
                      Bank address:
                    </span>{" "}
                    NO.119, TOUQIAN ROAD XINZHUANG DIST., NEW TAIPEI CITY.,
                    TAIWAN ( R.O.C. )
                  </p>
                  <p>
                    <span className="font-bold block text-stone-800">
                      Swift address:
                    </span>{" "}
                    BKTWTWTP280
                  </p>
                  <p>
                    <span className="font-bold block text-stone-800">
                      Account NO.:
                    </span>{" "}
                    046001001235
                  </p>
                  <p>
                    <span className="font-bold block text-stone-800">
                      Beneficiary Name:
                    </span>{" "}
                    Taiwan Stray Bunny Protection Association
                  </p>
                </div>

                <div className="text-xs text-stone-500">
                  <p className="font-bold text-stone-700 mb-1">
                    Important Note:
                  </p>
                  After donation remittance is completed, please email us at{" "}
                  <a
                    href="mailto:rabbitsos@gmail.com"
                    className="text-blue-600 underline"
                  >
                    rabbitsos@gmail.com
                  </a>{" "}
                  with the remittance receipt, amount (in NTD), your preferred
                  announcement name, and the date of remittance for
                  verification.
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center text-xs text-stone-400 py-4">
            衛部救字第1141365125號 | 2025-2026流浪兔、受虐兔救助工作
          </div>
        </div>
      </div>
    </div>
  );
}
