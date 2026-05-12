const PROFIL = {
  nama: "Fisha",
  jawatan: "Pegawai Teknologi Maklumat",
  organisasi: "Jemaah Nazir, Kementerian Pendidikan Malaysia",
  bio: "Pakar ICT yang berpengalaman dalam pembangunan sistem digital untuk sektor kerajaan dan swasta. Memfokuskan kepada transformasi digital pendidikan melalui inovasi teknologi moden.",
};

const SKILL_GROUPS = [
  {
    kategori: "Web & Frontend",
    warna: "#3B82F6",
    ikon: "🌐",
    kemahiran: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "Vite", "Framer Motion"],
  },
  {
    kategori: "Backend & API",
    warna: "#8B5CF6",
    ikon: "⚙️",
    kemahiran: ["Node.js", "Laravel (PHP)", "REST API", "Python (Flask)", "Google Apps Script", "Webhooks"],
  },
  {
    kategori: "Database & Cloud",
    warna: "#06B6D4",
    ikon: "🗄️",
    kemahiran: ["Supabase", "Firebase", "MySQL", "PostgreSQL", "MongoDB", "Vercel", "Google Cloud"],
  },
  {
    kategori: "Mobile — Android",
    warna: "#10B981",
    ikon: "🤖",
    kemahiran: ["React Native", "Expo", "Android Studio", "Firebase FCM", "QR Code Integration", "Offline-first"],
  },
  {
    kategori: "Mobile — iOS",
    warna: "#64748B",
    ikon: "🍎",
    kemahiran: ["React Native (iOS)", "Expo EAS Build", "TestFlight", "Apple Push Notification", "Swift (asas)"],
  },
  {
    kategori: "Sistem Kerajaan",
    warna: "#F59E0B",
    ikon: "🏛️",
    kemahiran: ["MyGov API", "Sistem SAGA", "ePerolehan", "HRMIS", "SPP (Sistem Perkhidmatan Pendidikan)", "Google Workspace for Edu"],
  },
  {
    kategori: "Produktiviti & Tools",
    warna: "#EF4444",
    ikon: "🛠️",
    kemahiran: ["Git / GitHub", "VS Code", "Figma", "Postman", "Power BI", "Google Looker Studio", "Microsoft 365"],
  },
  {
    kategori: "AI & Analitik",
    warna: "#EC4899",
    ikon: "🤖",
    kemahiran: ["Gemini AI", "OpenAI API", "Chart.js", "Google Analytics", "Prompt Engineering", "AI Integration"],
  },
];

const PENGALAMAN = [
  { tahun: "2020–kini", perkara: "Pembangunan 12+ sistem digital untuk Jemaah Nazir", ikon: "🚀" },
  { tahun: "2023–kini", perkara: "Integrasi AI (Gemini) ke dalam sistem analitik pendidikan", ikon: "🧠" },
  { tahun: "2022–kini", perkara: "Pembangunan aplikasi mudah alih Android & iOS untuk pengurusan pemeriksaan", ikon: "📱" },
  { tahun: "2021–kini", perkara: "Pengurusan pangkalan data cloud — Supabase, Firebase, MongoDB", ikon: "☁️" },
  { tahun: "2020–kini", perkara: "Automasi proses kerajaan menggunakan Google Apps Script & API", ikon: "⚡" },
];

export default function TentangSaya() {
  return (
    <section
      id="tentang"
      className="relative"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EFF6FF 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(59,130,246,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Section header */}
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
            style={{ borderColor: "rgba(59,130,246,0.25)", background: "rgba(59,130,246,0.07)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span className="text-xs text-brand-700 font-medium tracking-wide">Profil Pembangun</span>
          </div>
          <h2 className="section-title mb-3">Tentang Saya</h2>
          <p className="text-slate-500 text-base max-w-xl">
            Kemahiran teknikal dan pengalaman dalam pembangunan sistem digital untuk transformasi pendidikan Malaysia.
          </p>
        </div>

        {/* Profil card + pengalaman */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Profil */}
          <div
            className="lg:col-span-1 rounded-2xl overflow-hidden flex flex-col"
            style={{ background: "#FFFFFF", border: "1px solid rgba(59,130,246,0.15)", boxShadow: "0 4px 24px rgba(59,130,246,0.07)" }}
          >
            {/* Hero image */}
            <div className="relative w-full overflow-hidden" style={{ height: "220px", background: "#0a0a0a" }}>
              <img
                src="/profil-fisha.jpeg"
                alt="Fisha — Inovasi Digital"
                className="w-full h-full"
                style={{ objectFit: "cover", objectPosition: "center 15%" }}
              />
              {/* gradient overlay bawah untuk blend ke info */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16"
                style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 p-6 pt-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {PROFIL.nama}
              </h3>
              <p className="text-brand-600 text-sm font-medium mt-0.5">{PROFIL.jawatan}</p>
              <p className="text-gray-400 text-xs mt-0.5">{PROFIL.organisasi}</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{PROFIL.bio}</p>

            <div className="pt-3 border-t" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Pengalaman Utama</p>
              <div className="space-y-2.5">
                {PENGALAMAN.map((p) => (
                  <div key={p.tahun} className="flex items-start gap-2.5">
                    <span className="text-base flex-shrink-0 mt-0.5">{p.ikon}</span>
                    <div>
                      <p className="text-xs text-gray-700 leading-snug">{p.perkara}</p>
                      <p className="text-xs text-blue-400 font-medium mt-0.5">{p.tahun}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div> {/* end flex flex-col gap-4 (Info) */}
          </div> {/* end card */}

          {/* Skills grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.kategori}
                className="rounded-2xl p-4"
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${group.warna}20`,
                  boxShadow: `0 2px 12px ${group.warna}08`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{group.ikon}</span>
                  <p
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ color: group.warna }}
                  >
                    {group.kategori}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.kemahiran.map((k) => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: `${group.warna}10`,
                        color: group.warna,
                        border: `1px solid ${group.warna}25`,
                      }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
