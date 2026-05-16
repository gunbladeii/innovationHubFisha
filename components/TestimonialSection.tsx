"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: string;
  nama: string;
  mesej: string;
  rating: number;
  created_at: string;
};

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
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Initial fetch
    fetch("/api/testimonial")
      .then((r) => r.json())
      .then((data: Testimonial[]) => {
        if (Array.isArray(data)) {
          setItems(data);
          seenIds.current = new Set(data.map((d) => d.id));
        }
      });

    // SSE real-time stream
    const es = new EventSource("/api/testimonial/stream");
    es.onmessage = (e) => {
      try {
        const item: Testimonial = JSON.parse(e.data);
        if (seenIds.current.has(item.id)) return;
        seenIds.current.add(item.id);
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
        </div>

        {/* Quote cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
      </div>
    </section>
  );
}
