import type { Metadata } from "next";
import { FACTS } from "@/data/facts";
import { Sticker } from "@/components/ui";

export const metadata: Metadata = { title: "Факты" };

export default function Fakty() {
  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <h1 className="h1">Интересные факты</h1>
      <div className="stack" style={{ marginTop: 24, gap: 12 }}>
        {FACTS.map((f) => (
          <article key={f.title} className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Sticker icon={f.icon} color={f.color} />
            <div className="stack" style={{ gap: 4 }}>
              <h2 className="title" style={{ fontSize: 17 }}>{f.title}</h2>
              <p className="muted" style={{ fontSize: 15 }}>{f.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
