import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RabbitCard } from "@/components/feature/RabbitCard";
import { RabbitFilters } from "@/components/feature/RabbitFilters";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-dynamic';

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
    .order("created_at", { ascending: false });

  if (resolvedParams.gender && resolvedParams.gender !== "all") {
    query = query.eq("gender", resolvedParams.gender as string);
  }
  
  if (resolvedParams.location && resolvedParams.location !== "all") {
     query = query.eq("location", resolvedParams.location as string);
  }

  const { data: rabbits, error } = await query;

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 font-noto-sans-tc">尋找家人</h1>
        <p className="text-muted-foreground mb-8">每一隻兔子都值得被愛，請以領養代替購買。</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <RabbitFilters />
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
             <div className="bg-white p-6 rounded-xl shadow-sm min-h-[500px]">
                {error && (
                  <div className="text-red-500 mb-4">
                    載入資料失敗，請稍後再試。
                  </div>
                )}

                {!rabbits || rabbits.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <p>目前沒有符合條件的兔子。</p>
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

      <Footer />
    </div>
  );
}
