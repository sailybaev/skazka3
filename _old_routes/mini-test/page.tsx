import type { Metadata } from "next";
import Quiz from "@/components/Quiz";
import { Breadcrumbs } from "@/components/ui";
import { MINI_TEST } from "@/data/quizzes";

export const metadata: Metadata = { title: "Мини-тест" };

export default function Page() {
  return (
    <div className="page" style={{ maxWidth: 820 }}>
      <Breadcrumbs items={[{ href: "/interaktiv/", label: "Интерактив" }, { label: "Мини-тест" }]} />
      <div className="stack" style={{ gap: 8, marginBottom: 24 }}>
        <h1 className="h1">Мини-тест</h1>
        <p className="lead">Пять быстрых вопросов по всему путеводителю.</p>
      </div>
      <Quiz quiz={MINI_TEST} />
    </div>
  );
}
