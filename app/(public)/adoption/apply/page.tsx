import { ApplicationForm } from "./_components/application-form";
import { Suspense } from "react";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-4">
              認養申請表
            </h1>
            <p className="text-stone-500">
              請誠實填寫以下資訊，這將幫助我們確認您是否適合這隻兔兔。
              <br />
              (目前為演示模式，資料將不會真的送出)
            </p>
          </div>

          <Suspense fallback={<div>Loading form...</div>}>
            <ApplicationForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
