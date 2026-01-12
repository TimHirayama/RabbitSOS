"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { rescueApplicationSchema, type RescueApplicationData } from "./schema";

export { rescueApplicationSchema, type RescueApplicationData };

export async function submitRescueApplication(data: RescueApplicationData) {
  const supabase = await createClient();

  // Validate data
  const result = rescueApplicationSchema.safeParse(data);
  if (!result.success) {
    return { error: "資料驗證失敗", details: result.error.format() };
  }

  const {
    reporter_name,
    reporter_phone,
    reporter_email,
    reporter_id_number,
    reporter_nickname,
    rabbit_nickname,
    discovery_date,
    discovery_location,
    rabbit_gender,
    rabbit_size,
    rabbit_breed,
    rescue_reason,
    is_rescued,
    discovery_method,
    witnesses,
    capture_method,
    food_provided,
    medical_status,
    current_condition,
    photo_rabbit_1,
    photo_rabbit_2,
    photo_environment_1,
    photo_environment_2,
    photo_reporter_id,
    photo_reporter_rabbit,
    photo_accommodation_1,
    photo_accommodation_2,
  } = result.data;

  try {
    const { error } = await supabase.from("rescue_applications").insert({
      reporter_name,
      reporter_phone,
      reporter_email,
      reporter_id_number,
      reporter_nickname,

      rabbit_nickname,
      discovery_date,
      discovery_location,
      rabbit_gender,
      rabbit_size,
      rabbit_breed,
      rescue_reason,
      is_rescued: is_rescued === "true", // Convert string "true"/"false" to boolean
      discovery_method,
      witnesses,
      capture_method,
      food_provided,
      medical_status,
      current_condition,

      photo_rabbit_1,
      photo_rabbit_2,
      photo_environment_1,
      photo_environment_2,
      photo_reporter_id,
      photo_reporter_rabbit,
      photo_accommodation_1,
      photo_accommodation_2,

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
