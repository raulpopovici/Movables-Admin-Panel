"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Region = "EU" | "US";

export function RegionSelector({
  value,
  onChange,
}: {
  value: Region;
  onChange: (region: Region) => void;
}) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as Region)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="EU">EU</SelectItem>
        <SelectItem value="US">US</SelectItem>
      </SelectContent>
    </Select>
  );
}
