import { Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Cpu size={16} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-gray-900 text-sm leading-none">
              FISHA Innovation Hub
            </span>
            <p className="text-gray-400 text-xs leading-none mt-0.5">
              Jemaah Nazir
            </p>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#inovasi"
            className="text-sm text-gray-600 hover:text-brand-600 font-medium transition-colors"
          >
            Inovasi
          </a>
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
