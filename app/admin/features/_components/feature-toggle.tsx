"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { toggleFeatureFlag } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FeatureToggleProps {
  featureKey: string;
  label: string;
  description: string | null;
  isEnabled: boolean;
}

export function FeatureToggleItem({
  featureKey,
  label,
  description,
  isEnabled,
}: FeatureToggleProps) {
  const [enabled, setEnabled] = useState(isEnabled);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    setEnabled(checked); // Optimistic UI
    startTransition(async () => {
      const res = await toggleFeatureFlag(featureKey, checked);
      if (!res.success) {
        setEnabled(!checked); // Revert
        toast.error(res.error || "更新失敗");
      } else {
        toast.success(`已${checked ? "開啟" : "關閉"} ${label}`);
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
      <div className="space-y-0.5">
        <Label className="text-base font-medium flex items-center gap-2">
          {label}
          {isPending && (
            <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
          )}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={handleToggle}
        disabled={isPending}
      />
    </div>
  );
}
