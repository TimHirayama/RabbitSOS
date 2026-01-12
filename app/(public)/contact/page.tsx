import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Clock, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-white py-20 border-b border-stone-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-noto-sans-tc mb-6 text-stone-900">
            聯絡我們
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            有任何問題或建議，歡迎隨時與我們聯繫。
            <br />
            我們會盡快回覆您的訊息。
          </p>
          <div className="h-1 w-20 bg-orange-400 mx-auto mt-8 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-stone-800">地址</h3>
            <p className="text-stone-600">新北市中和區民享街６號２樓</p>
            <p className="text-sm text-stone-400 mt-2 bg-stone-50 inline-block px-3 py-1 rounded-full">
              (參觀請先預約)
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-stone-800">電子信箱</h3>
            <a
              href="mailto:rabbitsos@gmail.com"
              className="text-stone-600 hover:text-blue-600 font-medium transition-colors text-lg"
            >
              rabbitsos@gmail.com
            </a>
            <p className="text-sm text-stone-400 mt-2">
              救援通報、志工報名專用
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-stone-800">連絡電話</h3>
            <a
              href="tel:0222215646"
              className="text-stone-600 hover:text-green-600 font-medium transition-colors text-lg"
            >
              (02) 2221-5646
            </a>
            <p className="text-sm text-stone-400 mt-2">
              服務時間：週一至週五 10:00-19:00
            </p>
          </div>
        </div>

        {/* Map & Operating Hours Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-stone-200">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.654868077598!2d121.4740751!3d25.011833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a8264567204f%3A0x2d3a013470768e82!2zMjM15paw5YyX5biC5Lit5ZKM5Y2A5rCR5Lqr6KGXNuiZnzLppZw!5e0!3m2!1szh-TW!2stw!4v1715585000000!5m2!1szh-TW!2stw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-10 lg:pt-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <h2 className="text-2xl font-bold text-stone-800 mb-6 font-noto-sans-tc flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-500" />
                開放參觀時間
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2.5"></div>
                  <div>
                    <h4 className="font-bold text-lg text-stone-800">
                      平時開放
                    </h4>
                    <p className="text-stone-600">週一至週五：10:00 - 19:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2.5"></div>
                  <div>
                    <h4 className="font-bold text-lg text-stone-800">
                      假日開放
                    </h4>
                    <p className="text-stone-600">
                      週末及國定假日：12:00 - 18:00
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl text-orange-800 text-sm mt-2 leading-relaxed border border-orange-100">
                  <span className="font-bold mr-1">⚠️ 注意事項：</span>
                  為了維護兔兔的休息品質，請務必輕聲細語，並遵守現場工作人員的指示。
                  團體參訪請提前來信預約。
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-6 font-noto-sans-tc px-2">
                關注我們
              </h2>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full gap-2 border-stone-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 h-14 px-8 text-lg"
                  asChild
                >
                  <Link
                    href="https://www.facebook.com/rabbitsos/"
                    target="_blank"
                  >
                    <Facebook className="w-6 h-6" /> Facebook
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full gap-2 border-stone-200 hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50 h-14 px-8 text-lg"
                  asChild
                >
                  <Link
                    href="https://www.instagram.com/rabbitsos/"
                    target="_blank"
                  >
                    <Instagram className="w-6 h-6" /> Instagram
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
