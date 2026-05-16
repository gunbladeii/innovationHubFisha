"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function FloatingRatingButton() {
  const [visible, setVisible] = useState(false);
  const [atRespon, setAtRespon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const responEl = document.getElementById("respon");

      // Show after scrolling 300px
      setVisible(scrollY > 300);

      // Hide when user has reached the respon section
      if (responEl) {
        const rect = responEl.getBoundingClientRect();
        setAtRespon(rect.top <= 120);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // Dispatch custom event so ResponAwam switches to maklumbalas tab
    window.dispatchEvent(new Event("open-maklumbalas"));
    // Scroll to respon section first, the component will refine scroll to star-rating
    document.getElementById("respon")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!visible || atRespon) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Beri maklum balas & rating"
      className="fixed z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        bottom: "28px",
        right: "24px",
        background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
        color: "#FFFFFF",
        boxShadow: "0 8px 32px rgba(245,158,11,0.40), 0 2px 8px rgba(0,0,0,0.12)",
      }}
    >
      <Star size={16} fill="#FFFFFF" strokeWidth={0} />
      <span>Beri Maklum Balas</span>
    </button>
  );
}
