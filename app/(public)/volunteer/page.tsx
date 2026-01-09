import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export const metadata = {
  title: "志工招募 | RabbitSOS",
  description: "加入我們，成為改變兔兔生命的力量。",
};

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-orange-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 font-noto-sans-tc">志工招募</h1>
          <p className="text-orange-100 max-w-2xl mx-auto text-lg">
             您的雙手，能為牠們撐起一個家。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 text-center">
         <div className="bg-white p-12 rounded-2xl shadow-sm max-w-2xl mx-auto">
            <HeartHandshake className="w-20 h-20 text-orange-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-stone-800 mb-4">我們需要您</h2>
            <p className="text-stone-600 mb-8">
                無論是中途家庭、行政志工或活動幫手，<br/>
                只要有一顆愛兔子的心，歡迎加入我們的行列。
            </p>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                查看招募職缺
            </Button>
         </div>
      </div>
    </main>
  );
}
