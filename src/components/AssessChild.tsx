import React, { useState } from 'react';
import { StateData, ChildAssessmentInput, ChildAssessmentResult } from '../types';
import { INDIAN_STATES, WHO_FOOD_GROUPS } from '../data/indiaData';
import { assessChildNutrition } from '../utils/climateNutritionModel';
import { getWHZCurvePoints } from '../utils/whoGrowthStandards';
import {
  Baby,
  Ruler,
  Weight,
  Activity,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Printer,
  Copy,
  Check,
  ShieldAlert,
  ShieldCheck,
  Heart,
  Droplets,
  Utensils,
  Home,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AssessChildProps {
  initialState?: StateData;
  onNavigateToGuide?: () => void;
}

export const AssessChild: React.FC<AssessChildProps> = ({ initialState, onNavigateToGuide }) => {
  // Current step: 1 (basic), 2 (measurements), 3 (household), 4 (results)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<ChildAssessmentInput>({
    childName: '',
    gender: 'boy',
    ageMonths: 18,
    heightCm: 81.5,
    weightKg: 10.2,
    muacCm: 14.0,
    hasOedema: false,
    stateId: initialState ? initialState.id : 'maharashtra',
    foodGroups: ['grains_roots', 'pulses_nuts', 'dairy', 'vitamin_a_fruits_veg'],
    hasAnganwadiAccess: true,
    rationCardType: 'bpl'
  });

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Assessment results
  const [result, setResult] = useState<ChildAssessmentResult | null>(null);

  // Quick live Z-score preview during input
  const quickResult = assessChildNutrition(formData);

  // Step validation
  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (formData.ageMonths < 0 || formData.ageMonths > 60) {
        newErrors.ageMonths = 'Age must be between 0 and 60 months (0–5 years).';
      }
      if (!formData.stateId) {
        newErrors.stateId = 'Please select a state of residence.';
      }
    }

    if (step === 2) {
      if (formData.heightCm < 45 || formData.heightCm > 125) {
        newErrors.heightCm = 'Height must be between 45 cm and 125 cm.';
      }
      if (formData.weightKg < 2 || formData.weightKg > 35) {
        newErrors.weightKg = 'Weight must be between 2 kg and 35 kg.';
      }
      if (formData.muacCm < 8 || formData.muacCm > 22) {
        newErrors.muacCm = 'Upper arm circumference must be between 8 cm and 22 cm.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 3) {
        // Run full assessment
        const calcResult = assessChildNutrition(formData);
        setResult(calcResult);
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentStep(1);
    setResult(null);
    setFormData({
      childName: '',
      gender: 'boy',
      ageMonths: 18,
      heightCm: 81.5,
      weightKg: 10.2,
      muacCm: 14.0,
      hasOedema: false,
      stateId: initialState ? initialState.id : 'maharashtra',
      foodGroups: ['grains_roots', 'pulses_nuts', 'dairy', 'vitamin_a_fruits_veg'],
      hasAnganwadiAccess: true,
      rationCardType: 'bpl'
    });
    setErrors({});
  };

  const toggleFoodGroup = (groupId: string) => {
    setFormData(prev => {
      const exists = prev.foodGroups.includes(groupId);
      return {
        ...prev,
        foodGroups: exists
          ? prev.foodGroups.filter(id => id !== groupId)
          : [...prev.foodGroups, groupId]
      };
    });
  };

  const copyResultsToClipboard = () => {
    if (!result) return;
    const name = formData.childName || 'Child';
    const text = `Child Malnutrition Assessment Summary
Name: ${name}
Age: ${formData.ageMonths} months | Sex: ${formData.gender} | State: ${
      INDIAN_STATES.find(s => s.id === formData.stateId)?.name
    }
----------------------------------------
Finding: ${result.plainSummary}
Vulnerability Tier: ${result.vulnerabilityTier} (Score: ${result.compositeVulnerabilityScore}/100)
WHO Metrics: HAZ ${result.haz} | WHZ ${result.whz} | WAZ ${result.waz} | MUAC: ${formData.muacCm} cm
Pitting Oedema: ${formData.hasOedema ? 'Present (Emergency)' : 'Absent'}
Dietary Diversity: ${formData.foodGroups.length} of 8 WHO Food Groups
----------------------------------------
*Note: This is an educational screening tool, not a medical diagnosis.*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Curve points for SVG WHO graph
  const curvePoints = getWHZCurvePoints(formData.gender);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Step Indicator Header */}
      <div>
        <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-400 mb-1">
          Guided Child Growth Screening
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
          Assess a Child&apos;s Growth & Nutrition
        </h1>
        <p className="mt-1 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
          Follow 3 simple, guided steps to check growth measurements against official WHO standards, identify potential gaps, and receive practical next steps.
        </p>

        {/* 4 Step Progress Pills */}
        <div className="mt-6 grid grid-cols-4 gap-2 border-b border-stone-200 dark:border-slate-800 pb-4">
          {[
            { step: 1, title: 'Basic Info' },
            { step: 2, title: 'Growth' },
            { step: 3, title: 'Food & Home' },
            { step: 4, title: 'Results & Plan' }
          ].map(s => {
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;
            return (
              <div
                key={s.step}
                className={`text-center py-2 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 font-medium'
                    : 'bg-stone-100 dark:bg-slate-900 text-stone-400'
                }`}
              >
                <div className="text-xs uppercase tracking-wider hidden sm:block">Step {s.step}</div>
                <div className="text-xs sm:text-sm font-semibold truncate">{s.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Basic Information */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
              Step 1: Basic Information
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
              We only ask for details that directly affect growth standards and local climate risk factors.
            </p>
          </div>

          <div className="space-y-5">
            {/* Child Identifier (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Child Name or Identifier <span className="text-stone-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Aarav, Ananya, or leave blank"
                value={formData.childName}
                onChange={e => setFormData({ ...formData, childName: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <p className="mt-1 text-xs text-stone-500">
                Kept strictly on your device for generating the personalized report.
              </p>
            </div>

            {/* Sex / Gender Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Child Sex / Gender <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'boy' })}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.gender === 'boy'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-700 text-emerald-900 dark:text-emerald-300 font-bold ring-2 ring-emerald-700/20'
                      : 'bg-stone-50 dark:bg-slate-950/50 border-stone-200 dark:border-slate-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-base font-semibold block">Boy</span>
                  <span className="text-xs text-stone-500 mt-0.5 block">WHO Boys Reference</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'girl' })}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.gender === 'girl'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-700 text-emerald-900 dark:text-emerald-300 font-bold ring-2 ring-emerald-700/20'
                      : 'bg-stone-50 dark:bg-slate-950/50 border-stone-200 dark:border-slate-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-base font-semibold block">Girl</span>
                  <span className="text-xs text-stone-500 mt-0.5 block">WHO Girls Reference</span>
                </button>
              </div>
              <p className="mt-1.5 text-xs text-stone-500">
                Why this is needed: WHO 2006 growth standards use separate calibrated curves for boys and girls.
              </p>
            </div>

            {/* Age in Months */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Child Age (in completed months) <span className="text-rose-500">*</span>
                </label>
                <span className="text-sm font-bold font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                  {formData.ageMonths} months ({Math.floor(formData.ageMonths / 12)}y {formData.ageMonths % 12}m)
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="60"
                value={formData.ageMonths}
                onChange={e => setFormData({ ...formData, ageMonths: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-800 dark:accent-emerald-500 h-2 bg-stone-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>Birth (0 mo)</span>
                <span>1 Year (12 mo)</span>
                <span>2 Years (24 mo)</span>
                <span>3 Years (36 mo)</span>
                <span>5 Years (60 mo)</span>
              </div>
              {errors.ageMonths && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.ageMonths}</p>
              )}
            </div>

            {/* State of Residence */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                State or Region of Residence <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.stateId}
                onChange={e => setFormData({ ...formData, stateId: e.target.value })}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.zone} Zone)
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-stone-500">
                Why this is needed: Used to contextualize local rainfall dependencies, rainfed crop exposure, and regional safety net coverage.
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex justify-end border-t border-stone-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Continue to Growth Measurements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Growth Measurements */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
              Step 2: Growth Measurements
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
              Enter your child&apos;s physical measurements. Each measurement is explained below in plain terms.
            </p>
          </div>

          <div className="space-y-6">
            {/* Height / Length */}
            <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-emerald-700" />
                    <span>Height or Length (cm)</span>
                  </label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    For younger children (under 2 years), measured lying down (recumbent length); for older children, standing height.
                  </p>
                </div>
                <div className="text-base font-bold font-mono text-emerald-800 dark:text-emerald-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-800">
                  {formData.heightCm} cm
                </div>
              </div>

              <input
                type="range"
                min="45"
                max="120"
                step="0.5"
                value={formData.heightCm}
                onChange={e => setFormData({ ...formData, heightCm: parseFloat(e.target.value) || 45 })}
                className="w-full accent-emerald-800 dark:accent-emerald-500 h-2 bg-stone-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-stone-500">
                <span>45 cm</span>
                <span>65 cm</span>
                <span>85 cm</span>
                <span>105 cm</span>
                <span>120 cm</span>
              </div>
              {errors.heightCm && (
                <p className="text-xs text-rose-600 font-medium">{errors.heightCm}</p>
              )}
            </div>

            {/* Weight */}
            <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <Weight className="w-4 h-4 text-emerald-700" />
                    <span>Current Weight (kg)</span>
                  </label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Measured with light clothing using an accurate digital scale.
                  </p>
                </div>
                <div className="text-base font-bold font-mono text-emerald-800 dark:text-emerald-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-800">
                  {formData.weightKg} kg
                </div>
              </div>

              <input
                type="range"
                min="2.5"
                max="28"
                step="0.1"
                value={formData.weightKg}
                onChange={e => setFormData({ ...formData, weightKg: parseFloat(e.target.value) || 2.5 })}
                className="w-full accent-emerald-800 dark:accent-emerald-500 h-2 bg-stone-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-stone-500">
                <span>2.5 kg</span>
                <span>8 kg</span>
                <span>14 kg</span>
                <span>20 kg</span>
                <span>28 kg</span>
              </div>
              {errors.weightKg && (
                <p className="text-xs text-rose-600 font-medium">{errors.weightKg}</p>
              )}
            </div>

            {/* Upper-Arm Measurement (MUAC) */}
            <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-700" />
                    <span>Upper-Arm Measurement (MUAC in cm)</span>
                  </label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Measured around the midpoint of the relaxed left upper arm. Interpreted using standard age guidance.
                  </p>
                </div>
                <div className="text-base font-bold font-mono text-emerald-800 dark:text-emerald-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-800">
                  {formData.muacCm} cm
                </div>
              </div>

              <input
                type="range"
                min="9"
                max="19"
                step="0.1"
                value={formData.muacCm}
                onChange={e => setFormData({ ...formData, muacCm: parseFloat(e.target.value) || 9 })}
                className="w-full accent-emerald-800 dark:accent-emerald-500 h-2 bg-stone-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />

              {/* Color Band Visual Indicator */}
              <div className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-900">
                <div className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-full ${
                    formData.muacCm < 11.5
                      ? 'bg-rose-600 ring-2 ring-rose-400'
                      : formData.muacCm < 12.5
                      ? 'bg-amber-500 ring-2 ring-amber-300'
                      : 'bg-emerald-600 ring-2 ring-emerald-300'
                  }`} />
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {formData.muacCm < 11.5
                      ? 'Red Zone (< 11.5 cm): Severe Deficit / Alert'
                      : formData.muacCm < 12.5
                      ? 'Yellow Zone (11.5–12.4 cm): Moderate Deficit'
                      : 'Green Zone (≥ 12.5 cm): Normal Healthy Muscle Mass'}
                  </span>
                </div>
              </div>
              {errors.muacCm && (
                <p className="text-xs text-rose-600 font-medium">{errors.muacCm}</p>
              )}
            </div>

            {/* Bilateral Pitting Oedema Check */}
            <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasOedema}
                  onChange={e => setFormData({ ...formData, hasOedema: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded text-rose-600 focus:ring-rose-500 accent-rose-600 cursor-pointer"
                />
                <div>
                  <span className="text-sm font-bold text-stone-900 dark:text-white block">
                    Check for Swelling in Both Feet (Bilateral Pitting Oedema)
                  </span>
                  <span className="text-xs text-stone-500 mt-0.5 block leading-relaxed">
                    Gently press with both thumbs on the tops of both feet for 3 seconds. Check this box ONLY if a visible pit/dent remains in <em>both</em> feet after lifting your fingers.
                  </span>
                </div>
              </label>

              {formData.hasOedema && (
                <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
                  <strong>Medical Warning: </strong>
                  Bilateral swelling in both feet is a serious metabolic indicator called nutritional oedema. If present, it requires an in-person medical evaluation by a doctor or at a hospital, irrespective of body weight.
                </div>
              )}
            </div>

            {/* Live Instant Status Preview */}
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider block">
                  Real-Time Calculation Preview
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-300">
                  Weight-for-Height: {quickResult.whz} SD · Height-for-Age: {quickResult.haz} SD
                </span>
              </div>
              <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {quickResult.wastingStatus === 'normal' ? 'Normal Weight' : quickResult.wastingStatus}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 font-medium text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Continue to Food & Household</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Food & Household Information */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
              Step 3: Food & Safety Net Access
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
              Only questions that serve a clear purpose in evaluating household nutrition buffers are included here.
            </p>
          </div>

          <div className="space-y-6">
            {/* 8 WHO Food Groups Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                    What Did the Child Eat Yesterday? (WHO 8 Food Groups)
                  </label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Select all food categories eaten during day or night:
                  </p>
                </div>
                <div className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {formData.foodGroups.length} of 8 Groups Selected
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {WHO_FOOD_GROUPS.map(fg => {
                  const isChecked = formData.foodGroups.includes(fg.id);
                  return (
                    <div
                      key={fg.id}
                      onClick={() => toggleFoodGroup(fg.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-700 dark:border-emerald-600 text-stone-900 dark:text-white'
                          : 'bg-stone-50 dark:bg-slate-950/40 border-stone-200 dark:border-slate-800 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // Handled by parent container click
                        className="mt-0.5 w-4 h-4 rounded text-emerald-800 accent-emerald-800 cursor-pointer"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-stone-900 dark:text-white">
                          {fg.name}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate mt-0.5">
                          {fg.examples}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-stone-500">
                Why this matters: WHO recommends at least 5 different food groups daily for minimum dietary diversity to prevent micronutrient deficiencies.
              </p>
            </div>

            {/* Anganwadi Access */}
            <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Local Anganwadi Centre Access
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hasAnganwadiAccess: true })}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.hasAnganwadiAccess
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-700 text-emerald-900 dark:text-emerald-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-stone-600'
                  }`}
                >
                  <span className="text-xs font-semibold block">Yes, Registered / Nearby</span>
                  <span className="text-[11px] text-stone-500 mt-0.5 block">Receives THR / monitoring</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hasAnganwadiAccess: false })}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    !formData.hasAnganwadiAccess
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-700 text-emerald-900 dark:text-emerald-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-800 text-stone-600'
                  }`}
                >
                  <span className="text-xs font-semibold block">No / Not Registered</span>
                  <span className="text-[11px] text-stone-500 mt-0.5 block">No supplementary rations</span>
                </button>
              </div>
            </div>

            {/* Public Distribution System (PDS) Ration Card */}
            <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Household Ration Card (PDS Access)
              </label>
              <select
                value={formData.rationCardType}
                onChange={e =>
                  setFormData({
                    ...formData,
                    rationCardType: e.target.value as 'antyodaya' | 'bpl' | 'apl' | 'none'
                  })
                }
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="antyodaya">Antyodaya Anna Yojana (AAY - Highest grain support)</option>
                <option value="bpl">Priority Household / Below Poverty Line (BPL / PHH)</option>
                <option value="apl">Above Poverty Line (APL / General)</option>
                <option value="none">No Ration Card (Purchases all food at open market)</option>
              </select>
              <p className="text-xs text-stone-500">
                Why this matters: PDS subsidized grain protects the core calorie baseline when market food prices increase during droughts.
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 font-medium text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow cursor-pointer inline-flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Generate Nutritional Assessment</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Comprehensive Results & Tailored Plan */}
      {currentStep === 4 && result && (
        <div className="space-y-8 animate-in fade-in-50">
          {/* 1. Primary Finding Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-stone-100 dark:border-slate-800">
              <div>
                <div className="text-xs text-stone-500 font-medium">
                  {formData.childName || 'Child'} · {formData.ageMonths} Months · {formData.gender === 'boy' ? 'Boy' : 'Girl'} · {
                    INDIAN_STATES.find(s => s.id === formData.stateId)?.name
                  }
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
                  Nutritional Assessment Findings
                </h2>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  result.vulnerabilityTier === 'Critical'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                    : result.vulnerabilityTier === 'Severe'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                    : result.vulnerabilityTier === 'High'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/80 dark:text-yellow-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                }`}>
                  {result.vulnerabilityTier} Risk Tier
                </span>
                <span className="text-xs font-mono font-bold text-stone-500">
                  Score: {result.compositeVulnerabilityScore}/100
                </span>
              </div>
            </div>

            {/* Plain English Finding Statement */}
            <div className="p-5 bg-[#FAF9F5] dark:bg-slate-950/60 rounded-2xl border border-stone-200/80 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                {result.needsUrgentCare ? (
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                )}
                <span>What the Measurements Tell Us</span>
              </div>
              <p className="text-base text-stone-800 dark:text-stone-100 font-medium leading-relaxed">
                {result.plainSummary}
              </p>
            </div>

            {/* 3 Core Anthropometric Dimensions in Plain Language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Acute Wasting */}
              <div className="p-4 bg-stone-50 dark:bg-slate-950/40 rounded-2xl border border-stone-200/70 dark:border-slate-800">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Weight-for-Height (Wasting)
                </div>
                <div className="text-lg font-bold text-stone-900 dark:text-white font-display mt-1">
                  {result.wastingStatus === 'normal'
                    ? 'Healthy Weight'
                    : result.wastingStatus === 'moderate'
                    ? 'Moderate Wasting'
                    : result.wastingStatus === 'severe'
                    ? 'Severe Acute Wasting'
                    : result.wastingStatus === 'overweight'
                    ? 'Above Expected Weight'
                    : 'Obesity Concern'}
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Reflects recent body mass and nutrition balance.
                </p>
              </div>

              {/* Chronic Stunting */}
              <div className="p-4 bg-stone-50 dark:bg-slate-950/40 rounded-2xl border border-stone-200/70 dark:border-slate-800">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Height-for-Age (Stunting)
                </div>
                <div className="text-lg font-bold text-stone-900 dark:text-white font-display mt-1">
                  {result.stuntingStatus === 'normal'
                    ? 'Age-Appropriate Height'
                    : result.stuntingStatus === 'moderate'
                    ? 'Moderate Stunting'
                    : 'Severe Stunting'}
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Reflects long-term cumulative bone & height growth.
                </p>
              </div>

              {/* MUAC */}
              <div className="p-4 bg-stone-50 dark:bg-slate-950/40 rounded-2xl border border-stone-200/70 dark:border-slate-800">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Upper-Arm Muscle Mass (MUAC)
                </div>
                <div className="text-lg font-bold text-stone-900 dark:text-white font-display mt-1">
                  {result.muacStatus === 'normal'
                    ? 'Healthy Muscle Buffer'
                    : result.muacStatus === 'mam'
                    ? 'Moderate Thinness (Yellow)'
                    : 'Severe Thinness (Red Band)'}
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  {formData.muacCm} cm measured arm circumference.
                </p>
              </div>
            </div>

            {/* Climate Context Note */}
            <div className="p-4 bg-stone-100/80 dark:bg-slate-950/60 rounded-xl border border-stone-200 dark:border-slate-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-300">
              <div>
                <strong>Regional Climate Stress Multiplier: </strong>
                <span>
                  {result.climateMultiplier}x vulnerability amplification during an active El Niño drought.
                </span>
              </div>
              <span className="font-mono font-bold text-stone-900 dark:text-white">
                {result.climateMultiplier}x
              </span>
            </div>
          </div>

          {/* 2. Interactive SVG WHO Growth Curve Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white">
                  WHO Weight-for-Height Growth Standard Curve
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  See where your child&apos;s exact measurement lies compared to healthy global percentiles.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-emerald-600 inline-block" /> Median (Ideal)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-amber-500 inline-block" /> -2 SD (MAM)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-rose-600 inline-block" /> -3 SD (SAM)
                </span>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative w-full aspect-[2.2/1] bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200 dark:border-slate-800 p-4">
              <svg viewBox="50 0 70 25" className="w-full h-full overflow-visible">
                {/* Horizontal grid lines */}
                {[5, 10, 15, 20].map(w => (
                  <g key={w}>
                    <line x1="55" y1={25 - w} x2="115" y2={25 - w} stroke="currentColor" strokeDasharray="1 2" strokeWidth="0.15" className="text-stone-300 dark:text-slate-700" />
                    <text x="52" y={25 - w + 0.5} textAnchor="end" className="text-[2.2px] fill-stone-400 font-mono">
                      {w}kg
                    </text>
                  </g>
                ))}

                {/* Vertical height labels */}
                {[60, 75, 90, 105].map(h => (
                  <g key={h}>
                    <line x1={h} y1="3" x2={h} y2="24" stroke="currentColor" strokeDasharray="1 2" strokeWidth="0.15" className="text-stone-300 dark:text-slate-700" />
                    <text x={h} y="26" textAnchor="middle" className="text-[2.2px] fill-stone-400 font-mono">
                      {h}cm
                    </text>
                  </g>
                ))}

                {/* +2 SD curve (Overweight) */}
                <path
                  d={`M ${curvePoints.map(p => `${p.height} ${25 - p.p97}`).join(' L ')}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="0.4"
                  strokeDasharray="0.8 0.8"
                />

                {/* Median curve (Ideal growth) */}
                <path
                  d={`M ${curvePoints.map(p => `${p.height} ${25 - p.p50}`).join(' L ')}`}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="0.6"
                />

                {/* -2 SD curve (Moderate wasting / MAM) */}
                <path
                  d={`M ${curvePoints.map(p => `${p.height} ${25 - p.p3}`).join(' L ')}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="0.5"
                  strokeDasharray="0.8 0.8"
                />

                {/* -3 SD curve (Severe wasting / SAM) */}
                <path
                  d={`M ${curvePoints.map(p => `${p.height} ${25 - p.p01}`).join(' L ')}`}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="0.5"
                />

                {/* The Child's Exact Measurement Coordinate Dot */}
                <g transform={`translate(${formData.heightCm}, ${25 - formData.weightKg})`}>
                  <circle r="1.6" className="fill-emerald-800 dark:fill-emerald-400 stroke-white dark:stroke-slate-900" strokeWidth="0.4" />
                  <circle r="2.8" fill="none" stroke="#059669" strokeWidth="0.2" className="animate-ping opacity-75" />
                  <text y="-2.5" textAnchor="middle" className="text-[2.6px] font-bold fill-stone-900 dark:fill-white">
                    {formData.childName || 'Child'} ({formData.weightKg}kg, {formData.heightCm}cm)
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* 3. 4-Pillar Tailored Action Plan */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-1">
                Practical Steps Forward
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
                Recommended Actions for Your Child
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Responsible, evidence-based steps based on your child&apos;s measurements and local safety nets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1: Clinical & Health */}
              <div className="p-5 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span>1. Clinical & Health Guidance</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {result.clinicalAdvice.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar 2: Anganwadi & Safety Nets */}
              <div className="p-5 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-sm">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center">
                    <Home className="w-4 h-4" />
                  </div>
                  <span>2. Anganwadi & Safety Net Actions</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {result.safetyNetActions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar 3: Kitchen & Daily Meals */}
              <div className="p-5 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <span>3. Kitchen & Dietary Solutions</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {result.kitchenNutritionActions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar 4: Water & Cleanliness */}
              <div className="p-5 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-sm">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <span>4. Water & Cleanliness Practices</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {result.waterHealthActions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Optional Collapsible Technical Detail Section */}
            <div className="pt-4 border-t border-stone-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="w-full flex items-center justify-between text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-white py-2 cursor-pointer"
              >
                <span>How were these numbers calculated? (Optional technical breakdown)</span>
                {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showTechnicalDetails && (
                <div className="mt-3 p-4 bg-stone-50 dark:bg-slate-950/80 rounded-2xl text-xs space-y-2 font-mono text-stone-600 dark:text-stone-300">
                  <div>· Height-for-Age Z-Score (HAZ): {result.haz} SD (WHO 2006 Median Knot Model)</div>
                  <div>· Weight-for-Height Z-Score (WHZ): {result.whz} SD (Allometric scaling)</div>
                  <div>· Weight-for-Age Z-Score (WAZ): {result.waz} SD (Underweight screening)</div>
                  <div>· MUAC Classification: {result.muacStatus.toUpperCase()} ({formData.muacCm} cm)</div>
                  <div>· Compound Vulnerability Index (CVI): {result.compositeVulnerabilityScore} / 100</div>
                  <div>· Climate Stress Multiplier: {result.climateMultiplier}x</div>
                </div>
              )}
            </div>

            {/* Medical Disclaimer Banner */}
            <div className="p-4 bg-stone-100 dark:bg-slate-950/50 rounded-2xl border border-stone-200/80 dark:border-slate-800 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <strong className="text-stone-900 dark:text-white">Medical Disclaimer: </strong>
                This tool is an educational screening and risk estimation platform based on WHO child growth standards and NFHS-5 surveys. It does not replace a clinical examination by a qualified medical professional. If a child appears severely lethargic, refuses all food, or has swelling in both feet, seek emergency care at the nearest hospital or PHC immediately.
              </div>
            </div>

            {/* Utility Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 text-xs font-medium rounded-xl border border-stone-200 dark:border-slate-800 hover:bg-stone-50 cursor-pointer inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Assess Another Child</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyResultsToClipboard}
                  className="px-4 py-2 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Summary' : 'Copy Summary'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
