---
description: WCAG 2.1 AA accessibility requirements and patterns
globs: ["src/**/*.tsx"]
---

# Accessibility Standards

## WCAG 2.1 AA Compliance (Required)

Target: Lighthouse Accessibility score >95

## Color Contrast

### Minimum Ratios
- Body text (16px): **4.5:1** minimum against background
- Large text (18px+): **3.0:1** minimum
- UI components: **3.0:1** for borders/icons

### Testing
Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

### Pre-Approved Combinations
```tsx
// PASS - Body text
<p className="text-gray-900 bg-white">       // 21:1 ratio
<p className="text-gray-700 bg-white">       // 10.2:1 ratio
<p className="text-vs-blue-primary bg-white"> // 7.8:1 ratio

// FAIL - Don't use
<p className="text-gray-400 bg-white">       // 2.8:1 - TOO LOW
<p className="text-vsdp-electric bg-white">  // 3.1:1 - ONLY for large text

// PASS - Inverted
<p className="text-white bg-vs-blue-primary"> // 7.8:1 ratio
<p className="text-white bg-gray-900">        // 21:1 ratio
```

### Never Rely on Color Alone
```tsx
{/* BAD - color is only indicator */}
<div className="text-clinical-alert">High risk patient</div>

{/* GOOD - color + icon + text */}
<div className="text-clinical-alert flex items-center gap-2">
  <AlertCircle className="w-5 h-5" aria-hidden="true" />
  <span className="font-semibold">High risk patient</span>
</div>
```

## Keyboard Navigation

### Focus Indicators (Required)
**Never** use `outline: none` without replacement

```tsx
{/* GOOD - visible focus state */}
<button className="
  outline-none 
  focus:ring-2 
  focus:ring-vsdp-electric 
  focus:ring-offset-2
">
  Click me
</button>

{/* GOOD - custom focus style */}
<a className="
  outline-none
  focus:border-2
  focus:border-vs-blue-primary
  focus:bg-gray-50
">
  Link
</a>
```

### Tab Order
- Must follow visual layout
- Interactive elements must be focusable
- Hidden elements must be removed from tab order

```tsx
{/* Hidden modal - remove from tab order */}
<div 
  className="hidden"
  aria-hidden="true"
  inert  // Prevent focus on hidden elements
>
  <button tabIndex={-1}>Hidden Button</button>
</div>

{/* Visible modal - manage focus */}
<div role="dialog" aria-modal="true">
  <button ref={firstFocusableElement}>Close</button>
  {/* Modal content */}
</div>
```

### Skip Links
```tsx
// app/layout.tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-vs-blue-primary focus:text-white focus:rounded-lg"
>
  Skip to main content
</a>

// Main content
<main id="main-content" tabIndex={-1}>
  {/* Page content */}
</main>
```

### Keyboard Event Handlers
```tsx
export function Card({ onClick, title }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Support both Enter and Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer"
    >
      {title}
    </div>
  );
}
```

## Semantic HTML

### Use Correct Elements
```tsx
{/* GOOD - semantic structure */}
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/providers">Providers</a></li>
    </ul>
  </nav>
</header>

<main>
  <section aria-labelledby="provider-heading">
    <h2 id="provider-heading">Provider Clinical Intelligence Hub</h2>
  </section>
</main>

<footer>
  <nav aria-label="Footer navigation">
    {/* Footer links */}
  </nav>
</footer>

{/* BAD - divs for everything */}
<div className="header">
  <div className="nav">
    <div><div onClick={navigate}>Providers</div></div>
  </div>
</div>
```

### Headings Hierarchy
```tsx
{/* GOOD - logical hierarchy */}
<article>
  <h1>Vision Source Digital Platform</h1>
  <section>
    <h2>Provider Clinical Intelligence Hub</h2>
    <h3>Patient Journey Transformations</h3>
    <h4>Case Study 1: AMD Patient</h4>
  </section>
</article>

{/* BAD - skipping levels */}
<article>
  <h1>Vision Source Digital Platform</h1>
  <h4>Provider Section</h4>  {/* WRONG - skipped h2, h3 */}
</article>
```

## ARIA Attributes

### Landmark Roles
```tsx
<header role="banner">
<nav role="navigation" aria-label="Main">
<main role="main">
<aside role="complementary" aria-label="Related resources">
<footer role="contentinfo">
```

### Interactive Elements
```tsx
{/* Buttons */}
<button aria-label="Close modal">
  <X className="w-6 h-6" aria-hidden="true" />
</button>

{/* Toggles */}
<button
  role="switch"
  aria-checked={isEnabled}
  onClick={() => setIsEnabled(!isEnabled)}
>
  Enable notifications
</button>

{/* Tabs */}
<div role="tablist" aria-label="Patient data views">
  <button
    role="tab"
    aria-selected={activeTab === 'overview'}
    aria-controls="overview-panel"
    id="overview-tab"
  >
    Overview
  </button>
</div>
<div
  role="tabpanel"
  id="overview-panel"
  aria-labelledby="overview-tab"
  hidden={activeTab !== 'overview'}
>
  {/* Panel content */}
</div>
```

### Live Regions
```tsx
{/* Clinical alerts - important but not urgent */}
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  className="sr-only"
>
  {newAlertMessage}
</div>

{/* Critical alerts - interrupt immediately */}
<div 
  role="alert" 
  aria-live="assertive" 
  aria-atomic="true"
>
  Critical: Patient #4731 requires immediate attention
</div>

{/* Loading states */}
<div 
  role="status" 
  aria-live="polite" 
  aria-busy={isLoading}
>
  {isLoading ? 'Loading patient data...' : null}
</div>
```

### Descriptive Labels
```tsx
{/* Form inputs - always label */}
<label htmlFor="patient-search" className="block text-sm font-medium mb-2">
  Search patients
</label>
<input 
  id="patient-search"
  type="text"
  aria-describedby="search-help"
/>
<p id="search-help" className="text-sm text-gray-600">
  Search by name, ID, or condition
</p>

{/* Expandable sections */}
<button
  aria-expanded={isExpanded}
  aria-controls="patient-details"
  onClick={() => setIsExpanded(!isExpanded)}
>
  View patient details
</button>
<div id="patient-details" hidden={!isExpanded}>
  {/* Details */}
</div>
```

## Screen Reader Support

### Screen Reader Only Text
```tsx
// Utility class
<span className="sr-only">
  Navigate to provider section
</span>

// Tailwind config includes:
// .sr-only { position: absolute; width: 1px; height: 1px; ... }
```

### Meaningful Alt Text
```tsx
{/* GOOD - descriptive */}
<Image
  src="/images/patient-dashboard.png"
  alt="Digital twin dashboard showing patient risk score of 68, recent OCT scans, and clinical alerts"
  width={800}
  height={600}
/>

{/* BAD - not descriptive */}
<Image
  src="/images/patient-dashboard.png"
  alt="Dashboard"
  width={800}
  height={600}
/>

{/* Decorative - hide from screen readers */}
<Image
  src="/images/background-pattern.png"
  alt=""
  aria-hidden="true"
  width={800}
  height={600}
/>
```

### Icon Accessibility
```tsx
{/* Icon with text - hide icon from SR */}
<button>
  <Eye className="w-5 h-5" aria-hidden="true" />
  <span>View details</span>
</button>

{/* Icon only - provide label */}
<button aria-label="View patient details">
  <Eye className="w-5 h-5" aria-hidden="true" />
</button>

{/* Icon with tooltip */}
<button aria-label="View patient details">
  <Eye className="w-5 h-5" aria-hidden="true" />
  <span className="sr-only">View patient details</span>
</button>
```

## Forms Accessibility

### Form Structure
```tsx
<form onSubmit={handleSubmit} aria-labelledby="lead-form-title">
  <h2 id="lead-form-title">Request Demo Access</h2>
  
  {/* Text input */}
  <div className="mb-4">
    <label htmlFor="name" className="block font-medium mb-2">
      Full Name <span className="text-clinical-alert" aria-label="required">*</span>
    </label>
    <input
      id="name"
      type="text"
      required
      aria-required="true"
      aria-invalid={errors.name ? 'true' : 'false'}
      aria-describedby={errors.name ? 'name-error' : undefined}
    />
    {errors.name && (
      <p id="name-error" className="text-clinical-alert text-sm mt-1" role="alert">
        {errors.name}
      </p>
    )}
  </div>

  {/* Radio group */}
  <fieldset>
    <legend className="block font-medium mb-2">Stakeholder Type</legend>
    <div className="space-y-2">
      <label className="flex items-center">
        <input
          type="radio"
          name="stakeholder"
          value="provider"
          required
        />
        <span className="ml-2">Provider</span>
      </label>
      {/* More options */}
    </div>
  </fieldset>

  {/* Submit */}
  <button
    type="submit"
    disabled={isSubmitting}
    aria-busy={isSubmitting}
  >
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
</form>
```

### Error Announcements
```tsx
{/* Summary of errors at top of form */}
{errors.length > 0 && (
  <div role="alert" className="bg-clinical-alert/10 border-l-4 border-clinical-alert p-4 mb-6">
    <h3 className="font-semibold mb-2">Please fix the following errors:</h3>
    <ul className="list-disc list-inside">
      {errors.map(error => (
        <li key={error.field}>
          <a href={`#${error.field}`} className="underline">
            {error.message}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}
```

## Modal/Dialog Accessibility

### Focus Trap Pattern
```tsx
'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus close button when modal opens
      closeButtonRef.current?.focus();

      // Trap focus within modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    } else {
      // Return focus when modal closes
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl p-6 max-w-lg w-full mx-4"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close dialog"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}
```

## Animation & Motion

### Respect Reduced Motion Preference
```tsx
// Tailwind config
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
      },
    },
  },
  variants: {
    animation: ['motion-safe', 'motion-reduce'],
  },
}

// Usage in components
<div className="motion-safe:animate-fade-in motion-reduce:opacity-100">
  {/* Content appears instantly for users who prefer reduced motion */}
</div>

// Or with Framer Motion
import { useReducedMotion } from 'framer-motion';

export function AnimatedCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

## Testing Checklist

### Manual Testing
- [ ] Navigate entire site using only keyboard (Tab, Enter, Space, Arrows)
- [ ] Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Verify all interactive elements have visible focus indicators
- [ ] Check color contrast for all text combinations
- [ ] Test with browser zoom at 200%
- [ ] Verify all form error messages are announced

### Automated Testing
```bash
# Run Lighthouse accessibility audit
npm run build
npm run lighthouse

# Target: Accessibility score >95
```

### Browser Extensions
- axe DevTools - Automated accessibility testing
- WAVE - Visual feedback about accessibility
- Color Contrast Analyzer - Test color combinations

## Common Violations to Avoid

❌ Missing alt text on images  
❌ Empty links or buttons  
❌ Insufficient color contrast  
❌ No visible focus indicators  
❌ Skipped heading levels  
❌ Form inputs without labels  
❌ Missing ARIA labels on icon-only buttons  
❌ Keyboard traps in modals  
❌ Auto-playing videos/animations without controls  
❌ Time-limited content without extensions
