"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { type Qualification } from "@/app/data/qualifications";
import { useCart } from "@/app/context/CartContext";
import Button from "@/app/components/ui/Button";

export const cpdGridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cpdCardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

export default function CPDCourseCard({ q }: { q: Qualification }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const isTbc = q.slug === "emergency-first-aid";
  const tier = q.pricing[0];
  const price = tier.price as number;

  function handleAddToBasket() {
    if (isTbc) return;
    addItem({
      id: `${q.slug}-${tier.name.toLowerCase().replace(/\s+/g, "-")}-one-off`,
      slug: q.slug,
      courseName: q.title,
      tierName: tier.name,
      paymentType: "one-off",
      price,
      image: q.heroImage,
    });
    setAdded(true);
    setTimeout(() => router.push("/basket#basket-content"), 700);
  }

  return (
    <motion.div
      variants={cpdCardVariant}
      whileHover={{ y: isTbc ? 0 : -6, transition: { duration: 0.22 } }}
      whileTap={{ scale: isTbc ? 1 : 0.97 }}
      className="h-full"
    >
      <div className={`flex flex-col border shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)] transition-all duration-300 group rounded-2xl h-full overflow-hidden ${isTbc ? "bg-zinc-50 border-zinc-200 opacity-70" : "bg-white border-zinc-200 hover:border-[#CE1A19] hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)]"}`}>
        <div className={`h-[3px] w-full flex-shrink-0 ${isTbc ? "bg-zinc-300" : "bg-[#CE1A19]"}`} aria-hidden="true" />
        <div className="flex flex-col flex-1 justify-between p-6 md:p-8">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold tracking-wider uppercase ${isTbc ? "text-zinc-400" : "text-[#CE1A19]"}`}>
              {q.level}
            </span>
            {isTbc && (
              <span className="bg-zinc-200 text-zinc-500 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full leading-none">
                Dates TBC
              </span>
            )}
          </div>
          <h3 className="text-zinc-900 font-black text-lg tracking-tight mb-2 leading-tight">
            {q.title}
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed mb-6">{q.tagline}</p>
        </div>

        <div className="pt-4 border-t border-zinc-100 mt-auto">
          {isTbc ? (
            <div className="p-4 rounded-xl bg-zinc-100 border border-zinc-200 text-center">
              <p className="text-sm font-black text-zinc-500 uppercase tracking-wider">Coming Soon</p>
              <p className="text-xs text-zinc-400 mt-1">Dates to be confirmed — check back soon or contact us to register your interest.</p>
            </div>
          ) : (
            <>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                    Course fee
                  </p>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-base font-black text-zinc-400 self-start mt-0.5">£</span>
                    <span className="text-3xl font-black text-zinc-900 leading-none">{price}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-0.5">
                    One-time · {q.duration}
                  </p>
                </div>
                <Link
                  href={`/qualifications/${q.slug}`}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  Details →
                </Link>
              </div>
              <Button
                type="button"
                onClick={handleAddToBasket}
                disabled={added}
                variant="primary"
                fullWidth
                className={added ? "!bg-green-600 !shadow-none cursor-default" : ""}
              >
                {added ? "Added to Basket ✓" : "Add to Basket"}
              </Button>
            </>
          )}
        </div>
        </div>
      </div>
    </motion.div>
  );
}
