import Link from "next/link";

// ─── Variants ────────────────────────────────────────────────────────────────
// primary       – red fill, white text (works on any background)
// outline-light – dark border + dark text, for sections with a light bg
// outline-dark  – white/30 border + white text, for sections with a dark bg
// outline-hero  – solid white border + white text, hover fills white (video bg)
export type ButtonVariant =
  | "primary"
  | "outline-light"
  | "outline-dark"
  | "outline-hero";

export type ButtonSize = "sm" | "md" | "lg";

// ─── Style maps ──────────────────────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#CE1A19] text-white hover:bg-red-700 focus-visible:outline-[#CE1A19]",
  "outline-light":
    "border-2 border-black text-black hover:bg-black hover:text-white focus-visible:outline-black",
  "outline-dark":
    "border border-white/30 text-white hover:border-white hover:bg-white/5 focus-visible:outline-white",
  "outline-hero":
    "border-2 border-white text-white hover:bg-white hover:text-black focus-visible:outline-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-6 py-3 text-xs",
  md: "px-8 py-4 text-sm",
  lg: "px-10 py-4 text-sm",
};

const base =
  "inline-flex items-center justify-center font-semibold tracking-widest uppercase transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2";

// ─── Props ───────────────────────────────────────────────────────────────────
interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

// Renders as <Link> or <a>
type LinkProps = SharedProps & {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
  disabled?: never;
};

// Renders as <button>
type NativeButtonProps = SharedProps & {
  href?: never;
  external?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

type ButtonProps = LinkProps | NativeButtonProps;

// ─── Component ───────────────────────────────────────────────────────────────
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href) {
    const { href, external } = rest as LinkProps;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = rest as NativeButtonProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
