import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Rabbit, HeartHandshake, DollarSign } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { AdminWelcomeToast } from "./_components/admin-welcome-toast";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let role = "unknown";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    role = profile?.role || "unknown";
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
      {user && <AdminWelcomeToast userId={user.id} role={role} />}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">總安置數</CardTitle>
          <Rabbit className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            +2 from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">待核銷捐款</CardTitle>
          <HeartHandshake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">
            Requires attention
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">志工總數</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-muted-foreground">
            Active verified volunteers
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
