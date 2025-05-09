// src/hooks/useOrders.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type Order = {
  id: string;
  firstName: string;
  lastName: string;
  totalSum: string;
  address: string;
  phoneNumber: string;
  userId: string;
};

export const useOrders = (region: "EU" | "US" | "ASIA") => {
  return useQuery<Order[]>({
    queryKey: ["orders", region],
    queryFn: () => api<Order[]>("/api/getOrders", region),
  });
};
