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
              <h2 className="text-3xl font-bold font-noto-sans-tc mb-4">來找我們</h2>
              <p className="text-orange-100 leading-relaxed">
                想要親自看看可愛的兔兔嗎？歡迎預約參觀，讓專業的志工為您介紹每一位毛小孩的故事。
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-orange-200 shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">協會地址</h3>
                  <p className="text-orange-100">台北市內湖區舊宗路一段159號</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 mt-1 text-orange-200 shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">開放時間</h3>
                  <p className="text-orange-100">週一至週五: 13:00 - 20:00</p>
                  <p className="text-orange-100">週六、週日: 10:00 - 18:00</p>
                  <p className="text-sm text-orange-200 mt-1">* 國定假日請依公告為主</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 text-orange-200 shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">聯絡電話</h3>
                  <p className="text-orange-100">(02) 8765-4321</p>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="lg" className="w-full font-bold text-orange-600 bg-white hover:bg-orange-50" asChild>
                <Link href="/contact">預約參觀</Link>
            </Button>
          </div>
          
          {/* Decorative Circle */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-orange-500 rounded-full opacity-50 blur-3xl" />
        </div>

        {/* Map - Right Side */}
        <div className="w-full md:w-2/3 bg-stone-200 relative h-full">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.467878952456!2d121.5794833150066!3d25.05212888396387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab6b9b9b9b9b%3A0x9b9b9b9b9b9b9b9b!2z5Y-w5YyX5biC5YWn5rmW5Y2A6IiK5a6X6Lev5LiA5q61MTU56JuZ!5e0!3m2!1szh-TW!2stw!4v1620000000000!5m2!1szh-TW!2stw" 
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
