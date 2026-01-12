"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ApiResponse } from "@/types/api";

export async function submitFosterApplication(
  currentState: any,
  formData: FormData
): Promise<ApiResponse<null>> {
  const supabase = await createClient();

  try {
    const rawData = {
      applicant_name: formData.get("applicant_name") as string,
      occupation: formData.get("occupation") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      current_pets: formData.get("current_pets") as string,
      experience: formData.get("experience") as string,
      supplies: formData.get("supplies") as string,
      housing_environment: formData.get("housing_environment") as string,
      agreement_rules: formData.get("agreement") === "on",
    };

    // 1. Basic Validation
    if (
      !rawData.applicant_name ||
      !rawData.phone ||
      !rawData.address ||
      !rawData.experience ||
      !rawData.housing_environment
    ) {
      return { success: false, error: "請填寫所有必填欄位" };
    }

    if (!rawData.agreement_rules) {
      return { success: false, error: "請詳閱並同意中途守則" };
    }

    // 2. Handle File Uploads
    const photos = formData.getAll("photos") as File[];
    const uploadedUrls: string[] = [];

    if (!photos || photos.length === 0 || photos[0].size === 0) {
      return { success: false, error: "請上傳至少一張環境照片" };
    }

    for (const file of photos) {
      if (file.size > 0 && uploadedUrls.length < 3) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `applications/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("foster-evidence")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          // Continue if one fails, or fail hard? Let's verify if bucket exists
          // Ideally we should create bucket if not exists, but RLS prevents dynamic bucket creation usually
        } else {
          // Get Public URL
          const {
            data: { publicUrl },
          } = supabase.storage.from("foster-evidence").getPublicUrl(filePath);
          uploadedUrls.push(publicUrl);
        }
      }
    }

    // 3. Insert into Database
    const { error: dbError } = await supabase
      .from("foster_applications")
      .insert({
        ...rawData,
        photo_1: uploadedUrls[0] || null,
        photo_2: uploadedUrls[1] || null,
        photo_3: uploadedUrls[2] || null,
        status: "pending",
      });

    if (dbError) {
      console.error("DB Error:", dbError);
      return { success: false, error: "資料庫儲存失敗，請稍後再試" };
    }

    // 4. Success
    return { success: true, message: "申請已送出" };
  } catch (err) {
    console.error("Error submitting foster application:", err);
    return { success: false, error: "系統發生錯誤，請稍後再試" };
  }
}
