"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import Button from "@/app/components/ui/Button";
import PageHero from "@/app/components/ui/PageHero";
import SectionWrapper from "@/app/components/ui/SectionWrapper";

export default function BasketPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <main className="bg-zinc-50">
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-AND-PARIS-20220124-IFE-TGGNCC002.jpg"
        label="Basket"
        title="Your Basket"
        subtitle="Review your selections before proceeding to checkout."
      />

      <section className="py-20 md:py-28">
        <SectionWrapper>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-10 h-0.5 bg-[#CE1A19] mx-auto mb-6" aria-hidden="true" />
              <p className="text-zinc-500 text-lg mb-8">Your basket is empty.</p>
              <Button href="/shop" variant="primary" size="md">
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* ── Items ────────────────────────────────────── */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-2xl border border-zinc-200 overflow-hidden flex shadow-[0_2px_4px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.06)]"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 sm:w-40 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.courseName}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 112px, 160px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#CE1A19] mb-1">
                          {item.tierName}
                        </p>
                        <h2 className="text-sm font-black text-zinc-950 leading-snug mb-1">
                          {item.courseName}
                        </h2>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                          {item.paymentType === "monthly" ? "Monthly payments" : "Pay in full"}
                          {item.deposit && item.paymentType === "monthly"
                            ? ` · £${item.deposit} deposit`
                            : ""}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                        {/* Quantity stepper */}
                        <div className="flex items-center gap-1 bg-zinc-100 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 transition-colors font-bold text-base"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-black text-zinc-950 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 transition-colors font-bold text-base"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="text-lg font-black text-zinc-950 tabular-nums">
                            £{(item.price * item.quantity).toFixed(2)}
                            {item.paymentType === "monthly" && (
                              <span className="text-xs font-bold text-zinc-500">/mo</span>
                            )}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-[#CE1A19] transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* ── Order summary ─────────────────────────────── */}
              <div className="lg:col-span-1">
                <div className="bg-zinc-950 rounded-2xl p-7 sticky top-28 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  {/* Specular */}
                  <div aria-hidden className="absolute inset-x-7 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1) 50%,transparent)" }} />

                  <h2 className="text-white font-black uppercase tracking-widest text-xs mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6 border-b border-white/10 pb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-3">
                        <p className="text-zinc-300 text-sm leading-snug min-w-0">
                          {item.courseName}
                          <span className="block text-zinc-600 text-xs">{item.tierName}</span>
                        </p>
                        <div className="text-right flex-shrink-0">
                          <p className="text-white font-bold text-sm tabular-nums">
                            £{(item.price * item.quantity).toFixed(2)}
                            {item.paymentType === "monthly" ? "/mo" : ""}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-zinc-600 text-xs">× {item.quantity}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Total</p>
                    <p className="text-white font-black text-2xl tabular-nums">£{total.toFixed(2)}</p>
                  </div>

                  <Button href="/checkout" variant="primary" size="md" fullWidth>
                    Proceed to Checkout
                  </Button>

                  <div className="mt-5 flex items-center justify-center gap-2 text-zinc-600 text-[10px] uppercase tracking-wider font-bold">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secured by Stripe</span>
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
