"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

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

/* ── All Testimonials Modal ── */
function AllTestimonialsModal({ onClose }: { onClose: () => void }) {
  const [allItems, setAllItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
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
