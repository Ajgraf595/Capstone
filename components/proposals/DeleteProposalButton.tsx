"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  proposalId: string;
};

export default function DeleteProposalButton({ proposalId }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const ok = window.confirm("Delete this proposal? This cannot be undone.");
    if (!ok) return;

    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/proposals/${proposalId}`, {
        method: "DELETE",
      });

      if (res.status === 401) {
        throw new Error("You must be logged in to delete a proposal.");
      }

      if (res.status === 403) {
        throw new Error("You can only delete your own proposal.");
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to delete proposal.");
      }

      router.push("/proposals");
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Delete failed.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "transparent",
          fontWeight: 700,
          cursor: isDeleting ? "not-allowed" : "pointer",
        }}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <div style={{ fontSize: 13, color: "crimson" }}>
          {error}
        </div>
      )}
    </div>
  );
}