export default function Newsletter() {
  return (
    <section className="bg-[#111111] py-20">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

          <div>
            <p className="text-white text-xs font-semibold tracking-[4px] uppercase mb-4 opacity-60">
              Stay Updated
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Join Our Newsletter
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-6" />
            <p className="text-white text-lg leading-relaxed max-w-md">
              Be the first to hear about new courses, industry tips, and career
              advice straight from our qualified trainers.
            </p>
          </div>

          <div className="mt-10 lg:mt-0">
            <form className="space-y-4">
              <div>
                <label htmlFor="newsletter-name" className="block text-white text-xs font-semibold tracking-widest uppercase mb-2">
                  Your Name
                </label>
                <input
                  id="newsletter-name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Smith"
                  autoComplete="name"
                  className="w-full bg-white/5 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CE1A19] transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="newsletter-email" className="block text-white text-xs font-semibold tracking-widest uppercase mb-2">
                  Email Address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  autoComplete="email"
                  className="w-full bg-white/5 border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CE1A19] transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#CE1A19] text-white py-4 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors duration-200"
              >
                Subscribe
              </button>
              <p className="text-white/40 text-xs text-center">
                No spam. Unsubscribe at any time.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
