---
description: VSDP Interactive Demo - Core project context and goals
globs: ["**/*"]
---

# VSDP Interactive Demo - Project Overview

## Project Context

Build an interactive web demonstration of the Vision Source Digital Platform (VSDP) that enables four key stakeholder groups to experience how Living Intelligence transforms optometry from episodic care to continuous health management.

**Tech Stack**: T3 Stack (Next.js 15, TypeScript, tRPC, Tailwind CSS, Prisma)  
**Timeline**: 4-6 week MVP  
**Primary Goal**: Convert stakeholder understanding from concept to concrete value proposition within 5 minutes

## Core Philosophy

### The Fundamental Mental Shift
Transform practitioners from "Information Archaeologist" to "Strategic Decision-Maker"

**Before VSDP**: Hunting through disconnected systems, making decisions based on what you can *find*  
**With VSDP**: Complete patient context presented automatically with predictive insights

## Four Stakeholder Groups

1. **Providers** (Optometrists) - Manage 2,000 patients with insight for 20
2. **Pharma** - Run clinical trials in 6 months instead of 24
3. **EHR/Health Systems** - Optometry as systemic disease early warning system
4. **Big Tech** - Clinical validation for consumer health devices

## Key Design Principles

1. **Lead with Pain**: Always show current state problem before solution
2. **Concrete over Abstract**: Use specific patient journeys (Robert's AMD, Sarah's diabetes, Jake's myopia)
3. **Quantify Everything**: Show exact percentages, time savings, outcome differences
4. **Emotional Connection**: Make practitioners feel frustration of missing data, then relief of complete context
5. **Network Effects**: Constantly reinforce platform gets smarter with scale
6. **Proactive vs Reactive**: Emphasize shift from episodic to continuous monitoring
7. **Time is Money**: Show efficiency gains and freed capacity
8. **Control the Narrative**: Position practitioners as essential clinical interpreters

## Critical Constraints

- **No Real Patient Data**: All data must be simulated/synthetic
- **HIPAA Compliance**: Privacy by design, no PII collection without consent
- **Mobile-First for Board**: 60% of board member traffic on iPad landscape
- **Performance**: <3s load time, Lighthouse >90
- **Accessibility**: WCAG 2.1 AA compliance required

## Route Structure

```
/(stakeholders)/
  providers/      # F2: Provider Clinical Intelligence Hub
  pharma/         # F3: Pharma Clinical Trial Revolution
  ehr/            # F4: EHR Integration Layer
  bigtech/        # F5: Big Tech Consumer Platform
integration/      # F7: Integration Overview
```

## Development Phases

- **Phase 1** (Week 1-2): Foundation, landing page
- **Phase 2** (Week 2-3): Provider & Pharma sections
- **Phase 3** (Week 3-4): EHR & Big Tech sections
- **Phase 4** (Week 4-5): AI copilot, integration overview
- **Phase 5** (Week 5-6): Polish, testing, UAT

## Success Metrics

- Average time on site >3 minutes
- >70% explore at least 2 stakeholder sections
- Chat engagement: >40% send at least 1 message
- Lead capture rate: >15% of sessions
