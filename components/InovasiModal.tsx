"use client";

import { useEffect } from "react";
import { ExternalLink, GitBranch, X } from "lucide-react";
import type { Inovasi } from "@/lib/database.types";
import { STATUS_CONFIG, type InovasiSeedItem } from "@/lib/data";

interface Props {
  item: InovasiSeedItem | Inovasi;
  onClose: () => void;
}

export default function InovasiModal({ item, onClose }: Props) {
  const statusCfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in"
        style={{ background: "#FFFFFF", border: "1px solid rgba(59,130,246,0.18)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-gray-400 hover:text-gray-700"
          style={{ background: "rgba(59,130,246,0.08)" }}
        >
          <X size={15} />
        </button>

        {/* Image / Placeholder */}
        <div className="relative w-full h-52 overflow-hidden rounded-t-2xl flex-shrink-0">
          {item.gambar_url ? (
            <>
              <img
                src={item.gambar_url}
                alt={`${item.nama} screenshot`}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </>
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${item.warna_tema}20 0%, ${item.warna_tema}45 100%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(${item.warna_tema} 1px, transparent 1px)`,
                  backgroundSize: "18px 18px",
                }}
              />
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30"
                style={{ background: item.warna_tema }}
              />
              <span className="text-6xl relative z-10 drop-shadow-sm">{item.ikon}</span>
            </div>
          )}

          {/* Accent bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: item.warna_tema }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${item.warna_tema}15` }}
              >
                {item.ikon}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-xl leading-tight">
                  {item.nama}
                </h2>
                <span className="text-sm text-gray-400">{item.tahun}</span>
              </div>
            </div>
            <span
              className={`tag-pill border flex items-center gap-1.5 flex-shrink-0 ${statusCfg.color}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
              {statusCfg.label}
            </span>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600 leading-relaxed">{item.deskripsi}</p>
            {item.deskripsi_panjang && (
              <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{item.deskripsi_panjang}</p>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{ background: "#EFF6FF", border: "1px solid rgba(59,130,246,0.2)", color: "#1D4ED8" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Feature Tags */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Kategori
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-pill"
                  style={{
                    backgroundColor: `${item.warna_tema}10`,
                    color: item.warna_tema,
                    borderColor: `${item.warna_tema}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          {(item.link_demo || item.link_github) && (
            <div className="flex gap-2 pt-2" style={{ borderTop: "1px solid rgba(59,130,246,0.12)" }}>
              {item.link_demo && (
                <a
                  href={item.link_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={14} />
                  Buka Demo
                </a>
              )}
              {item.link_github && (
                <a
                  href={item.link_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <GitBranch size={14} />
                  Source Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
