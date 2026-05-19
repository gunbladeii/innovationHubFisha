import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InovasiGrid from "@/components/InovasiGrid";
import TestimonialSection from "@/components/TestimonialSection";
import TentangSaya from "@/components/TentangSaya";
import ResponAwam from "@/components/ResponAwam";
import CVTemplate from "@/components/CVTemplate";
import FloatingRatingButton from "@/components/FloatingRatingButton";
import SectionReveal from "@/components/SectionReveal";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { createClient } from "@supabase/supabase-js";
import { INOVASI_SEED, type InovasiSeedItem } from "@/lib/data";

function getServerClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function getCVTestimonials() {
  const supabase = getServerClient();
  if (!supabase) return [];
  try {
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

async function getCVInovasi(): Promise<InovasiSeedItem[]> {
  const supabase = getServerClient();
  if (!supabase) return INOVASI_SEED;
  try {
    const { data, error } = await supabase
      .from("inovasi")
      .select("*")
      .eq("is_published", true)
      .order("urutan", { ascending: true });
    if (error || !data || data.length === 0) return INOVASI_SEED;
    return data as InovasiSeedItem[];
  } catch {
    return INOVASI_SEED;
  }
}

export default async function HomePage() {
  const [cvTestimonials, cvInovasi] = await Promise.all([
    getCVTestimonials(),
    getCVInovasi(),
  ]);
  return (
    <>
      {/* ── Live website (hidden during print) ───────────────────────── */}
      <div className="no-print min-h-screen">
        {/* Scroll progress bar — glowing line at the very top */}
        <ScrollProgressBar />

        <Navbar />
        <main>
          {/* Hero — already in view on load; gentle fade-up */}
          <SectionReveal variant="fadeUp" duration={0.9}>
            <HeroSection />
          </SectionReveal>

          {/* Inovasi grid — slides up from below */}
          <SectionReveal variant="slideUp" duration={0.8} delay={0.05}>
            <div id="inovasi">
              <InovasiGrid />
            </div>
          </SectionReveal>

          {/* Testimonials — swoops in from the right */}
          <SectionReveal variant="slideRight" duration={0.8} delay={0.05}>
            <TestimonialSection />
          </SectionReveal>

          {/* Tentang Saya — slides in from the left */}
          <SectionReveal variant="slideLeft" duration={0.8} delay={0.05}>
            <TentangSaya />
          </SectionReveal>

          {/* Respon Awam — zooms in with springy feel */}
          <SectionReveal variant="zoomIn" duration={0.85} springy>
            <ResponAwam />
          </SectionReveal>
        </main>
        <FloatingRatingButton />

        {/* Footer — gentle fade up */}
        <SectionReveal variant="fadeUp" duration={0.6}>
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
        </SectionReveal>
      </div>

      {/* ── CV / Résumé template (only visible when printing / saving PDF) ── */}
      <CVTemplate testimonials={cvTestimonials} inovasiList={cvInovasi} />
    </>
  );
}
