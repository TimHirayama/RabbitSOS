import { FosterForm } from "./_components/foster-form";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FosterApplyPage() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="mb-6 absolute top-6 left-4 z-30">
        <Button
          variant="ghost"
          asChild
          className="pl-0 text-white hover:text-orange-200 hover:bg-transparent"
        >
          <Link href="/volunteer">
            <ArrowLeft className="mr-2 w-4 h-4" /> 返回志工/中途說明
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-linear-to-r from-orange-900 to-stone-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Home className="w-16 h-16 text-orange-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-bold font-noto-sans-tc mb-4 md:mb-6 leading-tight">
            中途之家申請
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            感謝您願意提供暫時的避風港。
            <br className="hidden md:block" />
            每一個溫暖的家，都是流浪兔重生的起點。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl -translate-y-8 md:-translate-y-10 relative z-20">
        <FosterForm />
      </div>
    </div>
  );
}
