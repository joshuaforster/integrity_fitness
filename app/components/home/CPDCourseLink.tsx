export type CPDCourse = {
  title: string;
  href: string;
};

export default function CPDCourseLink({ course }: { course: CPDCourse }) {
  return (
    <a
      href={course.href}
      className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 transition-all duration-200 rounded-sm group text-left"
    >
      <span className="text-xs font-medium text-white pr-4">
        {course.title}
      </span>
      <span className="text-white group-hover:translate-x-1 transition-transform text-sm">
        →
      </span>
    </a>
  );
}
