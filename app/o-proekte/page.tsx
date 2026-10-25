import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AUTHORS, SOURCES, STAGES, TASKS, THEORY } from "@/data/research";
import { PageHero, SectionHead } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "О проекте" };

export default function OProekte() {
  return (
    <div className="page">
      <PageHero
        eyebrow="Исследовательский проект · Литература"
        title="Почему сказки остаются популярными в цифровую эпоху?"
        subtitle="От народных историй до искусственного интеллекта"
        text="«Сказка 3.0» — практический продукт проекта: цифровой путеводитель, который показывает одну сказочную традицию в трёх формах."
        image="/img/guide.webp"
        alt="Путеводитель «Сказка 3.0» на ноутбуке и планшете"
      />

      <section className="section">
        <div className="grid grid-2">
          {AUTHORS.map((a) => (
            <div className="card" key={a.role} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span className="sticker" style={{ background: "#e2f0fc" }} aria-hidden>
                <Icon name={a.icon} size={24} />
              </span>
              <span className="stack" style={{ gap: 2 }}>
                <span className="eyebrow">{a.role}</span>
                <strong className="title">{a.name}</strong>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Цель и гипотеза" />
        <div className="grid grid-2">
          <div className="card stack" style={{ gap: 8 }}>
            <span className="eyebrow">Цель</span>
            <p>
              Определить, какие особенности помогают сказке сохранять популярность среди современных школьников и как
              жанр меняется в цифровой среде.
            </p>
          </div>
          <div className="card stack" style={{ gap: 8 }}>
            <span className="eyebrow">Гипотеза</span>
            <p>
              Сказки остаются популярными не из-за старинной формы, а благодаря понятным темам: выбору,
              ответственности, дружбе, справедливости, страху, испытанию и победе над трудностями.
            </p>
          </div>
          <div className="card stack" style={{ gap: 8 }}>
            <span className="eyebrow">Объект и предмет</span>
            <p>
              Объект — сказка как литературный жанр в традиционной и современной культуре. Предмет — герой, конфликт,
              испытание, фантастика и нравственный выбор.
            </p>
          </div>
          <div className="card stack" style={{ gap: 8 }}>
            <span className="eyebrow">Новизна</span>
            <p>
              По одинаковым критериям сопоставлены три формы сказки: народная, современная экранная и созданная ИИ.
              Дополнительно проверено, могут ли школьники отличить ИИ-текст от текста человека.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead title="Задачи исследования" />
        <ol className="card list" style={{ paddingLeft: 40 }}>
          {TASKS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <p className="caption" style={{ marginTop: 20 }}>Логика исследования</p>
        <div className="chips" style={{ alignItems: "center", marginTop: 8 }}>
          {STAGES.map((s, i) => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span className="chip" style={{ cursor: "default", fontWeight: 600 }}>{s}</span>
              {i < STAGES.length - 1 && <ArrowRight size={14} style={{ color: "var(--ink-faint)" }} />}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Теоретическая основа" />
        <div className="grid grid-3">
          {THEORY.map((t) => (
            <div className="card stack" key={t.name} style={{ gap: 8 }}>
              <h3 className="title">{t.name}</h3>
              <p className="muted">{t.text}</p>
            </div>
          ))}
        </div>
        <Link href="/rezultaty/" className="card tile-link" style={{ marginTop: 16 }}>
          <Icon name="chart" size={22} />
          <span>
            <strong>Результаты исследования</strong>
            <span className="caption">Анкетирование, эксперимент «Человек или ИИ?» и выводы</span>
          </span>
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className="section" id="istochniki" style={{ scrollMarginTop: 72 }}>
        <SectionHead title="Источники" />
        <ol className="card list caption" style={{ paddingLeft: 40 }}>
          {SOURCES.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
