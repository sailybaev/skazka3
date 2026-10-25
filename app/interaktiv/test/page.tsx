import type { Metadata } from "next";
import TestsHub from "@/components/TestsHub";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "Тест" };

export default function Page() {
  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <Breadcrumbs items={[{ href: "/interaktiv/", label: "Интерактив" }, { label: "Тест" }]} />
      <h1 className="h1" style={{ marginBottom: 20 }}>Тест</h1>
      <TestsHub />
    </div>
  );
}
