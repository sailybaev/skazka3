import type { Metadata } from "next";
import ExamplePage from "@/components/ExamplePage";
import { EXAMPLES } from "@/data/examples";
import { FOLK_TALES } from "@/data/tales";

export const metadata: Metadata = { title: "Народная сказка" };

export default function Narodnaya() {
  const tale = FOLK_TALES[0];
  return (
    <ExamplePage ex={EXAMPLES[0]}>
      <details className="more">
        <summary>Читать полностью</summary>
        <div className="more-body prose">
          {tale.text.map((p, k) => (
            <p key={k}>{p}</p>
          ))}
        </div>
      </details>
    </ExamplePage>
  );
}
