"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  label: string;
  variant?: 'brand' | 'neutral';
  showDot?: boolean;
}

export default function Badge({ 
  label, 
  variant = 'brand', 
  showDot = true 
}: BadgeProps) {
  const dotColor = variant === 'brand' ? 'bg-[#CE1A19]' : 'bg-zinc-400';
  const dotGlow = variant === 'brand' 
    ? 'shadow-[0_0_12px_3px_rgba(206,26,25,0.7)]' 
    : 'shadow-[0_0_12px_3px_rgba(161,161,170,0.7)]';

  return (
    <motion.div 
      whileHover="hover"
      initial="initial"
      className="relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.8)] overflow-hidden cursor-default"
    >
      
      {/* Animated Light Glare Sweep */}
      <motion.div 
        variants={{
          initial: { left: '-100%' },
          hover: { left: '200%' }
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] z-10 pointer-events-none" 
      />
      
      {/* Physical glass top edge reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-80" />

      {showDot && (
        <div className="relative flex h-2 w-2 items-center justify-center z-20">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-50 animate-pulse ${dotColor}`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColor} ${dotGlow}`} />
        </div>
      )}

      {/* Metallic gradient text */}
      <span className="relative z-20 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] antialiased bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-md">
        {label}
      </span>
      
    </motion.div>
  );
}