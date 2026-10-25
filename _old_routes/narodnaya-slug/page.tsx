import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FOLK_TALES } from "@/data/tales";
import { Breadcrumbs } from "@/components/ui";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FOLK_TALES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tale = FOLK_TALES.find((t) => t.slug === slug);
  return { title: tale?.title ?? "Сказка" };
}

export default async function TalePage({ params }: Params) {
  const { slug } = await params;
  const i = FOLK_TALES.findIndex((t) => t.slug === slug);
  if (i < 0) notFound();
  const tale = FOLK_TALES[i];

  return (
    <div className="page" style={{ maxWidth: 820 }}>
      <Breadcrumbs items={[{ href: "/narodnaya/", label: "Народная сказка" }, { label: tale.title }]} />
      <figure style={{ margin: 0 }}>
        <div className="page-hero-img" style={{ aspectRatio: "4 / 3" }}>
          <img src={tale.image} alt={tale.imageAlt} style={{ objectPosition: "center 30%" }} />
        </div>
        <figcaption className="caption" style={{ marginTop: 8 }}>{tale.imageCredit}</figcaption>
      </figure>
      <div className="stack" style={{ marginTop: 24, gap: 10 }}>
        <div className="chips">
          <span className="tag">{tale.origin}</span>
          <span className="tag">{tale.kind}</span>
        </div>
        <h1 className="h1">{tale.title}</h1>
        <p className="lead">{tale.summary}</p>
      </div>

      <article className="prose" style={{ marginTop: 32 }}>
        <p className="eyebrow" style={{ marginBottom: 12 }}>Краткий пересказ</p>
        {tale.text.map((p, k) => (
          <p key={k}>{p}</p>
        ))}
      </article>

      <section className="card" style={{ marginTop: 40 }}>
        <h2 className="h3" style={{ marginBottom: 16 }}>Разбор сказки</h2>
        <dl className="kv" style={{ margin: 0 }}>
          <div><dt>Герой</dt><dd>{tale.hero}</dd></div>
          <div><dt>Конфликт</dt><dd>{tale.conflict}</dd></div>
          <div><dt>Испытание</dt><dd>{tale.trial}</dd></div>
          <div><dt>Фантастика</dt><dd>{tale.magic}</dd></div>
          <div><dt>Выбор героя</dt><dd>{tale.choice}</dd></div>
          <div><dt>Нравственный смысл</dt><dd>{tale.lesson}</dd></div>
        </dl>
        <div className="chips" style={{ marginTop: 18 }}>
          {tale.values.map((v) => (
            <span key={v} className="badge">{v}</span>
          ))}
        </div>
      </section>

      <div className="btn-row" style={{ marginTop: 32, justifyContent: "space-between" }}>
        <Link href="/narodnaya/" className="btn btn-utility">
          <ArrowLeft size={16} /> Народная сказка
        </Link>
        <Link href="/sovremennye/" className="btn btn-utility">
          Современная версия <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
