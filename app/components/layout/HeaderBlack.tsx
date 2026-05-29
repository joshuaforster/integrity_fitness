"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
] as const;

const QUAL_CATEGORIES = [
  {
    title: "Become A Personal Trainer",
    courses: [
      {
        name: "Combined Level 2 & 3 Personal Training Diploma",
        href: "/qualifications/become-a-personal-trainer",
      },
      {
        name: "Level 2 Gym Instructor Certificate",
        href: "/qualifications/level-2-gym-instructor",
      },
      {
        name: "Level 3 Personal Training Qualification",
        href: "/qualifications/level-3-personal-training",
      },
    ],
  },
  {
    title: "Continued Professional Development",
    courses: [
      {
        name: "Level 2 Award in Mental Health Awareness",
        href: "/qualifications/mental-health-awareness",
      },
      {
        name: "Level 3 Award in Supporting Pre & Post Natal Clients",
        href: "/qualifications/pre-post-natal",
      },
      {
        name: "Level 3 Award in Emergency First Aid at Work",
        href: "/qualifications/emergency-first-aid",
      },
    ],
  },
] as const;

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5" aria-hidden="true">
      <span
        className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
      />
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-200 ease-in-out ${open ? "opacity-0 scale-x-0" : "opacity-100"}`}
      />
      <span
        className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
      />
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileQualOpen, setMobileQualOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const qualActive =
    pathname === "/qualifications" ||
    QUAL_CATEGORIES.some((c) =>
      c.courses.some((course) => pathname === course.href),
    );

  const bgClass = mobileMenuOpen
    ? "[backdrop-filter:blur(40px)_saturate(140%)_brightness(0.88)] bg-[#18181B]/[0.70] border-b border-white/[0.10] shadow-[0_16px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.10)]"
    : scrolled
      ? "[backdrop-filter:blur(40px)_saturate(140%)_brightness(0.88)] bg-[#18181B]/[0.62] border-b border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.10)]"
      : "bg-gradient-to-b from-zinc-950/80 to-transparent";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`relative w-full transition-all duration-500 ${bgClass}`}>
        <nav
          aria-label="Global"
          className="relative z-10 mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          {/* Logo Identity Link */}
          <Link
            href="/"
            className="-m-1.5 p-1.5 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
          >
            <span className="sr-only">Integrity Fitness Education</span>
            <Image
              src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_white.png"
              width={125}
              height={40}
              alt=""
              priority
              className="h-auto w-auto object-contain [filter:drop-shadow(0_0_5px_rgba(0,0,0,0.5))_drop-shadow(0_1px_3px_rgba(0,0,0,0.95))]"
            />
          </Link>

          {/* Mobile hamburger Action Control */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-sm p-2.5 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </button>
          </div>

          {/* Desktop Navigation Matrix */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-10">
            {NAV_LINKS.slice(0, 2).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm font-bold tracking-wide transition-colors duration-200 pb-1 group outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950 [text-shadow:0_1px_5px_rgba(0,0,0,0.7),0_0_8px_rgba(0,0,0,0.4)] ${active ? "text-white" : "text-white hover:text-white"}`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#CE1A19] transition-all duration-200 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}

            {/* Qualifications mega drop navigation item */}
            <div className="relative group py-1">
              <Link
                href="/qualifications"
                aria-current={qualActive ? "page" : undefined}
                className={`relative flex items-center gap-1.5 text-sm font-bold tracking-wide transition-colors duration-200 pb-1 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950 [text-shadow:0_1px_5px_rgba(0,0,0,0.7),0_0_8px_rgba(0,0,0,0.4)] ${qualActive ? "text-white" : "text-white hover:text-white"}`}
              >
                <span>Qualifications</span>
                <ChevronDownIcon className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:rotate-180" />
                <span
                  className={`absolute bottom-0 left-0 h-px bg-[#CE1A19] transition-all duration-200 ${qualActive ? "w-[calc(100%-1.25rem)]" : "w-0 group-hover:w-[calc(100%-1.25rem)]"}`}
                />
              </Link>

              {/* Panel Drop Frame */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="[backdrop-filter:blur(40px)_saturate(130%)_brightness(0.85)] bg-zinc-950/[0.92] border border-white/[0.10] shadow-[0_16px_48px_rgba(0,0,0,0.55)] w-[580px] p-6 rounded-xl">
                  <p className="text-white text-[10px] font-black tracking-[4px] uppercase mb-5">
                    Course Directory
                  </p>

                  <div className="grid grid-cols-2 gap-8">
                    {QUAL_CATEGORIES.map((cat) => (
                      <div key={cat.title}>
                        <p className="text-white text-xs font-black uppercase tracking-wider mb-3 pb-2 border-b border-white/10">
                          {cat.title}
                        </p>
                        <ul className="space-y-2.5">
                          {cat.courses.map((course) => {
                            const courseActive = pathname === course.href;
                            return (
                            <li key={course.name}>
                              <Link
                                href={course.href}
                                aria-current={courseActive ? "page" : undefined}
                                className={`flex items-start gap-2 text-sm font-medium leading-snug transition-colors group/item outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19] ${courseActive ? "text-white" : "text-white hover:text-white"}`}
                              >
                                <span className={`w-1 h-1 bg-[#CE1A19] mt-2 flex-shrink-0 transition-opacity rounded-full ${courseActive ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"}`} />
                                <span className={`transition-transform duration-200 ${courseActive ? "translate-x-1 underline underline-offset-2 decoration-[#CE1A19]/60" : "group-hover/item:translate-x-1"}`}>
                                  {course.name}
                                </span>
                              </Link>
                            </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Link
                      href="/qualifications"
                      className="inline-flex items-center gap-1.5 text-white text-xs font-bold tracking-[3px] uppercase hover:text-[#CE1A19] transition-colors outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
                    >
                      <span>View All Qualifications</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {NAV_LINKS.slice(2).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm font-bold tracking-wide transition-colors duration-200 pb-1 group outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950 [text-shadow:0_1px_5px_rgba(0,0,0,0.7),0_0_8px_rgba(0,0,0,0.4)] ${active ? "text-white" : "text-white hover:text-white"}`}
                >
                  <span>{item.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#CE1A19] transition-all duration-200 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile Accordion Menu System Overlay Drawer */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 ease-in-out [backdrop-filter:blur(52px)_saturate(200%)_brightness(1.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.06)_100%)] border-b border-white/[0.18] ${mobileMenuOpen ? "max-h-[600px] opacity-100 shadow-[0_24px_48px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.28)]" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <div className="px-6 py-4 space-y-1">
          {NAV_LINKS.slice(0, 2).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between px-4 py-4 text-sm font-bold uppercase tracking-wider border-b border-white/[0.08] outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19] ${active ? "text-white bg-zinc-900/40" : "text-white"}`}
              >
                <span>{item.name}</span>
                {active && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#CE1A19]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}

          {/* Expandable Mobile Sub-Tree */}
          <div className="border-b border-white/[0.08]">
            <button
              type="button"
              onClick={() => setMobileQualOpen(!mobileQualOpen)}
              className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold uppercase tracking-wider text-white outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
            >
              <span>Qualifications</span>
              <ChevronDownIcon
                className={`w-4 h-4 stroke-[2.5] text-[#CE1A19] transition-transform duration-200 ${mobileQualOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileQualOpen ? "max-h-[500px] pb-4" : "max-h-0"}`}
            >
              {QUAL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="px-4 pt-2 pb-3">
                  <p className="text-white text-[10px] font-black tracking-[2px] uppercase mb-2">
                    {cat.title}
                  </p>
                  {cat.courses.map((course) => (
                    <Link
                      key={course.name}
                      href={course.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileQualOpen(false);
                      }}
                      className="block py-2.5 pl-3 text-xs text-white transition-colors border-l border-white/[0.15] mb-1 outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
                    >
                      {course.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {NAV_LINKS.slice(2).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between px-4 py-4 text-sm font-bold uppercase tracking-wider border-b border-white/[0.08] last:border-0 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19] ${active ? "text-white bg-zinc-900/40" : "text-white"}`}
              >
                <span>{item.name}</span>
                {active && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#CE1A19]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
