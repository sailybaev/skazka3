import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page stack" style={{ alignItems: "flex-start", gap: 16 }}>
      <Compass size={48} strokeWidth={1.6} color="var(--muted)" aria-hidden />
      <h1 className="h1">Тропинка потерялась</h1>
      <p className="lead">Такой страницы в путеводителе нет. Вернитесь к началу путешествия.</p>
      <Link href="/" className="btn btn-primary">На главную</Link>
    </div>
  );
}
