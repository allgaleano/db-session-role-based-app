import { DataTable } from "./data-table";
import { AdminColumns } from "./admin-columns";
import { LogoutButton } from "@/components/auth/logout-button";
import { getAllUsers } from "@/data/user";
import { unstable_noStore as noStore } from "next/cache";
import { UsersTable } from "@/types/users-table";
import { SuperAdminColumns } from "./(superadmin)/super-admin-columns";
import { getCurrentUser } from "@/lib/getCurrentUser";

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
  const currentUser = await getCurrentUser();
  return ( 
    <div className="w-[90%]">
      <h1>Dashboard</h1>
      { currentUser?.role === "ADMIN" ? (
        <div className="py-4">
          <DataTable columns={AdminColumns} data={data}/>
        </div>
      ) : currentUser?.role === "SUPERADMIN" ? (
        <div className="py-4">
          <DataTable columns={SuperAdminColumns} data={data}/>
        </div>
      ) :  (
        <>
          <h2>Personal Info</h2>
          <p>{currentUser?.email}</p>
        </>
      )}
      <div className="flex items-center space-x-4">
        <p>{currentUser?.username}</p>
        <LogoutButton />
      </div>
    </div>
  );
}