"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { logAdminAction } from "@/lib/audit-logger";
import { ApiResponse } from "@/types/api";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function createRabbit(formData: FormData): Promise<ApiResponse<any>> {
  const supabase = await createClient();

  // Extract data
  const name = formData.get("name") as string;
  const status = formData.get("status") as string;
  const gender = formData.get("gender") as string;
  const age_year = formData.get("age_year") ? parseInt(formData.get("age_year") as string) : null;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const image_urls = formData.getAll("image_urls") as string[];

  const { data, error } = await supabase.from("rabbits").insert({
    name,
    status,
    gender,
    age_year,
    location,
    description,
    image_urls,
  }).select().single();

  if (error) {
    return errorResponse(error.message);
  }

  await logAdminAction("CREATE_RABBIT", `rabbit_${data.id}`, { name, status });

  revalidatePath("/admin/rabbits");
  return successResponse(data);
}

export async function updateRabbit(id: string, formData: FormData): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const status = formData.get("status") as string;
  const gender = formData.get("gender") as string;
  const age_year = formData.get("age_year") ? parseInt(formData.get("age_year") as string) : null;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const image_urls = formData.getAll("image_urls") as string[];

  const { error } = await supabase.from("rabbits").update({
    name,
    status,
    gender,
    age_year,
    location,
    description,
    image_urls,
  }).eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  await logAdminAction("UPDATE_RABBIT", `rabbit_${id}`, { name, status });

  revalidatePath("/admin/rabbits");
  revalidatePath(`/admin/rabbits/${id}`);
  return successResponse();
}

export async function deleteRabbit(id: string): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const { error } = await supabase.from("rabbits").delete().eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  await logAdminAction("DELETE_RABBIT", `rabbit_${id}`);

  revalidatePath("/admin/rabbits");
  return successResponse();
}
