"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TESTS } from "@/data/quizzes";
import Quiz from "./Quiz";
import { Icon } from "./Icon";

export default function TestsHub() {
  const [active, setActive] = useState<string | null>(null);
  const quiz = TESTS.find((t) => t.id === active);

  if (quiz) {
    return (
      <div className="stack" style={{ gap: 16, maxWidth: 760 }}>
        <button className="btn btn-utility" style={{ width: "fit-content" }} onClick={() => setActive(null)}>
          <ArrowLeft size={16} /> Все тесты
        </button>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="sticker" style={{ background: quiz.color }} aria-hidden>
            <Icon name={quiz.icon} size={22} />
          </span>
          <h2 className="h2">{quiz.title}</h2>
        </div>
        <Quiz key={quiz.id} quiz={quiz} onExit={() => setActive(null)} />
      </div>
    );
  }

  return (
    <div className="grid grid-3">
      {TESTS.map((t) => (
        <button
          key={t.id}
          className="card card-banded"
          style={{ textAlign: "left", cursor: "pointer", font: "inherit" }}
          onClick={() => {
            setActive(t.id);
            window.scrollTo({ top: 0 });
          }}
        >
          <div className="card-band" style={{ background: t.color }}>
            <Icon name={t.icon} size={36} />
          </div>
          <div className="card-body">
            <h3 className="h3">{t.title}</h3>
            <p className="muted">{t.description}</p>
            <span className="caption">{t.questions.length} вопросов</span>
            <span style={{ color: "var(--primary)", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
              Начать тест <ArrowRight size={16} />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
