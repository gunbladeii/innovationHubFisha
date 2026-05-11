"use client";

import { useState, useMemo } from "react";
import InovasiCard from "./InovasiCard";
import InovasiModal from "./InovasiModal";
import FilterBar from "./FilterBar";
import { INOVASI_SEED, type InovasiSeedItem } from "@/lib/data";

export default function InovasiGrid() {
  const [activeTag, setActiveTag] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<InovasiSeedItem | null>(null);

  const filtered = useMemo(() => {
    return INOVASI_SEED.filter((item) => {
      const matchTag = activeTag === "Semua" || item.tags.includes(activeTag);
      const matchSearch =
        searchQuery === "" ||
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tech_stack.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchTag && matchSearch;
    });
  }, [activeTag, searchQuery]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h2 className="section-title mb-2">Senarai Inovasi</h2>
        <p className="text-gray-500 text-base">
          Tapis mengikut kategori atau cari sistem yang anda perlukan.
        </p>
      </div>

      <div className="mb-8">
        <FilterBar
          activeTag={activeTag}
          onTagChange={setActiveTag}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          count={filtered.length}
          total={INOVASI_SEED.length}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-500 text-lg font-medium">Tiada inovasi dijumpai</p>
          <p className="text-gray-400 text-sm mt-1">Cuba ubah carian atau tapis yang lain</p>
          <button
            onClick={() => { setActiveTag("Semua"); setSearchQuery(""); }}
            className="mt-4 btn-secondary"
          >
            Set semula
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in items-start">
          {filtered.map((item, i) => (
            <InovasiCard
              key={item.slug}
              item={item}
              index={i}
              onReadMore={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <InovasiModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
