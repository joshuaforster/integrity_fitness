export type CourseLink = {
  title: string;
  description: string;
  href: string;
};

export default function CourseLinkCard({ course }: { course: CourseLink }) {
  return (
    <a
      href={course.href}
      className="block p-5 [backdrop-filter:blur(40px)_saturate(130%)_brightness(0.85)] bg-zinc-950/[0.70] border border-white/[0.08] hover:border-white/[0.20] hover:bg-zinc-950/[0.88] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-200 rounded-xl group"
    >
      <h4 className="text-sm font-bold text-white tracking-wide transition-colors group-hover:text-[#CE1A19]">
        {course.title}
      </h4>
      <p className="text-xs text-white/60 mt-2 leading-relaxed line-clamp-2">
        {course.description}
      </p>
    </a>
  );
}
