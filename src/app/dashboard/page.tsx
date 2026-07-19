"use client";

// dashboard/page.tsx
// ------------------
// Halaman utama dashboard News Aggregator.
// Menampilkan date picker, source filter, scrape panel, dan daftar artikel.

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DatePicker } from "@/components/DatePicker";
import { SourceFilter } from "@/components/SourceFilter";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ArticleList } from "@/components/ArticleList";
import { ScrapePanel } from "@/components/ScrapePanel";
import { ArticleFilters, ArticleSource, ArticleCategory } from "@/types/article";

export default function DashboardPage() {
  // State filter yang dikontrol oleh komponen ini (lifting state up)
  const [filters, setFilters] = useState<ArticleFilters>({
    date: undefined,
    source: "all",
    category: "all",
    page: 1,
  });

  const handleDateChange = (date: Date | undefined) => {
    setFilters((prev) => ({ ...prev, date, page: 1 }));
  };

  const handleSourceChange = (source: ArticleSource | "all") => {
    setFilters((prev) => ({ ...prev, source, page: 1 }));
  };

  const handleCategoryChange = (categories: ArticleCategory[] | "all") => {
    setFilters((prev) => ({ ...prev, category: categories, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard Berita
          </h1>
          <p className="text-slate-400">
            Pilih tanggal, lalu scrape artikel berita dari portal Indonesia.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <DatePicker
            selectedDate={filters.date}
            onDateChange={handleDateChange}
          />
          <SourceFilter
            selectedSource={filters.source}
            onSourceChange={handleSourceChange}
          />
          <CategoryFilter
            selectedCategories={filters.category}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Panel Scraping — terintegrasi dengan tanggal yang dipilih */}
        <ScrapePanel
          defaultDate={filters.date}
          selectedSource={filters.source}
          selectedCategories={filters.category}
          onScrapeDone={() => setFilters((prev) => ({ ...prev, page: 1 }))}
        />

        {/* Daftar Artikel */}
        <ArticleList filters={filters} onPageChange={handlePageChange} />
      </main>
    </div>
  );
}
