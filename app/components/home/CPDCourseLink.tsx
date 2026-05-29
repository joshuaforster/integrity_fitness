export type CPDCourse = {
  title: string;
  href: string;
};

export default function CPDCourseLink({ course }: { course: CPDCourse }) {
  return (
    <a
      href={course.href}
      className="flex items-center justify-between p-4 [backdrop-filter:blur(40px)_saturate(130%)_brightness(0.85)] bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.08] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-200 rounded-xl group text-left"
    >
      <span className="text-xs font-medium text-zinc-300 group-hover:text-white pr-4 transition-colors duration-200">
        {course.title}
      </span>
      <span className="text-zinc-500 group-hover:text-[#CE1A19] group-hover:translate-x-1 transition-all duration-200 text-sm flex-shrink-0">
        →
      </span>
    </a>
  );
}
