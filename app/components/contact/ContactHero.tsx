import PageHero from "@/app/components/PageHero";

export default function ContactHero() {
  return (
    <PageHero
      image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80"
      label="Integrity Fitness Education"
      title={<>Get In<br />Touch</>}
      subtitle="Have a question about our courses or want to start your journey? We'd love to hear from you."
      minHeight="55vh"
    />
  );
}
