import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InovasiGrid from "@/components/InovasiGrid";
import TestimonialSection from "@/components/TestimonialSection";
import TentangSaya from "@/components/TentangSaya";
import ResponAwam from "@/components/ResponAwam";
import CVTemplate from "@/components/CVTemplate";
import FloatingRatingButton from "@/components/FloatingRatingButton";
import { createClient } from "@supabase/supabase-js";

async function getCVTestimonials() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const { data } = await supabase
      .from("respon_awam")
      .select("nama, mesej, rating")
      .eq("jenis", "maklumbalas")
      .gte("rating", 4)
      .order("rating", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(4);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const cvTestimonials = await getCVTestimonials();
  return (
    <>
      {/* ── Live website (hidden during print) ───────────────────────── */}
      <div className="no-print min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <div id="inovasi">
            <InovasiGrid />
          </div>
          <TestimonialSection />
          <TentangSaya />
          <ResponAwam />
        </main>
        <FloatingRatingButton />
        <footer className="mt-12" style={{ borderTop: "1px solid rgba(59,130,246,0.15)", background: "#EFF6FF" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700">FISHA Innovation Hub</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Fisha
              </p>
            </div>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Hak Cipta Terpelihara
            </p>
          </div>
        </footer>
      </div>

      {/* ── CV / Résumé template (only visible when printing / saving PDF) ── */}
      <CVTemplate testimonials={cvTestimonials} />
    </>
  );
}
