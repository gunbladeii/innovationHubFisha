"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PDFDownloadButton from "./PDFDownloadButton";

const MARQUEE_ITEMS = [
  "Next.js 15", "React", "TypeScript", "Supabase", "Firebase",
  "Laravel", "PHP", "Python", "Google Apps Script", "Tailwind CSS",
  "MySQL", "PostgreSQL", "Vercel", "Node.js", "Vite", "Gemini AI",
  "Chart.js", "Google Workspace",
];

type Stats = {
  total: string;
  aktif: string;
  yearRange: string;
};

export default function HeroSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const [stats, setStats] = useState<Stats>({
    total: "—",
    aktif: "—",
    yearRange: "...",
  });

  useEffect(() => {
    supabase
      .from("inovasi")
      .select("status, tahun")
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const total = data.length;
        const aktif = data.filter((d) => d.status === "aktif").length;
        const years = data.map((d) => d.tahun).filter(Boolean) as number[];
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        setStats({
          total: String(total),
          aktif: String(aktif),
          yearRange: `${minYear}–${maxYear}`,
        });
      });
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #EEF2FF 100%)" }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(37,99,235,0.45) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-10 md:pt-28 md:pb-12 flex flex-col items-center text-center">
        {/* Badge pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
          style={{ borderColor: "rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.07)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
          <span className="text-xs text-brand-700 font-medium tracking-wide">
            Fisha · Innovation Hub
          </span>
        </div>

        {/* Logo banner */}
        <div className="flex justify-center items-center mb-8 w-full">
          <img
            src="/fisha-logo.png"
            alt="Inovasi Digital FISHA"
            className="w-[320px] sm:w-[420px] md:w-[540px] lg:w-[620px] h-auto object-contain"
          />
        </div>

        <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed mb-10">
          Koleksi inovasi digital yang dibangunkan untuk transformasi sistem
          pemeriksaan dan pengurusan pendidikan Malaysia.
        </p>

        {/* Bento stat cards */}
        <div className="grid grid-cols-3 gap-3 max-w-md w-full mb-8 mx-auto">
          {[
            { value: stats.total, label: "Sistem Dibangunkan", sub: stats.yearRange },
            { value: stats.aktif, label: "Sistem Aktif", sub: "Dalam operasi" },
            { value: "5+", label: "Tahun Inovasi", sub: "Berterusan" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 flex flex-col gap-1"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(59,130,246,0.18)",
                boxShadow: "0 2px 12px rgba(59,130,246,0.08)",
              }}
            >
              <span className="text-2xl font-bold text-brand-700" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {s.value}
              </span>
              <span className="text-xs text-gray-700 font-medium leading-tight">{s.label}</span>
              <span className="text-xs text-gray-400">{s.sub}</span>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <PDFDownloadButton variant="hero" />
          <a
            href="#inovasi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(59,130,246,0.08)",
              color: "#1D4ED8",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            Lihat Portfolio Inovasi →
          </a>
        </div>
      </div>

      {/* Marquee ticker strip */}
      <div
        className="relative overflow-hidden py-4"
        style={{
          borderTop: "1px solid rgba(59,130,246,0.15)",
          borderBottom: "1px solid rgba(59,130,246,0.15)",
          background: "rgba(59,130,246,0.04)",
        }}
      >
        <div className="flex w-max animate-marquee">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-4 px-4 text-sm font-medium whitespace-nowrap"
              style={{ color: "#64748B" }}
            >
              {item}
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#93C5FD" }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
