import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Database,
  Calculator,
  Compass,
  CloudRain,
  ShieldAlert,
  HelpCircle,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface HowItWorksProps {
  onAssessChild: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onAssessChild }) => {
  // Keep track of which accordion sections are open
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    sources: true,
    growth: true,
    regional: false,
    scenarios: false,
    cviFormula: true,
    limitations: true
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-400 mb-1">
          Transparency & Methodology
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
          How It Works
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
          Where does this information come from, and how does the website calculate its results? We explain the science in plain language first, with complete mathematical models and sources open for inspection.
        </p>
      </div>

      <div className="space-y-4">
        {/* 1. Where the data comes from */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('sources')}
            className="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                  1. Where the Data Comes From
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Five peer-reviewed, official public datasets anchor every number.
                </p>
              </div>
            </div>
            {openSections.sources ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
          </button>

          {openSections.sources && (
            <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-4">
              <p className="leading-relaxed">
                <strong>Plain English summary: </strong>
                We do not invent data. All baseline child growth, malnutrition rates, and climate sensitivity metrics come directly from verified government surveys, international pediatric standards, and historical meteorological databases:
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <strong className="text-stone-900 dark:text-white">WHO Child Growth Standards (2006): </strong>
                  The global gold standard for child growth derived from the Multicentre Growth Reference Study (MGRS). Used to calculate Height-for-Age (HAZ), Weight-for-Height (WHZ), and Weight-for-Age (WAZ).
                </div>

                <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <strong className="text-stone-900 dark:text-white">National Family Health Survey (NFHS-5, 2019–2021): </strong>
                  India&apos;s Ministry of Health and Family Welfare (MoHFW) comprehensive survey covering 707 districts, supplying state baselines for stunting, wasting, severe wasting, anaemia, and Anganwadi reach.
                </div>

                <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <strong className="text-stone-900 dark:text-white">India Meteorological Department (IMD) Monsoon Archives: </strong>
                  Historical rainfall deficit records across agro-climatic zones, documenting Southwest Monsoon performance and Long Period Average (LPA) benchmarks.
                </div>

                <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <strong className="text-stone-900 dark:text-white">NOAA Climate Prediction Center (CPC) Oceanic Niño Index (ONI): </strong>
                  Tracks 3-month running mean sea surface temperature anomalies in the equatorial Pacific Niño 3.4 region, defining Neutral, Weak, Moderate, Strong, and Super El Niño tiers.
                </div>

                <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200/60 dark:border-slate-800">
                  <strong className="text-stone-900 dark:text-white">ICMR–National Institute of Nutrition (NIN, 2020): </strong>
                  Nutrient Requirements and Recommended Dietary Allowances (RDA) for Indians, informing our 8-food-group diversity criteria and practical kitchen feeding tips.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. How Child Growth is Assessed */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('growth')}
            className="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                  2. How Child Growth is Assessed
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Standard deviations (Z-scores) comparing children of the same age and sex.
                </p>
              </div>
            </div>
            {openSections.growth ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
          </button>

          {openSections.growth && (
            <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-4">
              <p className="leading-relaxed">
                <strong>Plain English summary: </strong>
                Instead of using arbitrary cutoffs, international pediatricians compare a child&apos;s height and weight against thousands of healthy children raised under optimal feeding and healthcare conditions. A Z-score (standard deviation) tells us how far a child is from the healthy average:
              </p>

              <div className="p-4 bg-stone-50 dark:bg-slate-950/70 rounded-xl font-mono text-xs space-y-1 text-stone-800 dark:text-stone-200">
                <div>Z-Score = (Observed Child Value - WHO Median) / WHO Standard Deviation</div>
                <div className="text-stone-400 dark:text-stone-500">Boys Weight-for-Height: Expected = 0.000155 * Height^2.45, SD = 0.088 * Expected</div>
                <div className="text-stone-400 dark:text-stone-500">Girls Weight-for-Height: Expected = 0.000162 * Height^2.43, SD = 0.091 * Expected</div>
              </div>

              <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                <li>· <strong>HAZ &lt; -2 SD:</strong> Moderate Stunting (chronic cumulative height deficit).</li>
                <li>· <strong>WHZ &lt; -2 SD:</strong> Moderate Acute Malnutrition (MAM - acute thinness).</li>
                <li>· <strong>WHZ &lt; -3 SD or Bilateral Oedema:</strong> Severe Acute Malnutrition (SAM - urgent care needed).</li>
                <li>· <strong>MUAC &lt; 11.5 cm:</strong> Severe Acute Malnutrition (SAM red band).</li>
              </ul>
            </div>
          )}
        </div>

        {/* 3. How Regional Information is Analysed */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('regional')}
            className="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                  3. How Regional Information is Analysed
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Why different states respond differently to the exact same drought.
                </p>
              </div>
            </div>
            {openSections.regional ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
          </button>

          {openSections.regional && (
            <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-3">
              <p className="leading-relaxed">
                A rainfall deficit does not impact all states equally. The model analyses three key regional factors:
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <strong>1. Rainfed Agriculture Share (%):</strong> In states like Maharashtra (82% rainfed) or Jharkhand (89% rainfed), farmers have no canal backup. When rains pause, crops fail quickly. In contrast, Punjab has 98% canal and tubewell irrigation.
                </li>
                <li>
                  <strong>2. Pulse Crop Exposure:</strong> Pulses (tur, moong, chana) are high-protein staples cultivated primarily on rainfed drylands. Dry spells during the critical July–August flowering window cause flower drop and harvest losses.
                </li>
                <li>
                  <strong>3. Safety Net Infrastructure:</strong> States with extensive Anganwadi coverage (e.g. Tamil Nadu at 88%, Karnataka at 84%) provide regular Take-Home Rations, helping shield children from sudden market price spikes.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* 4. How Climate Scenarios Work */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('scenarios')}
            className="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 flex items-center justify-center shrink-0">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                  4. How Climate Scenarios Work
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Translating Pacific sea temperature changes into food access impacts.
                </p>
              </div>
            </div>
            {openSections.scenarios ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
          </button>

          {openSections.scenarios && (
            <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-3">
              <p className="leading-relaxed">
                The scenario simulator models five specific Pacific anomalies (+0.0°C, +0.6°C, +1.2°C, +1.8°C, +2.4°C). When sea surface temperatures rise, atmospheric circulation (Walker Circulation) weakens, reducing moisture transport over the Indian subcontinent:
              </p>
              <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl space-y-1.5 text-xs">
                <div>· <strong>Monsoon Deficit:</strong> Scales from 0% (Neutral) up to -28% (Super El Niño).</div>
                <div>· <strong>Kharif Harvest Drop:</strong> Rainfed pulse output drops between 0% and -26%.</div>
                <div>· <strong>Wholesale Pulse Inflation:</strong> Market supply contraction drives dal prices up by +8% to +44%.</div>
                <div>· <strong>Dietary Dilution:</strong> Bottom-income families reduce expensive lentils and milk, shifting to plain starch.</div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Compound Vulnerability Index (CVI) Formula */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('cviFormula')}
            className="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                  5. How Results are Calculated (CVI Formula)
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  The Compound Vulnerability Index: CVI = C1 + C2 + C3 (Scale 0 to 100).
                </p>
              </div>
            </div>
            {openSections.cviFormula ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
          </button>

          {openSections.cviFormula && (
            <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-4">
              <p className="leading-relaxed">
                Rather than looking at climate or growth in isolation, the application integrates all three levels of evidence into a unified score from 0 to 100:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200 dark:border-slate-800">
                  <div className="font-bold text-stone-900 dark:text-white">C1: Child Anthropometrics</div>
                  <div className="text-stone-500 mt-1">Maximum 45 points</div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                    Evaluates acute wasting (WHZ), chronic stunting (HAZ), upper-arm thinness (MUAC), and emergency bilateral oedema.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200 dark:border-slate-800">
                  <div className="font-bold text-stone-900 dark:text-white">C2: Household Dietary Buffer</div>
                  <div className="text-stone-500 mt-1">Maximum 25 points</div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                    Evaluates dietary diversity (8 WHO food groups), local Anganwadi centre registration, and PDS subsidized ration card access.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-slate-950/60 rounded-xl border border-stone-200 dark:border-slate-800">
                  <div className="font-bold text-stone-900 dark:text-white">C3: Regional Climate Exposure</div>
                  <div className="text-stone-500 mt-1">Maximum 30 points</div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                    Evaluates state rainfed agriculture %, rainfall sensitivity score, and local pulse harvest risk during drought events.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs text-emerald-900 dark:text-emerald-300">
                <strong>Risk Tiers: </strong>
                Low (&lt; 30) · Moderate (30–44) · High (45–59) · Severe (60–74) · Critical (≥ 75 or Bilateral Oedema or SAM).
              </div>
            </div>
          )}
        </div>

        {/* 6. What the website cannot tell us */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('limitations')}
            className="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                  6. What the Website Cannot Tell Us (Honest Limitations)
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Clear scientific boundaries and what the data cannot prove.
                </p>
              </div>
            </div>
            {openSections.limitations ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
          </button>

          {openSections.limitations && (
            <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-3">
              <p className="leading-relaxed">
                Responsible science requires transparency about what we do not know:
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  · <strong>Not a Medical Diagnosis:</strong> This is a public health screening tool. It does not replace a clinical examination, laboratory blood work, or physician oversight.
                </li>
                <li>
                  · <strong>Survey Baselines vs. Live Data:</strong> NFHS-5 was surveyed between 2019 and 2021. It represents cross-sectional baseline evidence, not live daily feeds.
                </li>
                <li>
                  · <strong>Correlation is Not Causation:</strong> An El Niño drought creates agricultural stress that increases nutritional vulnerability; it is not the sole cause of malnutrition in any individual child.
                </li>
                <li>
                  · <strong>District-Level Nuances:</strong> Large states have diverse geography. Statewide averages cannot capture micro-climates, local groundwater recharge, or localized food relief drives without district-level data.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-8 bg-stone-100 dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white">
            Ready to assess a child or explore regional data?
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Put the scientific framework to work with our step-by-step screening tool.
          </p>
        </div>
        <button
          onClick={onAssessChild}
          className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
        >
          <span>Assess a Child Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
