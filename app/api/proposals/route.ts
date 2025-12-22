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

export async function GET() {
  return NextResponse.json({ proposals });
}
export async function getProposalById(id: string) {
  return proposals.find((p) => p.id === id) ?? null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const offer = String(body.offer ?? "").trim();
    const requested = String(body.requested ?? "").trim();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required." },
        { status: 400 }
      );
    }

    const proposal: Proposal = {
      id: crypto.randomUUID(),
      title,
      description,
      offer,
      requested,
      createdAt: new Date().toISOString(),
    };

    proposals.unshift(proposal);
    return NextResponse.json({ proposal }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
}