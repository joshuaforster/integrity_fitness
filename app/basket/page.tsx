"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCart } from "@/app/context/CartContext";
import Button from "@/app/components/ui/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import StripeTrustBar from "@/app/components/ui/StripeTrustBar";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BasketPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const paymentRef = useRef<HTMLDivElement>(null);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          slug: item.slug,
          courseName: item.courseName,
          tierName: item.tierName,
          paymentType: item.paymentType,
          price: item.price,
          quantity: item.quantity,
          deposit: item.deposit,
        })),
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.client_secret) {
      throw new Error(data.error ?? "Failed to create payment session.");
    }
    return data.client_secret as string;
  }, [items]);

  function handleProceed() {
    setShowCheckout(true);
  }

  // Scroll to payment form once it's mounted — AnimatePresence needs a tick to render
  useEffect(() => {
    if (!showCheckout) return;
    const t = setTimeout(() => {
      const el = paymentRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }, 320);
    return () => clearTimeout(t);
  }, [showCheckout]);

  return (
    <main className="bg-white">

      {/* Compact page header — no hero so items are immediately visible */}
      <div className="pt-28 pb-6 px-6 lg:px-8 max-w-7xl mx-auto border-b border-zinc-100">
        <p className="text-[#CE1A19] text-xs font-black uppercase tracking-widest mb-2">Your Basket</p>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-950 uppercase tracking-tight">Review Your Order</h1>
      </div>

      {/* ── Step 1: Items ─────────────────────────────────────────── */}
      <section className="bg-white texture-grid-light py-10 md:py-16 border-b border-zinc-100">
        <SectionWrapper>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-10 h-0.5 bg-[#CE1A19] mx-auto mb-6" aria-hidden="true" />
              <p className="text-zinc-500 text-lg mb-8">Your basket is empty.</p>
              <Button href="/shop" variant="primary" size="md">Browse Courses</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Item cards */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-2xl border border-zinc-200 overflow-hidden flex shadow-[0_2px_4px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.06)]"
                  >
                    <div className="relative w-28 sm:w-40 flex-shrink-0">
                      <Image src={item.image} alt={item.courseName} fill className="object-cover" sizes="(max-width:640px) 112px, 160px" />
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#CE1A19] mb-1">{item.tierName}</p>
                        <h2 className="text-sm font-black text-zinc-950 leading-snug mb-1">{item.courseName}</h2>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                          {item.paymentType === "monthly" && item.deposit
                            ? `£${item.deposit} deposit today · then £${item.price}/mo until complete`
                            : item.paymentType === "monthly" ? "Monthly payment plan"
                            : "Pay in full"}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                        <div className="flex items-center gap-1 bg-zinc-100 rounded-lg p-1">
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Decrease quantity" className="w-7 h-7 flex items-center justify-center rounded-md font-bold text-base transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 disabled:hover:bg-transparent disabled:hover:text-zinc-600">−</button>
                          <span className="w-8 text-center text-sm font-black text-zinc-950 tabular-nums">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity" className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 transition-colors font-bold text-base">+</button>
                        </div>
                        <div className="flex items-center gap-4">
                          {item.paymentType === "monthly" && item.deposit ? (
                            <div className="text-right">
                              <p className="text-lg font-black text-zinc-950 tabular-nums">£{(item.deposit * item.quantity).toFixed(2)}</p>
                              <p className="text-[10px] font-bold text-zinc-400">then £{item.price}/mo until complete</p>
                            </div>
                          ) : (
                            <p className="text-lg font-black text-zinc-950 tabular-nums">
                              £{(item.price * item.quantity).toFixed(2)}
                              {item.paymentType === "monthly" && <span className="text-xs font-bold text-zinc-500">/mo</span>}
                            </p>
                          )}
                          <button type="button" onClick={() => removeItem(item.id)} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-[#CE1A19] transition-colors">Remove</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-2">
                  <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors">← Continue Shopping</Link>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-zinc-950 rounded-2xl p-7 sticky top-28 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1) 50%,transparent)" }} />

                  <h2 className="text-white font-black uppercase tracking-widest text-xs mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6 border-b border-white/10 pb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-3">
                        <p className="text-zinc-300 text-sm leading-snug min-w-0">
                          {item.courseName}
                          <span className="block text-zinc-600 text-xs">{item.tierName}</span>
                        </p>
                        <div className="text-right flex-shrink-0">
                          {item.paymentType === "monthly" && item.deposit ? (
                            <>
                              <p className="text-white font-bold text-sm tabular-nums">£{(item.deposit * item.quantity).toFixed(2)}</p>
                              <p className="text-zinc-600 text-xs">then £{item.price}/mo until complete</p>
                            </>
                          ) : (
                            <>
                              <p className="text-white font-bold text-sm tabular-nums">£{(item.price * item.quantity).toFixed(2)}{item.paymentType === "monthly" ? "/mo" : ""}</p>
                              {item.quantity > 1 && <p className="text-zinc-600 text-xs">× {item.quantity}</p>}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {(() => {
                    const checkoutTotal = items.reduce((sum, item) => {
                      const charge = item.paymentType === "monthly" && item.deposit ? item.deposit : item.price
                      return sum + charge * item.quantity
                    }, 0)
                    const hasDeposit = items.some(i => i.paymentType === "monthly" && i.deposit)
                    return (
                      <div className="mb-8">
                        <div className="flex justify-between items-center">
                          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Due today</p>
                          <p className="text-white font-black text-2xl tabular-nums">£{checkoutTotal.toFixed(2)}</p>
                        </div>
                        {hasDeposit && (
                          <p className="text-zinc-600 text-xs mt-1 text-right">Monthly payments begin after deposit</p>
                        )}
                      </div>
                    )
                  })()}

                  {!showCheckout ? (
                    <Button onClick={handleProceed} variant="primary" size="md" fullWidth>
                      Proceed to Payment
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Payment form open below
                    </div>
                  )}

                  <div className="mt-5">
                    <StripeTrustBar theme="dark" />
                  </div>
                </div>
              </div>

            </div>
          )}
        </SectionWrapper>
      </section>

      {/* ── Step 2: Payment ───────────────────────────────────────── */}
      <AnimatePresence>
        {showCheckout && items.length > 0 && (
          <motion.section
            ref={paymentRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-zinc-50 texture-grid-light py-20 md:py-28 border-t border-zinc-100"
          >
            <SectionWrapper>

              {/* Stripe trust banner */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="rounded-2xl border border-zinc-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">

                  {/* Header */}
                  <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[#635BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-zinc-950 text-sm font-black leading-none">Powered by Stripe</p>
                        <p className="text-zinc-500 text-xs mt-0.5">stripe.com — trusted by millions worldwide</p>
                      </div>
                    </div>
                    {/* Stripe wordmark */}
                    <svg viewBox="0 0 60 25" className="h-6 flex-shrink-0" aria-label="Stripe">
                      <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a10.7 10.7 0 0 1-4.56.95c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.63zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.2c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.51-5.65 7.51zm-.97-11.46c-.93 0-1.58.37-2 .73l.04 5.77c.4.32 1.02.64 1.96.64 1.54 0 2.5-1.72 2.5-3.57 0-2.03-.85-3.57-2.5-3.57zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.87zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.63 5.3c1.36 0 2.72.2 4.03.94v3.94c-1.25-.67-2.98-1.31-4.03-1.31-.7 0-1.28.24-1.28.99C4.35 11.23 10.46 10.24 10.46 15.84z" fill="#635BFF" />
                    </svg>
                  </div>

                  {/* Trust points */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100">
                    {[
                      { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "256-bit SSL encryption", sub: "Bank-grade security" },
                      { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", label: "We never see your card", sub: "Details go direct to Stripe" },
                      { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "PCI DSS compliant", sub: "Highest payment standard" },
                    ].map(({ icon, label, sub }) => (
                      <div key={label} className="flex items-center gap-3 px-5 py-4">
                        <svg className="w-4 h-4 text-[#635BFF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                        </svg>
                        <div>
                          <p className="text-zinc-800 text-xs font-bold leading-none">{label}</p>
                          <p className="text-zinc-400 text-[10px] mt-0.5">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stripe form */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl border border-zinc-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="px-6 pt-6 pb-2 border-b border-zinc-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Payment Details</p>
                  </div>
                  <div className="p-2">
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  </div>
                </div>

                <p className="text-center text-zinc-400 text-xs mt-6 leading-relaxed">
                  By completing your purchase you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-700 transition-colors">Terms & Conditions</Link>.
                  {" "}Payments are handled entirely by{" "}
                  <Link href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-700 transition-colors">Stripe</Link>
                  {" "}— we have no access to your card information.
                </p>
              </div>

            </SectionWrapper>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
