import { type Metadata } from "next";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import PageHero from "@/app/components/ui/PageHero";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import CartClearer from "./CartClearer";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Enrolment Confirmed | Integrity Fitness Education",
};

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

const NEXT_STEPS = [
  "Check your inbox — a receipt has been sent to your email address.",
  "Harry will contact you within 1 business day to welcome you and book your first session.",
  "You'll receive access to the learning portal and all physical course materials.",
  "Begin your journey to becoming a qualified fitness professional.",
];

async function getSessionDetails(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    return {
      customerName: session.customer_details?.name ?? null,
      customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
      amountTotal: session.amount_total,
      lineItems:
        session.line_items?.data.map((item) => ({
          description: item.description ?? "",
          quantity: item.quantity ?? 1,
          amount: item.amount_total,
        })) ?? [],
    };
  } catch {
    return null;
  }
}

export default async function ConfirmationPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;
  const order = session_id ? await getSessionDetails(session_id) : null;

  const firstName = order?.customerName?.split(" ")[0] ?? null;
  const subtitle = firstName
    ? `You're all set, ${firstName}. Harry will be in touch within 1 business day.`
    : "You're all set. Harry will be in touch within 1 business day.";

  return (
    <main>
      <CartClearer />

      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-PARIS-CLOE-2-20220124-IFE-TGGNCC010.jpg"
        label="Confirmation"
        title="Enrolment Confirmed"
        subtitle={subtitle}
        overlayStrength="heavy"
      />

      {/* Dark content section */}
      <section className="bg-[#18181B] py-20 md:py-28">
        <SectionWrapper>
          <div className="max-w-2xl mx-auto">

            {/* Success icon */}
            <div className="flex justify-center mb-10">
              <div className="w-16 h-16 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Order summary from Stripe */}
            {order && order.lineItems.length > 0 && (
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-5">
                  Order Summary
                </p>
                <div className="space-y-3 mb-5 pb-5 border-b border-white/[0.06]">
                  {order.lineItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-white font-bold text-sm leading-snug">
                          {item.description}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-zinc-600 text-xs">× {item.quantity}</p>
                        )}
                      </div>
                      <p className="text-white font-black text-sm whitespace-nowrap">
                        £{(item.amount / 100).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    Total paid
                  </p>
                  <p className="text-white font-black text-xl">
                    £{((order.amountTotal ?? 0) / 100).toFixed(2)}
                  </p>
                </div>
                {order.customerEmail && (
                  <p className="text-zinc-600 text-xs mt-4">
                    Receipt sent to{" "}
                    <span className="text-zinc-400">{order.customerEmail}</span>
                  </p>
                )}
              </div>
            )}

            {/* What happens next */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-7 mb-10">
              <h2 className="text-white font-black uppercase tracking-widest text-xs mb-6">
                What Happens Next
              </h2>
              <ol className="space-y-4" role="list">
                {NEXT_STEPS.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#CE1A19] text-white text-xs font-black flex items-center justify-center leading-none">
                      {i + 1}
                    </span>
                    <p className="text-zinc-300 text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <Button href="/" variant="primary" size="md">Back to Home</Button>
              <Button href="/shop" variant="outline-dark" size="md">Browse More Courses</Button>
            </div>

            {/* Stripe trust */}
            <p className="text-center text-zinc-700 text-xs">
              Payment processed securely by{" "}
              <Link
                href="https://stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Stripe
              </Link>
              . We never store your card details.
            </p>

          </div>
        </SectionWrapper>
      </section>
    </main>
  );
}
