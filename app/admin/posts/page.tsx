import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PostsTable } from "./_components/posts-table";
import { PostsTableToolbar } from "./_components/posts-table-toolbar";

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const pageSize = 15;
  const category = (params.category as string) || "all";
  const status = (params.status as string) || "all";
  const sort = (params.sort as string) || "newest"; // newest | oldest
  const search = (params.q as string) || "";

  let query = supabase.from("posts").select("*", { count: "exact" });

  // Apply filters
  if (category !== "all") {
    query = query.eq("category", category);
  }

  if (status !== "all") {
    query = query.eq("published", status === "published");
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  // Apply sorting
  if (sort === "oldest") {
    query = query.order("published_at", { ascending: true });
  } else {
    query = query.order("published_at", { ascending: false });
  }

  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data: posts, count } = await query;
  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">公告管理</h2>
          <p className="text-muted-foreground">
            管理網站上的各類公告、救援資訊與活動消息
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            新增公告
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <PostsTableToolbar totalCount={count || 0} />
        <PostsTable
          posts={posts || []}
          totalPages={totalPages}
          currentPage={page}
        />
      </div>
    </div>
  );
}
