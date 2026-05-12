"use client";

import { useState } from "react";
import { INOVASI_SEED, STATUS_CONFIG } from "@/lib/data";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  Cpu,
  Save,
  X,
  Lock,
  ShieldCheck,
} from "lucide-react";

const ADMIN_PASSWORD = "FISHA2026-UD";

type InovasiItem = (typeof INOVASI_SEED)[number] & { id?: string };

const defaultItem: InovasiItem = {
  nama: "",
  slug: "",
  deskripsi: "",
  deskripsi_panjang: "",
  tech_stack: [],
  tags: [],
  status: "aktif",
  tahun: new Date().getFullYear(),
  link_demo: "",
  link_github: "",
  gambar_url: "",
  ikon: "ðŸš€",
  warna_tema: "#3B82F6",
  is_published: true,
  urutan: 99,
};

/* â”€â”€â”€ Password Gate â”€â”€â”€ */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = () => {
    if (pw === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
      setPw("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#0B0B0F" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative w-full max-w-sm rounded-2xl p-8 space-y-6"
        style={{
          background: "#111116",
          border: "1px solid rgba(255,255,255,0.08)",
          animation: shake ? "shake 0.4s ease" : undefined,
        }}
      >
        {/* Icon */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            <Lock size={24} style={{ color: "#3B82F6" }} />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Cpu size={13} className="text-brand-500" />
              <span className="text-xs text-gray-500 font-medium tracking-wide">FISHA Innovation Hub</span>
            </div>
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Admin CMS
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Masukkan kata laluan untuk teruskan</p>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Kata laluan admin..."
            autoFocus
            className="w-full px-4 py-3 rounded-xl text-sm text-gray-200 placeholder-gray-600 outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
            }}
          />

          {error && (
            <p className="text-xs text-red-400 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
              Kata laluan tidak sah. Cuba lagi.
            </p>
          )}

          <button
            onClick={submit}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "#3B82F6" }}
          >
            Masuk
          </button>
        </div>

        <p className="text-center text-xs text-gray-700">
          Jemaah Nazir Â· Kementerian Pendidikan Malaysia
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}

/* â”€â”€â”€ Main Page â”€â”€â”€ */
export default function AdminPage() {
  const [locked, setLocked] = useState(true);
  const [items, setItems] = useState<InovasiItem[]>(INOVASI_SEED as InovasiItem[]);
  const [editing, setEditing] = useState<InovasiItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  if (locked) return <PasswordGate onUnlock={() => setLocked(false)} />;

  const openEdit = (item: InovasiItem) => { setEditing({ ...item }); setIsNew(false); };
  const openNew = () => { setEditing({ ...defaultItem }); setIsNew(true); };
  const closeEdit = () => { setEditing(null); setIsNew(false); };

  const saveEdit = () => {
    if (!editing) return;
    if (isNew) {
      setItems((prev) => [...prev, { ...editing, id: Date.now().toString() }]);
    } else {
      setItems((prev) => prev.map((i) => (i.slug === editing.slug ? editing : i)));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    closeEdit();
  };

  const deleteItem = (slug: string) => {
    if (!confirm("Padam inovasi ini?")) return;
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  const togglePublish = (slug: string) => {
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, is_published: !i.is_published } : i))
    );
  };

  if (editing) {
    return (
      <EditForm
        item={editing}
        isNew={isNew}
        onChange={setEditing}
        onSave={saveEdit}
        onCancel={closeEdit}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0B0B0F" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(11,11,15,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              <ArrowLeft size={15} />
              Portal
            </a>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>|</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
                <Cpu size={13} className="text-white" />
              </div>
              <span className="font-bold text-white text-sm">Admin CMS</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
              <ShieldCheck size={12} style={{ color: "#34D399" }} />
              <span className="text-xs font-medium" style={{ color: "#34D399" }}>Telah disahkan</span>
            </div>
            <button onClick={openNew} className="btn-primary text-sm">
              <Plus size={15} />
              Tambah Inovasi
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {saved && (
          <div
            className="mb-4 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in flex items-center gap-2"
            style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#34D399" }}
          >
            <ShieldCheck size={15} />
            Perubahan disimpan berjaya
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Senarai Inovasi
          </h1>
          <p className="text-sm text-gray-600 mt-0.5">{items.length} inovasi direkodkan</p>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                  {["SISTEM", "STATUS", "TAHUN", "TAGS", "PUBLISH", "TINDAKAN"].map((h) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-xs font-semibold uppercase tracking-wide ${h === "TINDAKAN" ? "text-right" : h === "PUBLISH" ? "text-center" : "text-left"}`}
                      style={{ color: "#6B6B80" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const statusCfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
                  return (
                    <tr
                      key={item.slug}
                      className="transition-colors"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.ikon}</span>
                          <div>
                            <p className="font-semibold text-white">{item.nama}</p>
                            <p className="text-xs font-mono" style={{ color: "#6B6B80" }}>{item.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`tag-pill border ${statusCfg.color}`}>
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500">{item.tahun}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {item.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 rounded text-xs"
                              style={{ background: "rgba(255,255,255,0.06)", color: "#9CA3AF" }}
                            >
                              {t}
                            </span>
                          ))}
                          {item.tags.length > 2 && (
                            <span className="text-xs text-gray-600">+{item.tags.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => togglePublish(item.slug)}
                          className="transition-colors"
                          style={{ color: item.is_published ? "#34D399" : "#374151" }}
                          title={item.is_published ? "Published" : "Hidden"}
                        >
                          {item.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="p-1.5 rounded-lg transition-all text-gray-600 hover:text-brand-400"
                            style={{}}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => deleteItem(item.slug)}
                            className="p-1.5 rounded-lg transition-all text-gray-600 hover:text-red-400"
                            title="Padam"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-center" style={{ color: "#3A3A4A" }}>
          Mode demo â€” data disimpan dalam state sahaja. Sambungkan Supabase untuk persistence.
        </p>
      </main>
    </div>
  );
}

/* â”€â”€â”€ Edit Form â”€â”€â”€ */
function EditForm({
  item,
  isNew,
  onChange,
  onSave,
  onCancel,
}: {
  item: InovasiItem;
  isNew: boolean;
  onChange: (i: InovasiItem) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const set = (field: keyof InovasiItem, value: unknown) =>
    onChange({ ...item, [field]: value });

  return (
    <div className="min-h-screen" style={{ background: "#0B0B0F" }}>
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(11,11,15,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              <ArrowLeft size={15} />
              Kembali
            </button>
            <span className="font-bold text-white text-sm">
              {isNew ? "Tambah Inovasi Baru" : `Edit: ${item.nama}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onCancel} className="btn-secondary text-sm">
              <X size={14} />
              Batal
            </button>
            <button onClick={onSave} className="btn-primary text-sm">
              <Save size={14} />
              Simpan
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Row: nama + slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Nama Sistem *">
              <input type="text" value={item.nama} onChange={(e) => set("nama", e.target.value)} className="form-input" placeholder="e.g. STTPMP" />
            </FormField>
            <FormField label="Slug *">
              <input type="text" value={item.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} className="form-input font-mono" placeholder="e.g. sttpmp" />
            </FormField>
          </div>

          <FormField label="Deskripsi Ringkas *">
            <textarea value={item.deskripsi} onChange={(e) => set("deskripsi", e.target.value)} rows={3} className="form-input resize-none" placeholder="Penerangan pendek tentang sistem..." />
          </FormField>

          <FormField label="Deskripsi Terperinci">
            <textarea value={item.deskripsi_panjang ?? ""} onChange={(e) => set("deskripsi_panjang", e.target.value)} rows={4} className="form-input resize-none" placeholder="Penerangan lebih lanjut..." />
          </FormField>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Tahun">
              <input type="number" value={item.tahun} onChange={(e) => set("tahun", parseInt(e.target.value))} className="form-input" min={2015} max={2030} />
            </FormField>
            <FormField label="Ikon (Emoji)">
              <input type="text" value={item.ikon} onChange={(e) => set("ikon", e.target.value)} className="form-input text-2xl" maxLength={2} />
            </FormField>
            <FormField label="Warna Tema">
              <div className="flex items-center gap-2">
                <input type="color" value={item.warna_tema} onChange={(e) => set("warna_tema", e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer p-0.5" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent" }} />
                <input type="text" value={item.warna_tema} onChange={(e) => set("warna_tema", e.target.value)} className="form-input font-mono text-sm flex-1" />
              </div>
            </FormField>
          </div>

          <FormField label="Status">
            <select value={item.status} onChange={(e) => set("status", e.target.value as "aktif" | "dalam-pembangunan" | "arkib")} className="form-input">
              <option value="aktif">Aktif</option>
              <option value="dalam-pembangunan">Dalam Pembangunan</option>
              <option value="arkib">Arkib</option>
            </select>
          </FormField>

          <FormField label="Tech Stack" hint="Pisahkan dengan koma">
            <input type="text" value={item.tech_stack.join(", ")} onChange={(e) => set("tech_stack", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} className="form-input" placeholder="Next.js, TypeScript, Supabase, ..." />
          </FormField>

          <FormField label="Feature Tags" hint="Pisahkan dengan koma">
            <input type="text" value={item.tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} className="form-input" placeholder="Dashboard, RBAC, Real-time, ..." />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Link Demo">
              <input type="url" value={item.link_demo ?? ""} onChange={(e) => set("link_demo", e.target.value || null)} className="form-input" placeholder="https://..." />
            </FormField>
            <FormField label="Link GitHub">
              <input type="url" value={item.link_github ?? ""} onChange={(e) => set("link_github", e.target.value || null)} className="form-input" placeholder="https://github.com/..." />
            </FormField>
          </div>

          <FormField label="Gambar / Screenshot" hint="URL gambar (1200Ã—630 disyorkan)">
            <input type="url" value={item.gambar_url ?? ""} onChange={(e) => set("gambar_url", e.target.value || null)} className="form-input" placeholder="https://i.imgur.com/..." />
            {item.gambar_url ? (
              <div className="mt-2 relative rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={item.gambar_url} alt="Preview" className="w-full h-44 object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden"); }} />
                <div className="hidden absolute inset-0 flex items-center justify-center text-sm text-gray-500" style={{ background: "rgba(255,255,255,0.03)" }}>âš ï¸ URL gambar tidak sah</div>
                <button type="button" onClick={() => set("gambar_url", null)} className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors">
                  <X size={12} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="mt-2 rounded-xl h-32 flex flex-col items-center justify-center gap-1.5 text-gray-600" style={{ border: `2px dashed rgba(255,255,255,0.08)`, background: `${item.warna_tema}08` }}>
                <span className="text-3xl">{item.ikon || "ðŸ–¼ï¸"}</span>
                <span className="text-xs">Tiada gambar â€” akan guna placeholder auto</span>
              </div>
            )}
          </FormField>

          {/* Publish toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p className="font-semibold text-white text-sm">Publish ke Portal</p>
              <p className="text-xs text-gray-600 mt-0.5">Inovasi akan dipaparkan kepada awam</p>
            </div>
            <button
              onClick={() => set("is_published", !item.is_published)}
              className="relative w-11 h-6 rounded-full transition-colors duration-200"
              style={{ background: item.is_published ? "#3B82F6" : "rgba(255,255,255,0.1)" }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                style={{ transform: item.is_published ? "translateX(1.375rem)" : "translateX(0.125rem)" }}
              />
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #E5E7EB;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input::placeholder { color: #4B5563; }
        .form-input:focus {
          border-color: rgba(59,130,246,0.5);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
        }
        .form-input option { background: #111116; color: #E5E7EB; }
      `}</style>
    </div>
  );
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-400">{label}</label>
        {hint && <span className="text-xs text-gray-600">{hint}</span>}
      </div>
      {children}
    </div>
  );
}


