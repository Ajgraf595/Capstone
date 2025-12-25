"use client";

import { useState } from "react";
import Link from "next/link";

type SignupResponse =
  | { user: { id: string; email?: string; name?: string } }
  | { error: string };

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdUserId, setCreatedUserId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreatedUserId(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim(),
          password,
        }),
      });

      const data = (await res.json()) as SignupResponse;

      if (!res.ok) {
        setError("error" in data ? data.error : "Signup failed.");
        return;
      }

      // success
      if ("user" in data) {
        setCreatedUserId(data.user.id);
      } else {
        setCreatedUserId("created");
      }

      // optional: clear fields
      // setName(""); setEmail(""); setPassword("");
    } catch {
      setError("Network error. Is the dev server running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 520, margin: "2rem auto", padding: "0 1.25rem" }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Sign up</h1>
      <p style={{ marginTop: 8, opacity: 0.75 }}>
        Create an account to post and manage your skills.
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          marginTop: 16,
          border: "1px solid #e5e5e5",
          borderRadius: 12,
          padding: 16,
          display: "grid",
          gap: 12,
        }}
      >
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Name (optional)</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ali"
            autoComplete="name"
            style={{
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            style={{
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            autoComplete="new-password"
            style={{
              padding: "10px 12px",
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          />
          <span style={{ fontSize: 12, opacity: 0.7 }}>
            Use at least 8 characters.
          </span>
        </label>

        {error && (
          <div
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #f3c2c2",
            }}
          >
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {createdUserId && (
          <div
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #cfe9cf",
            }}
          >
            <p style={{ margin: 0 }}>
              Account created!{" "}
              <Link href="/login" style={{ fontWeight: 700 }}>
                Log in
              </Link>
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ fontWeight: 700 }}>
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}