"use client";

import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { RegionSelector } from "@/components/region-selector";
import { DataTable } from "@/components/ui/data-table";
import { orderColumns } from "./columns";

export default function OrdersPage() {
  const [region, setRegion] = useState<"EU" | "US">("EU");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data = [], isLoading } = useOrders(region);

  // Ensure each order has a 'user' property as required by the columns
  const normalizedData = data.map((order: any) => ({
    ...order,
    user: order.user ?? { id: "", email: "" },
  }));

  const paginated = normalizedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const isNextDisabled = normalizedData.length <= page * pageSize;

  return (
    <div className="w-full max-w-8xl mx-auto h-full flex flex-col gap-4 p-4">
      <RegionSelector value={region} onChange={setRegion} />

      <DataTable
        columns={orderColumns}
        data={paginated}
        filterColumn="id"
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}
