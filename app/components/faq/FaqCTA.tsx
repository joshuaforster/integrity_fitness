"use client";

import Button from "@/app/components/ui/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import { faqCta } from "@/app/content/faqs";

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/IntegrityFitnessEducation",
    label: "Follow on Facebook",
    gradient: "from-[#1877F2] to-[#0C5DC7]",
    glow: "rgba(24,119,242,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/integrityfitnesseducation",
    label: "Follow on Instagram",
    gradient: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    glow: "rgba(221,42,123,0.4)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
] as const;

export default function FaqCTA() {
  return (
    <section
      aria-labelledby="faq-cta-heading"
      className="bg-zinc-50 texture-diag-light pb-20 md:pb-28"
    >
      <SectionWrapper reveal>
        <div className="pt-12 border-t border-zinc-200/80 max-w-3xl mx-auto">
          {/* ── Still have questions ─────────────────────────────────────────── */}
          <div className="text-center mb-14">
            <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
              {faqCta.label}
            </p>
            <h2
              id="faq-cta-heading"
              className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight uppercase mb-4"
            >
              {faqCta.heading}
            </h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8">
              {faqCta.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href={faqCta.button1.href} variant="primary" size="md" responsive className="px-8 shadow-sm">
                {faqCta.button1.label}
              </Button>
              <Button
                href={faqCta.button2.href}
                variant="outline-light"
                size="md"
                responsive
                className="px-8 bg-white"
                external
              >
                {faqCta.button2.label}
              </Button>
            </div>
          </div>

          {/* ── Social media ─────────────────────────────────────────────────── */}
          <div className="border-t border-zinc-200/80 pt-12 text-center">
            <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-2">
              Or find us on social
            </p>
            <p className="text-zinc-600 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Follow along for tips, student stories, and behind-the-scenes from Harry.
            </p>

            <div className="flex items-center justify-center gap-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] rounded-xl"
                >
                  <span
                    className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-[0_4px_16px_var(--glow)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_28px_var(--glow)] group-active:scale-95`}
                    style={{ "--glow": s.glow } as React.CSSProperties}
                  >
                    {/* Shine overlay */}
                    <span
                      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent opacity-60 pointer-events-none"
                      aria-hidden="true"
                    />
                    {s.icon}
                  </span>
                  <span className="text-zinc-600 text-xs font-bold tracking-wider group-hover:text-zinc-900 transition-colors duration-200">
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
