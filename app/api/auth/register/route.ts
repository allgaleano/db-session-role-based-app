import { RegisterSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/data/user";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const validatedData = RegisterSchema.safeParse(data);
  if (!validatedData.success) {
    return NextResponse.json({ok: false, message: "Invalid credentials"});
  }
  const { username, email, password } = validatedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  console.log("existingUser", existingUser);
  if (existingUser?.length! > 0) {
    return NextResponse.json({ok: false, message: "User already exists"});
  }

  try {
    await createUser(username, email, hashedPassword);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ok: false, message: "Failed to create user"});
  }


  return NextResponse.json({ok: true, message: "User created successfully"});
}