import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { height, weight, waist, hip } = body;

  // Guard against bad input up front so the rest of the function can trust the types —
  // without this, a missing/non-numeric field would silently produce NaN results.
  // height must be > 0 since it's used as a divisor below.
  if (
    typeof height !== "number" ||
    typeof weight !== "number" ||
    typeof waist !== "number" ||
    typeof hip !== "number" ||
    !Number.isFinite(height) ||
    !Number.isFinite(weight) ||
    !Number.isFinite(waist) ||
    !Number.isFinite(hip) ||
    height <= 0
  ) {
    return NextResponse.json(
      { error: "height, weight, waist and hip must all be finite numbers, and height must be greater than 0" },
      { status: 400 }
    );
  }

  // BMI formula: weight (kg) divided by height (m) squared.
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  // Waist-to-Height Ratio — only meaningful once a waist measurement is entered.
  const whtr = waist > 0 ? waist / height : 0;

  // Waist-to-Hip Ratio — only meaningful once both waist and hip are entered.
  const whr = waist > 0 && hip > 0 ? waist / hip : 0;

  return NextResponse.json({ bmi, whtr, whr });
}
