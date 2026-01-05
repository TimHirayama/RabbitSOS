import { createClient } from "@/lib/supabase/server";
import { BannerUpload } from "./_components/upload-form";
import { BannerList } from "./_components/banner-list";
import { BannerSettings } from "./_components/banner-settings";
import { getSiteSetting } from "../actions";

export default async function AdminBannersPage() {
  const supabase = await createClient();
  
  const { data: banners } = await supabase
    .from("banners")
    .select("*")
    .order("sort_order", { ascending: true });

  const bannerLayout = await getSiteSetting('banner_layout', 'contained');

  return (
    <div className="space-y-8 w-full p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">首頁橫幅 (Banner) 管理</h2>
        <p className="text-muted-foreground">
          管理首頁輪播圖片，設定全域顯示模式、新增或排序
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Column 1: Settings */}
        <div className="space-y-4">
           <h3 className="text-lg font-semibold flex items-center gap-2">
              1. 顯示設定
           </h3>
           <BannerSettings initialLayout={bannerLayout} />
           
           <div className="text-sm text-muted-foreground bg-slate-50 p-4 rounded-lg border">
              <p>💡 提示：</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                 <li>建議圖片比例：16:9 (一般) 或 21:9 (滿版)</li>
                 <li>拖曳列表項目可調整排序 (目前需手動輸入數字)</li>
                 <li>系統會自動壓縮過大的圖片</li>
              </ul>
           </div>
        </div>

        {/* Column 2: Upload */}
        <div className="space-y-4">
           <h3 className="text-lg font-semibold">
              2. 新增 Banner
           </h3>
           <BannerUpload />
        </div>

        {/* Column 3: List */}
        <div className="space-y-4">
           <h3 className="text-lg font-semibold">
              3. 現有列表 ({banners?.length || 0})
           </h3>
           <BannerList banners={banners || []} />
        </div>
      </div>
    </div>
  );
}
