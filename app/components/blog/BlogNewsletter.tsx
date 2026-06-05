"use client";

import { useState } from "react";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Placeholder: replace with your email provider integration
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-[#18181B] texture-dots-dark py-16 md:py-20 border-t border-zinc-900"
    >
      <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
        <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
          Stay in the loop
        </p>
        <h2
          id="newsletter-heading"
          className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-none mb-4"
        >
          Get new posts in your inbox
        </h2>
        <div className="w-10 h-0.5 bg-[#CE1A19] mx-auto mb-6" aria-hidden="true" />
        <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
          Career advice, coaching insights, and industry perspectives — straight from Harry. No spam, unsubscribe any time.
        </p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-3 bg-green-500/15 border border-green-500/30 text-green-400 text-sm font-bold px-6 py-4 rounded-xl">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re subscribed — thanks for joining!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-required="true"
              className="flex-1 px-4 py-3 bg-white/[0.07] border border-white/[0.12] rounded-sm text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#CE1A19]/40 focus:border-[#CE1A19]/60 transition-all"
            />
            <button
              type="submit"
              className="bg-[#CE1A19] text-white text-xs font-black uppercase tracking-wider px-7 py-3 rounded-sm hover:bg-[#b01616] active:scale-[0.98] transition-all duration-200 flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-red-400 text-xs">Something went wrong — please try again.</p>
        )}

        <p className="text-zinc-600 text-xs mt-4 leading-relaxed">
          By subscribing you agree to receive occasional emails from Integrity Fitness Education. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
