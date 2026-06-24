"use client";
import { useState, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface CalcAnimatedAmountProps {
  value: number;
  format?: (n: number) => string;
}

export function CalcAnimatedAmount({
  value,
  format = (n) => String(Math.round(n)),
}: CalcAnimatedAmountProps) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 55, damping: 18 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(v));
    return unsub;
  }, [spring]);

  return <>{format(display)}</>;
}
