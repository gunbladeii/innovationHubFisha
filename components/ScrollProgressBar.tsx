"use client";

import { useEffect, useRef } from "react";

/**
 * A thin glowing progress bar pinned to the very top of the viewport.
 * Fills left-to-right as the user scrolls down the page.
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled  = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct       = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update(); // initial
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    /* Fixed container across the full viewport width */
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      {/* The filling bar */}
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          background:
            "linear-gradient(90deg, #3B82F6 0%, #818CF8 50%, #A78BFA 100%)",
          boxShadow: "0 0 10px 2px rgba(99,102,241,0.55)",
          borderRadius: "0 2px 2px 0",
          transition: "width 0.08s linear",
        }}
      />
    </div>
  );
}
