"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { qualificationsSection, cpdCourses as CPD_COURSES } from "@/app/content/home";

export interface CourseCardProps {
  badge: string | null;
  level: string;
  title: string;
  body: string;
  href: string;
  cpd?: boolean;
}

function levelWatermark(level: string): string {
  return level.replace("Level ", "").replace(" & ", "+");
}

export default function CourseCard({ badge, level, title, body, href, cpd }: CourseCardProps) {
  const mark = levelWatermark(level);

  return (
    <a
      href={href}
      className="relative flex flex-col h-full bg-white rounded-2xl overflow-hidden
        border border-zinc-200
        shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)]
        hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)]
        hover:border-[#CE1A19]
        transition-all duration-300 group
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2"
    >
      {/* Permanent red top accent bar */}
      <div className="h-[3px] w-full bg-[#CE1A19] flex-shrink-0" />

      {/* Background level watermark */}
      <span
        aria-hidden="true"
        className="absolute -bottom-3 -right-2 text-[88px] font-black leading-none select-none pointer-events-none text-zinc-100 tracking-tight group-hover:text-[#CE1A19]/10 transition-colors duration-300"
      >
        {mark}
      </span>

      <div className="relative flex flex-col h-full p-6 pt-5">

        {/* Level + badge row */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <span className="text-[#CE1A19] text-[10px] font-black uppercase tracking-[0.18em] leading-none">
            {level}
          </span>
          {badge && (
            <span className="bg-[#CE1A19] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 leading-none">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[1.15rem] font-black text-zinc-950 leading-tight mb-3 group-hover:text-[#CE1A19] transition-colors duration-300">
          {title}
        </h3>

        {/* Body */}
        <p className="text-zinc-500 text-[13px] leading-relaxed flex-1 mb-5">
          {body}
        </p>

        {/* CPD course list */}
        {cpd && (
          <ul className="space-y-2 mb-5">
            {CPD_COURSES.map((c) => (
              <li
                key={c.title}
                className="text-zinc-600 text-xs font-medium leading-snug flex items-start gap-2"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#CE1A19] shrink-0" />
                {c.title}
              </li>
            ))}
          </ul>
        )}

        {/* CTA row */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
          <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.18em] group-hover:text-[#CE1A19] transition-colors duration-200">
            {cpd ? qualificationsSection.viewAllCPD : qualificationsSection.viewCourse}
          </span>
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png"
              alt="Active IQ"
              className="h-4 w-auto object-contain opacity-20 group-hover:opacity-70 transition-opacity duration-300"
            />
            <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center shrink-0
              group-hover:bg-[#CE1A19] group-hover:border-[#CE1A19] transition-all duration-200">
              <ArrowRightIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-px transition-all duration-200" />
            </span>
          </div>
        </div>

      </div>
    </a>
  );
}
