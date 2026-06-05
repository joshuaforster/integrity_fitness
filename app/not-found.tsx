"use client";

import { useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import qualifications from "@/app/data/qualifications";
import { blogPosts } from "@/app/content/blog";
import { faqs } from "@/app/content/faqs";

type Result = { title: string; href: string; type: string };

function buildResults(query: string): Result[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const out: Result[] = [];

  qualifications.forEach((qual) => {
    if (
      qual.title.toLowerCase().includes(q) ||
      qual.tagline.toLowerCase().includes(q) ||
      qual.level.toLowerCase().includes(q)
    ) {
      out.push({ title: qual.title, href: `/qualifications/${qual.slug}`, type: "Qualification" });
    }
  });

  blogPosts.forEach((post) => {
    if (post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)) {
      out.push({ title: post.title, href: `/blog/${post.slug}`, type: "Blog" });
    }
  });

  faqs.forEach((group) => {
    group.items.forEach((item) => {
      if (item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)) {
        const anchor = item.q.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50);
        out.push({ title: item.q, href: `/faq#${anchor}`, type: "FAQ" });
      }
    });
  });

  return out.slice(0, 6);
}

const TYPE_STYLES: Record<string, string> = {
  Qualification: "bg-[#CE1A19]/15 text-[#CE1A19]",
  Blog: "bg-blue-500/15 text-blue-600",
  FAQ: "bg-zinc-200 text-zinc-600",
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function NotFound() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => buildResults(query), [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results[0]) router.push(results[0].href);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20 texture-grid-light">
      <motion.div
        className="text-center w-full max-w-lg"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={item} className="mb-10 flex justify-center">
          <Image
            src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_black.png"
            alt="Integrity Fitness Education"
            width={140}
            height={46}
            priority
            className="h-auto w-auto object-contain opacity-90"
          />
        </motion.div>

        {/* Big 404 */}
        <motion.div variants={item} className="relative mb-6 select-none">
          <span
            className="text-[clamp(7rem,20vw,14rem)] font-black text-white leading-none text-stroke-red"
            aria-hidden="true"
          >
            404
          </span>
          <motion.span
            className="absolute top-4 right-0 md:right-[-2rem] bg-[#CE1A19] text-white text-xs font-black uppercase tracking-wider px-2.5 py-1.5 rounded-sm"
            animate={{ y: [0, -6, 0], rotate: [0, -2, 0, 2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            DNF
          </motion.span>
        </motion.div>

        {/* Label */}
        <motion.p variants={item} className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
          Page Not Found
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-zinc-950 text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-4"
        >
          This page didn&apos;t<br />pass its assessment.
        </motion.h1>

        <motion.p variants={item} className="text-zinc-600 text-sm md:text-base leading-relaxed mb-8">
          The URL you followed doesn&apos;t exist — but we can help you find what you need.
        </motion.p>

        {/* ── Search ─────────────────────────────────────────────────────────── */}
        <motion.div variants={item} className="mb-8">
          <form onSubmit={handleSubmit} role="search" aria-label="Search site" className="flex gap-2">
            <div className="relative flex-1">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search qualifications, blog, FAQs…"
                className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-sm bg-zinc-50 text-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#CE1A19]/30 focus:border-[#CE1A19] transition-all placeholder:text-zinc-400"
              />
            </div>
            <button
              type="submit"
              className="bg-[#CE1A19] text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-sm hover:bg-[#b01616] transition-colors flex-shrink-0"
            >
              Go
            </button>
          </form>

          {/* Inline results */}
          {query && (
            <div className="mt-2 border border-zinc-200 rounded-sm bg-white shadow-sm overflow-hidden text-left">
              {results.length > 0 ? (
                results.map((r, i) => (
                  <Link
                    key={i}
                    href={r.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 transition-colors group"
                  >
                    <span className={`text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded-sm flex-shrink-0 ${TYPE_STYLES[r.type] ?? ""}`}>
                      {r.type}
                    </span>
                    <span className="text-zinc-900 text-sm font-semibold line-clamp-1 flex-1 group-hover:text-[#CE1A19] transition-colors">
                      {r.title}
                    </span>
                    <span className="text-zinc-300 group-hover:text-[#CE1A19] text-sm transition-colors flex-shrink-0" aria-hidden="true">→</span>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-zinc-500 text-sm">No results — try different keywords</p>
              )}
            </div>
          )}
        </motion.div>

        {/* Divider */}
        <motion.div variants={item} className="flex items-center justify-center gap-3 mb-8">
          <motion.div
            className="h-px bg-[#CE1A19] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            style={{ width: 48 }}
          />
          <motion.span
            className="text-[#CE1A19] text-lg"
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            aria-hidden="true"
          >
            ★
          </motion.span>
          <motion.div
            className="h-px bg-[#CE1A19] origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            style={{ width: 48 }}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#CE1A19] text-white text-xs font-black uppercase tracking-wider px-7 py-4 rounded-sm hover:bg-[#b01616] transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/qualifications"
            className="inline-flex items-center justify-center gap-2 border border-zinc-300 text-zinc-950 text-xs font-black uppercase tracking-wider px-7 py-4 rounded-sm hover:border-zinc-400 transition-colors duration-200"
          >
            View Qualifications
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-zinc-300 text-zinc-950 text-xs font-black uppercase tracking-wider px-7 py-4 rounded-sm hover:border-[#CE1A19] hover:text-[#CE1A19] transition-colors duration-200"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
