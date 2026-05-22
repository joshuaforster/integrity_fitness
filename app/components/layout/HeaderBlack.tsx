"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Qualifications", href: "/qualifications" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5" aria-hidden="true">
      <span
        className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-6 bg-current transition-all duration-200 ease-in-out ${
          open ? "opacity-0 scale-x-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
        }`}
      />
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`w-full transition-all duration-300 ${(scrolled || mobileMenuOpen) ? "bg-[#111111]" : "bg-transparent"}`}>
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Integrity Fitness Education</span>
            <Image
              src="/logo_white.png"
              width={150}
              height={50}
              alt="Integrity Fitness Education"
            />
          </Link>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
              <HamburgerIcon open={mobileMenuOpen} />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-semibold transition-colors duration-200 pb-1 group ${
                    active ? "text-[#CE1A19]" : "text-white hover:text-[#CE1A19]"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#CE1A19] transition-all duration-200 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      <div
        className={`lg:hidden absolute left-0 right-0 top-full bg-[#111111] overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 px-6 py-4 space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-4 text-base font-semibold tracking-wide text-white transition-colors duration-150 border-b border-white/5 last:border-0 hover:text-white"
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19] flex-shrink-0" />}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
