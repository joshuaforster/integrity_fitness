"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { clsx } from "clsx";

export type ButtonVariant =
  | "primary"
  | "outline-light"
  | "outline-dark"
  | "outline-hero"
  | "glass";

export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#CE1A19] text-white hover:bg-red-700 shadow-[0_1px_3px_rgba(206,26,25,0.25)] hover:shadow-[0_2px_10px_rgba(206,26,25,0.35)] focus-visible:ring-[#CE1A19]",
  "outline-light":
    "border border-zinc-950 text-zinc-950 hover:bg-zinc-950 hover:text-white focus-visible:ring-zinc-950",
  "outline-dark":
    "border border-white/20 text-white hover:border-white/60 hover:bg-white/[0.04] focus-visible:ring-white",
  "outline-hero":
    "border border-white/70 text-white hover:bg-white hover:text-zinc-950 focus-visible:ring-white",
  "glass":
    "[backdrop-filter:blur(16px)_saturate(150%)] bg-white/[0.08] border border-white/[0.18] text-white hover:bg-white/[0.16] hover:border-white/[0.3] focus-visible:ring-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-wider",
  md: "px-6 py-2.5 text-sm tracking-widest",
  lg: "px-8 py-3 text-sm tracking-widest",
};

const baseStyle =
  "inline-flex items-center justify-center font-semibold uppercase transition-all duration-200 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none";

const motionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: "easeOut" as const },
};

const MotionLink = motion.create(Link);

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  responsive?: boolean;
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
  responsive = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const combinedClasses = clsx(
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    responsive && "w-full sm:w-auto",
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, external } = rest as LinkProps;

    if (external) {
      return (
        <motion.a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <MotionLink href={href} className={combinedClasses} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  const { type = "button", onClick, disabled } = rest as NativeButtonProps;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
