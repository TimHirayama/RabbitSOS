import { Rabbit } from "lucide-react";

export const metadata = {
  title: "關於我們 | RabbitSOS",
  description: "認識台灣流浪兔保護協會，了解我們的理念與使命。",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-orange-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
             <div className="bg-white p-4 rounded-full shadow-lg">
                <Rabbit className="w-12 h-12 text-orange-600" />
             </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 font-noto-sans-tc">關於我們</h1>
          <p className="text-orange-100 max-w-2xl mx-auto text-lg leading-relaxed">
             一群熱愛兔子的志工，一個共同的願望。<br/>
             為無助的流浪兔，點亮回家的路。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-4xl space-y-12">
         {/* Section 1 */}
         <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-stone-800 border-l-4 border-orange-500 pl-4">
                成立宗旨
            </h2>
            <div className="space-y-4 text-stone-600 leading-loose text-lg">
                <p>
                    台灣流浪兔保護協會 (RabbitSOS) 成立於 2010 年，致力於救援流浪、受虐及不當飼養的寵物兔。我們相信，每一個生命都值得被尊重與善待。
                </p>
                <p>
                    透過急難救助、醫療照護、中途安置與送養媒合，我們期盼為每一隻受苦的兔子找到溫暖的家。同時，我們也積極推廣正確的飼養觀念，落實「以領養代替購買，以結紮代替撲殺」，從源頭減少流浪兔的產生。
                </p>
            </div>
         </section>

         {/* Section 2 */}
         <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-stone-800 border-l-4 border-orange-500 pl-4">
                我們在做什麼
            </h2>
            <ul className="grid md:grid-cols-2 gap-6">
                <li className="flex gap-4">
                    <span className="text-4xl">🚑</span>
                    <div>
                        <h3 className="font-bold text-stone-800 text-lg mb-2">急難救援</h3>
                        <p className="text-stone-600">救援各地被遺棄、受虐或生病的兔子，提供緊急醫療。</p>
                    </div>
                </li>
                <li className="flex gap-4">
                    <span className="text-4xl">🏡</span>
                    <div>
                        <h3 className="font-bold text-stone-800 text-lg mb-2">中途安置</h3>
                        <p className="text-stone-600">徵求愛心中途家庭，提供兔兔暫時的避風港與社會化訓練。</p>
                    </div>
                </li>
                 <li className="flex gap-4">
                    <span className="text-4xl">❤️</span>
                    <div>
                        <h3 className="font-bold text-stone-800 text-lg mb-2">送養媒合</h3>
                        <p className="text-stone-600">嚴格篩選認養人，確保兔兔能到一個負責且愛牠們的家。</p>
                    </div>
                </li>
                 <li className="flex gap-4">
                    <span className="text-4xl">🎓</span>
                    <div>
                        <h3 className="font-bold text-stone-800 text-lg mb-2">教育推廣</h3>
                        <p className="text-stone-600">舉辦講座與義賣活動，宣導正確飼養知識。</p>
                    </div>
                </li>
            </ul>
         </section>
      </div>
    </main>
  );
}
