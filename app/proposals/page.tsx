import Link from "next/link";
import { headers } from "next/headers";

type ProposalUI = {
  id: string; // normalized from Mongo _id
  title: string;
  description: string;
  offer?: string;
  requested?: string;
  createdAt: string;
};

type ProposalFromApi = {
  _id: string; // Mongo/Mongoose
  title: string;
  description: string;
  offer?: string;
  requested?: string;
  createdAt: string;
};

// Type guard: proves json has proposals: ProposalFromApi[]
function hasProposalsArray(x: unknown): x is { proposals: ProposalFromApi[] } {
  if (!x || typeof x !== "object") return false;
  const proposals = (x as any).proposals;
  return Array.isArray(proposals);
}

async function getProposals(): Promise<ProposalUI[]> {
  const h = await headers();
  const host = h.get("host"); // e.g. localhost:3000
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/proposals`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json: unknown = await res.json();

  if (!hasProposalsArray(json)) return [];

  const proposals = json.proposals;

  return proposals.map((p) => ({
    id: String(p._id),
    title: String(p.title ?? ""),
    description: String(p.description ?? ""),
    offer: p.offer ? String(p.offer) : "",
    requested: p.requested ? String(p.requested) : "",
    createdAt: String(p.createdAt ?? ""),
  }));
}

export default async function ProposalsPage() {
  const proposals = await getProposals();

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Proposals</h1>

        <Link href="/proposals/new" style={{ fontWeight: 600 }}>
          + New Proposal
        </Link>
      </div>

      <div style={{ marginTop: 16 }}>
        {proposals.length === 0 ? (
          <p>No proposals yet. Create one!</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 12,
            }}
          >
            {proposals.map((p) => (
              <li
                key={p.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <Link href={`/proposals/${p.id}`} style={{ fontWeight: 700 }}>
                  {p.title}
                </Link>

                <p style={{ marginTop: 8 }}>{p.description}</p>

                {(p.offer || p.requested) && (
                  <p style={{ marginTop: 8, opacity: 0.8 }}>
                    <strong>Offer:</strong> {p.offer || "—"} ·{" "}
                    <strong>Request:</strong> {p.requested || "—"}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}