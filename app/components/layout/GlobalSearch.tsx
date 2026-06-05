"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import qualifications from "@/app/data/qualifications";
import { blogPosts } from "@/app/content/blog";
import { faqs } from "@/app/content/faqs";

type SearchResult = {
  type: "Qualification" | "Blog" | "FAQ";
  title: string;
  description: string;
  href: string;
};

const MAX_PER_TYPE = 3;

function buildResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  qualifications.forEach((qual) => {
    if (
      qual.title.toLowerCase().includes(q) ||
      qual.tagline.toLowerCase().includes(q) ||
      qual.level.toLowerCase().includes(q) ||
      qual.shortTitle.toLowerCase().includes(q) ||
      qual.awardingBody.toLowerCase().includes(q)
    ) {
      results.push({
        type: "Qualification",
        title: qual.title,
        description: qual.tagline,
        href: `/qualifications/${qual.slug}`,
      });
    }
  });

  let blogCount = 0;
  blogPosts.forEach((post) => {
    if (blogCount >= MAX_PER_TYPE) return;
    if (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
    ) {
      results.push({
        type: "Blog",
        title: post.title,
        description: post.excerpt,
        href: `/blog/${post.slug}`,
      });
      blogCount++;
    }
  });

  let faqCount = 0;
  faqs.forEach((group) => {
    group.items.forEach((item) => {
      if (faqCount >= MAX_PER_TYPE) return;
      if (item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)) {
        const anchor = item.q
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .slice(0, 50);
        results.push({
          type: "FAQ",
          title: item.q,
          description: item.a.length > 90 ? item.a.slice(0, 90) + "…" : item.a,
          href: `/faq#${anchor}`,
        });
        faqCount++;
      }
    });
  });

  return results;
}

const TYPE_STYLES: Record<SearchResult["type"], string> = {
  Qualification: "bg-[#CE1A19]/20 text-[#CE1A19]",
  Blog: "bg-blue-500/20 text-blue-400",
  FAQ: "bg-zinc-600/40 text-zinc-400",
};

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => buildResults(query), [query]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) close();
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.button
            key="trigger"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open site search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-1 text-white outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
          >
            <svg
              className="w-5 h-5 [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.8))]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
          </motion.button>
        ) : (
          <motion.form
            key="form"
            role="search"
            aria-label="Search site"
            onSubmit={(e) => {
              e.preventDefault();
              if (results[0]) {
                router.push(results[0].href);
                close();
              }
            }}
            initial={{ opacity: 0, width: 36 }}
            animate={{ opacity: 1, width: 240 }}
            exit={{ opacity: 0, width: 36 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center overflow-hidden"
          >
            <div className="relative w-full">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none"
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
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                aria-label="Search the site"
                className="w-full pl-9 pr-8 py-2 [backdrop-filter:blur(20px)_saturate(150%)] bg-white/[0.10] border border-white/[0.15] rounded-sm text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#CE1A19] focus:border-[#CE1A19]/60 transition-all"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* ── Results dropdown ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && query.trim() && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 w-[400px] [backdrop-filter:blur(40px)_saturate(130%)_brightness(0.85)] bg-zinc-950/[0.94] border border-white/[0.10] shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden z-50"
          >
            {results.length > 0 ? (
              <>
                <p className="px-4 pt-3.5 pb-2 text-white/35 text-[9px] font-black tracking-[0.15em] uppercase">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
                <ul role="listbox">
                  {results.map((r, i) => (
                    <li key={i} role="option" aria-selected="false">
                      <Link
                        href={r.href}
                        onClick={close}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.06] transition-colors duration-150 group outline-none focus-visible:bg-white/[0.08]"
                      >
                        <span
                          className={`mt-0.5 text-[9px] font-black tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-sm flex-shrink-0 ${TYPE_STYLES[r.type]}`}
                        >
                          {r.type}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-white text-sm font-semibold leading-snug line-clamp-1 group-hover:text-[#CE1A19] transition-colors duration-150">
                            {r.title}
                          </p>
                          <p className="text-white/35 text-xs mt-0.5 line-clamp-1 leading-relaxed">
                            {r.description}
                          </p>
                        </div>
                        <span className="text-white/20 group-hover:text-[#CE1A19] text-sm transition-colors duration-150 flex-shrink-0 mt-0.5" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2.5 border-t border-white/[0.07] flex items-center justify-between">
                  <p className="text-white/25 text-[10px]">Press Enter for first result</p>
                  <p className="text-white/25 text-[10px]">Esc to close</p>
                </div>
              </>
            ) : (
              <div className="px-4 py-10 text-center">
                <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center mx-auto mb-3">
                  <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-white/50 text-sm font-semibold">No results found</p>
                <p className="text-white/30 text-xs mt-1">Try different keywords</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
