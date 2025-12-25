import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const payload = await verifyToken(session);

    return NextResponse.json({
      user: {
        userId: String((payload as any).userId ?? ""),
        email: String((payload as any).email ?? ""),
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}