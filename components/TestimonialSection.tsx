"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Testimonial = {
  id: string;
  nama: string;
  mesej: string;
  rating: number;
  created_at: string;
};

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className="text-lg leading-none" style={{ color: s <= rating ? "#F59E0B" : "#D1D5DB" }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function TestimonialSection() {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from("respon_awam")
      .select("id, nama, mesej, rating, created_at")
      .eq("jenis", "maklumbalas")
      .gte("rating", 4)
      .order("rating", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data) setItems(data as Testimonial[]);
      });
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
          {items.map((t, i) => (
            <div
              key={t.id}
              className="relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(59,130,246,0.15)",
                boxShadow: "0 4px 20px rgba(59,130,246,0.08)",
                borderLeft: "4px solid #3B82F6",
              }}
            >
              {/* Big decorative quote mark */}
              <span
                className="absolute top-3 right-5 select-none pointer-events-none"
                style={{ fontSize: "4rem", lineHeight: 1, color: "rgba(59,130,246,0.08)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>

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
          ))}
        </div>
      </div>
    </section>
  );
}
