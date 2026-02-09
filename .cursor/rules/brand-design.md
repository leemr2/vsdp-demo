---
description: VSDP brand identity and design system implementation
globs: ["src/**/*.tsx", "src/**/*.css", "tailwind.config.ts"]
---

# Brand & Design System

## Vision Source + VSDP Brand Strategy

**Balance**: Innovation meets trusted healthcare heritage  
**Think**: "Apple Health meets Mayo Clinic" not "startup disrupting healthcare"

## Color Palette

**Color Strategy**: 
- **Vision Source Landing Page**: Gray-based monochromatic palette with VS Yellow/Gold as the ONLY accent color (logo, primary CTAs)
- **VSDP Demo/Technology**: Blue colors (VS Blue, Electric Blue) used to differentiate technology platform features
- **When to use**: Yellow for Vision Source brand elements, Blue for VSDP-specific technology sections

### Tailwind Configuration
```typescript
// tailwind.config.ts
colors: {
  // Vision Source Core (Gray-based with Yellow accent)
  'vs': {
    yellow: '#FFC72C',        // Primary brand accent - logo, primary CTAs
    'dark-gray': '#2C2C2C',   // Header/footer background
  },
  // VSDP Extended (Technology layer - not on landing page)
  'vsdp': {
    blue: {
      primary: '#005DAA',     // VSDP technology accent
      navy: '#003B6F',         // Darker blue variant
    },
    electric: '#0084FF',      // AI/technology features
    teal: '#00BFA5',          // Health data
    purple: '#7C4DFF',        // Predictive AI
  },
  // Semantic
  'clinical': {
    success: '#00C853',
    warning: '#FF6F00',
    alert: '#D32F2F',
  }
}
```

### Color Usage Rules

**Vision Source Brand** (Landing Page Style):
- **Primary Actions & Logo**: VS Yellow/Gold (`vs-yellow`) - the ONLY prominent color
- **Headers/Footers**: VS Dark Gray (`vs-dark-gray`)
- **Text**: Gray 700 on white, White on dark gray
- **Navigation**: White text on dark gray, hover to VS Yellow

**VSDP Technology Features** (Demo Only):
- **VSDP Sections**: VS Blue (`vsdp-blue-primary`) for technology differentiation
- **AI Features**: Electric Blue (`vsdp-electric`) with gradients
- **Data Visualizations**: Extended palette (Electric Blue, Teal, Purple)

**Primary Button** (Vision Source Brand):
```tsx
<button className="bg-vs-yellow hover:bg-[#E6B325] text-gray-900 font-semibold px-6 py-3 rounded-lg">
  Find a Doctor
</button>
```

**Primary Button** (VSDP Technology):
```tsx
<button className="bg-vsdp-blue-primary hover:bg-vsdp-blue-navy text-white font-semibold px-6 py-3 rounded-lg">
  Explore Provider View
</button>
```

**AI Features**: Electric Blue with gradients (VSDP only)
```tsx
<div className="bg-linear-to-r from-vsdp-electric to-vsdp-teal">
  Living Intelligence Copilot
</div>
```

**Data Visualizations**: Extended palette order (VSDP demo)
1. Electric Blue (`vsdp-electric`)
2. Teal (`vsdp-teal`)
3. Purple (`vsdp-purple`)
4. VS Yellow (`vs-yellow`) - for brand connection
5. VS Blue (`vsdp-blue-primary`) - use sparingly

**Clinical Alerts**: Semantic colors with backgrounds
```tsx
<div className="bg-clinical-alert/10 border-l-4 border-clinical-alert">
  High Priority Alert
</div>
```

**Never**: Colored backgrounds for large areas (use white/gray-50)

## Typography

### Font Setup
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### Type Scale (Use Tailwind Classes)
```tsx
// Headlines
<h1 className="text-5xl font-bold leading-tight tracking-tight">
<h2 className="text-4xl font-bold leading-tight tracking-tight">
<h3 className="text-3xl font-semibold leading-tight">
<h4 className="text-2xl font-semibold">
<h5 className="text-xl font-semibold">
<h6 className="text-lg font-semibold">

// Body
<p className="text-lg leading-relaxed">        // Large
<p className="text-base leading-normal">      // Regular
<p className="text-sm leading-tight">         // Small

// UI
<button className="text-base font-semibold">  // Buttons
<span className="text-xs font-medium uppercase tracking-wide">  // Labels
```

### Typography Rules

**Line Length**: Max-width for readability
```tsx
<p className="max-w-2xl">  {/* ~60-75 characters */}
  Body text content...
</p>
```

**Medical Terms**: Never italicize, always regular weight
```tsx
{/* GOOD */}
<p>Patient has intermediate <span className="font-normal">dry AMD</span></p>

{/* BAD */}
<p>Patient has intermediate <em>dry AMD</em></p>
```

**Hierarchy**: Maximum 3 font sizes per section
```tsx
<section>
  <h2 className="text-3xl">Section Title</h2>
  <p className="text-base">Body content</p>
  <span className="text-sm">Supporting detail</span>
</section>
```

## Component Patterns

### Buttons

**Primary Button** (Vision Source Brand - Yellow)
```tsx
<button className="bg-vs-yellow hover:bg-[#E6B325] text-gray-900 font-semibold px-6 py-3 rounded-lg active:scale-98 transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500">
  Find a Doctor
</button>
```

**Primary Button** (VSDP Technology - Blue)
```tsx
<button className="bg-vsdp-blue-primary hover:bg-vsdp-blue-navy text-white font-semibold px-6 py-3 rounded-lg active:scale-98 transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500">
  Start Demo
</button>
```

**Secondary Button** (White/Gray - matches "Join VS" style)
```tsx
<button className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-500 transition-all duration-200">
  Join VS
</button>
```

**AI Button** (VSDP Feature - Electric Blue gradient)
```tsx
<button className="bg-linear-to-r from-vsdp-electric to-vsdp-teal hover:brightness-110 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2">
  <Zap className="w-5 h-5" />
  Ask Living Intelligence
</button>
```

### Cards

**Standard Card**
```tsx
<div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
  {/* Content */}
</div>
```

**Feature Card** (Stakeholder sections)
```tsx
{/* Vision Source Brand Style */}
<div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-sm hover:shadow-md">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 text-vs-yellow">
      <Icon className="w-full h-full" />
    </div>
    <h3 className="text-2xl font-semibold text-gray-900">
      Feature Title
    </h3>
  </div>
  {/* Content */}
</div>

{/* VSDP Technology Style */}
<div className="bg-white border-2 border-vsdp-electric/20 rounded-2xl p-8 shadow-lg shadow-vsdp-electric/10">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 text-vsdp-electric">
      <Icon className="w-full h-full" />
    </div>
    <h3 className="text-2xl font-semibold text-vsdp-blue-primary">
      VSDP Feature Title
    </h3>
  </div>
  {/* Content */}
</div>
```

**Alert Card** (Clinical alerts)
```tsx
const alertStyles = {
  critical: 'bg-clinical-alert/10 border-l-4 border-clinical-alert',
  high: 'bg-clinical-warning/10 border-l-4 border-clinical-warning',
  low: 'bg-clinical-success/10 border-l-4 border-clinical-success',
};

<div className={cn('rounded-lg p-4', alertStyles[severity])}>
  <div className="flex items-start gap-3">
    <AlertCircle className="w-6 h-6 shrink-0" />
    <div>
      <p className="font-semibold">{alert.message}</p>
      <p className="text-sm text-gray-700">{alert.explanation}</p>
    </div>
  </div>
</div>
```

### Forms & Inputs

**Text Input**
```tsx
<input
  type="text"
  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-vsdp-electric focus:ring-2 focus:ring-vsdp-electric/10 outline-none transition-all"
  placeholder="Enter patient ID..."
/>
```

**Select Dropdown**
```tsx
<select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-500 focus:border-vsdp-electric focus:ring-2 focus:ring-vsdp-electric/10 outline-none">
  <option>Select condition...</option>
</select>
```

**Checkbox**
```tsx
{/* Vision Source Brand */}
<input
  type="checkbox"
  className="w-5 h-5 border-2 border-gray-300 rounded text-vs-yellow focus:ring-2 focus:ring-vs-yellow/20"
/>

{/* VSDP Technology */}
<input
  type="checkbox"
  className="w-5 h-5 border-2 border-gray-300 rounded text-vsdp-electric focus:ring-2 focus:ring-vsdp-electric/10"
/>
```

### Data Visualization Styles

**Chart Container**
```tsx
<div className="bg-white rounded-xl p-6 border border-gray-200">
  <h4 className="text-lg font-semibold mb-4">Chart Title</h4>
  <ResponsiveContainer width="100%" height={300}>
    {/* Recharts component */}
  </ResponsiveContainer>
</div>
```

**Chart Color Configuration**
```tsx
// Recharts example - VSDP demo colors
<LineChart data={data}>
  <Line 
    type="monotone" 
    dataKey="oct" 
    stroke="#0084FF"  // vsdp-electric
    strokeWidth={2}
  />
  <Line 
    type="monotone" 
    dataKey="iop" 
    stroke="#00BFA5"  // vsdp-teal
    strokeWidth={2}
  />
  <Line 
    type="monotone" 
    dataKey="brand" 
    stroke="#FFC72C"  // vs-yellow (for brand connection)
    strokeWidth={2}
  />
</LineChart>
```

## Navigation

### Header Navigation
```tsx
{/* Vision Source Landing Page Style - Dark Gray Header */}
<header className="bg-vs-dark-gray h-18">
  <div className="container mx-auto px-6 h-full flex items-center justify-between">
    {/* Logo - left aligned, VS Yellow text */}
    <div className="w-45">
      <VSLogo className="text-vs-yellow" />
    </div>
    
    {/* Nav items - center, white text */}
    <nav className="hidden md:flex items-center gap-6">
      <a 
        href="/providers" 
        className="text-white hover:text-vs-yellow font-medium hover:underline underline-offset-4 decoration-2 transition-colors"
      >
        Providers
      </a>
      {/* More nav items */}
    </nav>
    
    {/* CTA - right, yellow button */}
    <button className="bg-vs-yellow hover:bg-[#E6B325] text-gray-900 px-6 py-2 rounded-lg font-semibold">
      Find a Doctor
    </button>
  </div>
</header>

{/* Alternative: White Header for VSDP Demo */}
<header className="bg-white border-b border-gray-200 h-18">
  <div className="container mx-auto px-6 h-full flex items-center justify-between">
    <div className="w-45">
      <VSLogo />
    </div>
    <nav className="hidden md:flex items-center gap-6">
      <a href="/providers" className="text-gray-700 hover:text-vs-yellow font-medium">
        Providers
      </a>
    </nav>
    <button className="bg-vsdp-blue-primary text-white px-6 py-2 rounded-lg">
      Start Demo
    </button>
  </div>
</header>
```

### Footer
```tsx
{/* Vision Source Landing Page Style - Dark Gray */}
<footer className="bg-vs-dark-gray text-gray-300 py-12">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 3-column layout */}
    </div>
    <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
      <p>&copy; 2026 Vision Source. All rights reserved.</p>
    </div>
  </div>
</footer>
```

## Responsive Design

### Breakpoint Usage
```tsx
{/* Mobile-first approach */}
<div className="
  w-full           {/* Mobile: full width */}
  md:w-1/2         {/* Tablet: half width */}
  lg:w-1/3         {/* Desktop: third width */}
  px-4             {/* Mobile: 16px padding */}
  md:px-6          {/* Tablet: 24px */}
  lg:px-8          {/* Desktop: 32px */}
">
```

### Tablet (iPad) Optimization
**Priority**: 60% of board member traffic on iPad landscape

```tsx
{/* Optimize for 1024px landscape */}
<div className="
  grid 
  grid-cols-1       {/* Mobile: stacked */}
  md:grid-cols-2    {/* Tablet: 2-column */}
  lg:grid-cols-2    {/* Desktop: keep 2-column for readability */}
  gap-6
">
```

### Touch-Friendly Targets
```tsx
{/* Minimum 44px touch target */}
<button className="min-h-[44px] min-w-[44px] px-6 py-3">
  Touch-Friendly Button
</button>
```

## Animation Standards

### Transition Durations
- **UI Interactions**: 200ms (hover, focus)
- **Page Transitions**: 300ms
- **Complex Animations**: 500ms max

### Standard Transitions
```tsx
{/* Hover effects */}
<div className="transition-all duration-200 hover:scale-102 hover:-translate-y-0.5">

{/* Color transitions */}
<button className="transition-colors duration-200 hover:bg-[#E6B325]">  {/* VS Yellow hover */}
<button className="transition-colors duration-200 hover:bg-vsdp-blue-navy">  {/* VSDP Blue hover */}

{/* Smooth entrance */}
<div className="animate-fade-in">
```

### Framer Motion Defaults
```tsx
const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1], // ease-out
};
```

### Respect Reduced Motion
```tsx
// tailwind.config.ts
plugins: [
  plugin(function({ addVariant }) {
    addVariant('motion-safe', '@media (prefers-reduced-motion: no-preference)');
    addVariant('motion-reduce', '@media (prefers-reduced-motion: reduce)');
  })
]

// Usage
<div className="motion-safe:animate-slide-up motion-reduce:opacity-100">
```

## Icons

### Icon Library
Use **Lucide React** (outlined, 2px stroke, minimal)

```tsx
import { Eye, Heart, Activity, TrendingUp, AlertCircle } from 'lucide-react';

// Standard sizes
<Eye className="w-6 h-6" />          // Medium (24px)
<Heart className="w-8 h-8" />        // Large (32px)
<Activity className="w-12 h-12" />   // Hero (48px)
```

### Icon Colors
```tsx
// Default state
<Icon className="w-6 h-6 text-gray-500" />

// Hover state (Vision Source Brand)
<Icon className="w-6 h-6 text-white hover:text-vs-yellow" />  {/* On dark bg */}
<Icon className="w-6 h-6 text-gray-500 hover:text-gray-700" />  {/* On light bg */}

// Active state
<Icon className="w-6 h-6 text-vs-yellow" />        {/* Vision Source brand */}
<Icon className="w-6 h-6 text-vsdp-electric" />    {/* VSDP features */}

// Disabled state
<Icon className="w-6 h-6 text-gray-300" />
```

### Icon Accessibility
```tsx
{/* Decorative icon - hide from screen readers */}
<Eye className="w-6 h-6" aria-hidden="true" />

{/* Meaningful icon - provide label */}
<button aria-label="View patient details">
  <Eye className="w-6 h-6" />
</button>
```

## Image Optimization

### Next.js Image Component
```tsx
import Image from 'next/image';

<Image
  src="/images/hero-providers.webp"
  alt="Digital twin dashboard showing patient data"
  width={1920}
  height={1080}
  priority  // For above-fold images
  className="rounded-xl"
/>
```

### Image Formats
- **WebP** with PNG fallback for photos
- **SVG** for logos and icons
- **Optimize**: 80% quality for heroes, 85% for thumbnails

## Loading States

### Skeleton Pattern
```tsx
export function PatientCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
```

### Spinner
```tsx
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-vsdp-electric', sizeClasses[size])} />
  );
}
```

## Utility Classes

### Custom Tailwind Extensions
```typescript
// tailwind.config.ts
extend: {
  animation: {
    'fade-in': 'fadeIn 300ms ease-out',
    'slide-up': 'slideUp 300ms ease-out',
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
  scale: {
    '98': '0.98',
    '102': '1.02',
  },
}
```

## Don'ts

❌ No parallax scrolling (motion sickness)  
❌ No auto-playing videos with sound  
❌ No animations >500ms  
❌ No colored backgrounds for large areas  
❌ No font mixing (stick to Inter)  
❌ No italics for medical terms  
❌ No all-caps except UI labels <12px  
❌ No generic stock photos  
❌ No cluttered designs (embrace white space)
