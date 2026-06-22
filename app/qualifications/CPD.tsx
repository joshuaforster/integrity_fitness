import CPDCourseGrid from "./CPDCourseGrid";
import qualifications from "../content/qualifications";

export default function CPD() {
  const CPD_COURSES = qualifications.filter((q) => q.category === "cpd");
  return (
    <section
      aria-labelledby="cpd-heading"
      className="bg-[#18181B] texture-dots-dark angle-tl pb-20 md:pb-28 pt-[132px] md:pt-[164px]"
    >
      <div className="reveal mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-20 mb-12">
            <div>
              <p className="text-[#CE1A19] text-xs font-black tracking-widest uppercase mb-4">
                Specialist Upgrades
              </p>
              <h2
                id="cpd-heading"
                className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none"
              >
                Continued Professional
                <br />
                <span className="text-white">Development</span>
              </h2>
              <div className="w-12 h-[3px] bg-[#ffffff] mt-6" aria-hidden="true" />
            </div>
            <p className="text-white text-sm md:text-base leading-relaxed max-w-sm lg:pb-2">
              Add specialist certifications on top of your core PT qualification,
              unlocking new client groups and satisfying employer insurance
              requirements from day one.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-7 hover:border-white/[0.12] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  When should I do these?
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                CPD courses sit alongside or after your core qualification. They
                expand what you can legally and professionally offer to specific
                client groups, many employers and insurers expect at least some
                before you step on the gym floor.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-7 hover:border-white/[0.12] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  Which should I do first?
                </h3>
              </div>
              <p className="text-white  text-sm leading-relaxed">
                Start with{" "}
                <strong className="text-white  font-semibold">Emergency First Aid</strong> 
                most gym roles and insurance policies require it. Add{" "}
                <strong className="text-zinc-200 font-semibold">Mental Health Awareness</strong>{" "}
                next. Once established,{" "}
                <strong className="text-zinc-200 font-semibold">Pre &amp; Post Natal</strong>{" "}
                opens a high-demand client group most PTs cannot yet serve.
              </p>
            </div>
          </div>
        </div>

        <CPDCourseGrid courses={CPD_COURSES} />
      </div>
    </section>
  );
}
