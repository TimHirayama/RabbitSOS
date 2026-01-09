import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LocationSection() {
  return (
    <section className="py-0 relative">
      <div className="flex flex-col md:flex-row h-[600px]">
        {/* Info Card - Left Side (Desktop) or Top (Mobile) */}
        <div className="w-full md:w-1/3 bg-orange-600 text-white p-12 flex flex-col justify-center relative z-10">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-noto-sans-tc mb-4">
                來找我們
              </h2>
              <p className="text-orange-100 leading-relaxed">
                想要親自看看可愛的兔兔嗎？歡迎預約參觀，讓專業的志工為您介紹每一位毛小孩的故事。
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-orange-200 shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">如何來協會</h3>
                  <p className="text-orange-100">新北市中和區民享街６號２樓</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 mt-1 text-orange-200 shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">愛心義賣賣場營業時間</h3>
                  <p className="text-orange-100">週一~週五：上午10點-晚上8點</p>
                  <p className="text-orange-100">
                    周末及國定假日：中午12點-晚上6點
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 text-orange-200 shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">聯絡我們</h3>
                  <p className="text-orange-100 mb-1">電話: (02)2221-5646</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-orange-100">rabbitsos@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="w-full font-bold text-orange-600 bg-white hover:bg-orange-50"
              asChild
            >
              <Link href="/contact">預約參觀</Link>
            </Button>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-orange-500 rounded-full opacity-50 blur-3xl" />
        </div>

        {/* Map - Right Side */}
        <div className="w-full md:w-2/3 bg-stone-200 relative h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.87611848729!2d121.4690642832491!3d25.004325082354075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a82e55555555%3A0x517f7478d6945954!2z5Y-w54Gj5rWB5rWq5YWU5L-d6K235Y2U5pyD!5e0!3m2!1szh-TW!2stw!4v1767941826921!5m2!1szh-TW!2stw"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
}
