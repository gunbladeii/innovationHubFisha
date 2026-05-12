const MARQUEE_ITEMS = [
  "Next.js 15", "React", "TypeScript", "Supabase", "Firebase",
  "Laravel", "PHP", "Python", "Google Apps Script", "Tailwind CSS",
  "MySQL", "PostgreSQL", "Vercel", "Node.js", "Vite", "Gemini AI",
  "Chart.js", "Google Workspace",
];

const STAT_CARDS = [
  { value: "12", label: "Sistem Dibangunkan", sub: "2020–2026" },
  { value: "10", label: "Sistem Aktif", sub: "Dalam operasi" },
  { value: "5+", label: "Tahun Inovasi", sub: "Berterusan" },
];

export default function HeroSection() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0B0B0F" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-10 md:pt-28 md:pb-12">
        {/* Badge pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
          <span className="text-xs text-gray-400 font-medium tracking-wide">
            Jemaah Nazir · Kementerian Pendidikan Malaysia
          </span>
        </div>

        {/* Bold split heading */}
        <h1
          className="font-bold leading-none mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="block text-5xl md:text-7xl text-white">
            Inovasi Digital
          </span>
          <span
            className="block text-5xl md:text-7xl"
            style={{ color: "#3B82F6" }}
          >
            Jemaah Nazir
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed mb-10">
          Koleksi inovasi digital yang dibangunkan untuk transformasi sistem
          pemeriksaan dan pengurusan pendidikan Malaysia.
        </p>

        {/* Bento stat cards */}
        <div className="grid grid-cols-3 gap-3 max-w-md">
          {STAT_CARDS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 flex flex-col gap-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {s.value}
              </span>
              <span className="text-xs text-gray-300 font-medium leading-tight">
                {s.label}
              </span>
              <span className="text-xs text-gray-600">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee ticker strip */}
      <div
        className="relative overflow-hidden py-4"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div className="flex w-max animate-marquee">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-4 px-4 text-sm font-medium whitespace-nowrap"
              style={{ color: "#6B6B80" }}
            >
              {item}
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#2A2A35" }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
