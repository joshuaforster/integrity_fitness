import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  reveal?: boolean;
  className?: string;
}

export default function SectionWrapper({
  children,
  reveal = false,
  className,
}: SectionWrapperProps) {
  const classes = [reveal ? "reveal" : "", "mx-auto max-w-7xl px-6 lg:px-8", className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
