"use client";

import { useState } from "react";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Qualifications", href: "#" },
  { name: "Faq", href: "#" },
  { name: "Contact", href: "#" },
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

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Integrity Fitness Education</span>
          <Image
            src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_red.png"
            width={150}
            height={50}
            alt="Integrity Fitness Education"
          />
        </a>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Close menu" : "Open menu"}
            </span>
            <HamburgerIcon open={mobileMenuOpen} />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-red-700 hover:text-red-900 transition-colors duration-150"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-gray-100 px-6 pb-4 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-red-700 hover:bg-gray-50 transition-colors duration-150"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
