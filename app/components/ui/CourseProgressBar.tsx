"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export default function CourseProgressBar() {
  const rawProgress = useMotionValue(0);
  const springProgress = useSpring(rawProgress, { stiffness: 80, damping: 20 });
  const scaleX = useTransform(springProgress, [0, 100], [0, 1]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      rawProgress.set(pct);
      setVisible(scrollTop > 120);
    }

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [rawProgress]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-zinc-900 origin-left"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#CE1A19] origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  );
}
