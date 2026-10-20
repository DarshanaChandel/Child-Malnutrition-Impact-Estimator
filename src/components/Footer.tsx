import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-stone-200 dark:border-slate-800 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-700 flex items-center justify-center text-white shadow-xs">
                <span className="font-display font-bold text-sm">CM</span>
              </div>
              <span className="font-display font-bold text-lg text-stone-900 dark:text-white">
                Child Malnutrition Impact Estimator
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
              Bridging climate science, agricultural economics, and pediatric anthropometrics to explain and estimate nutritional vulnerability across India in plain English.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Independent Evidence-Based Public Health Tool</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-semibold text-stone-900 dark:text-white uppercase tracking-wider mb-2">
              Platform Navigation
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('regions')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Explore Regions (16 Indian States)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scenarios')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Climate Scenarios (ENSO Anomaly Model)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assess')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Assess a Child (WHO Growth Standards)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Nutrition Guide (Poshan & ICMR-NIN)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  How It Works (Formulas & Data Sources)
                </button>
              </li>
            </ul>
          </div>

          {/* Data Sources & Theme */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-stone-900 dark:text-white uppercase tracking-wider">
              Primary Data Citations
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 space-y-1 leading-relaxed">
              <div>· WHO 2006 Child Growth Standards</div>
              <div>· MoHFW National Family Health Survey (NFHS-5)</div>
              <div>· India Meteorological Department (IMD)</div>
              <div>· NOAA CPC Oceanic Niño Index (ONI)</div>
              <div>· ICMR-National Institute of Nutrition (NIN)</div>
            </div>

            <div className="pt-2">
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-900 cursor-pointer transition-colors"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span>Switch to Dark View</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Switch to Light View</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Disclaimer & Copyright */}
        <div className="pt-8 mt-8 border-t border-stone-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p className="text-center sm:text-left">
            Public health research and screening simulator. Not intended for individual clinical medical diagnosis.
          </p>
          <div className="flex items-center gap-1">
            <span>Built for public understanding of climate & child nutrition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
