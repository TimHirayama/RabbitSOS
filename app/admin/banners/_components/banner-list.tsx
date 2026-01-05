'use client';

import { useState } from 'react';
// import { Banner } from '@/types/supabase'; // Removed due to missing type
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { toggleBannerStatus, deleteBanner, updateBannerOrder } from '../actions';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BannerListProps {
  banners: any[]; // Avoid complex type setup for now
}

export function BannerList({ banners }: BannerListProps) {
  const supabase = createClient();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getImageUrl = (path: string) => {
    return supabase.storage.from('banners').getPublicUrl(path).data.publicUrl;
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    try {
       await toggleBannerStatus(id, currentStatus);
       toast.success(currentStatus ? '已停用' : '已啟用');
    } catch {
       toast.error('切換失敗');
    } finally {
       setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, path: string) => {
     setLoadingId(id);
     try {
        await deleteBanner(id, path);
        toast.success('已刪除');
     } catch {
        toast.error('刪除失敗');
     } finally {
        setLoadingId(null);
     }
  };
  
  const handleOrderChange = async (id: string, newOrder: string) => {
      const order = parseInt(newOrder);
      if (isNaN(order)) return;
      await updateBannerOrder(id, order);
      toast.success('排序已更新');
  }

  return (
    <div className="space-y-4">
      {banners.map((banner) => (
        <div key={banner.id} className="flex items-center gap-4 rounded-lg border p-4 bg-white shadow-sm">
          <div className="text-muted-foreground w-8 text-center font-mono">
             <Input 
                className="w-16 h-8 text-center" 
                defaultValue={banner.sort_order}
                onBlur={(e) => handleOrderChange(banner.id, e.target.value)}
             />
          </div>
          
          <div className="relative h-16 w-32 shrink-0 overflow-hidden rounded bg-slate-100">
            <img 
               src={getImageUrl(banner.image_path)} 
               alt={banner.title || 'Banner'} 
               className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{banner.title || '(無標題)'}</h4>
            <div className="flex gap-2">
              {banner.link_url && (
                <a href={banner.link_url} target="_blank" className="flex items-center text-xs text-blue-500 hover:underline pt-1">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  {banner.link_url}
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{banner.is_active ? '啟用' : '停用'}</span>
                <Switch 
                   checked={banner.is_active}
                   onCheckedChange={() => handleToggle(banner.id, banner.is_active)}
                   disabled={loadingId === banner.id}
                />
             </div>
             
             <AlertDialog>
               <AlertDialogTrigger asChild>
                 <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                 </Button>
               </AlertDialogTrigger>
               <AlertDialogContent>
                 <AlertDialogHeader>
                   <AlertDialogTitle>確定要刪除嗎？</AlertDialogTitle>
                   <AlertDialogDescription>
                     此操作無法復原，Banner 將會從首頁移除。
                   </AlertDialogDescription>
                 </AlertDialogHeader>
                 <AlertDialogFooter>
                   <AlertDialogCancel>取消</AlertDialogCancel>
                   <AlertDialogAction onClick={() => handleDelete(banner.id, banner.image_path)} className="bg-red-600 hover:bg-red-700">
                     確認刪除
                   </AlertDialogAction>
                 </AlertDialogFooter>
               </AlertDialogContent>
             </AlertDialog>
          </div>
        </div>
      ))}
      {banners.length === 0 && (
         <div className="text-center py-8 text-muted-foreground">
            尚無 Banner，請上方新增
         </div>
      )}
    </div>
  );
}
