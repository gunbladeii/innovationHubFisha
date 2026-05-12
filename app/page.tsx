import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InovasiGrid from "@/components/InovasiGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <div id="inovasi">
          <InovasiGrid />
        </div>
      </main>
      <footer className="mt-12" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0E0E13" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-300">FISHA Innovation Hub</p>
            <p className="text-xs text-gray-600 mt-0.5">
              Jemaah Nazir, Kementerian Pendidikan Malaysia
            </p>
          </div>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Hak Cipta Terpelihara
          </p>
        </div>
      </footer>
    </div>
  );
}
