import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type Skill = {
  _id: string;
  title?: string;
  name?: string;
  description?: string;
  type?: string;
};

async function getSkill(id: string): Promise<Skill | null> {
  const h = await headers();
  const host = h.get("host");
  if (!host) return null;

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/skills/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) return null;

  const data = (await res.json()) as any;
  return (data?.skill ?? null) as Skill | null;
}

export default async function SkillDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const skill = await getSkill(params.id);
  if (!skill) notFound();

  const title = String(skill.title ?? skill.name ?? "Untitled skill");
  const description = String(skill.description ?? "");
  const type = String(skill.type ?? "");

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <Link href={`/skills/${String(skill._id)}`}>...</Link>

      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16 }}>{title}</h1>

      {type && (
        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>{type}</div>
      )}

      {description && <p style={{ marginTop: 12 }}>{description}</p>}
    </main>
  );
}