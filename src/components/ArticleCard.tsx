// ArticleCard.tsx
// ---------------
// Komponen kartu untuk menampilkan satu artikel berita.
// Menampilkan: judul, sumber, tanggal, ringkasan AI, dan tombol Generate Artikel.

"use client";

import { useState } from "react";
import { Article } from "@/types/article";
import { cn, formatDateIndonesian, getSourceColor, getSourceLabel } from "@/lib/utils";
import { ExternalLink, Sparkles, Clock, Wand2, Loader2, FileText, Tag, AlignLeft, Trash2 } from "lucide-react";
import { generateArticle, summarizeArticle, deleteArticle } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { GeneratedArticleModal } from "@/components/GeneratedArticleModal";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>(
    article.generated_article ?? ""
  );
  const [isGenerated, setIsGenerated] = useState(article.is_generated);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // State untuk summarize
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSummarized, setIsSummarized] = useState(article.is_summarized);
  const [summary, setSummary] = useState<string | null>(article.summary);
  const [tags, setTags] = useState<string[]>(article.tags ?? []);
  const [summarizeError, setSummarizeError] = useState<string | null>(null);

  const handleGenerate = async () => {
    // Jika sudah ada hasil generate, langsung tampilkan modal
    if (isGenerated && generatedContent) {
      setIsModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateArticle(article.id);

      if (result.status === "success" && result.generated_article) {
        setGeneratedContent(result.generated_article);
        setIsGenerated(true);
        setIsModalOpen(true);
      } else {
        setError(result.message || "Gagal menggenerate artikel.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummarizeError(null);

    try {
      const result = await summarizeArticle(article.id);

      if (result.status === "success" && result.summary) {
        setSummary(result.summary);
        setTags(result.tags ?? []);
        setIsSummarized(true);
      } else {
        setSummarizeError(result.message || "Gagal meringkas artikel.");
      }
    } catch (err) {
      setSummarizeError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteArticle(article.id);
      if (result.status === "success") {
        // Refresh daftar artikel setelah berhasil dihapus
        queryClient.invalidateQueries({ queryKey: ["articles"] });
      } else {
        setError(result.message || "Gagal menghapus artikel.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus.");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <article
        className={cn(
          "group relative bg-slate-900 border border-slate-800 rounded-xl p-6",
          "hover:border-slate-700 hover:bg-slate-800/50",
          "transition-all duration-300 ease-in-out",
          "flex flex-col shadow-sm",
          className
        )}
      >
        {/* Header: Sumber & Tanggal */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider",
                article.source === "cnnindonesia" ? "bg-red-600" :
                article.source === "kompas" ? "bg-blue-600" :
                article.source === "detik" ? "bg-blue-800" : "bg-slate-700"
              )}
            >
              {getSourceLabel(article.source)}
            </span>
            {article.category && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 capitalize">
                {article.category}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock className="w-3 h-3" />
            <time dateTime={article.published_date}>
              {formatDateIndonesian(article.published_date)}
            </time>
          </div>
        </div>

        {/* Judul */}
        <h2 className="text-white font-semibold text-[17px] leading-snug mb-3 line-clamp-3 group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>

        {/* Ringkasan AI */}
        {isSummarized && summary ? (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 text-xs text-blue-400 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Ringkasan AI</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
              {summary}
            </p>
          </div>
        ) : (
          <p className="text-slate-400 text-sm italic mb-4 leading-relaxed">
            Ringkasan belum tersedia. Klik tombol ringkas untuk generate ringkasan otomatis menggunakan AI.
          </p>
        )}

        {/* Tags SEO */}
        {isSummarized && tags && tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            <Tag className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Error messages */}
        {error && (
          <p className="text-red-600 dark:text-red-400 text-xs mb-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2">
            ⚠️ {error}
          </p>
        )}
        {summarizeError && (
          <p className="text-red-600 dark:text-red-400 text-xs mb-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg px-3 py-2">
            ⚠️ {summarizeError}
          </p>
        )}

        {/* Footer: Link + Tombol Summarize + Tombol Generate */}
        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          {/* Link ke artikel asli */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1 text-[13px] font-semibold text-blue-500",
              "hover:text-blue-400 transition-colors group/link"
            )}
          >
            <span>Baca artikel asli</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>

          <div className="flex items-center gap-2">
            {/* Tombol Hapus (hidden in UI for now as per design, but keeping in code as tiny icon if needed, wait I'll style it dark) */}
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className={cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-lg",
                "bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              title="Hapus artikel"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Tombol Summarize */}
            {!isSummarized && (
              <button
                onClick={handleSummarize}
                disabled={isSummarizing}
                className={cn(
                  "inline-flex items-center justify-center w-8 h-8 rounded-lg",
                  "bg-slate-800 border border-slate-700 text-blue-400 hover:bg-slate-700 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                title={isSummarizing ? "Sedang meringkas..." : "Ringkas artikel dengan AI"}
              >
                {isSummarizing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
              </button>
            )}

            {/* Tombol Generate / Lihat Artikel */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={cn(
                "inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 h-8 rounded-lg",
                "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : isGenerated ? (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lihat Artikel</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>AI Generate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* Modal hasil artikel */}
      <GeneratedArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        articleTitle={article.title}
        generatedContent={generatedContent}
      />

      {/* Modal konfirmasi hapus */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Hapus Artikel"
        message={`Apakah Anda yakin ingin menghapus artikel "${article.title}"? Aksi ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </>
  );
}
