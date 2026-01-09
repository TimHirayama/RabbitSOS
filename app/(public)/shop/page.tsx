import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export const metadata = {
  title: "愛心義賣 | RabbitSOS",
  description: "支持愛心義賣，所得全數用於流浪兔醫療與照護。",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-orange-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 font-noto-sans-tc">愛心義賣</h1>
          <p className="text-orange-100 max-w-2xl mx-auto text-lg">
             逛逛義賣商品，為兔兔籌募醫療基金。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 text-center">
         <div className="bg-white p-12 rounded-2xl shadow-sm max-w-2xl mx-auto">
            <ShoppingBag className="w-20 h-20 text-orange-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-stone-800 mb-4">義賣專區籌備中</h2>
            <p className="text-stone-600 mb-8">
                我們正在整理義賣商品，近期將與大家見面。<br/>
                請關注我們的最新公告。
            </p>
            <Button asChild>
                <Link href="/posts?category=news">查看最新公告</Link>
            </Button>
         </div>
      </div>
    </main>
  );
}
