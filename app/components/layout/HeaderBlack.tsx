"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];

const qualCategories = [
  {
    title: "Become A Personal Trainer",
    courses: [
      { name: "Combined Level 2 & 3 Personal Training Diploma", href: "/qualifications/become-a-personal-trainer" },
      { name: "Level 2 Gym Instructor Certificate", href: "/qualifications/level-2-gym-instructor" },
      { name: "Level 3 Personal Training Qualification", href: "/qualifications/level-3-personal-training" },
    ],
  },
  {
    title: "Continued Professional Development",
    courses: [
      { name: "Level 2 Award in Mental Health Awareness", href: "/qualifications/mental-health-awareness" },
      { name: "Level 3 Award in Supporting Pre & Post Natal Clients", href: "/qualifications/pre-post-natal" },
      { name: "Level 3 Award in Emergency First Aid at Work", href: "/qualifications/emergency-first-aid" },
    ],
  },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5" aria-hidden="true">
      <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
      <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-200 ease-in-out ${open ? "opacity-0 scale-x-0" : "opacity-100"}`} />
      <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
    </div>
  );
}

// To remove frosted glass: change the scrolled branch in bgClass back to "bg-[#111111]"

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

  const qualActive = pathname === "/qualifications" || qualCategories.some((c) =>
    c.courses.some((course) => pathname === course.href)
  );

  // Mobile menu always solid so dropdown text is readable
  // Frosted glass: strong blur + semi-transparent dark — remove backdrop-blur line to revert
  const bgClass = mobileMenuOpen
    ? "bg-[#111111]"
    : scrolled
      ? "backdrop-blur-xl bg-[#111111]/80 border-b border-white/10 shadow-lg"
      : "bg-gradient-to-b from-black/60 to-transparent";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`w-full transition-all duration-200 ${bgClass}`}>
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">

          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Integrity Fitness Education</span>
            <Image
              src="/logo_white.png"
              width={125}
              height={40}
              alt="Integrity Fitness Education"
              priority
              style={{ height: "auto" }}
            />
          </Link>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <HamburgerIcon open={mobileMenuOpen} />
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-10">

            {navLinks.slice(0, 2).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-m font-semibold transition-colors duration-200 pb-1 group rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${active ? "text-white" : "text-white hover:text-[#CE1A19]"}`}
                >
                  {item.name}
                  {/* <span className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-200 ${active ? "w-full" : "w-0 group-hover:w-full"}`} /> */}
                </Link>
              );
            })}

            {/* Qualifications with dropdown */}
            <div className="relative group">
              <Link
                href="/qualifications"
                aria-current={qualActive ? "page" : undefined}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 pb-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white text-white hover:text-[#CE1A19]`}
              >
                Qualifications
                <ChevronDownIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </Link>

              {/* Dropdown panel */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <div className="bg-[#111111] border border-white/10 w-[580px] p-6 shadow-2xl">
                  <p className="text-white text-xs font-semibold tracking-[4px] uppercase mb-5">
                    Qualifications
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {qualCategories.map((cat) => (
                      <div key={cat.title}>
                        <p className="text-white text-xs font-bold uppercase tracking-wider mb-3 pb-2 border-b border-white/10">
                          {cat.title}
                        </p>
                        <ul className="space-y-2">
                          {cat.courses.map((course) => (
                            <li key={course.name}>
                              <Link
                                href={course.href}
                                className="flex items-start gap-2 text-white text-sm leading-snug hover:text-[#CE1A19] transition-colors group/item focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                              >
                                <span className="w-3 h-px bg-[#CE1A19] mt-2 flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                {course.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <Link
                      href="/qualifications"
                      className="text-white text-xs font-semibold tracking-[3px] uppercase underline hover:text-white/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                    >
                      View All Qualifications →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm font-semibold transition-colors duration-200 pb-1 group rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white text-white hover:text-[#CE1A19]`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-px bg-[#CE1A19] transition-all duration-200 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}

          </div>
        </nav>
      </div>

      {/* Mobile menu — solid bg so text is always visible */}
      <div id="mobile-menu" className={`lg:hidden absolute left-0 right-0 top-full bg-[#111111] overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[600px]" : "max-h-0"}`}>
        <div className="border-t border-white/10 px-6 py-4 space-y-1">

          {navLinks.slice(0, 2).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between px-4 py-4 text-base font-semibold tracking-wide transition-colors border-b border-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm text-white hover:text-[#CE1A19]`}
              >
                <span>{item.name}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19]" aria-hidden="true" />}
              </Link>
            );
          })}

          {/* Mobile qualifications expandable */}
          <div className="border-b border-white/5">
            <button
              type="button"
              onClick={() => setMobileQualOpen(!mobileQualOpen)}
              className={`w-full flex items-center justify-between px-4 py-4 text-base font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm text-white hover:text-[#CE1A19]`}
            >
              <span>Qualifications</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${mobileQualOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${mobileQualOpen ? "max-h-96" : "max-h-0"}`}>
              {qualCategories.map((cat) => (
                <div key={cat.title} className="px-4 pb-4">
                  <p className="text-white text-xs font-semibold tracking-[3px] uppercase mb-2">
                    {cat.title}
                  </p>
                  {cat.courses.map((course) => (
                    <Link
                      key={course.name}
                      href={course.href}
                      onClick={() => { setMobileMenuOpen(false); setMobileQualOpen(false); }}
                      className="block py-2 pl-3 text-sm text-white hover:text-[#CE1A19] transition-colors border-l border-white/20 mb-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                    >
                      {course.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {navLinks.slice(2).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between px-4 py-4 text-base font-semibold tracking-wide transition-colors border-b border-white/5 last:border-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm text-white hover:text-[#CE1A19]`}
              >
                <span>{item.name}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19]" aria-hidden="true" />}
              </Link>
            );
          })}

        </div>
      </div>
    </header>
  );
}
