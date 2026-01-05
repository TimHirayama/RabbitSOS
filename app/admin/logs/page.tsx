import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminLogsPage() {
  const supabase = await createClient();
  
  const { data: logs } = await supabase
    .from("audit_logs")
    .select(`
      *,
      profiles:user_id (
        full_name,
        email,
        role
      )
    `)
    .order("created_at", { ascending: false });

  // Helper to format action string
  const formatAction = (action: string) => {
    switch (action) {
      case 'CREATE_RABBIT': return '新增兔子';
      case 'UPDATE_RABBIT': return '更新兔子';
      case 'DELETE_RABBIT': return '刪除兔子';
      case 'VERIFY_DONATION': return '核銷捐款';
      case 'REJECT_DONATION': return '駁回捐款';
      case 'UPDATE_SETTING': return '修改設定';
      case 'CREATE_BANNER': return '新增橫幅';
      case 'UPDATE_BANNER': return '更新橫幅';
      case 'DELETE_BANNER': return '刪除橫幅';
      default: return action;
    }
  };

  const formatTarget = (resource: string | null) => {
    if (!resource) return '-';
    if (resource === 'banner_layout') return '⚙️ 全域網站設定';
    if (resource.startsWith('rabbit_')) return '🐰 兔子資料';
    if (resource.startsWith('donation_')) return '💰 捐款紀錄';
    if (resource.startsWith('banner_')) return '🖼️ 首頁橫幅';
    return resource;
  };

  const formatDetails = (details: any, resource: string | null) => {
    if (!details) return '-';
    
    // Global Settings
    if (resource === 'banner_layout') {
       if (details.value) {
          const map: Record<string, string> = {
             'contained': '一般 (縮限)',
             'full': '滿版 (全寬)'
          };
          return `橫幅顯示設定：${map[details.value] || details.value}`;
       }
    }

    // Banner Updates
    if (resource?.startsWith('banner_')) {
       const parts = [];
       
       // Handle Title
       if (details.title) {
           parts.push(`標題：${details.title}`);
       } else if (details.title === "") {
           parts.push(`標題：(未設定)`);
       }

       // Handle Display Mode
       if (details.display_mode) {
           const map: Record<string, string> = {
             'contained': '一般 (縮限)',
             'full': '滿版 (全寬)'
          };
          parts.push(`版面：${map[details.display_mode] || details.display_mode}`);
       }

       // Handle Active Status
       if (typeof details.is_active !== 'undefined') {
          parts.push(`狀態：${details.is_active ? '上架' : '下架'}`);
       }

       // Fallback for any other banner details
       if (parts.length === 0 && Object.keys(details).length > 0) {
          return JSON.stringify(details);
       }
       return parts.join(' / ');
    }
    
    // Rabbit Updates
    if (details.name || details.status) {
      const parts = [];
      if (details.name) parts.push(`名稱：${details.name}`);
      if (details.status) {
        const statusMap: Record<string, string> = {
          'open': '開放認養',
          'reserved': '已預訂',
          'medical': '醫療中',
          'closed': '已結案'
        };
        parts.push(`狀態：${statusMap[details.status] || details.status}`);
      }
      return parts.join(' / ');
    }

    // Donation Updates
    if (details.receipt_no) return `已開立收據：${details.receipt_no}`;
    if (details.note) return `備註原因：${details.note}`;

    // Fallback
    return JSON.stringify(details);
  };

  const getActionColor = (action: string) => {
    if (action.includes('DONATION')) return 'secondary'; // Donation related
    if (action.includes('RABBIT')) return 'default'; // Rabbit related
    if (action.includes('SETTING') || action.includes('BANNER')) return 'outline'; // System/Content related
    return 'outline';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">操作紀錄</h2>
        <p className="text-muted-foreground">
          查看系統所有重要操作紀錄
        </p>
      </div>

      {/* Desktop View */}
      <div className="rounded-md border bg-white hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>時間</TableHead>
              <TableHead>操作人員</TableHead>
              <TableHead>動作</TableHead>
              <TableHead>對象資源</TableHead>
              <TableHead>詳細內容</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs?.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="whitespace-nowrap">
                  {new Date(log.created_at).toLocaleString('zh-TW')}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                     <span className="font-medium">
                        {(log.profiles as any)?.full_name || 'Unknown'}
                     </span>
                     <span className="text-xs text-muted-foreground">
                        {(log.profiles as any)?.email}
                     </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getActionColor(log.action) as any}>
                    {formatAction(log.action)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {formatTarget(log.target_resource)}
                </TableCell>
                <TableCell className="max-w-[400px] text-sm text-stone-600">
                   {formatDetails(log.details, log.target_resource)}
                </TableCell>
              </TableRow>
            ))}

            {!logs?.length && (
               <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                     尚無操作紀錄
                  </TableCell>
               </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
         {logs?.map((log) => (
            <Card key={log.id}>
               <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                     <div>
                        <CardTitle className="text-base text-stone-800">
                           {formatTarget(log.target_resource)}
                        </CardTitle>
                        <div className="text-xs text-muted-foreground mt-1">
                           {new Date(log.created_at).toLocaleString('zh-TW')}
                        </div>
                     </div>
                     <Badge variant={getActionColor(log.action) as any}>
                        {formatAction(log.action)}
                     </Badge>
                  </div>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                     <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                        {((log.profiles as any)?.full_name?.[0] || 'U')}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-medium">
                           {(log.profiles as any)?.full_name || 'Unknown'}
                        </span>
                        <span className="text-xs text-muted-foreground break-all">
                           {(log.profiles as any)?.email}
                        </span>
                     </div>
                  </div>
                  
                  <div className="text-sm text-stone-600 bg-muted/50 p-2 rounded border border-dashed">
                     <span className="text-xs text-muted-foreground block mb-1">詳細內容:</span>
                     {formatDetails(log.details, log.target_resource)}
                  </div>
               </CardContent>
            </Card>
         ))}
         {!logs?.length && (
            <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                尚無操作紀錄
            </div>
         )}
      </div>
    </div>
  );
}
