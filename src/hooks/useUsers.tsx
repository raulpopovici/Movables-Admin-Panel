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

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      return await api<User[]>("/api/getAllUsers"); // adjust this path to match your backend route
    },
  });
};
