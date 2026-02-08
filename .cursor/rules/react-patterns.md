---
description: React and Next.js patterns specific to VSDP demo
globs: ["src/**/*.tsx", "src/**/*.ts"]
---

# React & Next.js Patterns

## Component Guidelines

### Server vs Client Components

**Default to Server Components**
```tsx
// app/(stakeholders)/providers/page.tsx
export default function ProvidersPage() {
  // Server component - can directly access database
  return (
    <div>
      <HeroSection />
      <PatientJourneyComparison /> {/* Client component for interactivity */}
    </div>
  );
}
```

**Client Component Indicators**
- User interactions (clicks, forms, toggles)
- Browser APIs (localStorage, geolocation)
- State management (useState, useReducer)
- Effects (useEffect)
- Real-time updates

### Component Structure Pattern

```tsx
'use client';

import { useState } from 'react';
import { api } from '~/trpc/react';
import type { DigitalTwinPatient } from '~/types/models';

interface PatientDashboardProps {
  initialPatientId?: string;
  showAlerts?: boolean;
}

export function PatientDashboard({ 
  initialPatientId,
  showAlerts = true 
}: PatientDashboardProps) {
  // 1. Hooks (state, queries, effects)
  const [selectedPatient, setSelectedPatient] = useState(initialPatientId);
  const { data, isLoading } = api.digitalTwin.getPatient.useQuery(
    { patientId: selectedPatient! },
    { enabled: !!selectedPatient }
  );

  // 2. Early returns for loading/error states
  if (isLoading) return <LoadingSpinner />;
  if (!data) return <EmptyState message="No patient selected" />;

  // 3. Event handlers
  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId);
  };

  // 4. Derived state / computations
  const criticalAlerts = data.alerts.filter(a => a.severity === 'critical');

  // 5. Render
  return (
    <div className="space-y-6">
      {showAlerts && <AlertsList alerts={criticalAlerts} />}
      <PatientCard patient={data} />
    </div>
  );
}
```

## State Management

### Local State (useState)
Use for: UI-only state (modals, toggles, form inputs)

```tsx
const [isExpanded, setIsExpanded] = useState(false);
const [selectedTab, setSelectedTab] = useState<'overview' | 'timeline'>('overview');
```

### URL State (searchParams)
Use for: Shareable state (filters, selected patient, section)

```tsx
import { useSearchParams, useRouter } from 'next/navigation';

export function PatientList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedId = searchParams.get('patientId');

  const handleSelect = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('patientId', id);
    router.push(`?${params.toString()}`);
  };
}
```

### Session Storage
Use for: Temporary state (progress tracking, dismissed notifications)

```tsx
const [hasSeenIntro, setHasSeenIntro] = useState(() => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('hasSeenIntro') === 'true';
});

const dismissIntro = () => {
  sessionStorage.setItem('hasSeenIntro', 'true');
  setHasSeenIntro(true);
};
```

## Data Fetching with tRPC

### Query Pattern
```tsx
import { api } from '~/trpc/react';

export function PatientPanel() {
  const { data, isLoading, error, refetch } = api.digitalTwin.getPatientPanel.useQuery();

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorDisplay error={error.message} />;

  return (
    <div>
      <RiskStratificationGrid patients={data.patients} />
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}
```

### Mutation Pattern
```tsx
export function LeadCaptureForm() {
  const utils = api.useUtils();
  const captureLead = api.leads.capture.useMutation({
    onSuccess: () => {
      // Invalidate and refetch
      utils.leads.getAll.invalidate();
      toast.success('Thank you for your interest!');
    },
  });

  const handleSubmit = (data: LeadFormData) => {
    captureLead.mutate(data);
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

### Optimistic Updates
```tsx
const updatePatientNote = api.digitalTwin.updateNote.useMutation({
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await utils.digitalTwin.getPatient.cancel();

    // Snapshot previous value
    const previousData = utils.digitalTwin.getPatient.getData();

    // Optimistically update
    utils.digitalTwin.getPatient.setData({ patientId: newData.patientId }, (old) => ({
      ...old!,
      notes: [...old!.notes, newData.note],
    }));

    return { previousData };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    utils.digitalTwin.getPatient.setData(
      { patientId: newData.patientId },
      context?.previousData
    );
  },
});
```

## Before/After Comparison Pattern

Critical for Provider section - showing traditional vs VSDP approach:

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ViewMode = 'traditional' | 'vsdp';

export function PatientJourneyComparison({ patientId }: { patientId: string }) {
  const [viewMode, setViewMode] = useState<ViewMode>('traditional');
  const { data } = api.digitalTwin.compareTraditionalVsVSDP.useQuery({ patientId });

  return (
    <div className="space-y-4">
      {/* Toggle Switch */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setViewMode('traditional')}
          className={cn(
            'px-6 py-2 rounded-lg font-semibold',
            viewMode === 'traditional' 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-200 text-gray-600'
          )}
        >
          Traditional View
        </button>
        <button
          onClick={() => setViewMode('vsdp')}
          className={cn(
            'px-6 py-2 rounded-lg font-semibold',
            viewMode === 'vsdp' 
              ? 'bg-vsdp-electric text-white' 
              : 'bg-gray-200 text-gray-600'
          )}
        >
          VSDP View
        </button>
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'traditional' ? (
            <TraditionalView data={data?.traditionalApproach} />
          ) : (
            <VSDPView data={data?.vsdpApproach} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

## Animation Patterns (Framer Motion)

### Page Transitions
```tsx
import { motion } from 'framer-motion';

export function StakeholderPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### Staggered Lists
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function AlertsList({ alerts }: { alerts: ClinicalAlert[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {alerts.map(alert => (
        <motion.div key={alert.id} variants={itemVariants}>
          <AlertCard alert={alert} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Respect Reduced Motion
```tsx
import { useReducedMotion } from 'framer-motion';

export function AnimatedCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
      transition={{ duration: 0.3 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

## Loading States

### Skeleton Screens (Preferred)
```tsx
export function PatientCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-32 bg-gray-200 rounded" />
    </div>
  );
}
```

### Suspense Boundaries
```tsx
import { Suspense } from 'react';

export default function ProviderPage() {
  return (
    <div>
      <Suspense fallback={<PatientPanelSkeleton />}>
        <PatientPanel />
      </Suspense>
    </div>
  );
}
```

## Error Handling

### Error Boundaries
```tsx
'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## Accessibility Patterns

### Focus Management
```tsx
import { useRef, useEffect } from 'react';

export function Modal({ isOpen, onClose, title, children }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-labelledby="modal-title" aria-modal="true">
      <h2 id="modal-title">{title}</h2>
      {children}
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
```

### Keyboard Navigation
```tsx
export function StakeholderCard({ onClick, title }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
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

## Performance Optimization

### Dynamic Imports
```tsx
import dynamic from 'next/dynamic';

// Heavy chart component - lazy load
const PatientTimelineChart = dynamic(
  () => import('~/components/charts/PatientTimelineChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false, // Disable SSR if uses browser-only APIs
  }
);
```

### Memoization
```tsx
import { useMemo } from 'react';

export function RiskStratificationGrid({ patients }: { patients: Patient[] }) {
  const sortedPatients = useMemo(() => {
    return patients.sort((a, b) => b.riskScore - a.riskScore);
  }, [patients]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {sortedPatients.map(patient => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
}
```
