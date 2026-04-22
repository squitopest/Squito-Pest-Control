"use client";

import { useSyncExternalStore } from "react";

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
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = (onChange: () => void) => {
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
  };

  const getSnapshot = () => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return serverFallback;
    }
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => serverFallback;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
