type Props = { theme?: "dark" | "light" }

const CARDS = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"]

export default function StripeTrustBar({ theme = "light" }: Props) {
  const d = theme === "dark"
  return (
    <div className={`rounded-xl border px-5 py-4 ${d ? "bg-white/[0.03] border-white/[0.07]" : "bg-zinc-50 border-zinc-200"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 flex-wrap">

        {/* Lock + Stripe */}
        <div className={`flex items-center gap-2 text-xs font-bold tracking-wide ${d ? "text-zinc-300" : "text-zinc-700"}`}>
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Payments secured by</span>
          {/* Stripe S wordmark inline */}
          <svg viewBox="0 0 60 25" className={`h-4 w-auto ${d ? "brightness-0 invert opacity-70" : ""}`} aria-label="Stripe" fill="none">
            <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 01-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.23c0-1.85-1.05-2.58-2.06-2.58zm-22.4 1.9a3.08 3.08 0 00-2.6-1.15c-.98 0-1.69.48-1.69 1.2 0 .88.87 1.19 2.5 1.8 2.73.98 3.77 2.41 3.77 4.52 0 3.1-2.14 4.89-5.44 4.89-1.99 0-3.87-.6-5.1-1.97l2.38-2.75c.71.84 1.64 1.37 2.82 1.37 1.13 0 1.83-.54 1.83-1.3 0-.88-.78-1.2-2.44-1.8-2.73-.97-3.83-2.4-3.83-4.52 0-2.9 2.12-4.8 5.42-4.8 1.8 0 3.44.53 4.6 1.67l-2.22 2.84zM26.54 22h-3.9V6.47h3.9V22zm-2-16.95a2.23 2.23 0 110-4.46 2.23 2.23 0 010 4.46zM12.22 7.3l-.14.79c-.73-.98-1.88-1.17-2.94-1.17C5.3 6.92 3 10.11 3 14.03c0 3.9 2.3 7.09 6.14 7.09 1.06 0 2.2-.19 2.93-1.17l.14.79h3.3V.01h-3.3v7.3zm0 9.84c-.6.81-1.34 1.1-2.28 1.1-1.96 0-3.1-1.67-3.1-4.2 0-2.5 1.14-4.17 3.1-4.17.94 0 1.68.29 2.28 1.1V17.14z" fill={d ? "white" : "#635BFF"}/>
          </svg>
        </div>

        <div className={`hidden sm:block w-px h-3.5 mx-4 flex-shrink-0 ${d ? "bg-white/10" : "bg-zinc-300"}`} />

        {/* No storage notice */}
        <p className={`text-xs ${d ? "text-zinc-500" : "text-zinc-500"}`}>
          No card details stored on this website
        </p>

        {/* Card pills — pushed right */}
        <div className="flex items-center gap-1.5 sm:ml-auto flex-wrap">
          {CARDS.map((brand) => (
            <span
              key={brand}
              className={`text-[10px] font-bold px-2 py-0.5 rounded border leading-none ${
                d ? "border-white/10 text-zinc-500 bg-white/[0.03]" : "border-zinc-300 text-zinc-500 bg-white"
              }`}
            >
              {brand}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}
