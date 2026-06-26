import { redirect } from "next/navigation";

/**
 * Halaman root — redirect langsung ke /login.
 */
export default function Home() {
  redirect("/login");
}
