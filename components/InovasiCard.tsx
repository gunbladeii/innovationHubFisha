"use client";

import { ExternalLink, GitBranch } from "lucide-react";
import type { Inovasi } from "@/lib/database.types";
import { STATUS_CONFIG, type InovasiSeedItem } from "@/lib/data";

interface InovasiCardProps {
  item: InovasiSeedItem | Inovasi;
  index: number;
  onReadMore: () => void;
}

export default function InovasiCard({ item, index, onReadMore }: InovasiCardProps) {
  const statusCfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];

  return (
    <article
      className="innovation-card relative rounded-2xl border card-hover overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: "#FFFFFF",
        borderColor: "rgba(59,130,246,0.15)",
        animationDelay: `${index * 60}ms`,
      }}
      onClick={onReadMore}
    >
      {/* Color accent bar */}
      <div className="h-0.5 w-full flex-shrink-0" style={{ background: item.warna_tema }} />

      {/* Screenshot / Tech Preview */}
      <div className="relative w-full h-44 overflow-hidden flex-shrink-0 group">
        {item.gambar_url ? (
          <>
            <img
              src={item.gambar_url}
              alt={`${item.nama} screenshot`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${item.warna_tema}10 0%, ${item.warna_tema}25 100%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `radial-gradient(${item.warna_tema} 1px, transparent 1px)`,
                backgroundSize: "18px 18px",
              }}
            />
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20"
              style={{ background: item.warna_tema }}
            />
            <span className="text-5xl relative z-10 drop-shadow-sm select-none">{item.ikon}</span>
            <div className="relative z-10 flex flex-wrap gap-1.5 justify-center px-6 max-w-full">
              {item.tech_stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                  style={{
                    background: `${item.warna_tema}18`,
                    color: item.warna_tema,
                    border: `1px solid ${item.warna_tema}40`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100 bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
            Lihat butiran
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: `${item.warna_tema}12` }}
            >
              {item.ikon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight">{item.nama}</h3>
              <span className="text-xs text-gray-400 font-medium">{item.tahun}</span>
            </div>
          </div>
          <span className={`tag-pill border flex items-center gap-1.5 flex-shrink-0 ${statusCfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
            {statusCfg.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1 text-slate-600">
          {item.deskripsi}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 4).map((tag) => (
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
          {item.tags.length > 4 && (
            <span
              className="tag-pill"
              style={{
                background: "#F1F5F9",
                color: "#64748B",
                borderColor: "#E2E8F0",
              }}
            >
              +{item.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer — only show if there are links */}
        {(item.link_demo || item.link_github) && (
          <div
            className="flex items-center justify-end pt-2 gap-1.5"
            style={{ borderTop: "1px solid rgba(59,130,246,0.1)" }}
          >
            {item.link_demo && (
              <a
                href={item.link_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-1.5 px-3"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
                Demo
              </a>
            )}
            {item.link_github && (
              <a
                href={item.link_github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-1.5 px-3"
                onClick={(e) => e.stopPropagation()}
              >
                <GitBranch size={12} />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

