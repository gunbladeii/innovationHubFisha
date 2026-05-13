import {
  INOVASI_SEED,
  SKILL_GROUPS,
  CV_PERSONAL,
  CV_PENDIDIKAN,
  CV_PENGALAMAN,
  CV_PENCAPAIAN,
} from "@/lib/data";

// ─── Shared print styles ──────────────────────────────────────────────────────

const cvSectionTitle: React.CSSProperties = {
  fontSize: 8,
  fontWeight: 800,
  color: "#1D4ED8",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  borderBottom: "1.5px solid #BFDBFE",
  paddingBottom: 3,
  marginTop: 0,
  marginBottom: 8,
};

const leftLabel: React.CSSProperties = {
  fontSize: 8.5,
  color: "#374151",
  lineHeight: 1.55,
  margin: 0,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CVTemplate() {
  const aktifCount = INOVASI_SEED.filter((i) => i.status === "aktif").length;
  const tahunMin = Math.min(...INOVASI_SEED.map((i) => i.tahun));
  const tahunMax = Math.max(...INOVASI_SEED.map((i) => i.tahun));

  return (
    <div
      id="cv-print-area"
      className="print-only"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif",
        background: "white",
        width: "210mm",
        margin: "0 auto",
        color: "#111827",
        fontSize: 9,
      }}
    >
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header
        style={{
          background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)",
          color: "white",
          padding: "18px 22px",
          display: "flex",
          gap: 18,
          alignItems: "center",
        }}
      >
        {/* Name + Title + Contacts */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              margin: "0 0 3px",
              letterSpacing: "-0.4px",
            }}
          >
            {CV_PERSONAL.nama}
          </h1>
          <p
            style={{
              fontSize: 11,
              margin: "0 0 2px",
              opacity: 0.92,
              fontWeight: 600,
            }}
          >
            {CV_PERSONAL.jawatan}
          </p>
          <p style={{ fontSize: 9.5, margin: "0 0 7px", opacity: 0.72 }}>
            {CV_PERSONAL.organisasi}
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { icon: "📍", text: CV_PERSONAL.lokasi },
              { icon: "✉️", text: CV_PERSONAL.email },
              { icon: "📞", text: CV_PERSONAL.telefon },
            ].map((c) => (
              <span
                key={c.text}
                style={{
                  fontSize: 9,
                  opacity: 0.85,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {c.icon} {c.text}
              </span>
            ))}
          </div>
        </div>

        {/* Stats badges */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexShrink: 0,
            alignItems: "stretch",
          }}
        >
          {[
            { value: `${INOVASI_SEED.length}+`, label: "Sistem\nDibangunkan" },
            { value: `${aktifCount}`, label: "Sistem\nAktif" },
            { value: `${tahunMax - tahunMin + 1}+`, label: "Tahun\nInovasi" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                background: "rgba(255,255,255,0.13)",
                borderRadius: 8,
                padding: "8px 10px",
                minWidth: 54,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 7.5,
                  opacity: 0.82,
                  marginTop: 3,
                  lineHeight: 1.3,
                  whiteSpace: "pre-line",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Passport Photo — top-right corner ──────────────────────── */}
        <div style={{ flexShrink: 0, alignSelf: "flex-start" }}>
          <img
            src="/passport-fisha.png"
            alt={CV_PERSONAL.nama}
            style={{
              width: 82,
              height: 102,
              objectFit: "cover",
              objectPosition: "center top",
              borderRadius: 4,
              border: "2.5px solid rgba(255,255,255,0.7)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
              display: "block",
              background: "white",
            }}
          />
        </div>
      </header>

      {/* ── BODY ───────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "195px 1fr",
          gap: 0,
          padding: "14px 22px",
          background: "white",
          alignItems: "start",
        }}
      >
        {/* ── LEFT COLUMN ────────────────────────────────────────────── */}
        <div
          style={{
            paddingRight: 14,
            borderRight: "1.5px solid #E5E7EB",
          }}
        >
          {/* Ringkasan */}
          <div style={{ marginBottom: 12 }}>
            <h2 style={cvSectionTitle}>Ringkasan Profesional</h2>
            <p style={leftLabel}>{CV_PERSONAL.bio}</p>
          </div>

          {/* Kemahiran Utama */}
          <div style={{ marginBottom: 12 }}>
            <h2 style={cvSectionTitle}>Kemahiran Utama</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {[
                "Next.js / React",
                "TypeScript",
                "Laravel / PHP",
                "Supabase",
                "Firebase",
                "MySQL / PostgreSQL",
                "Tailwind CSS",
                "Node.js",
                "Gemini AI",
                "Google Apps Script",
                "React Native",
                "Python",
                "CI/CD",
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: 7.5,
                    padding: "2px 6px",
                    borderRadius: 10,
                    background: "#EFF6FF",
                    color: "#1D4ED8",
                    border: "1px solid #BFDBFE",
                    fontWeight: 600,
                    display: "inline-block",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Pencapaian */}
          <div style={{ marginBottom: 12 }}>
            <h2 style={cvSectionTitle}>Pencapaian Utama</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {CV_PENCAPAIAN.map((p, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 5, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      color: "#3B82F6",
                      fontSize: 8,
                      flexShrink: 0,
                      marginTop: 2,
                      fontWeight: 700,
                    }}
                  >
                    ▸
                  </span>
                  <p style={{ fontSize: 8, color: "#374151", lineHeight: 1.5, margin: 0 }}>
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pengalaman */}
          <div style={{ marginBottom: 12 }}>
            <h2 style={cvSectionTitle}>Pengalaman Kerja</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CV_PENGALAMAN.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    paddingLeft: 8,
                    borderLeft: "2px solid #3B82F6",
                  }}
                >
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#111827",
                      margin: "0 0 1px",
                    }}
                  >
                    {exp.jawatan}
                  </p>
                  <p
                    style={{
                      fontSize: 8,
                      color: "#2563EB",
                      fontWeight: 600,
                      margin: "0 0 1px",
                    }}
                  >
                    {exp.org}
                  </p>
                  <p
                    style={{
                      fontSize: 7.5,
                      color: "#9CA3AF",
                      margin: "0 0 2px",
                      fontStyle: "italic",
                    }}
                  >
                    {exp.tahun}
                  </p>
                  <p
                    style={{
                      fontSize: 8,
                      color: "#4B5563",
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pendidikan */}
          <div style={{ marginBottom: 12 }}>
            <h2 style={cvSectionTitle}>Pendidikan</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {CV_PENDIDIKAN.map((p, i) => (
                <div
                  key={i}
                  style={{
                    paddingLeft: 8,
                    borderLeft: "2px solid #93C5FD",
                  }}
                >
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 1px",
                    }}
                  >
                    {p.kelayakan}
                  </p>
                  <p style={{ fontSize: 8, color: "#6B7280", margin: "0 0 1px" }}>
                    {p.bidang}
                  </p>
                  <p style={{ fontSize: 8, color: "#6B7280", margin: "0 0 1px" }}>
                    {p.institusi}
                  </p>
                  <p style={{ fontSize: 8, color: "#3B82F6", margin: 0 }}>
                    {p.tahun}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Detail */}
          <div>
            <h2 style={cvSectionTitle}>Teknologi Terperinci</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {SKILL_GROUPS.slice(0, 5).map((group) => (
                <div key={group.kategori}>
                  <p
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: group.warna,
                      margin: "0 0 2px",
                    }}
                  >
                    {group.ikon} {group.kategori}
                  </p>
                  <p
                    style={{
                      fontSize: 7.5,
                      color: "#4B5563",
                      margin: 0,
                      lineHeight: 1.45,
                    }}
                  >
                    {group.kemahiran.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Portfolio ────────────────────────────────── */}
        <div style={{ paddingLeft: 14 }}>
          <div style={{ marginBottom: 8 }}>
            <h2 style={cvSectionTitle}>Portfolio Inovasi Digital</h2>
            <p
              style={{
                fontSize: 8,
                color: "#6B7280",
                margin: "0 0 10px",
                fontStyle: "italic",
              }}
            >
              {INOVASI_SEED.length} projek telah dibangunkan · {aktifCount} aktif
              beroperasi · {tahunMin}–{tahunMax}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {INOVASI_SEED.map((item) => (
              <div
                key={item.slug}
                style={{
                  padding: "7px 10px",
                  borderRadius: 5,
                  border: `1px solid ${item.warna_tema}28`,
                  borderLeft: `3px solid ${item.warna_tema}`,
                  background: `${item.warna_tema}05`,
                  pageBreakInside: "avoid",
                  breakInside: "avoid",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Name row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        marginBottom: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ fontSize: 11 }}>{item.ikon}</span>
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        {item.nama}
                      </span>
                      <span
                        style={{
                          fontSize: 8,
                          color: "#9CA3AF",
                          fontStyle: "italic",
                        }}
                      >
                        ({item.tahun})
                      </span>
                    </div>
                    {/* Description */}
                    <p
                      style={{
                        fontSize: 8,
                        color: "#374151",
                        lineHeight: 1.45,
                        margin: "0 0 4px",
                      }}
                    >
                      {item.deskripsi}
                    </p>
                    {/* Tech stack */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                      {item.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: 7,
                            padding: "1px 5px",
                            borderRadius: 8,
                            background: `${item.warna_tema}14`,
                            color: item.warna_tema,
                            fontWeight: 600,
                            border: `1px solid ${item.warna_tema}30`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status badge */}
                  <span
                    style={{
                      fontSize: 7,
                      padding: "2px 7px",
                      borderRadius: 8,
                      flexShrink: 0,
                      background:
                        item.status === "aktif"
                          ? "#D1FAE5"
                          : item.status === "dalam-pembangunan"
                          ? "#FEF3C7"
                          : "#F3F4F6",
                      color:
                        item.status === "aktif"
                          ? "#065F46"
                          : item.status === "dalam-pembangunan"
                          ? "#92400E"
                          : "#4B5563",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.status === "aktif"
                      ? "Aktif"
                      : item.status === "dalam-pembangunan"
                      ? "WIP"
                      : "Arkib"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional skill groups */}
          <div style={{ marginTop: 14 }}>
            <h2 style={cvSectionTitle}>Kemahiran Tambahan</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 6,
              }}
            >
              {SKILL_GROUPS.slice(5).map((group) => (
                <div
                  key={group.kategori}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 5,
                    background: "#F9FAFB",
                    border: "1px solid #E5E7EB",
                    pageBreakInside: "avoid",
                    breakInside: "avoid",
                  }}
                >
                  <p
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: group.warna,
                      margin: "0 0 3px",
                    }}
                  >
                    {group.ikon} {group.kategori}
                  </p>
                  <p
                    style={{
                      fontSize: 7.5,
                      color: "#4B5563",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {group.kemahiran.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#F0F4FF",
          borderTop: "1px solid #DBEAFE",
          padding: "7px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 7.5, color: "#6B7280", margin: 0 }}>
          Curriculum Vitae · {CV_PERSONAL.nama} · {CV_PERSONAL.organisasi}
        </p>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#3B82F6",
          }}
        />
        <p style={{ fontSize: 7.5, color: "#6B7280", margin: 0 }}>
          Dijana oleh FISHA Innovation Hub
        </p>
      </footer>
    </div>
  );
}
