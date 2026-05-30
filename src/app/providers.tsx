"use client";

// providers.tsx
// -------------
// Wrapper komponen untuk semua context providers yang dibutuhkan aplikasi.
// Dipisahkan dari layout.tsx karena TanStack Query membutuhkan "use client".

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Buat QueryClient baru per session (bukan singleton global)
  // untuk menghindari data leak antar pengguna di server-side rendering.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data dianggap stale setelah 5 menit
            staleTime: 5 * 60 * 1000,
            // Retry hanya 1 kali jika request gagal
            retry: 1,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
