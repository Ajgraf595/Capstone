import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import Skill from "@/models/Skill";

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ createdAt: -1 });
    return NextResponse.json({ skills }, { status: 200 });
  } catch (err) {
    console.error("SKILLS GET ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(session);
    const userId = String((payload as any).userId ?? "");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const type = String(body.type ?? "").trim(); // OFFER | REQUEST

    if (!title || !type) {
      return NextResponse.json(
        { error: "Title and type are required." },
        { status: 400 }
      );
    }

    if (type !== "OFFER" && type !== "REQUEST") {
      return NextResponse.json(
        { error: "Type must be OFFER or REQUEST." },
        { status: 400 }
      );
    }

    await connectDB();
    const skill = await Skill.create({
      userId,
      title,
      description,
      type,
    });

    return NextResponse.json({ skill }, { status: 201 });
  } catch (err) {
    console.error("SKILLS POST ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}