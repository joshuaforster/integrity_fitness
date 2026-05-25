import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/Button";

const navigation = {
  qualifications: [
    { name: "Combined Level 2 & 3 Diploma", href: "/qualifications/become-a-personal-trainer" },
    { name: "Level 2 Gym Instructor", href: "/qualifications/level-2-gym-instructor" },
    { name: "Level 3 Personal Training", href: "/qualifications/level-3-personal-training" },
    { name: "Mental Health Awareness", href: "/qualifications/mental-health-awareness" },
    { name: "Pre & Post Natal", href: "/qualifications/pre-post-natal" },
    { name: "Emergency First Aid", href: "/qualifications/emergency-first-aid" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/IntegrityFitnessEducation",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
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
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-8">

        <div className="xl:grid xl:grid-cols-3 xl:gap-12">

          {/* Brand column */}
          <div className="space-y-6">
            <Image
              src="/logo_white.png"
              alt="Integrity Fitness Education"
              width={160}
              height={54}
              style={{ height: "auto" }}
            />
            <p className="text-white text-sm leading-relaxed max-w-xs">
              One-to-one fitness education in Norwich, Norfolk. CIMSPA accredited,
              Level 3 qualified, and built around you.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-[#CE1A19] transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="size-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="mt-12 xl:mt-0 xl:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">

            <div>
              <h3 className="text-white text-xs font-semibold tracking-[3px] uppercase mb-6">
                Qualifications
              </h3>
              <ul className="space-y-3">
                {navigation.qualifications.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white text-sm hover:text-[#CE1A19] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-xs font-semibold tracking-[3px] uppercase mb-6">
                Company
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white text-sm hover:text-[#CE1A19] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-white text-xs font-semibold tracking-[3px] uppercase mb-6 mt-10">
                Legal
              </h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white text-sm hover:text-[#CE1A19] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white text-xs font-semibold tracking-[3px] uppercase mb-6">
                Location
              </h3>
              <address className="not-italic text-white text-sm leading-relaxed">
                Norwich, Norfolk<br />
                United Kingdom
              </address>
              <Button href="/contact" variant="primary" size="sm" className="mt-6">
                Get In Touch
              </Button>
            </div>

          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-white text-xs">
              &copy; {year} Integrity Fitness Education Ltd. All rights reserved.
            </p>
            <p className="text-white text-xs">
              CIMSPA Accredited &middot; Norwich, Norfolk
            </p>
          </div>
          <p className="text-white text-xs">
            Integrity Fitness Education Ltd &middot; Company No. 13487683 &middot; Registered office: 22 Oval Avenue, Norwich, England, NR5 0DP
          </p>
        </div>

      </div>
    </footer>
  );
}
