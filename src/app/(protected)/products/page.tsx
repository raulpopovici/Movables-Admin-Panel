"use client";

import { useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { DataTable } from "@/components/ui/data-table";
import { RegionSelector } from "@/components/region-selector";
import { getProductColumns } from "./columns";
import { AddProductButton } from "@/components/add-product";

export default function ProductsPage() {
  const [region, setRegion] = useState<"EU" | "US">("EU");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: products = [], isLoading } = useProducts({
    region,
    pageNumber: page,
    pageSize,
  });

  const isNextDisabled = products.length < pageSize;
  const columns = useMemo(() => getProductColumns(region), [region]);
  return (
    <div className="w-full max-w-8xl mx-auto p-4 flex flex-col gap-4">
      <RegionSelector
        value={region}
        onChange={(r) => {
          setRegion(r);
          setPage(1); // reset page when region changes
        }}
      />

      {isLoading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          filterColumn="productName"
          filterPlaceholder="Search products..."
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          isNextDisabled={isNextDisabled}
        />
      )}
      <AddProductButton region={region} />
    </div>
  );
}
