import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./_components/sidebar";
import { AdminMobileNav } from "./_components/mobile-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("管理後台除錯: 找不到使用者，導向登入頁面");
    redirect("/login");
  }

  console.log("管理後台除錯: 使用者 ID:", user.id);

  // Check Role
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, full_name, email, status")
    .eq("id", user.id)
    .single();

  if (profile?.status === "suspended") {
    redirect(
      "/login?error=" + encodeURIComponent("您的帳號已被停權，請聯繫管理員")
    );
  }

  console.log("管理後台除錯結果:", {
    role: profile?.role,
    error: error?.message,
    code: error?.code,
  });

  if (
    error ||
    !profile ||
    !["super_admin", "admin", "volunteer"].includes(profile.role)
  ) {
    console.log("管理後台除錯: 權限不足，導向登入頁面");
    const errorMsg = error?.message?.includes("recursion")
      ? "系統錯誤：資料庫權限設定發生無窮迴圈 (Infinite Recursion)，請執行 SQL 修正"
      : `權限不足：您的身分是 ${
          profile?.role || "無"
        }，需要 admin 或 volunteer 權限`;

    redirect("/login?error=" + encodeURIComponent(errorMsg));
  }

  // Load Feature Flags
  const { data: flagsData } = await supabase
    .from("feature_flags")
    .select("key, is_enabled");
  const featureFlags = (flagsData || []).reduce(
    (acc, curr) => ({
      ...acc,
      [curr.key]: curr.is_enabled,
    }),
    {} as Record<string, boolean>
  );

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AdminSidebar profile={profile} featureFlags={featureFlags} />
      <div className="flex flex-col lg:pl-64 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <AdminMobileNav profile={profile} featureFlags={featureFlags} />
          <span className="font-semibold">RabbitSOS Admin</span>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 lg:gap-8 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
