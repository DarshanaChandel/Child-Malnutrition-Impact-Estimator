import React, { useState } from 'react';
import { INDIAN_STATES, CLIMATE_SCENARIOS } from '../data/indiaData';
import { IndiaMap } from './IndiaMap';
import {
  MapPin,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CloudSun,
  Activity,
  HeartHandshake,
  BookOpen,
  Wheat,
  Coins,
  Baby,
  Droplets
} from 'lucide-react';
import { StateData } from '../types';

interface HomeSectionProps {
  onNavigate: (tab: string, stateContext?: StateData) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const [selectedState, setSelectedState] = useState<StateData>(INDIAN_STATES[0]); // Maharashtra default

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Introduction */}
      <section className="relative pt-10 sm:pt-16 pb-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Scientifically Grounded Climate & Pediatric Nutrition Engine</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-[1.15] text-balance">
            When the Climate Changes, Children&apos;s Nutrition Matters.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Explore how changing climate conditions may affect food availability and children&apos;s nutrition across India. Discover regional insights, explore possible scenarios, and understand the information behind the results.
          </p>

          {/* Prominent Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('regions')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Explore India</span>
            </button>

            <button
              onClick={() => onNavigate('assess')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-700 hover:bg-teal-600 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Assess a Child</span>
            </button>
          </div>

          {/* Smaller Link: Understand How It Works */}
          <div className="mt-5">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer group"
            >
              <span>Understand How It Works</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. SECTION A: Explore India Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-400 mb-1">
              Section A · Regional Snapshot
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Explore India
            </h2>
            <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base">
              Select a state on the map or quick list to see what the documented survey data shows about farming, rainfall, and children&apos;s nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Map Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <IndiaMap
                states={INDIAN_STATES}
                selectedState={selectedState}
                onSelectState={setSelectedState}
              />
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">
                Click any marker on the map to switch states
              </p>
            </div>

            {/* Selected State Profile Preview */}
            <div className="lg:col-span-7 bg-[#FAF9F5] dark:bg-slate-950/60 rounded-2xl p-6 border border-stone-200/80 dark:border-slate-800/80">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200 dark:border-slate-800">
                <div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    {selectedState.zone} Zone · {selectedState.reportingPeriod}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
                    {selectedState.name}
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('regions', selectedState)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  <span>Open full state analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Finding */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Main Finding
                </div>
                <p className="text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-medium">
                  {selectedState.mainFinding}
                </p>
              </div>

              {/* Core Indicators Grid */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Child Wasting</div>
                  <div className="text-xl font-bold text-stone-900 dark:text-white font-mono mt-0.5">
                    {selectedState.wastingPct}%
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Weight low for height</div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Rainfed Land</div>
                  <div className="text-xl font-bold text-stone-900 dark:text-white font-mono mt-0.5">
                    {selectedState.rainfedPct}%
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Depends on rainfall</div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-stone-200/60 dark:border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-xs text-stone-500 dark:text-stone-400">Pulse Crop Risk</div>
                  <div className="text-lg font-bold text-amber-700 dark:text-amber-400 font-display mt-0.5">
                    {selectedState.pulseRisk}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">Harvest sensitivity</div>
                </div>
              </div>

              {/* Meaning in Plain Words */}
              <div className="mt-4 p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-900/50 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                <span className="font-semibold text-emerald-900 dark:text-emerald-300">What this means: </span>
                {selectedState.whatItMeans}
              </div>

              {/* Fast Assess Handoff */}
              <div className="mt-5 flex items-center justify-between pt-3 border-t border-stone-200 dark:border-slate-800">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Primary crops: {selectedState.primaryCrops.join(', ')}
                </span>
                <button
                  onClick={() => onNavigate('assess', selectedState)}
                  className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Assess a child in {selectedState.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION B: How Climate Can Affect Nutrition (4-Step Visual Story) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-400 mb-1">
            Section B · The Causal Chain
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            How Climate Can Affect Nutrition
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base">
            The relationship connects ocean temperatures in the Pacific to child growth in an Indian village. Here is how the pathway unfolds:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200/90 dark:border-slate-800 flex flex-col justify-between relative group hover:border-emerald-600/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 flex items-center justify-center font-bold text-sm mb-4">
                <CloudSun className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Step 1
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white mt-1">
                Changing Weather
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Warmer Pacific sea temperatures (El Niño) shift wind patterns, frequently causing late monsoon onsets and dry intervals across central and western India.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs text-sky-700 dark:text-sky-400 font-medium">
              Monsoon deficits of -10% to -28%
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200/90 dark:border-slate-800 flex flex-col justify-between relative group hover:border-emerald-600/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-sm mb-4">
                <Wheat className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Step 2
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white mt-1">
                Farming & Harvests
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Over 65% of pulses (tur, moong) and coarse grains rely entirely on rain. When rains fail in July–August, flowering drops and crop yields decline.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs text-amber-700 dark:text-amber-400 font-medium">
              Kharif pulse yields fall 10% to 25%
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200/90 dark:border-slate-800 flex flex-col justify-between relative group hover:border-emerald-600/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-sm mb-4">
                <Coins className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Step 3
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white mt-1">
                Household Food Access
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Farm employment drops while mandi dal prices rise. Facing tighter budgets, low-income families cut protein foods (pulses, milk, eggs) and eat mostly starch.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              Lentil prices jump +15% to +40%
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-stone-200/90 dark:border-slate-800 flex flex-col justify-between relative group hover:border-emerald-600/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 flex items-center justify-center font-bold text-sm mb-4">
                <Baby className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Step 4
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900 dark:text-white mt-1">
                Effects on Children
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Young children have small bellies and need nutrient-dense food. When protein and micronutrients are diluted, children can rapidly lose weight (acute wasting).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 text-xs text-rose-700 dark:text-rose-400 font-medium">
              Vulnerability to acute wasting rises
            </div>
          </div>
        </div>

        {/* Important Scientific Qualification */}
        <div className="mt-8 p-5 bg-stone-100 dark:bg-slate-900/60 rounded-2xl border border-stone-200/80 dark:border-slate-800 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            <strong className="text-stone-900 dark:text-white">A crucial distinction: </strong>
            This is a <em>possible risk pathway</em>, not an inevitable outcome. A child&apos;s nutritional status also depends heavily on clean drinking water, sanitation, Anganwadi supplementary feeding, prompt healthcare, and household caregiving practices. Strong safety nets can break this chain!
          </div>
        </div>
      </section>

      {/* 4. SECTION C: Understand Your Options */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-400 mb-1">
            Section C · How You Can Use This Tool
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            Understand Your Options
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base">
            Choose what you would like to explore today:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Option 1 */}
          <div
            onClick={() => onNavigate('regions')}
            className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-stone-200/90 dark:border-slate-800 hover:border-emerald-600/60 shadow-sm hover:shadow transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white">
                Explore Regional Data
              </h3>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Discover what the NFHS-5 survey and agricultural data show for 16 Indian states. Compare two states side-by-side and review historical drought responses.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-emerald-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Browse Indian States</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Option 2 */}
          <div
            onClick={() => onNavigate('scenarios')}
            className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-stone-200/90 dark:border-slate-800 hover:border-teal-600/60 shadow-sm hover:shadow transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <CloudSun className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white">
                Explore Climate Scenarios
              </h3>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                See how different Pacific sea temperature anomalies (+0.6°C to +2.4°C) shift estimated rainfall deficits, pulse inflation, and acute wasting vulnerability.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
              <span>Test Climate Scenarios</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Option 3 */}
          <div
            onClick={() => onNavigate('assess')}
            className="bg-white dark:bg-slate-900 p-7 rounded-2xl border border-stone-200/90 dark:border-slate-800 hover:border-amber-600/60 shadow-sm hover:shadow transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white">
                Assess a Child
              </h3>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Enter age, height, weight, and arm circumference to calculate real WHO growth percentiles, evaluate household dietary safety nets, and receive a tailored care plan.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Start Growth Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION D: Practical Nutrition Guidance Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Section D · Poshan & ICMR-NIN Playbook</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
              Practical Nutrition Guidance for Every Child
            </h2>
            <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Child nutrition is not just about numbers—it is about what goes into the family bowl every single day. Explore simple, affordable food additions like roasted sattu, groundnut powder, sprouted moong, and local greens that rebuild healthy growth even during tight economic times.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('guide')}
                className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-900 font-semibold text-sm rounded-xl transition-all shadow cursor-pointer inline-flex items-center gap-2"
              >
                <span>Read the Nutrition Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stylized background accent */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
        </div>
      </section>
    </div>
  );
};
