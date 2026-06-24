import { ReactNode } from "react";

interface CalcCardProps {
  children: ReactNode;
  className?: string;
  noAccent?: boolean;
}

export function CalcCard({
  children,
  className = "",
  noAccent = false,
}: CalcCardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 ${
        noAccent ? "" : "border-t-[3px] border-t-[#CE1A19]"
      } bg-zinc-50 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}
