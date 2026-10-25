import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { nextStation } from "@/data/nav";
import { Icon } from "./Icon";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  text,
  image,
  alt,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  text?: string;
  image?: string;
  alt?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-hero">
      <div className="page-hero-text">
        {eyebrow && <span className="badge">{eyebrow}</span>}
        <h1 className="h1">{title}</h1>
        {subtitle && (
          <p className="title" style={{ color: "var(--primary)" }}>
            {subtitle}
          </p>
        )}
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
      {image && (
        <div className="page-hero-img">
          <img src={image} alt={alt ?? ""} />
        </div>
      )}
    </header>
  );
}

export function SectionHead({ title, text, eyebrow }: { title: string; text?: string; eyebrow?: string }) {
  return (
    <div className="section-head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {text && <p className="muted">{text}</p>}
    </div>
  );
}

export function NextStation({ from }: { from: string }) {
  const next = nextStation(from);
  if (!next) return null;
  return (
    <Link href={next.href} className="next-station">
      <div>
        <div className="eyebrow">Следующая станция</div>
        <div className="h3" style={{ marginTop: 4 }}>
          {next.label}
        </div>
        <div className="caption">{next.short}</div>
      </div>
      <ArrowRight size={22} style={{ color: "var(--primary)", flex: "none" }} />
    </Link>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Навигация">
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <ChevronRight size={14} />}
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function Sticker({ icon, color, size = 44 }: { icon: string; color: string; size?: number }) {
  return (
    <span
      className="sticker"
      aria-hidden
      style={{ background: color, width: size, height: size }}
    >
      <Icon name={icon} size={Math.round(size * 0.5)} />
    </span>
  );
}

export function Bars({ rows, color = "var(--teal)" }: { rows: { label: string; value: number; note?: string }[]; color?: string }) {
  return (
    <div className="bars">
      {rows.map((r) => (
        <div className="bar-row" key={r.label} title={`${r.label}: ${r.value}%${r.note ? ` (${r.note})` : ""}`}>
          <span>
            {r.label}
            {r.note && <span className="caption"> · {r.note}</span>}
          </span>
          <span className="bar-val">{r.value}%</span>
          <div className="bar-track" role="presentation">
            <div className="bar-fill" style={{ width: `${r.value}%`, background: color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
