import Script from "next/script";

const structuredData = {
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
    <section aria-labelledby="location-heading" className="bg-black py-24">
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <p className="text-white text-xs font-semibold tracking-[4px] uppercase mb-6">
              Find Us
            </p>
            <h2
              id="location-heading"
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
            >
              Based At Complete Fitness Gym, Norwich
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" aria-hidden="true" />
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Our courses are delivered in person at Complete Fitness Gym on
              Whiffler Road, Norwich — a fully equipped professional facility
              that gives you the perfect environment to train and qualify.
            </p>

            <address className="not-italic mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="text-[#CE1A19] mt-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <span className="text-white">
                  Complete Fitness Gym, Whiffler Road
                  <br />
                  Norwich, Norfolk, NR3 2AW
                </span>
              </div>
            </address>

            <a
              href="https://maps.google.com/?q=Complete+Fitness+Gym+Norwich"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-white hover:text-black transition-colors duration-200"
            >
              Get Directions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          {/* Right — map */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <iframe
              title="Complete Fitness Gym Norwich — location map"
              src="https://maps.google.com/maps?q=Complete+Fitness+Gym+Norwich&output=embed"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
