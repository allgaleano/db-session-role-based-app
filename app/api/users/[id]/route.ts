import { deleteUserById } from "@/data/user";
import { getCurrentUserRole } from "@/lib/getCurrentUserRole";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
  const { id } = params;
  console.log("id", id);

  const role = await getCurrentUserRole();
  if (!role || role !== "SUPERADMIN") {
    return new NextResponse("Not allowed", { status: 401 });
  }

  try {
    const deleted = await deleteUserById(id);
    console.log("deleted", deleted);
    if (!deleted) {
      return new NextResponse("Failed to delete user", { status: 500 });
    }

    return new NextResponse("User deleted successfully!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to delete user", { status: 500 } );
  }
}