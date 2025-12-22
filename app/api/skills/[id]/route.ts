import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Skill from "../../../../models/Skill";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const skill = await Skill.findById(params.id);

    if (!skill) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ skill });
  } catch (err) {
    console.error("SKILL GET ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
