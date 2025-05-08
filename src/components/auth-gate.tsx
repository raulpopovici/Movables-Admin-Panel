"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = pathname === "/login"; // Expand this if needed

  useEffect(() => {
    if (!loading && !isAuthenticated && !isPublic) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, isPublic, router]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated && !isPublic) return null;

  return <>{children}</>;
};
