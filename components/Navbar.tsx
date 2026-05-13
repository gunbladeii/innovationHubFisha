import { Cpu } from "lucide-react";
import PDFDownloadButton from "./PDFDownloadButton";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: "rgba(240,244,255,0.90)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(59,130,246,0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Cpu size={15} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-gray-900 text-sm leading-none">
              FISHA Innovation Hub
            </span>
            <p className="text-blue-500 text-xs leading-none mt-0.5">MoE</p>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#inovasi"
            className="text-sm text-gray-500 hover:text-brand-600 font-medium transition-colors"
          >
            Inovasi
          </a>
          <a
            href="#tentang"
            className="text-sm text-gray-500 hover:text-brand-600 font-medium transition-colors"
          >
            Tentang
          </a>
          <a
            href="#respon"
            className="text-sm text-gray-500 hover:text-brand-600 font-medium transition-colors"
          >
            Cadangan
          </a>
          <PDFDownloadButton variant="navbar" />
          <a
            href="/admin"
            className="btn-primary text-xs py-1.5 px-3"
          >
            Admin CMS
          </a>
        </nav>
      </div>
    </header>
  );
}
