"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    debugger
    if (!loading && !user) {
      router.replace("/auth/login"); // 🔥 FIXED HERE
    }
  }, [loading, user]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
