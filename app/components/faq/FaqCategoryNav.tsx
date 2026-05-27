"use client";

import { type FAQGroup } from "./FaqGroup";

function formatId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function FaqCategoryNav({ groups }: { groups: readonly FAQGroup[] }) {
  function scrollToSection(category: string) {
    const el = document.getElementById(formatId(category));
    if (!el) return;
    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <div className="lg:col-span-4 hidden lg:block sticky top-28 space-y-4">
      <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">
        Syllabus Categories
      </p>
      <nav className="space-y-3" aria-label="FAQ categories navigation">
        {groups.map((group) => (
          <button
            key={group.category}
            type="button"
            onClick={() => scrollToSection(group.category)}
            className="flex items-center gap-3 w-full text-left group/nav outline-none"
          >
            <div className="w-1 h-3 bg-zinc-300 group-hover/nav:bg-[#CE1A19] transition-colors duration-200" />
            <span className="text-zinc-900 text-xs font-bold uppercase tracking-wider group-hover/nav:text-[#CE1A19] transition-colors duration-200">
              {group.category}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
