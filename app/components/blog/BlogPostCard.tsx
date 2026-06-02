"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/app/content/blog";

export default function BlogPostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden mb-5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-2">
          {post.category}
        </p>

        <h3 className="text-lg font-black text-zinc-950 uppercase tracking-tight leading-snug mb-3 group-hover:text-[#CE1A19] transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <p className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">
          {post.date}
        </p>
      </Link>
    </motion.article>
  );
}
