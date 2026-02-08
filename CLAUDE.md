# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VSDP Interactive Demo - A Next.js application demonstrating the Vision Source Digital Platform, which transforms optometry from episodic care to continuous health management through AI-powered digital twins.

**Tech Stack**: T3 Stack (Next.js 15, TypeScript strict, tRPC, Prisma/SQLite, Tailwind CSS v4)

## Commands

```bash
# Development
npm run dev              # Start dev server with Turbo

# Quality Checks
npm run check            # Lint + TypeScript check (run before commits)
npm run lint             # ESLint only
npm run typecheck        # TypeScript only
npm run lint:fix         # Auto-fix lint issues

# Database
npm run db:push          # Push schema changes (development)
npm run db:generate      # Create migration
npm run db:migrate       # Deploy migrations
npm run db:studio        # Open Prisma GUI

# Build & Production
npm run build            # Production build
npm run start            # Start production server
npm run preview          # Build + start
```

## Architecture

### T3 Stack Data Flow
```
Client Component → tRPC React Query → tRPC Server → Prisma → SQLite
                   (src/trpc/react.tsx)  (src/server/api/)  (src/server/db.ts)
```

### Key Directories
- `src/server/api/routers/` - tRPC API routers (add new routers to `root.ts`)
- `src/trpc/` - Client-side tRPC setup (react.tsx for client, server.ts for RSC)
- `prisma/schema.prisma` - Database schema (generates to `generated/prisma/`)
- `src/env.js` - Environment variable validation with Zod

### Import Aliases
Use `@/*` for src directory imports:
```typescript
import { api } from "@/trpc/react";
import { db } from "@/server/db";
```

### Server vs Client Components
- Default to Server Components (no directive needed)
- Use `'use client'` only for: interactivity, browser APIs, useState/useEffect, real-time updates

### tRPC Patterns
```typescript
// Router: src/server/api/routers/example.ts
export const exampleRouter = createTRPCRouter({
  getData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.example.findUnique({ where: { id: input.id } });
    }),
});

// Client usage
const { data, isLoading } = api.example.getData.useQuery({ id: "123" });
```

## Project-Specific Guidelines

### Four Stakeholder Sections
Routes under `/(stakeholders)/`: providers, pharma, ehr, bigtech - each demonstrates VSDP value for different audiences.

### Design System
- Primary: `vs-blue-primary` (#005DAA), `vs-blue-navy` (#003B6F)
- VSDP Extended: `vsdp-electric` (#0084FF), `vsdp-teal` (#00BFA5), `vsdp-purple` (#7C4DFF)
- Clinical alerts: `clinical-success` (#00C853), `clinical-warning` (#FF6F00), `clinical-alert` (#D32F2F)
- Icons: Lucide React (outlined, 2px stroke)

### Content Voice
- Professional healthcare tone: "Apple Health meets Mayo Clinic"
- Lead with pain point → solution → quantified outcome
- Never: "revolutionize", "disrupt", "game-changer"
- Always quantify: "detect progression 6 months earlier" not "earlier detection"

### Accessibility (WCAG 2.1 AA Required)
- Color contrast: 4.5:1 body text, 3:1 large text/UI
- Never rely on color alone for meaning
- All interactive elements need visible focus states
- Use semantic HTML and ARIA labels

### Data Generation
All patient/clinical data is simulated - no real patient data. Generators should produce realistic distributions (60% low risk, 25% moderate, 12% high, 3% critical).

## Environment Variables

Required in `.env`:
```
DATABASE_URL="file:./db.sqlite"
ANTHROPIC_API_KEY=your_key_here  # For Living Intelligence Copilot
```

Add new variables to `src/env.js` schema.
