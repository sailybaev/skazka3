"use client";

import { useState } from "react";
import { COLUMNS, COMPARE } from "@/data/compare";

// На телефоне показываем один критерий за раз вместо длинной таблицы.
export default function CompareMobile() {
  const [i, setI] = useState(0);
  const row = COMPARE[i];
  return (
    <div className="stack compare-cards" style={{ gap: 12 }}>
      <div className="tabs" role="tablist" aria-label="Критерий">
        {COMPARE.map((r, k) => (
          <button key={r.criterion} role="tab" className="tab" aria-selected={k === i} onClick={() => setI(k)}>
            {r.criterion}
          </button>
        ))}
      </div>
      <div className="card stack" style={{ gap: 14 }}>
        {COLUMNS.map((c) => (
          <div key={c.key} style={{ display: "flex", gap: 10 }}>
            <span className="dot" style={{ background: c.color, marginTop: 7 }} />
            <div>
              <div className="caption">{c.title}</div>
              <div style={{ fontSize: 17 }}>{row[c.key]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
