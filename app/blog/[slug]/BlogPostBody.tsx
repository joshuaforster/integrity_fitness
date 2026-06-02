"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPostBody({ body, date }: { body: string[]; date: string }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <Link
          href="/blog"
          className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] hover:underline"
        >
          ← Back to Blog
        </Link>
        <span className="text-zinc-300" aria-hidden="true">|</span>
        <p className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">
          {date}
        </p>
      </div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        {body.map((paragraph, i) => (
          <p key={i} className="text-zinc-700 text-base md:text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </motion.div>

      <div className="mt-12 pt-8 border-t border-zinc-100">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#CE1A19] text-sm font-bold uppercase tracking-widest hover:underline"
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}
