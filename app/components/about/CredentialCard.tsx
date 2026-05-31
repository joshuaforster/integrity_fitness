import Image from "next/image";

import { type CredentialCard } from "@/app/content/credentials";
export type { CredentialCard } from "@/app/content/credentials";

export default function CredentialCard({ item }: { item: CredentialCard }) {
  if (item.type === "brand") {
    return (
      <div className="p-6 md:p-8 bg-zinc-50 clip-tr flex flex-col justify-between min-h-40">
        <div className="flex items-center h-16">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            priority
            className="h-full w-auto max-h-16 object-contain block"
          />
        </div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mt-4">
          {item.label}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-zinc-50 border border-zinc-200/60 clip-bl flex flex-col justify-between min-h-40 group hover:border-zinc-300 transition-colors duration-200">
      <div>
        <span className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight block leading-none">
          {item.value}
        </span>
        <span className="text-xs font-extrabold text-[#CE1A19] uppercase tracking-widest mt-1.5 block">
          {item.label}
        </span>
      </div>
      <p className="text-zinc-500 text-xs font-medium mt-4 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
