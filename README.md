# Сказка 3.0 — от фольклора до искусственного интеллекта

Цифровой путеводитель (практический продукт исследовательского проекта). Только фронтенд: все сказки, тексты, тесты и данные исследования захардкожены в папке `data/`.

Стек: Next.js 16 (App Router, статический экспорт), React 19, TypeScript, чистый CSS (дизайн-система в духе Notion), иконки lucide-react.

## Запуск

Нужен [Bun](https://bun.sh) (`curl -fsSL https://bun.sh/install | bash` или `powershell -c "irm bun.sh/install.ps1 | iex"` на Windows).

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # статический сайт в папке out/
bun run start    # раздать out/ локально
```

## Публикация

`npm run build` создаёт папку `out/` — это обычные HTML/CSS/JS файлы. Их можно залить на любой хостинг (Vercel, Netlify, GitHub Pages, обычный хостинг для skazka3-0.kz). На Vercel достаточно импортировать репозиторий — настройки не нужны.

## Где что лежит

- `app/` — страницы: главная, `narodnaya`, `sovremennye`, `ii-skazka`, `sravnenie`, `interaktiv` (4 игры), `fakty`, `testy`, `o-proekte`
- `data/` — весь контент: `tales.ts` (народные сказки), `modern.ts`, `ai.ts`, `compare.ts`, `facts.ts`, `games.ts`, `quizzes.ts`, `research.ts`
- `components/` — оболочка с меню, игры, тесты
- `public/img/` — иллюстрации из презентации проекта
