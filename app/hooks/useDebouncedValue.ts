"use client";
import { useEffect, useState } from "react";

// Returns `value`, but delayed until it has stopped changing for `delayMs`.
// Used to avoid firing an API request on every keystroke/slider tick —
// only the last value in a burst of changes actually triggers a call.
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    // If `value` changes again before the timer fires, cancel it —
    // this is what makes it a debounce instead of a delay.
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
