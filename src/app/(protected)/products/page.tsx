"use client";

import { RegionSelector } from "@/components/region-selector";
import { useState } from "react";

export default function Products() {
  const [region, setRegion] = useState<"EU" | "US">("EU");

  return (
    <div className="w-full max-w-8xl mx-auto h-full gap-4 flex flex-col p-4">
      <RegionSelector value={region} onChange={setRegion} />
    </div>
  );
}
