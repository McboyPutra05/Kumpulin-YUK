"use client";

// ArticleList.tsx
// ---------------
// Komponen yang menampilkan daftar artikel dengan:
// - Loading skeleton saat data diambil
// - State kosong yang informatif
// - Pagination
// - Error handling

import { ArticleCard } from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { useArticles } from "@/hooks/useArticles";
import { ArticleFilters } from "@/types/article";
import { AlertCircle, Newspaper } from "lucide-react";

interface ArticleListProps {
  filters: ArticleFilters;
  onPageChange: (page: number) => void;
}

export function ArticleList({ filters, onPageChange }: ArticleListProps) {
  const { data, isLoading, isError, error, isFetching } = useArticles({
    filters,
    enabled: true,
  });

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Gagal memuat artikel
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {error?.message || "Terjadi kesalahan. Pastikan backend sedang berjalan."}
        </p>
      </div>
    );
  }

  // --- Empty State ---
  if (!data || data.articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Newspaper className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Tidak ada artikel
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {filters.date
            ? "Belum ada artikel untuk tanggal ini. Coba scrape data terlebih dahulu."
            : "Pilih tanggal untuk melihat daftar artikel."}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Info jumlah artikel */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
        <p className="text-slate-400 text-sm">
          Menampilkan{" "}
          <span className="text-white font-medium">{data.articles.length}</span>{" "}
          dari{" "}
          <span className="text-white font-medium">{data.total}</span> artikel
          {isFetching && (
            <span className="ml-2 text-blue-400 text-xs">(Memperbarui...)</span>
          )}
        </p>
        <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
          Sortir: Terbaru
        </span>
      </div>

      {/* Grid artikel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {data.total_pages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onPageChange(data.page - 1)}
            disabled={data.page <= 1}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            ← Sebelumnya
          </button>
          <span className="px-4 py-2 text-gray-600 dark:text-gray-400 text-sm">
            {data.page} / {data.total_pages}
          </span>
          <button
            onClick={() => onPageChange(data.page + 1)}
            disabled={data.page >= data.total_pages}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Berikutnya →
          </button>
        </div>
      )}
    </div>
  );
}
