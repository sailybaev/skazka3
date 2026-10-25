import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EXAMPLES, type Example } from "@/data/examples";

export default function ExamplePage({ ex, children }: { ex: Example; children?: React.ReactNode }) {
  const prev = EXAMPLES.find((e) => e.step === ex.step - 1);
  const next = EXAMPLES.find((e) => e.step === ex.step + 1);

  return (
    <div className="page reading">
      <div className="steps" aria-label={`Пример ${ex.step} из ${EXAMPLES.length}`}>
        {EXAMPLES.map((e) => (
          <Link key={e.href} href={e.href} className={`step${e.step === ex.step ? " on" : ""}`}>
            <span>{e.step}</span>
            <em>{e.label}</em>
          </Link>
        ))}
      </div>

      <figure className="ex-figure">
        <img src={ex.image} alt={ex.imageAlt} />
        <figcaption className="caption">{ex.credit}</figcaption>
      </figure>

      <header className="stack" style={{ gap: 6 }}>
        <span className="eyebrow">{ex.label}</span>
        <h1 className="h1">{ex.title}</h1>
        <p className="muted">{ex.subtitle}</p>
      </header>

      <div className="prose">
        {ex.story.map((p, k) => (
          <p key={k}>{p}</p>
        ))}
      </div>

      <dl className="facts">
        {ex.breakdown.map((b) => (
          <div key={b.label}>
            <dt>{b.label}</dt>
            <dd>{b.value}</dd>
          </div>
        ))}
      </dl>

      {children}

      <nav className="pager">
        {prev ? (
          <Link href={prev.href} className="btn btn-secondary" aria-label={`Назад: ${prev.label}`}>
            <ArrowLeft size={18} /> <em>{prev.label}</em>
          </Link>
        ) : (
          <span />
        )}
        <Link href={next ? next.href : "/sravnenie/"} className="btn btn-primary">
          {next ? next.label : "Сравнить все три"} <ArrowRight size={18} />
        </Link>
      </nav>
    </div>
  );
}
