"use client";

import { useState, useEffect, useRef, useSyncExternalStore, MouseEvent, TouchEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface TestimonialItem {
  name: string;
  body: string;
  date?: string;
  subtitle?: string;
}

const DEFAULT_TESTIMONIALS: readonly TestimonialItem[] = [
  {
    name: "Grace Sandford",
    date: "2025-08-15",
    body: "I am a fairly new client/student at Integrity Fitness Education but I already feel so well supported. The information I need is easily accessible and support sessions are also available when needed. It works well as I am able to study alongside work and I'm excited about the progress that I've made so far already and that's all thanks to Harry and Paris. If you are looking to get your level 2 & 3 qualifications, I couldn't recommend them enough!",
  },
  {
    name: "Viktoria Fitt",
    date: "2024-05-10",
    body: "I recently gained my Level 3 Personal Trainer qualification with Integrity Fitness Education, and couldn't recommend them more. Throughout the entire course I felt completely supported and was provided with a wealth of additional resources.",
  },
  {
    name: "Charlie Wade",
    date: "2025-08-20",
    body: "When it comes to tutoring you expect a top standard that not only delivers academic results but also people management for getting them through the course on what's bespoke for the student. Integrity fitness education does that amazingly and goes beyond that. Harry and Paris have only been an essential part of my education. I cannot thank the team enough. Without this company I wouldn't be doing so well in my PT business.",
  },
  {
    name: "Megan Brown",
    date: "2025-08-01",
    body: "Highly recommend Integrity Fitness to gain your qualification of becoming a personal trainer, through to additional qualifications to better yourself and what you can offer as a PT. Harry and Paris offer fantastic knowledge and support throughout and provide a genuine service. Highly recommend them!",
  },
  {
    name: "Poppy Hawkins",
    date: "2024-04-18",
    body: "Both Paris and Harry were amazing when it came to helping me to complete my Level 3 Personal Training qualification. They always made sure to answer any questions I had and made an effort to reach out and speak to me one on one about my progress.",
  },
  {
    name: "Aine Kuzeviciute",
    date: "2023-05-22",
    body: "Integrity Fitness Education have been brilliant. The content they provide has an incredible amount of information, the videos which help fill out the coursework and get ready for practical exams are also incredibly helpful. All the content is exceptional.",
  },
  {
    name: "Sandrine Modesti",
    date: "2022-03-14",
    body: "Really enjoying the course! Paris and Harry are both friendly, very knowledgeable, obviously love what they do, and are great at sharing their passion for the benefits of exercise and Personal Training. The course material is well structured.",
  },
  {
    name: "Hannah Lev",
    date: "2024-06-01",
    body: "Amazing experience! Both Paris and Harry have been super helpful throughout the whole course! They allowed me to go at my pace as I had a time frame before moving country and they were excellent in making sure I was able to achieve that!",
  },
] as const;

function getRelativeTimeString(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInDays = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));
  if (diffInDays < 30) return "Recent";
  const diffInMonths = Math.floor(diffInDays / 30.4375);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}

function Stars() {
  return (
    <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function TestimonialCard({ t, isMounted, theme }: { t: TestimonialItem; isMounted: boolean; theme: "dark" | "light" }) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) setIsClamped(el.scrollHeight > el.clientHeight + 2);
  }, []);

  const isDark = theme === "dark";

  return (
    <div className={`w-[310px] md:w-[380px] shrink-0 p-6 md:p-8 flex flex-col rounded-sm border select-none transition-colors duration-200 ${
      isDark ? "bg-zinc-900 border-zinc-800 shadow-xl" : "bg-white border-zinc-200/80 shadow-xs"
    }`}>
      <Stars />
      <div className="mb-6">
        <p
          ref={textRef}
          className={`text-sm leading-relaxed overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isDark ? "text-zinc-300" : "text-zinc-600"
          } ${expanded ? "max-h-[600px]" : "max-h-[7.5rem]"}`}
        >
          {t.body}
        </p>
        {isClamped && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="mt-3 text-xs font-bold tracking-wider uppercase text-[#CE1A19] hover:text-red-500 transition-colors outline-none"
          >
            {expanded ? "Read less ↑" : "Read more ↓"}
          </button>
        )}
      </div>

      <div className={`flex items-center gap-3 pt-5 border-t mt-auto ${isDark ? "border-zinc-800" : "border-zinc-100"}`}>
        <div className="w-9 h-9 rounded-full bg-[#CE1A19] flex items-center justify-center shrink-0" aria-hidden="true">
          <span className="text-white text-xs font-bold">{initials(t.name)}</span>
        </div>
        <div>
          <p className={`text-sm font-bold tracking-wide ${isDark ? "text-white" : "text-zinc-950"}`}>{t.name}</p>
          <p className="text-zinc-500 text-xs font-medium mt-0.5">
            {t.subtitle ?? (isMounted && t.date ? getRelativeTimeString(t.date) : "")}
          </p>
        </div>
      </div>
    </div>
  );
}

interface Props {
  theme?: "dark" | "light";
  testimonials?: TestimonialItem[];
  label?: string;
  heading?: string;
}

export default function TestimonialsSection({
  theme = "dark",
  testimonials,
  label = "Google Reviews",
  heading = "What Our Students Say",
}: Props) {
  const items = testimonials ?? DEFAULT_TESTIMONIALS;
  const isDark = theme === "dark";

  const scrollRef = useRef<HTMLDivElement>(null);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleScrollAction = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 400;
    container.scrollTo({
      left: container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
      behavior: "smooth"
    });
  };

  const startDrag = (clientX: number) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(clientX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const doDrag = (clientX: number) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;
    const x = clientX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeftState - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <section className={`py-20 md:py-28 overflow-hidden border-y transition-colors duration-200 ${
      isDark ? "bg-zinc-950 border-zinc-900" : "bg-zinc-50 border-zinc-200/80"
    }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className={`text-xs font-bold tracking-[4px] uppercase mb-4 ${isDark ? "text-zinc-400" : "text-[#CE1A19]"}`}>
              {label}
            </p>
            <h2 className={`text-3xl md:text-5xl font-black tracking-tight leading-none uppercase ${isDark ? "text-white" : "text-zinc-950"}`}>
              {heading}
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => handleScrollAction("left")}
              aria-label="Scroll reviews left"
              className={`w-11 h-11 flex items-center justify-center border transition-all duration-200 outline-none rounded-sm active:scale-95 ${
                isDark
                  ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-white hover:text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950"
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => handleScrollAction("right")}
              aria-label="Scroll reviews right"
              className={`w-11 h-11 flex items-center justify-center border transition-all duration-200 outline-none rounded-sm active:scale-95 ${
                isDark
                  ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-white hover:text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-950 hover:text-zinc-950"
              }`}
            >
              <ChevronRightIcon className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseDown={(e: MouseEvent) => startDrag(e.clientX)}
          onMouseMove={(e: MouseEvent) => doDrag(e.clientX)}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={(e: TouchEvent) => startDrag(e.touches[0].clientX)}
          onTouchMove={(e: TouchEvent) => doDrag(e.touches[0].clientX)}
          onTouchEnd={stopDrag}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 cursor-grab select-none active:cursor-grabbing snap-x snap-mandatory lg:snap-none will-change-scroll"
        >
          {items.map((t, idx) => (
            <div key={idx} className="snap-center shrink-0">
              <TestimonialCard
                t={t}
                isMounted={isMounted}
                theme={theme}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
