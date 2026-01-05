'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import Image from "next/image";

interface ReceiptModalProps {
  url: string | null;
}

export function ReceiptModal({ url }: ReceiptModalProps) {
  if (!url) return <span className="text-muted-foreground">-</span>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="h-auto p-0 text-blue-600 hover:no-underline">
          <Eye className="mr-1 h-3 w-3" />
          查看憑證
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>匯款憑證</DialogTitle>
        </DialogHeader>
        <div className="relative w-full min-h-[500px] mt-2">
           {/* Use a normal img tag for simplicity with signed URLs to avoid Next.js Image config issues with dynamic buckets, 
               or use Next.js Image if domains are configured. Given it's a signed URL from Supabase, a raw img tag is safer/easier here. */}
           <img 
              src={url} 
              alt="Receipt" 
              className="w-full h-auto rounded-lg border object-contain"
           />
        </div>
        <div className="flex justify-end mt-4">
             <Button variant="outline" size="sm" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                   <ExternalLink className="mr-2 h-4 w-4" />
                   開啟原圖
                </a>
             </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
