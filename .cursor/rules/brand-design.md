---
description: VSDP brand identity and design system implementation
globs: ["src/**/*.tsx", "src/**/*.css", "tailwind.config.ts"]
---

# Brand & Design System

## Vision Source + VSDP Brand Strategy

**Balance**: Innovation meets trusted healthcare heritage  
**Think**: "Apple Health meets Mayo Clinic" not "startup disrupting healthcare"

## Color Palette

### Tailwind Configuration
```typescript
// tailwind.config.ts
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
}
```

### Color Usage Rules

**Primary Actions**: Always VS Blue
```tsx
<button className="bg-vs-blue-primary hover:bg-vs-blue-navy text-white">
  Explore Provider View
</button>
```

**AI Features**: Electric Blue with gradients
```tsx
<div className="bg-gradient-to-r from-vs-blue-primary to-vsdp-electric">
  Living Intelligence Copilot
</div>
```

**Data Visualizations**: Extended palette order
1. Electric Blue (`vsdp-electric`)
2. Teal (`vsdp-teal`)
3. Purple (`vsdp-purple`)
4. VS Blue (`vs-blue-primary`)

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

**Primary Button**
```tsx
<button className="bg-vs-blue-primary hover:bg-vs-blue-navy text-white font-semibold px-6 py-3 rounded-lg active:scale-98 transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500">
  Primary Action
</button>
```

**Secondary Button**
```tsx
<button className="bg-white hover:bg-vs-blue-primary text-vs-blue-primary hover:text-white font-semibold px-6 py-3 rounded-lg border-2 border-vs-blue-primary transition-all duration-200">
  Secondary Action
</button>
```

**AI Button** (Special gradient for AI features)
```tsx
<button className="bg-gradient-to-r from-vs-blue-primary to-vsdp-electric hover:brightness-110 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2">
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
<div className="bg-white border-2 border-vsdp-electric/20 rounded-2xl p-8 shadow-lg shadow-vsdp-electric/10">
  <div className="flex items-center gap-4 mb-4">
    <div className="w-12 h-12 text-vsdp-electric">
      <Icon className="w-full h-full" />
    </div>
    <h3 className="text-2xl font-semibold text-vs-blue-primary">
      Feature Title
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
    <AlertCircle className="w-6 h-6 flex-shrink-0" />
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
<input
  type="checkbox"
  className="w-5 h-5 border-2 border-gray-300 rounded text-vs-blue-primary focus:ring-2 focus:ring-vs-blue-primary/10"
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
// Recharts example
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
</LineChart>
```

## Navigation

### Header Navigation
```tsx
<header className="bg-white border-b border-gray-200 h-18">
  <div className="container mx-auto px-6 h-full flex items-center justify-between">
    {/* Logo - left aligned */}
    <div className="w-45">
      <VSLogo />
    </div>
    
    {/* Nav items - center */}
    <nav className="hidden md:flex items-center gap-6">
      <a 
        href="/providers" 
        className="text-gray-700 hover:text-vs-blue-primary font-medium hover:underline underline-offset-4 decoration-2"
      >
        Providers
      </a>
      {/* More nav items */}
    </nav>
    
    {/* CTA - right */}
    <button className="bg-vs-blue-primary text-white px-6 py-2 rounded-lg">
      Start Demo
    </button>
  </div>
</header>
```

### Footer
```tsx
<footer className="bg-gray-900 text-gray-300 py-12">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 3-column layout */}
    </div>
    <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
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
<button className="transition-colors duration-200 hover:bg-vs-blue-navy">

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

// Hover state
<Icon className="w-6 h-6 text-gray-500 hover:text-vs-blue-primary" />

// Active state
<Icon className="w-6 h-6 text-vsdp-electric" />

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
