"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, IdCard } from "lucide-react";
import { EditUserSheet } from "../users/_components/edit-user-sheet";

interface AdminProfileCardProps {
  profile: any;
}

export function AdminProfileCard({ profile }: AdminProfileCardProps) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-4 overflow-hidden border-none shadow-md">
      <CardContent className="relative pt-8 px-6 sm:px-8 pb-8">
        <div className="absolute top-4 right-4">
          <EditUserSheet user={profile} currentUserRole={profile.role} />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
          <div
            className="h-24 w-24 rounded-full border-4 border-background flex items-center justify-center font-bold text-3xl shrink-0 shadow-sm overflow-hidden"
            style={{
              backgroundColor: profile.avatar_url
                ? "transparent"
                : profile.avatar_color || "#f4f4f5",
              color: profile.avatar_color ? "#ffffff" : "#71717a",
            }}
          >
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="h-full w-full object-cover"
              />
            ) : (
              profile.full_name?.[0] || profile.email?.[0]?.toUpperCase()
            )}
          </div>
          <div className="space-y-1 sm:pt-2">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold">{profile.full_name}</h3>
              <Badge
                variant={
                  profile.role === "super_admin"
                    ? "default"
                    : profile.role === "admin"
                    ? "secondary"
                    : "outline"
                }
                className={
                  profile.role === "super_admin"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : ""
                }
              >
                {profile.role === "super_admin"
                  ? "超級管理員"
                  : profile.role === "admin"
                  ? "管理員"
                  : "志工"}
              </Badge>
            </div>
            <p className="text-muted-foreground font-medium">
              {profile.role_title || "未設定職稱"}
            </p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 border-t pt-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              聯絡資訊
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-full">
                  <Phone className="h-4 w-4" />
                </div>
                <span>{profile.phone || "尚未填寫電話"}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-full">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="truncate">
                  {profile.address || "尚未填寫地址"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-full">
                  <IdCard className="h-4 w-4" />
                </div>
                <span className="font-mono">
                  {profile.national_id || "尚未填寫身分證"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              備註資料
            </h4>
            <div className="bg-muted/30 p-4 rounded-lg min-h-[100px] text-sm text-foreground/80 leading-relaxed">
              {profile.note ? (
                <p className="whitespace-pre-wrap">{profile.note}</p>
              ) : (
                <p className="text-muted-foreground italic">無備註資料...</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
