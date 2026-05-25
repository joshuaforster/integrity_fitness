"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );

    const raf = requestAnimationFrame(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        // Elements already in the viewport on load appear immediately — no animation
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("in-view");
        } else {
          observer.observe(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
