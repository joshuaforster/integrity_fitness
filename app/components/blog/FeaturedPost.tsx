"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import SectionHeader from "@/app/components/ui/SectionHeader";
import type { BlogPost } from "@/app/content/blog";

export default function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <SectionWrapper reveal>
        <SectionHeader label="Latest Post" heading="IReal world experience from those who are where you want to be " headingSize="md" />

        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="lg:col-span-7 block relative aspect-[16/10] overflow-hidden group rounded-sm"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </Link>

          <div className="lg:col-span-5 flex flex-col items-start">
            <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
              {post.category}
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-950 uppercase tracking-tight leading-tight mb-4">
              {post.title}
            </h2>
            <div className="w-10 h-0.5 bg-[#CE1A19] mb-5" aria-hidden="true" />
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <p className="text-zinc-400 text-xs font-semibold tracking-widest uppercase mb-8">
              {post.date}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-[#CE1A19] text-white text-sm font-bold uppercase tracking-widest px-8 py-4 transition-colors duration-200 hover:bg-[#b01616] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2"
            >
              Read Post
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
