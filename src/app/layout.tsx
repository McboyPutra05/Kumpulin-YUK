import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KumpulinYUK! — Berita Indonesia dalam Satu Dashboard",
  description:
    "Agregator berita Indonesia dari Kompas, Detik, dan Tempo. Baca ringkasan berita harian yang dihasilkan oleh AI dalam satu platform.",
  keywords: ["berita", "indonesia", "kompas", "detik", "tempo", "agregator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

