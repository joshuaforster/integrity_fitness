"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const details = [
  {
    icon: EnvelopeIcon,
    label: "Email",
    value: "harry@integrityfitness.education",
    href: "mailto:harry@integrityfitness.education",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+44 779 5033 958",
    href: "tel:+447795033958",
  },
  {
    icon: MapPinIcon,
    label: "Location",
    value: "Norwich, Norfolk, United Kingdom",
    href: null,
  },
  {
    icon: ClockIcon,
    label: "Response Time",
    value: "We aim to reply within one business day. Operating hours: Mon–Fri, 10am–6pm GMT.",
    href: null,
  },
];

const labelClass = "block text-gray-600 text-sm font-medium mb-2";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full bg-white border border-black/15 px-5 py-4 text-black text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#CE1A19] transition-colors";

  return (
    <section className="bg-white py-20">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Form — wider at 3/5 */}
          <div className="lg:col-span-3">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
              Send A Message
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-black uppercase leading-tight mb-5">
              We&apos;ll Get Back To You.
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" />

            {submitted ? (
              <div className="border border-[#CE1A19] bg-[#CE1A19]/5 px-8 py-10">
                <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-3">
                  Message Received
                </p>
                <p className="text-black text-lg font-semibold mb-2">
                  Thanks for getting in touch!
                </p>
                <p className="text-gray-500 text-base leading-relaxed">
                  We aim to respond within one business day. Keep an eye on
                  your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Full name <span className="text-[#CE1A19]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email address <span className="text-[#CE1A19]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+44 7700 000000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      Subject <span className="text-[#CE1A19]">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" disabled>Select a subject</option>
                      <option>Combined Level 2 &amp; 3 Diploma</option>
                      <option>Level 2 Gym Instructor</option>
                      <option>Level 3 Personal Training</option>
                      <option>Other Qualification</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message <span className="text-[#CE1A19]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us a little about yourself and what you're looking for..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Info — 2/5 */}
          <div className="lg:col-span-2">
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
              Contact Details
            </p>
            <h2 className="text-3xl font-bold text-black uppercase leading-tight mb-5">
              Reach Us Directly
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" />

            <div className="space-y-7">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className="w-11 h-11 bg-[#CE1A19]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#CE1A19]" />
                  </div>
                  <div>
                    <p className="text-black text-xs font-semibold tracking-[2px] uppercase mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="text-gray-600 text-base hover:text-[#CE1A19] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-base leading-relaxed">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
