import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../_components/post-form";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">編輯公告</h2>
        <p className="text-muted-foreground">
          {post.title}
        </p>
      </div>
      <PostForm initialData={post} />
    </div>
  );
}
