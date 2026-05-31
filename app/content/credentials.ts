// ── Shared accreditation logos ────────────────────────────────────────────────

const CIMSPA_LOGO = "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/cimspa-logo-navy-box%20copy.png";
const ACTIVEIQ_LOGO = "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/activeiq.png";

// ── ReadyToStartCTA credential cards ─────────────────────────────────────────

export type CredentialCard =
  | { type: "brand"; src: string; alt: string; width: number; height: number; label: string }
  | { type: "metric"; value: string; label: string; description: string };

export const ctaCredentials: CredentialCard[] = [
  { type: "brand", src: CIMSPA_LOGO, alt: "CIMSPA Chartered Institute logo", width: 140, height: 32, label: "Accredited Partner" },
  { type: "brand", src: ACTIVEIQ_LOGO, alt: "Active IQ Awarding Body logo", width: 140, height: 32, label: "Approved Centre" },
  { type: "metric", value: "1:1", label: "Format", description: "Tailored private mentorship." },
  { type: "metric", value: "NR3", label: "Norwich", description: "Complete Fitness Gym base." },
];

