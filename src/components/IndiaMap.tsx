import React from 'react';
import { StateData } from '../types';

interface IndiaMapProps {
  states: StateData[];
  selectedState: StateData;
  onSelectState: (state: StateData) => void;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({ states, selectedState, onSelectState }) => {
  // Simplified stylized India projection polygon
  return (
    <div className="relative w-full aspect-[4/4.5] max-w-md mx-auto flex items-center justify-center p-2">
      <svg
        viewBox="0 0 100 110"
        className="w-full h-full drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background glow */}
        <ellipse cx="50" cy="55" rx="42" ry="46" fill="url(#mapGlow)" />

        {/* Stylized recognizable geographic silhouette of India */}
        <path
          d="M 36 6 
             C 42 5, 48 6, 52 11 
             C 54 14, 52 20, 58 22 
             C 62 23, 72 20, 77 22
             C 83 25, 87 30, 89 36
             C 86 40, 80 40, 76 43
             C 73 46, 75 51, 72 58
             C 69 64, 62 70, 56 78
             C 52 84, 48 92, 45 98
             C 44 100, 41 98, 40 94
             C 38 88, 36 80, 34 74
             C 32 68, 29 64, 30 58
             C 27 54, 21 54, 18 50
             C 16 46, 17 40, 22 36
             C 24 33, 26 28, 28 22
             C 29 16, 32 8, 36 6 Z"
          className="fill-stone-200/80 dark:fill-slate-800/80 stroke-stone-300 dark:stroke-slate-700 transition-colors"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Subtle grid guidelines */}
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeDasharray="1 3" strokeWidth="0.4" className="text-stone-300 dark:text-slate-700" />
        <line x1="50" y1="20" x2="50" y2="90" stroke="currentColor" strokeDasharray="1 3" strokeWidth="0.4" className="text-stone-300 dark:text-slate-700" />

        {/* State Interactive Markers */}
        {states.map(state => {
          const isSelected = selectedState.id === state.id;
          const isSevere = state.pulseRisk === 'Severe';
          const isHigh = state.pulseRisk === 'High';

          return (
            <g
              key={state.id}
              onClick={() => onSelectState(state)}
              className="cursor-pointer group"
              transform={`translate(${state.coordinates.x}, ${state.coordinates.y})`}
            >
              {/* Outer pulse circle for selected state */}
              {isSelected && (
                <circle
                  r="7.5"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="1.5"
                  className="animate-ping opacity-60"
                />
              )}

              {/* Halo circle */}
              <circle
                r={isSelected ? '5.5' : '4.0'}
                className={`transition-all duration-200 ${
                  isSelected
                    ? 'fill-emerald-800 dark:fill-emerald-400 stroke-white dark:stroke-slate-900'
                    : isSevere
                    ? 'fill-amber-600 dark:fill-amber-500 stroke-white dark:stroke-slate-900 group-hover:fill-emerald-700'
                    : isHigh
                    ? 'fill-teal-700 dark:fill-teal-500 stroke-white dark:stroke-slate-900 group-hover:fill-emerald-700'
                    : 'fill-stone-500 dark:fill-stone-400 stroke-white dark:stroke-slate-900 group-hover:fill-emerald-700'
                }`}
                strokeWidth="1"
              />

              {/* State abbreviation/dot */}
              <text
                y="8.5"
                textAnchor="middle"
                className={`text-[3.2px] font-semibold transition-colors pointer-events-none ${
                  isSelected
                    ? 'fill-emerald-900 dark:fill-emerald-300 font-bold text-[3.8px]'
                    : 'fill-stone-700 dark:fill-stone-300'
                }`}
              >
                {state.name.slice(0, 3).toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend below the map */}
      <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-stone-200/60 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
          <span>Severe Pulse Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-700 inline-block" />
          <span>High Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-500 inline-block" />
          <span>Moderate / Low</span>
        </div>
      </div>
    </div>
  );
};
