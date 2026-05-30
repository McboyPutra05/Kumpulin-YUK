// GeneratedArticleModal.tsx
// -------------------------
// Modal untuk menampilkan artikel berita yang telah digenerate oleh AI.
// Mendukung copy-to-clipboard dan tampilan yang rapi.

"use client";

import { useEffect, useRef, useState } from "react";
import { X, Copy, CheckCheck, Newspaper, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GeneratedArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  generatedContent: string;
}

export function GeneratedArticleModal({
  isOpen,
  onClose,
  articleTitle,
  generatedContent,
}: GeneratedArticleModalProps) {
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Tutup modal saat klik overlay (di luar modal)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  // Tutup modal saat tekan Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback untuk browser lama
      const textArea = document.createElement("textarea");
      textArea.value = generatedContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  // Pisahkan judul (baris pertama) dan isi artikel
  const lines = generatedContent.split("\n").filter((l) => l.trim() !== "");
  const titleLine = lines[0] || "";
  const bodyLines = lines.slice(1);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl"
      >
        {/* Header */}
        <div
          className="flex items-start justify-between p-5 shrink-0 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-violet-100 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-500/40"
            >
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium mb-0.5 text-violet-600 dark:text-violet-400">
                Artikel Hasil Generate AI
              </p>
              <p
                className="text-sm font-semibold truncate text-gray-900 dark:text-gray-300"
                title={articleTitle}
              >
                {articleTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-3 shrink-0">
            {/* Tombol Copy */}
            <button
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border",
                copied 
                  ? "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400"
                  : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
              title="Salin teks artikel"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin</span>
                </>
              )}
            </button>

            {/* Tombol Tutup */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Konten Artikel */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Judul Artikel yang Digenerate */}
          {titleLine && (
            <div className="mb-5">
              <div
                className="flex items-center gap-1.5 text-xs mb-2 text-gray-500 dark:text-gray-400"
              >
                <Newspaper className="w-3 h-3" />
                <span>Judul</span>
              </div>
              <h2
                className="text-xl font-bold leading-snug text-gray-900 dark:text-gray-50"
              >
                {titleLine.replace(/^\*+|\*+$/g, "").replace(/^#+\s*/, "").trim()}
              </h2>
            </div>
          )}

          {/* Divider */}
          <div
            className="mb-5 border-t border-gray-200 dark:border-gray-800"
          />

          {/* Isi Artikel */}
          <div className="space-y-4">
            {bodyLines.map((line, i) => {
              const cleaned = line.trim();
              if (!cleaned) return null;

              // Deteksi heading markdown (## atau **judul**)
              if (cleaned.startsWith("##")) {
                return (
                  <h3
                    key={i}
                    className="text-base font-semibold mt-2 text-gray-800 dark:text-gray-200"
                  >
                    {cleaned.replace(/^#+\s*/, "")}
                  </h3>
                );
              }

              // Deteksi kutipan langsung (diawali tanda kutip)
              if (cleaned.startsWith('"') || cleaned.startsWith("\u201c")) {
                return (
                  <blockquote
                    key={i}
                    className="pl-4 italic border-l-[3px] border-violet-600 dark:border-violet-500 text-violet-800 dark:text-violet-300"
                  >
                    {cleaned}
                  </blockquote>
                );
              }

              return (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                >
                  {cleaned}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 flex items-center justify-between shrink-0 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0d1117]"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Digenerate oleh Gemini AI · Jangan lupa verifikasi fakta sebelum publikasi.
          </p>
          <button
            onClick={onClose}
            className="text-xs px-3 py-1.5 rounded-lg transition-colors bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
