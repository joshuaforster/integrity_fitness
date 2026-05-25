import PageHero from "@/app/components/PageHero";

export default function FaqHero() {
  return (
    <PageHero
      image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
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
