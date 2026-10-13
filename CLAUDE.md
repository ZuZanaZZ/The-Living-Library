# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Client-only React + TypeScript (Vite) plant collection app; data lives in browser `localStorage`; deployed to GitHub Pages on push to `main`.

## Commands

`npm run dev` · `npm run build` (`tsc -b && vite build`; the only check, no linter/tests) · `npm run preview`

## Architecture

- `src/App.tsx` holds all state (`plants`, `view`, `selectedId`); no router. A selected plant overrides `view`.
- Dead plants are not deleted: `status` becomes `'dead'` with `diedOn`/`causeOfDeath`; the graveyard is a filter. Restore clears those fields.
- `src/storage.ts` is the only persistence layer; falls back to `src/seed.ts` when empty/corrupt. Photos are data URLs resized to 600px (`localStorage` ~5 MB limit).
- `vite.config.ts` uses `base: './'`; build asset URLs from `import.meta.env.BASE_URL`.

## Design

Palette via CSS variables in `src/styles.css` (light sage green bg, burgundy text, cream highlights; ~7.7:1 and ~13:1). Keep the green light for WCAG contrast, and don't signal dead/alive by colour alone.
