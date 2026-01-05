import { DonationForm } from "@/components/donate/DonationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Landmark, CreditCard, Search } from "lucide-react";

export const metadata = {
  title: "愛心捐款 | RabbitSOS",
  description: "您的每一筆捐款，都是支持我們救援流浪兔的動力。",
};

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="bg-orange-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">愛心捐款</h1>
          <p className="text-orange-100 max-w-2xl mx-auto text-lg">
            我們是非營利組織，所有的救援、醫療與照護費用皆來自大眾的愛心捐助。
            <br />您的每一份支持，都能讓流浪兔擁有重獲新生的機會。
          </p>
          <div className="mt-8">
            <a 
              href="/donate/check" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-bold rounded-full shadow-md hover:bg-orange-50 transition-colors"
            >
              <Search className="w-5 h-5" />
              查詢捐款與下載收據
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Info */}
        <div className="lg:w-1/3 space-y-6">
           <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-stone-800">
                 <Landmark className="h-5 w-5 text-orange-600" />
                 匯款帳號
              </h2>
              <div className="space-y-4 text-stone-600">
                 <div className="p-4 bg-orange-50 rounded-md border border-orange-100">
                    <div className="text-xs text-orange-600 font-bold mb-1">銀行代號</div>
                    <div className="text-2xl font-mono font-bold text-stone-800">822 (中國信託)</div>
                 </div>
                 <div className="p-4 bg-orange-50 rounded-md border border-orange-100">
                    <div className="text-xs text-orange-600 font-bold mb-1">銀行帳號</div>
                    <div className="text-2xl font-mono font-bold text-stone-800">1234-5678-9012</div>
                 </div>
                 <div className="p-4 bg-orange-50 rounded-md border border-orange-100">
                    <div className="text-xs text-orange-600 font-bold mb-1">戶名</div>
                    <div className="text-lg font-bold text-stone-800">RabbitSOS 兔兔救援協會</div>
                 </div>
              </div>
           </div>

           <Alert className="bg-blue-50 border-blue-200 text-blue-800">
              <Info className="h-4 w-4" />
              <AlertTitle>注意事項</AlertTitle>
              <AlertDescription className="text-sm mt-2 leading-relaxed">
                 1. 請務必於匯款後填寫右側回報單。<br/>
                 2. 若需要開立收據，請勾選「索取收據」並填寫資料。<br/>
                 3. 相關問題請聯繫：donate@rabbitsos.org
              </AlertDescription>
           </Alert>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-2/3">
           <DonationForm />
        </div>
      </div>
    </main>
  );
}
