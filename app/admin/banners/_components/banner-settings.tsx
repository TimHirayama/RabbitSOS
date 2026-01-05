'use client';

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import { updateSiteSetting } from '../../actions';

interface BannerSettingsProps {
  initialLayout: string;
}

export function BannerSettings({ initialLayout }: BannerSettingsProps) {
  const [isFullWidth, setIsFullWidth] = useState(initialLayout === 'full');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsFullWidth(checked);
    setIsLoading(true);
    const newValue = checked ? 'full' : 'contained';
    
    try {
      const result = await updateSiteSetting('banner_layout', newValue);
      if (result.error) {
        throw new Error(result.error);
      }
      toast.success(checked ? '已切換為滿版模式' : '已切換為一般模式');
    } catch (err) {
      toast.error('設定失敗');
      setIsFullWidth(!checked); // Revert
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-slate-50 mb-8">
      <div className="flex-1">
        <h3 className="font-medium">Banner 顯示設定</h3>
        <p className="text-sm text-muted-foreground">
          {isFullWidth ? '目前設定：滿版顯示 (全螢幕寬度)' : '目前設定：一般顯示 (含左右留白)'}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          id="banner-layout" 
          checked={isFullWidth}
          onCheckedChange={handleToggle}
          disabled={isLoading}
        />
        <Label htmlFor="banner-layout">滿版模式</Label>
      </div>
    </div>
  );
}
