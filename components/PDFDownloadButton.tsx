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

interface PDFDownloadButtonProps {
  variant?: "navbar" | "hero";
}

async function generatePDF() {
  const el = document.getElementById("cv-print-area");
  if (!el) throw new Error("CV element not found");

  // Save original styles
  const prev = {
    display: el.style.display,
    position: el.style.position,
    left: el.style.left,
    top: el.style.top,
    zIndex: el.style.zIndex,
  };

  // Render off-screen so html2canvas can capture it
  el.style.display = "block";
  el.style.position = "fixed";
  el.style.left = "-9999px";
  el.style.top = "0px";
  el.style.zIndex = "-1";

  try {
    await document.fonts.ready;

    // Small delay so QR code and images fully paint
    await new Promise((r) => setTimeout(r, 400));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2pdf = (await import("html2pdf.js") as any).default;

    await html2pdf()
      .set({
        margin: [10, 0, 10, 0], // top right bottom left (mm) — matches @page margin
        filename: "CV-MohdFishaHafiz-JemaahNazir-KPM.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          imageTimeout: 10000,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .from(el)
      .save();
  } finally {
    // Always restore visibility
    el.style.display = prev.display;
    el.style.position = prev.position;
    el.style.left = prev.left;
    el.style.top = prev.top;
    el.style.zIndex = prev.zIndex;
  }
}

export default function PDFDownloadButton({ variant = "navbar" }: PDFDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await generatePDF();
    } catch (err) {
      console.error("PDF generation failed, falling back to print:", err);
      window.print();
    } finally {
      setLoading(false);
    }
  };

  if (variant === "hero") {
    return (
      <button
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          background: loading
            ? "linear-gradient(135deg,#1E3A8A,#1D4ED8)"
            : "linear-gradient(135deg,#1D4ED8,#2563EB)",
          color: "#FFFFFF",
          boxShadow: "0 4px 16px rgba(29,78,216,0.35)",
          border: "1px solid rgba(29,78,216,0.3)",
        }}
      >
        {loading ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <FileText size={15} />
        )}
        {loading ? "Menjana PDF…" : "Download CV / Résumé (PDF)"}
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg font-semibold transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
      style={{
        background: "rgba(29,78,216,0.1)",
        color: "#1D4ED8",
        border: "1px solid rgba(29,78,216,0.25)",
      }}
    >
      {loading ? (
        <Loader2 size={11} className="animate-spin" />
      ) : (
        <Download size={11} />
      )}
      {loading ? "Menjana…" : "Download CV"}
    </button>
  );
}
