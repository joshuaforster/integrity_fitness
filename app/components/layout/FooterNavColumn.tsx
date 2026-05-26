import FooterNavLink from "./FooterNavLink";

export type NavItem = { name: string; href: string };

export default function FooterNavColumn({
  heading,
  items,
}: {
  heading: string;
  items: NavItem[];
}) {
  return (
    <div>
      <h3 className="text-white text-xs font-bold tracking-[3px] uppercase mb-5">
        {heading}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <FooterNavLink key={item.name} href={item.href} name={item.name} />
        ))}
      </ul>
    </div>
  );
}
