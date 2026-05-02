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
- **Kind**: React + Vite frontend (static SPA)
- **Preview path**: `/`
- **Purpose**: Immersive 3D landing website for Indibiotek Private Limited (biotech brand)
- **Stack**: React 19, React Three Fiber, @react-three/drei, GSAP + ScrollTrigger, Tailwind CSS
- **3D**: Animated DNA double helix + 1500 floating particles; scroll-driven camera animation
- **Videos**: AI-generated background videos in `public/` (dna_hero_bg.mp4, molecular_tech_bg.mp4, lab_bg.mp4)
- **Background**: Transparent R3F canvas over vivid teal radial-gradient body; videos per section with light overlays
- **Brand**: Teal palette (#53CFCF primary), Outfit + Inter fonts, Indibiotek logo in navbar
- **Sections**: Hero, About, Technology, Solutions, Contact
