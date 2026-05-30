// ThemeToggle.tsx
// ---------------
// Tombol untuk beralih antara dark mode dan light mode.
// Menggunakan next-themes untuk membaca dan mengubah tema aktif.

"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // Hindari hydration mismatch — render setelah mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder dengan ukuran yang sama agar layout tidak bergeser saat hydration
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Aktifkan light mode" : "Aktifkan dark mode"}
      className="
        relative w-9 h-9 flex items-center justify-center rounded-lg
        text-gray-400 hover:text-white
        bg-transparent hover:bg-white/10
        dark:hover:bg-white/10
        light:hover:bg-gray-200
        border border-transparent hover:border-gray-700 dark:hover:border-gray-700
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
      "
    >
      <span
        className="absolute transition-all duration-300 ease-in-out"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
        }}
      >
        <Moon className="w-4 h-4" />
      </span>
      <span
        className="absolute transition-all duration-300 ease-in-out"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0deg) scale(1)",
        }}
      >
        <Sun className="w-4 h-4 text-yellow-400" />
      </span>
    </button>
  );
}
