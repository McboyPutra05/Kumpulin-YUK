"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";
import { AlertModal } from "@/components/ui/AlertModal";
import { useAuth } from "@/lib/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Gagal mendaftar");
      }

      // Berhasil daftar, arahkan ke halaman verifikasi dengan membawa email di query params
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal 
        isOpen={showAlert} 
        onClose={() => setShowAlert(false)} 
        title="Fitur Belum Tersedia"
        message="Login dengan Google akan segera hadir di pembaruan berikutnya!"
      />
      <div className="min-h-screen flex w-full">
        {/* Left Column - Image Placeholder */}
        <div className="hidden lg:flex w-1/2 relative bg-blue-600/10 items-center justify-center overflow-hidden">
        {/* Placeholder background image, user will replace later */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-slate-900/90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        
        <div className="relative z-20 p-12 w-full max-w-lg text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white">
                <path d="M4 12h16M4 6h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">KumpulinYUK!</span>
          </div>
          
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Find The Right Article<br/>Anytime, Anywhere.
          </h1>
          
          <div className="inline-block px-6 py-2 border-2 border-white/30 rounded text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-pointer">
            Sign Up
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white dark:bg-gray-950">
        <div className="w-full max-w-[440px]">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white">
                <path d="M4 12h16M4 6h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">KumpulinYUK!</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign Up to your account</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 dark:text-white text-sm"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 dark:text-white text-sm"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                required
                minLength={8}
                className="w-full pl-11 pr-4 py-3.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 dark:text-white text-sm"
                placeholder="Create Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                required
                minLength={8}
                className="w-full pl-11 pr-4 py-3.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 dark:text-white text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-1 my-2">
              <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <span className="text-[10px] text-gray-400 ml-2 uppercase font-medium">None</span>
            </div>

            <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center px-4 leading-relaxed mb-6">
              By signing up, you confirm that you've read and accepted our{" "}
              <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">User Notice</a> and{" "}
              <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Register"}
            </button>
          </form>

          <div className="my-6 flex items-center justify-center">
            <span className="text-xs text-gray-400 uppercase">OR</span>
          </div>

          <button
            type="button"
            className="w-full py-3.5 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-3"
            onClick={() => setShowAlert(true)}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 dark:text-blue-500 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
