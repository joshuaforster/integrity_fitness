"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Graduate } from "@/app/content/graduates";

export default function GraduateCard({ graduate, index }: { graduate: Graduate; index: number }) {
  return (
    <motion.article
      className="flex flex-col bg-white"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/graduates/${graduate.slug}`} className="block relative aspect-[4/3] overflow-hidden group">
        <Image
          src={graduate.image}
          alt={`${graduate.name}, ${graduate.role}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <p className="text-white font-black text-lg uppercase tracking-tight leading-tight">
            {graduate.name}
          </p>
          <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mt-0.5">
            {graduate.year} · {graduate.location}
          </p>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-6 border border-t-0 border-zinc-100">
        <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-3">
          {graduate.qualification}
        </p>

        <blockquote className="text-zinc-600 text-sm leading-relaxed mb-5 flex-1">
          &ldquo;{graduate.quote}&rdquo;
        </blockquote>

        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
          <p className="text-zinc-900 text-xs font-black uppercase tracking-widest">
            {graduate.role}
          </p>
          <Link
            href={`/graduates/${graduate.slug}`}
            className="text-[#CE1A19] text-xs font-bold uppercase tracking-widest hover:underline flex-shrink-0 ml-4"
          >
            Read Story →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
