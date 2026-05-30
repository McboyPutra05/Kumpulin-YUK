// api.ts
// ------
// Konfigurasi API client untuk komunikasi dengan backend FastAPI.
// Menggunakan fetch API bawaan Next.js agar bisa memanfaatkan
// fitur caching dan revalidation dari Next.js 15.

import {
  Article,
  ArticleFilters,
  ArticleListResponse,
  GenerateArticleResponse,
  ScrapeRequest,
  ScrapeStatusResponse,
} from "@/types/article";
import { format } from "date-fns";

// Base URL backend diambil dari environment variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

/**
 * Helper generic untuk melakukan HTTP request ke backend.
 * Melempar error dengan pesan yang jelas jika response tidak OK.
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `HTTP Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

// ============================================================
// Article API Functions
// ============================================================

/**
 * Mengambil daftar artikel dengan filter dan pagination.
 * @param filters - Objek filter (tanggal, sumber, halaman)
 */
export async function fetchArticles(
  filters: Partial<ArticleFilters> = {}
): Promise<ArticleListResponse> {
  const params = new URLSearchParams();

  if (filters.date) {
    params.append("date", format(filters.date, "yyyy-MM-dd"));
  }
  if (filters.source && filters.source !== "all") {
    params.append("source", filters.source);
  }
  if (filters.page) {
    params.append("page", String(filters.page));
  }

  const queryString = params.toString();
  const endpoint = `/articles${queryString ? `?${queryString}` : ""}`;

  return apiFetch<ArticleListResponse>(endpoint);
}

/**
 * Mengambil detail satu artikel berdasarkan ID.
 * @param id - MongoDB ObjectId artikel
 */
export async function fetchArticleById(id: string): Promise<Article> {
  return apiFetch<Article>(`/articles/${id}`);
}

// ============================================================
// Scraper API Functions
// ============================================================

/**
 * Memulai proses scraping untuk tanggal dan sumber tertentu.
 * @param request - Objek berisi tanggal dan daftar sumber
 */
export async function triggerScrape(
  request: ScrapeRequest
): Promise<ScrapeStatusResponse> {
  return apiFetch<ScrapeStatusResponse>("/scrape/", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * Menggenerate artikel berita lengkap dari data scraping menggunakan AI.
 * @param articleId - MongoDB ObjectId artikel yang akan digenerate
 */
export async function generateArticle(
  articleId: string
): Promise<GenerateArticleResponse> {
  return apiFetch<GenerateArticleResponse>(`/articles/${articleId}/generate`, {
    method: "POST",
  });
}
