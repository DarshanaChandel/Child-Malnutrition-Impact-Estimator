import { ChildAssessmentInput, ChildAssessmentResult, StateData } from '../types';
import { calculateHAZ, calculateWAZ, calculateWHZ, evaluateMUAC } from './whoGrowthStandards';
import { INDIAN_STATES } from '../data/indiaData';

export function assessChildNutrition(input: ChildAssessmentInput): ChildAssessmentResult {
  const {
    gender,
    ageMonths,
    heightCm,
    weightKg,
    muacCm,
    hasOedema,
    stateId,
    foodGroups,
    hasAnganwadiAccess,
    rationCardType
  } = input;

  const state = INDIAN_STATES.find(s => s.id === stateId) || INDIAN_STATES[0];

  // 1. Calculate WHO Anthropometric Z-Scores
  const haz = calculateHAZ(heightCm, ageMonths, gender);
  const waz = calculateWAZ(weightKg, ageMonths, gender);
  const { whz } = calculateWHZ(heightCm, weightKg, gender);
  const muacStatus = evaluateMUAC(muacCm, ageMonths);

  // Status Classifications
  let stuntingStatus: 'normal' | 'moderate' | 'severe' = 'normal';
  if (haz < -3.0) stuntingStatus = 'severe';
  else if (haz < -2.0) stuntingStatus = 'moderate';

  let wastingStatus: 'normal' | 'moderate' | 'severe' | 'overweight' | 'obese' = 'normal';
  if (whz < -3.0 || hasOedema) wastingStatus = 'severe';
  else if (whz < -2.0) wastingStatus = 'moderate';
  else if (whz > 3.0) wastingStatus = 'obese';
  else if (whz > 2.0) wastingStatus = 'overweight';

  let underweightStatus: 'normal' | 'moderate' | 'severe' = 'normal';
  if (waz < -3.0) underweightStatus = 'severe';
  else if (waz < -2.0) underweightStatus = 'moderate';

  const isOvernutrition = wastingStatus === 'overweight' || wastingStatus === 'obese';

  // 2. Component 1: Individual Anthropometric Deficit (C1, max 45)
  let c1 = 0;
  if (hasOedema) {
    c1 = 45;
  } else if (whz < -3.0) {
    c1 = 40;
  } else if (whz < -2.0) {
    c1 = 25;
  } else if (whz < -1.0) {
    c1 = 12;
  } else if (isOvernutrition) {
    c1 = 10;
  }

  // Add stunting contribution
  if (haz < -3.0) c1 += 15;
  else if (haz < -2.0) c1 += 10;
  else if (haz < -1.0) c1 += 5;

  // Add MUAC confirmation
  if (muacStatus === 'sam') c1 += 15;
  else if (muacStatus === 'mam') c1 += 8;

  c1 = Math.min(45, c1);

  // 3. Component 2: Household Food Security & Dietary Buffer (C2, max 25)
  let c2 = 0;
  const foodCount = foodGroups.length;
  if (foodCount < 3) c2 += 15;
  else if (foodCount < 5) c2 += 10;
  else if (foodCount < 7) c2 += 4;
  else c2 += 0;

  if (!hasAnganwadiAccess) c2 += 5;

  if (rationCardType === 'none') c2 += 5;
  else if (rationCardType === 'apl') c2 += 3;
  else if (rationCardType === 'bpl' || rationCardType === 'antyodaya') c2 += 1;

  c2 = Math.min(25, c2);

  // 4. Component 3: Regional Climate Exposure (C3, max 30)
  let c3 = 0;
  c3 += (state.sensitivity / 5.0) * 12.5;
  c3 += (state.rainfedPct / 100) * 10;

  if (state.pulseRisk === 'Severe') c3 += 7.5;
  else if (state.pulseRisk === 'High') c3 += 5.0;
  else if (state.pulseRisk === 'Moderate') c3 += 2.5;
  else c3 += 1.0;

  c3 = Math.min(30, c3);

  // 5. Total Compound Vulnerability Score
  let compositeScore = 0;
  if (isOvernutrition) {
    // For overweight child, climate drought does not increase acute wasting in the same way
    compositeScore = Math.min(45, Math.round(c1 + c2 * 0.5));
  } else {
    compositeScore = Math.min(100, Math.round(c1 + c2 + c3));
  }

  // Tier Classification
  let vulnerabilityTier: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Critical' = 'Low';
  if (compositeScore >= 75 || hasOedema || (whz < -3.0 && muacStatus === 'sam')) {
    vulnerabilityTier = 'Critical';
  } else if (compositeScore >= 60) {
    vulnerabilityTier = 'Severe';
  } else if (compositeScore >= 45) {
    vulnerabilityTier = 'High';
  } else if (compositeScore >= 30) {
    vulnerabilityTier = 'Moderate';
  } else {
    vulnerabilityTier = 'Low';
  }

  // Climate Multiplier calculation
  let climateMultiplier = 1.0;
  if (!isOvernutrition) {
    const rainfedFactor = (state.rainfedPct / 100) * 0.4;
    const sensitivityFactor = (state.sensitivity / 5.0) * 0.6;
    const deficitFactor = 0.2 + 0.4 * (state.avgDeficit / 28);
    climateMultiplier = Number((1.0 + (rainfedFactor + sensitivityFactor) * deficitFactor).toFixed(2));
  }

  // Plain English Summary
  let plainSummary = '';
  const childDisplayName = input.childName && input.childName.trim().length > 0 ? input.childName : 'Your child';

  if (hasOedema) {
    plainSummary = `${childDisplayName} has swelling in both feet (bilateral oedema). This is a known medical warning sign requiring immediate doctor assessment, irrespective of body weight.`;
  } else if (wastingStatus === 'severe' || muacStatus === 'sam') {
    plainSummary = `${childDisplayName}'s weight is very low for their height, and upper arm measurements indicate severe thinness. Immediate care at a nearby Nutrition Rehabilitation Centre (NRC) or hospital is recommended.`;
  } else if (wastingStatus === 'moderate' || muacStatus === 'mam') {
    plainSummary = `${childDisplayName} is showing moderate signs of thinness (weight is lower than expected for height). With regular protein-rich family foods and Anganwadi supplementary nutrition, healthy weight can be rebuilt quickly.`;
  } else if (stuntingStatus === 'severe' || stuntingStatus === 'moderate') {
    plainSummary = `${childDisplayName}'s height is lower than standard for their age, suggesting past or gradual nutritional gaps. Their weight-for-height is currently stable, but consistent dietary diversity is vital to support physical and mental growth.`;
  } else if (isOvernutrition) {
    plainSummary = `${childDisplayName}'s weight is higher than standard for their height. Focus on wholesome, home-cooked whole grains, lentils, and fresh fruits while cutting packaged snacks, biscuits, and sugary drinks.`;
  } else {
    plainSummary = `${childDisplayName}'s measurements align well with healthy growth standards for their age and height. Continuing a diverse daily diet with pulses, dairy, vegetables, and clean water will keep them thriving.`;
  }

  // Action Guidance Generation
  const clinicalAdvice: string[] = [];
  const safetyNetActions: string[] = [];
  const kitchenNutritionActions: string[] = [];
  const waterHealthActions: string[] = [];

  const needsUrgentCare = hasOedema || wastingStatus === 'severe' || muacStatus === 'sam';

  if (needsUrgentCare) {
    clinicalAdvice.push('Visit your nearest Primary Health Centre (PHC) or Nutrition Rehabilitation Centre (NRC) promptly for a professional clinical checkup.');
    clinicalAdvice.push('Ask the health worker to check for common hidden infections, perform an appetite test, and screen for severe anaemia.');
    clinicalAdvice.push('Never forcefully feed a child who is lethargic or vomiting; seek emergency medical supervision immediately.');
  } else if (wastingStatus === 'moderate' || muacStatus === 'mam') {
    clinicalAdvice.push('Consult the local ASHA or Anganwadi worker to monitor weight every 15 days.');
    clinicalAdvice.push('Ensure age-appropriate deworming tablets (albendazole) and iron-folic acid (IFA) syrup have been administered as scheduled.');
    clinicalAdvice.push('Check that all routine immunizations are up to date.');
  } else {
    clinicalAdvice.push('Continue routine monthly growth monitoring at your local Anganwadi centre.');
    clinicalAdvice.push('Maintain biannual Vitamin A supplementation and age-appropriate deworming doses.');
  }

  // Safety net
  if (!hasAnganwadiAccess) {
    safetyNetActions.push('Register with the nearest Anganwadi centre under the ICDS / Poshan 2.0 program to receive free supplementary nutrition.');
  } else {
    safetyNetActions.push('Collect your monthly Take-Home Ration (THR / Bal Aahar) from the Anganwadi centre regularly.');
  }
  if (rationCardType === 'none' || rationCardType === 'apl') {
    safetyNetActions.push('Apply for eligible NFSA ration card categories (Priority Household or Antyodaya) at your local panchayat or food supply office to secure monthly subsidized grains.');
  } else {
    safetyNetActions.push('Ensure your full monthly subsidized foodgrain quota (rice/wheat) is collected from your designated Fair Price Shop (FPS).');
  }

  // Kitchen nutrition
  if (foodCount < 5) {
    kitchenNutritionActions.push('Increase meal diversity: aim to include at least 5 different food groups each day (such as pulses, dairy, green vegetables, and eggs/nuts).');
  }
  if (wastingStatus === 'moderate' || wastingStatus === 'severe' || underweightStatus === 'moderate' || underweightStatus === 'severe') {
    kitchenNutritionActions.push('Boost calorie and protein density: add half a spoon of ghee or edible oil, plus roasted groundnut or sattu powder, directly into warm khichdi or porridge.');
    kitchenNutritionActions.push('Feed smaller meals more frequently: 4 to 5 nourishing meals or snacks throughout the day instead of 2 large meals.');
    kitchenNutritionActions.push('Incorporate locally available sprouted moong, mashed eggs, or curd (dahi) daily.');
  } else if (isOvernutrition) {
    kitchenNutritionActions.push('Replace ultra-processed packaged snacks (chips, biscuits, namkeen, sweet beverages) with whole fruits, roasted chana, and fresh buttermilk.');
    kitchenNutritionActions.push('Encourage active physical play and regular family meals without mobile or TV screen distractions.');
  } else {
    kitchenNutritionActions.push('Continue offering a colorful variety of local seasonal vegetables, pulses, curd, and fruits to keep immunity strong.');
  }

  // Water and health
  waterHealthActions.push('Boil drinking water or use a reliable filter, especially during drought or water scarcity months when contamination risks rise.');
  waterHealthActions.push('Always wash hands with soap before feeding, before cooking, and after using the toilet.');
  waterHealthActions.push('Keep Oral Rehydration Salts (ORS) and zinc syrup at home for prompt treatment if loose stools occur.');

  return {
    haz,
    whz,
    waz,
    muacStatus,
    stuntingStatus,
    wastingStatus,
    underweightStatus,
    hasEmergencyOedema: hasOedema,
    compositeVulnerabilityScore: compositeScore,
    vulnerabilityTier,
    climateMultiplier,
    plainSummary,
    clinicalAdvice,
    safetyNetActions,
    kitchenNutritionActions,
    waterHealthActions,
    needsUrgentCare
  };
}
