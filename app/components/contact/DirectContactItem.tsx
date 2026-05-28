export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  description: string;
};

export default function DirectContactItem({ channel }: { channel: ContactChannel }) {
  const isExternal = channel.href.startsWith("http");

  return (
    <div className="flex flex-col items-start group">
      <span className="text-zinc-700 text-[10px] font-black uppercase tracking-[2px] mb-1">
        {channel.label}
      </span>

      <a
        href={channel.href}
        className="text-zinc-950 font-black text-lg tracking-wide hover:text-[#CE1A19] transition-colors duration-200 outline-none inline-flex items-center gap-1.5"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <span>{channel.value}</span>
        {isExternal && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-zinc-500"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        )}
      </a>

      <p className="text-zinc-700 text-xs font-medium mt-2 leading-relaxed max-w-xs">
        {channel.description}
      </p>
    </div>
  );
}
