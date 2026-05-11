import { Cpu, Globe, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-gov-lightblue">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-400 rounded-full opacity-10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Cpu size={20} className="text-white" />
          </div>
          <div>
            <p className="text-blue-200 text-xs font-semibold tracking-widest uppercase">
              Jemaah Nazir | MOE Malaysia
            </p>
          </div>
        </div>

        {/* Main heading */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            FISHA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              Innovation
            </span>{" "}
            Hub
          </h1>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            Koleksi inovasi digital yang dibangunkan untuk transformasi sistem
            pemeriksaan dan pengurusan pendidikan Malaysia. Setiap sistem direka
            untuk meningkatkan kecekapan dan kualiti perkhidmatan awam.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <Globe size={16} className="text-blue-200" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">12</p>
                <p className="text-blue-200 text-xs">Sistem Dibangunkan</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <ShieldCheck size={16} className="text-blue-200" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">10</p>
                <p className="text-blue-200 text-xs">Sistem Aktif</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <Cpu size={16} className="text-blue-200" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">2020–2026</p>
                <p className="text-blue-200 text-xs">Tempoh Inovasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
