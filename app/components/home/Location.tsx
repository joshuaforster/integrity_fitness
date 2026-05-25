"use client";

import Script from "next/script";

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
  areaServed: {
    "@type": "City",
    name: "Norwich",
  },
};

export default function Location() {
  return (
    <section
      aria-labelledby="location-heading"
      className="bg-zinc-50 py-20 md:py-28 border-t border-zinc-200/80"
    >
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column — Text Details (Spans 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
              Find Us
            </p>
            <h2
              id="location-heading"
              className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-6"
            >
              Based At Complete Fitness Gym, Norwich
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" aria-hidden="true" />

            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8">
              Our courses are delivered in person at Complete Fitness Gym on
              Whiffler Road, Norwich — a fully equipped professional facility
              that gives you the perfect environment to train and qualify.
            </p>

            <address className="not-italic mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="text-[#CE1A19] mt-1 flex-shrink-0"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <span className="text-zinc-900 font-medium leading-relaxed">
                  Complete Fitness Gym, Whiffler Road
                  <br />
                  <span className="text-zinc-600">
                    Norwich, Norfolk, NR3 2AW
                  </span>
                </span>
              </div>
            </address>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-950 text-zinc-950 px-6 py-3.5 text-sm font-bold tracking-wide uppercase hover:bg-zinc-950 hover:text-white transition-colors duration-200 rounded-sm"
            >
              Get Directions
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
          </div>

          {/* Right Column — Map Embed Display (Spans 7 Columns) */}
          <div className="lg:col-span-7 w-full relative aspect-[4/3] overflow-hidden bg-zinc-100 border border-zinc-300/60 shadow-sm rounded-sm">
            <iframe
              title="Complete Fitness Gym Norwich — location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.432658822557!2d1.2727145772346927!3d52.65215712648756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d783db56382903%3A0x6b63ca52f1e2f8bb!2sComplete%20Fitness%20Gym!5e0!3m2!1sen!2suk!4v1716656000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
