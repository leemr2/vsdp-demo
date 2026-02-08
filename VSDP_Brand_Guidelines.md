# VSDP Demo Brand Guidelines
## Based on Vision Source Corporate Identity

**Version**: 1.0  
**Last Updated**: February 2026  
**Purpose**: Establish consistent visual identity for VSDP demo that builds on Vision Source brand equity while positioning the platform as innovative healthcare technology

---

## Brand Positioning

### Vision Source Core Brand
- **Heritage**: Network of 3,000+ independent optometry practices
- **Positioning**: "Exceptional Eye Care that Goes Beyond Your Eyes"
- **Brand Promise**: Advanced technology + personal care from local, independent doctors
- **Tone**: Professional, trustworthy, patient-focused, community-oriented

### VSDP Sub-Brand Strategy
- **Relationship**: VSDP is Vision Source's technology innovation platform
- **Positioning**: "Vision Source Digital Platform - Transforming Eye Care Through Living Intelligence"
- **Brand Promise**: Clinical excellence meets cutting-edge AI and continuous monitoring
- **Tone**: Forward-thinking, data-driven, yet grounded in clinical expertise and patient outcomes

**Critical Balance**: VSDP must feel innovative and tech-forward while maintaining Vision Source's trusted, professional healthcare heritage. Think "Apple Health meets Mayo Clinic" not "startup disrupting healthcare."

---

## Visual Identity

### Color Palette

#### Primary Colors (Vision Source Heritage)

**VS Blue** (Primary Brand Color)
- HEX: `#005DAA` (approximated from website)
- RGB: `0, 93, 170`
- Usage: Main navigation, primary CTAs, headers
- Meaning: Trust, professionalism, healthcare reliability
- Implementation: Tailwind custom color `vs-blue-primary`

**VS Navy** (Secondary)
- HEX: `#003B6F` (darker shade for depth)
- RGB: `0, 59, 111`
- Usage: Footer, secondary navigation, text on light backgrounds
- Meaning: Authority, expertise, stability
- Implementation: Tailwind custom color `vs-navy`

**White** (Base)
- HEX: `#FFFFFF`
- Usage: Backgrounds, negative space
- Critical: Vision Source uses clean, minimal white space - avoid cluttered designs

#### VSDP Extended Palette (Innovation Layer)

**Electric Blue** (AI/Technology Accent)
- HEX: `#0084FF`
- RGB: `0, 132, 255`
- Usage: AI features, data visualizations, interactive elements
- Meaning: Innovation, intelligence, digital transformation
- Implementation: Tailwind custom color `vsdp-electric`

**Teal** (Health Data)
- HEX: `#00BFA5`
- RGB: `0, 191, 165`
- Usage: Health metrics, positive outcomes, continuous monitoring indicators
- Meaning: Health, vitality, growth
- Implementation: Tailwind custom color `vsdp-teal`

**Purple** (Predictive AI)
- HEX: `#7C4DFF`
- RGB: `124, 77, 255`
- Usage: Predictive analytics, AI-generated insights, future-looking features
- Meaning: Intelligence, foresight, advanced technology
- Implementation: Tailwind custom color `vsdp-purple`

#### Semantic Colors

**Success Green**
- HEX: `#00C853`
- Usage: Positive health outcomes, successful interventions, goal achievements

**Warning Amber**
- HEX: `#FF6F00`
- Usage: Medium-priority alerts, "attention needed" states

**Alert Red**
- HEX: `#D32F2F`
- Usage: High-priority clinical alerts, urgent actions required

**Neutral Grays**
- Gray 50: `#F9FAFB` (Backgrounds)
- Gray 100: `#F3F4F6` (Subtle backgrounds)
- Gray 300: `#D1D5DB` (Borders)
- Gray 500: `#6B7280` (Secondary text)
- Gray 700: `#374151` (Body text)
- Gray 900: `#111827` (Headlines)

### Color Usage Rules

1. **Primary Actions**: Always VS Blue (`#005DAA`)
2. **AI Features**: Electric Blue (`#0084FF`) with 10-20% opacity overlays
3. **Data Visualizations**: Use extended palette (Electric Blue, Teal, Purple) with VS Blue as anchor
4. **Clinical Alerts**: Semantic colors (Green/Amber/Red) with gray backgrounds, never on colored backgrounds
5. **Backgrounds**: White primary, Gray 50 for subtle sections, never use colored backgrounds for large areas
6. **Gradients**: Acceptable for hero sections only - VS Blue to Electric Blue (45° angle)

---

## Typography

### Font Families

**Primary**: **Inter** (Modern, accessible, clinical-friendly)
- Usage: Body copy, UI elements, data displays
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Rationale: Excellent readability at small sizes, professional yet approachable, widely used in healthcare/tech

**Headings**: **Inter** (Consistency over distinction)
- Usage: H1-H6, navigation, card titles
- Weights: 600 (Semibold for H3-H6), 700 (Bold for H1-H2)
- Rationale: Vision Source uses clean, minimal design - avoid font mixing

**Monospace**: **JetBrains Mono** (Technical data)
- Usage: Code snippets, API examples, ERG waveforms, technical IDs
- Weight: 400 (Regular)
- Fallback: `'Courier New', monospace`

### Type Scale (Desktop)

```css
/* Headlines */
H1: 48px / 56px line-height / 700 weight / -0.02em tracking
H2: 36px / 44px / 700 / -0.01em
H3: 30px / 38px / 600 / -0.01em
H4: 24px / 32px / 600 / normal
H5: 20px / 28px / 600 / normal
H6: 18px / 26px / 600 / normal

/* Body */
Body Large: 18px / 28px / 400 / normal
Body: 16px / 24px / 400 / normal
Body Small: 14px / 20px / 400 / normal

/* UI Elements */
Button: 16px / 24px / 600 / normal
Caption: 12px / 16px / 500 / 0.01em (all caps for labels)
```

### Type Scale (Mobile)

```css
H1: 36px / 44px / 700 / -0.02em
H2: 30px / 38px / 700 / -0.01em
H3: 24px / 32px / 600 / -0.01em
/* H4-H6 same as desktop */
/* Body same as desktop */
```

### Typography Rules

1. **Line Length**: 60-75 characters for body text (ideal readability)
2. **Paragraph Spacing**: 1.5em between paragraphs
3. **Headings**: Never use all-caps except for UI labels (<12px)
4. **Color Contrast**: Minimum 4.5:1 for body text, 3:1 for large text (AA compliance)
5. **Hierarchy**: Maximum 3 font sizes visible in any single section
6. **Medical Terms**: Never italicize medical/clinical terminology - always Regular weight

---

## Iconography

### Icon System

**Style**: Outlined (2px stroke), minimal, geometric
- **Rationale**: Matches Vision Source's clean aesthetic, scales well, accessible
- **Library**: Lucide React (recommended for T3 stack consistency)
- **Alternative**: Heroicons v2 (outline variant)

**Size Scale**:
- Small: 16x16px (inline with text)
- Medium: 24x24px (buttons, cards)
- Large: 32x32px (feature highlights)
- Hero: 48x48px (section headers)

**Color Usage**:
- Primary state: Gray 500 (`#6B7280`)
- Hover state: VS Blue (`#005DAA`)
- Active state: Electric Blue (`#0084FF`)
- Disabled: Gray 300 (`#D1D5DB`)

### Required Icon Categories

**Navigation & UI**:
- Home, Menu, Close, Search, Settings, User, ChevronDown, ChevronRight, ArrowLeft, ArrowRight

**Healthcare/Clinical**:
- Eye, Heart, Brain, Activity (vitals), Stethoscope, Pill, ClipboardList, Calendar, AlertCircle, CheckCircle

**Technology/Data**:
- Database, Server, Cloud, Lock, Shield, Zap (AI), TrendingUp, BarChart, LineChart, Cpu

**Stakeholder-Specific**:
- Microscope (Pharma), Building (EHR), Smartphone (Big Tech), Users (Providers)

### Custom Icons You'll Need to Provide

1. **Vision Source Logo**
   - Format: SVG (scalable)
   - Variants: Full logo, icon-only mark
   - Usage: Header navigation (left aligned)
   - Size: 180px wide × 40px tall (full logo), 40x40px (icon)

2. **VSDP Logo/Wordmark**
   - Format: SVG
   - Variants: Full ("Vision Source Digital Platform"), abbreviated ("VSDP")
   - Usage: Hero section, footer, loading screens
   - Color: VS Blue primary, white on dark backgrounds

3. **Digital Twin Icon** (Critical - unique to VSDP)
   - Concept: Eye shape with network nodes or data streams
   - Style: Outlined, 2px stroke, 48x48px
   - Usage: Hero section, stakeholder cards, dashboard headers

4. **Living Intelligence Icon**
   - Concept: Brain + eye + circuit board synthesis
   - Style: Outlined geometric, 48x48px
   - Usage: Chat interface, AI features, technology explainers

5. **Stakeholder Icons** (4 custom)
   - Provider: Doctor with stethoscope + digital overlay
   - Pharma: Molecule structure + data nodes
   - EHR: Hospital building + integration arrows
   - Big Tech: Smartphone + eye (contact lens)
   - Style: Outlined, 64x64px, VS Blue with Electric Blue accents

### Icon Usage Rules

1. **Spacing**: Minimum 8px padding around icons
2. **Alignment**: Vertically center with adjacent text
3. **Grouping**: Never use more than 3 icons in a horizontal row without labels
4. **Animation**: Subtle hover scale (1.05x), 200ms ease-out transition
5. **Accessibility**: Always include aria-label or sr-only text

---

## Component Design Patterns

### Buttons

**Primary Button** (Main CTAs)
```css
Background: VS Blue (#005DAA)
Text: White, 16px, 600 weight
Padding: 12px 24px
Border-radius: 8px
Hover: Background darkens to VS Navy (#003B6F)
Active: Scale 0.98
Disabled: Gray 300 background, Gray 500 text
```

**Secondary Button** (Less important actions)
```css
Background: White
Text: VS Blue, 16px, 600 weight
Border: 2px solid VS Blue
Padding: 12px 24px
Border-radius: 8px
Hover: Background VS Blue, text White
```

**Tertiary Button** (Inline links)
```css
Background: Transparent
Text: VS Blue, 16px, 600 weight, underline on hover
Padding: 4px 0
```

**AI Button** (Chat interface, AI features)
```css
Background: Gradient (VS Blue to Electric Blue, 135°)
Text: White, 16px, 600 weight
Padding: 12px 24px
Border-radius: 8px
Icon: Zap icon, 20px, white
Hover: Brightness 110%
Subtle animation: Gradient shift on hover
```

### Cards

**Standard Card**
```css
Background: White
Border: 1px solid Gray 300
Border-radius: 12px
Padding: 24px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover: Shadow 0 4px 12px rgba(0,0,0,0.15), translate Y -2px
Transition: 200ms ease-out
```

**Feature Card** (Stakeholder sections)
```css
Background: White
Border: 2px solid Electric Blue (20% opacity)
Border-radius: 16px
Padding: 32px
Shadow: 0 4px 8px rgba(0,132,255,0.1)
Header: VS Blue, 24px, 600 weight
Icon: 48px, Electric Blue
```

**Alert Card** (Clinical alerts)
```css
Background: Semantic color (10% opacity) - Red/Amber/Green
Border-left: 4px solid semantic color (full opacity)
Border-radius: 8px
Padding: 16px 20px
Icon: 24px, semantic color
Text: Gray 900, 16px, 400 weight
```

### Forms & Inputs

**Text Input**
```css
Background: White
Border: 1px solid Gray 300
Border-radius: 8px
Padding: 12px 16px
Font: 16px, 400 weight
Placeholder: Gray 500
Focus: Border Electric Blue (2px), shadow 0 0 0 3px rgba(0,132,255,0.1)
Error: Border Alert Red, helper text Red
```

**Dropdown/Select**
```css
Same as text input
ChevronDown icon: Gray 500, 20px
Hover: Border Gray 500
```

**Checkbox/Radio**
```css
Size: 20x20px
Border: 2px solid Gray 300
Border-radius: 4px (checkbox), 50% (radio)
Checked: Background VS Blue, white checkmark
Focus: Shadow 0 0 0 3px rgba(0,93,170,0.1)
```

### Data Visualizations

**Chart Colors** (Use in order)
1. Electric Blue (`#0084FF`)
2. Teal (`#00BFA5`)
3. Purple (`#7C4DFF`)
4. VS Blue (`#005DAA`)
5. Warning Amber (`#FF6F00`)
6. Success Green (`#00C853`)

**Chart Styles**:
- Line charts: 2px stroke, smooth curves, no fills
- Bar charts: 8px border-radius on top corners
- Axis labels: Gray 500, 12px
- Grid lines: Gray 200, 1px, dashed
- Tooltips: White background, Gray 900 text, subtle shadow

**Clinical Data Display**:
- OCT/ERG waveforms: Electric Blue line, 2px stroke
- Trend lines: Dotted (good trend: Green, concerning: Amber, critical: Red)
- Data points: 6px circle, Electric Blue fill, white border

### Navigation

**Header Navigation**
```css
Background: White
Border-bottom: 1px solid Gray 200
Height: 72px
Padding: 0 24px
Logo: Left-aligned, 180px wide
Nav items: Gray 700, 16px, 500 weight, 16px spacing
Hover: VS Blue, underline 2px
Active: VS Blue, underline 2px
Mobile: Hamburger menu (Gray 700), slide-in drawer
```

**Footer**
```css
Background: Gray 900
Text: Gray 300, 14px
Links: Gray 300, hover White
Padding: 48px 24px
Logo: White version, 160px wide
Sections: 3-column grid (desktop), stacked (mobile)
```

### Modals & Overlays

**Modal**
```css
Backdrop: Black, 50% opacity
Content: White, 600px max-width, 24px padding
Border-radius: 16px
Close button: Top-right, Gray 500, hover Gray 900
Animation: Fade in + scale from 0.95 to 1.0, 200ms
```

**Chat Overlay** (Living Intelligence Copilot)
```css
Position: Fixed bottom-right, 24px from edges
Width: 400px, height 600px (desktop), fullscreen (mobile)
Background: White
Border-radius: 16px (desktop only)
Shadow: 0 8px 24px rgba(0,0,0,0.15)
Header: Gradient (VS Blue to Electric Blue), white text
Messages: Alternating left (user, Gray 100 bg) / right (AI, Electric Blue 10% bg)
Input: Bottom sticky, white background, Gray 300 top border
```

---

## Imagery & Photography

### Photography Style

**Vision Source Core Brand**:
- Real patients/doctors (diverse, authentic)
- Warm lighting, natural settings
- Focus on human connection and care
- Avoid stock photo "perfection"

**VSDP Demo Adaptation**:
- Use sparingly - prioritize data visualizations over photos
- When used: Show technology in clinical context (OCT machines, digital interfaces)
- Hero sections: Abstract eye imagery or data visualization backgrounds
- Avoid: Generic "person looking at screen" stock photos

### Image Specifications

**Hero Images**:
- Format: WebP with PNG fallback
- Dimensions: 1920x1080px minimum
- Compression: 80% quality
- Usage: Full-width background with overlay gradient (VS Blue to transparent)

**Thumbnail Images**:
- Format: WebP
- Dimensions: 400x300px
- Compression: 85% quality
- Border-radius: 8px

**Icons/Logos**:
- Format: SVG preferred, PNG fallback
- Optimization: SVGO compressed
- Sizing: Responsive using viewBox

### Image Treatment Rules

1. **Overlays**: Use 40% opacity VS Blue gradient for text readability
2. **Filters**: Subtle (10% saturation reduction for clinical professionalism)
3. **Alt Text**: Always descriptive, never "image" or empty
4. **Loading**: Lazy load below fold, blur placeholder (BlurHash)

---

## Motion & Animation

### Animation Principles

1. **Purposeful**: Animations guide attention, never distract
2. **Subtle**: Healthcare context requires restraint
3. **Fast**: 200-300ms for UI interactions, 500ms max for complex transitions
4. **Natural**: Ease-out for entrances, ease-in for exits

### Standard Transitions

**Page Transitions**:
```css
Duration: 300ms
Easing: cubic-bezier(0.4, 0.0, 0.2, 1) /* ease-out */
Effect: Fade + slide up 20px
```

**Hover States**:
```css
Duration: 200ms
Easing: ease-out
Effect: Scale 1.02 (cards), translate Y -2px (buttons)
```

**Modal Entrance**:
```css
Duration: 250ms
Easing: cubic-bezier(0.0, 0.0, 0.2, 1)
Effect: Fade backdrop + scale content 0.95 → 1.0
```

**Data Visualization Loading**:
```css
Duration: 500ms
Easing: ease-out
Effect: Staggered entrance (charts appear sequentially, 100ms delay)
```

### Micro-interactions

**Button Click**:
- Scale: 0.98 for 100ms
- Optional ripple effect (Material Design style, Electric Blue)

**Alert Appearance**:
- Slide in from right (desktop) or top (mobile)
- Duration: 300ms with bounce ease-out
- Auto-dismiss after 5 seconds (or user interaction)

**Chat Message**:
- Fade in + slide up 10px
- Typing indicator: Three dots pulse animation, 600ms loop

**Loading States**:
- Skeleton screens (Gray 100 background, shimmer effect)
- Spinner: Circular, Electric Blue, 2px stroke, 40px diameter

### Animation Don'ts

❌ No parallax scrolling (causes motion sickness)  
❌ No auto-playing videos with sound  
❌ No infinite loops without user control  
❌ No animations >500ms duration  
❌ No "bouncy" effects in clinical data displays  

---

## Responsive Breakpoints

### Standard Breakpoints (Tailwind defaults)

```javascript
{
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet portrait
  'lg': '1024px',  // Tablet landscape / small laptop
  'xl': '1280px',  // Desktop
  '2xl': '1536px'  // Large desktop
}
```

### Layout Guidelines

**Mobile (<768px)**:
- Single column layouts
- Stack stakeholder cards vertically
- Hamburger navigation
- Charts: Simplified, scrollable horizontally if needed
- Font sizes: Reduce H1/H2 (see type scale)
- Padding: 16px

**Tablet (768px-1024px)**:
- Two-column layouts where appropriate
- Stakeholder cards: 2-column grid
- Side-by-side comparisons become stacked
- Navigation: Full horizontal
- Padding: 24px

**Desktop (1024px+)**:
- Max content width: 1280px (centered)
- Three-column layouts for footer/features
- Stakeholder cards: 2x2 grid
- Charts: Full interactive features
- Padding: 32px (lg) to 48px (xl)

### Responsive Typography

Use Tailwind's responsive utilities:
```jsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
```

Never rely on viewport units (vw/vh) for text sizing.

---

## Accessibility Standards

### WCAG 2.1 AA Compliance Requirements

**Color Contrast**:
- Body text (16px): Minimum 4.5:1 against background
- Large text (18px+): Minimum 3.0:1
- UI components: Minimum 3.0:1 for borders/icons
- Test tool: https://webaim.org/resources/contrastchecker/

**Keyboard Navigation**:
- All interactive elements focusable via Tab
- Focus indicators: 2px solid Electric Blue, 3px offset
- Skip links: "Skip to main content" (sr-only, visible on focus)
- Modal traps: Focus remains in modal until closed

**Screen Reader Support**:
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`
- ARIA labels: Buttons, icons, complex widgets
- Alt text: Descriptive, concise (<125 characters)
- Live regions: `aria-live="polite"` for alerts, `"assertive"` for urgent clinical alerts

**Focus Management**:
- Visible focus indicators (never `outline: none` without replacement)
- Logical tab order (follows visual layout)
- Focus returns to trigger element when closing modals

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Color is not the only means of conveying information
- [ ] Form inputs have associated labels
- [ ] Error messages are clear and associated with inputs
- [ ] Videos have captions
- [ ] Interactive elements have focus states
- [ ] Animations can be disabled (prefers-reduced-motion)
- [ ] Lighthouse Accessibility score >95

---

## Voice & Messaging

### Vision Source Brand Voice

**Core Attributes**:
- **Professional**: Clinical expertise, decades of experience
- **Personal**: Local, independent doctors who know you
- **Trustworthy**: Part of your community, invested in your health
- **Accessible**: Clear communication, no jargon

**Taglines**:
- Primary: "Exceptional Eye Care that Goes Beyond Your Eyes"
- Emphasizes: Comprehensive care, not just vision correction

### VSDP Voice Evolution

**Core Attributes**:
- **Innovative**: Leading-edge technology, AI-powered insights
- **Evidence-based**: Data-driven, clinical validation
- **Empowering**: Puts information in providers' hands
- **Future-focused**: Continuous care, predictive health

**Messaging Framework**:

**For Providers**:
- Tone: Collegial, respectful of clinical expertise
- Frame: "Augment your practice" not "replace your judgment"
- Example: "Transform your clinical workflow while maintaining the personal care your patients expect"

**For Pharma**:
- Tone: Business-focused, ROI-driven
- Frame: "Infrastructure for innovation"
- Example: "Reduce trial timelines by 70% while capturing real-world evidence from day one"

**For EHR Teams**:
- Tone: Technical but accessible, integration-focused
- Frame: "The missing link in population health"
- Example: "Optometry becomes your continuous monitoring gateway for systemic disease"

**For Big Tech**:
- Tone: Visionary, market opportunity
- Frame: "Clinical foundation for consumer breakthrough"
- Example: "FDA-cleared pathway to 30 million smart contact lens users"

### Writing Guidelines

**Do**:
- Use active voice: "VSDP detects progression" not "progression is detected"
- Lead with benefits: "Manage 2,000 patients proactively" before "using AI and digital twins"
- Explain acronyms on first use: "Vision Source Digital Platform (VSDP)"
- Use parallel structure in lists
- Keep sentences <25 words for readability

**Don't**:
- Use healthcare clichés: "revolutionize", "disrupt", "game-changer"
- Over-promise: "eliminate missed diagnoses" → "reduce missed diagnoses"
- Use tech jargon without context: Explain "digital twin" in plain language
- Diminish current care: Frame as evolution not replacement
- Use all-caps for emphasis (except UI labels)

### Content Tone Examples

**Too Corporate**:
> "Vision Source Digital Platform leverages cutting-edge artificial intelligence and machine learning algorithms to enable paradigm-shifting care delivery models."

**Too Casual**:
> "VSDP is super cool AI that helps eye doctors see way more patients without getting overwhelmed!"

**Just Right**:
> "VSDP combines AI-powered insights with continuous monitoring to help optometrists provide proactive care to more patients, catching problems before they become serious."

---

## Implementation in T3 Stack

### Tailwind Configuration

```javascript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Vision Source Core
        'vs-blue': {
          primary: '#005DAA',
          navy: '#003B6F',
        },
        // VSDP Extended
        'vsdp': {
          electric: '#0084FF',
          teal: '#00BFA5',
          purple: '#7C4DFF',
        },
        // Semantic
        'clinical': {
          success: '#00C853',
          warning: '#FF6F00',
          alert: '#D32F2F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Custom scale
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### Component Library Structure

```
src/
├── components/
│   ├── ui/              # Base components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── brand/           # Vision Source branded components
│   │   ├── VSHeader.tsx
│   │   ├── VSFooter.tsx
│   │   └── VSLogo.tsx
│   └── vsdp/            # VSDP-specific components
│       ├── DigitalTwinCard.tsx
│       ├── ClinicalAlert.tsx
│       └── LivingIntelligenceCopilot.tsx
```

---

## Asset Delivery Requirements

### Required Assets from You

1. **Vision Source Logo**
   - Files: `vs-logo.svg`, `vs-logo-white.svg`, `vs-icon.svg`
   - Dimensions: SVG (scalable), export at 180x40px reference
   
2. **VSDP Logo/Wordmark**
   - Files: `vsdp-logo.svg`, `vsdp-wordmark.svg`
   - Variations: Color, white, icon-only

3. **Custom Icons** (5 total)
   - `digital-twin-icon.svg` (48x48px)
   - `living-intelligence-icon.svg` (48x48px)
   - `stakeholder-provider-icon.svg` (64x64px)
   - `stakeholder-pharma-icon.svg` (64x64px)
   - `stakeholder-ehr-icon.svg` (64x64px)
   - `stakeholder-bigtech-icon.svg` (64x64px)

4. **Hero Images** (Optional)
   - `hero-landing.webp` (1920x1080px)
   - Abstract eye/technology imagery

### File Naming Convention

```
[brand]-[element]-[variant].[extension]

Examples:
vs-logo-color.svg
vs-logo-white.svg
vsdp-icon-primary.svg
hero-providers-bg.webp
```

### Folder Structure

```
public/
├── images/
│   ├── logos/
│   ├── icons/
│   └── heroes/
└── fonts/
    └── inter/ (if self-hosting)
```

---

## Brand Governance

### When to Use Vision Source vs VSDP Branding

**Vision Source Logo**: 
- Header navigation (always present)
- Footer
- Print materials for board presentations

**VSDP Branding**:
- Hero section headline
- Stakeholder section headers
- Demo-specific UI elements
- Chat interface

**Combined**:
- Tagline: "Vision Source Digital Platform" (Vision Source in VS Blue, "Digital Platform" in Electric Blue)

### Approval Requirements

For MVP demo:
- Mark reviews all copy and messaging
- Board preview before external distribution
- No promises about timelines or features without product team approval

### Brand Misuse Examples

❌ Using Vision Source logo on generic tech interfaces  
❌ Implying VSDP is live/available to patients now  
❌ Making claims about FDA approval without verification  
❌ Showing real patient data or PHI  
❌ Using competitor logos without permission  

---

## Quick Reference Checklist

### Pre-Development
- [ ] Tailwind config updated with custom colors
- [ ] Inter font loaded (Google Fonts or self-hosted)
- [ ] Lucide React installed for icons
- [ ] Asset folder structure created
- [ ] Brand colors exported as CSS variables

### During Development
- [ ] All buttons use defined button styles
- [ ] Color contrast tested (WebAIM tool)
- [ ] Focus states visible on all interactive elements
- [ ] Typography scale followed (no arbitrary sizes)
- [ ] Icons have proper aria-labels
- [ ] Animations respect prefers-reduced-motion

### Pre-Launch
- [ ] Lighthouse Accessibility score >95
- [ ] Mobile responsive on iPhone/iPad
- [ ] Brand review completed by Mark
- [ ] All placeholder text replaced
- [ ] Analytics tracking implemented
- [ ] Error states designed and tested

---

## Contact & Resources

**Brand Assets**: (Awaiting your delivery)  
**Questions**: Contact Mark for clarification  
**Design Tool**: Figma (if needed for mockups)  
**Testing Tools**: 
- Contrast checker: https://webaim.org/resources/contrastchecker/
- Responsive testing: Chrome DevTools
- Accessibility: axe DevTools browser extension

**Vision Source Website**: https://www.visionsource.com (reference for voice/tone)

---

**Version History**:
- v1.0 (Feb 2026): Initial brand guidelines based on Vision Source corporate site analysis
