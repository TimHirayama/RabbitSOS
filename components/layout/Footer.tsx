import { Rabbit, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-orange-500 text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-1.5 rounded-full">
                <Rabbit className="h-6 w-6 text-orange-500" />
            </div>
            <span className="text-xl font-bold">台灣流浪兔保護協會</span>
          </div>
          <p className="text-orange-50 text-sm leading-relaxed max-w-xs">
            致力於改善流浪兔的處境，推廣正確的飼養觀念，並為無家可歸的兔子尋找溫暖的家。每一個生命都值得被溫柔對待。
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            關於我們
            <span className="h-1 flex-1 bg-orange-400/50 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-orange-50">
            <li>
              <Link href="/about" className="hover:text-white transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-300 rounded-full"></span>
                協會簡介
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-orange-300 rounded-full"></span>
                聯絡我們
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-orange-300 rounded-full"></span>
                隱私權政策
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            服務項目
             <span className="h-1 flex-1 bg-orange-400/50 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-orange-50">
            <li>
              <Link href="/rabbits" className="hover:text-white transition-colors flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-orange-300 rounded-full"></span>
                我要認養
              </Link>
            </li>
            <li>
              <Link href="/donate/report" className="hover:text-white transition-colors flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-orange-300 rounded-full"></span>
                捐款回報
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-white transition-colors flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-orange-300 rounded-full"></span>
                最新公告
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            聯絡資訊
             <span className="h-1 flex-1 bg-orange-400/50 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-orange-50">
            <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 shrink-0 text-orange-200" />
                <span>service@rabbitsos.org</span>
            </li>
            <li className="flex items-start gap-3">
                 <Phone className="w-5 h-5 shrink-0 text-orange-200" />
                <span>(02) 1234-5678</span>
            </li>
            <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-orange-200" />
                <span>台北市內湖區舊宗路一段159號</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-orange-400/50 text-center text-sm text-orange-200">
         <p>© {new Date().getFullYear()} Taiwan Rabbit Protection Association. All rights reserved.</p>
      </div>
    </footer>
  );
}
