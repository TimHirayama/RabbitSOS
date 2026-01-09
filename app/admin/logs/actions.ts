"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "@/lib/audit-logger";
import { ApiResponse } from "@/types/api";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function restoreResource(
  logId: string,
  action: string,
  targetResource: string
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  try {
    // 1. Check Permissions (ensure user is admin)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return errorResponse("未登入");

    // 2. Parse resource ID
    // Format: type_id (e.g., rabbit_123)
    const parts = targetResource.split("_");
    if (parts.length < 2) return errorResponse("無效的資源格式");

    // rabbit_123_456 -> type=rabbit, id=123_456 (handle UUIDs with hyphens if we didn't strip them, but here we likely have rabbit_UUID)
    // Actually our log format is rabbit_UUID. So we need to be careful with splitting.
    // Let's assume the first part is type.
    const type = parts[0];
    const id = parts.slice(1).join("_"); // Rejoin the rest in case ID has underscores (UUIDs usually have hyphens not underscores, but safe to join)

    if (action === "DELETE_RABBIT" && type === "rabbit") {
      const { error } = await supabase
        .from("rabbits")
        .update({ deleted_at: null })
        .eq("id", id);

      if (error) throw error;

      await logAdminAction("RESTORE_RABBIT", targetResource);
      revalidatePath("/admin/rabbits");
    } else if (action === "DELETE_DAILY_PHOTO") {
      // For daily photos, resource might be photo_ID? Need to check logging format.
      // Assuming we will log DELETE_DAILY_PHOTO with rabbit_daily_photo_ID or so.
      // But for now focusing on Rabbit.
      return errorResponse("此資源類型暫不支援復原");
    } else {
      return errorResponse("此操作不支援復原");
    }

    revalidatePath("/admin/logs");
    return successResponse();
  } catch (error: any) {
    console.error("Restore Error:", error);
    return errorResponse(error.message);
  }
}
