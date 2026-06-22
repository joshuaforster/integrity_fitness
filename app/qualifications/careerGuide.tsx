import React from 'react'
import PTCourseList from './PTCourseList'
import qualifications from "@/app/data/qualifications";

export default function CareerGuide() {
    const PT_COURSES = qualifications.filter(
      (q) => q.category === "personal-training",
    );
  return (
    <div>
            {/* 1. Guided Career Tracks: Personal Training */}
            <section
              aria-labelledby="pt-heading"
              className="py-20 md:py-28 border-b border-zinc-200/60"
            >
              <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-10 md:mb-12">
                  <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
                    Pt qualification in norwich
                  </p>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                      <h2
                        id="pt-heading"
                        className="text-2xl md:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-none"
                      >
                        Personal Training
                      </h2>
                      <div className="w-14 h-1 bg-[#CE1A19] mt-5" aria-hidden="true" />
                    </div>
                    <div className="border-l-2 border-zinc-200 pl-5 max-w-md">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-2">
                        Where do you start?
                      </h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        If you&apos;re completely new to fitness coaching, the{" "}
                        <strong>Combined Diploma</strong> is the right place to start.
                        If you already hold an accredited Level 2 certificate, choose
                        the standalone <strong>Level 3 Qualification</strong> to build
                        on what you&apos;ve already got.
                      </p>
                    </div>
                  </div>
                </div>
      
                <PTCourseList courses={PT_COURSES} className="w-full" />
              </div>
            </section>
    </div>
  )
}
