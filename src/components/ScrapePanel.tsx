"use client";

// ScrapePanel.tsx
// ---------------
// Komponen panel untuk men-trigger proses scraping dari UI.
// User memilih tanggal lalu klik "Scrape Sekarang" — backend akan
// mengambil artikel dari portal berita dan menyimpannya ke database.

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { triggerScrape } from "@/lib/api";
import { ArticleSource, ScrapeRequest, ScrapeStatusResponse } from "@/types/article";
import { cn } from "@/lib/utils";
import { Download, Loader2, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";

interface ScrapePanelProps {
  /** Tanggal yang sedang aktif di filter dashboard — jadi default tanggal scrape */
  defaultDate?: Date;
  /** Callback setelah scraping selesai, agar daftar artikel auto-refresh */
  onScrapeDone?: () => void;
}

const ALL_SOURCES: ArticleSource[] = ["kompas", "detik", "cnnindonesia", "liputan6", "kumparan"];

const SOURCE_LABELS: Record<ArticleSource, string> = {
  kompas: "Kompas.com",
  detik: "Detik.com",
  cnnindonesia: "CNN Indonesia",
  liputan6: "Liputan6",
  kumparan: "Kumparan",
};

export function ScrapePanel({ defaultDate, onScrapeDone }: ScrapePanelProps) {
  const queryClient = useQueryClient();

  // State lokal panel
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSources, setSelectedSources] = useState<ArticleSource[]>([...ALL_SOURCES]);
  const [result, setResult] = useState<ScrapeStatusResponse | null>(null);

  // TanStack Query mutation untuk POST /scrape
  const mutation = useMutation<ScrapeStatusResponse, Error, ScrapeRequest>({
    mutationFn: triggerScrape,
    onSuccess: (data) => {
      setResult(data);
      // Invalidate semua cache artikel agar daftar otomatis refresh
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      onScrapeDone?.();
    },
    onError: (error) => {
      setResult({
        task_id: "error",
        status: "failed",
        message: error.message || "Gagal terhubung ke backend. Pastikan server berjalan.",
        articles_scraped: 0,
        articles_summarized: 0,
      });
    },
  });

  const handleToggleSource = (source: ArticleSource) => {
    setSelectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  };

  const handleScrape = () => {
    if (!defaultDate || selectedSources.length === 0) return;
    setResult(null); // Reset hasil sebelumnya
    mutation.mutate({
      date: format(defaultDate, "yyyy-MM-dd"),
      sources: selectedSources,
    });
  };

  const isLoading = mutation.isPending;
  const targetDateLabel = defaultDate
    ? format(defaultDate, "d MMMM yyyy", { locale: localeId })
    : null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-6 shadow-sm dark:shadow-none">
      {/* Header — klik untuk expand/collapse */}
      <button
        onClick={() => setIsExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <Download className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Scrape Artikel Baru</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {targetDateLabel
                ? `Ambil berita tanggal ${targetDateLabel}`
                : "Pilih tanggal terlebih dahulu di filter"}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {/* Panel body */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-200 dark:border-gray-800 pt-4">
          {/* Pilih sumber */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium uppercase tracking-wider">
              Portal yang akan di-scrape
            </p>
            <div className="flex gap-2 flex-wrap">
              {ALL_SOURCES.map((source) => {
                const active = selectedSources.includes(source);
                return (
                  <button
                    key={source}
                    onClick={() => handleToggleSource(source)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm border transition-all",
                      active
                        ? "bg-blue-100 dark:bg-blue-600/20 border-blue-200 dark:border-blue-500/50 text-blue-700 dark:text-blue-300"
                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    )}
                  >
                    {SOURCE_LABELS[source]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tombol scrape */}
          <button
            onClick={handleScrape}
            disabled={isLoading || !defaultDate || selectedSources.length === 0}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all",
              "bg-blue-600 hover:bg-blue-500 text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sedang scraping... (bisa beberapa menit)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Scrape Sekarang</span>
              </>
            )}
          </button>

          {!defaultDate && (
            <p className="text-xs text-amber-400 mt-2">
              ⚠️ Pilih tanggal di filter atas sebelum scraping.
            </p>
          )}

          {/* Hasil scraping */}
          {result && (
            <div
              className={cn(
                "mt-4 p-4 rounded-lg border text-sm",
                result.status === "completed"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              )}
            >
              <div className="flex items-center gap-2 mb-2 font-medium">
                {result.status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                <span>{result.status === "completed" ? "Scraping Selesai!" : "Scraping Gagal"}</span>
              </div>
              <p className="text-xs opacity-80">{result.message}</p>
              {result.status === "completed" && (
                <div className="flex gap-4 mt-2 text-xs">
                  <span>📰 Artikel baru: <strong>{result.articles_scraped}</strong></span>
                  <span>✨ Diringkas AI: <strong>{result.articles_summarized}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
