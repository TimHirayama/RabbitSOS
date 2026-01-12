import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertOctagon,
  LifeBuoy,
  FileText,
  Gavel,
} from "lucide-react";
import Link from "next/link";

export default function RescuePage() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-linear-to-r from-red-900 to-stone-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <LifeBuoy className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-bold font-noto-sans-tc mb-4 md:mb-6 leading-tight">
            救援通報注意事項
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            本協會經費係仰賴民眾捐款，相關資源、人力皆有限。
            <br className="hidden md:block" />
            安置中心籠位及中途之家嚴重不足，請務必詳閱以下原則。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl -translate-y-8 md:-translate-y-10 relative z-20">
        {/* Scope Policy Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-red-500" />
            緊急收容原則
          </h2>
          <div className="prose max-w-none text-stone-600">
            <p className="mb-4">
              故緊急收容的案件以：
              <span className="font-bold text-stone-800 px-1">
                路邊、野外流浪瀕臨危險之『無主流浪兔』
              </span>
              及
              <span className="font-bold text-stone-800 px-1">
                遭受虐待的『受虐兔』
              </span>
              為原則。
            </p>
            <div className="p-4 bg-stone-50 rounded-lg text-stone-500 text-sm">
              <span className="font-bold text-stone-700 block mb-1">
                ⚠️ 不包含對象：
              </span>
              不當飼養之有主兔、寵物店兔及收容所兔。
            </div>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 mb-8">
          <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-500" />
            發現待救援之流浪棄兔及撿到兔子時的處理流程
          </h2>

          <div className="mb-8">
            <p className="text-stone-600 mb-6">
              協會每日都會收到來自各地的救援通報留言或信件，然而有多數通報人並未留下聯絡方式，或是地點描述不清楚，讓協會人員非常困擾。
            </p>

            {/* Highlighted Warning Box */}
            <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg mb-8">
              <p className="text-red-700 font-bold leading-relaxed">
                *
                為確保救援通報案件的準確性，並預防『假通報．真棄養』案件發生，協會僅接受透過官網完整填寫【救援申請表】的案件；若有需要救援時，『通報人必須一同前往』，並由協會人員(志工)於現場核對通報人身分證或其他身分證明文件，以確保救援通報的真實性。
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">
                    先救起，先安置
                  </h3>
                  <p className="text-stone-600">
                    看到路邊、野外流浪的無主兔，請務必先救起，先安置。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">
                    一週內填寫申請表
                  </h3>
                  <p className="text-stone-600">
                    請通報人於{" "}
                    <span className="text-red-600 font-bold border-b border-red-200">
                      1 週內（自撿到日起算）
                    </span>{" "}
                    透過官網完整填寫「救援申請表」。
                  </p>
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    *
                    拾獲流浪兔之民眾若未即時通報，均視為自有兔之飼養行為，協會歉難提供協助。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">
                    等待協會通知
                  </h3>
                  <p className="text-stone-600">
                    等待協會回信通知，若無籠位者，會請您先幫忙照顧一陣子，該照顧期間的醫療等費用由協會負責，亦可提供相關的養兔配備。
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Warnings */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                <p className="text-red-600 font-bold text-sm">
                  *
                  拾獲者若未經協會同意或未遵循相關流程通報而直接送至安置中心者，本協會一律拒絕接收。
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                <p className="text-red-600 font-bold text-sm">
                  *
                  若流浪兔尚未救起需救援時，通報人須一同前往！請民眾勿企圖假通報真棄養，呼籲大家不要以身試法，協會已對其他假通報案件採取法律途徑，絕不認同此種行為！！
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6 border-t border-stone-100">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-red-200 transition-transform hover:scale-105"
            >
              <Link href="/rescue/apply" className="flex items-center gap-2">
                我要通報救援 <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Other Sections Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Abuse Cases */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
            <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
              <Gavel className="w-5 h-5 text-stone-400" />
              不當飼養與寵物店兔
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              由於協會並無公權力，民眾若發現不當飼養，可先自行柔性勸導。若行為已違反「動物保護法」，建議自行蒐證並向當地動保處檢舉。
            </p>
            <div className="space-y-2 mt-4">
              <Link
                href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=M0060027"
                target="_blank"
                className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <BookOpen className="w-4 h-4" /> 動物保護法
              </Link>
              <Link
                href="https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=M0130043"
                target="_blank"
                className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <BookOpen className="w-4 h-4" /> 檢舉違反動物保護法案件獎勵辦法
              </Link>
            </div>
          </div>

          {/* Surrender Refusal */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
            <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              無法繼續飼養的兔子?
            </h2>
            <div className="text-stone-600 text-sm leading-relaxed space-y-3">
              <p>
                本協會
                <span className="font-bold text-stone-800">並非收容所</span>
                。協會僅能以長期安養照顧為前提來進行安置。
              </p>
              <p>
                請摸摸自己的良心，勿將自家兔以【假通報．真棄養】的方式丟給協會。
              </p>
              <p className="text-stone-500 italic">
                “只要多一個位置被佔住，協會能救援的兔子就少一隻...”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
