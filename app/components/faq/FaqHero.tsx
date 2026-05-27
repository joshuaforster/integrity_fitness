import PageHero from "@/app/components/PageHero";

export default function FaqHero() {
  return (
    <PageHero
      image="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Duncan/20221115-IFE-CF_010.JPG"
      label="Got Questions?"
      title={
        <>
          Frequently Asked <br className="hidden md:inline" /> Questions
        </>
      }
      subtitle="Everything you need to know about course structures, international accreditations, and flexible financing choices."
      minHeight="60vh"
    />
  );
}
