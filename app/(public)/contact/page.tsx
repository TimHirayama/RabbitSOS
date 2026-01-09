import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "聯絡我們 | RabbitSOS",
  description: "有任何問題或建議嗎？歡迎與我們聯繫。",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="bg-orange-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 font-noto-sans-tc">聯絡我們</h1>
          <p className="text-orange-100 max-w-2xl mx-auto text-lg">
            無論是認養諮詢、捐款問題或或是通報救援，我們都很樂意為您服務。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
                <Card>
                    <CardContent className="p-8 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-500" />
                                服務時間
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                週一至週五：10:00 - 18:00<br/>
                                週六、週日：13:00 - 17:00 (採預約制)<br/>
                                國定假日：休館
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-stone-800 mb-4">聯絡方式</h3>
                            
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-stone-800">電話</p>
                                    <p className="text-stone-600">(02) 1234-5678</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-stone-800">Email</p>
                                    <p className="text-stone-600">service@rabbitsos.org</p>
                                </div>
                            </div>

                             <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-stone-800">地址</p>
                                    <p className="text-stone-600">台北市內湖區舊宗路一段159號</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Map */}
            <div className="h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg bg-stone-200">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.4678877543887!2d121.57758657605058!3d25.05213283756281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab7f74332509%3A0x63351d38241e171!2zMTE05Y-w5YyX5biC5YWn5rmW5Y2A6Ioldp-aeXot6Z!5e0!3m2!1szh-TW!2stw!4v1710924564858!5m2!1szh-TW!2stw" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                ></iframe>
            </div>
        </div>
      </div>
    </main>
  );
}
