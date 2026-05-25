"use client";

import React from "react";

type ValueItem = {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  title: string;
  description: string;
};

const VALUES: readonly ValueItem[] = [
  {
    title: "Honesty",
    description:
      "We are defined by honesty and strong moral principles. Everything we do is transparent, straightforward, and in the absolute best interest of our student roster.",
    icon: (props) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
        />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest technical benchmarks in fitness education. Our material goes far beyond basic syllabus criteria to construct industry-ready coaches.",
    icon: (props) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499c.172-.367.694-.367.866 0l2.254 4.816 5.008.643c.404.052.566.551.27.836l-3.601 3.498.88 4.974c.071.402-.353.71-.708.514L12 18.354l-4.43 2.422c-.354.197-.779-.111-.708-.514l.88-4.974-3.601-3.498c-.296-.285-.135-.784.27-.836l5.008-.643 2.254-4.816Z"
        />
      </svg>
    ),
  },
  {
    title: "Community",
    description:
      "We believe elite skill development happens together. Our students gain lifelong access to an integrated professional network built to collaborate over career metrics.",
    icon: (props) => (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
] as const;

export default function Values() {
  return (
    <section
      aria-labelledby="values-heading"
      className="bg-zinc-50 texture-dots-light py-20 md:py-28 border-t border-zinc-200/80"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        {/* Focused Minimal Header Stack */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
            What We Stand For
          </p>
          <h2
            id="values-heading"
            className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight uppercase"
          >
            Proven Principles.
            <br />
            Tried &amp; Tested Results.
          </h2>
          <div
            className="w-14 h-1 bg-[#CE1A19] mx-auto mt-6 mb-6"
            aria-hidden="true"
          />
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
            At Integrity, we operate with a clear set of values that shape every
            course, every session, and every interaction with our students. This
            isn&apos;t just a business — it&apos;s a mission.
          </p>
        </div>

        {/* Elegant Left-Aligned Columns Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-0">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col items-start text-left border-l-2 border-zinc-200 pl-6 first:border-l-0 first:pl-0"
            >
              {/* Asset Box */}
              <div
                className="w-12 h-12 flex items-center justify-center text-[#CE1A19] mb-5"
                aria-hidden="true"
              >
                <value.icon className="w-7 h-7 stroke-[1.75]" />
              </div>

              {/* Header */}
              <h3 className="text-zinc-950 text-sm font-extrabold uppercase tracking-[2px] mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
