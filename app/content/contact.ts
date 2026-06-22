// ── Contact page hero ─────────────────────────────────────────────────────────

export const contactHero = {
  label: "Contact",
  title: "Get In Touch",
  subtitle: "Have a question about a course or want to start your journey? Get in touch and Harry or Paris will get back to you.",
  image: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/HARRY-AND-PARIS-IFE-TGGNHR_026.jpg",
} as const;

// ── Contact form section ──────────────────────────────────────────────────────

export const contactFormSection = {
  label: "Get In Touch",
  heading: "Begin Your Journey.",
  body: "Tell us where you are and where you want to be. Harry or Paris will get back to you.",
  trustBadges: ["CIMSPA Accredited", "Active IQ Approved", "Responds in 24hrs", "Norwich, Norfolk"],
  successHeading: "We'll Be In Touch Shortly",
  successBody: "Harry or Paris will be in touch soon to map out your path forward.",
  directChannelsLabel: "Direct Channels",
  mapLabel: "Based In Norwich, Norfolk",
  mapNote: "You'll train at Complete Fitness Gym in Norwich, Norfolk, a professional facility purpose-built for coaching and assessment.",
  submitButton: "Send My Enquiry",
  spamNote: "No spam. Harry or Paris reads every message personally.",
} as const;

// ── Programs & channels ───────────────────────────────────────────────────────

export const contactPrograms = [
  { id: "combined-diploma", title: "Combined Level 2 & 3 Personal Training Diploma" },
  { id: "gym-instructor", title: "Level 2 Gym Instructor Certificate" },
  { id: "pt-upgrade", title: "Level 3 Personal Training Qualification" },
  { id: "cpd-general", title: "Continued Professional Development / General Career Inquiry" },
] as const;

export const contactChannels = [
  {
    label: "Email",
    value: "harry@integrityfitness.education",
    href: "mailto:harry@integrityfitness.education",
  },
  {
    label: "Phone",
    value: "+44 7795 033958",
    href: "tel:+447795033958",
  },
] as const;
