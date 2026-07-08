"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import {
  Newspaper,
  ArrowRight,
  CheckCircle,
  Sparkles,
  BookOpen,
  Zap,
  Globe,
  Search,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();


  return (
    <main className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-[#1a3a5c] text-white text-xs font-medium text-center py-2.5 px-4">
        ✦ Platform Agregator Berita Indonesia — Ditenagai Kecerdasan Buatan &nbsp;·&nbsp;
        <Link href="/register" className="underline underline-offset-2 hover:text-blue-200 transition-colors">
          Daftar Gratis Sekarang →
        </Link>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1a56db] flex items-center justify-center">
              <Newspaper size={15} className="text-white" />
            </div>
            <span className="text-base font-bold text-gray-900 tracking-tight">KumpulinYUK!</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#fitur" className="hover:text-gray-900 transition-colors">Fitur</a>
            <a href="#sumber" className="hover:text-gray-900 transition-colors">Sumber</a>
            <a href="#harga" className="hover:text-gray-900 transition-colors">Harga</a>
            <a href="#cara-kerja" className="hover:text-gray-900 transition-colors">Cara Kerja</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Masuk
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold bg-[#1a56db] hover:bg-[#1a45c0] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <div>
            <p className="text-sm font-bold text-[#1a56db] uppercase tracking-widest mb-5">
              Coba Sekarang — Gratis
            </p>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
              Ubah cara kamu<br />
              baca <em className="not-italic text-[#1a56db]">berita</em>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
              Dari Kompas sampai CNN Indonesia — semua berita terkumpul otomatis, diringkas oleh AI,
              tersaji dalam satu dashboard yang rapi.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-[#1a3a5c] hover:bg-[#122a45] text-white font-bold px-6 py-3.5 rounded-full text-sm transition-colors"
              >
                Daftar Sekarang
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-6 py-3.5 rounded-full text-sm transition-colors"
              >
                Sudah punya akun?
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["bg-blue-400", "bg-indigo-500", "bg-sky-400", "bg-blue-600"].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm font-bold ml-1">4.9</span>
                </div>
                <p className="text-xs text-gray-500">dari <span className="font-semibold">500+</span> pengguna aktif</p>
              </div>
            </div>
          </div>

          {/* Right: Visual Grid */}
          <div className="grid grid-cols-2 gap-3 h-[440px]">

            {/* Card 1 — Big blue */}
            <div className="bg-[#1a3a5c] rounded-2xl p-6 flex flex-col justify-between col-span-1 row-span-2">
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Artikel Hari Ini</p>
                <p className="text-5xl font-black text-white">248+</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="flex items-end gap-1 h-12">
                  {[3, 5, 4, 7, 6, 9, 8].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/30 rounded-sm" style={{ height: `${h * 10}%` }} />
                  ))}
                </div>
                <p className="text-white/50 text-xs mt-2">Diperbarui tiap jam</p>
              </div>
            </div>

            {/* Card 2 — Light */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col justify-between">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sumber Aktif</p>
              <div>
                <p className="text-4xl font-black text-gray-900">6+</p>
                <p className="text-xs text-gray-500 mt-1">Portal terpercaya</p>
              </div>
              <Globe size={28} className="text-[#1a56db]" />
            </div>

            {/* Card 3 — Blue accent */}
            <div className="bg-[#1a56db] rounded-2xl p-5 flex flex-col justify-between">
              <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Waktu Dihemat</p>
              <div>
                <p className="text-4xl font-black text-white">~4 Jam</p>
                <p className="text-xs text-blue-200 mt-1">per hari vs baca manual</p>
              </div>
              <TrendingUp size={24} className="text-white/50" />
            </div>

          </div>
        </div>
      </section>

      {/* ── LOGO / SOURCE STRIP ── */}
      <section id="sumber" className="border-y border-gray-100 py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-7">
            Dikumpulkan dari portal berita terpercaya
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {["Kompas", "Detik", "CNN Indonesia", "Liputan6", "Kumparan", "Tempo"].map((name) => (
              <span key={name} className="text-base font-bold text-gray-300 hover:text-gray-600 transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / FEATURES EDITORIAL ── */}
      <section id="fitur" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-5">
          <p className="text-xs font-bold text-[#1a56db] uppercase tracking-widest">Tentang Platform</p>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-center mb-3 leading-tight">
          Satu dashboard untuk<br />semua kebutuhan beritamu
        </h2>
        <p className="text-gray-500 text-center mb-14 max-w-lg mx-auto">
          Singkirkan semua hambatan yang bikin kamu ketinggalan berita penting setiap hari.
        </p>

        {/* Feature bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Big feature — Aggregation */}
          <div className="md:col-span-2 bg-[#1a3a5c] rounded-2xl p-8 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <Zap size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Agregasi Otomatis</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Sistem scraper kami bekerja 24/7 mengumpulkan berita dari 6+ portal secara real-time.
                Tidak ada satu pun berita penting yang terlewat.
              </p>
            </div>
            <div className="flex gap-2 mt-6">
              {["Kompas", "Detik", "CNN", "Liputan6"].map((s) => (
                <span key={s} className="bg-white/10 text-white/70 text-xs font-semibold px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-10 h-10 bg-[#1a56db] rounded-xl flex items-center justify-center mb-5">
                <Sparkles size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Ringkasan AI</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Setiap artikel diringkas oleh AI. Pahami inti berita dalam 30 detik.
              </p>
            </div>
            <div className="bg-white border border-blue-100 rounded-xl p-3 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-gray-500">Ringkasan AI</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mb-1.5">
                <div className="h-full bg-[#1a56db] rounded-full w-4/5" />
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mb-1.5">
                <div className="h-full bg-[#1a56db] rounded-full w-3/5" />
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div className="h-full bg-[#1a56db] rounded-full w-2/4" />
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-7 flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mb-5">
                <Search size={20} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Filter Cerdas</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Saring berita berdasarkan sumber, tanggal, atau kategori sesuai kebutuhanmu.
              </p>
            </div>
          </div>

          {/* Read Full */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-7 flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mb-5">
                <BookOpen size={20} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Baca Lengkap</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tidak hanya ringkasan — akses artikel versi penuh langsung dari dashboard.
              </p>
            </div>
          </div>

          {/* Real-time */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-7 flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center mb-5">
                <Clock size={20} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Real-time Update</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Berita terbaru selalu hadir. Sistem bekerja otomatis di latar belakang.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="cara-kerja" className="bg-[#f8fafc] border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs font-bold text-[#1a56db] uppercase tracking-widest mb-3">Cara Kerja</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Mulai baca cerdas<br />dalam 3 langkah
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Daftar Akun",
                desc: "Buat akun gratis dalam 1 menit. Verifikasi email, dan akun kamu langsung aktif.",
                bg: "bg-[#1a3a5c]",
                textColor: "text-white",
                numColor: "text-white/20",
                descColor: "text-white/60",
              },
              {
                num: "02",
                title: "Pilih Sumber",
                desc: "Pilih portal berita yang ingin kamu pantau. Bisa pilih satu atau semuanya sekaligus.",
                bg: "bg-white border border-gray-200",
                textColor: "text-gray-900",
                numColor: "text-gray-100",
                descColor: "text-gray-500",
              },
              {
                num: "03",
                title: "Baca & Nikmati",
                desc: "Semua berita tersaji rapi di dashboard. Baca ringkasan AI atau artikel penuh sesukamu.",
                bg: "bg-[#1a56db]",
                textColor: "text-white",
                numColor: "text-white/20",
                descColor: "text-white/70",
              },
            ].map((step) => (
              <div key={step.num} className={`${step.bg} rounded-2xl p-8 relative overflow-hidden`}>
                <p className={`text-8xl font-black ${step.numColor} absolute -top-4 -right-2 leading-none select-none`}>
                  {step.num}
                </p>
                <div className="relative">
                  <p className={`text-2xl font-black ${step.textColor} mb-3`}>{step.title}</p>
                  <p className={`text-sm ${step.descColor} leading-relaxed`}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="harga" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-[#1a56db] uppercase tracking-widest mb-3">Paket Harga</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Mulai gratis,<br />upgrade sesuai kebutuhan
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Tidak perlu kartu kredit untuk memulai. Upgrade kapan saja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* Free */}
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
            <p className="text-sm font-bold text-gray-500 mb-2">Gratis</p>
            <p className="text-4xl font-black text-gray-900 mb-1">Rp 0</p>
            <p className="text-xs text-gray-400 mb-6">Selamanya gratis</p>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "20 artikel per hari",
                "3 sumber berita",
                "Dashboard dasar",
                "Update setiap 6 jam",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="w-full text-center py-3 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
            >
              Mulai Gratis
            </Link>
          </div>

          {/* Pro — highlighted */}
          <div className="bg-[#1a3a5c] rounded-2xl p-8 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#1a56db] text-white text-xs font-bold px-4 py-1 rounded-full">
                PALING POPULER
              </span>
            </div>
            <p className="text-sm font-bold text-blue-300 mb-2">Pro</p>
            <p className="text-4xl font-black text-white mb-1">Rp 29.000</p>
            <p className="text-xs text-white/50 mb-6">per bulan</p>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Artikel tidak terbatas",
                "Semua 6+ sumber berita",
                "Ringkasan AI setiap artikel",
                "Update real-time",
                "Filter & kategori lanjutan",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                  <CheckCircle size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="w-full text-center py-3 bg-white hover:bg-gray-50 text-[#1a3a5c] font-bold rounded-xl text-sm transition-colors"
            >
              Coba 7 Hari Gratis
            </Link>
          </div>

          {/* Pro+ */}
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
            <p className="text-sm font-bold text-gray-500 mb-2">Pro+</p>
            <p className="text-4xl font-black text-gray-900 mb-1">Rp 59.000</p>
            <p className="text-xs text-gray-400 mb-6">per bulan</p>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Semua fitur Pro",
                "Notifikasi keyword",
                "Simpan & arsip artikel",
                "Ekspor ke PDF",
                "Prioritas customer support",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle size={15} className="text-[#1a56db] mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="w-full text-center py-3 border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
            >
              Pilih Pro+
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="bg-[#1a3a5c] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">Siap Memulai?</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Baca berita lebih cerdas<br />mulai hari ini
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Bergabung dengan ribuan pembaca yang sudah menggunakan KumpulinYUK!
            untuk tetap up-to-date setiap hari.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#1a3a5c] font-bold px-8 py-4 rounded-full text-sm transition-colors"
          >
            Buat Akun Gratis
            <ArrowRight size={16} />
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/50">
            {["✓ Gratis selamanya", "✓ Tidak perlu kartu kredit", "✓ Aktif dalam 1 menit"].map((t) => (
              <span key={t} className="font-medium">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111d2e] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-[#1a56db] flex items-center justify-center">
              <Newspaper size={11} className="text-white" />
            </div>
            <span className="font-bold text-white">KumpulinYUK!</span>
          </div>
          <p className="text-gray-500">© 2025 KumpulinYUK! — Agregator Berita Indonesia</p>
          <div className="flex gap-6 text-gray-500">
            <Link href="/login" className="hover:text-white transition-colors">Masuk</Link>
            <Link href="/login" className="hover:text-white transition-colors">Daftar</Link>
            <a href="#harga" className="hover:text-white transition-colors">Harga</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
