// WHO 2006 Child Growth Standards Models

interface AgeKnot {
  age: number; // months
  median: number;
  sd: number;
}

// WHO Length/Height-for-Age knots (0 - 60 months)
const WHO_BOYS_HAZ_KNOTS: AgeKnot[] = [
  { age: 0, median: 49.9, sd: 1.89 },
  { age: 3, median: 61.4, sd: 2.12 },
  { age: 6, median: 67.6, sd: 2.32 },
  { age: 9, median: 72.0, sd: 2.48 },
  { age: 12, median: 75.7, sd: 2.61 },
  { age: 18, median: 82.3, sd: 2.87 },
  { age: 24, median: 87.8, sd: 3.23 },
  { age: 30, median: 92.4, sd: 3.52 },
  { age: 36, median: 96.1, sd: 3.80 },
  { age: 42, median: 99.9, sd: 4.05 },
  { age: 48, median: 103.3, sd: 4.29 },
  { age: 54, median: 106.7, sd: 4.54 },
  { age: 60, median: 110.0, sd: 4.77 }
];

const WHO_GIRLS_HAZ_KNOTS: AgeKnot[] = [
  { age: 0, median: 49.1, sd: 1.86 },
  { age: 3, median: 59.8, sd: 2.06 },
  { age: 6, median: 65.7, sd: 2.27 },
  { age: 9, median: 70.1, sd: 2.44 },
  { age: 12, median: 74.0, sd: 2.58 },
  { age: 18, median: 80.7, sd: 2.85 },
  { age: 24, median: 86.4, sd: 3.23 },
  { age: 30, median: 91.2, sd: 3.53 },
  { age: 36, median: 95.1, sd: 3.82 },
  { age: 42, median: 99.0, sd: 4.10 },
  { age: 48, median: 102.7, sd: 4.38 },
  { age: 54, median: 106.2, sd: 4.64 },
  { age: 60, median: 109.4, sd: 4.88 }
];

// WHO Weight-for-Age knots (0 - 60 months)
const WHO_BOYS_WAZ_KNOTS: AgeKnot[] = [
  { age: 0, median: 3.3, sd: 0.47 },
  { age: 3, median: 6.4, sd: 0.72 },
  { age: 6, median: 7.9, sd: 0.86 },
  { age: 9, median: 8.9, sd: 0.96 },
  { age: 12, median: 9.6, sd: 1.05 },
  { age: 18, median: 10.9, sd: 1.19 },
  { age: 24, median: 12.2, sd: 1.34 },
  { age: 30, median: 13.3, sd: 1.48 },
  { age: 36, median: 14.3, sd: 1.63 },
  { age: 42, median: 15.3, sd: 1.78 },
  { age: 48, median: 16.3, sd: 1.95 },
  { age: 54, median: 17.3, sd: 2.12 },
  { age: 60, median: 18.3, sd: 2.30 }
];

const WHO_GIRLS_WAZ_KNOTS: AgeKnot[] = [
  { age: 0, median: 3.2, sd: 0.45 },
  { age: 3, median: 5.8, sd: 0.69 },
  { age: 6, median: 7.3, sd: 0.83 },
  { age: 9, median: 8.2, sd: 0.94 },
  { age: 12, median: 8.9, sd: 1.03 },
  { age: 18, median: 10.2, sd: 1.18 },
  { age: 24, median: 11.5, sd: 1.35 },
  { age: 30, median: 12.7, sd: 1.51 },
  { age: 36, median: 13.9, sd: 1.69 },
  { age: 42, median: 15.0, sd: 1.88 },
  { age: 48, median: 16.1, sd: 2.08 },
  { age: 54, median: 17.2, sd: 2.28 },
  { age: 60, median: 18.2, sd: 2.49 }
];

function interpolateKnots(knots: AgeKnot[], ageMonths: number): { median: number; sd: number } {
  const clampedAge = Math.max(0, Math.min(60, ageMonths));
  if (clampedAge <= knots[0].age) return { median: knots[0].median, sd: knots[0].sd };
  if (clampedAge >= knots[knots.length - 1].age) {
    const last = knots[knots.length - 1];
    return { median: last.median, sd: last.sd };
  }

  for (let i = 0; i < knots.length - 1; i++) {
    const k1 = knots[i];
    const k2 = knots[i + 1];
    if (clampedAge >= k1.age && clampedAge <= k2.age) {
      const fraction = (clampedAge - k1.age) / (k2.age - k1.age);
      return {
        median: k1.median + fraction * (k2.median - k1.median),
        sd: k1.sd + fraction * (k2.sd - k1.sd)
      };
    }
  }
  return { median: knots[0].median, sd: knots[0].sd };
}

/**
 * Calculates Height-for-Age Z-Score (HAZ)
 */
export function calculateHAZ(heightCm: number, ageMonths: number, gender: 'boy' | 'girl'): number {
  const knots = gender === 'boy' ? WHO_BOYS_HAZ_KNOTS : WHO_GIRLS_HAZ_KNOTS;
  const { median, sd } = interpolateKnots(knots, ageMonths);
  const haz = (heightCm - median) / sd;
  return Number(haz.toFixed(2));
}

/**
 * Calculates Weight-for-Age Z-Score (WAZ)
 */
export function calculateWAZ(weightKg: number, ageMonths: number, gender: 'boy' | 'girl'): number {
  const knots = gender === 'boy' ? WHO_BOYS_WAZ_KNOTS : WHO_GIRLS_WAZ_KNOTS;
  const { median, sd } = interpolateKnots(knots, ageMonths);
  const waz = (weightKg - median) / sd;
  return Number(waz.toFixed(2));
}

/**
 * Calculates Weight-for-Height Z-Score (WHZ) using gender-calibrated allometric model
 */
export function calculateWHZ(heightCm: number, weightKg: number, gender: 'boy' | 'girl'): {
  whz: number;
  expectedWeight: number;
  sdWeight: number;
} {
  const clampedHeight = Math.max(45, Math.min(125, heightCm));
  let expectedWeight = 0;
  let sdWeight = 0;

  if (gender === 'boy') {
    expectedWeight = 0.000155 * Math.pow(clampedHeight, 2.45);
    sdWeight = 0.088 * expectedWeight;
  } else {
    expectedWeight = 0.000162 * Math.pow(clampedHeight, 2.43);
    sdWeight = 0.091 * expectedWeight;
  }

  const whz = (weightKg - expectedWeight) / sdWeight;
  return {
    whz: Number(whz.toFixed(2)),
    expectedWeight: Number(expectedWeight.toFixed(2)),
    sdWeight: Number(sdWeight.toFixed(2))
  };
}

/**
 * Evaluates MUAC (Mid-Upper Arm Circumference) status
 */
export function evaluateMUAC(muacCm: number, ageMonths: number): 'normal' | 'mam' | 'sam' {
  if (ageMonths < 6) {
    // Under 6 months MUAC has different criteria; evaluate standard thresholds
    return muacCm < 11.0 ? 'sam' : muacCm < 12.0 ? 'mam' : 'normal';
  }
  if (muacCm < 11.5) return 'sam';
  if (muacCm < 12.5) return 'mam';
  return 'normal';
}

/**
 * Helper to generate WHO curve reference points for chart visualization
 */
export function getWHZCurvePoints(gender: 'boy' | 'girl'): {
  height: number;
  p97: number; // +2 SD (overweight)
  p50: number; // Median
  p3: number;  // -2 SD (moderate wasting / MAM)
  p01: number; // -3 SD (severe wasting / SAM)
}[] {
  const points = [];
  for (let h = 55; h <= 115; h += 5) {
    let exp = 0;
    let sd = 0;
    if (gender === 'boy') {
      exp = 0.000155 * Math.pow(h, 2.45);
      sd = 0.088 * exp;
    } else {
      exp = 0.000162 * Math.pow(h, 2.43);
      sd = 0.091 * exp;
    }
    points.push({
      height: h,
      p97: Number((exp + 2 * sd).toFixed(2)),
      p50: Number(exp.toFixed(2)),
      p3: Number((exp - 2 * sd).toFixed(2)),
      p01: Number((exp - 3 * sd).toFixed(2))
    });
  }
  return points;
}
