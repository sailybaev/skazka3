import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CHAIN, COLUMNS, COMPARE } from "@/data/compare";
import { NextStation } from "@/components/ui";
import CompareMobile from "@/components/CompareMobile";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Сравнительная таблица" };

export default function Sravnenie() {
  return (
    <div className="page" style={{ maxWidth: 960 }}>
      <span className="eyebrow">Сравнительная таблица сказочных текстов</span>
      <h1 className="h1" style={{ marginTop: 4 }}>Один сказочный принцип — три формы</h1>
      <p className="lead" style={{ marginTop: 8 }}>Народная сказка, современная версия и ИИ-сказка по одинаковым критериям.</p>
      <p className="caption" style={{ marginTop: 20 }}>Главная схема сравнения</p>
      <div className="chips" style={{ alignItems: "center", marginTop: 8 }}>
        {CHAIN.map((c, i) => (
          <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span className="chip" style={{ cursor: "default", fontWeight: 600 }}>{c}</span>
            {i < CHAIN.length - 1 && <ArrowRight size={14} style={{ color: "var(--ink-faint)" }} />}
          </span>
        ))}
      </div>

      <section style={{ marginTop: 24 }}>
        <div className="table-wrap compare-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Критерий</th>
                {COLUMNS.map((c) => (
                  <th scope="col" key={c.key}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span className="dot" style={{ background: c.color }} />
                      {c.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.criterion}>
                  <th scope="row">
                    <Icon name={r.icon} size={16} /> {r.criterion}
                  </th>
                  <td>{r.folk}</td>
                  <td>{r.modern}</td>
                  <td>{r.ai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CompareMobile />
      </section>

      <div className="callout" style={{ marginTop: 16 }}>
        <p>
          <strong>Вывод:</strong> меняются декорации, язык и темп. Сохраняются герой, конфликт, испытание и выбор,
          который определяет итог.
        </p>
      </div>

      <NextStation from="/sravnenie/" />
    </div>
  );
}
