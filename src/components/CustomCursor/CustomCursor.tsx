"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Track interactive state in refs instead of state to avoid React re-renders
  // on every mousemove / mousedown / mouseup. The rAF loop reads these directly.
  const isClickingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isHiddenRef = useRef(false);
  const prevHoveringRef = useRef(false);
  const prevClickingRef = useRef(false);
  const prevHiddenRef = useRef(false);

  // `useSyncExternalStore` under the hood — returns `true` on SSR so we don't
  // render a desktop-only cursor into the SSR markup and cause a hydration
  // flash before we know the real pointer type.
  const isTouchDevice = useMediaQuery("(pointer: coarse)", true);

  useEffect(() => {
    if (isTouchDevice) return; // No cursor on touch devices — do not attach any listeners

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrameId: number;
    let isPageVisible = true;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, input, [data-cursor-hover]");
      isHoveringRef.current = !!isInteractive;
      // Hide cursor completely over elements like the comparison slider
      isHiddenRef.current = !!target.closest("[data-cursor-hide]");
    };

    const onMouseDown = () => { isClickingRef.current = true; };
    const onMouseUp = () => { isClickingRef.current = false; };

    // Pause animation when the tab is backgrounded to save CPU
    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        // Resync ring position on resume so it doesn't lerp from a stale spot
        ringX = mouseX;
        ringY = mouseY;
        animFrameId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      if (!isPageVisible) return; // Don't schedule next frame if tab is hidden

      // Instantly track dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Smoothly interpolate ring
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      // Update hover/click classes only when they actually change (no React re-render)
      const hovering = isHoveringRef.current;
      const clicking = isClickingRef.current;
      const hidden = isHiddenRef.current;

      if (hovering !== prevHoveringRef.current || clicking !== prevClickingRef.current || hidden !== prevHiddenRef.current) {
        prevHoveringRef.current = hovering;
        prevClickingRef.current = clicking;
        prevHiddenRef.current = hidden;

        if (dotRef.current) {
          dotRef.current.style.scale = hovering || hidden ? "0" : "1";
          dotRef.current.style.opacity = hidden ? "0" : "1";
        }
        if (ringRef.current) {
          ringRef.current.style.width = hovering ? "48px" : "32px";
          ringRef.current.style.height = hovering ? "48px" : "32px";
          ringRef.current.style.opacity = hidden ? "0" : "1";
          ringRef.current.style.backgroundColor = hovering
            ? "rgba(34,197,94,0.1)"
            : clicking
            ? "rgba(34,197,94,0.3)"
            : "transparent";
          ringRef.current.style.scale = clicking ? "0.5" : "1";
        }
      }

      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("visibilitychange", onVisibilityChange);
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="hidden md:block pointer-events-none z-[99999] fixed inset-0">
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-green-500"
        style={{ transition: "scale 100ms" }}
      />

      {/* Outer Interpolated Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-green-500 flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          transition: "width 300ms ease-out, height 300ms ease-out, background-color 300ms ease-out, scale 300ms ease-out",
        }}
      />
    </div>
  );
}
