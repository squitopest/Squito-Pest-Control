"use client";

import { useEffect } from "react";

/**
 * Wires up the two keyboard/focus behaviours every dialog should have:
 *
 *   1. Pressing Escape dismisses it.
 *   2. Focus is sent to `closeRef` on open (so a screen reader user lands on a
 *      useful element and Tab has somewhere sensible to go), and returned to
 *      the element that was focused before opening once the dialog closes.
 *
 * This is intentionally NOT a full focus trap — the modals in this app are
 * simple and the surrounding page is `overflow: hidden` while they're open, so
 * trapping isn't strictly needed. If we ever add complex multi-control dialogs
 * we should upgrade to a real trap (e.g. focus-trap-react).
 */
export function useModalDismiss(
  open: boolean,
  onClose: () => void,
  closeRef?: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      closeRef?.current?.focus?.();
    }, 0);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose, closeRef]);
}
