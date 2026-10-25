import type { Metadata } from "next";
import Link from "next/link";
import TestsHub from "@/components/TestsHub";
import { NextStation, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Тесты" };

export default function Testy() {
  return (
    <div className="page">
      <PageHero
        eyebrow="Станция 7"
        title="Тесты"
        subtitle="Проверь себя"
        text="Три теста по материалам путеводителя. После каждого ответа — короткое объяснение, а в конце — итоговый результат."
      />
      <div style={{ marginTop: 32 }}>
        <TestsHub />
      </div>
      <p className="caption" style={{ marginTop: 16 }}>
        Хотите быстрее? Попробуйте <Link href="/interaktiv/mini-test/">мини-тест из пяти вопросов</Link>.
      </p>
      <NextStation from="/testy/" />
    </div>
  );
}
