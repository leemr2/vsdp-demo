---
description: T3 Stack architecture patterns and conventions
globs: ["src/**/*"]
---

# Architecture Guidelines

## T3 Stack Conventions

### Next.js 15 App Router

**Server Components (Default)**
- Use for initial page loads and static content
- Keep as server components unless interactivity required
- Benefits: Performance, SEO, reduced client bundle

**Client Components**
- Mark with `'use client'` directive
- Use for: Interactive visualizations, forms, animations, state management
- Examples: Digital twin dashboards, chat interface, trial simulators

### TypeScript Strict Mode

**Always Required**
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Type Conventions**
- Use interfaces for data models that will be extended
- Use types for unions, intersections, and simple shapes
- Prefer explicit return types on functions
- Use Zod schemas for runtime validation

### tRPC API Structure

**Router Organization**
```
src/server/api/routers/
  digitalTwin.ts    # Patient data, clinical dashboards
  trials.ts         # Pharma trial simulations
  chat.ts           # Claude API integration
  population.ts     # EHR population health stats
  leads.ts          # Lead capture
```

**Naming Conventions**
- Procedures: `camelCase` verbs (e.g., `getPatientDashboard`, `calculateRecruitment`)
- Inputs: `${procedureName}Input` type
- Outputs: `${procedureName}Output` type

**Example Pattern**
```typescript
export const digitalTwinRouter = createTRPCRouter({
  getPatientDashboard: publicProcedure
    .input(z.object({ patientId: z.string() }))
    .output(z.custom<DigitalTwinPatient>())
    .query(async ({ input }) => {
      // Implementation
    }),
});
```

### Prisma Database

**Development**: SQLite for simplicity
**Schema Location**: `prisma/schema.prisma`
**Client**: Import from `~/server/db`

**Key Models**
```prisma
model Session {
  id                String   @id @default(cuid())
  stakeholderContext String?
  createdAt         DateTime @default(now())
  messages          Message[]
  lead              Lead?
}

model Message {
  id        String   @id @default(cuid())
  sessionId String
  role      String   // 'user' | 'assistant'
  content   String
  timestamp DateTime @default(now())
  session   Session  @relation(fields: [sessionId], references: [id])
}

model Lead {
  id                 String   @id @default(cuid())
  sessionId          String   @unique
  name               String
  email              String
  organization       String
  stakeholderType    String
  interestedInPilot  Boolean
  capturedAt         DateTime @default(now())
  session            Session  @relation(fields: [sessionId], references: [id])
}
```

## File Structure Standards

### Component Organization
```
src/components/
  ui/              # Base components (Button, Card, Input, Modal)
  brand/           # Vision Source branded (VSHeader, VSFooter, VSLogo)
  vsdp/            # VSDP-specific (DigitalTwinCard, ClinicalAlert, LivingIntelligenceCopilot)
  charts/          # Data visualization components
  stakeholders/    # Stakeholder-specific complex components
```

### Naming Conventions
- Components: PascalCase (e.g., `DigitalTwinDashboard.tsx`)
- Utilities: camelCase (e.g., `formatCurrency.ts`)
- Types: PascalCase with descriptive names (e.g., `DigitalTwinPatient`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `MAX_PATIENTS_DISPLAY`)

### Import Aliases
```typescript
// Use ~ for src directory
import { Button } from "~/components/ui/Button";
import { api } from "~/trpc/react";
import type { DigitalTwinPatient } from "~/types/models";
```

## External Integrations

### Anthropic Claude API
```typescript
// app/api/claude/route.ts
- Endpoint: POST /api/claude
- Rate limiting: 10 requests/minute per session
- Fallback: Pre-scripted responses if API unavailable
- Streaming: Use for better UX
```

**Usage Pattern**
```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Include context in system prompt
const systemPrompt = `You are the Living Intelligence Copilot for VSDP.
Current stakeholder context: ${stakeholderType}
Relevant facts: ...`;
```

### Visualization Libraries

**Recharts** (Primary)
- Line/bar charts for clinical data
- Responsive by default
- Good TypeScript support

**D3.js** (Complex visualizations)
- Timeline visualizations
- Network graphs
- Custom interactive elements

**React Flow** (Diagrams)
- System architecture diagram
- Patient journey flows
- FHIR integration diagrams

## Performance Requirements

- **Lighthouse Score**: >90 all metrics
- **Time to Interactive**: <3s on 4G
- **API Responses**: <5s (show loading states)
- **Image Optimization**: Use Next.js Image component
- **Code Splitting**: Lazy load components below fold

## Error Handling

**tRPC Error Handling**
```typescript
import { TRPCError } from "@trpc/server";

throw new TRPCError({
  code: "BAD_REQUEST",
  message: "Invalid patient ID",
});
```

**Client-Side Error Boundaries**
- Wrap each stakeholder section in error boundary
- Graceful degradation for API failures
- User-friendly error messages (no stack traces)

## Environment Variables

**Required**
- `DATABASE_URL` - SQLite path
- `ANTHROPIC_API_KEY` - Claude API key

**Optional**
- `NODE_ENV` - Development/production
- `NEXT_PUBLIC_APP_URL` - Base URL for sharing

**Access Pattern**
- Server-only: `process.env.ANTHROPIC_API_KEY`
- Client-side: `process.env.NEXT_PUBLIC_APP_URL` (must be prefixed)
