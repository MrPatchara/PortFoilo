# Patchara Alumaree — Portfolio

Personal portfolio built with **React 18 + TypeScript + Vite + Tailwind CSS**, deployed on **Vercel** with a serverless contact endpoint powered by **Resend**.

[![Typecheck](https://img.shields.io/badge/typecheck-tsc-blue)]() [![Test](https://img.shields.io/badge/test-vitest-green)]() [![Lint](https://img.shields.io/badge/lint-eslint_9-purple)]()

## Features

- **Image pipeline** — `vite-imagetools` generates AVIF/WebP variants + `srcset` at build time; hero ships an AVIF → WebP → PNG `<picture>` chain with `fetchPriority="high"`.
- **Lightweight animation** — IntersectionObserver + CSS transitions for reveals, word-level (not char-level) staggered text, rAF-throttled magnetic hover, all honouring `prefers-reduced-motion`.
- **Responsive by design** — sticky nav with active-section highlight and full-screen mobile menu, fluid hero, touch-friendly lightbox with swipe gestures.
- **Hardened contact API** — 10 KB body cap, in-memory rate limiting (5 req / 10 min), field length limits, honeypot, HTML escaping, outbound timeout.
- **Accessible** — focus-trapped lightbox, `aria-*` labels, visible focus rings, ≥44 px tap targets.

## Getting started

```bash
npm install
npm run dev          # start dev server
```

## Scripts

| Command                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Vite dev server                                |
| `npm run build`        | Typecheck (src + node/api configs) then build  |
| `npm run preview`      | Preview the production build locally           |
| `npm run typecheck`    | `tsc --noEmit` for both tsconfig projects      |
| `npm run lint`         | ESLint (flat config)                           |
| `npm run format`       | Prettier                                       |
| `npm run test`         | Vitest (image ordering, srcset, API helpers)   |
| `npm run icons`        | Regenerate favicon + OG image via sharp        |

## Environment variables

Copy `.env.example` → `.env.local` (and set the same values in the Vercel dashboard for production):

| Variable         | Required | Default                                   |
| ---------------- | -------- | ----------------------------------------- |
| `RESEND_API_KEY` | ✅       | —                                         |
| `CONTACT_TO`     | —        | `patcharaalumaree@gmail.com`              |
| `CONTACT_FROM`   | —        | `Portfolio <onboarding@resend.dev>`       |

## Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel — framework preset **Vite**.
2. Add `RESEND_API_KEY` (and optionally `CONTACT_TO` / `CONTACT_FROM`) in **Settings → Environment Variables**.
3. Deploy. `api/contact.ts` becomes the `/api/contact` serverless function automatically.
4. `vercel.json` sets immutable caching for hashed `/assets/*` and marks `api/*` as dynamic.

For local API testing: `npm i -g vercel && vercel dev`.

