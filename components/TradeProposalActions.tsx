"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type MeResponse =
  | { user: null }
  | { user: { userId: string; email: string } };

type Props = {
  proposalId: string;
  fromUserId: string; // owner (sender)
  initialMessage?: string;
  initialStatus: "PENDING" | "ACCEPTED" | "DECLINED";
};

export default function TradeProposalActions({
  proposalId,
  fromUserId,
  initialMessage = "",
  initialStatus,
}: Props) {
  const router = useRouter();

  const [me, setMe] = useState<MeResponse>({ user: null });
  const [loadingMe, setLoadingMe] = useState(true);

  const [message, setMessage] = useState(initialMessage);
  const [status, setStatus] = useState(initialStatus);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMe() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data = (await res.json()) as MeResponse;
        if (!cancelled) setMe(data);
      } catch {
        if (!cancelled) setMe({ user: null });
      } finally {
        if (!cancelled) setLoadingMe(false);
      }
    }

    loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  const isOwner = useMemo(() => {
    if (!("user" in me) || !me.user) return false;
    return me.user.userId === fromUserId;
  }, [me, fromUserId]);

  async function onSaveMessage() {
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/proposals/${proposalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Could not update message.");
        return;
      }

      // keep local state in sync
      setMessage(data.proposal?.message ?? message);
      setStatus(data.proposal?.status ?? status);

      setSuccess("Updated message.");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    setError(null);
    setSuccess(null);

    const ok = confirm("Cancel this trade proposal? This cannot be undone.");
    if (!ok) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/proposals/${proposalId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Could not delete proposal.");
        return;
      }

      // redirect back to list
      router.push("/proposals");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section
      style={{
        marginTop: 24,
        padding: 16,
        border: "1px solid var(--border)",
        borderRadius: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
            Actions
          </h3>
          <p style={{ margin: "6px 0 0", opacity: 0.8 }}>
            Status: <strong>{status}</strong>
          </p>
        </div>
        <div style={{ opacity: 0.8, fontSize: 13 }}>
          {loadingMe
            ? "Checking session…"
            : me.user
            ? `Signed in as ${me.user.email}`
            : "Not signed in"}
        </div>
      </div>

      {!me.user && !loadingMe && (
        <p style={{ marginTop: 12 }}>
          Log in to edit or cancel your trade proposal.
        </p>
      )}

      {me.user && !isOwner && (
        <p style={{ marginTop: 12 }}>
          You’re signed in, but you’re not the owner of this proposal.
        </p>
      )}

      <div style={{ marginTop: 14 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid var(--border)",
          }}
          disabled={!isOwner || status !== "PENDING" || saving || deleting}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button
            onClick={onSaveMessage}
            disabled={!isOwner || status !== "PENDING" || saving || deleting}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {saving ? "Saving…" : "Save message"}
          </button>

          <button
            onClick={onDelete}
            disabled={!isOwner || deleting}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {deleting ? "Cancelling…" : "Cancel trade"}
          </button>
        </div>

        {status !== "PENDING" && (
          <p style={{ marginTop: 10, opacity: 0.8 }}>
            This proposal is not PENDING, so edits are disabled.
          </p>
        )}

        {error && (
          <p style={{ marginTop: 10, color: "crimson", fontWeight: 600 }}>
            {error}
          </p>
        )}
        {success && (
          <p style={{ marginTop: 10, color: "green", fontWeight: 600 }}>
            {success}
          </p>
        )}
      </div>
    </section>
  );
}