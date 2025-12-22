export default function DashboardPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 1.25rem" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>Dashboard</h1>
      <p style={{ marginTop: 8, color: "var(--muted)" }}>
        You’re logged in. Next: add skills + proposals.
      </p>
    </main>
  );
}