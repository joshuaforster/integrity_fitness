import React from "react";

export type Value = {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  title: string;
  description: string;
};

export default function ValueCard({ value }: { value: Value }) {
  return (
    <div className="flex flex-col items-start text-left border-l-2 border-zinc-200 pl-6 first:border-l-0 first:pl-0">
      <div
        className="w-12 h-12 flex items-center justify-center text-[#CE1A19] mb-5"
        aria-hidden="true"
      >
        <value.icon className="w-7 h-7 stroke-[1.75]" />
      </div>
      <h3 className="text-zinc-950 text-sm font-extrabold uppercase tracking-[2px] mb-3">
        {value.title}
      </h3>
      <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
        {value.description}
      </p>
    </div>
  );
}
