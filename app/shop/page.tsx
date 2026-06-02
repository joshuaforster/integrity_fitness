import { type Metadata } from "next";
import qualifications from "@/app/data/qualifications";
import PageHero from "@/app/components/ui/PageHero";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop | Integrity Fitness Education",
  description:
    "Browse and enrol on CIMSPA-accredited personal training and CPD courses from Integrity Fitness Education in Norwich.",
};

export default function ShopPage() {
  const ptCourses = qualifications.filter((q) => q.category === "personal-training");
  const cpdCourses = qualifications.filter((q) => q.category === "cpd");

  return (
    <main>
      <PageHero
        image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg"
        label="Shop"
        title="Courses"
        subtitle="Browse every qualification and CPD award. Enrol directly or explore each course in full."
        overlayStrength="heavy"
      />
      <ShopClient ptCourses={ptCourses} cpdCourses={cpdCourses} />
    </main>
  );
}
