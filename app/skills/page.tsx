import Link from "next/link";
import { headers } from "next/headers";

type SkillFromApi = {
  _id: string;
  title?: string;
  description?: string;
  type?: "OFFER" | "REQUEST";
  createdAt?: string;
};

type SkillUI = {
  id: string;
  title: string;
  description: string;
  type: "OFFER" | "REQUEST" | "";
  createdAt: string;
};

async function getSkills(): Promise<SkillUI[]> {
  const h = await headers();
  const host = h.get("host"); // e.g. localhost:3000
  if (!host) return [];

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/skills`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = (await res.json()) as { skills?: SkillFromApi[] };
  const skills = data.skills ?? [];

  return skills.map((s) => ({
    id: String(s._id),
    title: String(s.title ?? "").trim(),
    description: String(s.description ?? "").trim(),
    type: (s.type ?? "") as SkillUI["type"],
    createdAt: String(s.createdAt ?? ""),
  }));
}

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <main style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 1.25rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Skills</h1>

        <Link href="/skills/new" style={{ fontWeight: 600 }}>
          + New Skill
        </Link>
      </div>

      <p style={{ marginTop: 10, opacity: 0.75 }}>
        Browse posted skills (offers + requests).
      </p>

      <div style={{ marginTop: 16 }}>
        {skills.length === 0 ? (
          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <p style={{ margin: 0 }}>No skills yet. Create your first one!</p>
          </div>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 12,
            }}
          >
            {skills.map((skill) => (
              <li
                key={skill.id}
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "baseline",
                  }}
                >
                  <Link
                    href={`/skills/${skill.id}`}
                    style={{ fontWeight: 800, textDecoration: "none" }}
                  >
                    {skill.title || "Untitled skill"}
                  </Link>

                  {skill.type && (
                    <span style={{ fontSize: 12, opacity: 0.75 }}>
                      {skill.type}
                    </span>
                  )}
                </div>

                {skill.description && (
                  <p style={{ marginTop: 8, marginBottom: 0 }}>
                    {skill.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}