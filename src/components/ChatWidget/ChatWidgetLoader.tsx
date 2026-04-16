"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Load the full ChatWidget only after the user interacts with the page.
// This keeps the initial page load fast — the AI chat JS bundle is skipped
// entirely until someone moves their mouse, scrolls, or touches the screen.
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ChatWidgetLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => setReady(true);

    // Trigger on any of these first-interaction signals
    window.addEventListener("mousemove", load, { once: true });
    window.addEventListener("touchstart", load, { once: true });
    window.addEventListener("scroll", load, { once: true, passive: true });
    window.addEventListener("keydown", load, { once: true });

    return () => {
      window.removeEventListener("mousemove", load);
      window.removeEventListener("touchstart", load);
      window.removeEventListener("scroll", load);
      window.removeEventListener("keydown", load);
    };
  }, []);

  if (!ready) return null;
  return <ChatWidget />;
}
