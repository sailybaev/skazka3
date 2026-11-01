"use client";

import { useState } from "react";

type Analysis = {
  title: string;
  kind: string;
  summary: string;
  criteria: { hero: string; conflict: string; trial: string; fantasy: string; language: string; moral: string };
  chain: string[];
  kept: string[];
  changed: string[];
  ai_signs: string[];
  human_signs: string[];
  ai_percent: number;
  ai_comment: string;
  strong: string;
  weak: string;
};

const ROWS: [keyof Analysis["criteria"], string][] = [
  ["hero", "Герой"],
  ["conflict", "Конфликт"],
  ["trial", "Испытание"],
  ["fantasy", "Фантастика"],
  ["language", "Язык"],
  ["moral", "Нравственный смысл"],
];
const CHAIN = ["Герой", "Конфликт", "Испытание", "Выбор", "Итог"];

export default function Analyzer() {
  const [mode, setMode] = useState<"url" | "text">("text");
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [truncated, setTruncated] = useState(false);

  async function run() {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(mode === "url" ? { url: value } : { text: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка анализа.");
      setResult(data.analysis);
      setTruncated(!!data.truncated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка анализа.");
    } finally {
      setBusy(false);
    }
  }

  const list = (items: string[]) =>
    items.length ? (
      <ul className="list">
        {items.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    ) : (
      <p className="muted">Не найдено.</p>
    );

  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="card card-body stack" style={{ gap: 12 }}>
        <div className="btn-row">
          <button type="button" className={`btn ${mode === "text" ? "btn-primary" : "btn-utility"}`} onClick={() => setMode("text")}>
            Вставить текст
          </button>
          <button type="button" className={`btn ${mode === "url" ? "btn-primary" : "btn-utility"}`} onClick={() => setMode("url")}>
            Ссылка на сказку
          </button>
        </div>
        {mode === "url" ? (
          <input
            className="input"
            type="url"
            placeholder="https://…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Ссылка на сказку"
          />
        ) : (
          <textarea
            className="textarea"
            style={{ minHeight: 220 }}
            placeholder="Вставьте текст сказки целиком…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Текст сказки"
          />
        )}
        <div className="btn-row">
          <button type="button" className="btn btn-primary" disabled={busy || !value.trim()} onClick={run}>
            {busy ? "ИИ читает сказку…" : "Проанализировать"}
          </button>
        </div>
        {error && <p role="alert" style={{ color: "var(--primary)" }}>{error}</p>}
        <p className="caption">Текст отправляется на сервер и в Claude (Anthropic) для анализа. Не вставляйте личные данные.</p>
      </div>

      {result && (
        <div className="stack" style={{ gap: 20 }}>
          <div className="card card-body stack" style={{ gap: 8 }}>
            <span className="badge">{result.kind}</span>
            <h2 className="h2">{result.title}</h2>
            <p>{result.summary}</p>
            {truncated && <p className="caption">Текст был длинным — проанализировано начало.</p>}
          </div>

          <div className="card card-body stack" style={{ gap: 12 }}>
            <h3 className="h3">Анализ по критериям проекта</h3>
            <dl className="facts">
              {ROWS.map(([k, label]) => (
                <div key={k}>
                  <dt>{label}</dt>
                  <dd>{result.criteria[k]}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card card-body stack" style={{ gap: 8 }}>
            <h3 className="h3">Цепочка сюжета</h3>
            <ol className="list">
              {result.chain.map((s, i) => (
                <li key={i}>
                  <strong>{CHAIN[i] ?? ""}:</strong> {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-2">
            <div className="card card-body stack" style={{ gap: 8 }}>
              <h3 className="h3">Что сохранено от народной сказки</h3>
              {list(result.kept)}
            </div>
            <div className="card card-body stack" style={{ gap: 8 }}>
              <h3 className="h3">Что изменилось</h3>
              {list(result.changed)}
            </div>
          </div>

          <div className="card card-body stack" style={{ gap: 10 }}>
            <h3 className="h3">Человек или ИИ?</h3>
            <p>
              <strong>Вероятность ИИ-авторства: {Math.max(0, Math.min(100, result.ai_percent))}%</strong>
            </p>
            <p className="muted">{result.ai_comment}</p>
            <div className="grid grid-2">
              <div>
                <h4 className="title">Признаки ИИ</h4>
                {list(result.ai_signs)}
              </div>
              <div>
                <h4 className="title">Признаки человека</h4>
                {list(result.human_signs)}
              </div>
            </div>
            <p className="caption">Это предположение ИИ по признакам из нашего эксперимента, а не доказательство.</p>
          </div>

          <div className="grid grid-2">
            <div className="card card-body">
              <h3 className="h3">Получилось</h3>
              <p>{result.strong}</p>
            </div>
            <div className="card card-body">
              <h3 className="h3">Слабее</h3>
              <p>{result.weak}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
