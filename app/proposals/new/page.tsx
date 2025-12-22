"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProposalPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [requested, setRequested] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          offer,
          requested,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create proposal");
      }

      router.push("/proposals");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>New Proposal</h1>

      {error && (
        <div style={{ marginTop: 12, color: "red" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Title*
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Description*
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: 8, minHeight: 100 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            What I’m offering
            <input
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            What I’m requesting
            <input
              value={requested}
              onChange={(e) => setRequested(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ padding: 10, fontWeight: 600 }}
        >
          {isSubmitting ? "Creating..." : "Create Proposal"}
        </button>
      </form>
    </div>
  );
}