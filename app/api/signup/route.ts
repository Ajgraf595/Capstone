import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim().toLowerCase();
    const password = body?.password || "";

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    await connectDB();

    // Important: handle duplicates even if you already check (race conditions happen)
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    return NextResponse.json(
      { id: user._id.toString(), name: user.name, email: user.email },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("SIGNUP ERROR:", err);

    // Duplicate email from Mongo
    if (err?.code === 11000) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    // Show something useful while developing
    return NextResponse.json(
      {
        error: "Server error",
        devMessage: err?.message,
        devName: err?.name,
        devCode: err?.code,
      },
      { status: 500 }
    );
  }
}