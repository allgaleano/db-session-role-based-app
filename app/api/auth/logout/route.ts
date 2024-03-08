import { deleteSessionByToken } from "@/data/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const cookie = request.cookies.get('session');
  if (!cookie) {
    return NextResponse.json({ok: false, message: "User is not logged in", status: 401});
  }
  
  const deletedSession = await deleteSessionByToken(cookie.value);

  if (!deletedSession) {
    return NextResponse.json({ok: false, message: "Failed to delete session", status: 500});
  }

  cookies().set("session", "", {maxAge: 0});

  return NextResponse.json({ok: true, message: "Logout successfully", status: 200});
}