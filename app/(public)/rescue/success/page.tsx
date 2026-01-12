import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, LifeBuoy } from "lucide-react";
import Link from "next/link";

export default function RescueSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-stone-100 p-8 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-green-100 text-green-600 rounded-full mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          救援申請已送出
        </h1>
        <p className="text-stone-600 mb-8 leading-relaxed">
          感謝您的通報。協會工作人員將於 3-5 個工作天內進行審核，並透過 Email
          與您聯繫後續事宜。
        </p>

        <div className="space-y-3">
          <Button
            asChild
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full"
          >
            <Link href="/rabbits">
              <LifeBuoy className="mr-2 h-4 w-4" /> 查看其他待認養兔兔
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full rounded-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> 返回首頁
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
