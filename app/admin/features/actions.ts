"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "@/lib/audit-logger";
import { ApiResponse } from "@/types/api";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function toggleFeatureFlag(
  key: string,
  isEnabled: boolean
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return errorResponse("未登入");

    // Check if super_admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role !== "super_admin") {
      return errorResponse("權限不足：僅超級管理員可執行此操作");
    }

    const { error } = await supabase
      .from("feature_flags")
      .update({
        is_enabled: isEnabled,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })
      .eq("key", key);

    if (error) throw error;

    await logAdminAction("UPDATE_SETTING", "system_feature", {
      key,
      isEnabled,
    });

    revalidatePath("/admin/features");
    revalidatePath("/admin", "layout"); // Revalidate layout to update Sidebar
    return successResponse();
  } catch (error: any) {
    console.error("Toggle Feature Error:", error);
    return errorResponse(error.message);
  }
}
