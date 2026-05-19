"use client";

import { Download } from "lucide-react";

interface PDFDownloadButtonProps {
  variant?: "navbar" | "hero";
}

export default function PDFDownloadButton({ variant = "navbar" }: PDFDownloadButtonProps) {
  const handleDownload = () => {
    window.print();
  };

  if (variant === "hero") {
    return (
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: "#1D4ED8",
          color: "#FFFFFF",
          boxShadow: "0 4px 16px rgba(29,78,216,0.35)",
          border: "1px solid rgba(29,78,216,0.3)",
        }}
      >
        <Download size={15} />
        Download CV / Résumé
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg font-semibold transition-all duration-150 hover:-translate-y-0.5"
      style={{
        background: "rgba(29,78,216,0.1)",
        color: "#1D4ED8",
        border: "1px solid rgba(29,78,216,0.25)",
      }}
    >
      <Download size={11} />
      Download CV
    </button>
  );
}
