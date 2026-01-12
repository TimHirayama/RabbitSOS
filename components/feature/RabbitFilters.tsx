"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RabbitFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State initialization from URL
  const [gender, setGender] = useState(searchParams.get("gender") || "all");
  const [location, setLocation] = useState(
    searchParams.get("location") || "all"
  );
  const [name, setName] = useState(searchParams.get("name") || "");

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/rabbits?${params.toString()}`);
  };

  // Debounce for name search could be better, but for now simple onBlur or Enter is safer to avoid too many refreshes
  const handleNameSearch = () => {
    handleFilterChange("name", name);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4 text-lg">篩選條件</h3>

        <div className="mb-4 space-y-2">
          <Label htmlFor="search-name">搜尋名字</Label>
          <div className="flex gap-2">
            <Input
              id="search-name"
              placeholder="輸入兔兔名字..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameSearch()}
              onBlur={handleNameSearch}
            />
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.push("/rabbits");
            setName("");
            setGender("all");
            setLocation("all");
          }}
          className="w-full mb-4"
        >
          清除重置
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>性別</Label>
        <RadioGroup
          value={gender}
          onValueChange={(v) => {
            setGender(v);
            handleFilterChange("gender", v);
          }}
        >
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
        <Label>花色</Label>
        <Select
          value={searchParams.get("color") || "all"}
          onValueChange={(v) => handleFilterChange("color", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="選擇花色" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部花色</SelectItem>
            <SelectItem value="White">白色 (White)</SelectItem>
            <SelectItem value="Brown">棕色 (Brown)</SelectItem>
            <SelectItem value="Grey">灰色 (Grey)</SelectItem>
            <SelectItem value="Black">黑色 (Black)</SelectItem>
            <SelectItem value="Bicolor">雙色 (Bicolor)</SelectItem>
            {/* <SelectItem value="Tricolor">三色 (Tricolor)</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>品種</Label>
        <Select
          value={searchParams.get("breed") || "all"}
          onValueChange={(v) => handleFilterChange("breed", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="選擇品種" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部品種</SelectItem>
            <SelectItem value="Pet">寵物兔</SelectItem>
            <SelectItem value="White">大白兔</SelectItem>
            <SelectItem value="Lop">垂耳兔</SelectItem>
            <SelectItem value="Dutch">道奇兔</SelectItem>
            <SelectItem value="Mini">迷你兔</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label>地區</Label>
        <Select
          value={location}
          onValueChange={(v) => {
            setLocation(v);
            handleFilterChange("location", v);
          }}
        >
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
