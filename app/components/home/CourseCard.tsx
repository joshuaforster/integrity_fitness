"use client";

import { qualificationsSection, cpdCourses as CPD_COURSES } from "@/app/content/home";

export interface CourseCardProps {
  badge: string | null;
  level: string;
  title: string;
  body: string;
  href: string;
  cpd?: boolean;
}

export default function CourseCard({ badge, level, title, body, href, cpd }: CourseCardProps) {
  return (
    <a
      href={href}
      className="relative flex flex-col h-full bg-white border border-zinc-950 rounded-2xl p-6 group overflow-hidden
        shadow-[0_2px_4px_rgba(0,0,0,0.06),0_6px_24px_rgba(0,0,0,0.08)]
        hover:shadow-[0_4px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.14)]
        hover:border-zinc-700
        transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CE1A19] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between mb-3 gap-2">
        <span className="text-[#CE1A19] text-xs font-black uppercase tracking-widest leading-none mt-0.5">
          {level}
        </span>
        {badge && (
          <span className="bg-[#CE1A19] text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-base font-black text-zinc-900 leading-tight mb-2">
        {title}
      </h3>
      <p className="text-zinc-700 text-xs leading-relaxed flex-1 mb-4">
        {body}
      </p>

      {cpd && (
        <ul className="space-y-1.5 mb-4">
          {CPD_COURSES.map((c) => (
            <li key={c.title} className="text-zinc-600 text-xs font-medium leading-snug flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
              {c.title}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-1.5 pt-3 border-t border-zinc-200 text-xs font-bold text-zinc-600 uppercase tracking-wider group-hover:text-[#CE1A19] transition-colors duration-200">
        {cpd ? qualificationsSection.viewAllCPD : qualificationsSection.viewCourse}
        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
      </div>
    </a>
  );
}
