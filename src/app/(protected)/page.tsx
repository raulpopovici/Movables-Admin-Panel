import { ChartAreaInteractive } from "@/components/chart-interactive";
import { SectionCards } from "@/components/section-cards";
import { UserAreaChart } from "@/components/user-area-chart";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full max-w-8xl mx-auto h-full">
      <SectionCards />
    </div>
  );
}
