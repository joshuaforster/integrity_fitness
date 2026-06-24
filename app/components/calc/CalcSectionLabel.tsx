interface CalcSectionLabelProps {
  title: string;
  hint?: string;
  optional?: boolean;
  infoId?: string;
  onInfo?: (id: string) => void;
}

export function CalcSectionLabel({
  title,
  hint,
  optional,
  infoId,
  onInfo,
}: CalcSectionLabelProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5">
        <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19]">
          {title}
        </p>
        {optional && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-200 rounded px-1 py-px">
            Optional
          </span>
        )}
        {infoId && onInfo && (
          <button
            type="button"
            onClick={() => onInfo(infoId)}
            aria-label={`More info: ${title}`}
            className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-zinc-300 text-zinc-500 hover:text-zinc-700 hover:border-zinc-500 transition-colors flex-shrink-0"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
              <path
                fillRule="evenodd"
                d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5a1 1 0 112 0 1 1 0 01-2 0zm1 3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {hint && (
        <p className="text-xs text-zinc-500 mt-0.5 leading-snug">{hint}</p>
      )}
    </div>
  );
}
