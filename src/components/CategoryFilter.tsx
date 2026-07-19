"use client";

import { ArticleCategory } from "@/types/article";

interface CategoryFilterProps {
  selectedCategories: ArticleCategory[] | "all";
  onCategoryChange: (categories: ArticleCategory[] | "all") => void;
}

const CATEGORY_LABELS: Record<ArticleCategory | "all", string> = {
  all: "Semua Kategori",
  nasional: "Nasional / Politik",
  teknologi: "Teknologi",
  olahraga: "Olahraga",
  otomotif: "Otomotif",
  ekonomi: "Ekonomi & Bisnis",
  hiburan: "Hiburan / Lifestyle",
  edukasi: "Edukasi / Pendidikan",
  travel: "Travel",
  trending: "Trending",
};

export function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const handleToggle = (key: ArticleCategory | "all") => {
    if (key === "all") {
      onCategoryChange("all");
      return;
    }

    let current = Array.isArray(selectedCategories) ? [...selectedCategories] : [];
    
    if (current.includes(key as ArticleCategory)) {
      current = current.filter((c) => c !== key);
      // Jika kosong, kembalikan ke 'all'
      if (current.length === 0) {
        onCategoryChange("all");
        return;
      }
    } else {
      current.push(key as ArticleCategory);
    }
    
    onCategoryChange(current);
  };

  return (
    <div className="flex flex-col w-full bg-slate-900 border border-slate-800 rounded-xl p-4">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
        Kategori Berita
      </label>
      <div className="flex flex-wrap gap-2">
        {(Object.entries(CATEGORY_LABELS) as [ArticleCategory | "all", string][]).map(([key, label]) => {
          const isSelected = selectedCategories === "all" ? key === "all" : (key !== "all" && selectedCategories.includes(key as ArticleCategory));
          
          return (
            <label
              key={key}
              className={`flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all ${
                isSelected
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                  : "bg-transparent border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => handleToggle(key)}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
