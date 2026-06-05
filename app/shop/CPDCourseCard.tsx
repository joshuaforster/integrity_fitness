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

  const tier = q.pricing[0];
  const price = tier.price as number;

  function handleAddToBasket() {
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
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      whileTap={{ scale: 0.97 }}
      className="h-full"
    >
      <div className="flex flex-col bg-white border border-zinc-200 hover:border-[#CE1A19] shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)] transition-all duration-300 group rounded-2xl h-full overflow-hidden">
        <div className="h-[3px] w-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />
        <div className="flex flex-col flex-1 justify-between p-6 md:p-8">
        <div>
          <span className="text-[#CE1A19] text-xs font-bold tracking-wider uppercase">
            {q.level}
          </span>
          <h3 className="text-zinc-900 font-black text-lg tracking-tight mt-3 mb-2 leading-tight group-hover:text-[#CE1A19] transition-colors duration-300">
            {q.title}
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed mb-6">{q.tagline}</p>
        </div>

        <div className="pt-4 border-t border-zinc-100 mt-auto">
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
        </div>
        </div>
      </div>
    </motion.div>
  );
}
