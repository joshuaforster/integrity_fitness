import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "../../../lib/stripe";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return NextResponse.json({
      customerName: (session.metadata?.customer_name as string) ?? null,
      customerEmail: session.customer_email ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
      lineItems: session.line_items?.data.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        amount: item.amount_total,
      })) ?? [],
      paymentStatus: session.payment_status,
    });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode ?? 500 });
    }
    return NextResponse.json({ error: "Failed to retrieve order" }, { status: 500 });
  }
}
