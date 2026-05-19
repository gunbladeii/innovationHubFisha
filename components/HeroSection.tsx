"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { supabase } from "@/lib/supabase";
import PDFDownloadButton from "./PDFDownloadButton";

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

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

const MARQUEE_ITEMS = [
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "Firebase", slug: "firebase", color: "FFCA28" },
  { name: "Laravel", slug: "laravel", color: "FF2D20" },
  { name: "PHP", slug: "php", color: "777BB4" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Google Apps Script", slug: "googleappsscript", color: "34A853" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Vite", slug: "vite", color: "646CFF" },
  { name: "Gemini AI", slug: "googlegemini", color: "8E75B2" },
  { name: "Chart.js", slug: "chartdotjs", color: "FF6384" },
  { name: "Google Workspace", slug: "googleworkspace", color: "4285F4" },
];

type Stats = {
  total: number;
  aktif: number;
  yearRange: string;
};

const HERO_PARTICLES = [
  { left: "8%", top: "18%", size: 4, duration: 8.2, delay: 0.1 },
  { left: "16%", top: "36%", size: 3, duration: 9.5, delay: 0.8 },
  { left: "24%", top: "22%", size: 5, duration: 7.8, delay: 0.3 },
  { left: "33%", top: "41%", size: 3, duration: 8.9, delay: 1.5 },
  { left: "42%", top: "14%", size: 4, duration: 9.2, delay: 0.6 },
  { left: "51%", top: "33%", size: 3, duration: 8.7, delay: 1.1 },
  { left: "60%", top: "21%", size: 5, duration: 10.1, delay: 0.2 },
  { left: "68%", top: "40%", size: 3, duration: 9.3, delay: 1.7 },
  { left: "76%", top: "17%", size: 4, duration: 8.4, delay: 0.5 },
  { left: "84%", top: "30%", size: 3, duration: 9.8, delay: 1.3 },
  { left: "90%", top: "43%", size: 4, duration: 8.6, delay: 0.9 },
] as const;

export default function HeroSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const [stats, setStats] = useState<Stats>({ total: 0, aktif: 0, yearRange: "..." });
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.4 });
  const parallaxY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.4 });
  const leftGlowX = useTransform(parallaxX, (v) => v * -0.45);
  const leftGlowY = useTransform(parallaxY, (v) => v * -0.35);
  const rightGlowX = useTransform(parallaxX, (v) => v * 0.4);
  const rightGlowY = useTransform(parallaxY, (v) => v * 0.32);

  const totalCount = useCountUp(stats.total);
  const aktifCount = useCountUp(stats.aktif);

  useEffect(() => {
    if (!supabase) return;

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
        setStats({ total, aktif, yearRange: `${minYear}-${maxYear}` });
      });
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(relX * 14);
    rawY.set(relY * 10);
  };

  const resetParallax = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #EEF2FF 100%)" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(37,99,235,0.45) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {HERO_PARTICLES.map((p, i) => (
            <motion.span
              key={`${p.left}-${p.top}-${i}`}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: "rgba(56, 189, 248, 0.55)",
                boxShadow: "0 0 8px rgba(56, 189, 248, 0.35)",
              }}
              animate={{ x: [-2, 3, -2], y: [-6, 7, -6], opacity: [0.35, 0.85, 0.35] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
          x: shouldReduceMotion ? 0 : leftGlowX,
          y: shouldReduceMotion ? 0 : leftGlowY,
        }}
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.45, 0.78, 0.45] }}
        transition={{ duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          x: shouldReduceMotion ? 0 : rightGlowX,
          y: shouldReduceMotion ? 0 : rightGlowY,
        }}
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.4, 0.72, 0.4] }}
        transition={{ duration: 8.2, delay: 0.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-10 md:pt-28 md:pb-12 flex flex-col items-center text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
          style={{ borderColor: "rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.07)" }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
          <span className="text-xs text-brand-700 font-medium tracking-wide">Fisha - Innovation Hub</span>
        </motion.div>

        <motion.div
          className="flex justify-center items-center mb-8 w-full"
          style={shouldReduceMotion ? undefined : { x: parallaxX, y: parallaxY }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
        >
          <motion.img
            src="/brand/brand-banner-v2.png"
            alt="Inovasi Digital FISHA"
            className="w-[360px] sm:w-[560px] md:w-[780px] lg:w-[980px] h-auto object-contain"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.012, 1] }}
            transition={{ duration: 7.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p
          className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed mb-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
        >
          Koleksi inovasi digital yang dibangunkan untuk transformasi sistem pemeriksaan dan pengurusan pendidikan Malaysia.
        </motion.p>

        <motion.div
          className="grid grid-cols-3 gap-3 max-w-md w-full mb-8 mx-auto"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32, ease: "easeOut" }}
        >
          {[
            { value: totalCount, suffix: "", label: "Sistem Dibangunkan", sub: stats.yearRange },
            { value: aktifCount, suffix: "", label: "Sistem Aktif", sub: "Dalam operasi" },
            { value: 5, suffix: "+", label: "Tahun Inovasi", sub: "Berterusan" },
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
                {s.suffix}
              </span>
              <span className="text-xs text-gray-700 font-medium leading-tight">{s.label}</span>
              <span className="text-xs text-gray-400">{s.sub}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-3 flex-wrap"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
        >
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
            Lihat Portfolio Inovasi -&gt;
          </a>
        </motion.div>
      </div>

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
            <div key={i} className="flex items-center gap-6 px-4 whitespace-nowrap">
              <div className="flex flex-col items-center gap-1" title={item.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.simpleicons.org/${item.slug}/${item.color}`}
                  alt={item.name}
                  width={28}
                  height={28}
                  style={{ width: 28, height: 28, objectFit: "contain" }}
                />
              </div>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#93C5FD" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
