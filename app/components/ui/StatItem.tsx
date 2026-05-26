import Image from "next/image";

type TextStat = {
  type: "text";
  value: string;
  label: string;
  theme?: "dark" | "light";
};

type ImageStat = {
  type: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  theme?: "dark" | "light";
  invert?: boolean;
};

type StatItemProps = TextStat | ImageStat;

export default function StatItem(props: StatItemProps) {
  const { label, theme = "dark" } = props;
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col items-start border-l-2 pl-6 ${
        isDark ? "border-zinc-800" : "border-zinc-200"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-[2px] mt-3 font-bold order-last ${
          isDark ? "text-zinc-400" : "text-zinc-600"
        }`}
      >
        {label}
      </p>
      {props.type === "text" ? (
        <p
          className={`text-4xl md:text-5xl font-black tracking-tight m-0 leading-none order-first ${
            isDark ? "text-white" : "text-zinc-950"
          }`}
        >
          {props.value}
        </p>
      ) : (
        <div className="h-12 w-auto relative flex items-center order-first">
          <Image
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
            priority
            className={`h-full w-auto object-contain ${
              props.invert ?? isDark ? "brightness-0 invert" : ""
            }`}
          />
        </div>
      )}
    </div>
  );
}
