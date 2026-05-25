"use client";

import Button from "@/app/components/Button";

export default function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-zinc-900 texture-diag-dark py-20 md:py-24 border-y border-zinc-800/60"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column — Context and Copy (Spans 5 Columns) */}
          <div className="lg:col-span-5">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
              Stay Updated
            </p>
            <h2
              id="newsletter-heading"
              className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
            >
              Join Our Newsletter
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-6" aria-hidden="true" />
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
              Be the first to hear about new courses, industry tips, and career
              advice straight from our qualified trainers.
            </p>
          </div>

          {/* Right Column — Clean Accessible Form Field Container (Spans 7 Columns) */}
          <div className="lg:col-span-7 w-full">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
              noValidate
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2">
                {/* Input Block 1: Name */}
                <div className="flex-1 relative">
                  <label htmlFor="newsletter-name" className="sr-only">
                    Your Name
                  </label>
                  <input
                    id="newsletter-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#CE1A19] px-4 py-3.5 text-white text-sm placeholder:text-zinc-500 outline-none rounded-sm transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
                  />
                </div>

                {/* Input Block 2: Email */}
                <div className="flex-1 relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    autoComplete="email"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#CE1A19] px-4 py-3.5 text-white text-sm placeholder:text-zinc-500 outline-none rounded-sm transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
                  />
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="whitespace-nowrap px-8 shadow-md"
                >
                  Subscribe
                </Button>
              </div>

              <p className="text-zinc-500 text-xs tracking-wide">
                No spam. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
