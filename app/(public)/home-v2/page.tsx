import { createClient } from "@/lib/supabase/server";
import { HeroSectionV3 } from "@/components/home-v2/HeroSectionV3";
import { NewsSectionV2 } from "@/components/home-v2/NewsSectionV2";
import { FeaturedRabbitsV2 } from "@/components/home-v2/FeaturedRabbitsV2";
import { EnvironmentGalleryV2 } from "@/components/home-v2/EnvironmentGalleryV2";
import { LocationSectionV2 } from "@/components/home-v2/LocationSectionV2";
import { FundraisingProgressV2 } from "@/components/home-v2/FundraisingProgressV2";
import { FeaturedVideosV2 } from "@/components/home-v2/FeaturedVideosV2";

// 1 Hour Revalidation
export const revalidate = 3600;

export default async function HomeV2() {
  const supabase = await createClient();

  // 1. Fetch News (Top, Found, Fundraising, Event) matching V1 structure
  const fetchCategory = async (category: string) => {
    const { data } = await supabase
      .from("posts")
      .select("id, title, published_at, category")
      .eq("published", true)
      .eq("category", category)
      .order("published_at", { ascending: false })
      .limit(5);
    return data || [];
  };

  const [topParams, foundParams, fundraisingParams, eventParams] =
    await Promise.all([
      fetchCategory("top"),
      fetchCategory("found"),
      fetchCategory("fundraising"),
      fetchCategory("event"),
    ]);

  // 2. Fetch Featured Rabbits
  const { data: rabbits } = await supabase
    .from("rabbits")
    .select(
      "id, name, gender, age_year, location, image_urls, weight, breed, age_category, description",
    )
    .eq("status", "open")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(8); // Grid of 8 for V2 (4 cols x 2 rows)

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#E11D48] selection:text-white">
      <HeroSectionV3 />

      <NewsSectionV2
        topPosts={topParams}
        foundPosts={foundParams}
        fundraisingPosts={fundraisingParams}
        eventPosts={eventParams}
      />

      <FundraisingProgressV2 />

      <FeaturedRabbitsV2 rabbits={rabbits || []} />

      <FeaturedVideosV2 />

      <EnvironmentGalleryV2 />

      <LocationSectionV2 />
    </main>
  );
}
