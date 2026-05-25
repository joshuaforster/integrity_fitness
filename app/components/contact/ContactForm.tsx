"use client";

import { useState } from "react";
import Button from "@/app/components/Button";

type ProgramOption = { id: string; title: string };
type ContactChannel = {
  label: string;
  value: string;
  href: string;
  description: string;
};

const PROGRAMS: readonly ProgramOption[] = [
  {
    id: "combined-diploma",
    title: "Combined Level 2 & 3 Personal Training Diploma",
  },
  { id: "gym-instructor", title: "Level 2 Gym Instructor Certificate" },
  { id: "pt-upgrade", title: "Level 3 Personal Training Qualification" },
  {
    id: "cpd-general",
    title: "Continued Professional Development / General Career Inquiry",
  },
] as const;

const DIRECT_CHANNELS: readonly ContactChannel[] = [
  {
    label: "Direct Email",
    value: "harry@integrityfitness.education",
    href: "mailto:harry@integrityfitness.education",
    description:
      "For rapid tutor confirmations, scheduling queries, and verification files.",
  },
  {
    label: "Direct Line",
    value: "+44 7795 033958",
    href: "tel:+447795033958",
    description:
      "Speak directly with Harry. Available Monday to Friday, 10am–6pm GMT.",
  },
  {
    label: "Norwich Base",
    value: "Complete Fitness Gym, Whiffler Road, NR3 2AW",
    href: "https://maps.google.com",
    description:
      "Our practical training infrastructure and assessment facility.",
  },
] as const;

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    selectedCourse: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSelectCourse(id: string) {
    setForm((prev) => ({ ...prev, selectedCourse: id }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.selectedCourse) return;
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-white py-20 md:py-28 border-t border-zinc-100"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column — High-End Minimal Form (Spans 7 Columns) */}
          <div className="lg:col-span-7 w-full">
            <div className="mb-12">
              <p className="text-[#CE1A19] text-xs font-bold tracking-[4px] uppercase mb-4">
                Get In Touch
              </p>
              <h2
                id="contact-heading"
                className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none"
              >
                Begin Your Progression.
              </h2>
              <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
            </div>

            {submitted ? (
              <div className="pt-4 border-l-2 border-[#CE1A19] pl-6 transition-all duration-300">
                <p className="text-zinc-400 text-xs font-bold tracking-[3px] uppercase mb-2">
                  Transmission Complete
                </p>
                <h3 className="text-zinc-950 text-xl font-black uppercase tracking-wide mb-3">
                  Inquiry Securely Logged
                </h3>
                <p className="text-zinc-600 text-base leading-relaxed max-w-md">
                  Thank you. A senior tutor will review your submission and
                  connect with you inside one business day to design your
                  syllabus architecture.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Step 1: Text Toggles for Course Selection */}
                <div>
                  <label className="block text-zinc-950 text-xs font-black uppercase tracking-widest mb-6">
                    01 / Select Target Program{" "}
                    <span className="text-[#CE1A19]">*</span>
                  </label>
                  <div
                    className="flex flex-col items-start space-y-4"
                    role="group"
                    aria-label="Course program selection"
                  >
                    {PROGRAMS.map((program) => {
                      const isSelected = form.selectedCourse === program.id;
                      return (
                        <button
                          key={program.id}
                          type="button"
                          onClick={() => handleSelectCourse(program.id)}
                          className="flex flex-col items-start text-left group outline-none"
                        >
                          <span
                            className={`text-sm md:text-base font-bold transition-colors duration-200 ${isSelected ? "text-zinc-950 font-black" : "text-zinc-400 group-hover:text-zinc-600"}`}
                          >
                            {program.title}
                          </span>
                          <span
                            className={`h-[2px] bg-[#CE1A19] transition-all duration-300 ease-out mt-1 ${isSelected ? "w-16" : "w-0 group-hover:w-8"}`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Minimalist Border-Bottom Form Inputs */}
                <div className="space-y-8">
                  <label className="block text-zinc-950 text-xs font-black uppercase tracking-widest">
                    02 / Your Identification & Context
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                      <label htmlFor="name" className="sr-only">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Full name *"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-950 py-3 text-zinc-950 text-sm placeholder:text-zinc-400 outline-none transition-colors duration-200"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="email" className="sr-only">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email address *"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-950 py-3 text-zinc-950 text-sm placeholder:text-zinc-400 outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                      <label htmlFor="phone" className="sr-only">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone number (optional)"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-950 py-3 text-zinc-950 text-sm placeholder:text-zinc-400 outline-none transition-colors duration-200"
                      />
                    </div>
                    <div className="flex items-center text-zinc-400 text-xs italic pt-4 sm:pt-0">
                      * Indicates a required operational path entry
                    </div>
                  </div>

                  <div className="relative pt-4">
                    <label htmlFor="message" className="sr-only">
                      Message / Background Context
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your fitness background, commercial objectives, and available schedule constraints... *"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-950 py-3 text-zinc-950 text-sm placeholder:text-zinc-400 outline-none resize-none transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Submit Action Block */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto px-10 shadow-sm"
                    disabled={
                      !form.selectedCourse ||
                      !form.name ||
                      !form.email ||
                      !form.message
                    }
                  >
                    Send Secure Inquiry
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column — Clean Asymmetrical Direct Communications Sidebar (Spans 5 Columns) */}
          <div className="lg:col-span-5 w-full lg:pl-16 lg:border-l border-zinc-200/80 mt-16 lg:mt-0">
            <p className="text-zinc-400 text-xs font-bold tracking-[4px] uppercase mb-4">
              Direct Channels
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight uppercase leading-none mb-6">
              Connect Instantly.
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-12" aria-hidden="true" />

            <div className="space-y-10">
              {DIRECT_CHANNELS.map((channel) => (
                <div
                  key={channel.label}
                  className="flex flex-col items-start group"
                >
                  <span className="text-zinc-400 text-[10px] font-black uppercase tracking-[2px] mb-1">
                    {channel.label}
                  </span>

                  <a
                    href={channel.href}
                    className="text-zinc-950 font-black text-lg tracking-wide hover:text-[#CE1A19] transition-colors duration-200 outline-none inline-flex items-center gap-1.5"
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      channel.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <span>{channel.value}</span>
                    {channel.href.startsWith("http") && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-zinc-400"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    )}
                  </a>

                  <p className="text-zinc-500 text-xs font-medium mt-2 leading-relaxed max-w-xs">
                    {channel.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
