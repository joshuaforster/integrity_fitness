import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import Stripe from "stripe";

export type CheckoutRequestBody = {
  items: {
    courseName: string;
    tierName: string;
    paymentType: "one-off" | "monthly";
    price: number;
    quantity: number;
  }[];
};

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequestBody = await req.json();
    const { items } = body;

    if (!items?.length) {
      return NextResponse.json(
        { error: "At least one item is required." },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const hasMonthly = items.some((i) => i.paymentType === "monthly");

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "gbp",
        unit_amount: Math.round(item.price * 100),
        ...(hasMonthly && item.paymentType === "monthly"
          ? { recurring: { interval: "month" as const } }
          : {}),
        product_data: {
          name: `${item.courseName} — ${item.tierName} Plan`,
          description:
            item.paymentType === "monthly"
              ? "Monthly payment plan"
              : "Pay in full (one-time)",
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: hasMonthly ? "subscription" : "payment",
      ui_mode: "embedded_page" as Stripe.Checkout.SessionCreateParams.UiMode,
      return_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      // Stripe collects billing details (name, email) from the customer in the checkout form
      billing_address_collection: "auto",
    });

    return NextResponse.json({ client_secret: session.client_secret });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode ?? 500 }
      );
    }
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
