"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Graduate } from "@/app/content/graduates";

export default function GraduateStoryBody({ graduate }: { graduate: Graduate }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <Link
          href="/graduates"
          className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] hover:underline"
        >
          ← Our Graduates
        </Link>
        <span className="text-zinc-300" aria-hidden="true">|</span>
        <p className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">
          {graduate.qualification} · {graduate.year}
        </p>
      </div>

      <div className="mb-10 p-6 bg-zinc-50 border-l-2 border-[#CE1A19]">
        <p className="text-zinc-700 text-lg md:text-xl font-semibold leading-relaxed italic">
          &ldquo;{graduate.quote}&rdquo;
        </p>
      </div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        {graduate.story.map((paragraph, i) => (
          <p key={i} className="text-zinc-700 text-base md:text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </motion.div>

      <div className="mt-12 pt-8 border-t border-zinc-100 flex items-center gap-6">
        <p className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">
          {graduate.location} · {graduate.role}
        </p>
        <Link
          href="/graduates"
          className="text-[#CE1A19] text-xs font-bold uppercase tracking-widest hover:underline ml-auto"
        >
          ← Back to all graduates
        </Link>
      </div>
    </div>
  );
}
