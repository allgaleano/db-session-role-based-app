import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession, getSessionByUserId, updateSessionByUserId } from "@/data/session";
import { cookies } from "next/headers";


export async function POST(request: NextRequest) {
  const data = await request.json();
  
  const validatedData = LoginSchema.safeParse(data);
  if (!validatedData.success) {
    return NextResponse.json({ok: false, message: "Invalid credentials", status: 400});
  }

  const { email, password } = validatedData.data;
  const user = await getUserByEmail(email);

  if (!user) {
    return NextResponse.json({ok: false, message: "Invalid email or password", status: 400});
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ok: false, message: "Invalid email or password", status: 400});
  }
  
  const session = await getSessionByUserId(user.id);
  
  if (!session) {
    const session = await createSession(user.id);

    if (!session) {
      return NextResponse.json({ok: false, message: "Failed to create session", status: 500});
    }
    cookies().set("session", encodeURIComponent(`${session.sessiontoken}`), { expires: session.expires });

  } else {
    const session = await updateSessionByUserId(user.id);

    if (!session) {
      return NextResponse.json({ok: false, message: "Failed to update session", status: 500});
    }
    
    cookies().set("session", encodeURIComponent(`${session.sessiontoken}`), { expires: session.expires });
  }

  return NextResponse.json({ok: true, message: "Login successfully", status: 200});
}