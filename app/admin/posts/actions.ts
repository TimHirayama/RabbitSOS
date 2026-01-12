"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const cover_image = formData.get("cover_image") as string;
  const published = formData.get("published") === "true";

  const { error } = await supabase.from("posts").insert({
    title,
    category,
    content,
    cover_image,
    published,
    published_at: published ? new Date().toISOString() : null,
  });

  if (error) {
    return errorResponse(error.message);
  }

  revalidatePath("/admin/posts");
  return successResponse();
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const cover_image = formData.get("cover_image") as string;
  const published = formData.get("published") === "true";

  /* Update published_at logic:
     If we are publishing (changing from false to true), set current time.
     If we are unpublishing, maybe clear it? Or keep history? 
     Let's simplifiy: if published is true, ensure we have a date? 
     Actually, if we blindly set it to ISO, it updates every edit.
     User wanted "Link status and time".
     If I am editing a published post, I might not want to update the time.
     But if I am publishing a draft, I want to set the time.
     Since we don't have previous state here easily without lookup, and this is a simple app:
     I will check if 'published' value in formData is 'true'.
     However, standard behavior is:
     - New Post + Publish -> Time = Now
     - Edit Post + Publish (was Draft) -> Time = Now
     - Edit Post + Publish (was Published) -> Time = Keep or Now? Many CMS update time on save.
     Let's always update published_at if published is true to ensure fresh sorting.
  */

  const updateData: any = {
    title,
    category,
    content,
    cover_image,
    published,
  };

  if (published) {
    updateData.published_at = new Date().toISOString();
  } else {
    updateData.published_at = null;
  }

  const { error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);
  return successResponse();
}

export async function togglePostStatus(id: string, published: boolean) {
  const supabase = await createClient();

  const updateData: any = {
    published,
    published_at: published ? new Date().toISOString() : null,
  };

  const { error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  revalidatePath("/admin/posts");
  return successResponse();
}

export async function deletePost(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return errorResponse(error.message);
  }

  revalidatePath("/admin/posts");
  return successResponse();
}
