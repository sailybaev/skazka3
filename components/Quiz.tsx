"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { Quiz as QuizT } from "@/data/quizzes";

function verdict(pct: number) {
  if (pct >= 90) return "Настоящий знаток сказок!";
  if (pct >= 70) return "Отличный результат!";
  if (pct >= 50) return "Хорошо, но есть что повторить.";
  return "Попробуйте ещё раз — путеводитель поможет.";
}

export function ResultRing({ pct, label }: { pct: number; label: string }) {
  return (
    <div
      className="result-ring"
      style={{ background: `conic-gradient(var(--primary) ${pct * 3.6}deg, rgba(0,0,0,0.06) 0)` }}
      role="img"
      aria-label={`Результат: ${label}`}
    >
      <div>{label}</div>
    </div>
  );
}

export default function Quiz({ quiz, onExit }: { quiz: QuizT; onExit?: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const total = quiz.questions.length;
  const q = quiz.questions[i];

  function pick(k: number) {
    if (picked !== null) return;
    setPicked(k);
    if (k === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= total) setDone(true);
    else {
      setI(i + 1);
      setPicked(null);
    }
  }

  function restart() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="card card-elevated stack" style={{ alignItems: "center", textAlign: "center", gap: 16 }}>
        <ResultRing pct={pct} label={`${score}/${total}`} />
        <h3 className="h2">{verdict(pct)}</h3>
        <p className="muted">
          Правильных ответов: {score} из {total} ({pct}%).
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={restart}>
            <RotateCcw size={18} /> Пройти ещё раз
          </button>
          {onExit && (
            <button className="btn btn-secondary" onClick={onExit}>
              Другие тесты
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card card-elevated stack" style={{ gap: 18 }}>
      <div className="stack" style={{ gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="caption">
          <span>
            Вопрос {i + 1} из {total}
          </span>
          <span>Баллы: {score}</span>
        </div>
        <div className="progress">
          <span style={{ width: `${((i + (picked !== null ? 1 : 0)) / total) * 100}%` }} />
        </div>
      </div>
      <h3 className="h3">{q.q}</h3>
      <div className="stack" style={{ gap: 10 }}>
        {q.options.map((o, k) => {
          let cls = "option";
          if (picked !== null && k === q.answer) cls += " correct";
          else if (picked === k) cls += " wrong";
          return (
            <button key={k} className={cls} onClick={() => pick(k)} disabled={picked !== null}>
              <span className="letter">{String.fromCharCode(1040 + k)}</span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <>
          <div className={`feedback ${picked === q.answer ? "good" : "bad"}`} role="status">
            {picked === q.answer ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <div>
              <strong>{picked === q.answer ? "Верно! " : "Не совсем. "}</strong>
              {q.explain}
            </div>
          </div>
          <div className="btn-row stretch">
            <button className="btn btn-primary" onClick={next}>
              {i + 1 >= total ? "Узнать результат" : "Следующий вопрос"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
