// utils.ts
// --------
// Fungsi utilitas umum yang digunakan di seluruh aplikasi frontend.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArticleSource } from "@/types/article";

/**
 * Menggabungkan class names Tailwind dengan aman, menghindari konflik.
 * Digunakan di seluruh komponen sebagai pengganti template literals.
 *
 * Contoh: cn("text-sm", isActive && "font-bold", "text-gray-500")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Memformat tanggal ISO string ke format bahasa Indonesia yang ramah pengguna.
 *
 * Contoh: "2025-01-15" → "15 Januari 2025"
 */
export function formatDateIndonesian(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "d MMMM yyyy", { locale: localeId });
  } catch {
    return dateString;
  }
}

/**
 * Mengembalikan label yang ramah pengguna untuk setiap nama sumber berita.
 */
export function getSourceLabel(source: ArticleSource): string {
  const labels: Record<ArticleSource, string> = {
    kompas: "Kompas.com",
    detik: "Detik.com",
    cnnindonesia: "CNN Indonesia",
    liputan6: "Liputan6",
    kumparan: "Kumparan",
  };
  return labels[source] || source;
}

/**
 * Mengembalikan warna badge Tailwind untuk setiap sumber berita.
 * Memudahkan identifikasi visual sumber artikel.
 */
export function getSourceColor(source: ArticleSource): string {
  const colors: Record<ArticleSource, string> = {
    kompas: "bg-red-500/20 text-red-400 border-red-500/30",
    detik: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    cnnindonesia: "bg-red-700/20 text-red-600 border-red-700/30",
    liputan6: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    kumparan: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  };
  return colors[source] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
}

/**
 * Memformat datetime ISO ke string yang singkat dan mudah dibaca.
 *
 * Contoh: "2025-01-15T10:30:00Z" → "15 Jan 2025, 10:30"
 */
export function formatDateTime(isoString: string): string {
  try {
    const date = parseISO(isoString);
    return format(date, "d MMM yyyy, HH:mm", { locale: localeId });
  } catch {
    return isoString;
  }
}
