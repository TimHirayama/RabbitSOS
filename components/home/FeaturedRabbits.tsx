import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rabbit, Mars, Venus, HelpCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function FeaturedRabbits() {
  const supabase = await createClient();

  // Fetch only 'open' status rabbits, limit 6
  const { data: rabbits } = await supabase
    .from("rabbits")
    .select(
      "id, name, gender, age_year, location, image_urls, weight, breed, age_category, description"
    )
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(6);

  if (!rabbits || rabbits.length === 0) {
    // ... existing empty state ...
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-noto-sans-tc text-stone-800">
            精選待認養兔兔
          </h2>
          <p className="text-muted-foreground">目前暫無待認養的兔兔。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        {/* ... existing header ... */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold font-noto-sans-tc text-stone-800 mb-2">
              精選待認養兔兔
            </h2>
            <p className="text-stone-600">
              這些孩子正在尋找一個永遠的家，您願意成為他們的家人嗎？
            </p>
          </div>
          <Button
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
            asChild
          >
            <Link href="/rabbits">查看全部兔兔</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {rabbits.map((rabbit) => (
            <Card
              key={rabbit.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none rounded-2xl bg-white flex flex-col"
            >
              <div className="aspect-[4/3] w-full relative bg-stone-100 overflow-hidden">
                {/* ... existing image ... */}
                {rabbit.image_urls && rabbit.image_urls[0] ? (
                  <img
                    src={rabbit.image_urls[0]}
                    alt={rabbit.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-orange-200 bg-orange-50">
                    <Rabbit className="w-16 h-16" />
                  </div>
                )}
              </div>

              <CardContent className="p-4 flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-stone-800 mb-2">
                    {rabbit.name}
                  </h3>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-2 text-xs md:text-sm text-stone-600 font-medium mb-3 flex-wrap">
                    <span>
                      {rabbit.gender === "M" ? (
                        <Mars className="w-4 h-4 text-blue-500" />
                      ) : rabbit.gender === "F" ? (
                        <Venus className="w-4 h-4 text-rose-500" />
                      ) : (
                        <HelpCircle className="w-4 h-4 text-stone-400" />
                      )}
                    </span>
                    <span className="text-stone-300">|</span>
                    <span>{rabbit.weight ? `${rabbit.weight}公斤` : "-"}</span>
                    <span className="text-stone-300">|</span>
                    <span>{rabbit.breed || "米克斯"}</span>
                    <span className="text-stone-300">|</span>
                    <span>{rabbit.age_category || "成兔"}</span>
                  </div>

                  {/* Description */}
                  <div className="text-xs md:text-sm text-stone-500 line-clamp-2 leading-relaxed h-[2.5em] md:h-[3em]">
                    {rabbit.description}
                  </div>
                </div>

                <div className="mt-auto">
                  {/* Spacer to push button down if needed, but flex-grow on CardContent handles it */}
                </div>

                <Button
                  className="w-full bg-stone-800 hover:bg-orange-500 hover:text-white transition-colors rounded-xl h-9 md:h-12 text-sm md:text-base"
                  asChild
                >
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
