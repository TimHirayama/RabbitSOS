import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FeatureToggleItem } from "./_components/feature-toggle";

export default async function AdminFeaturesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Check Role (Super Admin Only)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (profile?.role !== "super_admin") {
    return <div className="p-4">權限不足 (需要超級管理員權限)</div>;
  }

  // 2. Fetch Features
  const { data: features } = await supabase
    .from("feature_flags")
    .select("*")
    .order("key");

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">系統功能模組控制</h2>
        <p className="text-muted-foreground">
          啟用或關閉系統特定功能模組。關閉的模組將對管理員與志工隱藏。
        </p>
      </div>

      <div className="grid gap-4">
        {features?.map((feature) => (
          <FeatureToggleItem
            key={feature.key}
            featureKey={feature.key}
            label={feature.label}
            description={feature.description}
            isEnabled={feature.is_enabled}
          />
        ))}
      </div>
    </div>
  );
}
