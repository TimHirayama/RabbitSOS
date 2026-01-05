"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-4 mt-6">
      <div className="text-sm text-muted-foreground bg-stone-100 px-3 py-1 rounded-md">
         Page <span className="font-medium text-stone-900">{currentPage}</span> of{" "}
         <span className="font-medium text-stone-900">{totalPages}</span>
      </div>
      
      <div className="flex gap-2">
         <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-8 w-8 p-0"
         >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
         </Button>

         <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-8 w-8 p-0"
         >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
         </Button>
      </div>
    </div>
  );
}
