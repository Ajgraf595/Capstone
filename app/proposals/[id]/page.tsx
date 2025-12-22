import TradeProposalActions from "@/components/TradeProposalActions";

async function getProposal(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/proposals/${id}`, {
    cache: "no-store",
  });

  // If you don't have NEXT_PUBLIC_BASE_URL set, use relative fetch via next headers:
  // But simplest for now: use a direct relative fetch if you convert this page to client.
  // If this fetch errors, tell me and I’ll switch the pattern for your setup.

  if (!res.ok) return null;
  return res.json();
}

export default async function ProposalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getProposal(params.id);
  const proposal = data?.proposal;

  if (!proposal) {
    return <div style={{ padding: 24 }}>Proposal not found.</div>;
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>
        Trade Proposal
      </h1>

      <div style={{ padding: 16, border: "1px solid var(--border)", borderRadius: 12 }}>
        <p style={{ marginTop: 0 }}>
          <strong>From:</strong> {String(proposal.fromUserId)}
        </p>
        <p>
          <strong>To:</strong> {String(proposal.toUserId)}
        </p>
        <p>
          <strong>Offered Skill:</strong> {String(proposal.offeredSkillId)}
        </p>
        <p>
          <strong>Requested Skill:</strong> {String(proposal.requestedSkillId)}
        </p>
        <p>
          <strong>Status:</strong> {proposal.status}
        </p>
      </div>

      <TradeProposalActions
        proposalId={proposal._id}
        fromUserId={String(proposal.fromUserId)}
        initialMessage={proposal.message ?? ""}
        initialStatus={proposal.status}
      />
    </div>
  );
}
