import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InovasiGrid from "@/components/InovasiGrid";
import TestimonialSection from "@/components/TestimonialSection";
import TentangSaya from "@/components/TentangSaya";
import ResponAwam from "@/components/ResponAwam";
import CVTemplate from "@/components/CVTemplate";

export default function HomePage() {
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
      <CVTemplate />
    </>
  );
}
