"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "@/lib/audit-logger";
import { createAdminClient } from "@/lib/supabase/admin";
import { ApiResponse } from "@/types/api";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function updateUserProfile(
  userId: string,
  formData: FormData
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return errorResponse("未登入");

    console.log("Debug UpdateUser [Start]:", { userId, actorId: user.id });

    // Check permissions
    const { data: currentUserProfile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const currentUserRole = currentUserProfile?.role || "volunteer";
    const isSelfUpdate = user.id === userId;
    const isAdmin = ["super_admin", "admin"].includes(currentUserRole);

    if (!isSelfUpdate && !isAdmin) {
      return errorResponse("權限不足：僅管理員可編輯他人資料");
    }

    // Target User Role Check & Hierarchy
    let targetUserRole = "volunteer";
    if (!isSelfUpdate) {
      const { data: targetProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
      targetUserRole = targetProfile?.role || "volunteer";

      // Hierarchy Enforcement
      if (currentUserRole === "admin") {
        if (["admin", "super_admin"].includes(targetUserRole)) {
          return errorResponse("權限不足：無法編輯同級或更高級別人員");
        }
      }
    }

    const updates: any = {
      full_name: formData.get("full_name") as string,
      role_title: formData.get("role_title") as string | null,
      phone: formData.get("phone") as string | null,
      national_id: formData.get("national_id") as string | null,
      address: formData.get("address") as string | null,
      note: formData.get("note") as string | null,
    };

    // Role & Status Management
    const newRole = formData.get("role") as string;
    const newStatus = formData.get("status") as string;

    console.log("Debug UpdateUser [Params]:", {
      currentUserRole,
      isSelfUpdate,
      newRole,
      newStatus,
      targetUserRole,
    });

    if (!isSelfUpdate) {
      if (currentUserRole === "super_admin") {
        // Super Admin can change Role and Status
        if (newRole) updates.role = newRole;
        if (newStatus) updates.status = newStatus;
      } else if (currentUserRole === "admin") {
        // Admin can suspend/restore Volunteer
        if (newStatus) updates.status = newStatus;
      }
    }

    console.log("Debug UpdateUser [FinalUpdates]:", updates);

    // Avatar Logic
    const avatarMode = formData.get("avatar_mode") as string;
    if (avatarMode === "color") {
      updates.avatar_color = formData.get("avatar_color") as string;
      updates.avatar_url = null;
    } else if (avatarMode === "image") {
      const file = formData.get("avatar_file") as File;
      if (file && file.size > 0) {
        // Upload File
        const fileExt = file.name.split(".").pop();
        const fileName = `avatars/${userId}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(fileName);

        updates.avatar_url = publicUrl;
        updates.avatar_color = null;
      } else {
        // No new file uploaded, keep existing or clear if previously color?
        // If user switched from Color to Image but didn't upload file?
        // The UI shows Preview. If preview is null, then maybe clear?
        // But usually we assume if mode=image and no file, user wants to keep existing image if any.
        // If they had color and switched to image without file, what should happen?
        // UI shows Upload Icon.
        // Let's assume they must upload if switching.
        // But if they already had image, they might just stay on image tab.
        // We only update if file provided. If switching from Color to Image without File, we strictly speaking don't have an image.
        // But for now, we just update nothing if no file, except maybe clearing color?
        // If I clear color, and no URL, it falls back to Initials. That's fine.
        updates.avatar_color = null;
      }
    }

    const adminClient = createAdminClient();
    const { error, count } = await adminClient
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select();

    if (error) throw error;
    // Note: count might be null if select() not used properly or implicit.
    // But error would be thrown if logic failed.
    // If count (from RLS filtering) was issue, adminClient solves it.

    await logAdminAction("UPDATE_USER", "user", { userId, updates });

    revalidatePath("/admin/users");
    return successResponse();
  } catch (error: any) {
    console.error("Update User Error:", error);
    return errorResponse(error.message);
  }
}
