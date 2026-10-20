import React, { useState } from 'react';
import { CLIMATE_SCENARIOS, INDIAN_STATES } from '../data/indiaData';
import { ClimateScenario, StateData } from '../types';
import {
  CloudSun,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Info,
  Layers,
  Sparkles,
  ShieldCheck,
  Wheat,
  Coins,
  Baby,
  Droplet
} from 'lucide-react';

interface ClimateScenariosProps {
  onAssessState: (state: StateData) => void;
}

export const ClimateScenarios: React.FC<ClimateScenariosProps> = ({ onAssessState }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('moderate');
  const [selectedStateId, setSelectedStateId] = useState<string>('maharashtra');
  const [compareScenarioId, setCompareScenarioId] = useState<string>('neutral');
  const [showComparison, setShowComparison] = useState(false);

  const scenario = CLIMATE_SCENARIOS.find(s => s.id === selectedScenarioId) || CLIMATE_SCENARIOS[2];
  const compareScenario = CLIMATE_SCENARIOS.find(s => s.id === compareScenarioId) || CLIMATE_SCENARIOS[0];
  const state = INDIAN_STATES.find(s => s.id === selectedStateId) || INDIAN_STATES[0];

  // Dynamic model calculations for the selected state and scenario:
  // How rainfall deficit scales based on state sensitivity
  const stateRainDeficit = Math.min(
    45,
    Math.round(scenario.nationalDeficitPct * (state.sensitivity / 3.5))
  );

  // Kharif yield drop scaled by rainfed %
  const stateYieldDrop = Math.min(
    40,
    Math.round(scenario.kharifYieldDropPct * (state.rainfedPct / 55))
  );

  // Pulse inflation impacts low-income food security
  const projectedPulseInflation = scenario.pulseInflationPct;

  // Calorie stress index (0 to 100)
  const calorieStressIndex = Math.min(
    100,
    Math.round((stateRainDeficit * 0.4 + stateYieldDrop * 0.4 + (projectedPulseInflation / 50) * 20))
  );

  // Acute Wasting Surge multiplier for this state
  const stateMultiplier = Number(
    (
      1.0 +
      ((state.rainfedPct / 100) * 0.4 + (state.sensitivity / 5.0) * 0.6) *
        (0.2 + 0.4 * (stateRainDeficit / 28))
    ).toFixed(2)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div>
        <div className="text-xs font-semibold tracking-wider uppercase text-teal-800 dark:text-teal-400 mb-1">
          Scenario Simulator
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
          How Might Different Climate Conditions Affect Malnutrition Risk?
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Test 5 hypothetical Pacific ocean warming scenarios (ENSO anomalies) and see how agricultural yields, food price inflation, and child vulnerability change across Indian states.
        </p>
      </div>

      {/* State & Scenario Selector Deck */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* State Picker */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-2">
              Select State to Model
            </label>
            <select
              value={selectedStateId}
              onChange={e => setSelectedStateId(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white font-medium text-sm"
            >
              {INDIAN_STATES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.zone} Zone · {s.rainfedPct}% Rainfed)
                </option>
              ))}
            </select>
          </div>

          {/* Compare Toggle */}
          <div className="flex items-center justify-start md:justify-end gap-3 pt-4 md:pt-0">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer inline-flex items-center gap-2 ${
                showComparison
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{showComparison ? 'Hide Scenario Comparison' : 'Compare Two Scenarios'}</span>
            </button>
          </div>
        </div>

        {/* 5 Scenario Buttons */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider mb-3">
            Choose Climate Scenario (Pacific Sea Surface Temperature Anomaly)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {CLIMATE_SCENARIOS.map(sc => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-700 dark:border-emerald-500 ring-2 ring-emerald-700/20'
                      : 'bg-stone-50 dark:bg-slate-950/50 border-stone-200/80 dark:border-slate-800 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      isSelected ? 'text-emerald-900 dark:text-emerald-300' : 'text-stone-500'
                    }`}>
                      {sc.label}
                    </span>
                    <span className="text-xs font-mono font-semibold text-stone-500">
                      {sc.anomalyTemp > 0 ? `+${sc.anomalyTemp}°C` : `${sc.anomalyTemp}°C`}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-stone-600 dark:text-stone-300 font-medium truncate">
                    {sc.name.split('(')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Single Scenario View */}
      {!showComparison && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: What Conditions Represent & Assumptions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
                  Scenario Parameters
                </span>
                <span className="text-xs font-mono font-bold text-stone-500">
                  Anomaly: +{scenario.anomalyTemp}°C
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white">
                  {scenario.name}
                </h3>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              {/* Assumptions */}
              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-slate-800">
                <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Model Assumptions
                </div>
                <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  {scenario.assumptions.map((ass, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                      <span>{ass}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Distinction note */}
              <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/50 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
                <strong>Important note: </strong>
                This is an exploratory mathematical scenario reflecting empirical historical sensitivity, not a real-time IMD weather forecast.
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Recalculated Results for this State */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-sm">
            <div>
              <div className="text-xs text-stone-500 font-medium">
                Recalculated Model Outputs for {state.name}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-1">
                Estimated Impact in {state.name}
              </h2>
            </div>

            {/* Dynamic Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Droplet className="w-3.5 h-3.5 text-sky-600" />
                  <span>Rainfall Deficit</span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white font-mono mt-1">
                  -{stateRainDeficit}%
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Below long-period avg</div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Wheat className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kharif Yield Drop</span>
                </div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white font-mono mt-1">
                  -{stateYieldDrop}%
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Rainfed crop output</div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Coins className="w-3.5 h-3.5 text-rose-600" />
                  <span>Pulse Inflation</span>
                </div>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 font-mono mt-1">
                  +{projectedPulseInflation}%
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Wholesale mandi price</div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                <div className="text-xs text-stone-500">Dietary Calorie Dip</div>
                <div className="text-2xl font-bold text-stone-900 dark:text-white font-mono mt-1">
                  -{scenario.calorieIntakeDipPct}%
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Bottom-income quintile</div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                <div className="text-xs text-stone-500">Climate Multiplier</div>
                <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 font-mono mt-1">
                  {stateMultiplier}x
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Stress amplification</div>
              </div>

              <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                <div className="text-xs text-stone-500">National Wasting Surge</div>
                <div className="text-2xl font-bold text-rose-700 dark:text-rose-400 font-mono mt-1">
                  +{scenario.under5WastingSurgePct}%
                </div>
                <div className="text-[11px] text-stone-500 mt-1">Under-5 population</div>
              </div>
            </div>

            {/* Plain English Synthesis */}
            <div className="p-5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/50 space-y-2">
              <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                What This Means in Everyday Language
              </div>
              <p className="text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
                Under the <strong>{scenario.name}</strong>, {state.name}&apos;s rainfed farmland ({state.rainfedPct}% of total crops) would experience an estimated <strong>-{stateRainDeficit}% rainfall deficit</strong>, reducing harvest yields by approximately <strong>{stateYieldDrop}%</strong>.
              </p>
              <p className="text-sm text-stone-700 dark:text-stone-200 leading-relaxed">
                Because pulse supplies would tighten nationally (pushing prices up by <strong>+{projectedPulseInflation}%</strong>), daily-wage families would find it harder to purchase lentils, milk, and eggs. This elevates nutritional vulnerability by a factor of <strong>{stateMultiplier}x</strong> compared to a normal rainfall season.
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-slate-800">
              <span className="text-xs text-stone-500">
                Want to see how this scenario affects an individual child?
              </span>
              <button
                onClick={() => onAssessState(state)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Assess Child with this Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Compare Two Scenarios Side by Side */}
      {showComparison && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-slate-800">
            <div>
              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
                Side-by-Side Scenario Comparison for {state.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Contrast a baseline or mild condition against a severe El Niño shock
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 uppercase">Compare With:</span>
              <select
                value={compareScenarioId}
                onChange={e => setCompareScenarioId(e.target.value)}
                className="px-3 py-1.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-lg text-xs font-semibold"
              >
                {CLIMATE_SCENARIOS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Scenario 1 Box */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-400">
                  Scenario A: {scenario.label}
                </span>
                <span className="text-xs font-mono font-bold text-stone-600">
                  +{scenario.anomalyTemp}°C
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                {scenario.name}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {scenario.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-stone-200 dark:border-slate-800 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Estimated State Deficit:</span>
                  <span className="font-bold font-mono text-stone-900 dark:text-white">
                    -{Math.round(scenario.nationalDeficitPct * (state.sensitivity / 3.5))}%
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Kharif Yield Impact:</span>
                  <span className="font-bold font-mono text-stone-900 dark:text-white">
                    -{Math.round(scenario.kharifYieldDropPct * (state.rainfedPct / 55))}%
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Wholesale Pulse Inflation:</span>
                  <span className="font-bold font-mono text-amber-700 dark:text-amber-400">
                    +{scenario.pulseInflationPct}%
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Under-5 Wasting Surge:</span>
                  <span className="font-bold font-mono text-rose-700 dark:text-rose-400">
                    +{scenario.under5WastingSurgePct}%
                  </span>
                </div>
              </div>
            </div>

            {/* Scenario 2 Box */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-950/60 border border-stone-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-teal-800 dark:text-teal-400">
                  Scenario B: {compareScenario.label}
                </span>
                <span className="text-xs font-mono font-bold text-stone-600">
                  +{compareScenario.anomalyTemp}°C
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                {compareScenario.name}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {compareScenario.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-stone-200 dark:border-slate-800 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Estimated State Deficit:</span>
                  <span className="font-bold font-mono text-stone-900 dark:text-white">
                    -{Math.round(compareScenario.nationalDeficitPct * (state.sensitivity / 3.5))}%
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Kharif Yield Impact:</span>
                  <span className="font-bold font-mono text-stone-900 dark:text-white">
                    -{Math.round(compareScenario.kharifYieldDropPct * (state.rainfedPct / 55))}%
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Wholesale Pulse Inflation:</span>
                  <span className="font-bold font-mono text-amber-700 dark:text-amber-400">
                    +{compareScenario.pulseInflationPct}%
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Under-5 Wasting Surge:</span>
                  <span className="font-bold font-mono text-rose-700 dark:text-rose-400">
                    +{compareScenario.under5WastingSurgePct}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
