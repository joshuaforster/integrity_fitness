import Image from 'next/image'

type Props = { theme?: "dark" | "light" }

const CARDS = [
  { src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Apple_Pay-Logo.wine.png", alt: "Apple Pay" },
  { src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/GooglePayLogo.width-500.format-webp.webp", alt: "Google Pay" },
  { src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/58482354cef1014c0b5e49c0.png", alt: "Mastercard" },
  { src: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/580b57fcd9996e24bc43c530.png", alt: "PayPal" },
];

export default function StripeTrustBar({ theme = "light" }: Props) {
  const d = theme === "dark"
  return (
    <div className={`rounded-xl border px-4 py-3.5 space-y-3 ${d ? "bg-white/[0.04] border-white/[0.08]" : "bg-zinc-50 border-zinc-200"}`}>

      {/* Top row: lock + Stripe wordmark + no storage notice */}
      <div className="flex items-center justify-between gap-2">
        <div className={`flex items-center gap-1.5 ${d ? "text-zinc-400" : "text-zinc-500"}`}>
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Secured by</span>
          <Image
            src="https://pub-6bce9dacf6ab45edbda8929e1bb196fa.r2.dev/Images/Stripe_wordmark_-_slate.svg"
            width={36}
            height={16}
            alt="Stripe"
            className={d ? "brightness-0 invert opacity-70" : "brightness-0 opacity-55"}
          />
        </div>
        <p className={`text-[9px] font-bold uppercase tracking-widest ${d ? "text-zinc-600" : "text-zinc-400"}`}>
          No card data stored
        </p>
      </div>

      {/* Payment logos — natural brand colours on white pill */}
      <div className="flex items-center gap-1.5">
        {CARDS.map(({ src, alt }) => (
          <div
            key={alt}
            className="flex items-center justify-center flex-1 h-8 rounded-lg bg-white border border-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.07)]"
          >
            <Image
              src={src}
              width={40}
              height={24}
              alt={alt}
              className="object-contain max-h-[18px]"
            />
          </div>
        ))}
      </div>

    </div>
  )
}
