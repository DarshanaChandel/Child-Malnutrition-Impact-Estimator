export type Zone = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';

export interface StateData {
  id: string;
  name: string;
  zone: Zone;
  stuntingPct: number;
  wastingPct: number;
  severeWastingPct: number;
  underweightPct: number;
  anaemiaPct: number;
  rainfedPct: number;
  sensitivity: number; // 1.0 to 5.0
  avgDeficit: number; // percentage deficit in typical El Nino
  pulseRisk: 'Severe' | 'High' | 'Moderate' | 'Low';
  primaryCrops: string[];
  anganwadiCoveragePct: number;
  pdsAccessPct: number;
  mainFinding: string;
  whatItMeans: string;
  whatWeDoNotKnow: string;
  reportingPeriod: string;
  coordinates: { x: number; y: number }; // For visual India map representation
}

export interface ClimateScenario {
  id: string;
  name: string;
  anomalyTemp: number; // e.g. 0.0, 0.6, 1.2, 1.8, 2.4
  label: 'Neutral' | 'Weak' | 'Moderate' | 'Strong' | 'Super';
  nationalDeficitPct: number;
  kharifYieldDropPct: number;
  pulseInflationPct: number;
  calorieIntakeDipPct: number;
  under5WastingSurgePct: number;
  estimatedChildrenAtRiskMillions: number;
  description: string;
  assumptions: string[];
}

export interface HistoricalBenchmark {
  year: string;
  title: string;
  oniPeak: string;
  deficitLPA: number;
  kharifDrop: number;
  pulseInflation: number;
  wastingSurge: number;
  summary: string;
  affectedDistricts: string;
}

export interface ChildAssessmentInput {
  childName?: string;
  gender: 'boy' | 'girl';
  ageMonths: number;
  heightCm: number;
  weightKg: number;
  muacCm: number;
  hasOedema: boolean;
  stateId: string;
  foodGroups: string[];
  hasAnganwadiAccess: boolean;
  rationCardType: 'antyodaya' | 'bpl' | 'apl' | 'none';
}

export interface ChildAssessmentResult {
  haz: number;
  whz: number;
  waz: number;
  muacStatus: 'normal' | 'mam' | 'sam';
  stuntingStatus: 'normal' | 'moderate' | 'severe';
  wastingStatus: 'normal' | 'moderate' | 'severe' | 'overweight' | 'obese';
  underweightStatus: 'normal' | 'moderate' | 'severe';
  hasEmergencyOedema: boolean;
  compositeVulnerabilityScore: number;
  vulnerabilityTier: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Critical';
  climateMultiplier: number;
  plainSummary: string;
  clinicalAdvice: string[];
  safetyNetActions: string[];
  kitchenNutritionActions: string[];
  waterHealthActions: string[];
  needsUrgentCare: boolean;
}

export interface FoodGroupItem {
  id: string;
  name: string;
  category: string;
  examples: string;
  iconName: string;
}
