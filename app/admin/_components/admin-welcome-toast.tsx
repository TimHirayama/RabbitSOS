"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export function AdminWelcomeToast({ userId, role }: { userId: string; role: string }) {
  const searchParams = useSearchParams();
  const loginSuccess = searchParams.get("login_success");

  useEffect(() => {
    // Console log as requested
    console.log("=== Admin Login Success ===");
    console.log("User ID:", userId);
    console.log("Role:", role);
    console.log("===========================");

    if (loginSuccess) {
      toast.success("登入成功！", {
        description: `歡迎回來，${role === 'admin' ? '管理員' : '志工'}`,
        duration: 5000,
      });
      // Optionally remove the param
      // window.history.replaceState(null, "", "/admin");
    }
  }, [userId, role, loginSuccess]);

  return null;
}
