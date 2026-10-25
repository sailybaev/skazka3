import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GAMES } from "@/data/interactive";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Интерактив" };

export default function Interaktiv() {
  return (
    <div className="page" style={{ maxWidth: 860 }}>
      <h1 className="h1">Интерактив</h1>
      <p className="lead" style={{ marginTop: 8 }}>Выбери задание.</p>
      <div className="grid grid-2" style={{ marginTop: 24 }}>
        {GAMES.map((g) => (
          <Link key={g.href} href={g.href} className="card tile-link game-tile">
            <span className="sticker" style={{ background: g.color }} aria-hidden><Icon name={g.icon} size={24} /></span>
            <span>
              <strong className="title">{g.title}</strong>
              <span className="caption">{g.text}</span>
            </span>
            <ArrowRight size={18} />
          </Link>
        ))}
      </div>
    </div>
  );
}
