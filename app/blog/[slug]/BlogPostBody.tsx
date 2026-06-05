"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type BlogAuthor } from "@/app/content/blog";

interface Props {
  body: string[];
  date: string;
  author: BlogAuthor;
}

export default function BlogPostBody({ body, date, author }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Back + date */}
      <div className="flex items-center gap-4 mb-8">
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

      {/* Author byline */}
      <div className="flex items-center gap-3 mb-10 pb-8 border-b border-zinc-100">
        {author.avatar ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-zinc-100">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#CE1A19] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-black">{author.name[0]}</span>
          </div>
        )}
        <div>
          <p className="text-zinc-950 text-sm font-black leading-none mb-0.5">{author.name}</p>
          <p className="text-zinc-500 text-xs font-medium">{author.role}</p>
        </div>
      </div>

      {/* Body */}
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

      {/* Footer nav */}
      <div className="mt-12 pt-8 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#CE1A19] text-sm font-bold uppercase tracking-widest hover:underline"
        >
          ← Back to all posts
        </Link>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-200">
            {author.avatar && (
              <Image src={author.avatar} alt={author.name} fill sizes="32px" className="object-cover" />
            )}
          </div>
          <span className="text-zinc-500 text-xs font-semibold">
            Written by <span className="text-zinc-950 font-black">{author.name}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
