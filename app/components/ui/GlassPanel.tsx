import { type ReactNode, type ElementType } from "react";

type Props = {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
  as?: ElementType;
};

export default function GlassPanel({
  children,
  variant = "light",
  className = "",
  as: Tag = "div",
}: Props) {
  return (
    <Tag
      className={`${variant === "dark" ? "liquid-glass-dark" : "liquid-glass"} ${className}`}
    >
      {children}
    </Tag>
  );
}
