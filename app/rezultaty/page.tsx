import type { Metadata } from "next";
import { EXPERIMENT, HEADLINE_STATS, METHOD_NUMBERS, PRODUCT_CHECK, SURVEY } from "@/data/research";
import { Bars, NextStation, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "Результаты исследования" };

function ChartCard({ title, note, rows, color }: { title: string; note?: string; rows: { label: string; value: number; note?: string }[]; color: string }) {
  return (
    <div className="card stack" style={{ gap: 16 }}>
      <div>
        <h3 className="title">{title}</h3>
        {note && <p className="caption">{note}</p>}
      </div>
      <Bars rows={rows} color={color} />
    </div>
  );
}

export default function Rezultaty() {
  return (
    <div className="page">
      <PageHero
        eyebrow="Практическая часть"
        title="Результаты исследования"
        text="Анкетирование, эксперимент «Человек или ИИ?» и проверка путеводителя среди 20 учащихся 4 класса."
        image="/img/guide.webp"
        alt="Путеводитель «Сказка 3.0» на ноутбуке и планшете"
      />

      <section className="section">
        <SectionHead title="Как проходило исследование" text="Три этапа: анкетирование, сравнительный анализ и эксперимент. Методы: анкетирование, наблюдение, сравнение, эксперимент, процентный анализ." />
        <div className="grid grid-stats">
          {METHOD_NUMBERS.map((m) => (
            <div className="card stat" key={m.text}>
              <span className="stat-num">{m.value}</span>
              <span className="muted">{m.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Главные результаты" />
        <div className="grid grid-stats">
          {HEADLINE_STATS.map((s) => (
            <div className="card stat" key={s.text}>
              <span className="dot" style={{ background: s.color, width: 10, height: 10 }} />
              <span className="stat-num">{s.value}</span>
              <span className="muted">{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Результаты анкетирования" text="Ответы 20 учащихся 4 класса, в процентах." />
        <div className="grid grid-2">
          <ChartCard title="Самый интересный формат сказки" rows={SURVEY.formats} color="var(--sky)" />
          <ChartCard title="Что привлекает в сказочных сюжетах" rows={SURVEY.attracts} color="var(--teal)" />
          <ChartCard title="Какие версии интереснее" rows={SURVEY.versions} color="var(--green)" />
          <ChartCard title="Хотели бы прочитать ИИ-сказку" rows={SURVEY.aiInterest} color="#9b6fd6" />
        </div>
      </section>

      <section className="section">
        <SectionHead
          title="Эксперимент «Человек или ИИ?»"
          text="Шесть фрагментов без указания авторства: три написаны человеком, три созданы ИИ. Всего 120 ответов."
        />
        <div className="grid grid-2">
          <ChartCard title="Правильно определённое происхождение текста" rows={EXPERIMENT} color="var(--orange)" />
          <div className="card stack" style={{ gap: 12 }}>
            <h3 className="title">Что показал эксперимент</h3>
            <p className="muted">
              Все шесть текстов верно определили только 3 из 20 учащихся. Ещё 11 дали от трёх до пяти правильных
              ответов, у 6 — меньше трёх.
            </p>
            <p className="muted">
              ИИ-тексты узнавали по предсказуемому финалу, повторам, слишком прямой морали и ровному развитию событий.
              Текст человека чаще связывали с необычными деталями, естественными диалогами и неожиданными поступками.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead title="Проверка путеводителя" text="После знакомства с «Сказкой 3.0» учащиеся оценили продукт." />
        <ChartCard title="Оценка учащихся" note="17 из 20 после работы с путеводителем правильно назвали общие признаки трёх форм сказки." rows={PRODUCT_CHECK} color="var(--teal)" />
      </section>

      <section className="section">
        <SectionHead title="Выводы" />
        <div className="grid grid-3">
          {[
            "Меняется форма сказки, но сохраняется цепочка: герой — конфликт — испытание — выбор — результат.",
            "Цифровая эпоха не вытесняет сказку, а переносит её в кино, игры, социальные сети и ИИ-тексты.",
            "Гипотеза подтвердилась: устойчивость сказки связана с понятными человеку ценностями и нравственным выбором.",
          ].map((t, i) => (
            <div className="card stack" key={t} style={{ gap: 8 }}>
              <span className="stat-num" style={{ fontSize: 32 }}>{i + 1}</span>
              <p>{t}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-2" style={{ marginTop: 16 }}>
          <div className="card stack" style={{ gap: 8 }}>
            <h3 className="title">Где использовать «Сказку 3.0»</h3>
            <ul className="list">
              <li>на уроках литературы и факультативах;</li>
              <li>при сравнительном анализе;</li>
              <li>для самостоятельной работы;</li>
              <li>при обсуждении возможностей и ограничений ИИ.</li>
            </ul>
          </div>
          <div className="card stack" style={{ gap: 8 }}>
            <h3 className="title">Перспективы</h3>
            <ul className="list">
              <li>Увеличить число участников.</li>
              <li>Добавить казахские народные сказки и их современные версии.</li>
              <li>Сравнить, как разные ИИ-системы продолжают один сюжет.</li>
              <li>Развить путеводитель в полноценный цифровой учебный ресурс.</li>
            </ul>
          </div>
        </div>
      </section>

      <NextStation from="/rezultaty/" />
    </div>
  );
}
