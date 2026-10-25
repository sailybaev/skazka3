import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Shell from "@/components/Shell";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Сказка 3.0 — от фольклора до искусственного интеллекта",
    template: "%s · Сказка 3.0",
  },
  description:
    "Цифровой путеводитель: народная сказка, современные версии, ИИ-сказка, сравнение, интерактивные задания и тесты.",
  metadataBase: new URL("https://skazka3-0.kz"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Shell>
          {children}
          <Footer />
        </Shell>
      </body>
    </html>
  );
}
