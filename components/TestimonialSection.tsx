"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { FileDown, Loader2 } from "lucide-react";

type Testimonial = {
  id: string;
  nama: string;
  mesej: string;
  rating: number;
  created_at: string;
};

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    startRef.current = null;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

/* ── Generate decorated testimonial PDF ── */
async function exportTestimonialsPDF(items: Testimonial[]) {
  const avgRating = items.length
    ? (items.reduce((s, t) => s + t.rating, 0) / items.length).toFixed(1)
    : "0";
  const fiveStars = items.filter((t) => t.rating === 5).length;
  const generatedDate = new Date().toLocaleDateString("ms-MY", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const cards = items
    .map((t, i) => {
      const stars = [1, 2, 3, 4, 5]
        .map((s) => `<span style="color:${s <= t.rating ? "#F59E0B" : "#D1D5DB"};font-size:13px">★</span>`)
        .join("");
      const hue = (i * 67 + 210) % 360;
      const dateStr = new Date(t.created_at).toLocaleDateString("ms-MY", {
        day: "2-digit", month: "short", year: "numeric",
      });
      return `
        <div style="
          background:#fff;
          border:1px solid rgba(59,130,246,0.18);
          border-left:4px solid hsl(${hue},60%,55%);
          border-radius:8px;
          padding:12px 14px;
          break-inside:avoid;
          page-break-inside:avoid;
          margin-bottom:10px;
        ">
          <div style="display:flex;align-items:center;gap:9px;margin-bottom:7px">
            <div style="
              width:32px;height:32px;border-radius:50%;flex-shrink:0;
              background:hsl(${hue},70%,92%);
              color:hsl(${hue},60%,35%);
              display:flex;align-items:center;justify-content:center;
              font-size:13px;font-weight:800;
            ">${t.nama.trim().charAt(0).toUpperCase()}</div>
            <div style="flex:1;min-width:0">
              <p style="margin:0;font-size:10px;font-weight:700;color:#1E293B;line-height:1.3">${t.nama}</p>
              <div style="display:flex;align-items:center;gap:6px;margin-top:2px">
                <span>${stars}</span>
                <span style="font-size:8.5px;color:#9CA3AF">${dateStr}</span>
              </div>
            </div>
            <span style="
              font-size:8px;font-weight:700;
              background:${t.rating === 5 ? "#D1FAE5" : t.rating >= 4 ? "#DBEAFE" : "#F3F4F6"};
              color:${t.rating === 5 ? "#065F46" : t.rating >= 4 ? "#1D4ED8" : "#6B7280"};
              padding:2px 8px;border-radius:10px;flex-shrink:0;
            ">${t.rating}/5</span>
          </div>
          <p style="margin:0;font-size:9px;color:#374151;line-height:1.6;font-style:italic">
            &ldquo;${t.mesej}&rdquo;
          </p>
        </div>`;
    })
    .join("");

  const html = `
    <div style="
      font-family:'Segoe UI',Arial,sans-serif;
      background:#fff;
      width:210mm;
      margin:0 auto;
      color:#111827;
    ">
      <!-- HEADER -->
      <div style="
        background:linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 60%,#2563EB 100%);
        color:#fff;
        padding:22px 28px 18px;
      ">
        <div style="display:flex;align-items:flex-start;justify-content:space-between">
          <div>
            <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.75;font-weight:600">
              FISHA Innovation Hub · Jemaah Nazir, KPM
            </p>
            <h1 style="margin:0 0 4px;font-size:22px;font-weight:800;letter-spacing:-0.4px;line-height:1.2">
              Laporan Maklum Balas
            </h1>
            <p style="margin:0;font-size:11px;opacity:0.82;font-weight:500">
              Pengesahan Rakan Sejawat &amp; Maklum Balas Pengguna
            </p>
          </div>
          <div style="text-align:right;opacity:0.8">
            <p style="margin:0;font-size:8.5px">Dijana pada</p>
            <p style="margin:2px 0 0;font-size:9px;font-weight:700">${generatedDate}</p>
          </div>
        </div>

        <!-- Stats row -->
        <div style="display:flex;gap:10px;margin-top:16px">
          ${[
            { value: items.length.toString(), label: "Jumlah Responden" },
            { value: avgRating + " ★", label: "Purata Rating" },
            { value: fiveStars.toString(), label: "Rating Sempurna (5★)" },
          ].map(s => `
            <div style="
              background:rgba(255,255,255,0.13);
              border:1px solid rgba(255,255,255,0.22);
              border-radius:8px;
              padding:9px 16px;
              text-align:center;
              min-width:80px;
            ">
              <p style="margin:0;font-size:18px;font-weight:800;line-height:1">${s.value}</p>
              <p style="margin:4px 0 0;font-size:7.5px;opacity:0.8;line-height:1.3">${s.label}</p>
            </div>`).join("")}
        </div>
      </div>

      <!-- DIVIDER LABEL -->
      <div style="background:#F0F7FF;border-bottom:1px solid #DBEAFE;padding:7px 28px">
        <p style="margin:0;font-size:7.5px;font-weight:700;color:#3B82F6;letter-spacing:0.12em;text-transform:uppercase">
          ── Semua Maklum Balas Pengguna ──────────────────────────────────────────────────────────────
        </p>
      </div>

      <!-- CARDS GRID -->
      <div style="padding:16px 28px 8px;columns:2;column-gap:14px">
        ${cards}
      </div>

      <!-- FOOTER -->
      <div style="
        background:#F0F4FF;
        border-top:1px solid #DBEAFE;
        padding:8px 28px;
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">
        <p style="margin:0;font-size:7.5px;color:#6B7280">
          Laporan ini dijana secara automatik daripada portal FISHA Innovation Hub
        </p>
        <p style="margin:0;font-size:7.5px;color:#6B7280">inovasi-sistem-fisha.vercel.app</p>
      </div>
    </div>`;

  // Mount off-screen
  const container = document.createElement("div");
  container.style.cssText = "position:fixed;left:-9999px;top:0;z-index:-1;background:#fff";
  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 300));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2pdf = (await import("html2pdf.js") as any).default;
    await html2pdf()
      .set({
        margin: [10, 0, 10, 0],
        filename: `MaklumBalas-FISHAHub-${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait", compress: true },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .from(container.firstElementChild)
      .save();
  } finally {
    document.body.removeChild(container);
  }
}

/* ── All Testimonials Modal ── */
function AllTestimonialsModal({ onClose }: { onClose: () => void }) {
  const [allItems, setAllItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleExportPDF = async () => {
    if (pdfLoading || allItems.length === 0) return;
    setPdfLoading(true);
    try {
      await exportTestimonialsPDF(allItems);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setPdfLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/testimonial/all")
      .then((r) => r.json())
      .then((data: Testimonial[]) => {
        if (Array.isArray(data)) setAllItems(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const filtered = allItems.filter(
    (t) =>
      t.nama.toLowerCase().includes(search.toLowerCase()) ||
      t.mesej.toLowerCase().includes(search.toLowerCase())
  );

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 24px 64px rgba(15,23,42,0.25)" }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(59,130,246,0.15)", background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)" }}
        >
          <div>
            <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Semua Maklum Balas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{allItems.length} rekod dijumpai</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              disabled={pdfLoading || loading || allItems.length === 0}
              className="inline-flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-lg font-semibold transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "#1D4ED8", color: "#fff", border: "none" }}
            >
              {pdfLoading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <FileDown size={12} />
              )}
              {pdfLoading ? "Menjana…" : "Eksport PDF"}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-6 py-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
          <input
            type="text"
            placeholder="Cari nama atau mesej..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm px-4 py-2 rounded-xl outline-none"
            style={{ border: "1px solid rgba(59,130,246,0.25)", background: "rgba(239,246,255,0.7)" }}
          />
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-400 text-sm">Memuatkan...</div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-slate-400 text-sm">Tiada rekod dijumpai.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(239,246,255,0.8)", borderBottom: "1px solid rgba(59,130,246,0.12)" }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 w-10">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 w-48">Nama</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Mesej</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 w-28">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 w-32">Tarikh</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr
                    key={t.id}
                    className="transition-colors hover:bg-blue-50/50"
                    style={{ borderBottom: "1px solid rgba(59,130,246,0.07)" }}
                  >
                    <td className="px-4 py-3 text-slate-400 font-medium">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                          style={{
                            background: `hsl(${(i * 67 + 210) % 360}, 70%, 92%)`,
                            color: `hsl(${(i * 67 + 210) % 360}, 60%, 35%)`,
                          }}
                        >
                          {t.nama.trim().charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-700 leading-tight">{t.nama}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 leading-relaxed max-w-xs">{t.mesej}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} style={{ color: s <= t.rating ? "#F59E0B" : "#D1D5DB", fontSize: "0.9rem" }}>★</span>
                        ))}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(t.created_at).toLocaleDateString("ms-MY", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className="text-lg leading-none" style={{ color: s <= rating ? "#F59E0B" : "#D1D5DB" }}>
            ★
          </span>
        ))}
      </span>
      <span className="text-xs font-semibold" style={{ color: "#F59E0B" }}>
        {rating} daripada 5 bintang
      </span>
    </span>
  );
}

export default function TestimonialSection() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const seenIds = useRef<Set<string>>(new Set());
  const closeModal = useCallback(() => setShowModal(false), []);

  const respondentCount = useCountUp(totalCount, 1000);

  useEffect(() => {
    // Initial fetch
    fetch("/api/testimonial")
      .then((r) => r.json())
      .then((res: { items: Testimonial[]; total: number }) => {
        if (Array.isArray(res.items)) {
          setItems(res.items);
          setTotalCount(res.total);
          seenIds.current = new Set(res.items.map((d) => d.id));
        }
      });

    // SSE real-time stream
    const es = new EventSource("/api/testimonial/stream");
    es.onmessage = (e) => {
      try {
        const item: Testimonial = JSON.parse(e.data);
        if (seenIds.current.has(item.id)) return;
        seenIds.current.add(item.id);
        // Increment total count from DB for accurate counter
        setTotalCount((prev) => prev + 1);
        // Mark as new for glow animation
        setNewIds((prev) => new Set(prev).add(item.id));
        setItems((prev) =>
          [item, ...prev]
            .sort(
              (a, b) =>
                b.rating - a.rating ||
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
            .slice(0, 6)
        );
        // Remove glow after 4s
        setTimeout(() => {
          setNewIds((prev) => {
            const s = new Set(prev);
            s.delete(item.id);
            return s;
          });
        }, 4000);
      } catch {
        // ignore malformed events (keepalive comments etc)
      }
    };
    return () => es.close();
  }, []);

  if (items.length === 0) return null;

  return (
    <section
      id="testimoni"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EFF6FF 0%, #DBEAFE 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(37,99,235,0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Section header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
            style={{ borderColor: "rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.07)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
            <span className="text-xs text-brand-700 font-medium tracking-wide">Testimoni Pengguna</span>
          </div>
          <h2 className="section-title mb-3">Apa Kata Mereka?</h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Maklum balas tulen daripada pengguna sistem inovasi FISHA.
          </p>
          {/* Animated respondent counter */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)" }}
            >
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#1D4ED8", minWidth: "2ch", display: "inline-block", textAlign: "right" }}
              >
                {respondentCount}
              </span>
              <span className="text-sm font-medium text-slate-600">pengguna telah memberi maklum balas</span>
            </div>
          </div>
        </div>

        {/* Quote cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="testimoni-grid">
          {items.map((t, i) => {
            const isNew = newIds.has(t.id);
            return (
            <div
              key={t.id}
              className="relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "#FFFFFF",
                border: `1px solid ${isNew ? "rgba(16,185,129,0.5)" : "rgba(59,130,246,0.15)"}`,
                boxShadow: isNew
                  ? "0 0 0 3px rgba(16,185,129,0.18), 0 8px 32px rgba(16,185,129,0.12)"
                  : "0 4px 20px rgba(59,130,246,0.08)",
                borderLeft: `4px solid ${isNew ? "#10B981" : "#3B82F6"}`,
                animation: isNew ? "testimonial-enter 0.5s ease-out" : undefined,
              }}
            >
              {/* Big decorative quote mark */}
              <span
                className="absolute top-3 right-5 select-none pointer-events-none"
                style={{ fontSize: "4rem", lineHeight: 1, color: "rgba(59,130,246,0.08)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>

              {/* New badge */}
              {isNew && (
                <span
                  className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
                  style={{ background: "#10B981", color: "#fff" }}
                >
                  ✦ Baru
                </span>
              )}

              {/* Stars */}
              <StarDisplay rating={t.rating} />

              {/* Quote text */}
              <blockquote className="text-sm text-slate-700 leading-relaxed flex-1">
                &ldquo;{t.mesej}&rdquo;
              </blockquote>

              {/* Footer */}
              <footer className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(59,130,246,0.1)" }}>
                {/* Avatar initials */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: `hsl(${(i * 67 + 210) % 360}, 70%, 92%)`,
                    color: `hsl(${(i * 67 + 210) % 360}, 60%, 35%)`,
                  }}
                >
                  {t.nama.trim().charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 leading-none">{t.nama}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(t.created_at).toLocaleDateString("ms-MY", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>
              </footer>
            </div>
            );
          })}
        </div>

        {/* Lihat Semua button */}
        {totalCount > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
              }}
            >
              <span>📋</span>
              Lihat Semua {totalCount} Maklum Balas
            </button>
          </div>
        )}
      </div>

      {showModal && <AllTestimonialsModal onClose={closeModal} />}
    </section>
  );
}
