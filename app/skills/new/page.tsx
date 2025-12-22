"use client";

import { useState } from "react";

export default function NewSkillPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"OFFER" | "REQUEST">("OFFER");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Skill creation wired — DB next.");
  }

  return (
    <main style={{ maxWidth: 700, margin: "2rem auto", padding: "0 1.25rem" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>Add Skill</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 20, display: "grid", gap: 12 }}>
        <input
          placeholder="Skill title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid var(--border)" }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: 12, borderRadius: 10, border: "1px solid var(--border)" }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          style={{ padding: 12, borderRadius: 10 }}
        >
          <option value="OFFER">Offer</option>
          <option value="REQUEST">Request</option>
        </select>

        <button
          type="submit"
          style={{
            padding: 12,
            borderRadius: 10,
            border: "none",
            fontWeight: 800,
            background: "var(--primary)",
            color: "#fff",
          }}
        >
          Save Skill
        </button>
      </form>
    </main>
  );
}