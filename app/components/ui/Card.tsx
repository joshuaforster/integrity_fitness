"use client";

import Link from "next/link";
import { clsx } from "clsx";

interface CardBaseProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

type CardLinkProps = CardBaseProps & {
  href: string;
  external?: boolean;
};

type CardDivProps = CardBaseProps & {
  href?: never;
  external?: never;
};

export type CardProps = CardLinkProps | CardDivProps;

const shell = (className?: string) =>
  clsx(
    "relative flex flex-col bg-white rounded-2xl overflow-hidden",
    "border border-zinc-200",
    "shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_28px_rgba(0,0,0,0.07)]",
    "hover:shadow-[0_4px_16px_rgba(206,26,25,0.14),0_20px_52px_rgba(0,0,0,0.13)]",
    "hover:border-[#CE1A19]",
    "transition-all duration-300 group",
    className
  );

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19] focus-visible:ring-offset-2";

export default function Card({ children, className, accent = true, ...rest }: CardProps) {
  const cls = shell(className);
  const content = (
    <>
      {accent && (
        <div className="h-[3px] w-full bg-[#CE1A19] flex-shrink-0" aria-hidden="true" />
      )}
      {children}
    </>
  );

  if ("href" in rest && rest.href) {
    if (rest.external) {
      return (
        <a
          href={rest.href}
          className={clsx(cls, focusRing)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={rest.href} className={clsx(cls, focusRing)}>
        {content}
      </Link>
    );
  }

  return <div className={cls}>{content}</div>;
}
