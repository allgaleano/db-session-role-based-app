"use client";


import { Button } from "@/components/ui/button";

import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  DotsHorizontalIcon, 
  TrashIcon 
} from "@radix-ui/react-icons";

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
      const deleteUser = async () => {
        try {
          const response = await axios.delete(`/api/users/${user.id}`);
          console.log(response);
          location.reload();
        } catch (error) {
          console.error(error);
        }
      }
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
            <div>
              <AlertDialog>
                <AlertDialogTrigger className="flex items-center justify-center space-x-4 rounded-sm px-2 py-1.5 bg-destructive/10">
                  <p className="text-destructive-foreground">Delete User</p>
                  <TrashIcon className="text-destructive-foreground w-4 h-4"/>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete {user.username}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will delete all user history and cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={deleteUser} className="bg-destructive/40 text-destructive-foreground hover:bg-destructive-foreground hover:text-white">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]