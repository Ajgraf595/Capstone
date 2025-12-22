import { NextResponse } from "next/server";

type Proposal = {
  id: string;
  title: string;
  description: string;
  offer: string;
  requested: string;
  createdAt: string;
};

const g = globalThis as unknown as { proposals?: Proposal[] };
const proposals: Proposal[] = (g.proposals ??= []);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const proposal = proposals.find((p) => p.id === id);

  if (!proposal) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ proposal });
}