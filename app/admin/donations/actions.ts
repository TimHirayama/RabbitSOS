"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { logAdminAction } from "@/lib/audit-logger";
import { ApiResponse } from "@/types/api";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function verifyDonation(id: string): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  // Generate Receipt No (Simple logic: YEAR-MONTH-RANDOM)
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  const receipt_no = `R${year}${month}-${random}`;

  const { error } = await supabase.from("donations").update({
    receipt_status: "verified",
    receipt_no: receipt_no,
  }).eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  await logAdminAction("VERIFY_DONATION", `donation_${id}`, { receipt_no });

  revalidatePath("/admin/donations");
  return successResponse();
}

export async function rejectDonation(id: string, note: string): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const { error } = await supabase.from("donations").update({
    receipt_status: "issue",
    admin_note: note,
  }).eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  await logAdminAction("REJECT_DONATION", `donation_${id}`, { note });

  revalidatePath("/admin/donations");
  return successResponse();
}

export async function revertDonation(id: string): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  const { error } = await supabase.from("donations").update({
    receipt_status: "pending",
    receipt_no: null,
    admin_note: null,
  }).eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  await logAdminAction("REVERT_DONATION", `donation_${id}`, {});

  revalidatePath("/admin/donations");
  return successResponse();
}
