"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import BlobBackground from "@/app/components/ui/BlobBackground";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Integrity Fitness Education",
  description:
    "One-to-one personal trainer qualification courses based at Complete Fitness Gym, Norwich.",
  url: "https://www.integrityfitnesseducation.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Complete Fitness Gym, Whiffler Road",
    addressLocality: "Norwich",
    addressRegion: "Norfolk",
    postalCode: "NR3 2AW",
    addressCountry: "GB",
  },
  location: {
    "@type": "Place",
    name: "Complete Fitness Gym",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Whiffler Road",
      addressLocality: "Norwich",
      addressRegion: "Norfolk",
      postalCode: "NR3 2AW",
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
      className="relative overflow-hidden bg-zinc-50 angle-tr-lg pb-20 md:pb-28 pt-[152px] md:pt-[184px]"
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
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <SectionHeader
              label="Find Us"
              heading="Based At Complete Fitness Gym, Norwich"
              id="location-heading"
              headingSize="sm"
            />

            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8 mt-8">
              Our courses are delivered in person at Complete Fitness Gym on
              Whiffler Road, Norwich — a fully equipped professional facility
              that gives you the perfect environment to train and qualify.
            </p>

            <address className="not-italic mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <motion.span
                  aria-hidden="true"
                  className="text-[#CE1A19] mt-1 flex-shrink-0"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </motion.span>
                <span className="text-zinc-900 font-medium leading-relaxed">
                  Complete Fitness Gym, Whiffler Road
                  <br />
                  <span className="text-zinc-600">Norwich, Norfolk, NR3 2AW</span>
                </span>
              </div>
            </address>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Complete+Fitness+Gym+Whiffler+Road+Norwich+NR3+2AW"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-950 text-zinc-950 px-6 py-3.5 text-sm font-bold tracking-wide uppercase hover:bg-zinc-950 hover:text-white transition-colors duration-200 rounded-sm"
            >
              Get Directions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            ref={mapRef}
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          >
            {/* Dark glass map container */}
            <div className="[backdrop-filter:blur(28px)_saturate(160%)] bg-[#18181B]/[0.12] border border-[#18181B]/[0.18] rounded-3xl p-2 shadow-[0_32px_80px_rgba(0,0,0,0.22),0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-[#18181B]/[0.07]">
              {/* Map viewport */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                {mapVisible ? (
                  <iframe
                    title="Complete Fitness Gym Norwich — location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.432658822557!2d1.2727145772346927!3d52.65215712648756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d783db56382903%3A0x6b63ca52f1e2f8bb!2sComplete%20Fitness%20Gym!5e0!3m2!1sen!2suk!4v1716656000000!5m2!1sen!2suk"
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-100 animate-pulse rounded-2xl" />
                )}
              </div>

              {/* Caption strip */}
              <div className="flex items-center justify-between px-3 py-2.5">
                <div>
                  <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-[2.5px] leading-none">
                    Complete Fitness Gym
                  </p>
                  <p className="text-zinc-500 text-[9px] uppercase tracking-[1.5px] leading-none mt-1.5">
                    Whiffler Road · Norwich · NR3 2AW
                  </p>
                </div>
                {/* Compass rose */}
                <div className="flex flex-col items-center gap-0.5 select-none">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true">
                    <polygon points="10,0 13,12 10,10 7,12" fill="#CE1A19" opacity="0.88" />
                    <polygon points="10,24 13,12 10,14 7,12" fill="#a1a1aa" opacity="0.65" />
                    <polygon points="20,12 8,9 10,12 8,15" fill="#a1a1aa" opacity="0.5" />
                    <polygon points="0,12 12,9 10,12 12,15" fill="#a1a1aa" opacity="0.5" />
                    <circle cx="10" cy="12" r="2.5" fill="white" stroke="#d4d4d8" strokeWidth="1" />
                  </svg>
                  <span className="text-[#CE1A19] text-[8px] font-black uppercase tracking-widest leading-none">N</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </SectionWrapper>
    </section>
  );
}
