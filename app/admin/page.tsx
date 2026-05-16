"use client";

import { useState, useEffect } from "react";
import { INOVASI_SEED, STATUS_CONFIG } from "@/lib/data";
import type { Inovasi } from "@/lib/database.types";
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
  Bell,
  Lightbulb,
  FolderOpen,
  MessageSquare,
  Clock,
  CheckCircle2,
  ChevronDown,
  LayoutList,
} from "lucide-react";

const ADMIN_PASSWORD = "FISHA2026-UD";

type InovasiItem = Omit<Inovasi, "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

type ResponItem = {
  id: string;
  created_at: string;
  jenis: "cadangan" | "permohonan" | "maklumbalas";
  nama: string;
  jawatan?: string | null;
  unit?: string | null;
  email: string;
  keutamaan: "rendah" | "sederhana" | "tinggi";
  mesej: string;
  status: "baharu" | "dalam-semakan" | "selesai";
};

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
          Fisha Â· MoE
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
  const [items, setItems] = useState<InovasiItem[]>([]);
  const [editing, setEditing] = useState<InovasiItem | null>(null);
  const [origSlug, setOrigSlug] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminTab, setAdminTab] = useState<"inovasi" | "respon">("inovasi");
  const [respon, setRespon] = useState<ResponItem[]>([]);
  const [loadingRespon, setLoadingRespon] = useState(false);
  const [responFilter, setResponFilter] = useState<"semua" | "cadangan" | "permohonan" | "maklumbalas">("semua");

  // Fetch inovasi dari Supabase selepas unlock
  useEffect(() => {
    if (locked) return;
    setLoading(true);
    fetch("/api/inovasi", {
      headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
    })
      .then((r) => r.json())
      .then((rows) => {
        if (Array.isArray(rows)) setItems(rows as InovasiItem[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locked]);

  // Fetch respon_awam apabila tab respon dibuka
  useEffect(() => {
    if (locked || adminTab !== "respon") return;
    setLoadingRespon(true);
    fetch("/api/respon", {
      headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
    })
      .then((r) => r.json())
      .then((rows) => {
        if (Array.isArray(rows)) setRespon(rows as ResponItem[]);
        setLoadingRespon(false);
      })
      .catch(() => setLoadingRespon(false));
  }, [locked, adminTab]);

  const updateResponStatus = async (id: string, status: ResponItem["status"]) => {
    const res = await fetch("/api/respon", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_PASSWORD}`,
      },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setRespon((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    }
  };

  if (locked) return <PasswordGate onUnlock={() => setLocked(false)} />;

  const openEdit = (item: InovasiItem) => { setEditing({ ...item }); setOrigSlug(item.slug); setIsNew(false); };
  const openNew = () => { setEditing({ ...defaultItem }); setOrigSlug(null); setIsNew(true); };
  const closeEdit = () => { setEditing(null); setOrigSlug(null); setIsNew(false); };

  const saveEdit = async () => {
    if (!editing) return;
    setLoading(true);
    // Strip server-managed fields sebelum hantar ke API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, created_at: _ca, updated_at: _ua, ...payload } = editing as Record<string, unknown>;
    const matchSlug = origSlug ?? editing.slug;
    if (isNew) {
      const res = await fetch("/api/inovasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ADMIN_PASSWORD}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const newItem = await res.json() as InovasiItem;
        setItems((prev) => [...prev, newItem]);
      }
    } else {
      const res = await fetch(`/api/inovasi/${matchSlug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ADMIN_PASSWORD}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setItems((prev) => prev.map((i) => (i.slug === matchSlug ? editing : i)));
      }
    }
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    closeEdit();
  };

  const deleteItem = async (slug: string) => {
    if (!confirm("Padam inovasi ini?")) return;
    const res = await fetch(`/api/inovasi/${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
    });
    if (res.ok) setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  const togglePublish = async (slug: string) => {
    const item = items.find((i) => i.slug === slug);
    if (!item) return;
    const newVal = !item.is_published;
    const res = await fetch(`/api/inovasi/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_PASSWORD}`,
      },
      body: JSON.stringify({ is_published: newVal }),
    });
    if (res.ok) setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, is_published: newVal } : i)));
  };

  if (editing) {
    return (
      <EditForm
        item={editing}
        isNew={isNew}
        onChange={setEditing}
        onSave={saveEdit}
        onCancel={closeEdit}
        isSaving={loading}
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
            {adminTab === "inovasi" && (
              <button onClick={openNew} className="btn-primary text-sm">
                <Plus size={15} />
                Tambah Inovasi
              </button>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 pb-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { key: "inovasi", label: "Senarai Inovasi", icon: <LayoutList size={14} /> },
            { key: "respon", label: "Respon Awam", icon: <Bell size={14} />, badge: respon.filter(r => r.status === "baharu").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setAdminTab(tab.key as "inovasi" | "respon")}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors relative"
              style={{
                color: adminTab === tab.key ? "#60A5FA" : "#6B6B80",
                borderBottom: adminTab === tab.key ? "2px solid #3B82F6" : "2px solid transparent",
              }}
            >
              {tab.icon}
              {tab.label}
              {tab.badge ? (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold" style={{ background: "#EF4444", color: "#fff", fontSize: "10px" }}>
                  {tab.badge}
                </span>
              ) : null}
            </button>
          ))}
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

        {adminTab === "inovasi" ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Senarai Inovasi
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">{loading ? "Memuatkan data..." : `${items.length} inovasi direkodkan`}</p>
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
              Data disimpan dalam Supabase — perubahan dipaparkan kepada semua pengguna secara langsung.
            </p>
          </>
        ) : (
          <ResponPanel
            items={respon}
            loading={loadingRespon}
            filter={responFilter}
            onFilterChange={setResponFilter}
            onStatusChange={updateResponStatus}
          />
        )}
      </main>
    </div>
  );
}

/* ─── Respon Panel ─── */
const KATEGORI_CONFIG = {
  cadangan: { label: "Cadangan Inovasi", icon: <Lightbulb size={16} />, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
  permohonan: { label: "Permohonan Projek", icon: <FolderOpen size={16} />, color: "#3B82F6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" },
  maklumbalas: { label: "Maklum Balas", icon: <MessageSquare size={16} />, color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
};

const STATUS_RESPON_CONFIG = {
  baharu: { label: "Baharu", color: "#EF4444", bg: "rgba(239,68,68,0.12)", icon: <Bell size={11} /> },
  "dalam-semakan": { label: "Dalam Semakan", color: "#F59E0B", bg: "rgba(245,158,11,0.12)", icon: <Clock size={11} /> },
  selesai: { label: "Selesai", color: "#34D399", bg: "rgba(52,211,153,0.12)", icon: <CheckCircle2 size={11} /> },
};

const KEUTAMAAN_CONFIG = {
  rendah: { label: "Rendah", color: "#6B7280" },
  sederhana: { label: "Sederhana", color: "#F59E0B" },
  tinggi: { label: "Tinggi", color: "#EF4444" },
};

function ResponPanel({
  items,
  loading,
  filter,
  onFilterChange,
  onStatusChange,
}: {
  items: ResponItem[];
  loading: boolean;
  filter: "semua" | "cadangan" | "permohonan" | "maklumbalas";
  onFilterChange: (f: "semua" | "cadangan" | "permohonan" | "maklumbalas") => void;
  onStatusChange: (id: string, status: ResponItem["status"]) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const counts = {
    cadangan: items.filter((r) => r.jenis === "cadangan").length,
    permohonan: items.filter((r) => r.jenis === "permohonan").length,
    maklumbalas: items.filter((r) => r.jenis === "maklumbalas").length,
    baharu: items.filter((r) => r.status === "baharu").length,
  };

  const filtered = filter === "semua" ? items : items.filter((r) => r.jenis === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Respon Awam
        </h1>
        <p className="text-sm text-gray-600 mt-0.5">
          {loading ? "Memuatkan data..." : `${items.length} submission diterima · ${counts.baharu} belum ditangani`}
        </p>
      </div>

      {/* Category summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {(["cadangan", "permohonan", "maklumbalas"] as const).map((k) => {
          const cfg = KATEGORI_CONFIG[k];
          return (
            <button
              key={k}
              onClick={() => onFilterChange(filter === k ? "semua" : k)}
              className="rounded-2xl p-4 text-left transition-all"
              style={{
                background: filter === k ? cfg.bg : "#111116",
                border: `1px solid ${filter === k ? cfg.border : "rgba(255,255,255,0.08)"}`,
                outline: filter === k ? `2px solid ${cfg.color}33` : "none",
              }}
            >
              <div className="flex items-center gap-2 mb-2" style={{ color: cfg.color }}>
                {cfg.icon}
                <span className="text-xs font-semibold uppercase tracking-wide">{cfg.label}</span>
              </div>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {counts[k]}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#6B6B80" }}>
                {items.filter((r) => r.jenis === k && r.status === "baharu").length} baharu
              </p>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Filter strip */}
        <div className="flex items-center gap-2 px-5 py-3 flex-wrap" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#6B6B80" }}>Tapis:</span>
          {(["semua", "cadangan", "permohonan", "maklumbalas"] as const).map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: filter === f ? "rgba(59,130,246,0.15)" : "transparent",
                color: filter === f ? "#60A5FA" : "#6B6B80",
                border: `1px solid ${filter === f ? "rgba(59,130,246,0.3)" : "transparent"}`,
              }}
            >
              {f === "semua" ? "Semua" : KATEGORI_CONFIG[f].label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-gray-600">Memuatkan...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-600">Tiada submission lagi.</div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {filtered.map((item) => {
              const kategoriCfg = KATEGORI_CONFIG[item.jenis];
              const statusCfg = STATUS_RESPON_CONFIG[item.status];
              const keutamaanCfg = KEUTAMAAN_CONFIG[item.keutamaan];
              const isOpen = expanded === item.id;
              return (
                <div key={item.id}>
                  <div
                    className="flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors"
                    style={{ background: isOpen ? "rgba(255,255,255,0.02)" : "transparent" }}
                    onClick={() => setExpanded(isOpen ? null : item.id)}
                    onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)"; }}
                    onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Kategori icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: kategoriCfg.bg, color: kategoriCfg.color, border: `1px solid ${kategoriCfg.border}` }}
                    >
                      {kategoriCfg.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-white text-sm">{item.nama}</span>
                        {item.jawatan && <span className="text-xs text-gray-500">· {item.jawatan}</span>}
                        {item.unit && <span className="text-xs text-gray-500">· {item.unit}</span>}
                      </div>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "#6B6B80" }}>{item.mesej}</p>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="text-xs" style={{ color: "#6B6B80" }}>
                          {new Date(item.created_at).toLocaleDateString("ms-MY", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                        <span className="text-xs font-medium" style={{ color: keutamaanCfg.color }}>● {keutamaanCfg.label}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
                          style={{ background: statusCfg.bg, color: statusCfg.color }}>
                          {statusCfg.icon}{statusCfg.label}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      size={15}
                      className="flex-shrink-0 mt-1 transition-transform"
                      style={{ color: "#6B6B80", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 ml-12">
                      <div className="rounded-xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-gray-600 block mb-0.5">E-mel</span>
                            <span className="text-gray-300 font-medium">{item.email}</span>
                          </div>
                          {item.jawatan && (
                            <div>
                              <span className="text-gray-600 block mb-0.5">Jawatan</span>
                              <span className="text-gray-300 font-medium">{item.jawatan}</span>
                            </div>
                          )}
                          {item.unit && (
                            <div>
                              <span className="text-gray-600 block mb-0.5">Unit / Sekolah</span>
                              <span className="text-gray-300 font-medium">{item.unit}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-xs text-gray-600 block mb-1">Huraian</span>
                          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{item.mesej}</p>
                        </div>
                        {/* Status update */}
                        <div className="flex items-center gap-2 pt-1 flex-wrap">
                          <span className="text-xs text-gray-600">Kemaskini status:</span>
                          {(["baharu", "dalam-semakan", "selesai"] as const).map((s) => {
                            const sc = STATUS_RESPON_CONFIG[s];
                            return (
                              <button
                                key={s}
                                onClick={(e) => { e.stopPropagation(); onStatusChange(item.id, s); }}
                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                                style={{
                                  background: item.status === s ? sc.bg : "transparent",
                                  color: item.status === s ? sc.color : "#6B6B80",
                                  border: `1px solid ${item.status === s ? sc.color + "55" : "rgba(255,255,255,0.08)"}`,
                                }}
                              >
                                {sc.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Edit Form ─── */
function EditForm({
  item,
  isNew,
  onChange,
  onSave,
  onCancel,
  isSaving,
}: {
  item: InovasiItem;
  isNew: boolean;
  onChange: (i: InovasiItem) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
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
            <button onClick={onSave} disabled={isSaving} className="btn-primary text-sm" style={{ opacity: isSaving ? 0.6 : 1 }}>
              <Save size={14} />
              {isSaving ? "Menyimpan..." : "Simpan"}
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


