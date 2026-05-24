import Button from "@/app/components/Button";

export default function FaqCTA() {
  return (
    <section className="bg-white py-24 border-t border-black/10">
      <div className="reveal mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-4">
          Still Have Questions?
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-black uppercase leading-tight mb-6">
          We&apos;re Happy To Help
        </h2>
        <div className="w-14 h-1 bg-[#CE1A19] mx-auto mb-8" />
        <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          Can&apos;t find the answer you&apos;re looking for? Reach out directly
          and we&apos;ll get back to you as soon as possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contact" variant="primary" size="lg">
            Get In Touch
          </Button>
          <Button href="mailto:harry@integrityfitness.education" variant="outline-light" size="lg" external>
            Email Us Directly
          </Button>
        </div>
      </div>
    </section>
  );
}
