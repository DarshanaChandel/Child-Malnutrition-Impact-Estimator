import React, { useState } from 'react';
import {
  Apple,
  Baby,
  Heart,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Utensils,
  Leaf,
  Sun,
  Flame,
  ArrowRight
} from 'lucide-react';

interface NutritionGuideProps {
  onAssessChild: () => void;
}

export const NutritionGuide: React.FC<NutritionGuideProps> = ({ onAssessChild }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('6-12m');
  const [selectedTopic, setSelectedTopic] = useState<string>('recovery');

  const ageGroups = [
    {
      id: '6-12m',
      title: '6 to 12 Months',
      subtitle: 'Starting First Solid Foods',
      points: [
        'Continue frequent breastfeeding on demand (provides vital antibodies and calories).',
        'Introduce thick, mashed complementary foods starting at 6 completed months (2–3 tablespoons per meal, 2–3 times daily).',
        'Ideal first foods: Well-mashed khichdi with a drop of ghee, mashed ripe banana, boiled and mashed sweet potato, thick dal puree.',
        'Do not give cow milk or honey before 12 months; avoid diluted watery dal or plain tea.'
      ],
      kitchenTip: 'Keep food thick enough to stay on a spoon without dripping off. Thin watery gruels fill the tummy without providing sufficient energy.'
    },
    {
      id: '1-2y',
      title: '1 to 2 Years',
      subtitle: 'Transition to Family Diet',
      points: [
        'Offer 4 to 5 small, nutrient-rich meals or snacks throughout the day, as a toddler\'s stomach is small.',
        'Family meals: Soft roti soaked in thick dal, rice with curd (dahi), mashed boiled egg, steamed seasonal vegetables.',
        'Add a small spoonful of ghee or mustard oil to increase energy density without adding bulk.',
        'Incorporate local finger foods like boiled carrot batons and small pieces of seasonal fruits.'
      ],
      kitchenTip: 'A toddler needs about half the food of an adult spread over 5 mini-meals. Never force-feed; make meal times calm and patient.'
    },
    {
      id: '2-3y',
      title: '2 to 3 Years',
      subtitle: 'Active Chewers & Explorers',
      points: [
        'Encourage self-feeding with hands to develop motor coordination.',
        'Include at least one legume or pulse (moong, chana, rajma) and one dairy item (curd, paneer, milk) every day.',
        'Add green leafy vegetables (spinach, methi, moringa) finely chopped into parathas or khichdi.',
        'Snack on roasted chana, murmura with peanuts, or fresh seasonal fruits instead of packaged chips.'
      ],
      kitchenTip: 'Sprouting whole moong or chana doubles their available vitamin C and makes iron much easier for a child\'s body to absorb.'
    },
    {
      id: '3-5y',
      title: '3 to 5 Years',
      subtitle: 'Pre-School Balanced Platter',
      points: [
        'Aim for a colorful plate every day: brown/yellow (grains & pulses), green (leafy greens), white (curd/milk), red/orange (carrots, tomatoes, papaya).',
        'Strictly eliminate ultra-processed packaged snacks, brightly colored candies, fried namkeen, and sweet carbonated sodas.',
        'Encourage 60+ minutes of active outdoor running and physical play in morning sunlight for bone health (Vitamin D).',
        'Ensure clean boiled drinking water and teach the habit of washing hands with soap before every meal.'
      ],
      kitchenTip: 'Roasted sattu (Bengal gram flour) mixed with water, a pinch of roasted cumin, or jaggery is an affordable, complete protein drink.'
    }
  ];

  const currentAgeData = ageGroups.find(a => a.id === selectedAgeGroup) || ageGroups[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold tracking-wider uppercase text-emerald-800 dark:text-emerald-400 mb-1">
          Practical Everyday Nutrition
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
          What Can I Do to Support Better Nutrition for a Child?
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Grounded in the ICMR-NIN dietary guidelines and Poshan 2.0 frameworks. Simple, affordable foods and caring practices that help children grow strong, even during difficult dry seasons.
        </p>
      </div>

      {/* 1. Age-Bracket Feeding Plans */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-slate-800">
          <div>
            <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
              Age-Specific Feeding Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Select your child&apos;s age bracket to see appropriate meals, consistency, and feeding frequency:
            </p>
          </div>

          <button
            onClick={onAssessChild}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Assess Your Child Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Age Bracket Segmented Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ageGroups.map(grp => (
            <button
              key={grp.id}
              onClick={() => setSelectedAgeGroup(grp.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                selectedAgeGroup === grp.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-700 dark:border-emerald-500 ring-2 ring-emerald-700/20'
                  : 'bg-stone-50 dark:bg-slate-950/40 border-stone-200 dark:border-slate-800 text-stone-700 dark:text-stone-300 hover:border-stone-300'
              }`}
            >
              <div className="text-sm font-bold text-stone-900 dark:text-white">{grp.title}</div>
              <div className="text-xs text-stone-500 mt-0.5 truncate">{grp.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Selected Age Group Content */}
        <div className="p-6 bg-[#FAF9F5] dark:bg-slate-950/60 rounded-2xl border border-stone-200/80 dark:border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-stone-900 dark:text-white">
              Recommended Food & Habits ({currentAgeData.title})
            </h3>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg">
              {currentAgeData.subtitle}
            </span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-200">
            {currentAgeData.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5 p-3 bg-white dark:bg-slate-900 rounded-xl border border-stone-200/60 dark:border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>

          {/* Kitchen Tip Callout */}
          <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/50 flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Kitchen Wisdom: </strong>
              {currentAgeData.kitchenTip}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Low-Cost Indian Kitchen Nutrition Boosters */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-1">
            Affordable Nutrition
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
            Nutrient-Dense Indian Kitchen Heroes
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            High-protein and micronutrient-rich ingredients readily found in rural and urban Indian markets that cost less than commercial powders:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Item 1 */}
          <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900 dark:text-white">Roasted Sattu (Gram)</span>
              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">High Protein</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Made from roasted Bengal gram. Easily digestible, long shelf life, and provides about 20g of protein per 100g. Mix into porridge, milk, or dough.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900 dark:text-white">Groundnut Powder</span>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">Healthy Fats</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Roast and crush peanuts into a fine powder. Adding two spoons to a child&apos;s warm khichdi boosts energy and plant-based healthy oils.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900 dark:text-white">Sprouted Green Moong</span>
              <span className="text-[11px] font-semibold text-teal-800 dark:text-teal-400">Bioavailable Iron</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Sprouting unlocks enzymes, multiplying Vitamin C and freeing up iron from phytates. Steam gently and mash into porridge or dal.
            </p>
          </div>

          {/* Item 4 */}
          <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900 dark:text-white">Moringa (Drumstick) Leaves</span>
              <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400">Iron & Vitamin A</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Grows freely in villages. Contains 4x more Vitamin A than carrots and 7x more Vitamin C than oranges. Add finely shredded leaves to dal or rotis.
            </p>
          </div>

          {/* Item 5 */}
          <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900 dark:text-white">Ragi (Finger Millet)</span>
              <span className="text-[11px] font-semibold text-rose-800 dark:text-rose-400">Rich Calcium</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Has highest calcium of all cereals (340 mg/100g) for bone and tooth growth. Cook into smooth ragi malt or ragi mudde with buttermilk.
            </p>
          </div>

          {/* Item 6 */}
          <div className="p-4 bg-stone-50 dark:bg-slate-950/60 rounded-2xl border border-stone-200/70 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-stone-900 dark:text-white">Curd / Dahi (Probiotics)</span>
              <span className="text-[11px] font-semibold text-sky-800 dark:text-sky-400">Gut Health</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Restores healthy gut bacteria, prevents diarrhea episodes during warm weather, and provides easily digestible dairy protein.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Recognizing Signs & Knowing When to Seek Care */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-rose-800 dark:text-rose-400 uppercase tracking-wider mb-1">
            Child Health Safety
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-white">
            When to Seek Immediate Medical Help
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Always watch for these danger signs that require urgent doctor evaluation at a Primary Health Centre (PHC) or hospital:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50/70 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-900 dark:text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Red Flag Danger Signs</span>
            </div>
            <ul className="text-xs text-rose-800 dark:text-rose-300 space-y-1.5 leading-relaxed">
              <li>· Child is unable to breastfeed or drink liquids at all.</li>
              <li>· Vomits everything consumed.</li>
              <li>· Has visible swelling on the tops of both feet (nutritional oedema).</li>
              <li>· Has high fever, chest in-drawing, or severe rapid breathing.</li>
              <li>· Is unusually limp, lethargic, or unconscious.</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Free Government Support Services</span>
            </div>
            <ul className="text-xs text-emerald-800 dark:text-emerald-300 space-y-1.5 leading-relaxed">
              <li>· <strong>Anganwadi Centre (ICDS):</strong> Monthly growth tracking, Take-Home Rations (THR/Bal Aahar), and hot cooked meals.</li>
              <li>· <strong>Nutrition Rehabilitation Centres (NRC):</strong> Free specialized inpatient treatment with therapeutic feeding for children with Severe Acute Malnutrition (SAM).</li>
              <li>· <strong>National Health Helpline:</strong> Dial 104 or 108 for medical advice and emergency transport.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Plain-Language Glossary of Indicators */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-white">
          Plain-Language Glossary of Measurements
        </h2>

        <div className="divide-y divide-stone-200 dark:divide-slate-800 text-xs sm:text-sm">
          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="font-bold text-stone-900 dark:text-white">Wasting (WHZ)</span>
            <span className="sm:col-span-2 text-stone-600 dark:text-stone-300">
              A child is too thin for their height. It indicates acute, recent weight loss caused by illness, infection, or temporary lack of food.
            </span>
          </div>

          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="font-bold text-stone-900 dark:text-white">Stunting (HAZ)</span>
            <span className="sm:col-span-2 text-stone-600 dark:text-stone-300">
              A child is too short for their age. It reflects long-term, chronic nutritional gaps and recurrent illnesses over months or years.
            </span>
          </div>

          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="font-bold text-stone-900 dark:text-white">Underweight (WAZ)</span>
            <span className="sm:col-span-2 text-stone-600 dark:text-stone-300">
              A combined indicator reflecting either low height, low weight, or both relative to the child&apos;s age.
            </span>
          </div>

          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <span className="font-bold text-stone-900 dark:text-white">MUAC (Upper Arm Tape)</span>
            <span className="sm:col-span-2 text-stone-600 dark:text-stone-300">
              Mid-Upper Arm Circumference. A rapid, accurate measure of muscle mass that helps identify acute thinness without needing heavy weighing scales.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
