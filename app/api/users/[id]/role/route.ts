import { updateUserRoleById } from "@/data/user";
import { getCurrentUserRole } from "@/lib/getCurrentUserRole";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
  const { id } = params;
  const data = await request.json();

  const role = await getCurrentUserRole();
  if (!role || role !== "SUPERADMIN" ) {
    return new NextResponse("Not allowed", { status: 401 });
  }

  try {
    const updated = await updateUserRoleById(id, data.role);
    
    if (!updated) {
      return new NextResponse("Failed to update user role", { status: 500 });
    }
    
    return new NextResponse("User role updated successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to update user role", { status: 500 });
  }
}