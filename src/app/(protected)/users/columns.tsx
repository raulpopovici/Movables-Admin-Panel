// components/users/columns.ts
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  isGoogleUser: boolean;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
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
    accessorKey: "isGoogleUser",
    header: "Google Account",
    cell: ({ row }) => (row.getValue("isGoogleUser") ? "Yes" : "No"),
  },
];
