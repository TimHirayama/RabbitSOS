"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ApiResponse } from "@/types/api";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function uploadDailyPhoto(
  formData: FormData
): Promise<ApiResponse<any>> {
  const supabase = await createClient();

  const rabbitId = formData.get("rabbitId") as string;
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;

  if (!rabbitId || !file) {
    return errorResponse("缺少必要參數");
  }

  try {
    // 1. Upload to Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `daily_${rabbitId}_${Date.now()}.${fileExt}`;
    const filePath = `daily/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath);

    // 2. Insert into DB
    const { data, error } = await supabase
      .from("rabbit_daily_photos")
      .insert({
        rabbit_id: rabbitId,
        image_url: publicUrl,
        description,
        sort_order: 0, // Default to top? or bottom? We can adjust later.
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath(`/admin/rabbits/${rabbitId}`);
    revalidatePath(`/rabbits/${rabbitId}`);

    return successResponse(data);
  } catch (error: any) {
    console.error("Upload Daily Photo Error:", error);
    return errorResponse(error.message);
  }
}

export async function deleteDailyPhoto(
  id: string,
  rabbitId: string
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  try {
    // 1. Get photo to find file path (optional, if we want to delete from storage)
    // For now, just delete from DB. Storage cleanup can be a cron job or done here.

    const { error } = await supabase
      .from("rabbit_daily_photos")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;

    revalidatePath(`/admin/rabbits/${rabbitId}`);
    revalidatePath(`/rabbits/${rabbitId}`);
    return successResponse();
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function updateDailyPhotoOrder(
  rabbitId: string,
  items: { id: string; sort_order: number }[]
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  try {
    // Upsert or update multiple? Supabase doesn't have easy bulk update for different values.
    // We can loop or use a stored procedure. For < 50 items, loop is fine locally.
    // Or use `upsert` if we include all required fields? No, upsert needs all non-nulls.
    // Let's loop for now, it's admin action.

    for (const item of items) {
      await supabase
        .from("rabbit_daily_photos")
        .update({ sort_order: item.sort_order })
        .eq("id", item.id);
    }

    revalidatePath(`/admin/rabbits/${rabbitId}`);
    revalidatePath(`/rabbits/${rabbitId}`);
    return successResponse();
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function updateDailyPhotoDescription(
  id: string,
  description: string
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("rabbit_daily_photos")
      .update({ description })
      .eq("id", id);

    if (error) throw error;

    return successResponse();
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getDailyPhotos(rabbitId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("rabbit_daily_photos")
    .select("*")
    .eq("rabbit_id", rabbitId)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return data || [];
}
