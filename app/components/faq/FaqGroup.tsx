import AccordionRow, { type FAQItem } from "./AccordionRow";

export type FAQGroup = {
  category: string;
  items: readonly FAQItem[];
};

const formatId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function FaqGroup({ group }: { group: FAQGroup }) {
  return (
    <div id={formatId(group.category)} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4 lg:mb-6">
        <div className="w-1 h-4 bg-[#CE1A19]" aria-hidden="true" />
        <h3 className="text-zinc-950 text-xs font-black uppercase tracking-widest">
          {group.category}
        </h3>
      </div>

      <div className="border-t border-zinc-200">
        {group.items.map((item) => (
          <AccordionRow key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  );
}
