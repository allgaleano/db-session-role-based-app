"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { UsersTable } from "@/types/users-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const AdminColumns: ColumnDef<UsersTable>[] = [
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
      return (
        <div className="w-[160px]">
          {row.original.role}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              size="icon"
            >
              <DotsHorizontalIcon className="w-4 h-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]