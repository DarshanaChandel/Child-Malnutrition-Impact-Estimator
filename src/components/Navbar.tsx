import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowRight, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'regions', label: 'Explore Regions' },
    { id: 'scenarios', label: 'Climate Scenarios' },
    { id: 'guide', label: 'Nutrition Guide' },
    { id: 'how-it-works', label: 'How It Works' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/90 dark:bg-[#0b1319]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-700 flex items-center justify-center text-white shadow-sm shrink-0">
              <span className="font-display font-bold text-base tracking-tight">CM</span>
            </div>
            <div className="whitespace-nowrap shrink-0">
              <span className="font-display font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 tracking-tight block">
                Child Malnutrition
              </span>
              <span className="text-xs text-emerald-800 dark:text-emerald-400 font-medium block -mt-1 tracking-wider uppercase">
                Impact Estimator
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-emerald-800 dark:text-emerald-400 font-semibold'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 dark:bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Theme Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>

            <button
              onClick={() => handleNavClick('assess')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-white shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'assess'
                  ? 'bg-emerald-900 dark:bg-emerald-600 ring-2 ring-emerald-500/40'
                  : 'bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500'
              }`}
            >
              <span>Assess a Child</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 dark:text-stone-300 rounded-lg hover:bg-stone-200/60 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] dark:bg-[#0b1319] border-b border-stone-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === link.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200 dark:border-slate-800">
            <button
              onClick={() => handleNavClick('assess')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-800 dark:bg-emerald-600 text-white font-medium text-sm rounded-xl"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Assess a Child Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
