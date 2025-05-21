"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const colors = [
  "black",
  "white",
  "cream",
  "green",
  "pink",
  "grey",
  "brown",
] as const;
const materials = ["metal", "wood", "plywood", "plastic"] as const;

export function AddProductButton({ region }: { region: "EU" | "US" | "ASIA" }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    productName: "",
    productType: "",
    price: 0,
    quantity: 1,
    color: "",
    material: "",
    image: "",
  });

  const handleCreate = async () => {
    try {
      await api("/api/createProduct", region, {
        method: "POST",
        body: JSON.stringify(form),
      });

      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["products", region] });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 p-0 shadow-lg bg-primary text-white hover:bg-primary/90"
      >
        <PlusIcon className="h-6 w-6" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.productName}
                onChange={(e) =>
                  setForm({ ...form, productName: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Type</Label>
              <Input
                value={form.productType}
                onChange={(e) =>
                  setForm({ ...form, productType: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label>Price</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: parseFloat(e.target.value) })
                  }
                />
              </div>
              <div className="w-1/2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Color</Label>
              <Select
                value={form.color}
                onValueChange={(val) => setForm({ ...form, color: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Material</Label>
              <Select
                value={form.material}
                onValueChange={(val) => setForm({ ...form, material: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Image URL</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
