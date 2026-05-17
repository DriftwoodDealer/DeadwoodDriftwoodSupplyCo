# Repository Guidelines

## Project Structure & Module Organization

This repo is transitioning from the original static `index.html` landing page into a Next.js App Router application. The active app lives in `app/`, reusable UI lives in `components/`, and mock inventory data lives in `lib/mock-inventory.ts`. `Roadmap.md` is the long-term build plan, `TODO.md` is the ordered execution list, and `BrainDump.md` is the raw idea inbox. Do not treat raw BrainDump notes as approved scope until they are promoted into `TODO.md`.

## Build, Test, and Development Commands

Use the npm scripts defined in `package.json`:

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run idea -- "idea text"
npm run push
```

Before marking work ready for human testing, run `npm run typecheck`, `npm run lint`, and `npm run build`.

## Coding Style & Naming Conventions

Use TypeScript with strict checking enabled by `tsconfig.json`. Use the existing App Router pattern in `app/`, path aliases through `@/*`, and CSS classes from `app/globals.css` unless a new component-level pattern is clearly needed. Keep the DEADWOOD visual language dark, restrained, and editorial. Avoid adding heavy dependencies before checking whether the current Next.js, React, and CSS setup is enough.

## TODO Signoff Rules

Only check a `TODO.md` box after both AI and human verification are complete. The expected flow is: implement the item, run typecheck/lint/build, give Mark specific manual test steps, wait for Mark to confirm the manual tests passed, then check the box. If tests fail or Mark has not confirmed, leave the box unchecked and add a short note if useful.

## Idea Capture

Do not put every raw thought directly into `TODO.md`. Save loose ideas with `npm run idea -- "..."` or during `npm run push`; this appends them to `BrainDump.md`. Later, promote only prioritized, actionable work into `TODO.md`.

## Commit & Pull Request Guidelines

Recent commits use short sentence-case messages such as `Add initial landing page and hero asset`. Keep commits focused and describe the user-visible or project-management outcome. The current remote is `https://github.com/DriftwoodDealer/DeadwoodDriftwoodSupplyCo.git`; confirm account and deployment target before changing publish settings.
