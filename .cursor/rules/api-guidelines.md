---
description: tRPC API patterns and conventions
globs: ["src/server/api/**/*", "src/trpc/**/*"]
---

# API Guidelines (tRPC)

## Router Organization

### File Structure
```
src/server/api/routers/
  digitalTwin.ts      # Patient data, clinical dashboards, comparisons
  trials.ts           # Pharma trial simulations, feasibility
  population.ts       # EHR population health statistics
  chat.ts             # Claude API integration, message handling
  leads.ts            # Lead capture and management
  analytics.ts        # Session tracking, engagement metrics
```

### Root Router
```typescript
// src/server/api/root.ts
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { digitalTwinRouter } from "./routers/digitalTwin";
import { trialsRouter } from "./routers/trials";
import { populationRouter } from "./routers/population";
import { chatRouter } from "./routers/chat";
import { leadsRouter } from "./routers/leads";

export const appRouter = createTRPCRouter({
  digitalTwin: digitalTwinRouter,
  trials: trialsRouter,
  population: populationRouter,
  chat: chatRouter,
  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
```

## Procedure Patterns

### Query Pattern (Data Fetching)
```typescript
// src/server/api/routers/digitalTwin.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generatePatientDashboard } from "~/lib/generators/patients";
import type { DigitalTwinPatient } from "~/types/models";

export const digitalTwinRouter = createTRPCRouter({
  // Single patient query
  getPatient: publicProcedure
    .input(z.object({ 
      patientId: z.string().min(1, "Patient ID required") 
    }))
    .query(async ({ input }) => {
      // For demo: Generate simulated data
      const patient = await generatePatientDashboard(input.patientId);
      
      if (!patient) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Patient ${input.patientId} not found`,
        });
      }

      return patient;
    }),

  // Patient panel query
  getPatientPanel: publicProcedure
    .input(z.object({ 
      practiceId: z.string().optional().default("demo-practice"),
      limit: z.number().min(1).max(500).optional().default(100),
    }))
    .query(async ({ input }) => {
      const patients = await generatePatientPanel(input.limit);
      
      return {
        patients,
        totalCount: input.limit,
        riskSummary: {
          critical: patients.filter(p => p.riskScore >= 80).length,
          high: patients.filter(p => p.riskScore >= 60 && p.riskScore < 80).length,
          moderate: patients.filter(p => p.riskScore >= 40 && p.riskScore < 60).length,
          low: patients.filter(p => p.riskScore < 40).length,
        },
      };
    }),

  // Traditional vs VSDP comparison
  compareTraditionalVsVSDP: publicProcedure
    .input(z.object({ 
      patientId: z.string(),
      condition: z.enum(['amd', 'diabetic_retinopathy', 'glaucoma', 'myopia']).optional(),
    }))
    .query(async ({ input }) => {
      const comparison = await generatePatientJourneyComparison(
        input.patientId,
        input.condition
      );

      return comparison;
    }),
});
```

### Mutation Pattern (Data Modification)
```typescript
// src/server/api/routers/leads.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const leadsRouter = createTRPCRouter({
  capture: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      organization: z.string().min(2, "Organization is required"),
      stakeholderType: z.enum(['provider', 'pharma', 'ehr', 'bigtech']),
      interestedInPilot: z.boolean(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Store in database
      const lead = await db.lead.create({
        data: {
          sessionId: input.sessionId,
          name: input.name,
          email: input.email,
          organization: input.organization,
          stakeholderType: input.stakeholderType,
          interestedInPilot: input.interestedInPilot,
          notes: input.notes,
          capturedAt: new Date(),
          source: 'form',
        },
      });

      // TODO: Send notification email to Mark
      // await sendLeadNotification(lead);

      return {
        success: true,
        leadId: lead.id,
      };
    }),

  getAll: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).optional().default(50),
      stakeholderType: z.enum(['provider', 'pharma', 'ehr', 'bigtech']).optional(),
    }))
    .query(async ({ input }) => {
      const leads = await db.lead.findMany({
        where: input.stakeholderType 
          ? { stakeholderType: input.stakeholderType }
          : undefined,
        take: input.limit,
        orderBy: { capturedAt: 'desc' },
      });

      return leads;
    }),
});
```

### Chat/Streaming Pattern
```typescript
// src/server/api/routers/chat.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(z.object({
      message: z.string().min(1).max(1000),
      sessionId: z.string(),
      stakeholderContext: z.enum(['provider', 'pharma', 'ehr', 'bigtech']).optional(),
      conversationHistory: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })).optional().default([]),
    }))
    .mutation(async ({ input }) => {
      // Build context-aware system prompt
      const systemPrompt = buildSystemPrompt(input.stakeholderContext);

      try {
        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1024,
          system: systemPrompt,
          messages: [
            ...input.conversationHistory,
            { role: "user", content: input.message },
          ],
        });

        const assistantMessage = response.content[0]?.text ?? "I apologize, but I couldn't generate a response.";

        // Store message in database
        await db.message.createMany({
          data: [
            {
              sessionId: input.sessionId,
              role: 'user',
              content: input.message,
              timestamp: new Date(),
            },
            {
              sessionId: input.sessionId,
              role: 'assistant',
              content: assistantMessage,
              timestamp: new Date(),
            },
          ],
        });

        return {
          message: assistantMessage,
          tokensUsed: response.usage.output_tokens,
        };
      } catch (error) {
        // Fallback to pre-scripted responses
        const fallbackResponse = getFallbackResponse(input.message, input.stakeholderContext);
        
        return {
          message: fallbackResponse,
          fallback: true,
        };
      }
    }),

  getHistory: publicProcedure
    .input(z.object({
      sessionId: z.string(),
    }))
    .query(async ({ input }) => {
      const messages = await db.message.findMany({
        where: { sessionId: input.sessionId },
        orderBy: { timestamp: 'asc' },
      });

      return messages;
    }),
});

function buildSystemPrompt(stakeholderContext?: string): string {
  const basePrompt = `You are the Living Intelligence Copilot for the Vision Source Digital Platform (VSDP). You help stakeholders understand how VSDP transforms optometry through continuous monitoring, AI-powered insights, and network intelligence.

Keep responses concise (2-3 paragraphs max), professional but approachable, and always tie back to concrete value propositions.`;

  const contextAdditions = {
    provider: `\n\nThis user is an optometrist. Focus on clinical workflow improvements, time savings, and patient outcome improvements. Emphasize how VSDP augments their expertise, doesn't replace it.`,
    pharma: `\n\nThis user works in pharmaceutical clinical trials. Focus on recruitment speed, cost reduction, continuous monitoring benefits, and real-world evidence generation.`,
    ehr: `\n\nThis user works with health system EHR integration. Focus on FHIR interoperability, population health management, and early detection of systemic diseases through optometry.`,
    bigtech: `\n\nThis user is evaluating consumer health technology opportunities. Focus on clinical validation pathways, market access through Vision Source network, and smart device integration possibilities.`,
  };

  return basePrompt + (stakeholderContext ? contextAdditions[stakeholderContext] ?? '' : '');
}

function getFallbackResponse(message: string, context?: string): string {
  // Pre-scripted responses for common questions when API unavailable
  const fallbacks = {
    default: "I apologize, but I'm having trouble connecting right now. VSDP transforms optometry by integrating clinical data, external health records, and patient-reported symptoms into unified digital twins. Each stakeholder section demonstrates specific value: providers see clinical workflow transformation, pharma sees trial efficiency, EHR teams see population health benefits, and tech partners see consumer device validation pathways.",
    // Add more fallbacks for common questions
  };

  return fallbacks.default;
}
```

### Trial Simulation Pattern
```typescript
// src/server/api/routers/trials.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const trialsRouter = createTRPCRouter({
  calculateFeasibility: publicProcedure
    .input(z.object({
      condition: z.enum(['amd', 'glaucoma', 'diabetic_retinopathy', 'myopia']),
      ageRange: z.object({
        min: z.number().min(0).max(120),
        max: z.number().min(0).max(120),
      }),
      diseaseStage: z.array(z.string()),
      requiredSampleSize: z.number().min(10).max(50000),
      studyDuration: z.number().min(1).max(60), // months
    }))
    .query(async ({ input }) => {
      // Simulate realistic trial calculations
      const result = await calculateTrialFeasibility(input);

      return result;
    }),

  compareTimelines: publicProcedure
    .input(z.object({
      condition: z.enum(['amd', 'glaucoma', 'diabetic_retinopathy', 'myopia']),
      sampleSize: z.number(),
    }))
    .query(async ({ input }) => {
      return {
        traditional: {
          recruitmentMonths: 18,
          studyMonths: 24,
          totalMonths: 42,
          cost: 4200000,
          visitFrequency: 'Quarterly (every 3 months)',
          adverseEventDetection: 'At scheduled visits',
        },
        vsdp: {
          recruitmentMonths: 0.5, // 2 weeks
          studyMonths: 6,
          totalMonths: 6.5,
          cost: 320000,
          visitFrequency: 'Continuous monitoring + quarterly',
          adverseEventDetection: 'Real-time (24-48 hours)',
        },
        savings: {
          time: '84%',
          cost: '92%',
          dataQuality: '+340% data points',
        },
      };
    }),
});
```

## Error Handling

### Standard Error Codes
```typescript
import { TRPCError } from "@trpc/server";

// Not found
throw new TRPCError({
  code: "NOT_FOUND",
  message: "Patient not found",
});

// Validation error
throw new TRPCError({
  code: "BAD_REQUEST",
  message: "Invalid patient ID format",
});

// Rate limit
throw new TRPCError({
  code: "TOO_MANY_REQUESTS",
  message: "Please wait before sending another message",
});

// Server error
throw new TRPCError({
  code: "INTERNAL_SERVER_ERROR",
  message: "Failed to generate patient data",
});

// Unauthorized (if auth added later)
throw new TRPCError({
  code: "UNAUTHORIZED",
  message: "Authentication required",
});
```

## Rate Limiting

### Simple In-Memory Rate Limiter
```typescript
// src/server/api/middleware/rateLimit.ts
import { TRPCError } from "@trpc/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(identifier: string, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return;
  }

  if (entry.count >= maxRequests) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Rate limit exceeded. Please try again in ${Math.ceil((entry.resetAt - now) / 1000)} seconds.`,
    });
  }

  entry.count++;
}

// Usage in procedure
export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(...)
    .mutation(async ({ input, ctx }) => {
      // Rate limit by session ID
      checkRateLimit(input.sessionId, 10, 60000); // 10 req/min
      
      // ... rest of logic
    }),
});
```

## Simulated Data Generation

### Patient Data Generators
```typescript
// src/lib/generators/patients.ts
import type { DigitalTwinPatient, ClinicalAlert } from "~/types/models";

export async function generatePatientDashboard(patientId: string): Promise<DigitalTwinPatient> {
  // Generate realistic patient with:
  // - Consistent progression patterns
  // - Appropriate alert levels
  // - Network comparison data
  
  return {
    id: patientId,
    name: generatePatientName(patientId),
    age: Math.floor(Math.random() * 60) + 20,
    // ... full patient data
  };
}

export async function generatePatientPanel(count: number): Promise<DigitalTwinPatient[]> {
  // Generate cohort with realistic risk distribution:
  // 60% low, 25% moderate, 12% high, 3% critical
  
  const riskDistribution = [
    { risk: 'low', percentage: 0.60 },
    { risk: 'moderate', percentage: 0.25 },
    { risk: 'high', percentage: 0.12 },
    { risk: 'critical', percentage: 0.03 },
  ];

  const patients: DigitalTwinPatient[] = [];
  
  for (let i = 0; i < count; i++) {
    const patientId = `demo-patient-${i + 1}`;
    const patient = await generatePatientDashboard(patientId);
    patients.push(patient);
  }

  return patients;
}
```

## Client Usage

### Query Hook
```tsx
'use client';

import { api } from "~/trpc/react";

export function PatientDashboard({ patientId }: { patientId: string }) {
  const { data, isLoading, error, refetch } = api.digitalTwin.getPatient.useQuery(
    { patientId },
    {
      enabled: !!patientId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    }
  );

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!data) return <EmptyState />;

  return <PatientCard patient={data} />;
}
```

### Mutation Hook
```tsx
export function LeadCaptureForm() {
  const utils = api.useUtils();
  
  const captureLead = api.leads.capture.useMutation({
    onSuccess: () => {
      utils.leads.getAll.invalidate();
      toast.success('Thank you for your interest!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (data: LeadFormData) => {
    captureLead.mutate({
      sessionId: getSessionId(),
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={captureLead.isLoading}>
        {captureLead.isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## Performance Considerations

- **Queries**: Cache with appropriate `staleTime`
- **Mutations**: Use optimistic updates for better UX
- **Large datasets**: Implement pagination
- **Rate limiting**: 10 req/min for chat, higher for data queries
- **Simulated data**: Generate once and cache (no actual DB lookups for demo)
