import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type Product = {
  id: string;
  productName: string;
  productType: string;
  price: number;
  quantity: number;
  color?: string;
  material?: string;
  image?: string;
};

type UseProductsOptions = {
  region: "EU" | "US" | "ASIA";
  pageNumber?: number;
  pageSize?: number;
  productType?: string;
};

export const useProducts = ({
  region,
  pageNumber = 1,
  pageSize = 20,
  productType,
}: UseProductsOptions) => {
  const queryParams = new URLSearchParams({
    pageNumber: String(pageNumber),
    nrOfProducts: String(pageSize),
  });

  if (productType) {
    queryParams.append("productType", productType);
  }

  const endpoint = `/api/getAllProducts?${queryParams.toString()}`;

  return useQuery({
    queryKey: ["products", region, pageNumber, pageSize, productType],
    queryFn: () => api<Product[]>(endpoint, region),
  });
};
