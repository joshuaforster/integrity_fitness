"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "idle" | "loading" | "done";

// 32 particles in 4 directional groups (matches the SCSS @for spot groups)
const PARTICLES = Array.from({ length: 32 }, (_, i) => {
  const group = Math.floor(i / 8);
  const offset = i % 8;
  const baseAngles = [-90, 0, 90, 180];
  const angle = baseAngles[group] + (offset - 3.5) * 14;
  const dist = 38 + (offset % 4) * 18;
  const colors = ["#CE1A19", "#ffffff", "#ff6b6b", "#fca5a5"];
  return {
    id: i,
    dx: Math.cos((angle * Math.PI) / 180) * dist,
    dy: Math.sin((angle * Math.PI) / 180) * dist,
    size: 3 + (i % 3) * 2,
    color: colors[i % colors.length],
    delay: (i % 5) * 0.03,
  };
});

interface Props {
  /** Called immediately on click — start the Stripe API call in parallel */
  onStart: () => void;
  /** Called after done animation plays — show the Stripe checkout */
  onProceed: () => void;
  /** True when the Stripe session is ready */
  ready: boolean;
  /** True if the API call failed — resets button */
  error?: boolean;
}

export default function PaymentSubmitButton({ onStart, onProceed, ready, error }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [showParticles, setShowParticles] = useState(false);

  const handleClick = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("loading");
    onStart();
  }, [phase, onStart]);

  // When Stripe session is ready, play done sequence
  useEffect(() => {
    if (ready && phase === "loading") {
      setShowParticles(true);
      setTimeout(() => {
        setPhase("done");
        setTimeout(onProceed, 500);
      }, 300);
    }
  }, [ready, phase, onProceed]);

  // Reset on API error
  useEffect(() => {
    if (error) setPhase("idle");
  }, [error]);

  return (
    <div className="relative flex justify-center items-center w-full" style={{ height: 44 }}>

      {/* Confetti burst particles — appear at loading→done transition */}
      <AnimatePresence>
        {showParticles &&
          PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                top: "50%",
                left: "50%",
                marginTop: -p.size / 2,
                marginLeft: -p.size / 2,
                zIndex: 20,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.2 }}
              transition={{ duration: 0.85, delay: p.delay, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>

      {/* ── Full-width idle button ── */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.button
            type="button"
            onClick={handleClick}
            className="group absolute inset-0 w-full rounded-lg overflow-hidden flex items-center justify-center"
            style={{ border: "2px solid white", color: "white" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.10)" }}
          >
            {/* Border-trace SVG (same as glass button) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
              <rect
                width="100%"
                height="100%"
                rx={6}
                fill="none"
                stroke="white"
                strokeWidth="2"
                pathLength={480}
                className="glass-border-trace"
              />
            </svg>

            {/* Arrow icon — slides in from left on hover */}
            <span className="absolute left-6 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>

            {/* Label — shifts right on hover */}
            <span className="relative z-10 text-sm font-semibold uppercase tracking-widest group-hover:translate-x-3 transition-transform duration-300">
              Proceed to Payment
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Loading circle (button is collapsed, arrow bounces) ── */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            className="absolute flex items-center justify-center rounded-full"
            style={{ border: "2px solid white", width: 44, height: 44 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Bouncing down arrow — matches the "down" keyframe from the original CSS
                (button is notionally rotated 90deg so left→right becomes down visually) */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Done circle (checkmark snaps in — matches "tick" keyframe) ── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            className="absolute flex items-center justify-center rounded-full"
            style={{ border: "2px solid white", width: 44, height: 44 }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
