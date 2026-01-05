"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const searchSchema = z.object({
  donor_name: z.string().min(1, "請輸入捐款人姓名"),
  verify_type: z.enum(["digits", "date"]),
  verify_value: z.string().min(1, "請輸入驗證資料"),
});

export type SearchResult = {
  id: string;
  donor_name: string;
  amount: number;
  transfer_date: string;
  status: string;
  created_at: string;
};

export type SearchState = {
  error?: string | null;
  success?: boolean;
  data?: SearchResult[];
};

export async function searchDonation(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  try {
    const supabase = await createClient();
    
    // Auto-trim inputs to avoid whitespace issues
    const rawData = {
      donor_name: formData.get("donor_name")?.toString().trim() || "",
      verify_type: formData.get("verify_type"),
      verify_value: formData.get("verify_value")?.toString().trim() || "",
    };

    const validated = searchSchema.safeParse(rawData);

    if (!validated.success) {
      return { error: validated.error.issues[0].message };
    }

    const { donor_name, verify_type, verify_value } = validated.data;

    let query = supabase
      .from("donations")
      .select("id, donor_name, amount, transfer_date, status, created_at")
      // Use fuzzy matching for name (case insensitive, full match trimmed)
      .ilike("donor_name", donor_name);

    if (verify_type === "digits") {
      query = query.eq("last_5_digits", verify_value);
    } else {
      // verify_value should be yyyy-MM-dd
      query = query.eq("transfer_date", verify_value);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Search Error:", error);
      return { error: "查詢發生錯誤，請稍後再試" };
    }

    if (!data || data.length === 0) {
      return { error: "查無符合資料，請確認輸入資訊是否正確" };
    }

    return { success: true, data: data as SearchResult[], error: null };
  } catch (e) {
    console.error("System Error:", e);
    return { error: "系統發生錯誤，請稍後再試" };
  }
}
