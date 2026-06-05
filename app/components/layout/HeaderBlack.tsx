"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/app/context/CartContext";
import GlobalSearch from "./GlobalSearch";

import { navLinks as NAV_LINKS, qualCategories as QUAL_CATEGORIES } from "@/app/content/navigation";

function HamburgerIcon({ open }: { open: boolean }) {
  const ease = "easeInOut" as const;

  return (
    <motion.div
      className="flex flex-col justify-between"
      style={{ width: 24, height: 18 }}
      // Step 3: whole icon rotates 45° — delayed until lines have merged
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.3, ease, delay: open ? 0.6 : 0 }}
      aria-hidden="true"
    >
      {/* Top line — step 2: slides down to centre after middle collapses */}
      <motion.span
        className="block bg-current"
        style={{ height: 2 }}
        animate={{ y: open ? 8 : 0 }}
        transition={{ duration: 0.3, ease, delay: open ? 0.3 : 0 }}
      />
      {/* Middle line — step 1: collapses to zero width immediately */}
      <motion.span
        className="block bg-current"
        style={{ height: 2, transformOrigin: "center" }}
        animate={{ scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.3, ease }}
      />
      {/* Bottom line — step 2: slides up to centre and rotates 90° */}
      <motion.span
        className="block bg-current"
        style={{ height: 2 }}
        animate={{ y: open ? -8 : 0, rotate: open ? 90 : 0 }}
        transition={{ duration: 0.3, ease, delay: open ? 0.3 : 0 }}
      />
    </motion.div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileQualOpen, setMobileQualOpen] = useState(false);
  const [drawerExitDuration, setDrawerExitDuration] = useState(1.1);

  function closeMenu(fast = false) {
    setDrawerExitDuration(fast ? 0.22 : 1.1);
    setMobileMenuOpen(false);
    if (fast) setMobileQualOpen(false);
  }
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const qualActive =
    pathname === "/qualifications" ||
    QUAL_CATEGORIES.some((c) =>
      c.courses.some((course) => pathname === course.href),
    );

  const bgClass = mobileMenuOpen
    ? "[backdrop-filter:blur(12px)_saturate(160%)_brightness(0.75)] bg-[#18181B]/[0.45] border-b border-white/[0.10] shadow-[0_16px_48px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]"
    : scrolled
      ? "[backdrop-filter:blur(12px)_saturate(160%)_brightness(0.75)] bg-[#18181B]/[0.38] border-b border-white/[0.10] shadow-[0_8px_32px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.08)]"
      : "bg-transparent";

  return (
    <>
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
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/basket#basket-content"
              prefetch={false}
              aria-label={`Basket${count > 0 ? ` — ${count} item${count > 1 ? "s" : ""}` : ""}`}
              className="relative p-1 text-white outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CE1A19] text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => mobileMenuOpen ? closeMenu() : setMobileMenuOpen(true)}
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
                  <p className="text-white text-xs font-black tracking-widest uppercase mb-5">
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
                      className="inline-flex items-center gap-1.5 text-white text-xs font-bold tracking-widest uppercase hover:text-[#CE1A19] transition-colors outline-none rounded-sm focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
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

            {/* Global search — desktop only */}
            <GlobalSearch />

            {/* Basket icon */}
            <Link
              href="/basket#basket-content"
              prefetch={false}
              aria-label={`Basket${count > 0 ? ` — ${count} item${count > 1 ? "s" : ""}` : ""}`}
              className="relative p-1 text-white outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CE1A19] text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>

    </header>

    {/* ── Right-side drawer ─────────────────────────────────────────────── */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backdrop — tap to close, fades with the open phase (0.3s = first hamburger stage) */}
          <motion.div
            key="backdrop"
            className="lg:hidden fixed inset-0 z-[45] bg-zinc-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={() => closeMenu(true)}
            aria-hidden="true"
          />

          {/* Drawer — open 0.9s (matches hamburger-6 open), close 0.3s (matches hamburger-6 close) */}
          <motion.nav
            key="drawer"
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="lg:hidden fixed inset-y-0 right-0 z-[46] w-[300px] flex flex-col [backdrop-filter:blur(20px)_saturate(180%)_brightness(0.45)] bg-[#18181B]/[0.80] border-l border-white/[0.10] shadow-[-16px_0_48px_rgba(0,0,0,0.35),inset_-1px_0_0_rgba(255,255,255,0.06)]"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 1.1, ease: "easeInOut" } }}
            exit={{ x: "100%", transition: { duration: drawerExitDuration, ease: "easeInOut" } }}
          >
            {/* Spacer to clear the fixed header */}
            <div className="h-[72px] shrink-0 border-b border-white/[0.08]" />

            <div className="flex-1 overflow-y-auto py-4">
              {NAV_LINKS.slice(0, 2).map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => closeMenu(true)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between px-6 py-5 text-sm font-bold uppercase tracking-wider border-b border-white/[0.08] outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] transition-colors ${active ? "text-white bg-white/[0.06]" : "text-white hover:bg-white/[0.04]"}`}
                  >
                    <span>{item.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19]" aria-hidden="true" />}
                  </Link>
                );
              })}

              {/* Qualifications accordion */}
              <div className="border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setMobileQualOpen(!mobileQualOpen)}
                  className="w-full flex items-center justify-between px-6 py-5 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/[0.04] outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] transition-colors"
                >
                  <span>Qualifications</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 stroke-[2.5] text-[#CE1A19] transition-transform duration-200 ${mobileQualOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileQualOpen ? "max-h-[500px] pb-4" : "max-h-0"}`}>
                  {QUAL_CATEGORIES.map((cat) => (
                    <div key={cat.title} className="px-6 pt-2 pb-3">
                      <p className="text-white/40 text-[10px] font-black tracking-wider uppercase mb-2">
                        {cat.title}
                      </p>
                      {cat.courses.map((course) => (
                        <Link
                          key={course.name}
                          href={course.href}
                          onClick={() => closeMenu(true)}
                          className="block py-3 pl-3 text-sm text-white transition-colors border-l border-white/[0.15] mb-1 outline-none focus-visible:ring-1 focus-visible:ring-[#CE1A19]"
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
                    onClick={() => closeMenu(true)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between px-6 py-5 text-sm font-bold uppercase tracking-wider border-b border-white/[0.08] last:border-0 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] transition-colors ${active ? "text-white bg-white/[0.06]" : "text-white hover:bg-white/[0.04]"}`}
                  >
                    <span>{item.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19]" aria-hidden="true" />}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
