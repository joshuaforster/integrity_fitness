import PageHero from "@/app/components/PageHero";

export default function ContactHero() {
  return (
    <PageHero
      images={[
        "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/HARRY-AND-PARIS-IFE-TGGNHR_026.jpg",
        "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20Norwich/HARRY-PARIS-CLOE-2-20220124-IFE-TGGNCC010.jpg",
        "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/CFG%20Group%20induction%20final%20edits/20230329-IFE-CF_001.JPG",
        "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/FITNESS-DISCUSSION-IFE-TGGNHR_006.jpg",
      ]}
      label="Integrity Fitness Education"
      title={<>Get In<br />Touch</>}
      subtitle="Have a question about our courses or want to start your journey? We'd love to hear from you."
      minHeight="55vh"
      interval={7000}
    />
  );
}
