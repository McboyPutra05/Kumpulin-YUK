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
  { value: "tempo", label: "Tempo.co" },
];

export function SourceFilter({ selectedSource, onSourceChange }: SourceFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {SOURCES.map((source) => {
        const isSelected = selectedSource === source.value;
        return (
          <button
            key={source.value}
            id={`source-filter-${source.value}`}
            onClick={() => onSourceChange(source.value)}
            className={cn(
              "px-3.5 py-2 rounded-lg text-sm font-medium border transition-all",
              isSelected
                ? source.value === "all"
                  ? "bg-blue-600 border-blue-500 text-white"
                  : cn(getSourceColor(source.value as ArticleSource), "border-opacity-80")
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-200 shadow-sm dark:shadow-none"
            )}
          >
            {source.label}
          </button>
        );
      })}
    </div>
  );
}
