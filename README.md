# VSDP Interactive Demo

An interactive web demonstration of the Vision Source Digital Platform (VSDP) that enables four key stakeholder groups (Providers, Pharma, EHR Teams, Big Tech) to experience how Living Intelligence transforms optometry from episodic care to continuous health management.

## 🎯 Project Overview

This demo serves as both a board presentation tool and external stakeholder engagement platform, converting stakeholder understanding from concept to concrete value proposition within 5 minutes of interaction.

**Timeline**: 4-6 week MVP  
**Primary Goal**: Bridge the gap between Vision Source's traditional healthcare audience and a transformative technology platform that positions optometry at the intersection of AI, wearables, and brain-computer interfaces.

## 📋 Documentation

- **[Product Requirements Document](./Product%20Requirements%20Document%20VSDP%20Interactive%20Demo.md)** - Complete feature specifications, user journeys, and technical requirements
- **[VSDP Architecture Document](./docs/Vision%20Source%20Digital%20Platform%20(VSDP)%20The%20Universal%20Health%20Twin%20Architecture.md)** - System architecture and design principles

## 🛠 Tech Stack

Built with the [T3 Stack](https://create.t3.gg/) for type-safe, full-stack development:

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety with strict mode
- **[tRPC](https://trpc.io)** - End-to-end typesafe APIs
- **[Prisma](https://prisma.io)** - Type-safe ORM with SQLite
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS (CSS-based `@theme` config)
- **[Framer Motion](https://www.framer.com/motion/)** - Animations, hero transitions, scroll-reveal
- **[Lucide React](https://lucide.dev)** - Icons (design system)
- **[Lottie React](https://lottiereact.com)** - Lottie animations (Living Intelligence pillar icons)
- **[Anthropic Claude API](https://www.anthropic.com)** - AI-powered Living Intelligence Copilot (integration planned)

### Planned Integrations

- **Recharts/D3.js** - Data visualizations
- **React Flow** - Interactive diagrams
- **jsPDF/Puppeteer** - PDF generation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vsdp-demo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - SQLite database path (default: `file:./prisma/db.sqlite`)
- `ANTHROPIC_API_KEY` - Anthropic Claude API key (for Living Intelligence Copilot)

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
vsdp-demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── _components/
│   │   │   ├── landing/        # Main landing page sections
│   │   │   │   ├── Header.tsx, Footer.tsx
│   │   │   │   ├── HeroSection.tsx, LivingIntelligence.tsx, TransformationSlider.tsx
│   │   │   │   ├── StakeholderPathways.tsx, PlatformVision.tsx, ImplementationRoadmap.tsx
│   │   │   │   ├── TrustSection.tsx, CTASection.tsx, CopilotButton.tsx
│   │   │   │   └── ScrollReveal.tsx
│   │   │   └── post.tsx       # Example tRPC component
│   │   ├── (stakeholders)/     # Stakeholder routes (to be implemented)
│   │   │   ├── providers/      # Provider Clinical Intelligence Hub
│   │   │   ├── pharma/         # Pharma Clinical Trial Revolution
│   │   │   ├── ehr/            # EHR Integration Layer
│   │   │   └── bigtech/        # Big Tech Consumer Platform
│   │   ├── api/                # API routes (tRPC, future Claude)
│   │   ├── layout.tsx          # Root layout (Inter font, metadata)
│   │   └── page.tsx            # Main landing page
│   ├── server/
│   │   ├── api/                # tRPC routers
│   │   │   ├── root.ts
│   │   │   └── routers/
│   │   └── db.ts               # Prisma client
│   ├── trpc/                   # tRPC client setup
│   ├── styles/
│   │   └── globals.css         # Tailwind v4 @theme (VSDP colors, fonts)
│   └── env.js                  # Environment validation
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/
├── public/
│   └── images/                 # Hero images, logos, Lottie animations
├── docs/                       # Project documentation
└── VSDP_Brand_Guidelines.md    # Design system reference
```

## 🎨 Core Features

### F1: Landing Page & Journey Selection ✅
Main landing page with hero (split-screen current vs VSDP state), Living Intelligence foundation, before/after transformation slider, four stakeholder pathway cards (Providers, Pharma, EHR, Big Tech), platform vision diagram, implementation roadmap, trust section, and CTA. Sticky header, footer, and Living Intelligence Copilot floating button (stub). Stakeholder links point to `/providers`, `/pharma`, `/ehr`, `/bigtech` (routes to be implemented).

### F2: Provider Clinical Intelligence Hub
- Digital Twin Simulator with patient dashboards
- AI Clinical Assistant (Claude-powered chat)
- Research Dashboard with network effects visualization

### F3: Pharma Clinical Trial Revolution
- Interactive Trial Simulator with real-time calculations
- Continuous Monitoring Comparison
- AI-Powered RWE (Real-World Evidence) Analysis

### F4: EHR Integration Layer
- Patient Journey Flow Diagram (FHIR integration)
- Population Health Dashboard
- Live API Integration Demo

### F5: Big Tech Consumer Platform
- Consumer Digital Twin App Mockup
- XR Integration Showcase
- Market Opportunity Calculator

### F6: Living Intelligence Copilot (Cross-Cutting)
Persistent AI chat interface with context awareness across all stakeholder sections

### F7: Integration Overview
System architecture diagram showing how all stakeholder views connect

## 📊 Development Phases

### Phase 1: Foundation (Week 1-2) ✅
- [x] T3 Stack setup with TypeScript strict mode
- [x] Main landing page with stakeholder selection (hero, 8 sections, header, footer, copilot stub)
- [x] Dependencies: Framer Motion, Lucide React, Lottie React (brand/animations)
- [ ] Stakeholder route pages (providers, pharma, ehr, bigtech)
- [ ] Deploy to Vercel staging environment

### Phase 2: Provider & Pharma Sections (Week 2-3)
- [ ] F2: Provider Clinical Intelligence Hub
- [ ] F3: Pharma Clinical Trial Revolution
- [ ] Simulated data generators
- [ ] Recharts visualizations

### Phase 3: EHR & Big Tech Sections (Week 3-4)
- [ ] F4: EHR Integration Layer
- [ ] F5: Big Tech Consumer Platform
- [ ] FHIR mockups
- [ ] Video/animation integration

### Phase 4: AI & Integration (Week 4-5)
- [ ] F6: Living Intelligence Copilot (Claude API)
- [ ] F7: Integration overview
- [ ] Lead capture forms
- [ ] Analytics setup

### Phase 5: Polish & Testing (Week 5-6)
- [ ] Accessibility audit
- [ ] Mobile optimization
- [ ] Performance testing (Lighthouse)
- [ ] UAT with stakeholders
- [ ] Production deployment

## 🧪 Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run preview` - Build then start production server
- `npm run check` - Lint + TypeScript check (run before commits)
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix lint issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run format:check` - Prettier check
- `npm run format:write` - Prettier format
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Create migration
- `npm run db:migrate` - Deploy migrations

## 🔒 Security & Privacy

- No PII collected without explicit consent
- Claude API key stored in environment variables
- Rate limiting on all API endpoints (10 req/min per IP)
- HTTPS enforced (Vercel deployment)

## 📈 Success Metrics

### Engagement Metrics
- Average time on site >3 minutes
- >70% of users explore at least 2 stakeholder sections
- Chat engagement: >40% of users send at least 1 message

### Conversion Metrics
- Lead capture rate: >15% of sessions
- Pilot interest rate: >30% of captured leads
- Demo sharing: >20% of users share link

## 🚢 Deployment

This project is configured for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

See the [T3 Stack deployment guide](https://create.t3.gg/en/deployment/vercel) for detailed instructions.

## 📚 Learn More

- [T3 Stack Documentation](https://create.t3.gg/)
- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## 📝 License

[Add your license here]
