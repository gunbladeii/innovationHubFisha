import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InovasiGrid from "@/components/InovasiGrid";
import TentangSaya from "@/components/TentangSaya";
import ResponAwam from "@/components/ResponAwam";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <div id="inovasi">
          <InovasiGrid />
        </div>
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
  );
}
