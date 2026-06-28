"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Loader2, ArrowRight, RefreshCcw, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">

          {/* Icon & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 text-white mb-5">
              <Mail size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Cek Email Anda</h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Kami mengirimkan kode 6 digit ke
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1 bg-gray-100 px-3 py-1.5 rounded-lg inline-block">
              {emailParam}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm text-center flex items-center justify-center gap-2">
              <CheckCircle size={16} />
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 text-center">
                Kode Verifikasi
              </label>
              <input
                type="text"
                required
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                className="w-full text-center text-3xl tracking-[0.6em] font-mono py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                placeholder="------"
                value={code}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setCode(val);
                  setError("");
                  if (success.includes("dikirim")) setSuccess("");
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || code.length !== 6 || success.includes("berhasil")}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Verifikasi Akun
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Resend */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">Belum menerima kode?</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || success.includes("berhasil")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5 transition-colors"
            >
              {isResending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <RefreshCcw size={14} />
              )}
              Kirim Ulang Kode
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Kode berlaku selama <span className="font-medium">10 menit</span>. Periksa juga folder Spam.
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="animate-spin text-blue-600" size={28} />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
