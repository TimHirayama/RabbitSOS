"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVolunteer(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string; // Changed to match UserForm
  const role = (formData.get("role") as string) || "volunteer";

  // Additional Fields
  const roleTitle = formData.get("role_title") as string | null;
  const phone = formData.get("phone") as string | null;
  const nationalId = formData.get("national_id") as string | null;
  const address = formData.get("address") as string | null;
  const note = formData.get("note") as string | null;

  const supabase = createAdminClient();

  // 1. Create Auth User
  const { data: userData, error: userError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

  if (userError) {
    console.error("Error creating user:", userError);
    return { error: userError.message };
  }

  if (!userData.user) {
    return { error: "Failed to create user" };
  }

  // 2. Update Profile with all details
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      role: role as any,
      full_name: fullName,
      role_title: roleTitle,
      phone: phone,
      national_id: nationalId,
      address: address,
      note: note,
    })
    .eq("id", userData.user.id);

  if (profileError) {
    console.error("Error updating profile:", profileError);
    // Don't fail the whole request as user is created, but maybe return warning?
    // For now, return error.
    return { error: "User created but failed to set profile details" };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(userId: string) {
  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}
