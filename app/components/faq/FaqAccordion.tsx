"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import FaqCategoryNav from "./FaqCategoryNav";
import FaqGroup from "./FaqGroup";
import { faqs as FAQS, type FAQGroup } from "@/app/content/faqs";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[#CE1A19]/15 text-[#CE1A19] font-bold not-italic rounded-[2px] px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function SearchResultRow({
  q,
  a,
  query,
}: {
  q: string;
  a: string;
  query: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-sr-${q.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;

  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-6 group outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-inset"
      >
        <span className="text-zinc-950 font-extrabold text-sm md:text-base leading-snug group-hover:text-[#CE1A19] transition-colors duration-200">
          <Highlight text={q} query={query} />
        </span>
        <motion.span
          className="w-7 h-7 flex items-center justify-center text-[#CE1A19] flex-shrink-0 rounded-full border border-[#CE1A19]/25"
          animate={{
            rotate: open ? 45 : 0,
            backgroundColor: open ? "rgba(206,26,25,0.08)" : "rgba(206,26,25,0)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-hidden="true"
        >
          <span className="absolute w-3 h-px bg-[#CE1A19]" />
          <span className="absolute w-px h-3 bg-[#CE1A19]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0, y: -4 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed pl-4 border-l-2 border-[#CE1A19] pb-6">
              <Highlight text={a} query={query} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const allCategories = ["All", ...FAQS.map((g) => g.category)];

  const filteredGroups = useMemo<FAQGroup[]>(() => {
    const q = query.toLowerCase().trim();

    const groups = activeCategory === "All"
      ? FAQS
      : FAQS.filter((g) => g.category === activeCategory);

    if (!q) return groups;

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.q.toLowerCase().includes(q) ||
            item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, activeCategory]);

  const totalResults = filteredGroups.reduce((sum, g) => sum + g.items.length, 0);
  const isFiltering = query.trim() !== "" || activeCategory !== "All";

  return (
    <section className="bg-zinc-50 texture-dots-light pt-20 pb-12 md:pt-28 md:pb-16 border-t border-zinc-200/80">
      <SectionWrapper reveal>
        {/* ── Search bar ──────────────────────────────────────────────────── */}
        <div className="mb-10 md:mb-12 max-w-2xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Search FAQ"
            className="flex gap-3 mb-4"
          >
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
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
                placeholder="Search questions…"
                aria-label="Search FAQ questions"
                className="w-full pl-11 pr-10 py-3.5 border border-zinc-300 rounded-sm bg-white text-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-[#CE1A19]/30 focus:border-[#CE1A19] transition-all placeholder:text-zinc-400 shadow-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-700 rounded-full transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#CE1A19] text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-sm hover:bg-[#b01616] active:scale-[0.98] transition-all duration-200 flex-shrink-0 shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-sm border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#CE1A19] text-white border-[#CE1A19]"
                    : "bg-white text-zinc-600 border-zinc-300 hover:border-zinc-400 hover:text-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results / Normal layout ──────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {isFiltering ? (
            <motion.div
              key="filtered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Result count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-zinc-600 text-sm">
                  <span className="font-black text-zinc-950">{totalResults}</span>{" "}
                  {totalResults === 1 ? "question" : "questions"} found
                  {query && (
                    <>
                      {" "}for <span className="text-[#CE1A19] font-semibold">&ldquo;{query}&rdquo;</span>
                    </>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => { setQuery(""); setActiveCategory("All"); }}
                  className="text-xs font-bold text-[#CE1A19] hover:underline uppercase tracking-wider"
                >
                  Clear
                </button>
              </div>

              {totalResults > 0 ? (
                <div className="space-y-8">
                  {filteredGroups.map((group) => (
                    <div key={group.category}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-4 bg-[#CE1A19]" aria-hidden="true" />
                        <h3 className="text-zinc-950 text-xs font-black uppercase tracking-widest">
                          {group.category}
                        </h3>
                        <span className="text-zinc-400 text-xs">
                          {group.items.length} {group.items.length === 1 ? "result" : "results"}
                        </span>
                      </div>
                      <div className="border-t border-zinc-200">
                        {group.items.map((item) => (
                          <SearchResultRow
                            key={item.q}
                            q={item.q}
                            a={item.a}
                            query={query}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center border border-dashed border-zinc-300 rounded-2xl bg-white"
                >
                  <div className="w-11 h-11 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-4.5 h-4.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <p className="text-zinc-950 font-black uppercase tracking-tight text-lg mb-2">
                    No questions found
                  </p>
                  <p className="text-zinc-500 text-sm max-w-xs mx-auto mb-6 leading-relaxed">
                    Try different keywords, or browse all questions by clearing your filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setQuery(""); setActiveCategory("All"); }}
                    className="bg-[#CE1A19] text-white text-xs font-black uppercase tracking-wider px-7 py-3.5 rounded-sm hover:bg-[#b01616] transition-colors"
                  >
                    Browse All FAQs
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              <FaqCategoryNav groups={FAQS} />
              <div className="lg:col-span-8 space-y-12 w-full">
                {FAQS.map((group) => (
                  <FaqGroup key={group.category} group={group} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionWrapper>
    </section>
  );
}
