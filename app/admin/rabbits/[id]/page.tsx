import { createClient } from "@/lib/supabase/server";
import { RabbitForm } from "../_components/rabbit-form";
import { notFound } from "next/navigation";

export default async function EditRabbitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Next.js 15+ params are promises? Actually in 14 it's just params. But user is using Next 16 from pkg.json.
  // Wait, package.json said "next": "16.1.1".
  // In Next.js 15+, params is async.
  
  const supabase = await createClient();
  const { data: rabbit } = await supabase
    .from("rabbits")
    .select("*")
    .eq("id", id)
    .single();

  if (!rabbit) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">編輯資料</h2>
        <p className="text-muted-foreground">
          {rabbit.name}
        </p>
      </div>
      <RabbitForm initialData={rabbit} />
    </div>
  );
}
