import { createAdminClient } from "@/lib/supabase/admin";
import { CreateVolunteerDialog } from "./_components/create-volunteer-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Double check admin role here or rely on layout
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();
  
  if (profile?.role !== 'admin') {
     return <div className="p-4">權限不足 (Access Denied)</div>;
  }

  // Use Admin Client to list actual users if needed, or just list profiles
  // Listing profiles is safer and easier.
  const adminClient = createAdminClient();
  const { data: profiles, error } = await adminClient
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">人員管理</h2>
          <p className="text-muted-foreground">
            管理系統使用者與權限 (僅 Admin 可見)
          </p>
        </div>
        <CreateVolunteerDialog />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>身份</TableHead>
              <TableHead>加入時間</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles?.map((profile: any) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">
                  {profile.full_name || "-"}
                </TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>
                  <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                    {profile.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(profile.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
            {!profiles?.length && (
               <TableRow>
                  <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                     無資料
                  </TableCell>
               </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
