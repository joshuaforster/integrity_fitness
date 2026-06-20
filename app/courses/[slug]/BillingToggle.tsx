"use client";

import { motion } from "framer-motion";

interface BillingToggleProps {
  billing: "one-off" | "monthly";
  setBilling: (v: "one-off" | "monthly") => void;
  saving: number;
}

export default function BillingToggle({ billing, setBilling, saving }: BillingToggleProps) {
  return (
    <div className="relative inline-block">
      <div
        role="group"
        aria-label="Payment type"
        className="relative inline-flex items-center bg-zinc-100 border border-zinc-200 rounded-full p-1"
      >
        <motion.div
          className="absolute top-1 bottom-1 bg-white rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
          animate={{
            left: billing === "monthly" ? "4px" : "50%",
            width: "calc(50% - 4px)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
        {(["monthly", "one-off"] as const).map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setBilling(val)}
            aria-pressed={billing === val}
            className={`relative z-10 w-28 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] ${
              billing === val ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-950"
            }`}
          >
            {val === "monthly" ? "Monthly" : "Pay in Full"}
          </button>
        ))}
      </div>
      {saving > 0 && (
        <motion.span
          animate={{ opacity: billing === "one-off" ? 1 : 0.45, scale: billing === "one-off" ? 1 : 0.9 }}
          className="absolute -top-3.5 right-0 text-[10px] font-black bg-[#CE1A19] text-white px-2 py-0.5 rounded-full leading-none pointer-events-none whitespace-nowrap"
        >
          SAVE £{Math.round(saving)}
        </motion.span>
      )}
    </div>
  );
}
