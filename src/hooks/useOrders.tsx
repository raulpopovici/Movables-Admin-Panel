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

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      return await api<Order[]>("/api/getOrders");
    },
  });
};
