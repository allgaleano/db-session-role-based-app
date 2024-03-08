import { getAllUsers } from "@/data/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await getAllUsers();
    if (!users) {
      return NextResponse.json({ ok: false, message: "No users found", status: 404 });
    }
    const usersData = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
    });
    return NextResponse.json({ ok: true, data: usersData, status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Failed to get users", status: 500 });
  }
}