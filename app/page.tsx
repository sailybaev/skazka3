import Link from "next/link";
import { ArrowRight, Columns3, Puzzle } from "lucide-react";
import { EXAMPLES } from "@/data/examples";

export default function Home() {
  return (
    <>
      <section className="hero-band">
        <div className="stars" />
        <div className="hero-band-inner">
          <div className="stack" style={{ gap: 18 }}>
            <h1 className="display-1">Сказки живут всегда</h1>
            <p className="lead">Одна сказка — три формы: народная, современная и созданная ИИ.</p>
            <div className="btn-row stretch">
              <Link href="/narodnaya/" className="btn btn-primary">
                Начать путешествие <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <img
              src="/img/hero.webp"
              srcSet="/img/hero-sm.webp 800w, /img/hero.webp 1600w"
              sizes="(min-width: 900px) 55vw, 100vw"
              alt="Открытая сказочная книга, замок и робот"
            />
          </div>
        </div>
      </section>

      <div className="page">
        <h2 className="h2" style={{ marginBottom: 16 }}>Три формы одной сказки</h2>
        <div className="grid grid-3">
          {EXAMPLES.map((e) => (
            <Link key={e.href} href={e.href} className="card card-banded ex-card">
              <div className="card-img">
                <img src={e.image} alt="" loading="lazy" />
                <span className="ex-num">{e.step}</span>
              </div>
              <div className="card-body">
                <span className="eyebrow">{e.label}</span>
                <h3 className="h3">«{e.title}»</h3>
                <span className="ex-go">
                  Открыть <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-2" style={{ marginTop: 16 }}>
          <Link href="/sravnenie/" className="card tile-link">
            <Columns3 size={22} />
            <span>
              <strong>Сравнение</strong>
              <span className="caption">Что изменилось, а что осталось</span>
            </span>
            <ArrowRight size={18} />
          </Link>
          <Link href="/interaktiv/" className="card tile-link">
            <Puzzle size={22} />
            <span>
              <strong>Интерактив</strong>
              <span className="caption">Игры и тест</span>
            </span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}
