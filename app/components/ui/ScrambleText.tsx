"use client";

import { useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  speed?: number;
}

export default function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
  speed = 40,
}: ScrambleTextProps) {
  const elRef = useRef<HTMLElement>(null);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    if (frameRef.current) clearTimeout(frameRef.current);
    iterRef.current = 0;

    function step() {
      const el = elRef.current;
      if (!el) return;
      el.textContent = text
        .split("")
        .map((char, idx) => {
          if (char === " ") return " ";
          if (idx < iterRef.current) return text[idx];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iterRef.current < text.length) {
        iterRef.current += 0.4;
        frameRef.current = setTimeout(step, speed);
      } else {
        el.textContent = text;
      }
    }

    step();
  }, [text, speed]);

  const reset = useCallback(() => {
    if (frameRef.current) clearTimeout(frameRef.current);
    if (elRef.current) elRef.current.textContent = text;
  }, [text]);

  return (
    <Tag
      ref={elRef as React.RefObject<never>}
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {text}
    </Tag>
  );
}
