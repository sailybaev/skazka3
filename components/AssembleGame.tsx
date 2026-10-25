"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, RotateCcw, Shuffle, XCircle } from "lucide-react";
import { PUZZLES } from "@/data/games";
import { Icon } from "./Icon";

function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, k) => k);
  do {
    for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [a[k], a[j]] = [a[j], a[k]];
    }
  } while (a.every((v, k) => v === k));
  return a;
}

export default function AssembleGame() {
  const [pid, setPid] = useState(PUZZLES[0].id);
  const puzzle = PUZZLES.find((p) => p.id === pid)!;
  // pool — индексы фрагментов в перемешанном порядке, placed — собранная последовательность
  const [pool, setPool] = useState<number[]>(() => puzzle.parts.map((_, k) => k));
  const [placed, setPlaced] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  function reset(id = pid) {
    const p = PUZZLES.find((x) => x.id === id)!;
    setPool(shuffled(p.parts.length));
    setPlaced([]);
    setChecked(false);
  }

  // Перемешиваем только на клиенте, чтобы не было расхождения при гидрации.
  useEffect(() => reset(pid), [pid]); // eslint-disable-line react-hooks/exhaustive-deps

  function place(k: number) {
    setChecked(false);
    setPool((p) => p.filter((x) => x !== k));
    setPlaced((p) => [...p, k]);
  }

  function unplace(k: number) {
    setChecked(false);
    setPlaced((p) => p.filter((x) => x !== k));
    setPool((p) => [...p, k]);
  }

  const complete = pool.length === 0;
  const correctCount = placed.filter((v, k) => v === k).length;
  const solved = checked && correctCount === puzzle.parts.length;

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="tabs" role="tablist" aria-label="Выбор сказки">
        {PUZZLES.map((p) => (
          <button key={p.id} role="tab" aria-selected={p.id === pid} className="tab" onClick={() => setPid(p.id)}>
            <Icon name={p.icon} size={16} /> {p.title}
          </button>
        ))}
      </div>

      <div className="card card-elevated stack" style={{ gap: 18 }}>
        <div>
          <h3 className="h3">{puzzle.title}</h3>
          <p className="muted">{puzzle.hint}</p>
        </div>

        <div className="stack" style={{ gap: 8 }}>
          <span className="eyebrow">Ваша сказка</span>
          {placed.length === 0 && <div className="slot-empty">Здесь появятся выбранные фрагменты</div>}
          {placed.map((k, pos) => {
            let cls = "fragment placed";
            if (checked) cls += k === pos ? " ok" : " bad";
            return (
              <button key={k} className={cls} onClick={() => unplace(k)} disabled={solved}>
                <span className="num">{pos + 1}</span>
                <span>{puzzle.parts[k]}</span>
              </button>
            );
          })}
        </div>

        {pool.length > 0 && (
          <div className="stack" style={{ gap: 8 }}>
            <span className="eyebrow">Фрагменты</span>
            {pool.map((k) => (
              <button key={k} className="fragment" onClick={() => place(k)}>
                <span className="num">+</span>
                <span>{puzzle.parts[k]}</span>
              </button>
            ))}
          </div>
        )}

        {checked && (
          <div className={`feedback ${solved ? "good" : "bad"}`} role="status">
            {solved ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <div>
              {solved
                ? "Сказка собрана верно! Сюжетная цепочка восстановлена."
                : `На своём месте ${correctCount} из ${puzzle.parts.length}. Нажмите на фрагменты, отмеченные оранжевым, и попробуйте снова.`}
            </div>
          </div>
        )}

        <div className="btn-row stretch">
          <button className="btn btn-primary" disabled={!complete || solved} onClick={() => setChecked(true)}>
            Проверить
          </button>
          <button className="btn btn-secondary" onClick={() => reset()}>
            {solved ? <RotateCcw size={18} /> : <Shuffle size={18} />} {solved ? "Ещё раз" : "Перемешать"}
          </button>
        </div>
      </div>
    </div>
  );
}
