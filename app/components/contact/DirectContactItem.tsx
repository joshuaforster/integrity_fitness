"use client";

import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  description: string;
};

const emailAnim = {
  animate: { y: [0, -3, 0] },
  transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
};

const phoneAnim = {
  animate: { rotate: [0, -12, 12, -12, 0] },
  transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const, repeatDelay: 1 },
};

function ChannelIcon({ href }: { href: string }) {
  const isEmail = href.startsWith("mailto:");

  if (isEmail) {
    return (
      <motion.span
        animate={emailAnim.animate}
        transition={emailAnim.transition}
        className="flex items-center justify-center"
      >
        <EnvelopeIcon className="w-4 h-4 text-[#CE1A19]" aria-hidden="true" />
      </motion.span>
    );
  }

  return (
    <motion.span
      animate={phoneAnim.animate}
      transition={phoneAnim.transition}
      className="flex items-center justify-center"
      style={{ originX: "50%", originY: "100%" }}
    >
      <PhoneIcon className="w-4 h-4 text-[#CE1A19]" aria-hidden="true" />
    </motion.span>
  );
}

export default function DirectContactItem({ channel }: { channel: ContactChannel }) {
  const isExternal = channel.href.startsWith("http");

  return (
    <a
      href={channel.href}
      className="flex items-start gap-4 p-4 bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-sm rounded-xl transition-all duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <span className="w-8 h-8 rounded-full bg-[#CE1A19]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#CE1A19]/20 transition-colors duration-200">
        <ChannelIcon href={channel.href} />
      </span>
      <div className="min-w-0">
        <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block mb-0.5">
          {channel.label}
        </span>
        <span className="text-zinc-950 font-bold text-sm leading-snug group-hover:text-[#CE1A19] transition-colors duration-200 block truncate">
          {channel.value}
        </span>
        <p className="text-zinc-500 text-xs leading-relaxed mt-1">{channel.description}</p>
      </div>
    </a>
  );
}
