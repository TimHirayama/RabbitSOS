// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
import { RabbitCard } from "@/components/feature/RabbitCard";
import { RabbitFilters } from "@/components/feature/RabbitFilters";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export default async function RabbitsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  // const cookieStore = await cookies();
  const supabase = await createClient();

  let query = supabase
    .from("rabbits")
    .select("*")
    .neq("status", "closed")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (resolvedParams.name) {
    query = query.ilike("name", `%${resolvedParams.name}%`);
  }

  if (resolvedParams.gender && resolvedParams.gender !== "all") {
    query = query.eq("gender", resolvedParams.gender as string);
  }

  if (resolvedParams.color && resolvedParams.color !== "all") {
    query = query.eq("color", resolvedParams.color as string);
  }

  if (resolvedParams.breed && resolvedParams.breed !== "all") {
    // Breed might need ILIKE if we want partial matches, but exact match for specific options is safer.
    // However, user options are specific English keys mapping to text.
    // Let's assume exact match for now based on RabbitFilters options.
    query = query.eq("breed", resolvedParams.breed as string);
    // Wait, the breed filter sends "Pet", "White", etc.
    // Does the DB store "Pet" or "寵物兔"?
    // The Admin Form stores free text! And we have a new Select in form?
    // No, I added Input for breed in form: <Input id="breed" ... />
    // Actually, I should probably check what I did in the form.
    // In step 1966 view: <Input id="breed" ... placeholder="例:道奇" />
    // So it's free text. The filter sends "Pet", "White", "Lop", etc.
    // I need to map these filter keys to the Chinese values likely stored in DB.

    const breedKey = resolvedParams.breed as string;
    if (breedKey === "Pet") query = query.ilike("breed", "%寵物%");
    else if (breedKey === "White") query = query.ilike("breed", "%大白%");
    else if (breedKey === "Lop") query = query.ilike("breed", "%垂耳%");
    else if (breedKey === "Dutch") query = query.ilike("breed", "%道奇%");
    else if (breedKey === "Mini") query = query.ilike("breed", "%迷你%");
    else query = query.eq("breed", breedKey);
  }

  if (resolvedParams.location && resolvedParams.location !== "all") {
    const loc = resolvedParams.location as string;

    // Map location keys to likely Chinese text in database
    if (loc === "Taipei") {
      query = query.ilike("location", "%台北%");
    } else if (loc === "NewTaipei") {
      query = query.ilike("location", "%新北%");
    } else if (loc === "Taoyuan") {
      query = query.ilike("location", "%桃園%");
    } else if (loc === "Taichung") {
      // Handle both 台中 and 臺中
      query = query.or("location.ilike.%台中%,location.ilike.%臺中%");
    } else if (loc === "Kaohsiung") {
      query = query.ilike("location", "%高雄%");
    } else if (loc === "Other") {
      // Hard to filter 'Other' cleanly with free text, maybe skip or fuzzy match logic?
      // For now let's just ignore or match exact if somehow stored as 'Other'
      query = query.eq("location", "Other");
    } else {
      // Fallback for custom values
      query = query.eq("location", loc);
    }
  }

  const { data: rabbits, error } = await query;

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-stone-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-600/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 brightness-100 contrast-150 grayscale" />
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-noto-sans-tc">
            尋找家人
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            每一隻兔子都值得被愛，請以領養代替購買。
            <br className="hidden md:inline" />
            讓我們一起為這些可愛的毛孩子找到溫暖的家。
          </p>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 -mt-10 md:-mt-16 relative z-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 sticky top-24">
              <RabbitFilters />
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-stone-100 min-h-[500px]">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center justify-center">
                  載入資料失敗，請稍後再試。
                </div>
              )}

              {!rabbits || rabbits.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                  <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-4xl">
                    🐰
                  </div>
                  <p className="text-lg font-medium">目前沒有符合條件的兔子</p>
                  <p className="text-sm">請嘗試調整篩選條件</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rabbits.map((rabbit) => (
                    <RabbitCard key={rabbit.id} rabbit={rabbit} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
