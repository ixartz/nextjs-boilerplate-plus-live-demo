# AGENTS

## Principles
- Clarity and consistency over cleverness. Minimal changes. Match existing patterns.
- Keep components/functions short; break down when it improves structure.
- TypeScript everywhere; no `any` unless isolated and necessary.
- No unnecessary `try/catch`. Avoid casting; use narrowing.
- Named exports only (no default exports, except Next.js pages).
- Absolute imports via `@/` unless same directory.
- Follow existing ESLint setup; don't reformat unrelated code.
- Zod type-only: `import type * as z from 'zod';`.
- Let compiler infer return types unless annotation adds clarity.
- Options object for 3+ params, optional flags, or ambiguous args.
- Hypothesis-driven debugging: 1-3 causes, validate most likely first.

## Token efficiency
- Skip recaps unless the result is ambiguous or you need more input.

## Stack
Next.js App Router, TypeScript, Tailwind v4, shadcn/Radix UI, Drizzle ORM + Postgres, Better Auth, oRPC, T3 Env, React Hook Form + Zod, next-intl, LogTape, Playwright (integration/e2e), Vitest (unit).

## Structure
- `docs/` - project documentation.
- `src/app/[locale]/` - locale-scoped routes: `(marketing)` public pages, `(auth)/(center)` login/signup, `(auth)/dashboard` auth pages with sidebar.
- `src/components/` - shared UI primitives; `ui/` for shadcn components.
- `src/emails/` - email templates.
- `src/features/` - domain UI: auth, billing, dashboard shell, landing, settings, todo.
- `src/hooks/` - reusable React hooks.
- `src/libs/` - third-party libraries; `Env.ts` for typed env vars.
- `src/locales/` - i18n translation files.
- `src/models/` - database schemas (Drizzle).
- `src/routers/` - typed API endpoints (oRPC).
- `src/services/` - business logic.
- `src/styles/` - global styles.
- `src/templates/` - marketing section building blocks.
- `src/types/` - shared TypeScript types.
- `src/utils/` - helpers; `AppConfig.ts` for app-wide config.
- `src/validations/` - Zod schemas.
- `tests/` - integration and e2e tests.

## Commands
Only these `bun run` scripts: `build-local`, `lint`, `check:types`, `check:deps`, `check:i18n`, `test`, `test:e2e`.

## Git Commits
Conventional Commits: `type: summary` without scope. The summary should be a short, specific sentence that explains what changed and where or why, not a vague phrase. Types: `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`. `BREAKING CHANGE:` footer when needed.

## Env
All env vars validated in `Env.ts`; never read `process.env` directly.

## Auth sessions
- Read: use the cookie-cached session; don't set `freshSession` unless it's critical to have the latest session data.
- Mutations (create/update/delete): set `freshSession: true` so the session is revalidated against the database (`disableCookieCache: true`).

## Styling
Tailwind v4 utility classes. Reuse shared components. Responsive. No unnecessary classes.

## React
- No `useMemo`/`useCallback` (React compiler handles it). Avoid `useEffect`.
- Single `props` param with inline type; access as `props.foo` (no destructuring).
- Use `React.ReactNode`, not `ReactNode`.
- Inline short event handlers; extract only when complex.

## Forms (RHF + Zod)
- Component names end with `Form`.
- `const form = useForm({ resolver: zodResolver(schema), defaultValues: { ... } })`.
- Define every form field in `defaultValues`.
- Import validation schemas from `@/validations/*Validation`.
- `<Form {...form}>` wrapping `<form noValidate onSubmit={handleSubmit}>`.
- Handler: `const handleSubmit = form.handleSubmit(async (formData) => { ... })`.
- Root errors: `form.setError('root', { message })` → `<Alert variant="destructive">` for `form.formState.errors.root.message`.
- Structure: `FormField → FormItem → FormLabel & FormControl & FormMessage → Input`.
- Disable inputs/button with `form.formState.isSubmitting`.
- `<Button type="submit">` to submit form.
- `FormMessage` for field errors with `errorMessage={t('...')}`.

## Pages
- Default export name ends with `Page`. Props alias (if reused) ends with `PageProps`.
- Locale pages: `props: { params: Promise<{ locale: string }> }` → `await props.params` → `setRequestLocale(locale)`.
- Escape glob chars in shell commands for Next.js paths.
- Dashboard pages (sit behind auth); define meta once in layout, not in each page.

## i18n (next-intl)
- Never hard-code user-visible strings. Page namespaces end with `Page`.
- Server: `getTranslations`; Client: `useTranslations`.
- Context-specific keys (`card_title`, `meta_description`). Use `t.rich(...)` for markup.
- Use sentence case for translations.
- Error messages: short, no "try again" variants.

## JSDoc
- Start each block with `/**` directly above the symbol.
- Short, sentence-case, present-tense description of intent.
- Order: description → `@param` → `@returns` → `@throws` (only if it can throw).

## Tests
- `*.test.ts` for unit tests; `*.integ.ts` for integration tests; `*.e2e.ts` for Playwright tests.
- `*.test.ts` co-located with implementation; `*.integ.ts` and `*.e2e.ts` in `tests/` directory.
- Top `describe` = subject; nested `describe` to group scenarios or contexts.
- `it` titles: short, third-person present, `verb + object + context`. Sentence case, no period.
- Omit "should/works/handles/checks/validates". State what, not how.
- Avoid mocking unless necessary.
