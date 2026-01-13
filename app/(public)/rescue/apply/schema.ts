import { z } from "zod";

// Define the schema for the rescue application
export const rescueApplicationSchema = z.object({
  // Reporter Info
  reporter_name: z.string({ message: "請輸入姓名" }).min(2, "請輸入姓名"),
  reporter_phone: z
    .string({ message: "請輸入手機號碼" })
    .min(8, "請輸入有效的電話號碼"),
  reporter_email: z
    .string({ message: "請輸入電子信箱" })
    .email("請輸入有效的 Email"),
  reporter_id_number: z
    .string({ message: "請輸入身分證字號" })
    .min(5, "請輸入身分證字號"), // Basic check
  reporter_nickname: z.string().optional(),

  // Rescue Info
  rabbit_nickname: z.string().optional(),
  discovery_date: z
    .string({ message: "請選擇發現日期" })
    .min(1, "請選擇發現日期"),
  discovery_location: z
    .string({ message: "請輸入發現地點" })
    .min(2, "請輸入發現地點"),
  rabbit_gender: z.string().optional(),
  rabbit_size: z.string().optional(),
  rabbit_breed: z.string().optional(),
  rescue_reason: z
    .string({ message: "請輸入救援原因" })
    .min(2, "請輸入救援原因"),
  is_rescued: z.string().optional(), // "true" / "false" as string from form
  discovery_method: z.string().optional(),
  witnesses: z.string().optional(),
  capture_method: z.string().optional(),
  food_provided: z.string().optional(),
  medical_status: z.string().optional(),
  current_condition: z.string().optional(),

  // Evidence (Image URLs) - Validated as non-empty for required photos
  photo_rabbit_1: z
    .string({ message: "請上傳兔子照片 1" })
    .min(1, "請上傳兔子照片 1"),
  photo_rabbit_2: z
    .string({ message: "請上傳兔子照片 2" })
    .min(1, "請上傳兔子照片 2"),
  photo_environment_1: z
    .string({ message: "請上傳發現環境照片 1" })
    .min(1, "請上傳發現環境照片 1"),
  photo_environment_2: z
    .string({ message: "請上傳發現環境照片 2" })
    .min(1, "請上傳發現環境照片 2"),
  photo_reporter_id: z
    .string({ message: "請上傳身分證合照" })
    .min(1, "請上傳身分證合照"),
  photo_reporter_rabbit: z
    .string({ message: "請上傳與兔子合照" })
    .min(1, "請上傳與兔子合照"),
  photo_accommodation_1: z.string().optional(),
  photo_accommodation_2: z.string().optional(),
});

export type RescueApplicationData = z.infer<typeof rescueApplicationSchema>;
