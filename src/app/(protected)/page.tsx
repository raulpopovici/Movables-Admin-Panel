"use client";

import { ChartAreaInteractive } from "@/components/chart-interactive";
import { RegionSelector } from "@/components/region-selector";
import { SectionCards } from "@/components/section-cards";
import { UserAreaChart } from "@/components/user-area-chart";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [region, setRegion] = useState<"EU" | "US">("EU");
  return (
    <div className="w-full max-w-8xl mx-auto h-full gap-4 flex flex-col p-4">
      <RegionSelector value={region} onChange={setRegion} />
      <SectionCards region={region} />
    </div>
  );
}
