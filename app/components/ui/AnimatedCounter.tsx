"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  target: number;
  duration?: number;
  startFrom?: number;
}

export default function AnimatedCounter({ target, duration = 1.4, startFrom }: Props) {
  const from = startFrom ?? (target > 50 ? Math.max(0, target - Math.ceil(target * 0.08)) : 0);
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (!inView) {
      setCount(from);
      return;
    }
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - start) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(from + eased * (target - from)));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration, from]);

  return <span ref={ref}>{count}</span>;
}
