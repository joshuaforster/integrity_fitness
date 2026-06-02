"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/ui/Button";
import SectionWrapper from "@/app/components/ui/SectionWrapper";
import LottieSuccess from "@/app/components/ui/LottieSuccess";
import CourseSelector, { type ProgramOption } from "./CourseSelector";
import ContactField from "./ContactField";
import DirectContactItem, { type ContactChannel } from "./DirectContactItem";
import { contactFormSection, contactPrograms, contactChannels } from "@/app/content/contact";

const PROGRAMS: ProgramOption[] = [...contactPrograms];
const DIRECT_CHANNELS: ContactChannel[] = [...contactChannels];

type FormState = {
  name: string;
  email: string;
  phone: string;
  selectedCourse: string;
  message: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
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
  const [mapVisible, setMapVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMapVisible(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: form */}
          <motion.div
            className="lg:col-span-7 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            custom={0}
            variants={fadeUp}
          >
            <div className="mb-10">
              <p className="text-[#CE1A19] text-xs font-bold tracking-widest uppercase mb-4">
                {contactFormSection.label}
              </p>
              <h2
                id="contact-heading"
                className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase leading-none"
              >
                {contactFormSection.heading}
              </h2>
              <div className="w-14 h-1 bg-[#CE1A19] mt-6" aria-hidden="true" />
              <p className="text-zinc-500 text-base leading-relaxed mt-6 max-w-lg">
                {contactFormSection.body}
              </p>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[...contactFormSection.trustBadges].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 border border-zinc-200 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </div>

            {submitted ? (
              <div className="pt-4 border border-zinc-100 rounded-xl p-8">
                <LottieSuccess />
                <div className="border-l-2 border-[#CE1A19] pl-6 mt-4">
                  <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-2">
                    Received
                  </p>
                  <h3 className="text-zinc-950 text-xl font-black uppercase tracking-wide mb-3">
                    {contactFormSection.successHeading}
                  </h3>
                  <p className="text-zinc-600 text-base leading-relaxed max-w-md">
                    {contactFormSection.successBody}
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
                  <p className="block text-zinc-400 text-xs font-black uppercase tracking-widest">
                    02 / Your Details
                  </p>

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
                      * Required field
                    </div>
                  </div>

                  <div className="relative pt-4">
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message" name="message" rows={4} required
                      placeholder="Tell us about your background, goals, and availability... *"
                      value={form.message} onChange={handleChange}
                      className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-950 py-3 text-zinc-950 text-sm placeholder:text-zinc-400 outline-none resize-none transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    type="submit" variant="primary" size="md"
                    className="w-full sm:w-auto px-10"
                    disabled={!form.selectedCourse || !form.name || !form.email || !form.message}
                  >
                    {contactFormSection.submitButton}
                  </Button>
                  <p className="text-zinc-400 text-xs leading-relaxed self-center">
                    {contactFormSection.spamNote}
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: channels + map */}
          <div className="lg:col-span-5 w-full space-y-8 lg:pt-2">

            {/* Contact channels */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={1}
              variants={fadeUp}
            >
              <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">
                {contactFormSection.directChannelsLabel}
              </p>
              <div className="space-y-3">
                {DIRECT_CHANNELS.map((channel, i) => (
                  <motion.div key={channel.label} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i + 2} variants={fadeUp}>
                    <DirectContactItem channel={channel} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Norwich / location map — SEO anchor for Norwich Norfolk */}
            <motion.div
              ref={mapRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={4}
              variants={fadeUp}
            >
              <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-3">
                {contactFormSection.mapLabel}
              </p>
              <div className="rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
                <div className="relative w-full aspect-[4/3]">
                  {mapVisible ? (
                    <iframe
                      title="Integrity Fitness Education — Complete Fitness Gym, Norwich, Norfolk"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.432658822557!2d1.2727145772346927!3d52.65215712648756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d783db56382903%3A0x6b63ca52f1e2f8bb!2sComplete%20Fitness%20Gym!5e0!3m2!1sen!2suk!4v1716656000000!5m2!1sen!2suk"
                      width="100%"
                      height="100%"
                      className="absolute inset-0 w-full h-full border-0"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-100 animate-pulse" />
                  )}
                </div>
                <div className="px-4 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <p className="text-zinc-700 text-xs font-bold uppercase tracking-wider leading-none">Complete Fitness Gym</p>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest leading-none mt-1">Whiffler Road · Norwich · Norfolk · NR3 2AW</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Complete+Fitness+Gym+Whiffler+Road+Norwich+NR3+2AW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#CE1A19] uppercase tracking-wider hover:underline"
                  >
                    Directions →
                  </a>
                </div>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed mt-3">
                {contactFormSection.mapNote}
              </p>
            </motion.div>

          </div>

        </div>
      </SectionWrapper>
    </section>
  );
}
