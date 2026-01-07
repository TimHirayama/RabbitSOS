// import { createClient } from "@/lib/supabase/server";
import { FeaturedRabbits } from "@/components/home/FeaturedRabbits";
// import { BannerCarousel } from "@/components/home/BannerCarousel";
// import { getSiteSetting } from "../admin/actions";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsSection } from "@/components/home/NewsSection";
import { EnvironmentGallery } from "@/components/home/EnvironmentGallery";
import { LocationSection } from "@/components/home/LocationSection";

export const revalidate = 0; // Ensure homepage is always fresh
export const dynamic = 'force-dynamic';

export default async function Home() {
  // const supabase = await createClient();
  
  // const { data: banners } = await supabase
  //   .from("banners")
  //   .select("*")
  //   .eq('is_active', true)
  //   .order('sort_order', { ascending: true });

  // const bannerLayout = await getSiteSetting('banner_layout', 'contained');

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* <BannerCarousel banners={banners || []} layout={bannerLayout} /> */}
      <HeroSection />
      
      <NewsSection />
      
      <FeaturedRabbits />
      
      <EnvironmentGallery />
      
      <LocationSection />
    </main>
  );
}
