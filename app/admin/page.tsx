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
} from "lucide-react";

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
  ikon: "🚀",
  warna_tema: "#3B82F6",
  is_published: true,
  urutan: 99,
};

export default function AdminPage() {
  const [items, setItems] =
    useState<InovasiItem[]>(INOVASI_SEED as InovasiItem[]);
  const [editing, setEditing] = useState<InovasiItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  const openEdit = (item: InovasiItem) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const openNew = () => {
    setEditing({ ...defaultItem });
    setIsNew(true);
  };

  const closeEdit = () => {
    setEditing(null);
    setIsNew(false);
  };

  const saveEdit = () => {
    if (!editing) return;
    if (isNew) {
      setItems((prev) => [
        ...prev,
        { ...editing, id: Date.now().toString() },
      ]);
    } else {
      setItems((prev) =>
        prev.map((i) => (i.slug === editing.slug ? editing : i))
      );
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    closeEdit();
  };

  const deleteItem = (slug: string) => {
    if (!confirm("Padam inovasi ini?")) return;
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  const togglePublish = (slug: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug ? { ...i, is_published: !i.is_published } : i
      )
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              <ArrowLeft size={15} />
              Portal
            </a>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
                <Cpu size={14} className="text-white" />
              </div>
              <span className="font-bold text-gray-900 text-sm">
                Admin CMS
              </span>
            </div>
          </div>

          <button onClick={openNew} className="btn-primary text-sm">
            <Plus size={15} />
            Tambah Inovasi
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {saved && (
          <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium animate-fade-in">
            ✅ Perubahan disimpan berjaya
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Senarai Inovasi
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {items.length} inovasi direkodkan
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Sistem
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Tahun
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Tags
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Publish
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Tindakan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => {
                  const statusCfg =
                    STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
                  return (
                    <tr
                      key={item.slug}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.ikon}</span>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.nama}
                            </p>
                            <p className="text-xs text-gray-400 font-mono">
                              {item.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`tag-pill border ${statusCfg.color}`}
                        >
                          {statusCfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600">
                        {item.tahun}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {item.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-600"
                            >
                              {t}
                            </span>
                          ))}
                          {item.tags.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{item.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => togglePublish(item.slug)}
                          className={`transition-colors ${
                            item.is_published
                              ? "text-emerald-500 hover:text-emerald-700"
                              : "text-gray-300 hover:text-gray-500"
                          }`}
                          title={item.is_published ? "Published" : "Hidden"}
                        >
                          {item.is_published ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => deleteItem(item.slug)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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

        <p className="mt-4 text-xs text-gray-400 text-center">
          Nota: Data dalam mode demo disimpan dalam state sahaja. Sambungkan
          Supabase untuk persistence.
        </p>
      </main>
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              <ArrowLeft size={15} />
              Kembali
            </button>
            <span className="font-bold text-gray-900 text-sm">
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
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
          {/* Row: nama + slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Nama Sistem *">
              <input
                type="text"
                value={item.nama}
                onChange={(e) => set("nama", e.target.value)}
                className="form-input"
                placeholder="e.g. STTPMP"
              />
            </FormField>
            <FormField label="Slug *">
              <input
                type="text"
                value={item.slug}
                onChange={(e) =>
                  set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))
                }
                className="form-input font-mono"
                placeholder="e.g. sttpmp"
              />
            </FormField>
          </div>

          {/* Deskripsi */}
          <FormField label="Deskripsi Ringkas *">
            <textarea
              value={item.deskripsi}
              onChange={(e) => set("deskripsi", e.target.value)}
              rows={3}
              className="form-input resize-none"
              placeholder="Penerangan pendek tentang sistem..."
            />
          </FormField>

          {/* Deskripsi panjang */}
          <FormField label="Deskripsi Terperinci">
            <textarea
              value={item.deskripsi_panjang ?? ""}
              onChange={(e) => set("deskripsi_panjang", e.target.value)}
              rows={4}
              className="form-input resize-none"
              placeholder="Penerangan lebih lanjut (akan ditunjukkan dalam 'Baca lagi')..."
            />
          </FormField>

          {/* Row: tahun + ikon + warna */}
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Tahun">
              <input
                type="number"
                value={item.tahun}
                onChange={(e) => set("tahun", parseInt(e.target.value))}
                className="form-input"
                min={2015}
                max={2030}
              />
            </FormField>
            <FormField label="Ikon (Emoji)">
              <input
                type="text"
                value={item.ikon}
                onChange={(e) => set("ikon", e.target.value)}
                className="form-input text-2xl"
                maxLength={2}
              />
            </FormField>
            <FormField label="Warna Tema">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={item.warna_tema}
                  onChange={(e) => set("warna_tema", e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={item.warna_tema}
                  onChange={(e) => set("warna_tema", e.target.value)}
                  className="form-input font-mono text-sm flex-1"
                />
              </div>
            </FormField>
          </div>

          {/* Status */}
          <FormField label="Status">
            <select
              value={item.status}
              onChange={(e) =>
                set(
                  "status",
                  e.target.value as "aktif" | "dalam-pembangunan" | "arkib"
                )
              }
              className="form-input"
            >
              <option value="aktif">Aktif</option>
              <option value="dalam-pembangunan">Dalam Pembangunan</option>
              <option value="arkib">Arkib</option>
            </select>
          </FormField>

          {/* Tech Stack */}
          <FormField
            label="Tech Stack"
            hint="Pisahkan dengan koma"
          >
            <input
              type="text"
              value={item.tech_stack.join(", ")}
              onChange={(e) =>
                set(
                  "tech_stack",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              className="form-input"
              placeholder="Next.js, TypeScript, Supabase, ..."
            />
          </FormField>

          {/* Tags */}
          <FormField
            label="Feature Tags"
            hint="Pisahkan dengan koma"
          >
            <input
              type="text"
              value={item.tags.join(", ")}
              onChange={(e) =>
                set(
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              className="form-input"
              placeholder="Dashboard, RBAC, Real-time, ..."
            />
          </FormField>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Link Demo">
              <input
                type="url"
                value={item.link_demo ?? ""}
                onChange={(e) => set("link_demo", e.target.value || null)}
                className="form-input"
                placeholder="https://..."
              />
            </FormField>
            <FormField label="Link GitHub">
              <input
                type="url"
                value={item.link_github ?? ""}
                onChange={(e) => set("link_github", e.target.value || null)}
                className="form-input"
                placeholder="https://github.com/..."
              />
            </FormField>
          </div>

          {/* Gambar / Screenshot */}
          <FormField
            label="Gambar / Screenshot"
            hint="URL gambar (1200×630 disyorkan)"
          >
            <input
              type="url"
              value={item.gambar_url ?? ""}
              onChange={(e) => set("gambar_url", e.target.value || null)}
              className="form-input"
              placeholder="https://i.imgur.com/... atau URL terus"
            />
            {item.gambar_url ? (
              <div className="mt-2 relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={item.gambar_url}
                  alt="Preview"
                  className="w-full h-44 object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center text-sm text-gray-400 bg-gray-100">
                  ⚠️ URL gambar tidak sah
                </div>
                <button
                  type="button"
                  onClick={() => set("gambar_url", null)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                  title="Buang gambar"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            ) : (
              <div
                className="mt-2 rounded-xl border-2 border-dashed border-gray-200 h-32 flex flex-col items-center justify-center gap-1.5 text-gray-400 cursor-pointer"
                style={{ background: `${item.warna_tema}08` }}
              >
                <span className="text-3xl">{item.ikon || "🖼️"}</span>
                <span className="text-xs">Tiada gambar — akan guna placeholder auto</span>
              </div>
            )}
          </FormField>

          {/* Publish toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                Publish ke Portal
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Inovasi akan dipaparkan kepada awam
              </p>
            </div>
            <button
              onClick={() => set("is_published", !item.is_published)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                item.is_published ? "bg-brand-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  item.is_published ? "translate-x-5.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #111827;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
