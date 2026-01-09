import { createAdminClient } from "@/lib/supabase/admin";
import { CreateVolunteerDialog } from "./_components/create-volunteer-dialog";
import { EditUserSheet } from "./_components/edit-user-sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Double check admin role here or rely on layout
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  // Check permission (Allow super_admin and admin)
  if (profile?.role !== "super_admin" && profile?.role !== "admin") {
    return <div className="p-4">權限不足 (Access Denied)</div>;
  }

  // Check Feature Flag
  if (profile?.role !== "super_admin") {
    const { data: flag } = await supabase
      .from("feature_flags")
      .select("is_enabled")
      .eq("key", "module_volunteers")
      .single();
    if (!flag?.is_enabled) {
      return <div className="p-4">此功能模組未啟用 (Module Disabled)</div>;
    }
  }

  // List users
  const adminClient = createAdminClient();
  let query = adminClient
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (profile?.role !== "super_admin") {
    query = query.neq("role", "super_admin");
  }

  const { data: profiles, error } = await query;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">人員管理</h2>
          <p className="text-muted-foreground">
            管理系統使用者、權限與詳細資料
          </p>
        </div>
        <CreateVolunteerDialog currentUserRole={profile?.role} />
      </div>

      <Card className="border-none shadow-sm bg-white/60 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-transparent hover:bg-transparent">
            <TableRow className="hover:bg-transparent border-gray-100">
              <TableHead className="w-[250px] pl-6 text-gray-500 font-medium">
                姓名 / 角色
              </TableHead>
              <TableHead className="text-gray-500 font-medium">Email</TableHead>
              <TableHead className="text-gray-500 font-medium">
                權限等級
              </TableHead>
              <TableHead className="text-gray-500 font-medium">電話</TableHead>
              <TableHead className="text-gray-500 font-medium">
                加入時間
              </TableHead>
              <TableHead className="w-[50px] pr-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles?.map((p: any) => (
              <TableRow
                key={p.id}
                className={`group hover:bg-gray-50/50 border-gray-100 transition-colors ${
                  p.status === "suspended" ? "bg-red-50/30 opacity-75" : ""
                }`}
              >
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg text-white shrink-0 overflow-hidden shadow-sm border border-white/20 ring-1 ring-black/5"
                      style={{
                        backgroundColor: p.avatar_url
                          ? "transparent"
                          : p.avatar_color || "#f4f4f5",
                        color: p.avatar_color ? "#ffffff" : "#71717a",
                      }}
                    >
                      {p.avatar_url ? (
                        <img
                          src={p.avatar_url}
                          alt={p.full_name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        p.full_name?.[0] || p.email?.[0]?.toUpperCase()
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {p.full_name || "-"}
                      </span>
                      {p.role_title && (
                        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full w-fit">
                          {p.role_title}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{p.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      p.role === "super_admin"
                        ? "default"
                        : p.role === "admin"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      p.role === "super_admin"
                        ? "bg-purple-600 hover:bg-purple-700 shadow-sm border-transparent"
                        : p.role === "admin"
                        ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                        : "text-zinc-500 border-zinc-200 bg-white"
                    }
                  >
                    {p.role === "super_admin"
                      ? "超級管理員"
                      : p.role === "admin"
                      ? "管理員"
                      : "志工"}
                  </Badge>
                  {p.status === "suspended" && (
                    <Badge variant="destructive" className="ml-2 shadow-sm">
                      已停權
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-gray-600 font-mono">
                  {p.phone || "-"}
                </TableCell>
                <TableCell className="text-gray-400 text-xs">
                  {new Date(p.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="pr-6">
                  <EditUserSheet
                    user={p}
                    currentUserRole={profile?.role}
                    currentUserId={user?.id}
                  />
                </TableCell>
              </TableRow>
            ))}
            {!profiles?.length && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-gray-400"
                >
                  無資料
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
