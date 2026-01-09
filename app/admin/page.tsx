import { createClient } from "@/lib/supabase/server";
import { AdminWelcomeToast } from "./_components/admin-welcome-toast";
import { AdminProfileCard } from "./_components/admin-profile-card";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role = "unknown";
  let profile = null;

  if (user) {
    const { data: fetchedProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = fetchedProfile;
    role = profile?.role || "unknown";
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
      {user && <AdminWelcomeToast userId={user.id} role={role} />}

      {/* Profile Card - Spans 4 cols */}
      {profile && <AdminProfileCard profile={profile} />}

      {/* 
         Future Dashboard Widgets can go here. 
         Currently removed as per user request. 
      */}
    </div>
  );
}
