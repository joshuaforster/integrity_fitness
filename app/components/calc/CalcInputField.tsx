"use client";
import { useState, useEffect } from "react";

interface CalcInputFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  hint?: string;
  benchmark?: string;
  min?: number;
  max: number;
  step?: number;
  warnAbove?: number;
  warnMessage?: string;
}

export function CalcInputField({
  label,
  value,
  onChange,
  hint,
  benchmark,
  min = 0,
  max,
  step = 1,
  warnAbove,
  warnMessage,
}: CalcInputFieldProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const pct = ((value - min) / (max - min)) * 100;
  const isWarning = warnAbove != null && value > warnAbove;

  const [localValue, setLocalValue] = useState(String(value));
  useEffect(() => {
    setLocalValue(String(value));
  }, [value]);

  function commit(raw: string) {
    const parsed = parseFloat(raw);
    const clamped = isNaN(parsed) ? min : clamp(parsed);
    onChange(clamped);
    setLocalValue(String(clamped));
  }

  return (
    <label className="block text-sm font-medium text-zinc-700">
      <span>{label}</span>
      {hint && (
        <span className="block text-xs text-zinc-500 font-normal mt-0.5">
          {hint}
        </span>
      )}
      {benchmark && (
        <span className="block text-xs text-zinc-500 font-normal mt-0.5 italic">
          {benchmark}
        </span>
      )}
      <input
        type="number"
        value={localValue}
        min={min}
        max={max}
        step={step}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        className="mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white text-zinc-950 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CE1A19] focus:border-[#CE1A19] transition"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full h-1.5 rounded-full cursor-pointer appearance-none
          [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#CE1A19]
          [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(206,26,25,0.45)] [&::-webkit-slider-thumb]:-mt-[5px]
          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[#CE1A19] [&::-moz-range-thumb]:border-0
          [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full"
        style={{
          background: `linear-gradient(to right, #CE1A19 ${pct}%, #e4e4e7 ${pct}%)`,
        }}
      />
      {isWarning && warnMessage && (
        <span className="flex items-start gap-1 mt-1.5 text-xs text-amber-600 font-normal leading-snug">
          <svg
            className="w-3 h-3 mt-px flex-shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c-.673-1.167-2.357-1.167-3.03 0L.222 13.24C-.463 14.4.38 16 1.727 16h12.546c1.346 0 2.19-1.6 1.505-2.76L8.485 2.495zM8 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 6zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {warnMessage}
        </span>
      )}
    </label>
  );
}
