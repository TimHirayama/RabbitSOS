"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RabbitFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State initialization from URL
  const [gender, setGender] = useState(searchParams.get("gender") || "all");
  const [location, setLocation] = useState(searchParams.get("location") || "all");

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/rabbits?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4 text-lg">篩選條件</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.push("/rabbits")}
          className="w-full mb-4"
        >
          清除重置
        </Button>
      </div>
      
      <Separator />

      <div className="space-y-3">
        <Label>性別</Label>
        <RadioGroup value={gender} onValueChange={(v) => { setGender(v); handleFilterChange("gender", v); }}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="gender-all" />
            <Label htmlFor="gender-all">全部</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="M" id="gender-m" />
            <Label htmlFor="gender-m">男生 (公)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="F" id="gender-f" />
            <Label htmlFor="gender-f">女生 (母)</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>地區</Label>
        <Select value={location} onValueChange={(v) => { setLocation(v); handleFilterChange("location", v); }}>
          <SelectTrigger>
            <SelectValue placeholder="選擇地區" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部地區</SelectItem>
            <SelectItem value="Taipei">台北 (Taipei)</SelectItem>
            <SelectItem value="NewTaipei">新北 (New Taipei)</SelectItem>
            <SelectItem value="Taoyuan">桃園 (Taoyuan)</SelectItem>
            <SelectItem value="Taichung">台中 (Taichung)</SelectItem>
            <SelectItem value="Kaohsiung">高雄 (Kaohsiung)</SelectItem>
            <SelectItem value="Other">其他</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
