"use client";

interface AnimatedTextFilterProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  size?: "sm" | "md";
  className?: string;
}

export default function AnimatedTextFilter({
  label,
  isSelected,
  onClick,
  size = "md",
  className,
}: AnimatedTextFilterProps) {
  const labelSize =
    size === "sm"
      ? "text-xs uppercase tracking-[2px]"
      : "text-sm md:text-base";

  const barSelected = size === "sm" ? "w-8" : "w-16";
  const barHover = size === "sm" ? "group-hover:w-4" : "group-hover:w-8";
  const barTop = size === "sm" ? "mt-1.5" : "mt-1";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start text-left group outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2 rounded-sm ${className ?? ""}`}
    >
      <span
        className={`font-bold transition-colors duration-200 ${labelSize} ${
          isSelected
            ? "text-zinc-950 font-black"
            : "text-zinc-500 group-hover:text-zinc-800"
        }`}
      >
        {label}
      </span>
      <span
        className={`h-[2px] bg-[#CE1A19] transition-all duration-300 ease-out ${barTop} ${
          isSelected ? barSelected : `w-0 ${barHover}`
        }`}
      />
    </button>
  );
}
