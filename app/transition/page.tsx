import { Metadata } from "next";
import PageHero from "@/app/components/ui/PageHero";
import TransitionCalculator from "./TransitionCalculator";
import ReadyToStartCTA from "@/app/components/shared/ReadyToStartCTA";

export const metadata: Metadata = {
  title: "Can I Go Full-Time? PT Transition Calculator | Integrity Fitness Education",
  description:
    "See your month-by-month path from employed to self-employed PT. Enter your salary, target sessions and savings to find your break-even point, the dip, and when you beat your old income.",
  alternates: {
    canonical: "https://www.integrityfitness.education/transition",
  },
  openGraph: {
    title: "Can I Go Full-Time? PT Transition Calculator",
    description:
      "The income calculator answers 'what could I earn.' This answers the real question: 'can I actually afford to make the leap?' Month-by-month, pound for pound.",
    url: "https://www.integrityfitness.education/transition",
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg",
        width: 1200,
        height: 630,
        alt: "PT Transition Calculator — Integrity Fitness Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Can I Go Full-Time? PT Transition Calculator",
    description:
      "See the dip, the break-even, and the moment you beat your old salary — month by month.",
    images: [
      "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg",
    ],
  },
};

export default function TransitionPage() {
  return (
    <main className="bg-zinc-50">
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/WhatsApp%20Image%202026-06-19%20at%2016.27.36.jpeg"
        label="Transition Calculator"
        title="Can I Go Full-Time?"
        subtitle="Your month-by-month path from employed to self-employed PT — including the scary dip in the middle and exactly when you come out the other side."
        overlayStrength="heavy"
        size="sm"
      />
      <TransitionCalculator />
      <ReadyToStartCTA />
    </main>
  );
}
