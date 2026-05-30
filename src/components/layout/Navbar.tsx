// Navbar.tsx
// ----------
// Komponen navigasi utama aplikasi.

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="KumpulinYUK! Logo"
              width={40}
              height={40}
              className="object-contain h-20 w-auto"
            />
            <span className="text-gray-900 dark:text-white font-bold text-lg tracking-tight transition-colors">
              KumpulinYUK!
            </span>
          </Link>

          {/* Nav links + Theme Toggle */}
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors"
            >
              Dashboard
            </Link>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors"
            >
              API Docs
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
