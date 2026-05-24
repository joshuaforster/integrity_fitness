import Image from "next/image"
import Button from "@/app/components/Button"

export default function Mission() {
  return (
    <section className="bg-white py-24">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — statement */}
          <div>
            <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-6">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">
              One To One Learning Like No Other
            </h2>
            <div className="w-14 h-1 bg-[#CE1A19] mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At Integrity, we take pride in giving the best possible experience
              by preparing our students to enter the fitness industry confidently
              and ready to thrive.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Our team bring the course to life with plenty of professional
              experience and real, applicable tips and tricks that they have
              picked up over the years.
            </p>
            <Button href="/about" variant="primary" className="w-full sm:w-auto">
              About Us
            </Button>
          </div>

          {/* Right — quote over image with dark overlay */}
          <div className="relative overflow-hidden min-h-[420px]">
            <Image
              src="/harry.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/75" />
            <div className="relative z-10 p-12 flex flex-col justify-center min-h-[420px]">
              <p className="text-5xl text-[#CE1A19] font-serif mb-4">&quot;</p>
              <blockquote className="text-white text-xl leading-relaxed italic mb-8">
                Develop a passion for learning. If you do, you will never cease to
                grow.
              </blockquote>
              <p className="text-white text-sm tracking-widest uppercase">
                — Anthony J. D&apos;Angelo
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}