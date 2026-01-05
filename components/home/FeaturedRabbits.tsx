import Link from "next/link";
// import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// This is a Server Component
import { createClient } from "@/lib/supabase/server";

export async function FeaturedRabbits() {
  const supabase = await createClient();
  
  // Fetch only 'open' status rabbits, limit 3, order by created_at desc
  const { data: rabbits } = await supabase
    .from("rabbits")
    .select("id, name, gender, age_year, location, image_urls")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(3);

  if (!rabbits || rabbits.length === 0) {
    return (
      <section className="py-12 bg-stone-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-noto-sans-tc text-stone-800">精選待認養兔兔</h2>
          <p className="text-muted-foreground">目前暫無待認養的兔兔。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-2">精選待認養兔兔</h2>
            <p className="text-stone-600">這些孩子正在尋找一個永遠的家</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/rabbits">查看全部</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rabbits.map((rabbit) => (
            <Card key={rabbit.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full relative bg-stone-200">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                {rabbit.image_urls && rabbit.image_urls[0] ? (
                  <img
                    src={rabbit.image_urls[0]}
                    alt={rabbit.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-stone-400">
                    No Image
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">{rabbit.name}</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rabbit.gender === 'M' ? 'bg-blue-100 text-blue-700' : 
                    rabbit.gender === 'F' ? 'bg-pink-100 text-pink-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {rabbit.gender === 'M' ? '男生' : rabbit.gender === 'F' ? '女生' : '未知'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-stone-600 space-y-1">
                  <p>📍 地點：{rabbit.location}</p>
                  <p>🎂 年齡：{rabbit.age_year ? `${rabbit.age_year} 歲` : "年齡不詳"}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/rabbits/${rabbit.id}`}>查看詳情</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
