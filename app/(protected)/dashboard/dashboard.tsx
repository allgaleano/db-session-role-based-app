import { DataTable } from "./data-table";
import { adminColumns } from "./admin-columns";
import { LogoutButton } from "@/components/auth/logout-button";
import { getAllUsers } from "@/data/user";
import { getCurrentUserRole } from "@/lib/getCurrentUserRole";
import { unstable_noStore as noStore } from "next/cache";
import { UsersTable } from "@/types/users-table";
import { SuperAdminColumns } from "./(superadmin)/super-admin-columns";

const getData = async (): Promise<UsersTable[]> => {
  const users = await getAllUsers();
  if (!users) {
    return [];
  }
  const usersData = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }
  })
  return usersData;
}

export const Dashboard = async () => {
  noStore();
  const data = await getData();
  const currentRole = await getCurrentUserRole();
  return ( 
    <div className="w-[90%]">
      <h1>Dashboard</h1>
      { currentRole === "ADMIN" ? (
        <div className="py-4">
          <DataTable columns={adminColumns} data={data}/>
        </div>
      ) : currentRole === "SUPERADMIN" ? (
        <div className="py-4">
          <DataTable columns={SuperAdminColumns} data={data}/>
        </div>
      ) :  (
        <h2>Not allowed</h2>
      )}
      <LogoutButton />
    </div>
  );
}