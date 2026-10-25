import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-simple">
        <span>
          <strong>Сказка 3.0</strong> · от фольклора до ИИ
        </span>
        <span className="footer-links">
          <Link href="/o-proekte/">О проекте</Link>
          <span>skazka3-0.kz</span>
        </span>
      </div>
    </footer>
  );
}
