import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { dailyProtein, meals } = body;

  // Guard against bad input up front so the rest of the function can trust the types —
  // without this, a missing/non-numeric meals count would divide by zero or produce NaN.
  if (
    typeof dailyProtein !== "number" ||
    typeof meals !== "number" ||
    !Number.isFinite(dailyProtein) ||
    !Number.isFinite(meals) ||
    meals <= 0
  ) {
    return NextResponse.json(
      { error: "dailyProtein and meals must both be finite numbers, and meals must be greater than 0" },
      { status: 400 }
    );
  }

  // Even split of total daily protein across meals.
  const proteinPerMeal = dailyProtein / meals;

  return NextResponse.json({ proteinPerMeal });
}
