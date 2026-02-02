"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  adoptionApplicationSchema,
  type AdoptionApplicationData,
} from "./schema";

export async function submitAdoptionApplication(data: AdoptionApplicationData) {
  const supabase = await createClient();

  // Validate data
  const result = adoptionApplicationSchema.safeParse(data);
  if (!result.success) {
    return { error: "資料驗證失敗", details: result.error.format() };
  }

  const {
    rabbitId,
    rabbitName,
    applicantName,
    email,
    phone,
    lineId,
    fbLink,
    address,
    ...otherData // Everything else goes into the JSONB 'data' column
  } = result.data;

  try {
    const { error } = await supabase.from("adoption_applications").insert({
      rabbit_id: rabbitId || null, // Might need to validate or ensure UUID format if provided
      rabbit_name: rabbitName,
      applicant_name: applicantName,
      email,
      phone,
      line_id: lineId || null,
      fb_link: fbLink || null,
      address,
      data: otherData, // Store the full questionnaire here
      status: "pending",
    });

    if (error) {
      console.error("Submission error:", error);
      return { error: "送出申請時發生錯誤，請稍後再試" };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "系統發生非預期錯誤" };
  }
}
