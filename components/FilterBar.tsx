"use client";

import { Search, X } from "lucide-react";
import { ALL_TAGS } from "@/lib/data";

interface FilterBarProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  count: number;
  total: number;
}

export default function FilterBar({
  activeTag,
  onTagChange,
  searchQuery,
  onSearchChange,
  count,
  total,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari inovasi..."
          className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={`filter-chip ${
              activeTag === tag ? "filter-chip-active" : "filter-chip-inactive"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-600">
        Menunjukkan{" "}
        <span className="font-semibold text-gray-400">{count}</span> daripada{" "}
        <span className="font-semibold text-gray-400">{total}</span> inovasi
        {activeTag !== "Semua" && (
          <span className="text-brand-600">
            {" "}
            dalam &quot;{activeTag}&quot;
          </span>
        )}
      </p>
    </div>
  );
}
