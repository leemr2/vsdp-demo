# Product Requirements Document: VSDP Interactive Demo

## Executive Summary

Build an interactive web demonstration of the Vision Source Digital Platform (VSDP) that enables four key stakeholder groups (Providers, Pharma, EHR Teams, Big Tech) to experience how Living Intelligence transforms optometry from episodic care to continuous health management. The demo will serve as both a board presentation tool and external stakeholder engagement platform.

**Tech Stack**: T3 Stack (Next.js, TypeScript, tRPC, Tailwind CSS, Prisma) **Timeline**: 4-6 week MVP **Primary Goal**: Convert stakeholder understanding from concept to concrete value proposition within 5 minutes of interaction

**Core Demonstration Strategy**: Use concrete patient journey transformations to show the shift from fragmented, reactive care to unified, proactive care. The demo must make practitioners feel the pain of the current "context problem" before revealing how VSDP solves it.

## Project Context & Strategic Importance

This demo represents the first tangible manifestation of VSDP's vision. It must bridge the gap between Vision Source's traditional healthcare audience and a transformative technology platform that positions optometry at the intersection of AI, wearables, and brain-computer interfaces.

**Why This Matters**: Board members and external partners need to *experience* the platform, not just hear about it. The demo proves VSDP isn't vaporware while maintaining flexibility to evolve as the actual platform develops.

### The Fundamental Mental Shift We're Demonstrating

**From Information Archaeologist to Strategic Decision-Maker**

Current State (what practitioners feel daily):
- "Let me search my EHR and try to remember what's happening with this patient"
- Hunting through multiple disconnected systems
- Making decisions based on what you can *find* rather than what you *know* should inform care
- Reconstructing patient stories from fragments every visit

VSDP State (what we're proving is possible):
- "The digital twin presents complete context automatically"
- All relevant data integrated, normalized, and presented as unified patient state
- Predictive insights about disease progression and optimal intervention timing
- Personalized recommendations based on this specific patient's patterns AND network collective learning

**This is the core transformation the demo must make visceral and undeniable.**

## Core User Journeys

### Journey 1: Board Member Preparation

**Persona**: Vision Source board member (Optometrist), 60 years old, reviews on iPad before board meeting
 **Goal**: Understand strategic rationale for VSDP investment and see how it transforms daily clinical workflow
 **Pain Point**: Currently juggles multiple systems (Optos, OCT viewer, EHR) and makes decisions on incomplete data
 **Success Metric**: Shares demo link with 2+ colleagues and requests pilot program information

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

**User Story**: As a visitor, I need to immediately understand what VSDP is and choose my relevant stakeholder path, while feeling the emotional weight of the problem being solved.

**Requirements**:

1. **Hero Section** - Problem-First Narrative:
   - Opening line: "What if you never had to hunt for patient information again?"
   - 15-second explainer video/animation showing:
     - Practitioner switching between multiple screens (Optos, OCT, EHR)
     - Visual of data silos with red X marks
     - Transition: Screens merge into one unified interface
     - Patient outcome comparison: "20/200 vision loss" vs "20/30 vision preserved"
   - Tagline: "Vision Source Digital Platform: Transform Your Practice from Information Archaeologist to Strategic Decision-Maker"
   - Subtitle: "Living Intelligence that integrates all your data, predicts patient needs, and personalizes care at scale"

2. **Four Stakeholder Pathways** - Value Proposition Cards:
   Each card should include:
   - Icon representing stakeholder
   - Primary value proposition (one sentence)
   - Secondary benefit bullets (3-4 items)
   - Specific metric/outcome
   - "Explore →" button

   **Provider Card**:
   - Icon: Stethoscope/Eye symbol
   - Primary: "Manage 2,000 patients with the insight you'd give to 20"
   - Bullets:
     - "Complete patient context automatically—no more system hunting"
     - "AI predicts disease progression and optimal intervention timing"
     - "Network learning from 3,000+ practices improves your outcomes"
     - "Free up 47+ hours/month from chart review and documentation"
   - Metric: "Early detection lead time: 6.3 months average"

   **Pharma Card**:
   - Icon: Research/Flask symbol
   - Primary: "Run clinical trials in 6 months instead of 24"
   - Bullets:
     - "Recruit 3,847 eligible patients across network in weeks"
     - "Continuous monitoring vs. quarterly visits—same statistical power"
     - "Detect adverse events on Day 3 instead of Month 6"
     - "Real-world evidence analysis with AI-powered insights"
   - Metric: "Trial cost reduction: $4.2M → $320K"

   **EHR/Health System Card**:
   - Icon: Hospital/Network symbol
   - Primary: "Make optometry your systemic disease early warning system"
   - Bullets:
     - "42% of diabetic patients show retinal changes before A1C elevation"
     - "Bidirectional FHIR integration with Epic/Cerner"
     - "Population health dashboard across 30,000 patients"
     - "Close the loop between specialists and primary care"
   - Metric: "Early intervention saves $X per patient per year"

   **Big Tech Card**:
   - Icon: Device/Wearable symbol
   - Primary: "Clinical validation for breakthrough consumer health devices"
   - Bullets:
     - "FDA clearance pathway: 2 years vs. 7 years building from scratch"
     - "30,000 practices = unmatched training data for AI algorithms"
     - "Smart contact lens to XR interface integration"
     - "TAM calculator: 30M contact lens users × subscription model"
   - Metric: "Clinical validation cost: $500M → $50M"

3. **Persistent Navigation**:
   - Top nav bar with all four stakeholder sections always accessible
   - Progress indicator showing which sections have been explored
   - "Start Demo" / "Choose Your Path" prominent CTA
   - "Living Intelligence Copilot" floating chat button (bottom-right)

4. **Mobile/Tablet Optimization**:
   - iPad landscape orientation as primary design target
   - Responsive breakpoints: Desktop (1920px), Laptop (1440px), Tablet (1024px), Mobile (375px)
   - Touch-friendly button sizes (min 44px)
   - Swipeable stakeholder cards on mobile

5. **Trust Signals**:
   - "Developed for Vision Source Network - 3,000+ Practices"
   - Privacy badge: "HIPAA Compliant - No Patient Data Collected"
   - Technology partners logos: Anthropic Claude, Microsoft/Azure (if applicable)

**Acceptance Criteria**:

- Page loads in <2 seconds on 3G connection (Lighthouse performance >90)
- All four pathways accessible within 2 clicks from landing
- Hero video plays smoothly or gracefully falls back to static images
- Works across Chrome, Safari, Firefox (last 2 versions)
- iPad landscape view looks polished (60% of board member traffic)
- Mobile portrait view maintains readability and CTAs are accessible
- Accessibility: Keyboard navigation, screen reader compatible, WCAG 2.1 AA

**Technical Implementation**:

```typescript
// app/page.tsx
- Server component for initial render (SEO, performance)
- Client components:
  - HeroVideo: Auto-play with mute, fallback to images
  - StakeholderCard: Hover effects, click tracking
  - ProgressIndicator: Persists in session storage
- Route structure: / → /(stakeholders)/[stakeholder-type]
- Analytics: Track which card clicked first, time on landing page
- Optimizations:
  - Next.js Image component for stakeholder card icons
  - Lazy load video (only when in viewport)
  - Preload critical fonts and icons
```

### F2: Provider Clinical Intelligence Hub

**User Story**: As an optometrist, I need to see how VSDP transforms my daily workflow from reactive to proactive care through concrete patient examples that mirror my practice reality.

**Design Philosophy**: Start by showing the painful current state (system chaos, incomplete data) before revealing the VSDP solution. Use the "before/after" contrast to create an emotional connection to the problem.

**Requirements**:

**F2.0 The Context Problem Intro (NEW)**

- Interactive "day-in-the-life" scenario that plays automatically on page load:
  - Screen splits showing practitioner juggling multiple systems:
    - Window 1: Optos software loading fundus images
    - Window 2: OCT viewer with separate login
    - Window 3: EHR with sparse previous visit notes
    - Window 4: Patient saying "I have diabetes" - but no glucose data visible
  - Frustrated practitioner voiceover or text overlay: "What was their IOP last time? When did we change their drops? Is their diabetes controlled?"
  - Visual effect: Red highlights around missing data, disconnected systems
  - Duration: 20-30 seconds, skippable
  - Call-to-action: "See how VSDP solves this →" button transitions to solution view

**F2.1 Patient Journey Transformations (ENHANCED)**

Three interactive patient case studies with before/after comparison:

**Case Study 1: AMD Patient (Robert, age 73)**

*Before State (Traditional EHR):*
- Minimal patient card showing:
  - Last visit: 14 months ago
  - Diagnosis: Intermediate dry AMD
  - Visual acuity: 20/30 OD, 20/25 OS
  - Note: "Drusen present, continue AREDS2, RTC 1 year"
- User clicks "Try to make clinical decision" button
- System prompts: "Is he taking his vitamins? Have the drusen changed? What's his cardiovascular status?"
- Reveals: "This information exists in other systems but you don't have access"

*After State (VSDP Digital Twin):*
- Comprehensive dashboard reveals automatically:
  - **Risk Alert Banner**: "AMD Risk Score: 68/100 (↑ from 52) - HIGH PRIORITY"
  - **Automated Image Analysis**: "Drusen volume increased 23% (AI-detected)"
  - **Integrated Health Data**: 
    - AREDS2 adherence: 60% (pharmacy refill data)
    - Blood pressure: 145/92 (from PCP EHR)
    - CGM genetic risk: CFH Y402H positive
  - **Patient-Reported Symptoms**: Timeline showing: "Month 5: Straight lines look wavy when reading"
  - **Network Intelligence**: "Similar patients in top 15% risk category - recommend monthly monitoring"
  - **Personalized Recommendation**: "Risk of wet AMD conversion: 18% in 6 months. Start intensive monitoring protocol."
- Interactive timeline: "With this approach, we detected early CNV at month 2, started anti-VEGF, preserved 20/30 vision"
- Comparison callout: "Traditional annual monitoring: Would have been 20/200+ by detection"

**Case Study 2: Diabetic Retinopathy (Sarah)**

*Before State:*
- EHR shows: "Type 2 diabetes, no DR at last exam (1 year ago), HbA1c 8.2% (6 months ago)"
- Prompt: "Is annual follow-up appropriate?"
- Hidden truth: "Her glucose control has deteriorated significantly since that HbA1c"

*After State:*
- VSDP reveals:
  - **Real-time CGM Integration**: "Time-in-range dropped from 65% to 48% over 3 months"
  - **AI Microaneurysm Detection**: "Count increased from 2 to 7"
  - **Predictive Model**: "72% probability of clinically significant DME within 18 months"
  - **Automated Recommendation**: "Move to 4-month follow-up, coordinate with PCP, consider anti-VEGF consult"
  - **Network Comparison**: "Patients with this glucose variability pattern are in highest-risk progression cohort"

**Case Study 3: Myopia Management (Jake, age 9)**

*Before State:*
- Simple record: "-2.50 D, prescribed ortho-k, RTC 6 months"
- Question: "Is the treatment working?"
- Answer: "You won't know for 6 months, and even then you're just comparing two data points"

*After State:*
- VSDP shows:
  - **Continuous Monitoring**: Screen time tracking, ortho-k wear compliance (sensor), outdoor time (location data with consent)
  - **Pattern Recognition**: "Progression spikes correlate with 4-8pm indoor screen time"
  - **Network Learning**: "1,200 similar patients - response to atropine was minimal in his profile, ortho-k + behavior modification more effective"
  - **Personalized Protocol**: "Target 2+ hours outdoor time on school days, reduce evening screen time - specific to his pattern"
  - **Real-time Verification**: Weekly axial length measurements show treatment effectiveness

**Interactive Elements:**
- Toggle switch: "Show Traditional View" / "Show VSDP View" for each case
- Click patient cards to expand full journey
- "Compare outcomes" button shows side-by-side 2-year projections
- Export button: "Download clinical case summary"

**F2.2 Digital Twin Simulator (ENHANCED)**

- Live dashboard showing practitioner's full patient panel (simulated 487 patients):
  - **Risk Stratification View**: 
    - Color-coded patient grid: Green (stable), Yellow (watch), Red (urgent attention needed)
    - Automatic sorting by urgency
    - "12 patients need attention this week" banner
  - **Proactive Alert Cards**:
    - "Patient #4731: IOP increased 4mmHg since telemedicine check 3 weeks ago - schedule follow-up"
    - "Patient #2145: Hasn't been seen in 18 months, high myopia + family history of retinal detachment - outreach recommended"
    - "Patient #7834: Started new diabetes medication (from PCP EHR) - schedule retinal photo in 3 months"
  - **Time-Saved Calculator**: "VSDP automated 47 hours of chart review this month"
  - **Practice Patterns Dashboard**: 
    - "Your glaucoma patients: Average 18-month co-management before referral vs. network 12 months"
    - "Your myopia control: 73% effectiveness vs. network 58% - share your protocol?"

**F2.3 Integrated Data Streams Visualization**

- Interactive timeline showing data aggregation for one patient:
  - **Clinical Devices**: OCT (Visionix), fundus imaging (Optos), autorefraction, tonometry, visual fields
  - **External Health**: CGM readings, blood pressure, HbA1c labs, medications
  - **Patient-Reported**: Symptoms via app, screen time, outdoor activity
  - **Historical Patterns**: Every visit overlaid, progression trends highlighted
- User can hover over any data point to see source and timestamp
- "Data Quality Score" showing completeness and recency
- Comparison: "Traditional model: 15% of relevant data accessible" vs "VSDP: 94% of relevant data integrated"

**F2.4 AI Clinical Assistant (ENHANCED)**

- Chat interface (Claude API integration) with context-aware prompts:
  - **Example Query 1**: "Show me all diabetic patients whose retinopathy risk has increased"
    - AI generates: Filtered patient list with CGM trends, microaneurysm counts, risk scores
    - Demonstrates: Real-time analysis across entire panel
  - **Example Query 2**: "Which myopia management protocols work best in my practice?"
    - AI shows: Comparative effectiveness data, personalized to your patient demographics
    - Network comparison: "Your atropine 0.01% effectiveness: 67% vs network 58%"
  - **Example Query 3**: "Why is this patient's glaucoma progressing despite IOP control?"
    - AI analyzes: Medication adherence patterns, sleep data, stress correlations
    - Reveals: "Adherence drops to 40% on weekends, IOP spikes correlate with poor sleep periods"
- **Contextual Intelligence Examples**:
  - "This patient's glucose time-in-range dropped 15% - increased retinopathy risk"
  - "Visual field stable for 18 months - consider extending follow-up interval to reduce patient burden"
  - "Similar patients in our network responded best to X treatment approach - 40% better outcomes"
- Fallback for API limits: Pre-loaded realistic responses with data visualizations

**F2.5 Research Dashboard & Network Intelligence**

- **Network Learning Visualization**:
  - Your practice contribution: "Your 487 patients contribute to 3,000+ practice network"
  - Comparative analytics:
    - "Your practice: Atropine 0.01% effectiveness 67%"
    - "Network average: 58%"
    - "Top quartile practices: 71% - recommended protocol adjustments available"
  - Treatment response patterns: "Among 2,400 patients with similar baseline profiles, those who received intervention X showed 40% less progression"
- **Personalized Treatment Recommendations**:
  - "This patient's digital twin suggests they're in the 20% who respond exceptionally to treatment B"
  - "Waiting 6 months risks 35% probability of progression beyond management threshold"
  - "If we start treatment A now, predicted outcome in 12 months is..."
- **Interactive Filters**: 
  - Condition type (glaucoma, AMD, diabetic retinopathy, myopia)
  - Age range
  - Treatment protocol
  - Outcomes (progression vs. stability)
  - Time period
- **Smart Referral Decision Support**:
  - "Optimal referral timing for this glaucoma patient: 8 months based on similar cases"
  - "You're managing proactively - similar patients typically require specialist at this stage"
  - "Consider continuing co-management - objective risk thresholds not yet met"

**F2.7 Clinical Conversation Transformation (NEW)**

- Side-by-side comparison showing how patient conversations change:
  
  **Scenario: AMD Patient Follow-up**
  
  *Traditional Conversation (Left Panel):*
  - Practitioner: "Robert, your AMD looks about the same. Keep taking those vitamins. See you next year."
  - Visual: Generic patient chart, sparse data
  - Outcome indicator: "Detected wet AMD 14 months later at 20/200 vision"
  
  *VSDP-Enabled Conversation (Right Panel):*
  - Practitioner: "Robert, I need to talk with you about some concerning changes. Our AI analysis has been tracking your drusen, and they've grown 23% since we last saw you—that's faster than we'd like to see. Combined with the symptoms you've been reporting in the app about wavy lines, your genetic risk factors, and honestly the fact that you've been missing doses of your vitamins, your risk of converting to wet AMD has jumped significantly.
  
  The good news is we have data from hundreds of patients just like you, and we know exactly what works. If we move to monthly monitoring and get you on a more intensive prevention program—better vitamin adherence, some diet changes, and coordination with your primary doctor on your blood pressure—we can cut your risk in half.
  
  I'm not willing to just watch and wait anymore. Let's be aggressive about protecting your vision."
  - Visual: Rich dashboard with all context, risk scores, network intelligence
  - Outcome indicator: "Detected early CNV at month 2, vision preserved at 20/30"
  - Impact callout: "$180K healthcare cost savings, preserved independence and driving"
  
  **Interactive Elements:**
  - Audio/video clips of both conversations (optional, or text with emphasized key phrases)
  - Click "See the data that enabled this conversation" to reveal VSDP dashboard
  - Timeline slider: "Move forward 2 years" to see outcome comparison
  - Patient testimonial (simulated): "I'm still driving and independent thanks to early detection"
  
**Purpose**: This makes the transformation concrete and emotionally resonant. Practitioners see themselves in this scenario and realize they're currently having the first conversation when they could be having the second.

**F2.8 Strategic Value Proposition**

- **Future-Proofing Section**:
  - Visual showing tech companies (Apple, Meta, Google) developing consumer vision devices
  - Your position: "You maintain control of clinical interpretation layer"
  - Network effect advantage: "Most longitudinal data = most refined AI = strongest competitive position"
- **Time & Efficiency Savings**:
  - Interactive calculator: "Hours saved per week with VSDP automation"
    - Input: Number of patients, average chart review time
    - Output: Annual time savings, revenue opportunity from freed capacity
  - Documentation automation: "Clinical summaries generated automatically"
  - Proactive outreach: "High-risk patients flagged before they deteriorate"

**Acceptance Criteria**:

- Context problem intro plays smoothly, can be skipped
- All three patient case studies load in <3 seconds each
- Before/after toggle switches instantly
- Clinical conversation comparison is emotionally impactful (test with practitioners)
- AI clinical assistant responds within 5 seconds
- Dashboard handles 500+ simulated patients without performance lag
- All visualizations render correctly on iPad (primary device for board members)
- Network intelligence data appears credible and specific
- Time-saved calculator updates in real-time
- At least 3 different patient journeys fully explorable with rich detail
- Outcome timelines clearly show vision preservation and cost savings

**Technical Implementation**:

```typescript
// app/(stakeholders)/providers/page.tsx
- Multiple client components for interactive sections:
  - ContextProblemIntro: Video/animation component with skip functionality
  - PatientJourneyComparison: Toggle-able before/after views for 3 case studies
  - DigitalTwinDashboard: Full patient panel with risk stratification
  - IntegratedDataTimeline: D3.js timeline showing data aggregation
  - ClinicalConversationComparison: Side-by-side traditional vs VSDP patient conversation
  - ClinicalAssistantChat: Claude API integration with streaming responses
  - NetworkIntelligence: Comparative analytics with Recharts
  - EfficiencyCalculator: Real-time ROI computation
  
- tRPC routes: 
  - digitalTwin.getPatient(patientId): Returns full patient context
  - digitalTwin.getPatientPanel(): Returns practice-wide risk scores
  - digitalTwin.compareTraditionalVsVSDP(patientId): Returns side-by-side data
  - research.getNetworkStats(condition, filters): Network comparative data
  - chat.sendClinicalQuery(message, patientContext): Claude integration
  - outcomes.getPatientOutcome(patientId, scenario): Returns 2-year outcome projection
  
- Data components:
  - PatientJourneyCard: Expandable case study with before/after states
  - RiskStratificationGrid: Color-coded patient overview
  - AlertCard: Proactive clinical alerts with action buttons
  - DataStreamTimeline: Integrated multi-source data visualization
  - ComparisonView: Side-by-side traditional vs VSDP
  - ConversationTranscript: Formatted dialogue with key phrases highlighted
  - OutcomeTimeline: Visual progression of patient journey with outcome metrics
  
- Chart libraries:
  - Recharts: Line charts (OCT trends, IOP progression), bar charts (treatment effectiveness)
  - D3.js: Timeline visualization, network graphs
  - Framer Motion: Smooth transitions between before/after states, conversation reveal animations
  
- Claude API integration:
  - Real API with context injection: Current patient data, practice statistics
  - Fallback responses: Pre-written for common clinical queries
  - Streaming: Progressive response rendering for better UX
  
- Simulated data generators:
  - generatePatientPanel(count): Creates realistic patient cohort
  - generateClinicalTimeline(patientId): Multi-year progression data
  - generateNetworkStats(practiceId): Comparative analytics
  - generateOutcomeScenario(patientId, approach): Projects traditional vs VSDP outcomes
  - generateConversationScript(patientId, context): Creates realistic dialogue
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

### Digital Twin Patient (Simulated) - ENHANCED

```typescript
interface DigitalTwinPatient {
  id: string
  name: string // Synthetic: "Patient #4731 (Sarah M.)" or "Robert M., Age 73"
  age: number
  conditions: ('diabetes' | 'glaucoma' | 'myopia' | 'amd' | 'retinal_detachment_risk')[]
  riskScore: number // 0-100
  riskTrend: 'increasing' | 'stable' | 'decreasing'
  lastVisit: Date
  nextScheduledVisit: Date
  nextPredictedIntervention: Date
  
  // Clinical data streams
  dataStreams: {
    oct: { 
      date: Date
      value: number // retinal thickness in microns
      device: 'Visionix'
      qualityScore: number
    }[]
    fundus: { 
      date: Date
      imageUrl: string
      device: 'Optos'
      aiAnalysis: {
        drusenVolume?: number
        microaneurysmCount?: number
        hemorrhageDetected?: boolean
      }
    }[]
    erg: { 
      date: Date
      waveform: number[]
      device: 'RetEval'
    }[]
    iop: {
      date: Date
      value: number
      method: 'tonometry'
    }[]
    visualField: {
      date: Date
      md: number // mean deviation
      vfi: number // visual field index
    }[]
    refraction: {
      date: Date
      sphere: number
      cylinder: number
      axis: number
      eye: 'OD' | 'OS'
    }[]
  }
  
  // External health integration
  externalHealth: {
    cgm?: {
      currentTimeInRange: number // percentage
      previousTimeInRange: number
      glucoseVariability: 'high' | 'moderate' | 'low'
      lastSync: Date
    }
    bloodPressure?: {
      systolic: number
      diastolic: number
      controlled: boolean
      source: 'PCP EHR'
      lastReading: Date
    }
    medications: {
      name: string
      startDate: Date
      source: 'pharmacy' | 'pcp' | 'self-reported'
      adherence?: number // percentage from pharmacy refills
    }[]
    labs?: {
      hba1c?: { value: number; date: Date }
      cholesterol?: { ldl: number; hdl: number; date: Date }
    }
  }
  
  // Patient-reported data
  patientReported: {
    symptoms: {
      date: Date
      description: string
      severity: 1 | 2 | 3 | 4 | 5
    }[]
    lifestyle: {
      screenTime?: number // hours per day
      outdoorTime?: number // hours per day
      exerciseMinutes?: number
      diet?: 'mediterranean' | 'standard' | 'poor'
      smoking?: 'never' | 'former' | 'current'
    }
    compliance: {
      medicationAdherence: number // percentage
      appointmentKeeping: number // percentage
      homeMonitoring: number // percentage
    }
  }
  
  // Genetic and family history
  riskFactors: {
    geneticMarkers?: {
      cfhY402H?: boolean // AMD risk
      myoc?: boolean // glaucoma risk
    }
    familyHistory: string[] // e.g., "Brother with wet AMD at age 68"
    smokingPackYears?: number
  }
  
  // Network intelligence
  networkComparison: {
    similarPatientCount: number
    yourManagementApproach: string
    networkBestPractice: string
    outcomeDifference: number // percentage better/worse
    recommendedAdjustment?: string
  }
  
  // Alerts and predictions
  alerts: ClinicalAlert[]
  predictions: {
    condition: string
    probability: number
    timeframe: string // "6 months", "12 months", etc.
    keyRiskFactors: { factor: string; weight: number }[]
    interventionRecommendation: string
  }[]
}
```

### Clinical Alert - ENHANCED

```typescript
interface ClinicalAlert {
  id: string
  patientId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'progression' | 'adherence' | 'missing_data' | 'external_health' | 'overdue_followup'
  message: string
  detailedExplanation: string
  generatedAt: Date
  actionRequired: string
  actionDeadline?: Date
  automatedOutreach?: boolean
  relatedDataPoints: {
    source: string
    value: string
    date: Date
  }[]
  networkIntelligence?: string // e.g., "Similar patients required intervention within 8 months"
}
```

### Patient Journey Comparison

```typescript
interface PatientJourneyComparison {
  patientId: string
  patientName: string
  condition: string
  
  traditionalApproach: {
    dataAvailable: string[] // limited subset
    missingContext: string[]
    clinicalDecision: string
    outcome: {
      timeToDetection: string
      finalVisualAcuity: string
      interventionTiming: string
      cost: number
    }
  }
  
  vsdpApproach: {
    dataAvailable: string[] // comprehensive
    integratedInsights: string[]
    aiRecommendation: string
    outcome: {
      timeToDetection: string
      finalVisualAcuity: string
      interventionTiming: string
      cost: number
      visionPreserved: string
    }
  }
  
  comparison: {
    visionOutcomeDifference: string
    costSavings: number
    timeToDetection: string
    qualityOfLifeImpact: string
  }
}
```

### Practice Analytics

```typescript
interface PracticeAnalytics {
  practiceId: string
  totalPatients: number
  activeMonitoring: number
  
  riskStratification: {
    critical: number
    high: number
    moderate: number
    low: number
  }
  
  timeSavings: {
    automatedChartReview: number // hours per month
    proactiveAlerts: number // hours per month
    documentationGeneration: number // hours per month
    totalMonthlySavings: number
    annualValueDollars: number
  }
  
  networkPerformance: {
    condition: string
    yourEffectiveness: number // percentage
    networkAverage: number
    networkTopQuartile: number
    ranking: string // e.g., "Top 25%"
  }[]
  
  referralOptimization: {
    condition: string
    averageCoManagementDuration: number // months
    networkAverage: number
    optimalTiming: number
    patientsManageable: number
  }[]
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

- F2.0: Context problem intro animation/video
- F2.1: Three patient journey transformations (AMD, diabetic retinopathy, myopia)
- F2.2: Digital twin simulator with full patient panel
- F2.3: Integrated data streams visualization
- F2.4: AI clinical assistant with Claude integration
- F2.5: Research dashboard and network intelligence
- F2.6: Strategic value proposition section
- F3: Pharma Clinical Trial Revolution
- Comprehensive simulated data generators for realistic patient profiles
- Before/after comparison toggle functionality
- Recharts visualizations for clinical data

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
2. **Video Production**: Should context problem intro and XR showcase be animation or live-action? (Recommendation: Lottie animation for budget, live-action voiceover for practitioner sections)
3. **Lead Routing**: Where do captured leads go? CRM integration or email alerts?
4. **Branding**: Use Vision Source brand guidelines or create VSDP-specific design system?
5. **Demo Access**: Public URL or password-protected during board review?
6. **Patient Case Studies**: Should we create video testimonials or keep as interactive data visualizations? (Recommendation: Start with data viz, add video in post-MVP)
7. **Real Data**: Can we use anonymized data from pilot practices to make case studies more authentic, or stick with purely synthetic data for MVP?
8. **Mobile Experience**: Given 60% iPad usage by board members, should we optimize the provider section specifically for tablet landscape orientation?

## Key Design Principles from Clinical Benefits Analysis

1. **Lead with Pain**: Always show the current state problem before the solution
2. **Concrete over Abstract**: Use specific patient journeys (Robert's AMD, Sarah's diabetes, Jake's myopia) instead of generic features
3. **Quantify Everything**: Show exact percentages, time savings, outcome differences
4. **Emotional Connection**: Make practitioners feel the frustration of missing data, then relief of complete context
5. **Network Effects**: Constantly reinforce that the platform gets smarter with scale
6. **Proactive vs Reactive**: Emphasize the shift from episodic care to continuous monitoring
7. **Time is Money**: Show efficiency gains and capacity freed for revenue-generating activities
8. **Control the Narrative**: Position practitioners as essential clinical interpreters that big tech needs to partner with

------

