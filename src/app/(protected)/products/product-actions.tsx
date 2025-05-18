"use client";

import { Product } from "@/hooks/useProducts";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

export function ProductActions({ product }: { product: Product }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Editable state
  const [formState, setFormState] = useState({
    productName: product.productName,
    productType: product.productType,
    price: product.price,
    quantity: product.quantity,
    color: product.color ?? "",
    material: product.material ?? "",
    image: product.image ?? "",
  });

  const handleEditSubmit = () => {
    // TODO: replace with actual API call (PUT /api/products/:id)
    console.log("Edited product", { id: product.id, ...formState });
    setOpenEdit(false);
  };

  const handleDelete = () => {
    // TODO: replace with actual API call (DELETE /api/products/:id)
    console.log("Deleted product", product.id);
    setOpenDelete(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formState.productName}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, productName: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Type</Label>
              <Input
                value={formState.productType}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, productType: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label>Price</Label>
                <Input
                  type="number"
                  value={formState.price}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      price: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="w-1/2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={formState.quantity}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      quantity: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label>Color</Label>
              <Select
                value={formState.color}
                onValueChange={(val) =>
                  setFormState((s) => ({ ...s, color: val }))
                }
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
                value={formState.material}
                onValueChange={(val) =>
                  setFormState((s) => ({ ...s, material: val }))
                }
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
                value={formState.image}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, image: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <strong>{product.productName}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
