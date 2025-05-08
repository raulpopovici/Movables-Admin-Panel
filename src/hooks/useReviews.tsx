// src/hooks/useReviews.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  firstName: string;
  __user__: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  __product__: {
    id: string;
    productName: string;
    price: number;
  };
}

export function useReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: () => api("/api/getAllReviews"),
  });
}
