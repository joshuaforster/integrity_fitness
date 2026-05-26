import Link from "next/link";

export default function FooterNavLink({ href, name }: { href: string; name: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-white text-sm transition-colors duration-200 inline-flex flex-col group py-0.5 outline-none"
      >
        <span>{name}</span>
        <span className="h-px w-full bg-[#CE1A19] transform scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </Link>
    </li>
  );
}
