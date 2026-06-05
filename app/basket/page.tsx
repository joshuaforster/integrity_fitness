"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCart } from "@/app/context/CartContext";
import Button from "@/app/components/ui/Button";
import PaymentSubmitButton from "@/app/components/ui/PaymentSubmitButton";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import StripeTrustBar from "@/app/components/ui/StripeTrustBar";
import PageHero from "@/app/components/ui/PageHero";
import ScrollToTop from "@/app/components/ui/ScrollToTop";

let stripePromise: ReturnType<typeof loadStripe> | null = null;
function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

export default function BasketPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  // Called immediately when button is clicked — Stripe API runs in parallel with animation
  const startStripeSession = useCallback(async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    setTimeout(() => {
      if (window.innerWidth < 1024 && paymentRef.current) {
        paymentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
    try {
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
      if (!res.ok || !data.client_secret) throw new Error(data.error ?? "Failed to create payment session.");
      setClientSecret(data.client_secret as string);
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }, [items]);

  useEffect(() => {
    if (showCheckout && paymentRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [showCheckout]);

  return (
    <main className="bg-white">

      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"
        label="Basket"
        title="Your Basket"
        subtitle="Review your selected courses and complete your enrolment."
        overlayStrength="heavy"
      />

      <section id="basket-content" className="scroll-mt-20 bg-white texture-grid-light py-10 md:py-16 border-b border-zinc-100">
        <SectionWrapper>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-10 h-0.5 bg-[#CE1A19] mx-auto mb-6" aria-hidden="true" />
              <p className="text-zinc-500 text-lg mb-8">Your basket is empty.</p>
              <Button href="/shop" variant="primary" size="md">Browse Courses</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

              {/* Left column: items or payment form */}
              <div ref={paymentRef} className="lg:col-span-2 scroll-mt-24">
                <AnimatePresence mode="wait">
                  {!showCheckout ? (
                    <motion.div
                      key="items"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
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
                                    <p className="text-[10px] font-bold text-zinc-400">then £{item.price.toFixed(2)}/mo until complete</p>
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
                    </motion.div>
                  ) : checkoutLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="bg-white rounded-2xl border border-zinc-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                        <div className="px-6 pt-6 pb-2 border-b border-zinc-100 flex items-center justify-between gap-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Payment Details</p>
                          <button
                            type="button"
                            onClick={() => { setShowCheckout(false); setCheckoutLoading(false); }}
                            className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors"
                          >
                            ← Back to basket
                          </button>
                        </div>
                        <div className="p-8 flex flex-col items-center gap-4 min-h-[240px] justify-center">
                          <svg className="w-7 h-7 animate-spin text-[#CE1A19]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <p className="text-zinc-500 text-sm font-medium">Preparing your payment…</p>
                          <div className="w-full mt-2 space-y-3">
                            <div className="h-3 bg-zinc-100 rounded-full animate-pulse w-2/3" />
                            <div className="h-3 bg-zinc-100 rounded-full animate-pulse w-1/2" />
                            <div className="h-10 bg-zinc-100 rounded-xl animate-pulse mt-4" />
                            <div className="h-10 bg-zinc-100 rounded-xl animate-pulse" />
                            <div className="h-12 bg-zinc-100 rounded-xl animate-pulse mt-2" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="bg-white rounded-2xl border border-zinc-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
                        <div className="px-6 pt-6 pb-2 border-b border-zinc-100 flex items-center justify-between gap-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Payment Details</p>
                          <button
                            type="button"
                            onClick={() => setShowCheckout(false)}
                            className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors"
                          >
                            ← Back to basket
                          </button>
                        </div>
                        <div className="p-2">
                          <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret: clientSecret! }}>
                            <EmbeddedCheckout />
                          </EmbeddedCheckoutProvider>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-xs mt-4 leading-relaxed">
                        By completing your purchase you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-700 transition-colors">Terms & Conditions</Link>.
                        {" "}Payments are handled entirely by{" "}
                        <Link href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-700 transition-colors">Stripe</Link>
                        {" "}— we have no access to your card information.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order summary sidebar */}
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
                              <p className="text-zinc-600 text-xs">then £{item.price.toFixed(2)}/mo until complete</p>
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

                  {checkoutError && (
                    <p className="text-red-400 text-xs font-medium mb-3 text-center">{checkoutError}</p>
                  )}

                  {!showCheckout ? (
                    <PaymentSubmitButton
                      onStart={startStripeSession}
                      onProceed={() => setShowCheckout(true)}
                      ready={!!clientSecret && !checkoutLoading}
                      error={!!checkoutError}
                    />
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Payment form open
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

      <ScrollToTop />
    </main>
  );
}
