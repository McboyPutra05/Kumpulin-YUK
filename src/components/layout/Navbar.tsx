"use client";

// Navbar.tsx
// ----------
// Komponen navigasi utama aplikasi.

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/lib/AuthContext";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const { user, logout, isLoading } = useAuth();

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
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors mr-2"
            >
              API Docs
            </a>
            
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2"></div>

            {/* Auth State */}
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--foreground)] bg-[var(--muted)] px-3 py-1.5 rounded-full">
                      <User size={14} className="text-blue-500" />
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 text-sm transition-colors flex items-center gap-1"
                      title="Logout"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="text-sm font-medium text-[var(--foreground)] hover:text-blue-500 transition-colors"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full transition-colors"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </>
            )}

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2"></div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
