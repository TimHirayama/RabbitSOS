import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Mars, Venus, Rabbit } from "lucide-react";
import type { Database } from "@/types/supabase";

type Rabbit = Database["public"]["Tables"]["rabbits"]["Row"];

interface RabbitCardProps {
  rabbit: Rabbit;
}

export function RabbitCard({ rabbit }: RabbitCardProps) {
  // const coverImage = rabbit.image_urls?.[0]; // Removed unused variable if not needed, or keep for logic

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm group">
      <div className="aspect-square bg-stone-200 relative overflow-hidden">
        {rabbit.image_urls?.[0] ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={rabbit.image_urls[0]}
            alt={rabbit.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-200">
            <Rabbit className="w-20 h-20" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          {rabbit.status === "open" && (
            <Badge className="bg-green-500 hover:bg-green-600">開放認養</Badge>
          )}
          {rabbit.status === "reserved" && (
            <Badge className="bg-amber-500 hover:bg-amber-600">已預訂</Badge>
          )}
          {rabbit.status === "medical" && (
            <Badge variant="destructive">醫療中</Badge>
          )}
          {rabbit.status === "closed" && (
            <Badge variant="secondary">已結案</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 leading-tight">
              {rabbit.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {rabbit.breed || "米克斯"}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-full">
            {rabbit.gender === "M" ? (
              <Mars className="w-4 h-4 text-blue-500" />
            ) : rabbit.gender === "F" ? (
              <Venus className="w-4 h-4 text-pink-500" />
            ) : (
              <span className="text-xs">?</span>
            )}
            <span className="text-xs font-medium text-stone-600">
              {rabbit.weight ? `${rabbit.weight}kg` : "--"}
            </span>
          </div>
        </div>

        <div className="space-y-1 mb-4 text-sm text-muted-foreground border-t pt-2 mt-2 border-dashed">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-2 opacity-70" />
              <span>{rabbit.age_category || "成兔"}</span>
            </div>

            <div className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-2 opacity-70" />
              <span className="max-w-[100px] truncate">
                {rabbit.location || "未知地點"}
              </span>
            </div>
          </div>
        </div>

        <Button
          size="sm"
          className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
          asChild
        >
          <Link href={`/rabbits/${rabbit.id}`}>詳細介紹</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
