export type MainCourse = {
  title: string;
  description: string;
  href: string;
};

export default function FlagshipCourseCard({ course }: { course: MainCourse }) {
  return (
    <div className="lg:col-span-7 [backdrop-filter:blur(40px)_saturate(130%)_brightness(0.85)] bg-zinc-950/[0.88] border border-white/[0.12] p-8 md:p-10 clip-br-lg shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] relative group">
      <div className="absolute top-0 right-0 bg-[#CE1A19] text-white text-[10px] font-black uppercase tracking-[2px] px-4 py-1.5 rounded-bl-sm">
        Flagship Diploma
      </div>

      <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
        Become a Personal Trainer
      </p>
      <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight mb-4 max-w-md">
        {course.title}
      </h3>
      <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
        {course.description}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
        <a
          href={course.href}
          className="inline-flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#CE1A19] transition-colors duration-200"
        >
          View Course Structure
          <span className="group-hover:translate-x-1.5 transition-transform duration-200">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
