"use client";

import AnimatedTextFilter from "@/app/components/ui/AnimatedTextFilter";

export type ProgramOption = {
  id: string;
  title: string;
};

interface CourseSelectorProps {
  programs: readonly ProgramOption[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function CourseSelector({
  programs,
  selected,
  onSelect,
}: CourseSelectorProps) {
  return (
    <div>
      <label className="block text-zinc-400 text-xs font-black uppercase tracking-widest mb-6">
        01 / Select Target Program <span className="text-[#CE1A19]">*</span>
      </label>
      <div
        className="flex flex-col items-start space-y-4"
        role="group"
        aria-label="Course program selection"
      >
        {programs.map((program) => (
          <AnimatedTextFilter
            key={program.id}
            label={program.title}
            isSelected={selected === program.id}
            onClick={() => onSelect(program.id)}
          />
        ))}
      </div>
    </div>
  );
}
