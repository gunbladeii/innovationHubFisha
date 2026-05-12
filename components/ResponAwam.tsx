"use client";

import { useState } from "react";
import { Send, CheckCircle, MessageSquare, Lightbulb, FolderOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";

type JenisRespon = "cadangan" | "permohonan" | "maklumbalas";

const JENIS_OPTIONS: { value: JenisRespon; label: string; desc: string; ikon: React.ReactNode; warna: string }[] = [
  {
    value: "cadangan",
    label: "Cadangan Inovasi",
    desc: "Cadangkan idea sistem atau ciri baharu",
    ikon: <Lightbulb size={18} />,
    warna: "#F59E0B",
  },
  {
    value: "permohonan",
    label: "Permohonan Projek",
    desc: "Mohon pembangunan sistem untuk unit anda",
    ikon: <FolderOpen size={18} />,
    warna: "#3B82F6",
  },
  {
    value: "maklumbalas",
    label: "Maklum Balas",
    desc: "Kongsi pandangan tentang sistem sedia ada",
    ikon: <MessageSquare size={18} />,
    warna: "#10B981",
  },
];

interface FormData {
  jenis: JenisRespon;
  nama: string;
  jawatan: string;
  unit: string;
  email: string;
  mesej: string;
  keutamaan: "rendah" | "sederhana" | "tinggi";
}

const DEFAULT_FORM: FormData = {
  jenis: "cadangan",
  nama: "",
  jawatan: "",
  unit: "",
  email: "",
  mesej: "",
  keutamaan: "sederhana",
};

export default function ResponAwam() {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.mesej) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("respon_awam").insert({
        jenis: form.jenis,
        nama: form.nama,
        jawatan: form.jawatan || null,
        unit: form.unit || null,
        email: form.email,
        keutamaan: form.keutamaan,
        mesej: form.mesej,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Supabase error:", err);
      alert("Ralat semasa menghantar. Sila cuba semula.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(DEFAULT_FORM);
    setSubmitted(false);
  };

  const selectedJenis = JENIS_OPTIONS.find((o) => o.value === form.jenis)!;

  return (
    <section
      id="respon"
      className="relative"
      style={{ background: "linear-gradient(180deg, #EFF6FF 0%, #F0F9FF 100%)" }}
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
            <span className="text-xs text-brand-700 font-medium tracking-wide">Hubungi Kami</span>
          </div>
          <h2 className="section-title mb-3">Cadangan & Permohonan Projek</h2>
          <p className="text-slate-500 text-base max-w-xl">
            Kongsi idea inovasi anda atau hantar permohonan pembangunan sistem kepada pasukan kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left info panel */}
          <div className="lg:col-span-2 space-y-4">
            {JENIS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => set("jenis", opt.value)}
                className="w-full text-left rounded-2xl p-4 transition-all duration-150"
                style={{
                  background: form.jenis === opt.value ? `${opt.warna}08` : "#FFFFFF",
                  border: `2px solid ${form.jenis === opt.value ? opt.warna : "rgba(59,130,246,0.12)"}`,
                  boxShadow: form.jenis === opt.value ? `0 4px 20px ${opt.warna}18` : "none",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${opt.warna}15`, color: opt.warna }}
                  >
                    {opt.ikon}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: form.jenis === opt.value ? opt.warna : "#1E293B" }}
                    >
                      {opt.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                  </div>
                </div>
              </button>
            ))}

            {/* Info box */}
            <div
              className="rounded-2xl p-4 space-y-2"
              style={{ background: "#FFFFFF", border: "1px solid rgba(59,130,246,0.12)" }}
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">📋 Proses Seterusnya</p>
              <ol className="space-y-1.5">
                {[
                  "Borang diterima & disemak",
                  "Maklum balas dalam 3–5 hari bekerja",
                  "Mesyuarat perbincangan jika perlu",
                  "Keputusan & tindakan susulan",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0 font-bold text-[10px] mt-0.5"
                      style={{ background: "#3B82F6" }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center h-full"
                style={{ background: "#FFFFFF", border: "1px solid rgba(16,185,129,0.25)", boxShadow: "0 4px 32px rgba(16,185,129,0.08)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(16,185,129,0.1)" }}
                >
                  <CheckCircle size={32} style={{ color: "#10B981" }} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Terima Kasih, {form.nama.split(" ")[0]}!
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-sm">
                    {form.jenis === "cadangan"
                      ? "Cadangan inovasi anda telah diterima dan akan disemak oleh pasukan kami."
                      : form.jenis === "permohonan"
                      ? "Permohonan projek anda telah dihantar. Kami akan menghubungi anda tidak lama lagi."
                      : "Maklum balas anda amat kami hargai untuk penambahbaikan sistem."}
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="btn-primary mt-2"
                >
                  Hantar Lagi
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 space-y-4"
                style={{ background: "#FFFFFF", border: "1px solid rgba(59,130,246,0.15)", boxShadow: "0 4px 24px rgba(59,130,246,0.06)" }}
              >
                <div className="flex items-center gap-2 pb-3 border-b" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${selectedJenis.warna}15`, color: selectedJenis.warna }}
                  >
                    {selectedJenis.ikon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{selectedJenis.label}</p>
                    <p className="text-xs text-gray-400">Lengkapkan borang di bawah</p>
                  </div>
                </div>

                {/* Name + Jawatan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Nama Penuh *</label>
                    <input
                      type="text"
                      value={form.nama}
                      onChange={(e) => set("nama", e.target.value)}
                      placeholder="Nama anda..."
                      required
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "#F8FAFF",
                        border: "1px solid rgba(59,130,246,0.2)",
                        color: "#1E293B",
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Jawatan</label>
                    <input
                      type="text"
                      value={form.jawatan}
                      onChange={(e) => set("jawatan", e.target.value)}
                      placeholder="e.g. Guru Besar, PPD..."
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "#F8FAFF",
                        border: "1px solid rgba(59,130,246,0.2)",
                        color: "#1E293B",
                      }}
                    />
                  </div>
                </div>

                {/* Unit + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Unit / Sekolah</label>
                    <input
                      type="text"
                      value={form.unit}
                      onChange={(e) => set("unit", e.target.value)}
                      placeholder="e.g. JPN Selangor, SK..."
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "#F8FAFF",
                        border: "1px solid rgba(59,130,246,0.2)",
                        color: "#1E293B",
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">E-mel *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="nama@moe.gov.my"
                      required
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "#F8FAFF",
                        border: "1px solid rgba(59,130,246,0.2)",
                        color: "#1E293B",
                      }}
                    />
                  </div>
                </div>

                {/* Keutamaan */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2">Keutamaan</label>
                  <div className="flex gap-2">
                    {(["rendah", "sederhana", "tinggi"] as const).map((k) => {
                      const colors = { rendah: "#10B981", sederhana: "#F59E0B", tinggi: "#EF4444" };
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => set("keutamaan", k)}
                          className="flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                          style={{
                            background: form.keutamaan === k ? `${colors[k]}15` : "#F8FAFF",
                            border: `1px solid ${form.keutamaan === k ? colors[k] : "rgba(59,130,246,0.15)"}`,
                            color: form.keutamaan === k ? colors[k] : "#64748B",
                          }}
                        >
                          {k === "rendah" ? "🟢 Rendah" : k === "sederhana" ? "🟡 Sederhana" : "🔴 Tinggi"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mesej */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">
                    {form.jenis === "cadangan"
                      ? "Huraian Cadangan *"
                      : form.jenis === "permohonan"
                      ? "Keperluan Projek *"
                      : "Maklum Balas *"}
                  </label>
                  <textarea
                    value={form.mesej}
                    onChange={(e) => set("mesej", e.target.value)}
                    rows={4}
                    required
                    placeholder={
                      form.jenis === "cadangan"
                        ? "Huraikan idea sistem yang dicadangkan, masalah yang ingin diselesaikan..."
                        : form.jenis === "permohonan"
                        ? "Huraikan keperluan sistem, fungsi utama, pengguna sasaran, jangka masa..."
                        : "Berkongsi pandangan, masalah yang dihadapi, atau cadangan penambahbaikan..."
                    }
                    className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all resize-none"
                    style={{
                      background: "#F8FAFF",
                      border: "1px solid rgba(59,130,246,0.2)",
                      color: "#1E293B",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !form.nama || !form.email || !form.mesej}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: loading || !form.nama || !form.email || !form.mesej
                      ? "#93C5FD"
                      : "#2563EB",
                    cursor: loading ? "wait" : "pointer",
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Menghantar...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Hantar {selectedJenis.label}
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Maklumat anda akan dirahsiakan dan digunakan untuk tujuan rasmi sahaja.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
