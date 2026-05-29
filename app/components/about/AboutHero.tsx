import PageHero from "@/app/components/ui/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      images={[
        "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/Godigital%20grant%20-%20Revel/Revel%20Studios%20IFE-8.jpg",
      ]}
      label="Integrity Fitness Education"
      title="About Us"
      subtitle="Based in Norwich, Norfolk — we don't just teach qualifications. We build careers that last."
      minHeight="55vh"
      interval={7000}
    />
  );
}
