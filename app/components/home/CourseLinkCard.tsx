export type CourseLink = {
  title: string;
  description: string;
  href: string;
};

export default function CourseLinkCard({ course }: { course: CourseLink }) {
  return (
    <a
      href={course.href}
      className="block p-5 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/50 transition-all duration-200 rounded-sm group"
    >
      <h4 className="text-sm font-bold text-white tracking-wide transition-colors">
        {course.title}
      </h4>
      <p className="text-xs text-white mt-2 leading-relaxed line-clamp-2">
        {course.description}
      </p>
    </a>
  );
}
