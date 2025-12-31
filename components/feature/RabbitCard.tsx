import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Mars, Venus } from "lucide-react";
import type { Database } from "@/types/supabase";

type Rabbit = Database["public"]["Tables"]["rabbits"]["Row"];

interface RabbitCardProps {
  rabbit: Rabbit;
}

export function RabbitCard({ rabbit }: RabbitCardProps) {
  const coverImage = rabbit.image_urls?.[0] || "https://images.unsplash.com/photo-1585110396067-c1d6389710cc?q=80&w=600&auto=format&fit=crop"; 
  // Placeholder fallback

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm group">
      <div className="aspect-square bg-stone-200 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage}
          alt={rabbit.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          {rabbit.status === "open" && <Badge className="bg-green-500 hover:bg-green-600">開放認養</Badge>}
          {rabbit.status === "reserved" && <Badge className="bg-amber-500 hover:bg-amber-600">已預訂</Badge>}
          {rabbit.status === "medical" && <Badge variant="destructive">醫療中</Badge>}
          {rabbit.status === "closed" && <Badge variant="secondary">已結案</Badge>}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-slate-900">{rabbit.name}</h3>
          <div className="flex items-center space-x-1">
             {rabbit.gender === "M" ? <Mars className="w-4 h-4 text-blue-500" /> : 
              rabbit.gender === "F" ? <Venus className="w-4 h-4 text-pink-500" /> : null}
          </div>
        </div>
        
        <div className="space-y-1 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
             <Calendar className="w-3.5 h-3.5 mr-2" />
             <span>{rabbit.age_year ? `${rabbit.age_year} 歲` : "年齡不詳"}</span>
          </div>
          <div className="flex items-center">
             <MapPin className="w-3.5 h-3.5 mr-2" />
             <span>{rabbit.location || "未知地點"}</span>
          </div>
        </div>

        <Button size="sm" className="w-full rounded-full" variant="secondary" asChild>
          <Link href={`/rabbits/${rabbit.id}`}>詳細介紹</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
