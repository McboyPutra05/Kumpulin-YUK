"use client";

// SourceFilter.tsx
// ----------------
// Komponen filter untuk memilih portal berita sumber.
// Menampilkan tombol toggle untuk setiap sumber.

import { ArticleSource } from "@/types/article";
import { cn, getSourceColor, getSourceLabel } from "@/lib/utils";

interface SourceFilterProps {
  selectedSource: ArticleSource | "all";
  onSourceChange: (source: ArticleSource | "all") => void;
}

const SOURCES: Array<{ value: ArticleSource | "all"; label: string }> = [
  { value: "all", label: "Semua Sumber" },
  { value: "kompas", label: "Kompas.com" },
  { value: "detik", label: "Detik.com" },
  { value: "cnnindonesia", label: "CNN Indonesia" },
  { value: "liputan6", label: "Liputan6" },
  { value: "kumparan", label: "Kumparan" },
];

export function SourceFilter({ selectedSource, onSourceChange }: SourceFilterProps) {
  return (
    <div className="flex flex-col w-full bg-slate-900 border border-slate-800 rounded-xl p-4">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
        Sumber Berita
      </label>
      <div className="flex items-center gap-2 flex-wrap">
        {SOURCES.map((source) => {
          const isSelected = selectedSource === source.value;
          return (
            <button
              key={source.value}
              id={`source-filter-${source.value}`}
              onClick={() => onSourceChange(source.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium border transition-all",
                isSelected
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                  : "bg-transparent border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
              )}
            >
              {source.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
