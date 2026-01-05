import { createClient } from "@/lib/supabase/server";
import { FeaturedRabbits } from "@/components/home/FeaturedRabbits";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import { getSiteSetting } from "../admin/actions";

export const revalidate = 0; // Ensure homepage is always fresh
export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();
  
  const { data: banners } = await supabase
    .from("banners")
    .select("*")
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  const bannerLayout = await getSiteSetting('banner_layout', 'contained');

  return (
    <main className="flex min-h-screen flex-col">
      <BannerCarousel banners={banners || []} layout={bannerLayout} />
      
      <div className="container mx-auto px-4">
        <FeaturedRabbits />
      </div>

      <section className="py-16 bg-white mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 font-noto-sans-tc text-stone-800">我們需要您的支持</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-orange-50 space-y-4">
              <div className="text-4xl">💊</div>
              <h3 className="text-xl font-bold">醫療照護</h3>
              <p className="text-stone-600">您的捐款將用於受傷兔兔的緊急醫療與結紮手術。</p>
            </div>
            <div className="p-6 rounded-xl bg-orange-50 space-y-4">
              <div className="text-4xl">🥕</div>
              <h3 className="text-xl font-bold">日常飲食</h3>
              <p className="text-stone-600">提供兔兔高品質牧草與新鮮蔬菜，維持健康體態。</p>
            </div>
            <div className="p-6 rounded-xl bg-orange-50 space-y-4">
              <div className="text-4xl">🏡</div>
              <h3 className="text-xl font-bold">中途安置</h3>
              <p className="text-stone-600">支持中途家庭的設備需求，給兔兔一個暫時的避風港。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
