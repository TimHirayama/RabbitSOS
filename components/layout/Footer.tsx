import { Rabbit } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Rabbit className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">台灣流浪兔保護協會</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            致力於改善流浪兔的處境，推廣正確的飼養觀念，並為無家可歸的兔子尋找溫暖的家。
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">關於我們</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                協會簡介
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                聯絡我們
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                隱私權政策
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">服務項目</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/rabbits" className="hover:text-primary transition-colors">
                我要認養
              </Link>
            </li>
            <li>
              <Link href="/donate/report" className="hover:text-primary transition-colors">
                捐款回報
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-primary transition-colors">
                最新公告
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">聯絡資訊</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Email: service@rabbitsos.org</li>
            <li>電話: (02) 1234-5678</li>
            <li>地址: 台北市某某區某某路123號</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-stone-200 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Taiwan Rabbit Protection Association. All rights reserved.
      </div>
    </footer>
  );
}
