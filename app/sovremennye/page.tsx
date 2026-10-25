import type { Metadata } from "next";
import ExamplePage from "@/components/ExamplePage";
import { EXAMPLES } from "@/data/examples";

export const metadata: Metadata = { title: "Современная версия" };

export default function Sovremennye() {
  return (
    <ExamplePage ex={EXAMPLES[1]}>
      <section className="stack" style={{ gap: 12 }}>
        <h2 className="h3">Было — стало</h2>
        <div className="pair">
          <figure>
            <img src="/img/web/ivan-wolf-painting.jpg" alt="Картина В. М. Васнецова «Иван-царевич на Сером волке»" loading="lazy" />
            <figcaption>
              <strong>Было</strong>
              <span>В. М. Васнецов, 1889</span>
            </figcaption>
          </figure>
          <figure>
            <img src="/img/web/ivan-wolf-2011-b.jpg" alt="Постер мультфильма «Иван Царевич и Серый Волк»" loading="lazy" />
            <figcaption>
              <strong>Стало</strong>
              <span>Мультфильм, 2011</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </ExamplePage>
  );
}
