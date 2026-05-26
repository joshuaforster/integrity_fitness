"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import LottieSuccess from "@/app/components/ui/LottieSuccess";
import CourseSelector, { type ProgramOption } from "./CourseSelector";
import ContactField from "./ContactField";
import DirectContactItem, { type ContactChannel } from "./DirectContactItem";

const PROGRAMS: ProgramOption[] = [
  { id: "combined-diploma", title: "Combined Level 2 & 3 Personal Training Diploma" },
  { id: "gym-instructor", title: "Level 2 Gym Instructor Certificate" },
  { id: "pt-upgrade", title: "Level 3 Personal Training Qualification" },
  { id: "cpd-general", title: "Continued Professional Development / General Career Inquiry" },
];

const DIRECT_CHANNELS: ContactChannel[] = [
  {
    label: "Direct Email",
    value: "harry@integrityfitness.education",
    href: "mailto:harry@integrityfitness.education",
    description: "For rapid tutor confirmations, scheduling queries, and verification files.",
  },
  {
    label: "Direct Line",
    value: "+44 7795 033958",
    href: "tel:+447795033958",
    description: "Speak directly with Harry. Available Monday to Friday, 10am–6pm GMT.",
  },
  {
    label: "Norwich Base",
    value: "Complete Fitness Gym, Whiffler Road, NR3 2AW",
    href: "https://maps.google.com",
    description: "Our practical training infrastructure and assessment facility.",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  selectedCourse: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    selectedCourse: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!form.selectedCourse) return;
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-white texture-grid-light py-20 md:py-28 border-t border-zinc-100"
    >
      <SectionWrapper reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left: form */}
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
              <div className="pt-4">
                <LottieSuccess />
                <div className="border-l-2 border-[#CE1A19] pl-6 mt-4">
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
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <CourseSelector
                  programs={PROGRAMS}
                  selected={form.selectedCourse}
                  onSelect={(id) => setForm((prev) => ({ ...prev, selectedCourse: id }))}
                />

                <div className="space-y-8">
                  <label className="block text-zinc-950 text-xs font-black uppercase tracking-widest">
                    02 / Your Identification &amp; Context
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <ContactField
                      id="name" name="name" label="Full Name"
                      placeholder="Full name *" value={form.name}
                      onChange={handleChange} required autoComplete="name"
                    />
                    <ContactField
                      id="email" name="email" type="email" label="Email Address"
                      placeholder="Email address *" value={form.email}
                      onChange={handleChange} required autoComplete="email"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <ContactField
                      id="phone" name="phone" type="tel" label="Phone Number"
                      placeholder="Phone number (optional)" value={form.phone}
                      onChange={handleChange}
                    />
                    <div className="flex items-center text-zinc-400 text-xs italic pt-4 sm:pt-0">
                      * Indicates a required operational path entry
                    </div>
                  </div>

                  <div className="relative pt-4">
                    <label htmlFor="message" className="sr-only">Message / Background Context</label>
                    <textarea
                      id="message" name="message" rows={4} required
                      placeholder="Tell us about your fitness background, commercial objectives, and available schedule constraints... *"
                      value={form.message} onChange={handleChange}
                      className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-950 py-3 text-zinc-950 text-sm placeholder:text-zinc-400 outline-none resize-none transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit" variant="primary" size="md"
                    className="w-full sm:w-auto px-10 shadow-sm"
                    disabled={!form.selectedCourse || !form.name || !form.email || !form.message}
                  >
                    Send Secure Inquiry
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right: direct channels */}
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
                <DirectContactItem key={channel.label} channel={channel} />
              ))}
            </div>
          </div>

        </div>
      </SectionWrapper>
    </section>
  );
}
