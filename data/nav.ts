export type NavItem = {
  href: string;
  label: string;
  icon: string;
  color: string;
  short: string;
};

// Порядок совпадает с маршрутом путеводителя: от народной сказки к ИИ.
export const NAV: NavItem[] = [
  { href: "/", label: "Главная", icon: "home", color: "var(--secondary)", short: "Начало путешествия" },
  { href: "/narodnaya/", label: "Народная сказка", icon: "book", color: "var(--green)", short: "«Царевна-лягушка»" },
  { href: "/sovremennye/", label: "Современная версия", icon: "film", color: "var(--sky)", short: "«Иван Царевич и Серый Волк»" },
  { href: "/ii-skazka/", label: "ИИ-сказка", icon: "bot", color: "var(--purple)", short: "«Виртуальный лес»" },
  { href: "/sravnenie/", label: "Сравнение", icon: "columns", color: "var(--orange)", short: "Что изменилось, а что осталось" },
  { href: "/interaktiv/", label: "Интерактив", icon: "puzzle", color: "var(--pink)", short: "Игры и тест" },
  { href: "/o-proekte/", label: "Результаты", icon: "chart", color: "var(--primary)", short: "Анкета, эксперимент и выводы" },
  { href: "/laboratoriya/", label: "Творческая лаборатория", icon: "pencil", color: "var(--brown)", short: "Создай сказку 3.0" },
  { href: "/fakty/", label: "Факты", icon: "sparkles", color: "var(--teal)", short: "Удивительный мир сказок" },
];

export function nextStation(href: string): NavItem | undefined {
  const i = NAV.findIndex((n) => n.href === href);
  return i >= 0 && i < NAV.length - 1 ? NAV[i + 1] : undefined;
}
