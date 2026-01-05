'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export function AdminSearchFilters({ 
  placeholder = "搜尋姓名、月份、狀態...", 
}: {
  placeholder?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [term, setTerm] = useState(searchParams.get('q')?.toString() || '');
  const monthInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    // Always reset to page 1 when searching
    params.set('page', '1');
    
    replace(`${pathname}?${params.toString()}`);
  };

  const currentQ = searchParams.get('q');

  return (
    <div className="mb-6 max-w-md">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-8 bg-white"
          />
        </div>
        
        {/* Hidden native month picker */}
        <input 
           type="month" 
           ref={monthInputRef}
           className="sr-only"
           onChange={(e) => {
              if(e.target.value) setTerm(e.target.value);
           }}
        />
        
        <Button 
           variant="outline" 
           size="icon" 
           onClick={() => monthInputRef.current?.showPicker()}
           title="選擇月份"
           className="shrink-0"
        >
           <Calendar className="h-4 w-4" />
        </Button>

        <Button onClick={handleSearch} className="cursor-pointer shrink-0">搜尋</Button>
      </div>
      {currentQ && (
         <div className="mt-2 text-xs text-stone-500 pl-1">
            目前搜尋結果: <span className="font-bold text-stone-800">{currentQ}</span>
         </div>
      )}
    </div>
  );
}
