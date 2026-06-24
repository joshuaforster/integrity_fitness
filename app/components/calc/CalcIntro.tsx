import { ReactNode } from "react";

interface CalcIntroProps {
  eyebrow: string;
  heading: ReactNode;
  body: string;
  tags?: string[];
}

export function CalcIntro({ eyebrow, heading, body, tags }: CalcIntroProps) {
  return (
    <div className="max-w-3xl">
      <div className="w-8 h-0.5 bg-[#CE1A19] mb-6" aria-hidden="true" />
      <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-1">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-black leading-none tracking-tight uppercase text-zinc-950 mb-4">
        {heading}
      </h2>
      <p className="text-base text-zinc-600 leading-relaxed mb-6">{body}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#CE1A19] flex-shrink-0"
                aria-hidden="true"
              />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
