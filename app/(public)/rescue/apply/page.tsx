import { RescueForm } from "./_components/rescue-form";
import { LifeBuoy } from "lucide-react";

export default function RescueApplyPage() {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-linear-to-r from-red-900 to-stone-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <LifeBuoy className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-bold font-noto-sans-tc mb-4 md:mb-6 leading-tight">
            救援申請單
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            感謝您的愛心。請據實填寫以下資訊，
            <br className="hidden md:block" />
            以利協會後續救援作業。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -translate-y-8 md:-translate-y-10 relative z-20">
        <RescueForm />
      </div>
    </div>
  );
}
