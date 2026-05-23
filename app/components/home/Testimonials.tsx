"use client";

import { useState, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const testimonials = [
  {
    name: "Grace Sandford",
    meta: "Local Guide · 12 reviews · 8 photos",
    time: "9 months ago",
    body: "I am a fairly new client/student at Integrity Fitness Education but I already feel so well supported. The information I need is easily accessible and support sessions are also available when needed. It works well as I am able to study alongside work and I'm excited about the progress that I've made so far already and that's all thanks to Harry and Paris. If you are looking to get your level 2 & 3 qualifications, I couldn't recommend them enough!",
  },
  {
    name: "Viktoria Fitt",
    meta: "4 reviews",
    time: "2 years ago",
    body: "I recently gained my Level 3 Personal Trainer qualification with Integrity Fitness Education, and couldn't recommend them more. Throughout the entire course I felt completely supported and was provided with a wealth of additional resources.",
  },
  {
    name: "Charlie Wade",
    meta: "3 reviews",
    time: "9 months ago",
    body: "When it comes to tutoring you expect a top standard that not only delivers academic results but also people management for getting them through the course on what's bespoke for the student. Integrity fitness education does that amazingly and goes beyond that. Harry and Paris have only been an essential part of my education. I cannot thank the team enough. Without this company I wouldn't be doing so well in my PT business.",
  },
  {
    name: "Megan Brown",
    meta: "12 reviews",
    time: "9 months ago",
    body: "Highly recommend Integrity Fitness to gain your qualification of becoming a personal trainer, through to additional qualifications to better yourself and what you can offer as a PT. Harry and Paris offer fantastic knowledge and support throughout and provide a genuine service. Highly recommend them!",
  },
  {
    name: "Poppy Hawkins",
    meta: "1 review",
    time: "2 years ago",
    body: "Both Paris and Harry were amazing when it came to helping me to complete my Level 3 Personal Training qualification. They always made sure to answer any questions I had and made an effort to reach out and speak to me one on one about my progress.",
  },
  {
    name: "Aine Kuzeviciute",
    meta: "3 reviews",
    time: "3 years ago",
    body: "Integrity Fitness Education have been brilliant. The content they provide has an incredible amount of information, the videos which help fill out the coursework and get ready for practical exams are also incredibly helpful. All the content is exceptional.",
  },
  {
    name: "Sandrine Modesti",
    meta: "12 reviews · 1 photo",
    time: "4 years ago",
    body: "Really enjoying the course! Paris and Harry are both friendly, very knowledgeable, obviously love what they do, and are great at sharing their passion for the benefits of exercise and Personal Training. The course material is well structured.",
  },
  {
    name: "Hannah Lev",
    meta: "1 review",
    time: "2 years ago",
    body: "Amazing experience! Both Paris and Harry have been super helpful throughout the whole course! They allowed me to go at my pace as I had a time frame before moving country and they were excellent in making sure I was able to achieve that!",
  },
];

const PER_PAGE = 3;
const PAGE_COUNT = Math.ceil(testimonials.length / PER_PAGE);

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#CE1A19]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((next: number, dir: "next" | "prev") => {
    setDirection(dir);
    setPage(next);
    setAnimKey((k) => k + 1);
  }, []);

  const goNext = () => goTo((page + 1) % PAGE_COUNT, "next");
  const goPrev = () => goTo((page - 1 + PAGE_COUNT) % PAGE_COUNT, "prev");

  const slice = testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="bg-[#111111] py-24">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
            Google Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-xl">
            What Our Students Say
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mt-6" />
        </div>

        {/* Cards */}
        <div className="overflow-hidden">
          <div
            key={animKey}
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
              direction === "next" ? "testimonial-slide-next" : "testimonial-slide-prev"
            }`}
          >
            {slice.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 p-8 flex flex-col"
              >
                <Stars />
                <p className="text-white text-sm leading-relaxed flex-1 mb-8">
                  {t.body}
                </p>
                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#CE1A19] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{initials(t.name)}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-[#CE1A19] hover:text-[#CE1A19] transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i, i > page ? "next" : "prev")}
                aria-label={`Page ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "bg-[#CE1A19] w-6" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-[#CE1A19] hover:text-[#CE1A19] transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
