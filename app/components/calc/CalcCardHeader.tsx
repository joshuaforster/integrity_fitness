import Image from "next/image";

const LOGO_URL =
  "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/General/logo_white.png";

interface CalcCardHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
}

export function CalcCardHeader({
  eyebrow,
  title,
  subtitle,
  showLogo = false,
  className = "",
}: CalcCardHeaderProps) {
  return (
    <div
      className={`flex items-start justify-between px-8 pt-7 pb-5 border-b border-zinc-200 ${className}`}
    >
      <div className="flex-1 min-w-0">
        {eyebrow && (
          <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-black tracking-tight uppercase text-zinc-950">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-zinc-600 mt-1">{subtitle}</p>
        )}
      </div>
      {showLogo && (
        <Image
          src={LOGO_URL}
          alt=""
          width={100}
          height={34}
          className="flex-shrink-0 invert opacity-[0.1] mt-1 hidden sm:block select-none ml-4"
          unoptimized
        />
      )}
    </div>
  );
}
