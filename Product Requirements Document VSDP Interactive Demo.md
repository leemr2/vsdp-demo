# Product Requirements Document: VSDP Interactive Demo

## Executive Summary

Build an interactive web demonstration of the Vision Source Digital Platform (VSDP) that enables four key stakeholder groups (Providers, Pharma, EHR Teams, Big Tech) to experience how Living Intelligence transforms optometry from episodic care to continuous health management. The demo will serve as both a board presentation tool and external stakeholder engagement platform.

**Tech Stack**: T3 Stack (Next.js, TypeScript, tRPC, Tailwind CSS, Prisma) **Timeline**: 4-6 week MVP **Primary Goal**: Convert stakeholder understanding from concept to concrete value proposition within 5 minutes of interaction

## Project Context & Strategic Importance

This demo represents the first tangible manifestation of VSDP's vision. It must bridge the gap between Vision Source's traditional healthcare audience and a transformative technology platform that positions optometry at the intersection of AI, wearables, and brain-computer interfaces.

**Why This Matters**: Board members and external partners need to *experience* the platform, not just hear about it. The demo proves VSDP isn't vaporware while maintaining flexibility to evolve as the actual platform develops.

## Core User Journeys

### Journey 1: Board Member Preparation

**Persona**: Vision Source board member (Optometrist), 60 years old, reviews on iPad before board meeting
 **Goal**: Understand strategic rationale for VSDP investment
 **Success Metric**: Shares demo link with 2+ colleagues

### Journey 2: Pharma Business Development

**Persona**: Clinical trial operations director at major pharma company
 **Goal**: Evaluate VSDP for reducing trial recruitment time/cost
 **Success Metric**: Requests follow-up meeting

### Journey 3: Health System Integration

**Persona**: CIO at regional hospital system
 **Goal**: Assess VSDP's value for population health management
 **Success Metric**: Introduces to chief medical officer

### Journey 4: Big Tech Partnership

**Persona**: Product manager at Apple/Meta/Google
 **Goal**: Identify consumer health platform opportunities
 **Success Metric**: Escalates to business development team

## Technical Architecture (T3 Stack Implementation)

### Framework Choices

**Next.js 14+ (App Router)**

- Server components for initial page loads (performance)
- Client components for interactive visualizations
- Route groups for stakeholder sections: `/(stakeholders)/providers`, `/(stakeholders)/pharma`, etc.

**TypeScript**

- Strict mode enabled
- Shared types between frontend/backend for data models (DigitalTwin, ClinicalAlert, TrialSimulation)
- Zod schemas for runtime validation

**tRPC**

- API routes for AI chat functionality: `chat.sendMessage`, `chat.getHistory`
- Clinical data simulations: `digitalTwin.getPatientDashboard`, `trials.calculateRecruitment`
- Type-safe client-server communication

**Tailwind CSS**

- Custom design system matching healthcare professionalism
- Animation utilities for smooth transitions
- Responsive breakpoints for mobile board members

**Prisma (Optional for MVP)**

- SQLite for local development
- Store demo session data (which stakeholder paths users explore)
- Analytics tracking without external dependencies

### External Integrations

**Anthropic Claude API (Primary)**

```typescript
// app/api/claude/route.ts
- Endpoint: POST /api/claude
- Handles: Conversational AI for "Living Intelligence Copilot"
- Rate limiting: 10 requests/minute per session
- Fallback: Pre-scripted responses if API unavailable
```

**Recharts/D3.js**

- Data visualizations (patient dashboards, trial simulators)
- Real-time updating graphs responding to user interactions

**Framer Motion**

- Page transitions between stakeholder sections
- Micro-interactions for clinical alerts appearing
- Scroll-triggered animations

## Detailed Feature Requirements

### F1: Landing Page & Journey Selection

**User Story**: As a visitor, I need to immediately understand what VSDP is and choose my relevant stakeholder path.

**Requirements**:

1. Hero section with 15-second explainer video/animation of "Living Intelligence" concept
2. Four prominent stakeholder cards with icons and 1-sentence value propositions:
   - Providers: "Manage 2,000 patients as easily as 20"
   - Pharma: "Run clinical trials in 6 months instead of 24"
   - EHR: "Make optometry your systemic disease early warning system"
   - Big Tech: "Clinical validation for breakthrough consumer health devices"
3. Persistent navigation allowing stakeholder switching
4. Mobile-optimized (60% of board members will view on iPad/phone)

**Acceptance Criteria**:

- Page loads in <2 seconds on 3G connection
- All four pathways accessible within 2 clicks
- Works across Chrome, Safari, Firefox (last 2 versions)

**Technical Implementation**:

```typescript
// app/page.tsx
- Server component for initial render
- Client component for stakeholder cards with hover effects
- Route: / → /(stakeholders)/[stakeholder-type]
```

### F2: Provider Clinical Intelligence Hub

**User Story**: As an optometrist, I need to see how VSDP transforms my daily workflow from reactive to proactive care.

**Requirements**:

**F2.1 Digital Twin Simulator**

- Patient dashboard mockup showing:
  - 3 data streams integrated: OCT trend graph (Visionix), fundus image (Optos), ERG waveform (RetEval)
  - AI-generated alert card: "Patient #4731 (Sarah M.) - IOP increased 4mmHg since last visit 3 weeks ago. Glaucoma risk elevated. Recommend telemedicine check-in."
  - Predictive timeline: "Next likely intervention needed: 23 days"
- Interactive element: Click different patients (5 synthetic profiles) to see varying risk levels
- Side-by-side comparison view: "Traditional model" vs "VSDP model" showing data gaps

**F2.2 AI Clinical Assistant**

- Chat interface (Claude API integration) accepting natural language:
  - Example prompts displayed: "Show diabetic patients with retinopathy progression" | "Which myopia protocols work best?"
  - AI responds with generated visualizations (bar charts, patient lists)
  - Demonstrates context awareness: "Based on your practice's 487 patients..."
- Fallback for API limits: Pre-loaded responses with realistic data

**F2.3 Research Dashboard**

- Network effects visualization:
  - "Your practice: Atropine 0.01% effectiveness 67%"
  - "Network average: 58%"
  - "Recommended protocol adjustment: Increase to 0.025% for myopes >-3.00D"
- Interactive filters: Condition type, age range, treatment protocol

**Acceptance Criteria**:

- Dashboard loads in <3 seconds
- AI responses appear within 5 seconds
- At least 3 different patient profiles explorable
- All visualizations render correctly on mobile

**Technical Implementation**:

```typescript
// app/(stakeholders)/providers/page.tsx
- Client component for interactive dashboard
- tRPC routes: digitalTwin.getPatient, research.getNetworkStats
- Chart components: LineChart (OCT trends), AlertCard, ComparisonTable
- Claude integration: Real API with fallback to mock responses
```

### F3: Pharma Clinical Trial Revolution

**User Story**: As a pharma trial director, I need to see how VSDP reduces recruitment time and costs while improving data quality.

**Requirements**:

**F3.1 Interactive Trial Simulator**

- Form inputs:
  - Condition dropdown: AMD, Glaucoma, Diabetic Retinopathy, Myopia
  - Patient criteria: Age range, disease stage, comorbidities
  - Required sample size
- Real-time calculation output:
  - "Traditional recruitment: 18 months, $4.2M cost"
  - "VSDP recruitment: 2 weeks, $320K cost"
  - "Eligible patients in network: 3,847"
  - Map visualization showing geographic distribution across Vision Source practices
- Export button: "Download trial feasibility report (PDF)"

**F3.2 Continuous Monitoring Comparison**

- Split-screen animation:
  - Left: Traditional trial timeline (24 months, quarterly visits, episodic data)
  - Right: VSDP trial timeline (6 months, daily monitoring, continuous data)
  - Highlight: "Same statistical power in 75% less time"
- Interactive adverse event detection:
  - User clicks "Simulate AE" button
  - Traditional model: "Detected at Month 6 visit"
  - VSDP model: "Detected on Day 3, patient contacted immediately"

**F3.3 AI-Powered RWE (Real-World Evidence) Analysis**

- Chat interface for pharma-specific queries:
  - "How do outcomes differ by age group for this AMD drug?"
  - AI generates: Age-stratified response curves, subgroup analysis tables
  - "Which baseline biomarkers predict treatment response?"
  - AI shows: Correlation heatmap, predictive model accuracy

**Acceptance Criteria**:

- Trial simulator calculates results in <2 seconds
- At least 4 condition types supported with realistic numbers
- Comparison animation plays smoothly (60fps)
- PDF export generates valid document

**Technical Implementation**:

```typescript
// app/(stakeholders)/pharma/page.tsx
- tRPC routes: trials.calculateFeasibility, trials.compareTimelines
- Form validation with Zod schemas
- PDF generation: jsPDF or server-side Puppeteer
- Animation: Framer Motion timeline sequences
```

### F4: EHR Integration Layer

**User Story**: As a health system CIO, I need to see how VSDP connects specialty eye care data to systemic disease management in our existing EHR.

**Requirements**:

**F4.1 Patient Journey Flow Diagram**

- Interactive Sankey diagram or flowchart showing:
  - Step 1: Diabetic patient has routine eye exam → VSDP detects early retinopathy
  - Step 2: VSDP sends FHIR message to Epic → Alert appears in endocrinologist's inbox
  - Step 3: Endocrinologist adjusts treatment → VSDP tracks retinal response over 3 months
  - Step 4: Loop closes → Outcomes feed back to both providers
- User can click each step to see sample data payloads (FHIR JSON)
- Hover tooltips explain: "This uses FHIR DiagnosticReport resource"

**F4.2 Population Health Dashboard**

- Statistics visualizations:
  - "42% of diabetic patients show retinal changes before A1C elevation"
  - "Average early detection lead time: 6.3 months"
  - Cost calculator: "Early intervention saves $X per patient per year"
- Interactive cohort filtering: Filter by condition (diabetes, hypertension, obesity)
- Geographic heat map: "Practices with highest systemic disease detection rates"

**F4.3 Live API Integration Demo**

- Simulated FHIR API playground:
  - User clicks "Send Test Alert" button
  - Shows HTTP request/response in split view
  - Response creates visual alert in mock EHR interface
  - Demonstrates bidirectional data flow

**Acceptance Criteria**:

- Journey diagram renders on all screen sizes
- FHIR examples are valid and well-formatted
- Cost calculator updates in real-time as user adjusts parameters
- API demo completes in <5 seconds

**Technical Implementation**:

```typescript
// app/(stakeholders)/ehr/page.tsx
- React Flow or Mermaid.js for journey diagram
- tRPC routes: population.getStats, fhir.simulateExchange
- Monaco Editor component for FHIR JSON display
- Cost calculator: Client-side computation with configurable parameters
```

### F5: Big Tech Consumer Platform

**User Story**: As a big tech product manager, I need to see how VSDP's clinical foundation enables consumer health applications impossible to build from scratch.

**Requirements**:

**F5.1 Consumer Digital Twin App Mockup**

- iPhone/Android app interface simulation:
  - Home screen: "Your Eye Health Score: 87/100"
  - User taps "Scan Your Eyes" button → Phone camera activates (simulated)
  - Progress animation: "Analyzing retinal vessels... Measuring pupil response..."
  - Results screen:
    - "Myopia progression risk: +15% this month"
    - Recommendations: "Increase outdoor time by 30 min/day"
    - Link to Apple Health: "Your screen time increased 2 hrs/day"
- Gamification elements:
  - Weekly challenges: "Complete 3 outdoor activities"
  - Social comparison: "Better than 68% of your age group"
  - Streaks: "7-day check-in streak!"

**F5.2 XR Integration Showcase**

- Video or 3D animation demonstrating:
  - Smart contact lens with embedded sensors
  - User wearing AR glasses controlled by eye movements
  - ERG/VEP signals detecting intent: "User thinks 'select' → Interface responds"
  - Use cases: Gaming, accessibility, productivity
- Technical explainer section:
  - "How it works: RetEval ERG technology miniaturized into contact lens"
  - "Advantages over camera-based eye tracking: Works in all lighting, measures neural signals"
  - "Clinical validation: FDA clearance pathway through VSDP"

**F5.3 Market Opportunity Calculator**

- Interactive financial model:
  - Input: Contact lens market size (30M US users)
  - Input: Smart lens penetration % (user adjustable slider)
  - Input: Subscription price per month
  - Output: Total addressable market (TAM)
  - Output: Competitive moat value (proprietary algorithms trained on VSDP data)
- Comparison table: "Building from scratch vs partnering with VSDP"
  - Time to FDA clearance: 7 years vs 2 years
  - Clinical validation cost: $500M vs $50M (leveraging existing data)
  - Data quality: Cold start problem vs 30,000 practices

**Acceptance Criteria**:

- App mockup looks production-quality (pixel-perfect iOS design)
- XR video plays smoothly with captions
- Calculator updates in real-time, handles edge cases (negative numbers)
- Comparison table clearly shows VSDP advantage

**Technical Implementation**:

```typescript
// app/(stakeholders)/bigtech/page.tsx
- Phone mockup: react-device-frameset or custom CSS
- Video: HTML5 video with play/pause controls, or Lottie animation
- Calculator: Client-side React state with formatted currency outputs
- 3D visualization (optional): Three.js for contact lens model
```

### F6: Living Intelligence Copilot (Cross-Cutting)

**User Story**: As any visitor, I need on-demand answers to questions about VSDP without leaving the demo.

**Requirements**:

**F6.1 Persistent Chat Interface**

- Floating button (bottom-right corner) opens chat overlay
- Claude API integration for natural language Q&A:
  - Suggested questions appear: "How does privacy work?" | "What's the implementation timeline?" | "How is this different from Epic?"
  - Context-aware responses based on current stakeholder section
  - Maintains conversation history within session
- Graceful degradation: If API unavailable, show pre-written FAQs

**F6.2 Context Awareness**

- Chat knows which section user is viewing:
  - On Provider page: "This digital twin integrates your Optos and Visionix data..."
  - On Pharma page: "Trial recruitment leverages Vision Source's 3,000+ practices..."
- Cites specific numbers from your project knowledge documents

**F6.3 Conversation Intelligence**

- Detects intent to schedule demo: "Would you like me to connect you with our team?"
- Captures lead information: Name, email, organization, stakeholder type
- Stores in database (Prisma) for follow-up

**Acceptance Criteria**:

- Chat responds within 5 seconds 95% of the time
- Works across all four stakeholder sections
- Lead capture form validates email format
- Conversation history persists during session but clears on page refresh

**Technical Implementation**:

```typescript
// components/LivingIntelligenceCopilot.tsx
- Client component with useChat hook (Vercel AI SDK)
- tRPC routes: chat.sendMessage, leads.capture
- Anthropic Claude API: 
  - System prompt includes: Current stakeholder context, VSDP facts from project knowledge
  - Streaming responses for better UX
- Zustand for global chat state management
- Database schema: Session, Message, Lead tables
```

### F7: Integration Overview (Connective Tissue)

**User Story**: After exploring individual sections, I need to see how all four stakeholder views connect into one unified platform.

**Requirements**:

**F7.1 System Architecture Diagram**

- Interactive node-and-edge visualization:
  - Center: VSDP Digital Twin Core
  - Connected nodes: Provider Interface, Pharma API, EHR Integration, Consumer App
  - User hovers over connections to see data flow descriptions
- Animation: Data pulses flowing between nodes

**F7.2 Value Network Map**

- Shows how each stakeholder benefits the others:
  - Providers generate clinical data → Pharma runs better trials → Better treatments return to providers
  - EHR integration → Systemic disease data → Improves digital twin accuracy for all
  - Consumer engagement → Continuous monitoring data → Clinical research quality
- Click stakeholder icon to highlight their benefits

**F7.3 Timeline Roadmap**

- Phased rollout visualization:
  - Phase 1 (Months 0-6): 10-practice pilot, diabetic retinopathy focus
  - Phase 2 (Months 6-12): Healthcare system integration, Epic/Cerner APIs
  - Phase 3 (Year 2): Pharma partnerships, first clinical trials
  - Phase 4 (Year 3): Consumer app launch, big tech partnerships
- Each phase clickable for more details

**Acceptance Criteria**:

- Diagram renders clearly on mobile (simplified view)
- Animations don't exceed 60fps budget
- Roadmap dates align with project knowledge documents

**Technical Implementation**:

```typescript
// app/integration/page.tsx
- React Flow for interactive diagram
- Framer Motion for data pulse animations
- Timeline component: Custom horizontal scrolling on mobile
```

## Non-Functional Requirements

### Performance

- Lighthouse score >90 on all metrics
- Time to Interactive (TTI) <3 seconds on 4G connection
- All API responses <5 seconds (or show loading states)

### Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Screen reader tested (VoiceOver, NVDA)
- Color contrast ratio >4.5:1 for all text

### Security

- No PII collected without explicit consent
- Claude API key stored in environment variables
- Rate limiting on all API endpoints (10 req/min per IP)
- HTTPS enforced (Vercel deployment)

### Browser Support

- Chrome/Edge 100+
- Safari 15+
- Firefox 100+
- Mobile Safari iOS 15+
- Chrome Android 100+

### Analytics & Monitoring

- Track which stakeholder sections users visit (Vercel Analytics)
- Claude API usage metrics (Anthropic dashboard)
- Heatmaps for interaction patterns (optional: Hotjar)
- Lead conversion funnel: Landing → Stakeholder → Chat → Capture

## Data Models

### Digital Twin Patient (Simulated)

```typescript
interface DigitalTwinPatient {
  id: string
  name: string // Synthetic: "Patient #4731 (Sarah M.)"
  age: number
  conditions: ('diabetes' | 'glaucoma' | 'myopia' | 'amd')[]
  riskScore: number // 0-100
  lastVisit: Date
  nextPredictedIntervention: Date
  dataStreams: {
    oct: { date: Date; value: number }[] // Visionix
    fundus: { date: Date; imageUrl: string }[] // Optos
    erg: { date: Date; waveform: number[] }[] // RetEval
  }
  alerts: ClinicalAlert[]
}
```

### Clinical Alert

```typescript
interface ClinicalAlert {
  id: string
  patientId: string
  severity: 'low' | 'medium' | 'high'
  message: string
  generatedAt: Date
  actionRequired: string
}
```

### Trial Simulation Result

```typescript
interface TrialSimulationResult {
  condition: string
  eligiblePatients: number
  recruitmentTime: { traditional: number; vsdp: number } // months
  cost: { traditional: number; vsdp: number } // dollars
  geographicDistribution: { state: string; count: number }[]
}
```

### Chat Session

```typescript
interface ChatSession {
  id: string
  stakeholderContext: 'provider' | 'pharma' | 'ehr' | 'bigtech' | null
  messages: ChatMessage[]
  createdAt: Date
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
```

### Lead Capture

```typescript
interface Lead {
  id: string
  name: string
  email: string
  organization: string
  stakeholderType: string
  interestedInPilot: boolean
  capturedAt: Date
  sessionId: string
}
```

## Technical Debt & Future Considerations

### MVP Tradeoffs

- **Simulated data only**: No real patient data or live integrations
- **Claude API dependency**: Demo limited by API availability/cost
- **No user accounts**: Stateless demo (acceptable for initial version)
- **Simplified mobile**: Some visualizations simplified on small screens

### Post-MVP Enhancements

- Admin dashboard to update demo content without code changes
- A/B testing different stakeholder value propositions
- Multi-language support (Spanish for Vision Source Hispanic market)
- Integration with actual pilot data once available
- Video testimonials from early adopter practices

### Scalability Considerations

- Current architecture supports 1,000+ concurrent users (Vercel serverless)
- If demo goes viral, add Cloudflare CDN for static assets
- Claude API rate limits: May need caching layer for common questions

## Development Phases

### Phase 1: Foundation (Week 1-2)

- T3 Stack setup with TypeScript strict mode
- Landing page with stakeholder selection
- Basic routing and navigation
- Deploy to Vercel staging environment

### Phase 2: Provider & Pharma Sections (Week 2-3)

- F2: Provider Clinical Intelligence Hub
- F3: Pharma Clinical Trial Revolution
- Simulated data generators
- Recharts visualizations

### Phase 3: EHR & Big Tech Sections (Week 3-4)

- F4: EHR Integration Layer
- F5: Big Tech Consumer Platform
- FHIR mockups
- Video/animation integration

### Phase 4: AI & Integration (Week 4-5)

- F6: Living Intelligence Copilot (Claude API)
- F7: Integration overview
- Lead capture forms
- Analytics setup

### Phase 5: Polish & Testing (Week 5-6)

- Accessibility audit
- Mobile optimization
- Performance testing (Lighthouse)
- UAT with Mark and 2-3 board members
- Production deployment

## Success Metrics

### Engagement Metrics

- Average time on site >3 minutes

- > 70% of users explore at least 2 stakeholder sections

- Chat engagement: >40% of users send at least 1 message

### Conversion Metrics

- Lead capture rate: >15% of sessions
- Pilot interest rate: >30% of captured leads
- Demo sharing: >20% of users share link

### Technical Metrics

- 99.9% uptime (Vercel SLA)
- <5% error rate on API calls
- <3s page load time on 95th percentile

## Open Questions & Decisions Needed

1. **Claude API Budget**: What's acceptable monthly spend? (Estimate: $200-500 for 1000 users)
2. **Video Production**: Should XR showcase be animation or live-action? (Recommendation: Lottie animation for budget)
3. **Lead Routing**: Where do captured leads go? CRM integration or email alerts?
4. **Branding**: Use Vision Source brand guidelines or create VSDP-specific design system?
5. **Demo Access**: Public URL or password-protected during board review?

------

