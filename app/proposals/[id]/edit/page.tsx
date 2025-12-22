import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import EditProposalForm from "../../../../components/proposals/EditProposalForm";

type Proposal = {
  _id: string;
  ownerId?: string;
  title: string;
  description: string;
  offer?: string;
  requested?: string;
};

async function fetchJson<T>(path: string): Promise<T | null> {
  const h = await headers();
  const host = h.get("host");
  if (!host) return null;

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const cookie = h.get("cookie") ?? "";

  const res = await fetch(`${protocol}://${host}${path}`, {
    cache: "no-store",
    headers: cookie ? { cookie } : undefined,
  });

  if (!res.ok) return null;
  return (await res.json()) as T;
}

export default async function EditProposalPage({
  params,
}: {
  params: { id: string };
}) {
  const proposalData = await fetchJson<{ proposal: Proposal }>(
    `/api/proposals/${params.id}`
  );
  const meData = await fetchJson<{
    user: { userId: string; email: string } | null;
  }>(`/api/me`);

  const proposal = proposalData?.proposal ?? null;
  if (!proposal) notFound();

  const me = meData?.user ?? null;
  const isOwner =
    !!me?.userId && String(proposal.ownerId ?? "") === String(me.userId);

  // Not logged in or not owner
  if (!isOwner) {
    return (
      <div style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
        <Link href={`/proposals/${params.id}`}>← Back</Link>

        <h1 style={{ marginTop: 16 }}>Forbidden</h1>
        <p style={{ opacity: 0.8 }}>
          You must be logged in as the owner to edit this proposal.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <Link href={`/proposals/${params.id}`}>← Back</Link>

      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16 }}>
        Edit Proposal
      </h1>

      <div style={{ marginTop: 16 }}>
        <EditProposalForm
          proposalId={proposal._id}
          initialTitle={proposal.title}
          initialDescription={proposal.description}
          initialOffer={proposal.offer ?? ""}
          initialRequested={proposal.requested ?? ""}
        />
      </div>
    </div>
  );
}