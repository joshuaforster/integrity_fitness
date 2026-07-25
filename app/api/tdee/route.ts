import { NextResponse } from "next/server";

// Activity multipliers — BMR is scaled by one of these to get TDEE.
// Kept here (not just in the client) because the multiplier value itself
// is an input to the server-side calculation. The client keeps its own
// copy for rendering the label/description text next to the slider.
const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentary" },
  { value: 1.375, label: "Light" },
  { value: 1.55, label: "Moderate" },
  { value: 1.725, label: "Active" },
  { value: 1.9, label: "Very Active" },
];

const FORMULAS = ["mifflin", "harris", "katch"] as const;
type Formula = (typeof FORMULAS)[number];
const GENDERS = ["male", "female"] as const;
type Gender = (typeof GENDERS)[number];

export async function POST(request: Request) {
  const body = await request.json();
  const {
    gender,
    age,
    weight,
    height,
    bodyFat,
    activityIndex,
    formula,
    goalPct,
    proteinKg,
    fatKg,
  } = body;

  // Guard against bad input up front so the rest of the function can trust the
  // types — a missing/non-numeric field or an out-of-range enum would otherwise
  // silently produce NaN or index-out-of-bounds results.
  const numericFields = { age, weight, height, bodyFat, goalPct, proteinKg, fatKg };
  const numericFieldsValid = Object.values(numericFields).every(
    (v) => typeof v === "number" && Number.isFinite(v),
  );

  if (
    !numericFieldsValid ||
    weight <= 0 ||
    height <= 0 ||
    !GENDERS.includes(gender) ||
    !FORMULAS.includes(formula) ||
    typeof activityIndex !== "number" ||
    !Number.isInteger(activityIndex) ||
    activityIndex < 0 ||
    activityIndex >= ACTIVITY_LEVELS.length
  ) {
    return NextResponse.json(
      {
        error:
          "age, weight, height, bodyFat, goalPct, proteinKg and fatKg must all be finite numbers (weight and height greater than 0); gender must be 'male' or 'female'; formula must be 'mifflin', 'harris' or 'katch'; activityIndex must be an integer between 0 and 4",
      },
      { status: 400 },
    );
  }

  const g = gender as Gender;
  const f = formula as Formula;

  /* ── BMR (Basal Metabolic Rate) ──────────────────────────────────────── */
  let bmr = 0;
  if (f === "mifflin") {
    // Mifflin-St Jeor (1990) — gold standard for the general population.
    bmr = 10 * weight + 6.25 * height - 5 * age + (g === "male" ? 5 : -161);
  } else if (f === "harris") {
    // Harris-Benedict, revised — tends to overestimate vs. Mifflin-St Jeor.
    bmr =
      g === "male"
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  } else if (f === "katch") {
    // Katch-McArdle — based on lean body mass rather than total weight.
    const lbm = weight * (1 - bodyFat / 100);
    bmr = 370 + 21.6 * lbm;
  }

  /* ── TDEE: BMR scaled by activity multiplier ─────────────────────────── */
  const activityMult = ACTIVITY_LEVELS[activityIndex].value;
  const tdee = bmr * activityMult;

  /* ── Goal adjustment: target calories relative to TDEE ───────────────── */
  const targetCals = Math.round(tdee * (1 + goalPct / 100));
  const calDiff = targetCals - Math.round(tdee);

  /* ── Macro split ──────────────────────────────────────────────────────── */
  const proteinGrams = Math.round(weight * proteinKg);
  const fatGrams = Math.round(weight * fatKg);
  const proteinCals = proteinGrams * 4;
  const fatCals = fatGrams * 9;
  const carbCals = targetCals - proteinCals - fatCals;
  const carbGrams = Math.max(0, Math.round(carbCals / 4));

  const safeTargetCals = Math.max(1, targetCals); // Prevent /0
  const proteinPct = Math.round((proteinCals / safeTargetCals) * 100);
  const fatPct = Math.round((fatCals / safeTargetCals) * 100);
  const carbPct = Math.max(0, 100 - proteinPct - fatPct);

  return NextResponse.json({
    bmr,
    tdee,
    activityMult,
    targetCals,
    calDiff,
    proteinGrams,
    fatGrams,
    proteinCals,
    fatCals,
    carbCals,
    carbGrams,
    proteinPct,
    fatPct,
    carbPct,
  });
}
