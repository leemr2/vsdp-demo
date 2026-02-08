---
description: TypeScript data models and type definitions
globs: ["src/types/**/*", "src/server/**/*"]
---

# Data Models & Types

## Type Definition Location

```
src/types/
  models.ts         # Core data models (DigitalTwinPatient, ClinicalAlert, etc.)
  api.ts            # API request/response types
  enums.ts          # Enumerations and literal types
  utils.ts          # Utility types
```

## Core Data Models

### Digital Twin Patient (Enhanced)

```typescript
// src/types/models.ts
export interface DigitalTwinPatient {
  id: string;
  name: string; // Synthetic: "Patient #4731 (Sarah M.)"
  age: number;
  conditions: Condition[];
  riskScore: number; // 0-100
  riskTrend: 'increasing' | 'stable' | 'decreasing';
  lastVisit: Date;
  nextScheduledVisit: Date;
  nextPredictedIntervention: Date;
  
  dataStreams: DataStreams;
  externalHealth: ExternalHealth;
  patientReported: PatientReported;
  riskFactors: RiskFactors;
  networkComparison: NetworkComparison;
  alerts: ClinicalAlert[];
  predictions: Prediction[];
}

export type Condition = 
  | 'diabetes' 
  | 'glaucoma' 
  | 'myopia' 
  | 'amd' 
  | 'retinal_detachment_risk'
  | 'diabetic_retinopathy';

export interface DataStreams {
  oct: OCTReading[];
  fundus: FundusImage[];
  erg: ERGReading[];
  iop: IOPReading[];
  visualField: VisualFieldTest[];
  refraction: RefractionReading[];
}

export interface OCTReading {
  date: Date;
  value: number; // retinal thickness in microns
  device: 'Visionix' | 'Heidelberg';
  qualityScore: number; // 0-100
}

export interface FundusImage {
  date: Date;
  imageUrl: string;
  device: 'Optos' | 'Canon';
  aiAnalysis: {
    drusenVolume?: number;
    microaneurysmCount?: number;
    hemorrhageDetected?: boolean;
    cupToDiscRatio?: number;
  };
}

export interface ERGReading {
  date: Date;
  waveform: number[];
  device: 'RetEval';
  amplitude: number;
  implicitTime: number;
}

export interface IOPReading {
  date: Date;
  value: number; // mmHg
  method: 'tonometry' | 'pneumatonometry';
  eye: 'OD' | 'OS' | 'OU';
}

export interface VisualFieldTest {
  date: Date;
  md: number; // mean deviation
  vfi: number; // visual field index
  psd: number; // pattern standard deviation
  eye: 'OD' | 'OS';
}

export interface RefractionReading {
  date: Date;
  sphere: number;
  cylinder: number;
  axis: number;
  eye: 'OD' | 'OS';
  visualAcuity: string; // "20/20", "20/40", etc.
}
```

### External Health Integration

```typescript
export interface ExternalHealth {
  cgm?: CGMData;
  bloodPressure?: BloodPressureData;
  medications: Medication[];
  labs?: LabResults;
}

export interface CGMData {
  currentTimeInRange: number; // percentage
  previousTimeInRange: number;
  glucoseVariability: 'high' | 'moderate' | 'low';
  lastSync: Date;
  averageGlucose: number; // mg/dL
}

export interface BloodPressureData {
  systolic: number;
  diastolic: number;
  controlled: boolean;
  source: 'PCP EHR' | 'patient-reported' | 'home-monitor';
  lastReading: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  startDate: Date;
  source: 'pharmacy' | 'pcp' | 'self-reported';
  adherence?: number; // percentage from pharmacy refills
  category: 'ophthalmic' | 'systemic' | 'supplement';
}

export interface LabResults {
  hba1c?: { value: number; date: Date; unit: '%' };
  cholesterol?: { 
    ldl: number; 
    hdl: number; 
    triglycerides: number;
    date: Date; 
  };
  creatinine?: { value: number; date: Date; unit: 'mg/dL' };
}
```

### Patient-Reported Data

```typescript
export interface PatientReported {
  symptoms: Symptom[];
  lifestyle: Lifestyle;
  compliance: Compliance;
}

export interface Symptom {
  date: Date;
  description: string;
  severity: 1 | 2 | 3 | 4 | 5;
  category: 'vision' | 'pain' | 'general';
}

export interface Lifestyle {
  screenTime?: number; // hours per day
  outdoorTime?: number; // hours per day
  exerciseMinutes?: number;
  diet?: 'mediterranean' | 'standard' | 'poor';
  smoking?: 'never' | 'former' | 'current';
  packYears?: number;
}

export interface Compliance {
  medicationAdherence: number; // percentage
  appointmentKeeping: number; // percentage
  homeMonitoring: number; // percentage
}
```

### Clinical Alerts

```typescript
export interface ClinicalAlert {
  id: string;
  patientId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: AlertCategory;
  message: string;
  detailedExplanation: string;
  generatedAt: Date;
  actionRequired: string;
  actionDeadline?: Date;
  automatedOutreach?: boolean;
  relatedDataPoints: DataPoint[];
  networkIntelligence?: string;
}

export type AlertCategory = 
  | 'progression' 
  | 'adherence' 
  | 'missing_data' 
  | 'external_health' 
  | 'overdue_followup';

export interface DataPoint {
  source: string;
  value: string;
  date: Date;
  trend?: 'increasing' | 'decreasing' | 'stable';
}
```

### Predictions

```typescript
export interface Prediction {
  id: string;
  condition: string;
  probability: number; // 0-100
  timeframe: string; // "6 months", "12 months"
  confidenceLevel: 'low' | 'medium' | 'high';
  keyRiskFactors: RiskFactor[];
  interventionRecommendation: string;
  networkEvidence: string;
}

export interface RiskFactor {
  factor: string;
  weight: number; // contribution to prediction (0-1)
  modifiable: boolean;
}
```

### Network Intelligence

```typescript
export interface NetworkComparison {
  similarPatientCount: number;
  yourManagementApproach: string;
  networkBestPractice: string;
  outcomeDifference: number; // percentage better/worse
  recommendedAdjustment?: string;
  percentileRanking: number; // 0-100
}

export interface PracticeAnalytics {
  practiceId: string;
  totalPatients: number;
  activeMonitoring: number;
  
  riskStratification: {
    critical: number;
    high: number;
    moderate: number;
    low: number;
  };
  
  timeSavings: {
    automatedChartReview: number; // hours per month
    proactiveAlerts: number;
    documentationGeneration: number;
    totalMonthlySavings: number;
    annualValueDollars: number;
  };
  
  networkPerformance: NetworkPerformance[];
  referralOptimization: ReferralOptimization[];
}

export interface NetworkPerformance {
  condition: string;
  yourEffectiveness: number; // percentage
  networkAverage: number;
  networkTopQuartile: number;
  ranking: string; // "Top 25%"
  sampleSize: number;
}

export interface ReferralOptimization {
  condition: string;
  averageCoManagementDuration: number; // months
  networkAverage: number;
  optimalTiming: number;
  patientsManageable: number;
  potentialRevenue: number;
}
```

### Patient Journey Comparison

```typescript
export interface PatientJourneyComparison {
  patientId: string;
  patientName: string;
  condition: string;
  
  traditionalApproach: ApproachDetails;
  vsdpApproach: ApproachDetails;
  comparison: ComparisonMetrics;
}

export interface ApproachDetails {
  dataAvailable: string[];
  missingContext?: string[];
  integratedInsights?: string[];
  clinicalDecision: string;
  aiRecommendation?: string;
  outcome: OutcomeDetails;
}

export interface OutcomeDetails {
  timeToDetection: string; // "14 months", "2 months"
  finalVisualAcuity: string; // "20/200", "20/30"
  interventionTiming: string;
  cost: number;
  visionPreserved?: string;
  qualityOfLife?: string;
}

export interface ComparisonMetrics {
  visionOutcomeDifference: string;
  costSavings: number;
  detectionImprovement: string;
  qualityOfLifeImpact: string;
}
```

## Pharma/Trials Data Models

```typescript
export interface TrialSimulationInput {
  condition: Condition;
  patientCriteria: PatientCriteria;
  requiredSampleSize: number;
  studyDuration: number; // months
}

export interface PatientCriteria {
  ageRange: { min: number; max: number };
  diseaseStage: string[];
  comorbidities?: string[];
  excludeCriteria?: string[];
}

export interface TrialSimulationResult {
  condition: string;
  eligiblePatients: number;
  recruitmentTime: {
    traditional: number; // months
    vsdp: number; // months
  };
  cost: {
    traditional: number; // dollars
    vsdp: number; // dollars
  };
  geographicDistribution: GeographicDistribution[];
  confidenceLevel: number;
}

export interface GeographicDistribution {
  state: string;
  count: number;
  practiceCount: number;
}
```

## Chat/AI Data Models

```typescript
export interface ChatSession {
  id: string;
  stakeholderContext: StakeholderType | null;
  messages: ChatMessage[];
  createdAt: Date;
  lastMessageAt: Date;
}

export type StakeholderType = 'provider' | 'pharma' | 'ehr' | 'bigtech';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokenCount?: number;
}

export interface ChatContext {
  stakeholderType: StakeholderType;
  currentPage: string;
  relevantPatientId?: string;
  sessionData?: Record<string, unknown>;
}
```

## Lead Capture

```typescript
export interface Lead {
  id: string;
  sessionId: string;
  name: string;
  email: string;
  organization: string;
  stakeholderType: StakeholderType;
  interestedInPilot: boolean;
  notes?: string;
  capturedAt: Date;
  source: 'chat' | 'form' | 'modal';
}

export interface LeadFormData {
  name: string;
  email: string;
  organization: string;
  stakeholderType: StakeholderType;
  interestedInPilot: boolean;
  notes?: string;
}
```

## Type Guards

```typescript
// src/types/utils.ts

export function isDigitalTwinPatient(data: unknown): data is DigitalTwinPatient {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'riskScore' in data &&
    'dataStreams' in data
  );
}

export function isClinicalAlert(data: unknown): data is ClinicalAlert {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'severity' in data &&
    'category' in data
  );
}
```

## Zod Schemas (Runtime Validation)

```typescript
// src/types/schemas.ts
import { z } from 'zod';

export const DigitalTwinPatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().int().positive(),
  conditions: z.array(z.enum([
    'diabetes',
    'glaucoma',
    'myopia',
    'amd',
    'retinal_detachment_risk',
    'diabetic_retinopathy',
  ])),
  riskScore: z.number().min(0).max(100),
  riskTrend: z.enum(['increasing', 'stable', 'decreasing']),
  // ... rest of schema
});

export const ClinicalAlertSchema = z.object({
  id: z.string(),
  patientId: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.enum([
    'progression',
    'adherence',
    'missing_data',
    'external_health',
    'overdue_followup',
  ]),
  message: z.string(),
  detailedExplanation: z.string(),
  generatedAt: z.date(),
  actionRequired: z.string(),
  actionDeadline: z.date().optional(),
  automatedOutreach: z.boolean().optional(),
  relatedDataPoints: z.array(z.object({
    source: z.string(),
    value: z.string(),
    date: z.date(),
  })),
  networkIntelligence: z.string().optional(),
});

export const LeadFormDataSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().min(2, 'Organization is required'),
  stakeholderType: z.enum(['provider', 'pharma', 'ehr', 'bigtech']),
  interestedInPilot: z.boolean(),
  notes: z.string().optional(),
});
```

## Simulated Data Generation

```typescript
// src/lib/generators/patients.ts

export function generatePatientPanel(count: number): DigitalTwinPatient[] {
  // Generate realistic patient cohort with distribution:
  // - 60% low risk
  // - 25% moderate risk
  // - 12% high risk
  // - 3% critical risk
}

export function generateClinicalTimeline(
  patientId: string,
  condition: Condition,
  durationMonths: number
): DataStreams {
  // Generate multi-year progression data with realistic variability
}

export function generateNetworkStats(practiceId: string): PracticeAnalytics {
  // Generate comparative analytics with realistic distributions
}

export function generateOutcomeScenario(
  patientId: string,
  approach: 'traditional' | 'vsdp'
): OutcomeDetails {
  // Project 2-year outcomes based on approach
}
```

## Type Naming Conventions

1. **Interfaces**: PascalCase, descriptive nouns
   - `DigitalTwinPatient`, `ClinicalAlert`, `NetworkPerformance`

2. **Enums/Unions**: PascalCase for type, lowercase for values
   - `type Condition = 'diabetes' | 'glaucoma'`

3. **Zod Schemas**: Interface name + "Schema"
   - `DigitalTwinPatientSchema`, `LeadFormDataSchema`

4. **Input/Output Types**: Procedure name + "Input"/"Output"
   - `GetPatientDashboardInput`, `CalculateRecruitmentOutput`

5. **Props Types**: Component name + "Props"
   - `PatientDashboardProps`, `AlertCardProps`
