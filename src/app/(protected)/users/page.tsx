"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { RegionSelector } from "@/components/region-selector";
import { DataTable } from "@/components/ui/data-table"; // assume shared component
import { userColumns } from "./columns";

export default function UsersPage() {
  const [region, setRegion] = useState<"EU" | "US">("EU");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data = [], isLoading } = useUsers(region);

  const paginated = data.slice((page - 1) * pageSize, page * pageSize);
  const isNextDisabled = data.length <= page * pageSize;

  return (
    <div className="w-full max-w-8xl mx-auto h-full flex flex-col gap-4 p-4">
      <RegionSelector value={region} onChange={setRegion} />

      <DataTable
        columns={userColumns}
        data={paginated}
        filterColumn="email"
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}
