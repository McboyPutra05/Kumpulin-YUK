// ArticleCard.tsx
// ---------------
// Komponen kartu untuk menampilkan satu artikel berita.
// Menampilkan: judul, sumber, tanggal, ringkasan AI, dan tombol Generate Artikel.

"use client";

import { useState } from "react";
import { Article } from "@/types/article";
import { cn, formatDateIndonesian, getSourceColor, getSourceLabel } from "@/lib/utils";
import { ExternalLink, Sparkles, Clock, Wand2, Loader2, FileText, Tag, AlignLeft } from "lucide-react";
import { generateArticle, summarizeArticle } from "@/lib/api";
import { GeneratedArticleModal } from "@/components/GeneratedArticleModal";

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

  return (
    <>
      <article
        className={cn(
          "group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6",
          "hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50",
          "transition-all duration-300 ease-in-out",
          "flex flex-col shadow-sm dark:shadow-none",
          className
        )}
      >
        {/* Header: Sumber & Tanggal */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              "text-xs font-semibold px-2.5 py-1 rounded-full border",
              getSourceColor(article.source)
            )}
          >
            {getSourceLabel(article.source)}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock className="w-3 h-3" />
            <time dateTime={article.published_date}>
              {formatDateIndonesian(article.published_date)}
            </time>
          </div>
        </div>

        {/* Judul */}
        <h2 className="text-gray-900 dark:text-white font-semibold text-lg leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>

        {/* Ringkasan AI */}
        {isSummarized && summary ? (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Ringkasan AI</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {summary}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic mb-3">
            Ringkasan belum tersedia.
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
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
          {/* Link ke artikel asli */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400",
              "hover:text-blue-700 dark:hover:text-blue-300 transition-colors",
              "group/link"
            )}
          >
            <span>Baca artikel asli</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>

          <div className="flex items-center gap-2">
            {/* Tombol Summarize — tampil jika belum diringkas */}
            {!isSummarized && (
              <button
                onClick={handleSummarize}
                disabled={isSummarizing}
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg",
                  "border transition-all duration-200",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                  "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50",
                  "text-emerald-700 dark:text-emerald-400",
                  "hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                )}
                title={isSummarizing ? "Sedang meringkas..." : "Ringkas artikel dengan AI"}
              >
                {isSummarizing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Meringkas...</span>
                  </>
                ) : (
                  <>
                    <AlignLeft className="w-3.5 h-3.5" />
                    <span>Ringkas</span>
                  </>
                )}
              </button>
            )}

            {/* Tombol Generate / Lihat Artikel */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg",
                "border transition-all duration-200",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                isGenerated && !isGenerating
                  ? "bg-violet-100 dark:bg-violet-950/50 border-violet-200 dark:border-violet-700/50 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50 hover:border-violet-300 dark:hover:border-violet-600"
                  : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white"
              )}
              title={
                isGenerating
                  ? "Sedang menggenerate..."
                  : isGenerated
                  ? "Lihat artikel yang sudah digenerate"
                  : "Generate artikel baru dengan AI"
              }
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
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Generate Artikel</span>
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
    </>
  );
}
