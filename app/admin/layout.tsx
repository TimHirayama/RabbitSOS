import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./_components/sidebar";

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
    .select("role")
    .eq("id", user.id)
    .single();

  console.log("管理後台除錯結果:", {
    role: profile?.role,
    error: error?.message,
    code: error?.code
  });

  if (error || !profile || (profile.role !== "admin" && profile.role !== "volunteer")) {
    console.log("管理後台除錯: 權限不足，導向登入頁面");
    const errorMsg = error?.message?.includes("recursion") 
      ? "系統錯誤：資料庫權限設定發生無窮迴圈 (Infinite Recursion)，請執行 SQL 修正"
      : `權限不足：您的身分是 ${profile?.role || "無"}，需要 admin 或 volunteer 權限`;
    
    redirect("/login?error=" + encodeURIComponent(errorMsg)); 
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AdminSidebar role={profile.role} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 lg:pl-64 w-full">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
