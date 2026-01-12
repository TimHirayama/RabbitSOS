import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, FileText } from "lucide-react";

export const metadata = {
  title: "關於我們 | RabbitSOS",
  description: "認識台灣流浪兔保護協會，了解我們的理念與使命。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Video Section - Top */}
      <section className="w-full bg-stone-50 pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-stone-100">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/maBuLxlPPTk?si=M_vks2HvmBFuR5Ec"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Header / Intro Text - Centered */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-noto-serif-tc text-stone-900">
          關於 台灣流浪兔保護協會
        </h1>
        <p className="text-xl text-stone-600 font-light leading-relaxed">
          一群熱愛生命的志工，為流浪與受虐兔尋找幸福的家。
        </p>
        <div className="h-1 w-20 bg-orange-400 mx-auto mt-6 rounded-full"></div>
      </section>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 pb-20 space-y-20">
        {/* Origin */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-8 w-1 bg-orange-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-stone-800 font-noto-serif-tc">
              協會緣起
            </h2>
          </div>
          <div className="prose prose-lg text-stone-600 leading-loose font-noto-sans-tc text-justify max-w-none">
            <p>
              本協會前身原本是由一群心疼兔兔遭受不人道對待、被飼主惡意棄養而在街頭流浪的兔友們組成的小團體─【兔寶貝急難救助小組】；
              為了能合法公開尋求資源，該小組成員們在多方鼓勵下，於2009年6月13日獲得內政部審核通過，催生了【台灣流浪兔保護協會】。
            </p>
            <p>
              本協會希望透過舉辦各種公開的活動來宣導正確的飼養知識，以及爭取更多的資源，使各界善心人士及熱心中途、志工們能名正言順地進行捐贈，
              讓在街頭流浪及受虐的可憐兔兔們能夠得到細心的照顧，與接受良好的醫療照護，最終更能找到願意照顧其一生的飼主。
            </p>
            <p className="font-medium text-stone-800 bg-orange-50 p-4 rounded-lg border border-orange-100">
              真心邀請所有想為流浪兔、受虐兔付出一點心力的朋友加入我們的行列，讓我們一起共同努力來為流浪兔、受虐兔找到一個愛牠、照顧牠一輩子的幸福的家!!
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="space-y-6 bg-stone-50 p-8 md:p-12 rounded-3xl border border-stone-100">
          <div className="flex items-center gap-4 mb-4 justify-center">
            <h2 className="text-3xl font-bold text-stone-800 font-noto-serif-tc">
              協會宗旨
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 pt-4">
            {[
              {
                title: "急救治療",
                desc: "搶救瀕臨危險之流浪、受虐兔並提供急救治療。",
                icon: "🚑",
                color: "bg-red-50 text-red-600 border-red-100",
              },
              {
                title: "收容安置",
                desc: "提供短期收容並安排長期收養。",
                icon: "🏠",
                color: "bg-orange-50 text-orange-600 border-orange-100",
              },
              {
                title: "生命教育",
                desc: "舉辦教育性活動提高大眾對動物處境的了解同理心，並提供人道照顧。",
                icon: "📚",
                color: "bg-blue-50 text-blue-600 border-blue-100",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white shadow-sm border border-stone-100 hover:shadow-md transition-all"
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full text-3xl mb-1 ${item.color} border`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-800">
                  {item.title}
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-stone-800 font-noto-serif-tc">
              協會理念
            </h2>
          </div>
          <blockquote className="relative p-8 rounded-2xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 shadow-sm text-center">
            <span className="text-6xl text-stone-200 absolute top-2 left-4 font-serif">
              “
            </span>
            <p className="text-2xl md:text-3xl font-bold text-stone-800 font-noto-serif-tc my-4">
              以認養代替購買、放生等同於死亡
            </p>
            <span className="text-6xl text-stone-200 absolute bottom-[-20px] right-4 font-serif rotate-180">
              “
            </span>
          </blockquote>
          <div className="prose prose-lg text-stone-600 leading-loose font-noto-sans-tc text-justify max-w-none">
            <p>
              這是本協會的理念。由於國人缺乏正確的生命教育，讓隨意飼養、任意棄養寵物的行為助長了不肖繁殖場的盛行；
              然而業者這種將動物視為生財物品，進行不當繁殖與買賣的行為，也製造了更多流浪街頭與山區的兔兔。
            </p>
            <p>
              終結流浪兔的路很長很遠，首先就從「認養代替購買」做起吧！
              祈望所有協會救援安置的流浪兔、受虐兔，在熱心中途及志工們的細心照料下，除了可以恢復原本的美麗與健康外，
              並在協會慎重篩選適當認養人的過程中，都能找到願意愛護牠們、照顧牠們一輩子的新主人!!
            </p>
          </div>
        </section>

        {/* Info Card - Light Theme */}
        <section className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-lg mt-12">
          <div className="p-8 md:p-12 space-y-8">
            <h2 className="text-2xl font-bold text-stone-800 border-b border-stone-100 pb-4">
              協會小檔案
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex items-start gap-4 group">
                <div className="bg-orange-50 group-hover:bg-orange-100 p-3 rounded-xl transition-colors">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">
                    核准立案文號
                  </h3>
                  <p className="font-mono text-stone-500">
                    台內社字第0980148887號
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-orange-50 group-hover:bg-orange-100 p-3 rounded-xl transition-colors">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">電子信箱</h3>
                  <a
                    href="mailto:rabbitsos@gmail.com"
                    className="text-stone-500 hover:text-orange-600 transition-colors font-medium"
                  >
                    rabbitsos@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-orange-50 group-hover:bg-orange-100 p-3 rounded-xl transition-colors">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">電話</h3>
                  <a
                    href="tel:02-2221-5646"
                    className="text-stone-500 hover:text-orange-600 transition-colors font-medium"
                  >
                    02-2221-5646
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-orange-50 group-hover:bg-orange-100 p-3 rounded-xl transition-colors">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">地址</h3>
                  <p className="text-stone-500">新北市中和區民享街6號2樓</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
