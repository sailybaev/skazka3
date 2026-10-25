import type { Metadata } from "next";
import HeroBuilder from "@/components/HeroBuilder";

export const metadata: Metadata = { title: "Творческая лаборатория" };

export default function Page() {
  return (
    <div className="page" style={{ maxWidth: 680 }}>
      <div className="stack" style={{ gap: 8, marginBottom: 24 }}>
        <span className="eyebrow">Творческая лаборатория</span>
        <h1 className="h1">Создай сказку 3.0</h1>
        <p className="lead">Шесть опор: герой, мир, проблема, три испытания, помощник и нравственный выбор.</p>
      </div>
      <HeroBuilder />
    </div>
  );
}
