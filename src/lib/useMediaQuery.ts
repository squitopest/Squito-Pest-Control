"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Subscribe a component to a CSS media query.
 *
 * Uses `useSyncExternalStore` so React knows the query is an external data
 * source. This avoids the `react-hooks/set-state-in-effect` warning we hit
 * when calling `setState(matchMedia.matches)` inside a `useEffect`, and it
 * keeps the component in sync if the user, say, plugs in a mouse or toggles
 * "Reduce motion" at runtime.
 *
 * During SSR / first client render (before hydration) this returns the value
 * from `serverFallback` so the server and client markup agree.
 *
 * Perf: `subscribe` and `getSnapshot` are stabilized with useCallback/useMemo
 * so useSyncExternalStore doesn't re-subscribe on every render.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return () => {};
      }
      const mql = window.matchMedia(query);
      // Older Safari only supports addListener/removeListener; the modern API is
      // addEventListener("change", ...). Prefer the modern one, fall back when
      // missing.
      if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
      }
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return serverFallback;
    }
    return window.matchMedia(query).matches;
  }, [query, serverFallback]);

  const getServerSnapshot = useMemo(() => () => serverFallback, [serverFallback]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
