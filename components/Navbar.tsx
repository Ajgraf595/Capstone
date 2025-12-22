"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const linkStyle = (active: boolean) => ({
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    fontWeight: active ? 600 : 500,
    color: active ? "var(--primary)" : "var(--muted)",
    background: active ? "rgba(36, 54, 75, 0.08)" : "transparent",
    textDecoration: "none",
  });

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0.75rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <img
    src="/logos/quid-logo.png"
    alt="Quid logo"
    style={{ height: 32 }}
  />
</Link>


        {/* Main nav */}
        <nav style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Link href="/" style={linkStyle(pathname === "/")}>
            Home
          </Link>

          <Link href="/dashboard" style={linkStyle(pathname === "/dashboard")}>
            Dashboard
          </Link>

          <Link href="/skills" style={linkStyle(pathname.startsWith("/skills"))}>
            Skills
          </Link>

          <Link
            href="/proposals"
            style={linkStyle(pathname.startsWith("/proposals"))}
          >
            Proposals
          </Link>

          {/* Auth state (Context API demo) */}
          {loading ? (
            <span style={{ fontSize: 12, opacity: 0.7, marginLeft: 8 }}>
              Loading…
            </span>
          ) : user ? (
            <span style={{ fontSize: 12, fontWeight: 600, marginLeft: 8 }}>
              {user.email}
            </span>
          ) : (
            <>
              <Link href="/login" style={linkStyle(pathname === "/login")}>
                Log In
              </Link>
              <Link href="/signup" style={linkStyle(pathname === "/signup")}>
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* CTA */}
        <Link
          href="/signup"
          style={{
            background: "var(--accent)",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "10px",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}