export type Gender = "female" | "male" | "other";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active";
export type AgeTrack = "pediatric" | "adult" | "geriatric";
export type Domain =
  | "Musculoskeletal"
  | "Neuromuscular"
  | "Cardiopulmonary"
  | "Pediatric Development"
  | "Geriatric/Fall Risk"
  | "Post-op/Injury"
  | "Sports Performance";

export type Complaint = {
  onset: string;
  onsetUnknown: boolean;
  onsetType: "sudden" | "gradual" | "";
  characters: string[];
  aggravators: string[];
  nrs: number;
};

export type OnboardingState = {
  profile: {
    name: string;
    dob: string;
    gender: Gender | "";
    heightCm: number | "";
    weightKg: number | "";
    occupation: string;
    activity: ActivityLevel | "";
    conditions: string[];
    goals: string[];
    goalOther: string;
  };
  screening: {
    regions: string[];
    complaints: Record<string, Complaint>;
  };
  redFlags: {
    answers: Record<number, "yes" | "no">;
    flagged: number[];
    acknowledgedAt: string | null;
    cleared: boolean;
  };
  assessment: {
    answers: Record<string, number>;
    completed: boolean;
  };
  completedAt: string | null;
};

export const emptyState: OnboardingState = {
  profile: {
    name: "",
    dob: "",
    gender: "",
    heightCm: "",
    weightKg: "",
    occupation: "",
    activity: "",
    conditions: [],
    goals: [],
    goalOther: "",
  },
  screening: { regions: [], complaints: {} },
  redFlags: { answers: {}, flagged: [], acknowledgedAt: null, cleared: false },
  assessment: { answers: {}, completed: false },
  completedAt: null,
};

export const STORAGE_KEY = "tfr-onboarding-v1";

export function calcAge(dob: string): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age >= 0 && age < 120 ? age : null;
}

export function ageTrack(age: number | null): AgeTrack | null {
  if (age === null) return null;
  if (age <= 17) return "pediatric";
  if (age <= 59) return "adult";
  return "geriatric";
}

export const trackLabel: Record<AgeTrack, { emoji: string; text: string }> = {
  pediatric: { emoji: "🧒", text: "Pediatric track activated" },
  adult: { emoji: "🧑", text: "Adult track activated" },
  geriatric: { emoji: "🧓", text: "Geriatric track activated (fall risk screening included)" },
};

export function calcBmi(heightCm: number | "", weightKg: number | "") {
  const h = Number(heightCm) / 100;
  const w = Number(weightKg);
  if (!h || !w) return null;
  const bmi = w / (h * h);
  if (!Number.isFinite(bmi) || bmi <= 0 || bmi > 90) return null;
  const category =
    bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
  const tone =
    category === "Normal" ? "success" : category === "Overweight" ? "warning" : "destructive";
  return { value: Math.round(bmi * 10) / 10, category, tone };
}

export const CONDITIONS = [
  "Diabetes",
  "Pregnancy",
  "Post-surgery",
  "Cardiac",
  "Neurological",
  "None",
];

export const GOALS = [
  "Reduce pain",
  "Improve mobility",
  "Return to sport",
  "Prevent falls",
  "Post-op recovery",
  "Build strength",
  "Better posture",
];

export const OCCUPATIONS = [
  "Office / desk work",
  "Manual labour",
  "Healthcare",
  "Teacher",
  "Driver",
  "Student",
  "Retired",
  "Athlete",
  "Other",
];

export const ACTIVITY_LEVELS: { id: ActivityLevel; label: string }[] = [
  { id: "sedentary", label: "Sedentary" },
  { id: "light", label: "Lightly active" },
  { id: "moderate", label: "Moderately active" },
  { id: "active", label: "Active" },
  { id: "very-active", label: "Very active" },
];

export const PAIN_CHARACTERS = [
  "Sharp",
  "Dull",
  "Burning",
  "Throbbing",
  "Stiffness",
  "Numbness",
  "Tingling",
];

export const AGGRAVATORS = [
  "Sitting",
  "Standing",
  "Walking",
  "Lifting",
  "Sleeping",
  "Exercise",
];

export const RED_FLAG_QUESTIONS = [
  "Chest pain or tightness?",
  "Severe difficulty breathing?",
  "Fainting or loss of consciousness?",
  "Sudden weakness in arms or legs?",
  "Sudden difficulty speaking or slurred speech?",
  "Recent major trauma or accident?",
  "Uncontrolled bleeding?",
  "High fever (above 38.5°C / 101.3°F)?",
  "Sudden severe headache (“worst of your life”)?",
  "Loss of bladder or bowel control?",
  "Numbness in the groin or saddle area?",
  "Unexplained rapid weight loss?",
  "Night pain that prevents sleep and doesn't improve?",
  "Suspected bone fracture (visible deformity, unable to bear weight)?",
];

export function nrsLabel(v: number) {
  if (v === 0) return "No Pain";
  if (v <= 3) return "Mild Pain";
  if (v <= 6) return "Moderate Pain";
  if (v <= 8) return "Severe Pain";
  return "Worst Imaginable";
}

export function pickDomain(state: OnboardingState): Domain {
  const c = state.profile.conditions;
  const regions = state.screening.regions;
  const track = ageTrack(calcAge(state.profile.dob));
  if (c.includes("Neurological")) return "Neuromuscular";
  if (c.includes("Cardiac") || regions.includes("Chest")) return "Cardiopulmonary";
  if (c.includes("Post-surgery")) return "Post-op/Injury";
  if (track === "pediatric") return "Pediatric Development";
  if (track === "geriatric") return "Geriatric/Fall Risk";
  if (state.profile.goals.includes("Return to sport")) return "Sports Performance";
  return "Musculoskeletal";
}

export const LEFS_ITEMS = [
  "Any of your usual work, housework or school activities",
  "Your usual hobbies or recreational activities",
  "Getting into or out of the bath",
  "Walking between rooms",
  "Putting on your shoes or socks",
  "Squatting",
  "Lifting an object from the floor",
  "Performing light activities around your home",
  "Performing heavy activities around your home",
  "Getting into or out of a car",
  "Walking 2 blocks",
  "Walking a mile",
  "Going up or down 10 stairs",
  "Standing for 1 hour",
  "Sitting for 1 hour",
  "Running on even ground",
  "Running on uneven ground",
  "Making sharp turns while running",
  "Hopping",
  "Rolling over in bed",
];

export const LEFS_CHOICES = [
  { v: 0, label: "Extreme difficulty / unable" },
  { v: 1, label: "Quite a bit of difficulty" },
  { v: 2, label: "Moderate difficulty" },
  { v: 3, label: "A little bit of difficulty" },
  { v: 4, label: "No difficulty" },
];

export const ODI_ITEMS = [
  "Pain intensity",
  "Personal care (washing, dressing)",
  "Lifting",
  "Walking",
  "Sitting",
  "Standing",
  "Sleeping",
  "Sex life",
  "Social life",
  "Travelling",
];

export const ODI_CHOICES = [
  { v: 0, label: "No limitation at all" },
  { v: 1, label: "Very slight limitation" },
  { v: 2, label: "Moderate limitation" },
  { v: 3, label: "Considerable limitation" },
  { v: 4, label: "Severe limitation" },
  { v: 5, label: "Completely prevented" },
];

export function needsOdi(state: OnboardingState) {
  return state.screening.regions.some((r) => r.toLowerCase().includes("back"));
}

export function maxPain(state: OnboardingState) {
  const values = Object.values(state.screening.complaints).map((c) => c.nrs);
  return values.length ? Math.max(...values) : 0;
}

export function scoreAssessment(state: OnboardingState) {
  const lefs = LEFS_ITEMS.reduce((sum, _, i) => sum + (state.assessment.answers[`lefs-${i}`] ?? 0), 0);
  const odi = needsOdi(state)
    ? ODI_ITEMS.reduce((sum, _, i) => sum + (state.assessment.answers[`odi-${i}`] ?? 0), 0)
    : null;
  const odiPercent = odi === null ? null : Math.round((odi / 50) * 100);
  const rom = state.assessment.answers["rom"] ?? 0;
  const pain = maxPain(state);

  let tier: "low" | "moderate" | "high";
  if (lefs >= 60 && pain <= 3) tier = "low";
  else if (lefs >= 35 || pain <= 6) tier = "moderate";
  else tier = "high";
  if ((odiPercent ?? 0) >= 60) tier = "high";

  return { lefs, odi, odiPercent, rom, pain, tier };
}

export const TIER_INFO = {
  low: {
    emoji: "🟢",
    label: "LOW RISK",
    meaning:
      "You have minimal functional limitation. A self-guided home program with light monitoring is appropriate.",
    program: [
      "Personalized exercise videos",
      "Automatic rep & duration tracking",
      "Monthly progress check-ins",
    ],
  },
  moderate: {
    emoji: "🟡",
    label: "MODERATE RISK",
    meaning:
      "You have moderate functional limitation. We recommend a supervised exercise program with regular check-ins.",
    program: [
      "Personalized exercise videos",
      "Weekly progress check-ins",
      "Chat with a physiotherapist",
      "Video consultation available",
    ],
  },
  high: {
    emoji: "🔴",
    label: "HIGH RISK",
    meaning:
      "You have significant functional limitation. Your program starts gently and is closely supervised by a physiotherapist.",
    program: [
      "Low-intensity guided exercise videos",
      "Twice-weekly physiotherapist review",
      "Priority chat support",
      "Scheduled video consultations",
    ],
  },
} as const;
