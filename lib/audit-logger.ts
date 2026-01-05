import { createClient } from "@/lib/supabase/server";

export async function logAdminAction(
  action: string,
  target_resource: string,
  details: any = {}
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.warn("Attempted to log admin action without user session:", action);
      return;
    }

    const { error } = await supabase.from("audit_logs").insert({
      user_id: user.id,
      action,
      target_resource,
      details,
    });

    if (error) {
       console.error("Failed to insert audit log:", error);
    }
  } catch (error) {
    console.error("Error logging admin action:", error);
  }
}
