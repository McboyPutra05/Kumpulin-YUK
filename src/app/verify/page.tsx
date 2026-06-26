"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Loader2, ArrowRight, RefreshCcw } from "lucide-react";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!emailParam) {
      router.push("/login");
    }
  }, [emailParam, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (code.length !== 6) {
      setError("Kode verifikasi harus 6 digit");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Gagal verifikasi");
      }

      setSuccess("Verifikasi berhasil! Mengalihkan ke halaman login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setIsResending(true);
    
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Gagal kirim ulang kode");
      }

      setSuccess("Kode baru telah dikirim ke email Anda!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md p-8 sm:p-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50 relative z-10 transition-all duration-300">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <KeyRound size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2 tracking-tight">
            Verifikasi Email
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mt-2">
            Masukkan 6 digit kode yang telah kami kirimkan ke <br />
            <span className="font-bold text-gray-900 dark:text-white px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md ml-1 inline-block mt-1">{emailParam}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 dark:text-red-400 text-sm text-center font-medium animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-600 dark:text-green-400 text-sm text-center font-medium animate-in fade-in slide-in-from-top-2">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative">
            <input
              type="text"
              required
              maxLength={6}
              className="w-full text-center text-4xl tracking-[0.75em] font-mono py-5 bg-gray-50/50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 dark:text-white uppercase shadow-inner"
              placeholder="••••••"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(""); // Clear error when typing
                if (success.includes("dikirim")) setSuccess(""); // Clear resend success when typing
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length !== 6 || success.includes("berhasil")}
            className="w-full mt-8 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : (
              <>Verifikasi Akun <ArrowRight size={18} className="ml-1" /></>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50 text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Belum menerima kode?</p>
          <button 
            onClick={handleResend}
            disabled={isResending || !!success}
            className="text-blue-600 dark:text-blue-400 hover:text-purple-500 font-semibold transition-colors inline-flex items-center gap-2 text-sm disabled:opacity-50 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-full"
          >
            {isResending ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
            Kirim Ulang Kode
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={32} /></div>}>
      <VerifyContent />
    </Suspense>
  );
}
