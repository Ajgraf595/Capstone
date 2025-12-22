import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type React from "react";

type SkillFromApi = {
  _id: string;
  name?: string;
  title?: string; // in case your API uses title instead of name
  description?: string;
  type?: string;
  createdAt?: string;
};

type SkillUI = {
  id: string;
  title: string;
  description: string;
  type: string;
  createdAt?: string;
};

function hasSkill(x: unknown): x is { skill: SkillFromApi } {
  if (!x || typeof x !== "object") return false;
  return "skill" in x;
}

async function getSkill(id: string): Promise<SkillUI | null> {
  const h = await headers();
  const host = h.get("host");
  if (!host) return null;

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/skills/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) return null;

  const json: unknown = await res.json();
  if (!hasSkill(json) || !json.skill) return null;

  const s = json.skill;

  return {
    id: String(s._id),
    title: String(s.name ?? s.title ?? "Untitled skill"),
    description: String(s.description ?? ""),
    type: String(s.type ?? ""),
    createdAt: s.createdAt ? String(s.createdAt) : undefined,
  };
}

export default async function SkillDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const skill = await getSkill(params.id);

  if (!skill) notFound();

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <Link href="/skills" style={{ textDecoration: "none" }}>
          ← Back
        </Link>

        <Link href={`/skills/${skill.id}/edit`} style={{ fontWeight: 600 }}>
          Edit
        </Link>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16 }}>
        {skill.title}
      </h1>

      {skill.type && (
        <span
          style={{
            display: "inline-block",
            marginTop: 6,
            fontSize: 12,
            color: "var(--muted)" as React.CSSProperties["color"],
          }}
        >
          {skill.type}
        </span>
      )}

      {skill.description && (
        <p style={{ marginTop: 12, lineHeight: 1.5 }}>{skill.description}</p>
      )}
    </main>
  );
}