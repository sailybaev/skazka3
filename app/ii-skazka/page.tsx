import type { Metadata } from "next";
import ExamplePage from "@/components/ExamplePage";
import { EXAMPLES } from "@/data/examples";
import { AI_TALES } from "@/data/ai";

export const metadata: Metadata = { title: "ИИ-сказка" };

export default function IiSkazka() {
  const tale = AI_TALES[0];
  return (
    <ExamplePage ex={EXAMPLES[2]}>
      <details className="more">
        <summary>Как ИИ создал эту сказку</summary>
        <div className="more-body stack" style={{ gap: 12 }}>
          <p className="text-sample" style={{ fontSize: 15 }}>«{tale.prompt}»</p>
          <p><strong>Получилось:</strong> {tale.strong}</p>
          <p><strong>Слабее:</strong> {tale.weak}</p>
        </div>
      </details>
    </ExamplePage>
  );
}
