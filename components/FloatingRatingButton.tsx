"use client";

import { useEffect, useState } from "react";
import { Star, ArrowUp } from "lucide-react";

export default function FloatingRatingButton() {
  const [visible, setVisible] = useState(false);
  const [atRespon, setAtRespon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const responEl = document.getElementById("respon");

      setVisible(scrollY > 300);

      if (responEl) {
        const rect = responEl.getBoundingClientRect();
        setAtRespon(rect.top <= 120);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMaklumBalas = () => {
    window.dispatchEvent(new Event("open-maklumbalas"));
    document.getElementById("respon")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed z-50 flex items-center gap-2"
      style={{ bottom: "28px", right: "24px" }}
    >
      {/* Kembali ke atas */}
      <button
        onClick={handleScrollTop}
        aria-label="Kembali ke atas"
        className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
          color: "#FFFFFF",
          boxShadow: "0 8px 32px rgba(59,130,246,0.40), 0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <ArrowUp size={16} strokeWidth={2.5} />
        <span>Ke Atas</span>
      </button>

      {/* Beri Maklum Balas — hidden when at respon section */}
      {!atRespon && (
        <button
          onClick={handleMaklumBalas}
          aria-label="Beri maklum balas & rating"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
            color: "#FFFFFF",
            boxShadow: "0 8px 32px rgba(245,158,11,0.40), 0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          <Star size={16} fill="#FFFFFF" strokeWidth={0} />
          <span>Beri Maklum Balas</span>
        </button>
      )}
    </div>
  );
}
