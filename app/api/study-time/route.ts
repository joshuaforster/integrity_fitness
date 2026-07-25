import { NextResponse } from "next/server";

// Core pacing formula: how many months it takes to clear `courseHoursBase`
// hours of content at `weeklyHours` hours/week, with adjustments for young
// children (less consistent study windows) and prior knowledge (less content
// to cover). Unchanged from the original client-side implementation.
function getEstimate(
  courseHoursBase: number,
  weeklyHours: number,
  youngChildren: boolean,
  priorKnowledge: boolean,
  minMonths: number
) {
  const courseHours = courseHoursBase * (priorKnowledge ? 0.82 : 1.0);
  const effective = weeklyHours * (youngChildren ? 0.72 : 1.0);
  if (effective <= 0) return 36;
  const raw = courseHours / (effective * 4.33);
  return Math.max(minMonths, Math.min(36, raw));
}

// Adds `months` (rounded to the nearest whole month) to `date`.
function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + Math.round(months));
  return d;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { courseHours, minMonths, minMonthsFloor, weeklyHours, youngChildren, priorKnowledge } = body;

  // Guard against bad input up front so the rest of the function can trust the types —
  // without this, a missing/non-numeric field would silently produce NaN results.
  if (
    typeof courseHours !== "number" ||
    typeof minMonths !== "number" ||
    typeof minMonthsFloor !== "number" ||
    typeof weeklyHours !== "number" ||
    !Number.isFinite(courseHours) ||
    !Number.isFinite(minMonths) ||
    !Number.isFinite(minMonthsFloor) ||
    !Number.isFinite(weeklyHours) ||
    typeof youngChildren !== "boolean" ||
    typeof priorKnowledge !== "boolean"
  ) {
    return NextResponse.json(
      {
        error:
          "courseHours, minMonths, minMonthsFloor and weeklyHours must all be finite numbers, and youngChildren/priorKnowledge must be booleans",
      },
      { status: 400 }
    );
  }

  const months = getEstimate(courseHours, weeklyHours, youngChildren, priorKnowledge, minMonths);

  // Pacing range shown to the user as "realistic range" — same 0.8x/1.3x
  // spread used by the original client-side code. Note minMonthsFloor is a
  // separate value from minMonths above: the original client code used a
  // different fallback (0.25) here than it did for the getEstimate() call
  // (MAIN_COURSES[0].minMonths) when no course was selected — preserved as-is.
  const lowMonths = Math.max(minMonthsFloor, months * 0.8);
  const highMonths = months * 1.3;

  // Estimated study hours, adjusted for the same factors as the pacing above.
  const effectiveHours = Math.round(weeklyHours * (youngChildren ? 0.72 : 1.0));
  const adjustedHours = Math.round(courseHours * (priorKnowledge ? 0.82 : 1.0));

  // Completion date — computed from the server's own clock, same as the
  // client previously used its own `new Date()`.
  const finishDate = addMonths(new Date(), months).toISOString();

  return NextResponse.json({
    months,
    lowMonths,
    highMonths,
    effectiveHours,
    adjustedHours,
    finishDate,
  });
}
