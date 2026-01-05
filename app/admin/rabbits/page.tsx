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
import { DeleteRabbitButton } from "./_components/delete-button";
import { AdminSearchFilters } from "@/components/admin/AdminSearchFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Move statusMap outside or to top
const statusMap: Record<string, string> = {
  'open': '開放認養',
  'reserved': '已預訂',
  'medical': '醫療中',
  'closed': '已結案'
};

const reverseStatusMap: Record<string, string> = {
  '開放認養': 'open',
  '已預訂': 'reserved',
  '醫療中': 'medical',
  '已結案': 'closed'
};

export default async function AdminRabbitsPage(props: {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
}) {
  const params = await props.searchParams;
  const supabase = await createClient();
  
  let query = supabase
    .from("rabbits")
    .select("*")
    .order("created_at", { ascending: false });



  // Apply Smart Search
  const q = params.q;
  if (q) {
    let orConditions = [`name.ilike.%${q}%,location.ilike.%${q}%`];
    
    // Check if q matches a status (Chinese or English)
    const mappedStatus = reverseStatusMap[q] || (statusMap[q] ? q : null);
    if (mappedStatus) {
       orConditions.push(`status.eq.${mappedStatus}`);
    }
    
    query = query.or(orConditions.join(','));
  }

  const { data: rabbits } = await query;

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

      <AdminSearchFilters 
         placeholder="搜尋兔子名稱、地點或狀態..." 
      />

      {/* Desktop View */}
      <div className="rounded-md border hidden md:block">
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
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {rabbit.image_urls?.[0] && (
                      <img 
                        src={rabbit.image_urls[0]} 
                        alt={rabbit.name} 
                        className="h-10 w-10 rounded-full object-cover border"
                      />
                    )}
                    {rabbit.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(rabbit.status) as any}>
                    {statusMap[rabbit.status] || rabbit.status}
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

      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
          {rabbits?.map((rabbit) => (
            <Card key={rabbit.id}>
               <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-3">
                        {rabbit.image_urls?.[0] ? (
                          <img 
                            src={rabbit.image_urls[0]} 
                            alt={rabbit.name} 
                            className="h-12 w-12 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                             🐰
                          </div>
                        )}
                        <div>
                           <CardTitle className="text-base">{rabbit.name}</CardTitle>
                           <div className="text-sm text-muted-foreground">{rabbit.location}</div>
                        </div>
                     </div>
                     <Badge variant={getStatusColor(rabbit.status) as any}>
                        {statusMap[rabbit.status] || rabbit.status}
                     </Badge>
                  </div>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm bg-slate-50 p-3 rounded">
                     <div className="flex flex-col">
                        <span className="text-muted-foreground text-xs">性別</span>
                        <span className="font-medium">{rabbit.gender === 'M' ? '男生' : '女生'}</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-muted-foreground text-xs">年齡</span>
                        <span className="font-medium">{rabbit.age ? `${rabbit.age} 歲` : '-'}</span>
                     </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2 border-t">
                     <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/admin/rabbits/${rabbit.id}`}>
                           <Pencil className="mr-2 h-4 w-4" />
                           編輯
                        </Link>
                     </Button>
                     <div className="flex-1">
                        <DeleteRabbitButton id={rabbit.id} />
                     </div>
                  </div>
               </CardContent>
            </Card>
          ))}
          {!rabbits?.length && (
            <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                尚無資料
            </div>
          )}
      </div>
    </div>
  );
}
