"use client";

import { useCallback } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCart } from "@/app/context/CartContext";
import PageHero from "@/app/components/ui/PageHero";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function OrderLine({ label, sub, amount }: { label: string; sub: string; amount: string }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <p className="text-zinc-300 text-sm leading-snug min-w-0">
        {label}
        <span className="block text-zinc-600 text-xs">{sub}</span>
      </p>
      <p className="text-white font-bold text-sm whitespace-nowrap flex-shrink-0">{amount}</p>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, total } = useCart();

  // Called once by Stripe on mount — creates the session and returns the client secret
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          courseName: item.courseName,
          tierName: item.tierName,
          paymentType: item.paymentType,
          price: item.price,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.client_secret) {
      throw new Error(data.error ?? "Failed to create payment session.");
    }
    return data.client_secret as string;
  }, [items]); // stable as long as basket doesn't change

  return (
    <main className="bg-zinc-50">
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"
        label="Checkout"
        title="Checkout"
        subtitle="You're one step away from starting your fitness career."
        overlayStrength="heavy"
      />

      <section className="py-20 md:py-28">
        <SectionWrapper>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-10 h-0.5 bg-[#CE1A19] mx-auto mb-6" aria-hidden="true" />
              <p className="text-zinc-500 text-lg mb-8">Your basket is empty.</p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-widest rounded-lg bg-[#CE1A19] text-white hover:bg-red-700 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

              {/* ── Stripe Embedded Checkout ─────────────────── */}
              <div className="lg:col-span-2">
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={{ fetchClientSecret }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>

              {/* ── Sticky order summary ─────────────────────── */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <div className="relative bg-zinc-950 rounded-2xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden">
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px"
                      style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1) 50%,transparent)" }}
                    />

                    <h2 className="text-white font-black uppercase tracking-widest text-xs mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-3 mb-6 border-b border-white/10 pb-6">
                      {items.map((item) => (
                        <OrderLine
                          key={item.id}
                          label={item.courseName}
                          sub={`${item.tierName}${item.quantity > 1 ? ` × ${item.quantity}` : ""}`}
                          amount={`£${(item.price * item.quantity).toFixed(2)}${item.paymentType === "monthly" ? "/mo" : ""}`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center mb-8">
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Total</p>
                      <p className="text-white font-black text-2xl tabular-nums">
                        £{total.toFixed(2)}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {[
                        "Accredited qualification on completion",
                        "One-to-one delivery with Harry",
                        "Flexible study schedule",
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-2.5">
                          <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-zinc-500 text-xs">{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-5 border-t border-white/[0.08] flex items-center gap-2 text-zinc-600 text-[10px] uppercase tracking-wider font-bold">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Payment secured by Stripe</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </SectionWrapper>
      </section>
    </main>
  );
}
