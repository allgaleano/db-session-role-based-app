import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
  const { id } = params;
  const data = await request.json();
  console.log("data", data);

  return NextResponse.json({ok: true, message: "DELETE"});
}