import React, { useState } from 'react';
import { StateData, Zone } from '../types';
import { INDIAN_STATES, HISTORICAL_BENCHMARKS } from '../data/indiaData';
import { IndiaMap } from './IndiaMap';
import {
  Search,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Info,
  Calendar,
  AlertCircle,
  Shield,
  Activity,
  Layers,
  CheckCircle2,
  HelpCircle,
  Compass
} from 'lucide-react';

interface RegionalExplorerProps {
  initialState?: StateData;
  onAssessState: (state: StateData) => void;
}

export const RegionalExplorer: React.FC<RegionalExplorerProps> = ({
  initialState,
  onAssessState
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<Zone | 'All'>('All');
  const [selectedState, setSelectedState] = useState<StateData>(initialState || INDIAN_STATES[0]);
  const [compareMode, setCompareMode] = useState(false);
  const [compareState, setCompareState] = useState<StateData>(
    INDIAN_STATES.find(s => s.id === 'punjab') || INDIAN_STATES[1]
  );
  const [activeTab, setActiveTab] = useState<'profile' | 'compare' | 'history'>('profile');

  // Filter states
  const filteredStates = INDIAN_STATES.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'All' || state.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const zones: (Zone | 'All')[] = ['All', 'North', 'South', 'East', 'West', 'Central'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div>
        <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-400 mb-1">
          Regional Explorer
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
          What is Happening in Different Parts of India?
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Explore documented health survey data (NFHS-5) and rainfall dependencies across 16 Indian states. Understand how rainfed farming, public safety nets, and local crop patterns shape vulnerability.
        </p>

        {/* View Switcher Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-stone-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            State Profile & Evidence
          </button>
          <button
            onClick={() => {
              setActiveTab('compare');
              setCompareMode(true);
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            Compare Two States
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            Historical Drought Benchmarks
          </button>
        </div>
      </div>

      {/* VIEW 1: State Profile */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Search, Zone Filters & State List / Map */}
          <div className="lg:col-span-5 space-y-5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search state (e.g. Maharashtra, Bihar)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:focus:ring-emerald-500 text-stone-900 dark:text-white"
              />
            </div>

            {/* Zone Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 dark:bg-slate-900/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
              {zones.map(zone => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    selectedZone === zone
                      ? 'bg-white dark:bg-slate-800 text-emerald-900 dark:text-emerald-300 shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* Interactive Map Visual */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200/80 dark:border-slate-800 p-4">
              <div className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2 flex items-center justify-between">
                <span>Interactive Map View</span>
                <span>Click any point to select</span>
              </div>
              <IndiaMap
                states={INDIAN_STATES}
                selectedState={selectedState}
                onSelectState={setSelectedState}
              />
            </div>

            {/* Filtered State Selection Buttons List */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200/80 dark:border-slate-800 p-3 max-h-72 overflow-y-auto space-y-1">
              <div className="px-2 py-1 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Select a State ({filteredStates.length})
              </div>
              {filteredStates.map(st => {
                const isSelected = st.id === selectedState.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedState(st)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 font-semibold border border-emerald-200/60 dark:border-emerald-800/60'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{st.name}</span>
                    <span className="text-xs text-stone-500 font-mono">
                      Wasting: {st.wastingPct}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Complete State Profile */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-sm">
            {/* Header Lockup */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-stone-200 dark:border-slate-800">
              <div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {selectedState.zone} Zone · Official Source: {selectedState.reportingPeriod}
                </div>
                <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-white mt-0.5">
                  {selectedState.name}
                </h2>
              </div>

              <button
                onClick={() => onAssessState(selectedState)}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <Activity className="w-4 h-4" />
                <span>Assess a child in {selectedState.name}</span>
              </button>
            </div>

            {/* 1. The Main Finding */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                1. The Main Finding
              </div>
              <p className="text-base text-stone-800 dark:text-stone-100 font-medium leading-relaxed">
                {selectedState.mainFinding}
              </p>
            </div>

            {/* 2. Children's Nutrition in Plain English */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider">
                  2. Children&apos;s Nutrition (NFHS-5 Baseline: 2019–2021)
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Child Wasting</div>
                  <div className="text-xl font-bold text-stone-900 dark:text-white font-mono mt-1">
                    {selectedState.wastingPct}%
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Low weight for height</div>
                </div>

                <div className="p-3.5 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Severe Wasting</div>
                  <div className="text-xl font-bold text-rose-700 dark:text-rose-400 font-mono mt-1">
                    {selectedState.severeWastingPct}%
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Acute medical risk</div>
                </div>

                <div className="p-3.5 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Child Stunting</div>
                  <div className="text-xl font-bold text-stone-900 dark:text-white font-mono mt-1">
                    {selectedState.stuntingPct}%
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Low height for age</div>
                </div>

                <div className="p-3.5 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Child Anaemia</div>
                  <div className="text-xl font-bold text-amber-700 dark:text-amber-400 font-mono mt-1">
                    {selectedState.anaemiaPct}%
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Low hemoglobin</div>
                </div>
              </div>

              {/* Plain English statement of the numbers */}
              <div className="p-4 bg-stone-50 dark:bg-slate-950/40 rounded-xl border border-stone-200/60 dark:border-slate-800/80 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                <strong>In everyday terms: </strong>
                About {Math.round(selectedState.wastingPct)} out of every 100 children in {selectedState.name} had body weight lower than expected for their height during the survey period. In addition, about {Math.round(selectedState.stuntingPct)} out of every 100 were classified as stunted, which is associated with a child&apos;s height being low for their age.
              </div>
            </div>

            {/* 3. Climate and Rainfall Sensitivity */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-stone-600 dark:text-stone-300 uppercase tracking-wider">
                3. Climate & Rainfall Conditions
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Rainfed Farm Land</div>
                  <div className="text-lg font-bold text-stone-900 dark:text-white font-mono mt-0.5">
                    {selectedState.rainfedPct}% of area
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    {selectedState.rainfedPct > 65
                      ? 'High rainfall dependency'
                      : 'Partially insulated by irrigation'}
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Typical El Niño Deficit</div>
                  <div className="text-lg font-bold text-stone-900 dark:text-white font-mono mt-0.5">
                    -{selectedState.avgDeficit}% rainfall
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Historical average decline</div>
                </div>

                <div className="p-3.5 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Pulse Harvest Risk</div>
                  <div className="text-lg font-bold text-amber-700 dark:text-amber-400 font-display mt-0.5">
                    {selectedState.pulseRisk} Risk
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Dal supply vulnerability</div>
                </div>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400">
                <strong>Primary staple crops:</strong> {selectedState.primaryCrops.join(', ')} · <strong>Safety net buffers:</strong> {selectedState.anganwadiCoveragePct}% Anganwadi coverage, {selectedState.pdsAccessPct}% PDS ration card access.
              </div>
            </div>

            {/* 4. What These Findings May Mean */}
            <div className="space-y-2 p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-900/50">
              <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>4. What These Findings May Mean</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {selectedState.whatItMeans}
              </p>
            </div>

            {/* 5. What We Do Not Know (Honest Data Limitations) */}
            <div className="space-y-2 p-4 bg-stone-100/80 dark:bg-slate-950/50 rounded-xl border border-stone-200/70 dark:border-slate-800">
              <div className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>5. What We Do Not Know (Data Gaps & Boundaries)</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {selectedState.whatWeDoNotKnow} State averages can conceal wide differences between canal-fed and drought-stricken districts. A state with higher baseline malnutrition has not necessarily experienced a greater climate-related impact.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Compare Two States */}
      {activeTab === 'compare' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Select State 1
              </label>
              <select
                value={selectedState.id}
                onChange={e => {
                  const found = INDIAN_STATES.find(s => s.id === e.target.value);
                  if (found) setSelectedState(found);
                }}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white font-medium text-sm"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.zone} Zone)
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:block text-stone-400 font-bold text-sm px-2">VS</div>

            <div className="w-full sm:w-1/2">
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Select State 2
              </label>
              <select
                value={compareState.id}
                onChange={e => {
                  const found = INDIAN_STATES.find(s => s.id === e.target.value);
                  if (found) setCompareState(found);
                }}
                className="w-full px-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white font-medium text-sm"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.zone} Zone)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-stone-50 dark:bg-slate-950/70 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold uppercase tracking-wider">Indicator Comparison</span>
              <span>All baseline health stats from NFHS-5 (2019–2021)</span>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-slate-800 text-sm">
              {/* Row 1: Zone */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="text-stone-500 font-medium">Geographic Zone</div>
                <div className="font-semibold text-stone-900 dark:text-white">{selectedState.zone} India</div>
                <div className="font-semibold text-stone-900 dark:text-white">{compareState.zone} India</div>
              </div>

              {/* Row 2: Child Wasting */}
              <div className="grid grid-cols-3 p-4 items-center bg-stone-50/50 dark:bg-slate-950/20">
                <div>
                  <div className="font-medium text-stone-900 dark:text-white">Acute Wasting %</div>
                  <div className="text-xs text-stone-500">Weight low for height</div>
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white">
                  {selectedState.wastingPct}%
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white">
                  {compareState.wastingPct}%
                </div>
              </div>

              {/* Row 3: Child Stunting */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div>
                  <div className="font-medium text-stone-900 dark:text-white">Chronic Stunting %</div>
                  <div className="text-xs text-stone-500">Height low for age</div>
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white">
                  {selectedState.stuntingPct}%
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white">
                  {compareState.stuntingPct}%
                </div>
              </div>

              {/* Row 4: Rainfed Agriculture */}
              <div className="grid grid-cols-3 p-4 items-center bg-stone-50/50 dark:bg-slate-950/20">
                <div>
                  <div className="font-medium text-stone-900 dark:text-white">Rainfed Farmland %</div>
                  <div className="text-xs text-stone-500">Farms without perennial irrigation</div>
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white">
                  {selectedState.rainfedPct}%
                </div>
                <div className="font-mono text-base font-bold text-stone-900 dark:text-white">
                  {compareState.rainfedPct}%
                </div>
              </div>

              {/* Row 5: Pulse Harvest Risk */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div>
                  <div className="font-medium text-stone-900 dark:text-white">Pulse Harvest Risk</div>
                  <div className="text-xs text-stone-500">Dal crop vulnerability to dry spells</div>
                </div>
                <div className="font-semibold text-amber-700 dark:text-amber-400">
                  {selectedState.pulseRisk}
                </div>
                <div className="font-semibold text-amber-700 dark:text-amber-400">
                  {compareState.pulseRisk}
                </div>
              </div>

              {/* Row 6: Anganwadi Access */}
              <div className="grid grid-cols-3 p-4 items-center bg-stone-50/50 dark:bg-slate-950/20">
                <div>
                  <div className="font-medium text-stone-900 dark:text-white">Anganwadi Reach %</div>
                  <div className="text-xs text-stone-500">Children receiving ICDS services</div>
                </div>
                <div className="font-mono text-base font-bold text-emerald-800 dark:text-emerald-400">
                  {selectedState.anganwadiCoveragePct}%
                </div>
                <div className="font-mono text-base font-bold text-emerald-800 dark:text-emerald-400">
                  {compareState.anganwadiCoveragePct}%
                </div>
              </div>

              {/* Row 7: PDS Ration Access */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div>
                  <div className="font-medium text-stone-900 dark:text-white">PDS Ration Access %</div>
                  <div className="text-xs text-stone-500">Households using subsidized foodgrains</div>
                </div>
                <div className="font-mono text-base font-bold text-teal-800 dark:text-teal-400">
                  {selectedState.pdsAccessPct}%
                </div>
                <div className="font-mono text-base font-bold text-teal-800 dark:text-teal-400">
                  {compareState.pdsAccessPct}%
                </div>
              </div>
            </div>

            {/* Plain English Contrast Summary */}
            <div className="p-6 bg-stone-50 dark:bg-slate-950/60 border-t border-stone-200 dark:border-slate-800 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              <strong>Key comparison insight: </strong>
              {selectedState.rainfedPct > compareState.rainfedPct
                ? `${selectedState.name} relies much more heavily on rainfed agriculture (${selectedState.rainfedPct}% vs ${compareState.rainfedPct}%), making its rural families more susceptible to monsoon dry spells, while ${compareState.name} has stronger irrigation or safety nets.`
                : `${compareState.name} relies more on rainfed farming (${compareState.rainfedPct}% vs ${selectedState.rainfedPct}%), whereas ${selectedState.name} has lower direct agricultural rain exposure.`}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Historical Benchmarks */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
              Historical Drought Crises in Modern India
            </h3>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Review how major past El Niño years impacted rainfall, crop harvests, pulse prices, and documented children&apos;s nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HISTORICAL_BENCHMARKS.map(bench => (
              <div
                key={bench.year}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200/90 dark:border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs text-stone-500 font-semibold">{bench.year} Event</span>
                    <h4 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                      {bench.title}
                    </h4>
                  </div>
                  <div className="text-xs font-semibold font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-200/60 dark:border-amber-900/60">
                    ONI {bench.oniPeak}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-stone-50 dark:bg-slate-950/60 rounded-xl">
                    <div className="text-[11px] text-stone-500">Monsoon Deficit</div>
                    <div className="text-base font-bold font-mono text-stone-900 dark:text-white">
                      {bench.deficitLPA}%
                    </div>
                  </div>
                  <div className="p-2 bg-stone-50 dark:bg-slate-950/60 rounded-xl">
                    <div className="text-[11px] text-stone-500">Kharif Drop</div>
                    <div className="text-base font-bold font-mono text-stone-900 dark:text-white">
                      {bench.kharifDrop}%
                    </div>
                  </div>
                  <div className="p-2 bg-stone-50 dark:bg-slate-950/60 rounded-xl">
                    <div className="text-[11px] text-stone-500">Pulse Inflation</div>
                    <div className="text-base font-bold font-mono text-amber-700 dark:text-amber-400">
                      +{bench.pulseInflation}%
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {bench.summary}
                </p>

                <div className="text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-slate-800">
                  <strong>Affected regions:</strong> {bench.affectedDistricts}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
