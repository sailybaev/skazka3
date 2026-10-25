"use client";

import { useState } from "react";
import { Bot, CheckCircle2, PenLine, RotateCcw, XCircle } from "lucide-react";
import { GUESS } from "@/data/games";
import { ResultRing } from "./Quiz";

type Answer = "human" | "ai";

export default function GuessGame() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Answer | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const total = GUESS.length;
  const item = GUESS[i];

  function pick(a: Answer) {
    if (picked) return;
    setPicked(a);
    if (a === item.author) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= total) setDone(true);
    else {
      setI(i + 1);
      setPicked(null);
    }
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="card card-elevated stack" style={{ alignItems: "center", textAlign: "center", gap: 16 }}>
        <ResultRing pct={pct} label={`${score}/${total}`} />
        <h3 className="h2">{pct >= 75 ? "У вас отличное чутьё!" : pct >= 50 ? "Неплохо!" : "Это действительно непросто"}</h3>
        <p className="muted" style={{ maxWidth: 520 }}>
          Ваш результат — {pct}%. В эксперименте восьмиклассники верно определили происхождение текста в 65% случаев, а
          все шесть текстов угадали только 3 человека из 20.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setI(0);
            setPicked(null);
            setScore(0);
            setDone(false);
          }}
        >
          <RotateCcw size={18} /> Сыграть ещё раз
        </button>
      </div>
    );
  }

  const right = picked === item.author;
  return (
    <div className="card card-elevated stack" style={{ gap: 18 }}>
      <div className="stack" style={{ gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }} className="caption">
          <span>
            Текст {i + 1} из {total}
          </span>
          <span>Баллы: {score}</span>
        </div>
        <div className="progress">
          <span style={{ width: `${((i + (picked ? 1 : 0)) / total) * 100}%` }} />
        </div>
      </div>
      <blockquote className="text-sample" style={{ margin: 0 }}>
        {item.text}
      </blockquote>
      <p className="title" style={{ textAlign: "center" }}>
        Кто написал этот текст?
      </p>
      <div className="grid grid-2" style={{ gap: 10 }}>
        {(
          [
            { a: "human", label: "Человек", icon: <PenLine size={20} /> },
            { a: "ai", label: "Искусственный интеллект", icon: <Bot size={20} /> },
          ] as const
        ).map((b) => {
          let cls = "option";
          if (picked && b.a === item.author) cls += " correct";
          else if (picked === b.a) cls += " wrong";
          return (
            <button
              key={b.a}
              className={cls}
              style={{ justifyContent: "center", alignItems: "center", fontWeight: 600, minHeight: 60 }}
              onClick={() => pick(b.a)}
              disabled={!!picked}
            >
              {b.icon} {b.label}
            </button>
          );
        })}
      </div>
      {picked && (
        <>
          <div className={`feedback ${right ? "good" : "bad"}`} role="status">
            {right ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <div className="stack" style={{ gap: 4 }}>
              <span>
                <strong>{right ? "Верно! " : "Не угадали. "}</strong>
                Это {item.author === "human" ? "текст человека" : "текст ИИ"}: {item.source}.
              </span>
              <span className="muted">{item.why}</span>
            </div>
          </div>
          <div className="btn-row stretch">
            <button className="btn btn-primary" onClick={next}>
              {i + 1 >= total ? "Узнать результат" : "Следующий текст"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
