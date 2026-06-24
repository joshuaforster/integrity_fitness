"use client";

export interface InfoEntry {
  title: string;
  body: string;
}

interface CalcInfoModalProps {
  id: string;
  content: Record<string, InfoEntry>;
  onClose: () => void;
}

export function CalcInfoModal({ id, content, onClose }: CalcInfoModalProps) {
  const entry = content[id];
  if (!entry) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <p className="text-xs font-bold tracking-widest uppercase text-[#CE1A19] mb-2">
          {entry.title}
        </p>
        <p className="text-base text-zinc-600 leading-relaxed whitespace-pre-line">
          {entry.body}
        </p>
      </div>
    </div>
  );
}
