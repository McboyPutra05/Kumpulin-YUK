"use client";

// useArticles.ts
// --------------
// Custom React Hook untuk fetching dan caching data artikel.
// Menggunakan TanStack Query (React Query) untuk:
// - Automatic caching & deduplication
// - Background refetching
// - Loading & error states
// - Pagination management

import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/lib/api";
import { ArticleFilters, ArticleListResponse } from "@/types/article";
import { format } from "date-fns";

interface UseArticlesOptions {
  filters: Partial<ArticleFilters>;
  enabled?: boolean; // Opsional: nonaktifkan query secara kondisional
}

interface UseArticlesReturn {
  data: ArticleListResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean; // true saat background refetch terjadi
}

/**
 * Hook untuk mengambil daftar artikel dari backend API.
 *
 * Contoh penggunaan:
 * ```tsx
 * const { data, isLoading, isError } = useArticles({
 *   filters: { date: new Date("2025-01-15"), source: "kompas", page: 1 }
 * });
 * ```
 */
export function useArticles({
  filters,
  enabled = true,
}: UseArticlesOptions): UseArticlesReturn {
  // Query key yang unik — React Query akan refetch otomatis saat key berubah
  const queryKey = [
    "articles",
    {
      date: filters.date ? format(filters.date, "yyyy-MM-dd") : undefined,
      source: filters.source,
      page: filters.page,
    },
  ];

  const { data, isLoading, isError, error, isFetching } = useQuery<
    ArticleListResponse,
    Error
  >({
    queryKey,
    queryFn: () => fetchArticles(filters),
    enabled,
    staleTime: 5 * 60 * 1000, // Data dianggap fresh selama 5 menit
    gcTime: 10 * 60 * 1000,   // Cache disimpan selama 10 menit
    placeholderData: (previousData) => previousData, // Tampilkan data lama saat ganti halaman
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
    isFetching,
  };
}
