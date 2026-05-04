# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Indibiotek 3D Website (`artifacts/indibiotek-3d`)
- **Kind**: React + Vite frontend (static SPA), routed by wouter
- **Preview path**: `/`
- **Purpose**: Multi-page biotech site for Indibiotek Private Limited
- **Stack**: React 18, wouter, GSAP + ScrollTrigger, Tilt3D / parallax, Tailwind v4
- **Brand tokens**: ACCENT `#0B6A4D`, ACCENT_BRIGHT `#14B57E`, BG `#F4F8F5`, DARK_BG `#0E1C14`, LIME `#C8FF4D`; Outfit display + Inter body + Menlo mono
- **Pages**: `/` Home, `/about`, `/lifesciences`, `/agri`, `/scientific`, `/services`, `/rnd`, `/careers`, `/contact`, branded 404 fallback
- **Contact channels** (used everywhere): WhatsApp `wa.me/919608768647`, phone `tel:+918902052927`, email `info@indibiotek.com`
- **Shared components**:
  - `PageShell` + `GlassCard` + `SectionHeading` for division pages
  - `InquiryForm` — per-page inquiry with auto-filled subject; opens WhatsApp (primary) or mailto (secondary); validates name + message + optional email/phone, with maxLength on message
  - `MobileStickyCTA` — fixed bottom bar (md:hidden, z-40) with Call · WhatsApp; body has `padding-bottom` on mobile + safe-area inset
  - `AtomCursor`, `PageTransition` — both respect `prefers-reduced-motion`
- **A11y / perf**:
  - All below-the-fold `<img>` use `loading="lazy" decoding="async"`
  - Unsplash background URLs use trimmed `w` and `q=72-78` to ship fewer bytes
  - Global CSS `@media (prefers-reduced-motion: reduce)` collapses animations and forces reveal opacity to 1; GSAP reveals also short-circuit when reduce-motion is set
  - Viewport meta does NOT set `maximum-scale` (user zoom enabled)
- **SEO / icons**: real favicon + apple-touch-icon set, `theme-color`, OpenGraph + Twitter card meta in `index.html` pointing to `/opengraph.jpg`
- **Dev gotcha**: wouter v3 `<Link>` renders its own `<a>`; pass styles/className/data-testid directly to `<Link>` rather than nesting an `<a>` child (avoids hydration warnings)
