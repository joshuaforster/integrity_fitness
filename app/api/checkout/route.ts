import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import Stripe from "stripe";

export type CheckoutRequestBody = {
  items: {
    slug: string;
    courseName: string;
    tierName: string;
    paymentType: "one-off" | "monthly";
    price: number;
    quantity: number;
    deposit?: number;
  }[];
};

// 12 months + 5 day buffer so all 12 charges go through before cancellation
function twelveMonthsFromNow() {
  return Math.floor(Date.now() / 1000) + 370 * 24 * 60 * 60;
}

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

    // ── Deposit + subscription flow ──────────────────────────────────────────
    // If any monthly item carries a deposit, collect the deposit now (mode:payment,
    // save card) then auto-create 12-month subscriptions via the webhook.
    const depositMonthlyItems = items.filter(
      (i) => i.paymentType === "monthly" && typeof i.deposit === "number"
    );

    if (depositMonthlyItems.length > 0) {
      const depositLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        depositMonthlyItems.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(item.deposit! * 100),
            product_data: {
              name: `${item.courseName} — ${item.tierName} (Enrolment Deposit)`,
              description: `Secures your place. Then £${item.price}/month for 12 months, starting immediately.`,
            },
          },
        }));

      // Include any one-off items in the same session
      const oneOffLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items
        .filter((i) => i.paymentType === "one-off")
        .map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(item.price * 100),
            product_data: {
              name: `${item.courseName} — ${item.tierName} Plan`,
              description: "Pay in full (one-time)",
            },
          },
        }));

      // Pack subscription details into session metadata for the webhook
      const subscriptionItems = depositMonthlyItems.map((i) => ({
        slug: i.slug,
        tier: i.tierName,
        name: i.courseName,
        amount: Math.round(i.price * 100),
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: [...depositLineItems, ...oneOffLineItems],
        mode: "payment",
        customer_creation: "always",
        payment_intent_data: {
          // Saves the card for the automatic subscription charges
          setup_future_usage: "off_session",
        },
        metadata: {
          type: "deposit_with_subscription",
          subscription_items: JSON.stringify(subscriptionItems),
        },
        ui_mode: "embedded_page" as Stripe.Checkout.SessionCreateParams.UiMode,
        return_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        billing_address_collection: "auto",
      });

      return NextResponse.json({ client_secret: session.client_secret });
    }

    // ── Standard flow (no deposit) ───────────────────────────────────────────
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
      ...(hasMonthly
        ? {
            // cancel_at is a valid Stripe API param but missing from this SDK version's types
            subscription_data: {
              cancel_at: twelveMonthsFromNow(),
            } as Stripe.Checkout.SessionCreateParams.SubscriptionData,
          }
        : {}),
      ui_mode: "embedded_page" as Stripe.Checkout.SessionCreateParams.UiMode,
      return_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
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
