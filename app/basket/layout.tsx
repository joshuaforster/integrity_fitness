import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Basket | Integrity Fitness Education",
  robots: { index: false, follow: false },
};

export default function BasketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}