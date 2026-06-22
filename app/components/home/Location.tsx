"use client";

import React from "react";
import { motion } from "framer-motion";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import BlobBackground from "@/app/components/ui/BlobBackground";
import { locationSection } from "@/app/content/home";

const TRANSPORT_ICONS: Record<string, React.ReactNode> = {
  Driving: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 11l1.5-4.5h11L19 11" />
      <rect x="2" y="11" width="20" height="7" rx="2" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  Bus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="8" cy="19" r="1.5" />
      <circle cx="16" cy="19" r="1.5" />
      <line x1="8" y1="4" x2="8" y2="2" />
      <line x1="16" y1="4" x2="16" y2="2" />
    </svg>
  ),
  Train: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="2" width="16" height="16" rx="3" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <circle cx="9" cy="15" r="1.5" />
      <circle cx="15" cy="15" r="1.5" />
      <line x1="7" y1="22" x2="10" y2="18" />
      <line x1="17" y1="22" x2="14" y2="18" />
    </svg>
  ),
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Integrity Fitness Education",
  description:
    "One-to-one personal trainer qualification courses based at Complete Fitness Gym, Norwich.",
  url: "https://www.integrityfitness.education",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Complete Fitness, 2 Marriott Close, Heigham Street",
    addressLocality: "Norwich",
    addressRegion: "Norfolk",
    postalCode: "NR2 4UX",
    addressCountry: "GB",
  },
  location: {
    "@type": "Place",
    name: "Complete Fitness",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Marriott Close, Heigham Street",
      addressLocality: "Norwich",
      addressRegion: "Norfolk",
      postalCode: "NR2 4UX",
      addressCountry: "GB",
    },
  },
  areaServed: { "@type": "City", name: "Norwich" },
};

export default function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="location-heading"
      className="relative overflow-hidden bg-white texture-diag-light angle-tr-lg pb-20 md:pb-28 pt-[152px] md:pt-[184px]"
    >
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* Lava-lamp blobs — sit behind everything; glass panel picks up the colour */}
      <BlobBackground />

      <SectionWrapper>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-5 flex flex-col items-start"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label={locationSection.label}
              heading={locationSection.heading}
              id="location-heading"
              headingSize="sm"
            />

            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mt-8 mb-6">
              {locationSection.body}
            </p>

            <ul className="mb-8 space-y-3">
              {locationSection.practicalInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-[#CE1A19]">
                    {TRANSPORT_ICONS[item.label]}
                  </span>
                  <span className="text-zinc-700 text-sm md:text-base leading-relaxed">
                    <strong className="text-zinc-900 font-bold">
                      {item.label}:
                    </strong>{" "}
                    {item.detail}
                    {"link" in item && (
                      <>
                        {" "}
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-zinc-900 transition-colors"
                        >
                          {item.link.label}
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <address className="not-italic mb-8">
              <div className="flex items-start gap-3">
                <motion.span
                  aria-hidden="true"
                  className="text-[#CE1A19] mt-1 flex-shrink-0"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.2,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </motion.span>
                <span className="text-zinc-900 font-medium leading-relaxed">
                  {locationSection.addressLine1}
                  <br />
                  <span className="text-zinc-600">
                    {locationSection.addressLine2}
                  </span>
                </span>
              </div>
            </address>

            <a
              href={locationSection.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 border border-zinc-950 text-zinc-950 px-6 py-3.5 text-sm font-bold tracking-wide uppercase hover:bg-zinc-950 hover:text-white transition-colors duration-200 rounded-lg"
            >
              {locationSection.directionsButton}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            ref={mapRef}
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            {/* Dark glass map container */}
            <div className="[backdrop-filter:blur(28px)_saturate(160%)] bg-[#18181B]/[0.12] border border-[#18181B]/[0.18] rounded-lg p-2 shadow-[0_32px_80px_rgba(0,0,0,0.22),0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-[#18181B]/[0.07]">
              {/* Map viewport */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                {mapVisible ? (
                  <iframe
                    title={locationSection.mapTitle}
                    src="https://maps.google.com/maps?q=Complete+Fitness+Gyms+Ltd,+2+Marriott+Close,+Norwich,+NR2+4UX&ll=52.637045,1.284156&z=16&output=embed"
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-100 animate-pulse rounded-lg" />
                )}
              </div>

              {/* Caption strip */}
              <div className="flex items-center justify-between px-3 py-2.5">
                <div>
                  <p className="text-zinc-700 text-xs font-bold uppercase tracking-widest leading-none">
                    {locationSection.mapCaption}
                  </p>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest leading-none mt-1.5">
                    {locationSection.mapAddress}
                  </p>
                </div>
                {/* Compass rose */}
                <div className="flex flex-col items-center gap-0.5 select-none">
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <polygon
                      points="10,0 13,12 10,10 7,12"
                      fill="#CE1A19"
                      opacity="0.88"
                    />
                    <polygon
                      points="10,24 13,12 10,14 7,12"
                      fill="#a1a1aa"
                      opacity="0.65"
                    />
                    <polygon
                      points="20,12 8,9 10,12 8,15"
                      fill="#a1a1aa"
                      opacity="0.5"
                    />
                    <polygon
                      points="0,12 12,9 10,12 12,15"
                      fill="#a1a1aa"
                      opacity="0.5"
                    />
                    <circle
                      cx="10"
                      cy="12"
                      r="2.5"
                      fill="white"
                      stroke="#d4d4d8"
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="text-[#CE1A19] text-xs font-black uppercase tracking-widest leading-none">
                    N
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  );
}
