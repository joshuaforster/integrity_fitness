"use client";

import Image from "next/image";
import Button from "@/app/components/Button";

type CredentialCard =
  | {
      type: "brand";
      src: string;
      alt: string;
      width: number;
      height: number;
      label: string;
    }
  | { type: "metric"; value: string; label: string; description: string };

const CREDENTIALS: readonly CredentialCard[] = [
  {
    type: "brand",
    src: "/cimspa.webp",
    alt: "CIMSPA Chartered Institute logo",
    width: 140,
    height: 32,
    label: "Accredited Partner",
  },
  {
    type: "brand",
    src: "/activeiq.png",
    alt: "Active IQ Awarding Body logo",
    width: 140,
    height: 32,
    label: "Approved Centre",
  },
  {
    type: "metric",
    value: "1:1",
    label: "Format",
    description: "Tailored private mentorship.",
  },
  {
    type: "metric",
    value: "NR3",
    label: "Norwich",
    description: "Complete Fitness Gym base.",
  },
] as const;

export default function AboutCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-white texture-grid-light py-20 md:py-28 border-t border-zinc-100"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column — Core Conversion Message (Spans 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
              Ready To Start?
            </p>
            <h2
              id="cta-heading"
              className="text-4xl md:text-5xl font-black text-zinc-950 leading-none uppercase tracking-tight mb-6"
            >
              Take The
              <br />
              First Step.
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" aria-hidden="true" />

            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Whether you&apos;re looking to start your journey in personal
              training or take your existing career to the next level, we have a
              qualification built around your exact velocity.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                href="/qualifications"
                variant="primary"
                size="md"
                className="w-full sm:w-auto px-8"
              >
                View Qualifications
              </Button>
              <Button
                href="/contact"
                variant="outline-light"
                size="md"
                className="w-full sm:w-auto px-8"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right Column — 2x2 Clean Image & Metric Matrix Grid (Spans 7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:pl-6">
            {CREDENTIALS.map((item, index) => (
              <div
                key={index}
                className="p-6 md:p-8 bg-zinc-50 border border-zinc-200/60 rounded-sm flex flex-col justify-between min-h-[160px] group hover:border-zinc-300 transition-colors duration-200"
              >
                {item.type === "brand" ? (
                  <>
                    {/* Top Anchor: Brand Asset Vector */}
                    <div className="h-10 flex items-center w-auto relative">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        priority
                        className="h-7 w-auto object-contain block"
                      />
                    </div>
                    {/* Bottom Label Descriptor */}
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mt-4">
                      {item.label}
                    </p>
                  </>
                ) : (
                  <>
                    {/* Top Anchor: Structural Quantitative Copy Details */}
                    <div>
                      <span className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight block leading-none">
                        {item.value}
                      </span>
                      <span className="text-xs font-extrabold text-[#CE1A19] uppercase tracking-[1.5px] mt-1.5 block">
                        {item.label}
                      </span>
                    </div>
                    {/* Bottom Inline Summary Context */}
                    <p className="text-zinc-500 text-xs font-medium mt-4 leading-relaxed">
                      {item.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
