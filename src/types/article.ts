// article.ts
// ----------
// TypeScript interface definitions untuk data artikel.
// Pastikan ini selalu sinkron dengan schema respons di backend (ArticleResponse).

export interface Article {
  id: string;
  title: string;
  url: string;
  source: ArticleSource;
  category: ArticleCategory | null;
  published_date: string; // Format: "YYYY-MM-DD"
  summary: string | null;
  tags: string[];          // 4 tag SEO yang merepresentasikan isi artikel
  is_summarized: boolean;
  generated_article: string | null;
  is_generated: boolean;
  scraped_at: string; // ISO 8601 datetime string
}

export type ArticleSource = "kompas" | "detik" | "cnnindonesia" | "liputan6" | "kumparan";
export type ArticleCategory = "nasional" | "teknologi" | "olahraga" | "otomotif" | "ekonomi" | "hiburan" | "edukasi" | "travel" | "trending";

export interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ScrapeRequest {
  date: string; // Format: "YYYY-MM-DD"
  sources: ArticleSource[];
  category?: ArticleCategory[];
}

export interface ScrapeStatusResponse {
  task_id: string;
  status: "pending" | "running" | "completed" | "failed";
  message: string;
  articles_scraped: number;
  articles_summarized: number;
}

export interface GenerateArticleResponse {
  article_id: string;
  status: "success" | "failed";
  message: string;
  generated_article: string | null;
}

export interface SummarizeArticleResponse {
  article_id: string;
  status: "success" | "already_summarized" | "failed";
  message: string;
  summary: string | null;
  tags: string[] | null;
}

export interface ArticleFilters {
  date: Date | undefined;
  source: ArticleSource | "all";
  category: ArticleCategory[] | "all";
  page: number;
}
