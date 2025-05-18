import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductActions } from "./product-actions";

export type Product = {
  id: string;
  productName: string;
  productType: string;
  price: number;
  quantity: number;
  color?: string;
  material?: string;
  image?: string;
};

export function getProductColumns(region: "EU" | "US"): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "productName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "productType",
      header: "Type",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const value = row.getValue("price") as number;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-center">Quantity</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("quantity")}</div>
      ),
    },
    {
      accessorKey: "color",
      header: "Color",
    },
    {
      accessorKey: "material",
      header: "Material",
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return <ProductActions product={product} region={region} />;
      },
    },
  ];
}
