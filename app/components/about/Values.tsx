import {
  ShieldCheckIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    icon: ShieldCheckIcon,
    title: "Honesty",
    description:
      "We are defined by honesty and strong moral principles. Everything we do is transparent, straightforward, and in the best interests of our students.",
  },
  {
    icon: StarIcon,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standard in fitness education. Our courses go far beyond the minimum requirement to produce coaches who are truly ready.",
  },
  {
    icon: UserGroupIcon,
    title: "Community",
    description:
      "We believe the best learning happens together. Our students become part of a network of likeminded individuals who support each other throughout their careers.",
  },
];

export default function Values() {
  return (
    <section className="bg-[#F5F5F5] py-28">
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[#CE1A19] text-xs font-semibold tracking-[4px] uppercase mb-5">
            What We Stand For
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight uppercase">
            Proven Principles.<br />Tried &amp; Tested Results.
          </h2>
          <div className="w-14 h-1 bg-[#CE1A19] mx-auto mt-6 mb-8" />
          <p className="text-gray-500 text-lg leading-relaxed">
            At Integrity, we operate with a clear set of values that shape every
            course, every session, and every interaction with our students.
            This isn&apos;t just a business — it&apos;s a mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
          {values.map((value) => (
            <div key={value.title} className="bg-white flex flex-col items-center text-center px-10 py-14 border border-black/5">
              <div className="w-16 h-16 rounded-full bg-[#CE1A19]/10 flex items-center justify-center mb-6">
                <value.icon className="size-8 text-[#CE1A19]" aria-hidden="true" />
              </div>
              <h3 className="text-black text-xl font-bold uppercase tracking-widest mb-4">
                {value.title}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
