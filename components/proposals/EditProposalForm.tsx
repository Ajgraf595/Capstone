"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  proposalId: string;
  initialTitle: string;
  initialDescription: string;
  initialOffer?: string;
  initialRequested?: string;
};

export default function EditProposalForm({
  proposalId,
  initialTitle,
  initialDescription,
  initialOffer = "",
  initialRequested = "",
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [offer, setOffer] = useState(initialOffer);
  const [requested, setRequested] = useState(initialRequested);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      offer: offer.trim(),
      requested: requested.trim(),
    };

    if (!payload.title || !payload.description) {
      setError("Title and description are required.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`/api/proposals/${proposalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        throw new Error("You must be logged in to edit a proposal.");
      }

      if (res.status === 403) {
        throw new Error("You can only edit your own proposal.");
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to save changes.");
      }

      router.push(`/proposals/${proposalId}`);
      router.refresh();
    } catch (err: any) {
      setError(err?.message ?? "Save failed.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontWeight: 700 }}>Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid var(--border)",
          }}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontWeight: 700 }}>Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid var(--border)",
          }}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontWeight: 700 }}>Offer</span>
        <input
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid var(--border)",
          }}
        />
      </label>

      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontWeight: 700 }}>Requested</span>
        <input
          value={requested}
          onChange={(e) => setRequested(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid var(--border)",
          }}
        />
      </label>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          type="submit"
          disabled={isSaving}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "transparent",
            cursor: isSaving ? "not-allowed" : "pointer",
            fontWeight: 800,
          }}
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>

        <button
          type="button"
          onClick={() => router.push(`/proposals/${proposalId}`)}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>

      {error && <div style={{ fontSize: 13, color: "crimson" }}>{error}</div>}
    </form>
  );
}