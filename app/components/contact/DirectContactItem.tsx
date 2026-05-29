export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  description: string;
};

export default function DirectContactItem({ channel }: { channel: ContactChannel }) {
  const isExternal = channel.href.startsWith("http");

  return (
    <a
      href={channel.href}
      className="flex items-start gap-4 p-4 bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-[#CE1A19]"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <span className="w-8 h-8 rounded-full bg-[#CE1A19]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#CE1A19]/20 transition-colors duration-200">
        <span className="w-1.5 h-1.5 rounded-full bg-[#CE1A19]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <span className="text-[10px] font-black uppercase tracking-[2px] text-zinc-400 block mb-0.5">
          {channel.label}
        </span>
        <span className="text-zinc-950 font-bold text-sm leading-snug group-hover:text-[#CE1A19] transition-colors duration-200 block truncate">
          {channel.value}
        </span>
        <p className="text-zinc-500 text-xs leading-relaxed mt-1">{channel.description}</p>
      </div>
    </a>
  );
}
