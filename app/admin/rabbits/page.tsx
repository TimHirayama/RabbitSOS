import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DeleteRabbitButton } from "./_components/delete-button"; // We'll create this

export default async function AdminRabbitsPage() {
  const supabase = await createClient();
  const { data: rabbits } = await supabase
    .from("rabbits")
    .select("*")
    .order("created_at", { ascending: false });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "default"; // Black/Primary
      case "reserved": return "secondary"; // Gray
      case "medical": return "destructive"; // Red
      case "closed": return "outline"; // Outline
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">兔子管理</h2>
          <p className="text-muted-foreground">
            新增、編輯或管理待認養兔子的資料
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/rabbits/new">
            <Plus className="mr-2 h-4 w-4" />
            新增兔子
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名稱</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>性別</TableHead>
              <TableHead>所在地</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rabbits?.map((rabbit) => (
              <TableRow key={rabbit.id}>
                <TableCell className="font-medium flex items-center gap-3">
                  {rabbit.image_urls?.[0] && (
                    <img 
                      src={rabbit.image_urls[0]} 
                      alt={rabbit.name} 
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                  )}
                  {rabbit.name}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(rabbit.status) as any}>
                    {rabbit.status}
                  </Badge>
                </TableCell>
                <TableCell>{rabbit.gender === 'M' ? '公' : '母'}</TableCell>
                <TableCell>{rabbit.location}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/rabbits/${rabbit.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteRabbitButton id={rabbit.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
             {!rabbits?.length && (
               <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                     尚無資料
                  </TableCell>
               </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
