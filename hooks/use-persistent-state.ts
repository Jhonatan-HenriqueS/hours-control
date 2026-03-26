"use client";

import { useEffect, useState } from "react";

export function usePersistentState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(key);

      if (rawValue !== null) {
        setState(JSON.parse(rawValue) as T);
      }
    } catch {
      window.localStorage.removeItem(key);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(state));
  }, [isHydrated, key, state]);

  return [state, setState, isHydrated] as const;
}
