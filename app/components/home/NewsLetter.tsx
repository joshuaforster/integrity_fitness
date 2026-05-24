import Button from "@/app/components/Button";

export default function Newsletter() {
  return (
    <section className="bg-[#111111] py-20">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

          <div>
            <p className="text-white/50 text-xs font-semibold tracking-[4px] uppercase mb-4">
              Stay Updated
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Join Our Newsletter
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-6" />
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Be the first to hear about new courses, industry tips, and career
              advice straight from our qualified trainers.
            </p>
          </div>

          <div className="mt-10 lg:mt-0">
            <form className="space-y-3" noValidate>
              <div className="flex flex-col sm:flex-row gap-0">
                <div className="sr-only">
                  <label htmlFor="newsletter-name">Your Name</label>
                  <label htmlFor="newsletter-email">Email Address</label>
                </div>
                <input
                  id="newsletter-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  className="flex-1 bg-white/5 border border-white/15 sm:border-r-0 px-4 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CE1A19] focus:z-10 relative transition-colors duration-200"
                />
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  autoComplete="email"
                  className="flex-1 bg-white/5 border border-white/15 sm:border-r-0 px-4 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CE1A19] focus:z-10 relative transition-colors duration-200"
                />
                <Button type="submit" variant="primary" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="text-white/30 text-xs">
                No spam. Unsubscribe at any time.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
