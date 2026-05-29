import { type ReactNode, type ElementType } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export default function GlassPill({
  children,
  className = "",
  as: Tag = "span",
}: Props) {
  return (
    <Tag className={`glass-pill inline-flex items-center rounded-full ${className}`}>
      {children}
    </Tag>
  );
}
