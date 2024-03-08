import { getCurrentUser } from "@/lib/getCurrentUser";
import { getSession } from "@/lib/getSession";
import { NextResponse } from "next/server";

export async function GET() {
  const session = getSession();

  if (!session) {
    return new NextResponse("No active session", { status: 401 });
  }

  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("No user found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(user), { status: 200 });
}