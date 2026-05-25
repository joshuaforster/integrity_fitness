"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface TestimonialItem {
  name: string;
  body: string;
  date?: string;
  subtitle?: string;
}

const defaultTestimonials: TestimonialItem[] = [
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
];

const VISIBLE_COUNT = 3;

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
    <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#e7e300]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

interface CardProps {
  t: TestimonialItem;
  isMounted: boolean;
  theme: "dark" | "light";
  asGrid?: boolean;
}

function TestimonialCard({ t, isMounted, theme, asGrid }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) setIsClamped(el.scrollHeight > el.clientHeight + 2);
  }, []);

  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-white/5 border border-white/10"
    : "bg-white border border-black/10";

  const bodyClass = isDark ? "text-white" : "text-gray-700";
  const nameClass = isDark ? "text-white" : "text-black";
  const metaClass = isDark ? "text-white/60" : "text-gray-600";
  const borderClass = isDark ? "border-white/10" : "border-black/10";

  const sizeClass = asGrid
    ? "w-full"
    : "w-full md:w-[calc(33.333%-16px)] flex-shrink-0";

  return (
    <div className={`${cardClass} ${sizeClass} p-8 flex flex-col`}>
      <Stars />

      <div className="mb-8">
        <p
          ref={textRef}
          className={`${bodyClass} text-sm leading-relaxed overflow-hidden transition-[max-height] duration-300 ease-in-out ${expanded ? "max-h-[600px]" : "max-h-[7.5rem]"}`}
        >
          {t.body}
        </p>
        {isClamped && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`mt-2 text-xs font-semibold tracking-widest uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${isDark ? "text-white hover:text-white/70" : "text-[#CE1A19] hover:text-red-400"}`}
          >
            {expanded ? "Read less ↑" : "Read more ↓"}
          </button>
        )}
      </div>

      <div className={`flex items-center gap-3 pt-6 border-t ${borderClass} mt-auto`}>
        <div className="w-9 h-9 rounded-full bg-[#CE1A19] flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <span className="text-white text-xs font-bold">{initials(t.name)}</span>
        </div>
        <div>
          <p className={`${nameClass} text-sm font-semibold`}>{t.name}</p>
          <p className={`${metaClass} text-xs`}>
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
  const items = testimonials ?? defaultTestimonials;
  const isCarousel = items.length > VISIBLE_COUNT;
  const MAX_INDEX = isCarousel ? items.length - VISIBLE_COUNT : 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const goNext = () => setCurrentIndex((prev) => (prev >= MAX_INDEX ? 0 : prev + 1));
  const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? MAX_INDEX : prev - 1));

  const isDark = theme === "dark";

  const sectionBg = isDark ? "bg-[#111111]" : "bg-[#F8F8F8]";
  const headingClass = isDark ? "text-white" : "text-black";
  const navBtnClass = isDark
    ? "border-white/20 text-white hover:border-[#CE1A19] hover:text-[#CE1A19]"
    : "border-black/15 text-black hover:border-[#CE1A19] hover:text-[#CE1A19]";
  const dotInactiveClass = isDark ? "bg-white/30 hover:bg-white/60" : "bg-black/20 hover:bg-black/40";

  return (
    <section className={`${sectionBg} py-24 overflow-hidden`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14">
          <p className={`${isDark ? "text-white" : "text-[#CE1A19]"} text-xs font-semibold tracking-[4px] uppercase mb-4`}>
            {label}
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold ${headingClass} leading-tight max-w-xl`}>
            {heading}
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
        </div>

        {isCarousel ? (
          <>
            <div className="overflow-hidden">
              <div className={`flex items-start gap-6 transition-transform duration-500 ease-out slider-pos-${currentIndex}`}>
                {items.map((t) => (
                  <TestimonialCard key={t.name} t={t} isMounted={isMounted} theme={theme} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous testimonial"
                className={`w-10 h-10 flex items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ceb919] ${navBtnClass}`}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
                {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === currentIndex}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "bg-[#CE1A19] w-6" : `w-2 ${dotInactiveClass}`
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next testimonial"
                className={`w-10 h-10 flex items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CE1A19] ${navBtnClass}`}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className={`grid grid-cols-1 gap-6 ${items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
            {items.map((t) => (
              <TestimonialCard key={t.name} t={t} isMounted={isMounted} theme={theme} asGrid />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
