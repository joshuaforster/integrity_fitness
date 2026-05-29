import Link from "next/link";
import qualifications from "@/app/data/qualifications";

export default function QualificationNav({ currentSlug }: { currentSlug: string }) {
  const idx = qualifications.findIndex((q) => q.slug === currentSlug);
  if (idx === -1) return null;

  const prev = qualifications[idx - 1] ?? null;
  const next = qualifications[idx + 1] ?? null;

  return (
    <nav
      aria-label="Qualification navigation"
      className="border-t border-zinc-200 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-zinc-200">
          {/* Previous */}
          <div>
            {prev ? (
              <Link
                href={`/qualifications/${prev.slug}`}
                className="group flex flex-col gap-1 py-8 pr-8 hover:bg-zinc-50 transition-colors px-4 -mx-4"
              >
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-zinc-400 group-hover:text-[#CE1A19] transition-colors flex items-center gap-2">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
                <span className="text-sm font-black uppercase tracking-wide text-zinc-950 group-hover:text-[#CE1A19] transition-colors leading-snug">
                  {prev.shortTitle}
                </span>
                <span className="text-xs text-zinc-400">{prev.level}</span>
              </Link>
            ) : (
              <div className="py-8 px-4" />
            )}
          </div>

          {/* Next */}
          <div>
            {next ? (
              <Link
                href={`/qualifications/${next.slug}`}
                className="group flex flex-col gap-1 py-8 pl-8 text-right hover:bg-zinc-50 transition-colors px-4 -mx-4"
              >
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-zinc-400 group-hover:text-[#CE1A19] transition-colors flex items-center justify-end gap-2">
                  Next
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="text-sm font-black uppercase tracking-wide text-zinc-950 group-hover:text-[#CE1A19] transition-colors leading-snug">
                  {next.shortTitle}
                </span>
                <span className="text-xs text-zinc-400">{next.level}</span>
              </Link>
            ) : (
              <div className="py-8 px-4" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
