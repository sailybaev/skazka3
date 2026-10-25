import type { Metadata } from "next";
import GuessGame from "@/components/GuessGame";
import { Breadcrumbs } from "@/components/ui";


export const metadata: Metadata = { title: "Человек или ИИ?" };

export default function Page() {
  return (
    <div className="page" style={{ maxWidth: 680 }}>
      <Breadcrumbs items={[{ href: "/interaktiv/", label: "Интерактив" }, { label: "Человек или ИИ?" }]} />
      <div className="stack" style={{ gap: 8, marginBottom: 24 }}>
        <h1 className="h1">Человек или ИИ?</h1>
        <p className="lead">Прочитай отрывок и угадай автора.</p>
      </div>
      <GuessGame />
    </div>
  );
}
