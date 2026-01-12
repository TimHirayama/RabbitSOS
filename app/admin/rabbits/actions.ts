"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { logAdminAction } from "@/lib/audit-logger";
import { ApiResponse } from "@/types/api";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function createRabbit(
  formData: FormData
): Promise<ApiResponse<any>> {
  const supabase = await createClient();

  // Extract data
  const name = formData.get("name") as string;
  const status = formData.get("status") as string;
  const gender = formData.get("gender") as string;
  let age_year = formData.get("age_year")
    ? parseInt(formData.get("age_year") as string)
    : null;
  if (age_year !== null && isNaN(age_year)) age_year = null;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const image_urls = formData.getAll("image_urls") as string[];

  // New fields
  const short_description = formData.get("short_description") as string;
  const breed = formData.get("breed") as string;
  const age_category = formData.get("age_category") as string;
  const weight = formData.get("weight") as string;
  const litter_habits = formData.get("litter_habits") as string;
  const feed_type = formData.get("feed_type") as string;
  const introducer_name = formData.get("introducer_name") as string;
  const introducer_org = formData.get("introducer_org") as string;
  const rescue_date = (formData.get("rescue_date") as string) || null;
  const intake_date = (formData.get("intake_date") as string) || null;
  const color = formData.get("color") as string;
  const discovery_location = formData.get("discovery_location") as string;

  const { data, error } = await supabase
    .from("rabbits")
    .insert({
      name,
      status,
      gender,
      age_year,
      location,
      description,
      image_urls,
      short_description,
      breed,
      age_category,
      weight,
      litter_habits,
      feed_type,
      introducer_name,
      introducer_org,
      rescue_date,
      intake_date,
      color,
      discovery_location,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Rabbit Error:", error);
    return errorResponse(error.message);
  }

  await logAdminAction("CREATE_RABBIT", `rabbit_${data.id}`, { name, status });

  revalidatePath("/admin/rabbits");
  return successResponse(data);
}

export async function updateRabbit(
  id: string,
  formData: FormData
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const status = formData.get("status") as string;
  const gender = formData.get("gender") as string;
  let age_year = formData.get("age_year")
    ? parseInt(formData.get("age_year") as string)
    : null;
  if (age_year !== null && isNaN(age_year)) age_year = null;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const image_urls = formData.getAll("image_urls") as string[];

  // New fields
  const short_description = formData.get("short_description") as string;
  const breed = formData.get("breed") as string;
  const age_category = formData.get("age_category") as string;
  const weight = formData.get("weight") as string;
  const litter_habits = formData.get("litter_habits") as string;
  const feed_type = formData.get("feed_type") as string;
  const introducer_name = formData.get("introducer_name") as string;
  const introducer_org = formData.get("introducer_org") as string;
  const rescue_date = (formData.get("rescue_date") as string) || null;
  const intake_date = (formData.get("intake_date") as string) || null;
  const color = formData.get("color") as string;
  const discovery_location = formData.get("discovery_location") as string;

  const { error } = await supabase
    .from("rabbits")
    .update({
      name,
      status,
      gender,
      age_year,
      location,
      description,
      image_urls,
      short_description,
      breed,
      age_category,
      weight,
      litter_habits,
      feed_type,
      introducer_name,
      introducer_org,
      rescue_date,
      intake_date,
    })
    .eq("id", id);

  if (error) {
    console.error("Update Rabbit Error:", error);
    return errorResponse(error.message);
  }

  await logAdminAction("UPDATE_RABBIT", `rabbit_${id}`, { name, status });

  revalidatePath("/admin/rabbits");
  revalidatePath(`/admin/rabbits/${id}`);
  return successResponse();
}

export async function deleteRabbit(id: string): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("rabbits")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  await logAdminAction("DELETE_RABBIT", `rabbit_${id}`);

  revalidatePath("/admin/rabbits");
  return successResponse();
}
