"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { api } from "@/lib/api";

const regions = ["US"] as const;

export default function RegionsPage() {
  const [region, setRegion] = useState<"US">("US");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSync = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await api<{ message: string }>(
        `/api/syncFromMaster`,
        region,
        { method: "POST" }
      );

      setMessage(res.message);
    } catch (err) {
      setMessage("❌ Sync failed. Check console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto h-full flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Region Synchronization</h1>
        <p className="text-muted-foreground text-sm">
          Select a region to synchronize <strong>missing products</strong> from
          the EU master. Existing products will remain unchanged.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Select value={region} onValueChange={(val) => setRegion(val as any)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSync} disabled={loading}>
          {loading ? "Synchronizing..." : "Synchronize"}
        </Button>
      </div>

      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
