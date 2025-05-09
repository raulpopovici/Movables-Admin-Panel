// src/hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  isGoogleUser: boolean;
  cartId: string;
};

export const useUsers = (region: "EU" | "US" | "ASIA") => {
  return useQuery<User[]>({
    queryKey: ["users", region],
    queryFn: () => api<User[]>("/api/getAllUsers", region),
  });
};
