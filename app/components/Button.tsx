"use client";

import Link from "next/link";
import { clsx } from "clsx"; // Install via 'npm i clsx' if not present, or replace with template strings

export type ButtonVariant =
  | "primary"
  | "outline-light"
  | "outline-dark"
  | "outline-hero";

export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#CE1A19] text-white hover:bg-red-700 focus-visible:ring-[#CE1A19]",
  "outline-light":
    "border border-zinc-950 text-zinc-950 hover:bg-zinc-950 hover:text-white focus-visible:ring-zinc-950",
  "outline-dark":
    "border border-white/20 text-white hover:border-white hover:bg-white/5 focus-visible:ring-white",
  "outline-hero":
    "border-2 border-white text-white hover:bg-white hover:text-black focus-visible:ring-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs tracking-wider",
  md: "px-6 py-3.5 text-sm tracking-widest",
  lg: "px-8 py-4 text-base tracking-widest",
};

const baseStyle =
  "inline-flex items-center justify-center font-bold uppercase transition-all duration-200 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type LinkProps = SharedProps & {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
  disabled?: never;
};

type NativeButtonProps = SharedProps & {
  href?: never;
  external?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

type ButtonProps = LinkProps | NativeButtonProps;

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const combinedClasses = clsx(
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, external } = rest as LinkProps;

    if (external) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = rest as NativeButtonProps;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}
