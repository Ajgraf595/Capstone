"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section
        style={{
          display: "grid",
          gap: "1.25rem",
          padding: "2rem 0 1.5rem",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: "2rem",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--muted)",
              fontWeight: 600,
            }}
          >
            Welcome to Quid
          </p>

          <h1
            style={{
              margin: "0.75rem 0 0.5rem",
              fontSize: "2.5rem",
              lineHeight: 1.1,
              color: "var(--primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Trade services — not money.
          </h1>

          <p style={{ margin: 0, color: "var(--muted)", fontSize: "1.05rem" }}>
            Find help, offer skills, and match value fairly. Local or virtual.
          </p>

          {/* SEARCH BAR (UI only for now) */}
          <div
            style={{
              marginTop: "1.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 180px 140px",
              gap: "0.75rem",
            }}
          >
            <input
              placeholder="Search: tutoring, baking, design..."
              style={{
                padding: "0.85rem 1rem",
                borderRadius: 12,
                border: "1px solid var(--border)",
                outline: "none",
                fontSize: "1rem",
              }}
            />

            <select
              defaultValue="nearby"
              style={{
                padding: "0.85rem 1rem",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "#fff",
                fontSize: "1rem",
              }}
            >
              <option value="nearby">Near me</option>
              <option value="virtual">Virtual</option>
            </select>

            <button
              style={{
                padding: "0.85rem 1rem",
                borderRadius: 12,
                border: "none",
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {}}
            >
              Search
            </button>
          </div>

          {/* QUICK LINKS */}
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
            <Link
              href="/signup"
              style={{
                background: "rgba(230, 126, 46, 0.12)",
                color: "var(--primary)",
                border: "1px solid rgba(230, 126, 46, 0.35)",
                padding: "0.55rem 0.8rem",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              Create a profile
            </Link>

            <Link
              href="/login"
              style={{
                background: "rgba(36, 54, 75, 0.06)",
                color: "var(--primary)",
                border: "1px solid rgba(36, 54, 75, 0.12)",
                padding: "0.55rem 0.8rem",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* LISTING GRID (placeholder cards) */}
      <section style={{ paddingBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <h2 style={{ margin: 0, color: "var(--primary)" }}>Popular right now</h2>
          <span style={{ color: "var(--muted)" }}>Browse offers & requests</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            { title: "Custom Cookies", type: "Offer", value: "~$45 value", location: "Mesa, AZ" },
            { title: "Need Help Hanging Shelves", type: "Request", value: "~$60 value", location: "Gilbert, AZ" },
            { title: "Logo Design (Virtual)", type: "Offer", value: "~$80 value", location: "Virtual" },
            { title: "Piano Lessons", type: "Offer", value: "~$50 value", location: "Tempe, AZ" },
            { title: "Need Babysitting (2 hrs)", type: "Request", value: "~$40 value", location: "Mesa, AZ" },
            { title: "Photo Editing (Virtual)", type: "Offer", value: "~$35 value", location: "Virtual" },
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: card.type === "Offer" ? "var(--primary)" : "var(--muted)",
                    background: "rgba(36, 54, 75, 0.06)",
                    padding: "0.25rem 0.55rem",
                    borderRadius: 999,
                  }}
                >
                  {card.type}
                </span>

                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: "var(--accent)",
                  }}
                >
                  {card.value}
                </span>
              </div>

              <h3 style={{ margin: "0.6rem 0 0.35rem", color: "var(--primary)" }}>
                {card.title}
              </h3>

              <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.95rem" }}>
                {card.location}
              </p>

              <button
                style={{
                  marginTop: "0.9rem",
                  width: "100%",
                  padding: "0.7rem 0.9rem",
                  borderRadius: 12,
                  border: "1px solid rgba(36, 54, 75, 0.18)",
                  background: "#fff",
                  color: "var(--primary)",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                View details
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}