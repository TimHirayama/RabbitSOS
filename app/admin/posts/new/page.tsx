import { PostForm } from "../_components/post-form";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">新增公告</h2>
        <p className="text-muted-foreground">
          撰寫新的公告或文章
        </p>
      </div>
      <PostForm />
    </div>
  );
}
