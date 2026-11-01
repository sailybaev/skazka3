import type { Metadata } from "next";
import Analyzer from "@/components/Analyzer";

export const metadata: Metadata = { title: "ИИ-анализ сказки" };

export default function Page() {
  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <div className="stack" style={{ gap: 8, marginBottom: 24 }}>
        <span className="eyebrow">ИИ-анализ</span>
        <h1 className="h1">Проанализируй сказку</h1>
        <p className="lead">
          Вставьте текст или ссылку на сказку — ИИ разберёт её по тем же критериям, что и три сказки проекта: герой, конфликт, испытание,
          фантастика, язык, нравственный смысл.
        </p>
      </div>
      <Analyzer />
    </div>
  );
}
