"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpenText, Menu, X } from "lucide-react";
import { NAV } from "@/data/nav";
import { NavIcon } from "./Icon";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="Сказка 3.0 — на главную">
      <span className="wordmark-logo">
        <BookOpenText size={17} strokeWidth={2} />
      </span>
      Сказка 3.0
    </Link>
  );
}

function NavList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="nav-list">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`nav-row${active ? " active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="shell">
      <aside className="sidebar" aria-label="Разделы путеводителя">
        <Wordmark />
        <NavList pathname={pathname} />
      </aside>

      <header className="topbar">
        <Wordmark />
        <button className="icon-btn" aria-label="Открыть меню" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <>
          <div className="drawer-backdrop" onClick={() => setOpen(false)} />
          <nav className="drawer" aria-label="Меню">
            <div className="drawer-head">
              <Wordmark />
              <button className="icon-btn" aria-label="Закрыть меню" onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
          </nav>
        </>
      )}

      <div className="main">{children}</div>
    </div>
  );
}
