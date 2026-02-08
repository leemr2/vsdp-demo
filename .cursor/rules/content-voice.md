---
description: Content, messaging, and voice guidelines for VSDP demo
globs: ["src/**/*.tsx", "src/**/*.ts"]
---

# Content & Voice Guidelines

## Brand Voice Strategy

### Vision Source Core Voice
- **Professional**: Clinical expertise, decades of experience
- **Personal**: Local, independent doctors who know you
- **Trustworthy**: Part of your community
- **Accessible**: Clear communication, no jargon

### VSDP Voice Evolution
- **Innovative**: Leading-edge technology, AI-powered
- **Evidence-based**: Data-driven, clinical validation
- **Empowering**: Puts information in providers' hands
- **Future-focused**: Continuous care, predictive health

**Balance**: "Apple Health meets Mayo Clinic" not "startup disrupting healthcare"

## Stakeholder-Specific Messaging

### For Providers (Optometrists)
**Tone**: Collegial, respectful of clinical expertise

**Frame**: "Augment your practice" not "replace your judgment"

**Examples**:
```tsx
// GOOD
"Transform your clinical workflow while maintaining the personal care your patients expect"
"Manage 2,000 patients with the insight you'd give to 20"
"VSDP integrates all your data so you focus on care, not chart hunting"

// BAD
"AI will revolutionize how you practice medicine"
"Replace outdated workflows with cutting-edge automation"
"Let the platform make decisions for you"
```

### For Pharma
**Tone**: Business-focused, ROI-driven

**Frame**: "Infrastructure for innovation"

**Examples**:
```tsx
// GOOD
"Reduce trial timelines by 70% while capturing real-world evidence from day one"
"Recruit 3,847 eligible patients across our network in weeks, not years"
"Continuous monitoring delivers same statistical power in 75% less time"

// BAD
"Disrupt the clinical trial industry"
"Partner with us to revolutionize drug development"
```

### For EHR/Health Systems
**Tone**: Technical but accessible, integration-focused

**Frame**: "The missing link in population health"

**Examples**:
```tsx
// GOOD
"Optometry becomes your continuous monitoring gateway for systemic disease"
"42% of diabetic patients show retinal changes before A1C elevation"
"Bidirectional FHIR integration with Epic and Cerner"

// BAD
"Replace your current systems with our platform"
"We'll revolutionize your EHR strategy"
```

### For Big Tech
**Tone**: Visionary, market opportunity

**Frame**: "Clinical foundation for consumer breakthrough"

**Examples**:
```tsx
// GOOD
"FDA-cleared pathway to 30 million smart contact lens users"
"Clinical validation in 2 years vs. 7 years building from scratch"
"30,000 practices = unmatched training data for AI algorithms"

// BAD
"Disrupt the wearables market with our technology"
"Partner to dominate consumer health"
```

## Writing Guidelines

### Do's

**Use Active Voice**
```tsx
// GOOD
"VSDP detects disease progression 6 months earlier"
"The digital twin integrates data from 15+ sources"

// BAD
"Disease progression is detected 6 months earlier by VSDP"
"Data from 15+ sources is integrated by the digital twin"
```

**Lead with Benefits**
```tsx
// GOOD
"Free up 47+ hours per month with automated chart review — powered by AI and continuous monitoring"

// BAD
"Our AI and continuous monitoring platform automates chart review to save time"
```

**Explain Acronyms First Use**
```tsx
// GOOD - First mention
"Vision Source Digital Platform (VSDP) transforms optometry..."

// GOOD - Subsequent
"VSDP detects progression earlier..."
```

**Use Parallel Structure**
```tsx
// GOOD
- Complete patient context automatically
- Predict disease progression accurately
- Personalize care at scale

// BAD
- Complete patient context automatically
- Accurate disease progression prediction
- Care can be personalized at scale
```

**Keep Sentences Concise**
```tsx
// GOOD (<25 words)
"VSDP combines AI-powered insights with continuous monitoring to help optometrists provide proactive care."

// BAD (>25 words)
"VSDP is a platform that combines AI-powered insights with continuous monitoring capabilities in order to help optometrists provide proactive care to their patients instead of reactive care."
```

### Don'ts

**Avoid Healthcare Clichés**
```tsx
// BAD - Overused terms
"revolutionize", "disrupt", "game-changer", "paradigm shift"

// GOOD - Specific claims
"detect progression 6 months earlier"
"reduce trial costs by 92%"
"transform episodic to continuous care"
```

**Don't Over-Promise**
```tsx
// BAD
"Eliminate missed diagnoses forever"
"Never lose a patient to preventable vision loss"

// GOOD
"Reduce missed diagnoses through earlier detection"
"Catch disease progression before irreversible damage"
```

**Don't Use Unexplained Jargon**
```tsx
// BAD
"Leverage federated learning across our distributed edge computing network"

// GOOD
"Your practice data stays private while contributing to network intelligence that improves care"
```

**Don't Diminish Current Care**
```tsx
// BAD
"Traditional care is broken and outdated"
"Replace your archaic workflows"

// GOOD
"Evolution from episodic to continuous monitoring"
"Build on your clinical expertise with complete context"
```

**Don't Use All-Caps for Emphasis**
```tsx
// BAD
"This is a REVOLUTIONARY approach to care"

// GOOD
"This approach transforms how care is delivered"

// EXCEPTION - UI labels only
<span className="text-xs uppercase tracking-wide">High Priority</span>
```

## Content Tone Examples

### Patient Journey Narratives

**Too Corporate**:
> "Vision Source Digital Platform leverages cutting-edge artificial intelligence and machine learning algorithms to enable paradigm-shifting care delivery models that revolutionize optometric practice management."

**Too Casual**:
> "VSDP is super cool AI that helps eye doctors see way more patients without getting overwhelmed! It's like having a robot assistant that never sleeps!"

**Just Right**:
> "VSDP combines AI-powered insights with continuous monitoring to help optometrists manage more patients proactively, catching problems before they become serious while maintaining the personal care patients expect."

### Clinical Alerts

**Too Technical**:
> "Patient #4731: IOP measurement deviation detected (+4 mmHg σ from baseline μ, p<0.05)"

**Too Vague**:
> "Patient needs attention soon"

**Just Right**:
> "Patient #4731: IOP increased 4 mmHg since last visit 3 weeks ago. Recommend follow-up within 7 days to assess progression."

## Key Messaging Patterns

### The Context Problem (Core Message)

Always structure as: **Pain → Solution → Outcome**

```tsx
// Pain
"What if you never had to hunt for patient information again?"
"Right now, you're making decisions based on what you can *find*, not what you *know* should inform care."

// Solution
"VSDP integrates all your clinical data, external health records, and patient-reported symptoms into one unified digital twin."

// Outcome
"You shift from information archaeologist to strategic decision-maker — managing 2,000 patients with the insight you'd give to 20."
```

### Network Effects (Recurring Theme)

Always emphasize: **Your contribution → Collective intelligence → Your benefit**

```tsx
"Your 487 patients contribute to a network of 3,000+ practices. The platform learns from this collective experience and returns personalized insights specific to your patient profiles."
```

### Proactive vs Reactive (Core Transformation)

Use concrete examples, not abstract concepts:

```tsx
// GOOD - Concrete
"Traditional: Annual exam detects wet AMD at 20/200 vision
VSDP: Monthly monitoring catches early CNV, preserves 20/30 vision"

// BAD - Abstract
"Move from reactive to proactive care paradigm"
```

### Time is Money (Efficiency Messaging)

Always quantify and show ROI:

```tsx
// GOOD
"Automated chart review saves 47 hours per month — equivalent to 94 patient visits or $18,800 in freed capacity"

// BAD
"Save time with automation"
```

## Clinical Conversation Scripts

### Traditional vs VSDP Patient Conversations

These should feel authentic to practitioners:

**Traditional Conversation** (Sparse data):
```
"Robert, your AMD looks about the same. Keep taking those vitamins. See you next year."
```

**VSDP-Enabled Conversation** (Complete context):
```
"Robert, I need to talk with you about some concerning changes. Our AI analysis has been tracking your drusen, and they've grown 23% since we last saw you—that's faster than we'd like to see. 

Combined with the symptoms you've been reporting in the app about wavy lines, your genetic risk factors, and honestly the fact that you've been missing doses of your vitamins, your risk of converting to wet AMD has jumped significantly.

The good news is we have data from hundreds of patients just like you, and we know exactly what works. If we move to monthly monitoring and get you on a more intensive prevention program, we can cut your risk in half.

I'm not willing to just watch and wait anymore. Let's be aggressive about protecting your vision."
```

## Numbers & Statistics

### Always Be Specific
```tsx
// GOOD
"Early detection lead time: 6.3 months average"
"Trial cost reduction: $4.2M → $320K"
"Network learning from 3,000+ practices"

// BAD
"Earlier detection"
"Significant cost reduction"
"Large practice network"
```

### Format Numbers Consistently
```tsx
// Utilities
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatTimeframe(months: number): string {
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
  return `${years}.${remainingMonths} years`;
}

// Usage
<p>Trial cost reduction: {formatCurrency(4200000)} → {formatCurrency(320000)}</p>
<p>Effectiveness improvement: {formatPercent(0.67)}</p>
<p>Average detection improvement: {formatTimeframe(6.3)}</p>
```

## Error Messages

### User-Friendly, Not Technical
```tsx
// BAD
"Error 500: Internal server error in digitalTwin.getPatient resolver"
"Uncaught exception: Cannot read property 'id' of undefined"

// GOOD
"We're having trouble loading this patient's data. Please try refreshing the page."
"This patient record couldn't be found. Please check the patient ID and try again."
```

### Provide Next Steps
```tsx
<div className="bg-clinical-alert/10 border-l-4 border-clinical-alert p-4">
  <h4 className="font-semibold mb-2">Unable to Load Patient Data</h4>
  <p className="text-sm mb-4">
    We're having trouble connecting to the server. This is usually temporary.
  </p>
  <div className="flex gap-3">
    <button onClick={retry} className="btn-primary">
      Try Again
    </button>
    <button onClick={goBack} className="btn-secondary">
      Go Back
    </button>
  </div>
</div>
```

## Loading & Empty States

### Loading States
```tsx
// Informative, not generic
"Loading patient dashboard..."
"Calculating trial feasibility..."
"Generating network comparison..."

// Not just:
"Loading..."
```

### Empty States
```tsx
// Helpful guidance
<div className="text-center py-12">
  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
  <h3 className="text-xl font-semibold mb-2">No Patients Found</h3>
  <p className="text-gray-600 mb-6">
    Try adjusting your search criteria or browse all patients
  </p>
  <button onClick={clearFilters} className="btn-primary">
    Clear Filters
  </button>
</div>
```

## Medical Terminology

### Never Italicize
```tsx
// GOOD
<p>Patient has intermediate dry AMD with drusen</p>

// BAD
<p>Patient has intermediate <em>dry AMD</em> with <em>drusen</em></p>
```

### Spell Out on First Use in Each Section
```tsx
// First use in section
"Age-related macular degeneration (AMD) is the leading cause..."

// Subsequent uses
"AMD progression can be monitored with..."
```

### Use Standard Abbreviations
- AMD (age-related macular degeneration)
- IOP (intraocular pressure)
- OCT (optical coherence tomography)
- ERG (electroretinography)
- CGM (continuous glucose monitoring)
- EHR (electronic health record)
- FHIR (Fast Healthcare Interoperability Resources)
- RWE (real-world evidence)

## Call-to-Action Patterns

### Make CTAs Specific and Benefit-Driven
```tsx
// GOOD
"Explore Provider Intelligence Hub"
"Calculate Trial Feasibility"
"See Network Comparison"
"Download Clinical Case Summary"

// BAD
"Learn More"
"Click Here"
"Submit"
"Next"
```

### Button Text Should Complete "I want to..."
```tsx
// User thinks: "I want to..."
<button>Start Demo</button>              // "...start demo"
<button>Request Pilot Access</button>    // "...request pilot access"
<button>Compare Outcomes</button>        // "...compare outcomes"
<button>Ask Living Intelligence</button> // "...ask living intelligence"
```

## Accessibility in Content

### Alt Text Guidelines
```tsx
// GOOD - Descriptive of content/function
alt="Digital twin dashboard showing patient risk score of 68, recent OCT scans, and three high-priority clinical alerts"

// BAD - Generic
alt="Dashboard image"

// Decorative - empty alt
alt=""
```

### Link Text
```tsx
// GOOD - Meaningful out of context
<a href="/providers">Explore Provider Clinical Intelligence Hub</a>

// BAD - Vague
<a href="/providers">Click here</a> to learn about providers
```
