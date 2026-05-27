"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isText, setIsText] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(dotX, { stiffness: 140, damping: 20, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 140, damping: 20, mass: 0.5 });

  useEffect(() => {
    function move(e: MouseEvent) {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!active) setActive(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      const computed = window.getComputedStyle(el).cursor;
      const tag = el.tagName.toLowerCase();
      setIsPointer(computed === "pointer" || tag === "a" || tag === "button" || el.closest("a, button") !== null);
      setIsText(computed === "text" || tag === "input" || tag === "textarea");
    }

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [active, dotX, dotY]);

  if (!active) return null;

  return (
    <>
      {/* Dot — follows exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-[#CE1A19]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isPointer ? 5 : isText ? 2 : 9,
          height: isPointer ? 5 : isText ? 18 : 9,
          borderRadius: isText ? "1px" : "50%",
          opacity: 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Ring — spring lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-[#CE1A19]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isPointer ? 46 : isText ? 0 : 30,
          height: isPointer ? 46 : isText ? 0 : 30,
          opacity: isPointer ? 0.5 : isText ? 0 : 0.75,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
