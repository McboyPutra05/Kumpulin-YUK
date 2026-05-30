import { redirect } from "next/navigation";

/**
 * Halaman root — redirect langsung ke /dashboard.
 * Semua konten utama ada di halaman dashboard.
 */
export default function Home() {
  redirect("/dashboard");
}
