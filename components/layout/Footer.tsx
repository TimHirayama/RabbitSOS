import { Rabbit, Mail, Phone, MapPin, Facebook } from "lucide-react";
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
            致力於改善流浪兔的處境，推廣正確的飼養觀念，並為無家可歸的兔子尋找溫暖的家。
          </p>
          <div className="flex gap-4">
            <Link
              href="http://facebook.com/rabbitsos/"
              target="_blank"
              className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <Facebook className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            快速連結
            <span className="h-1 flex-1 bg-orange-400/50 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-orange-50">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                協會簡介
              </Link>
            </li>
            <li>
              <Link
                href="/rabbits"
                className="hover:text-white transition-colors"
              >
                我要認養
              </Link>
            </li>
            <li>
              <Link
                href="/donate"
                className="hover:text-white transition-colors"
              >
                捐款回報
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-white transition-colors">
                最新公告
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            聯絡我們
            <span className="h-1 flex-1 bg-orange-400/50 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-orange-50">
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 shrink-0 text-orange-200 mt-1" />
              <span>rabbitsos@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 shrink-0 text-orange-200 mt-1" />
              <span>(02)2221-5646</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-orange-200 mt-1" />
              <span>新北市中和區民享街６號２樓</span>
            </li>
          </ul>
        </div>

        {/* Donation Column (New) */}
        <div>
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            捐款資訊
            <span className="h-1 flex-1 bg-orange-400/50 rounded-full"></span>
          </h3>
          <div className="space-y-3 text-orange-50 text-sm">
            <div>
              <p className="font-bold text-white mb-1">協會帳戶</p>
              <p>戶名: 台灣流浪兔保護協會</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">
                台灣銀行民權分行 (004)
              </p>
              <p className="font-mono text-base tracking-wide">
                046 001 001 235
              </p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">郵局劃撥帳號</p>
              <p className="font-mono text-base tracking-wide">50191826</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">電子發票自願捐贈碼</p>
              <p className="font-mono text-base tracking-wide flex items-center gap-2">
                17922
                <span className="text-xs font-normal opacity-80">
                  (一起救兔兔)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-orange-400/50 text-center text-sm text-orange-200">
        <p>
          © {new Date().getFullYear()} Taiwan Rabbit Protection Association. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
