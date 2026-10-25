"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Dices, Lightbulb, RotateCcw } from "lucide-react";
import { HERO_STEPS } from "@/data/games";
import CopyButton from "./CopyButton";

type Key = (typeof HERO_STEPS)[number]["key"];
type State = { name: string; gender: "m" | "f"; picks: Record<Key, string[]> };

const STORAGE = "skazka3-hero";
// Шаг 0 — имя героя, шаги 1..6 — опоры сюжета, последний — готовая сказка.
const LAST = HERO_STEPS.length + 1;

const EMPTY: State = {
  name: "",
  gender: "f",
  picks: { hero: [], world: [], problem: [], trials: [], helper: [], choice: [] },
};

function rnd<T>(a: readonly T[]) {
  return a[Math.floor(Math.random() * a.length)];
}

function randomState(): State {
  const picks = { ...EMPTY.picks };
  for (const s of HERO_STEPS) {
    if ("multi" in s) picks[s.key] = [...s.options].sort(() => Math.random() - 0.5).slice(0, s.multi);
    else picks[s.key] = [rnd(s.options)];
  }
  const who = rnd([
    { name: "Айсулу", gender: "f" },
    { name: "Алина", gender: "f" },
    { name: "Мира", gender: "f" },
    { name: "Тимур", gender: "m" },
    { name: "Арман", gender: "m" },
    { name: "Даниял", gender: "m" },
  ] as const);
  return { name: who.name, gender: who.gender, picks };
}

function buildStory(st: State) {
  const f = st.gender === "f";
  const g = (m: string, w: string) => (f ? w : m);
  const name = st.name.trim() || (f ? "Героиня" : "Герой");
  const val = (k: Key, fb: string) => st.picks[k][0] || fb;
  const trials = [...st.picks.trials];
  const defaults = ["пройти через тёмный лес", "сказать правду, когда было страшно", "помочь тому, кто слабее"];
  while (trials.length < 3) trials.push(defaults[trials.length]);

  return [
    `${name} — ${val("hero", "обычный подросток")}. ${g("Он", "Она")} жил${g("", "а")} ${val("world", "в обычном городе")}, и дни там были похожи один на другой.`,
    `Но однажды всё изменилось: ${val("problem", "случилось что-то странное")}. Взрослые только разводили руками, и тогда ${name} решил${g("", "а")} действовать ${g("сам", "сама")}.`,
    `В пути ${g("ему", "ей")} встретился необычный помощник — ${val("helper", "мудрый незнакомец")}. Помощь пришла не случайно: незадолго до этого ${name} ${g("поделился", "поделилась")} последним с тем, кому было труднее.`,
    `Впереди ждали три испытания. Сначала нужно было ${trials[0]}. Потом — ${trials[1]}. А третье оказалось самым трудным: ${trials[2]}.`,
    `В конце пути ${name} ${g("оказался", "оказалась")} перед выбором: ${val("choice", "выгода или правильный поступок")}. ${g("Он", "Она")} долго молчал${g("", "а")}, а потом сделал${g("", "а")} то, что считал${g("", "а")} правильным, хотя это стоило дорого.`,
    `Когда всё закончилось, мир вокруг стал прежним. Только ${name} уже не был${g("", "а")} ${g("прежним", "прежней")}.`,
  ];
}

export default function HeroBuilder() {
  const [st, setSt] = useState<State>(EMPTY);
  const [step, setStep] = useState(0);
  const [custom, setCustom] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setSt({ ...EMPTY, ...JSON.parse(raw), picks: { ...EMPTY.picks, ...JSON.parse(raw).picks } });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(st));
    } catch {}
  }, [st]);

  useEffect(() => setCustom(""), [step]);

  const story = useMemo(() => buildStory(st), [st]);
  const q = step >= 1 && step <= HERO_STEPS.length ? HERO_STEPS[step - 1] : null;
  const multi = q && "multi" in q ? q.multi : 0;

  function choose(key: Key, opt: string) {
    const cur = st.picks[key];
    if (multi) {
      const next = cur.includes(opt) ? cur.filter((x) => x !== opt) : cur.length >= multi ? [...cur.slice(1), opt] : [...cur, opt];
      setSt({ ...st, picks: { ...st.picks, [key]: next } });
    } else {
      setSt({ ...st, picks: { ...st.picks, [key]: [opt] } });
      setStep((s) => s + 1);
    }
  }

  function addCustom() {
    const v = custom.trim();
    if (!q || !v) return;
    choose(q.key, v);
    setCustom("");
  }

  const pct = Math.round((Math.min(step, LAST) / LAST) * 100);

  if (step >= LAST) {
    const title = st.name.trim() ? `Сказка о том, как ${st.name.trim()} сделал${st.gender === "f" ? "а" : ""} выбор` : "Твоя сказка";
    return (
      <div className="card card-elevated stack" style={{ gap: 18 }}>
        <span className="eyebrow">Готово!</span>
        <h2 className="h2">{title}</h2>
        <div className="prose">
          {story.map((p, k) => (
            <p key={k}>{p}</p>
          ))}
        </div>
        <p className="feedback">
          <Lightbulb size={18} aria-hidden />
          <span>Смысл сказки не назван прямо: его показывают поступки героя и его нравственный выбор.</span>
        </p>
        <div className="btn-row">
          <CopyButton text={story.join("\n\n")} label="Скопировать" />
          <button className="btn btn-utility" onClick={() => setStep(1)}>
            <ArrowLeft size={16} /> Изменить
          </button>
          <button
            className="btn btn-utility"
            onClick={() => {
              setSt(EMPTY);
              setStep(0);
            }}
          >
            <RotateCcw size={16} /> Заново
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-elevated stack" style={{ gap: 18 }}>
      <div className="stack" style={{ gap: 8 }}>
        <div className="caption" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{step === 0 ? "Начало" : `Опора ${step} из ${HERO_STEPS.length}`}</span>
          {step === 0 && (
            <button
              className="link-btn"
              onClick={() => {
                setSt(randomState());
                setStep(LAST);
              }}
            >
              <Dices size={14} /> Случайная сказка
            </button>
          )}
        </div>
        <div className="progress">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>

      {step === 0 && (
        <>
          <h2 className="h2">Как зовут героя?</h2>
          <div className="tabs" role="tablist" style={{ maxWidth: 320 }}>
            <button role="tab" className="tab" aria-selected={st.gender === "f"} onClick={() => setSt({ ...st, gender: "f" })}>
              Героиня
            </button>
            <button role="tab" className="tab" aria-selected={st.gender === "m"} onClick={() => setSt({ ...st, gender: "m" })}>
              Герой
            </button>
          </div>
          <input
            className="input"
            value={st.name}
            placeholder="Например, Айсулу"
            maxLength={30}
            onChange={(e) => setSt({ ...st, name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && setStep(1)}
          />
        </>
      )}

      {q && (
        <>
          <div className="stack" style={{ gap: 4 }}>
            <h2 className="h2">{q.title}</h2>
            <p className="muted">
              {q.question}
              {multi ? ` Выбери ${multi}.` : ""}
            </p>
          </div>
          <div className="stack" style={{ gap: 8 }}>
            {[...q.options, ...st.picks[q.key].filter((p) => !(q.options as readonly string[]).includes(p))].map((o) => (
              <button
                key={o}
                className={`option${st.picks[q.key].includes(o) ? " correct" : ""}`}
                onClick={() => choose(q.key, o)}
              >
                {o}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="input"
              placeholder="Свой вариант"
              value={custom}
              maxLength={120}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
            />
            <button className="btn btn-utility" onClick={addCustom} disabled={!custom.trim()}>
              OK
            </button>
          </div>
        </>
      )}

      <div className="btn-row" style={{ justifyContent: "space-between" }}>
        {step > 0 ? (
          <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
            <ArrowLeft size={18} /> Назад
          </button>
        ) : (
          <span />
        )}
        {(step === 0 || multi > 0 || (q && st.picks[q.key].length > 0)) && (
          <button
            className="btn btn-primary"
            onClick={() => setStep(step + 1)}
            disabled={multi > 0 && q !== null && st.picks[q.key].length < multi}
          >
            Далее <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
