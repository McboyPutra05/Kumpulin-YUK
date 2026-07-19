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
import { ArticleSource, ScrapeRequest, ScrapeStatusResponse, ArticleCategory } from "@/types/article";
import { cn } from "@/lib/utils";
import { Download, Loader2, CheckCircle2, XCircle, ChevronDown, ChevronUp, Info } from "lucide-react";

interface ScrapePanelProps {
  /** Tanggal yang sedang aktif di filter dashboard — jadi default tanggal scrape */
  defaultDate?: Date;
  selectedSource: ArticleSource | "all";
  selectedCategories: ArticleCategory[] | "all";
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

export function ScrapePanel({ defaultDate, selectedSource, selectedCategories, onScrapeDone }: ScrapePanelProps) {
  const queryClient = useQueryClient();

  // State lokal panel
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

  const handleScrape = () => {
    if (!defaultDate) return;
    setResult(null); // Reset hasil sebelumnya
    
    const sourcesToScrape = selectedSource === "all" ? ALL_SOURCES : [selectedSource];
    const categoriesToScrape = selectedCategories === "all" ? undefined : selectedCategories;
    
    mutation.mutate({
      date: format(defaultDate, "yyyy-MM-dd"),
      sources: sourcesToScrape,
      category: categoriesToScrape,
    });
  };

  const isLoading = mutation.isPending;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      {/* Kiri: Deskripsi */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 flex-shrink-0">
          <Download className="w-5 h-5 text-slate-300" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Scrape Artikel Baru</h2>
          <p className="text-sm text-slate-400">
            Update basis data dengan berita terkini dari sumber yang dipilih.
          </p>
        </div>
      </div>

      {/* Kanan: Tombol & Status */}
      <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
        <button
          onClick={handleScrape}
          disabled={isLoading || !defaultDate}
          className={cn(
            "flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all w-full sm:w-auto",
            "bg-[#c3d2ff] hover:bg-blue-200 text-blue-900",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Scraping...</span>
            </>
          ) : (
            <>
              <span>Mulai Scrape &rarr;</span>
            </>
          )}
        </button>

        {!defaultDate && (
          <p className="text-[11px] text-amber-400">
            ⚠️ Pilih tanggal di filter atas sebelum scraping.
          </p>
        )}

        {/* Notifikasi Hasil */}
        {result && (
          <div className="text-right">
            {result.status === "failed" ? (
              <div className="flex items-center gap-1.5 text-xs text-red-400 justify-end">
                <XCircle className="w-4 h-4" />
                <span>{result.message}</span>
              </div>
            ) : result.status === "pending" ? (
              <div className="flex items-center gap-1.5 text-xs text-blue-400 justify-end">
                <Info className="w-4 h-4" />
                <span>{result.message}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 justify-end">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {result.articles_scraped} artikel baru berhasil disimpan.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
