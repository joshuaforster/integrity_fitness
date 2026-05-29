import PageHero from "@/app/components/PageHero";

export default function FaqHero() {
  return (
    <PageHero
      images={[
        "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
        "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/ANATOMY-AND-PHYSIOLOGY-THEORY-EXAM4-IFE-TGGNHR_015.jpg",
        "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-PARIS-CLOE-2-20220124-IFE-TGGNCC010.jpg",
      ]}
      label="Got Questions?"
      title={
        <>
          Frequently Asked <br className="hidden md:inline" /> Questions
        </>
      }
      subtitle="Everything you need to know about course structures, international accreditations, and flexible financing choices."
      minHeight="60vh"
      interval={6500}
    />
  );
}
