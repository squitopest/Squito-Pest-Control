"use client";

import { useEffect } from "react";

/**
 * Runs on every home-page mount and takes over scroll positioning.
 *
 * - If the URL has a hash (e.g. `/#service-area`), jump to that element and
 *   offset for the fixed site header so the anchor doesn't land behind the
 *   nav. Without this, clicking a deep link from another page loads the
 *   home page, the browser native-scrolls to the anchor, and then this
 *   component used to stomp that with a hard `scrollTo(0, 0)` — which is
 *   why "Check Your Area" on the About page was bouncing users to the top
 *   of the hero instead of the Service Area section.
 *
 * - If there's no hash, reset to the top (normal "landed on home" UX) and
 *   disable browser scroll restoration so back/forward doesn't fight us.
 */
export default function ScrollReset() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      // Defer until after layout so the target element actually exists in the
      // DOM. Lazy-loaded home sections (ServiceArea, ContactForm) mount on
      // the first client render, and scrollIntoView before that would no-op.
      const scrollToAnchor = () => {
        const id = decodeURIComponent(hash.slice(1));
        const el = document.getElementById(id);
        if (!el) return false;
        const headerOffset = 96;
        const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        return true;
      };

      if (!scrollToAnchor()) {
        // Target didn't exist yet — retry a couple of frames while the lazy
        // sections finish mounting, then give up rather than spin forever.
        let tries = 0;
        const timer = setInterval(() => {
          tries += 1;
          if (scrollToAnchor() || tries > 20) {
            clearInterval(timer);
          }
        }, 75);
      }
      return;
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
