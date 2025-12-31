import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DonationForm } from "@/components/feature/DonationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard } from "lucide-react";

export default function DonationReportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 font-noto-sans-tc text-center">捐款回報</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Bank Info */}
          <div>
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <Building2 className="mr-2 h-5 w-5" /> 匯款資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-orange-600 font-medium">銀行代號</div>
                  <div className="text-2xl font-bold text-slate-800">822 (中國信託)</div>
                </div>
                <div>
                  <div className="text-sm text-orange-600 font-medium">銀行帳號</div>
                  <div className="text-2xl font-bold text-slate-800 tracking-wider">012-345-678-901</div>
                </div>
                <div>
                  <div className="text-sm text-orange-600 font-medium">戶名</div>
                  <div className="text-xl font-bold text-slate-800">社團法人台灣流浪兔保護協會</div>
                </div>
                <div className="text-sm text-muted-foreground mt-4">
                  * 請務必於匯款後填寫右側表單，以便我們開立收據給您。
                </div>
              </CardContent>
            </Card>

            <div className="prose text-sm text-muted-foreground">
              <h3>注意事項</h3>
              <ul>
                <li>協會將於收到款項後 14 個工作天內核對並開立電子收據。</li>
                 <li>若您需要紙本收據，請直接聯繫我們。</li>
                 <li>捐款收據可抵扣所得稅。</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">填寫匯款資料</h2>
            <DonationForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
