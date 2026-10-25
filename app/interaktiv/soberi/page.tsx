import type { Metadata } from "next";
import AssembleGame from "@/components/AssembleGame";
import { Breadcrumbs } from "@/components/ui";


export const metadata: Metadata = { title: "Собери сказку" };

export default function Page() {
  return (
    <div className="page" style={{ maxWidth: 680 }}>
      <Breadcrumbs items={[{ href: "/interaktiv/", label: "Интерактив" }, { label: "Собери сказку" }]} />
      <div className="stack" style={{ gap: 8, marginBottom: 24 }}>
        <h1 className="h1">Собери сказку</h1>
        <p className="lead">Нажимай на события по порядку.</p>
      </div>
      <AssembleGame />
    </div>
  );
}
