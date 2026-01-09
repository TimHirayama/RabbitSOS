import { createClient } from "@/lib/supabase/server";
import { RabbitForm } from "../_components/rabbit-form";
import { notFound } from "next/navigation";
import { getDailyPhotos } from "../daily-photo-actions";

export default async function EditRabbitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: rabbit } = await supabase
    .from("rabbits")
    .select("*")
    .eq("id", id)
    .single();

  if (!rabbit) {
    notFound();
  }

  const dailyPhotos = await getDailyPhotos(id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">編輯資料</h2>
        <p className="text-muted-foreground">{rabbit.name}</p>
      </div>
      <RabbitForm initialData={rabbit} initialDailyPhotos={dailyPhotos} />
    </div>
  );
}
