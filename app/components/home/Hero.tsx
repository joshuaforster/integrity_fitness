

export default function Hero() {
  return (
    <section className="relative  bg-black overflow-hidden flex items-center pt-26 -mt-[120px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/5319998-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/30" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-12">
          <p className="text-red-500 text-xs font-semibold tracking-[4px] uppercase mb-4">
            Integrity Fitness Education · Norwich, Norfolk
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl mb-4 text-white">
            Raising The Standards Of Personal Training Qualifications
          </h1>

          <div className="w-14 h-1 bg-[#CE1A19] mb-4" />

          <p className="text-white text-base max-w-lg leading-relaxed mb-8">
            One-to-one learning like no other. We prepare the next generation of
            personal trainers to enter the fitness industry with confidence.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#CE1A19] text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-red-700 transition-colors">
              Become A Personal Trainer
            </button>
            <button className="border-2 border-white/40 text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:border-white/70 transition-colors">
              View Qualifications
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-10 pt-6 border-t border-white/10">
            {[
              { value: "1:1", label: "Learning" },
              { value: "100%", label: "Pass Rate" },
              { value: "Level 3", label: "Qualified" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-[#CE1A19]">
                  {stat.value}
                </p>
                <p className="text-xs text-white uppercase tracking-[2px] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
