import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

export const metadata = {
  title: "救援申請 | RabbitSOS",
  description: "若您發現需要救援的流浪兔，請填寫申請表。",
};

export default function RescuePage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-orange-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 font-noto-sans-tc">救援申請</h1>
          <p className="text-orange-100 max-w-2xl mx-auto text-lg">
             發現需要幫助的兔子嗎？請填寫通報單。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 text-center">
         <div className="bg-white p-12 rounded-2xl shadow-sm max-w-2xl mx-auto">
            <ClipboardList className="w-20 h-20 text-orange-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-stone-800 mb-4">救援通報說明</h2>
            <p className="text-stone-600 mb-8 text-left leading-relaxed">
                通報前請確認：<br/>
                1. 兔子是否受傷或有立即危險。<br/>
                2. 若為棄養，請先嘗試自行送養或聯繫原飼主。<br/>
                3. 我們的人力有限，審核需要時間，請耐心等候。
            </p>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                填寫救援申請表
            </Button>
         </div>
      </div>
    </main>
  );
}
