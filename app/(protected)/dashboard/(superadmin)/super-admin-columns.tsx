"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

export type UsersTable = {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const SuperAdminColumns: ColumnDef<UsersTable>[] = [
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return (
        <p className="truncate max-w-[250px]">
          {row.original.username}
        </p>
      )
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="gap-2 flex hover:bg-default px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <div className="flex">
            <ArrowUpIcon />
            <ArrowDownIcon />
          </div>
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="truncate max-w-[250px]">
          {row.original.email}
        </p>
      )
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const roleChange = async (value: string, id: string) => {
        const data = { role: value }
        try {
          await axios.put(`/api/users/${id}/role`, data);
        } catch (error) {
          console.error(error);
        } 
      }
      return (
        <div className="w-[160px]">
          <Select
            defaultValue={row.original.role}
            onValueChange={(value) => roleChange(value, row.original.id)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">USER</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
              <SelectItem value="SUPERADMIN">SUPER ADMIN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button
          variant="outline"
          size="icon"
        >
          <TrashIcon className="cursor-pointer text-destructive-foreground text-bold w-4 h-4"/>
        </Button>
      )
    },
  },
]