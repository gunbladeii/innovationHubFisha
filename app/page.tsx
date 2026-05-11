import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InovasiGrid from "@/components/InovasiGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />
      <main>
        <HeroSection />
        <div id="inovasi">
          <InovasiGrid />
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-700">FISHA Innovation Hub</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Jemaah Nazir, Kementerian Pendidikan Malaysia
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
