"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main style={{ maxWidth: 460, margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ fontSize: 30, fontWeight: 800 }}>Log In</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 18, display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid var(--border)" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 12, borderRadius: 10, border: "1px solid var(--border)" }}
        />

        {error && <div style={{ color: "crimson" }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "none",
            fontWeight: 800,
            background: "var(--primary)",
            color: "#fff",
          }}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </main>
  );
}