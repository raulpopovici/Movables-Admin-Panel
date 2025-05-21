import { ColumnDef } from "@tanstack/react-table";

export type Order = {
  id: string;
  firstName: string;
  lastName: string;
  totalSum: string;
  address: string;
  phoneNumber: string;
  user: {
    id: string;
    email: string;
  };
};

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "totalSum",
    header: "Total",
    cell: ({ row }) => {
      const value = row.getValue("totalSum");
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Number(value));
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "user.email",
    header: "User Email",
    cell: ({ row }) => {
      const user = row.original.user;
      return user?.email || "—";
    },
  },
];
