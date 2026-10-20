import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { RegionalExplorer } from './components/RegionalExplorer';
import { ClimateScenarios } from './components/ClimateScenarios';
import { AssessChild } from './components/AssessChild';
import { NutritionGuide } from './components/NutritionGuide';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { StateData } from './types';
import { INDIAN_STATES } from './data/indiaData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedStateContext, setSelectedStateContext] = useState<StateData>(INDIAN_STATES[0]);

  const handleNavigate = (tab: string, stateContext?: StateData) => {
    if (stateContext) {
      setSelectedStateContext(stateContext);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAssessState = (state: StateData) => {
    setSelectedStateContext(state);
    setActiveTab('assess');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] dark:bg-[#0b1319] text-stone-800 dark:text-stone-100 transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeSection onNavigate={handleNavigate} />
        )}

        {activeTab === 'regions' && (
          <RegionalExplorer
            initialState={selectedStateContext}
            onAssessState={handleAssessState}
          />
        )}

        {activeTab === 'scenarios' && (
          <ClimateScenarios onAssessState={handleAssessState} />
        )}

        {activeTab === 'assess' && (
          <AssessChild
            initialState={selectedStateContext}
            onNavigateToGuide={() => handleNavigate('guide')}
          />
        )}

        {activeTab === 'guide' && (
          <NutritionGuide onAssessChild={() => handleNavigate('assess')} />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorks onAssessChild={() => handleNavigate('assess')} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
