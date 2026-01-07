import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export async function FeaturedRabbits() {
  const supabase = await createClient();
  
  // Fetch only 'open' status rabbits, limit 6
  const { data: rabbits } = await supabase
    .from("rabbits")
    .select("id, name, gender, age_year, location, image_urls")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(6);

  if (!rabbits || rabbits.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-noto-sans-tc text-stone-800">精選待認養兔兔</h2>
          <p className="text-muted-foreground">目前暫無待認養的兔兔。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-2">精選待認養兔兔</h2>
            <p className="text-stone-600">這些孩子正在尋找一個永遠的家，您願意成為他們的家人嗎？</p>
          </div>
          <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50" asChild>
            <Link href="/rabbits">查看全部兔兔</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rabbits.map((rabbit) => (
            <Card key={rabbit.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none rounded-2xl bg-white">
              <div className="aspect-[4/3] w-full relative bg-stone-100 overflow-hidden">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                {rabbit.image_urls && rabbit.image_urls[0] ? (
                  <img
                    src={rabbit.image_urls[0]}
                    alt={rabbit.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-stone-300 bg-stone-100">
                    <span className="text-4xl">🐰</span>
                  </div>
                )}
                
                {/* Gender Tag Overlay */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                        rabbit.gender === 'M' ? 'bg-blue-100/90 text-blue-700 backdrop-blur-sm' : 
                        rabbit.gender === 'F' ? 'bg-pink-100/90 text-pink-700 backdrop-blur-sm' : 
                        'bg-gray-100/90 text-gray-700 backdrop-blur-sm'
                    }`}>
                        {rabbit.gender === 'M' ? '♂ 男生' : rabbit.gender === 'F' ? '♀ 女生' : '? 未知'}
                    </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-stone-800 mb-1">{rabbit.name}</h3>
                    <div className="flex gap-4 text-sm text-stone-500">
                        <span>📍 {rabbit.location}</span>
                        <span>🎂 {rabbit.age_year ? `${rabbit.age_year} 歲` : "年齡不詳"}</span>
                    </div>
                </div>
                
                <Button className="w-full bg-stone-800 hover:bg-orange-500 hover:text-white transition-colors rounded-xl h-12 text-base" asChild>
                  <Link href={`/rabbits/${rabbit.id}`}>認識我</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

