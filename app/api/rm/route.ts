import { NextResponse } from "next/server";

// Percentage-of-max intensity table used to build training targets below.
// Kept here (not in the client) because it's an input to the server-side calculation.
const PRESCRIBED_INTENSITY = [
  { reps: 1, pct: 1.0 },
  { reps: 2, pct: 0.95 },
  { reps: 3, pct: 0.93 },
  { reps: 5, pct: 0.87 },
  { reps: 8, pct: 0.8 },
  { reps: 10, pct: 0.75 },
  { reps: 12, pct: 0.7 },
];

// Epley formula: estimates a one-rep max from a lighter, higher-rep set.
function calculate1RM(weight: number, reps: number): number {
  return weight * (1 + reps / 30);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { weight, reps, bodyWeight } = body;

  // Guard against bad input up front so the rest of the function can trust the types —
  // without this, a missing/non-numeric field would silently produce NaN results.
  if (
    typeof weight !== "number" ||
    typeof reps !== "number" ||
    typeof bodyWeight !== "number" ||
    !Number.isFinite(weight) ||
    !Number.isFinite(reps) ||
    !Number.isFinite(bodyWeight) ||
    bodyWeight <= 0
  ) {
    return NextResponse.json(
      { error: "weight, reps and bodyWeight must all be finite numbers, and bodyWeight must be greater than 0" },
      { status: 400 }
    );
  }

  const oneRM = calculate1RM(weight, reps);
  const relativeStrength = oneRM / bodyWeight;
  const intensityTable = PRESCRIBED_INTENSITY.map((row) => ({
    reps: row.reps,
    pct: row.pct,
    targetWeight: oneRM * row.pct,
  }));

  return NextResponse.json({ oneRM, relativeStrength, intensityTable });
}
