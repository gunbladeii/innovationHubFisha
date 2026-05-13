import type { Inovasi } from "./database.types";

export type InovasiSeedItem = Omit<Inovasi, "id" | "created_at" | "updated_at">;

export const INOVASI_SEED: InovasiSeedItem[] = [
  {
    nama: "STTPMP",
    slug: "sttpmp",
    deskripsi:
      "Sistem Tahap Tindakan Perakuan Menteri Pendidikan — sistem pengesanan dan pemantauan maklum balas serta syor daripada Jabatan Pendidikan Negeri (JPN) secara real-time.",
    deskripsi_panjang:
      "STTPMP menyediakan papan pemuka trafik light berwarna merah/kuning/hijau untuk menjejaki status tindakan perakuan Menteri Pendidikan. Sistem ini mempunyai kawalan akses berasaskan peranan (RBAC), notifikasi e-mel automatik, dan sokongan multi-peranti.",
    tech_stack: ["Next.js 15", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    tags: ["Dashboard", "Tracking", "RBAC", "Real-time", "Web App", "Supabase"],
    status: "aktif",
    tahun: 2025,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "📊",
    warna_tema: "#3B82F6",
    is_published: true,
    urutan: 1,
  },
  {
    nama: "SPAK-JN",
    slug: "spak-jn",
    deskripsi:
      "Sistem Pemantauan dan Analitik Kualiti untuk Jemaah Nazir — platform pemantauan instrumen pemeriksaan sekolah berasaskan Firebase dengan AI analytics.",
    deskripsi_panjang:
      "SPAK-JN menggunakan Firebase Firestore untuk pengurusan data pemeriksaan sekolah. Sistem ini sedang dalam migrasi ke MongoDB + REST API dengan sokongan Gemini AI untuk analitik dinamik.",
    tech_stack: ["React", "Vite", "Firebase", "MongoDB", "Node.js", "Gemini AI"],
    tags: ["Dashboard", "AI/ML", "Firebase", "React", "Pemantauan", "Web App"],
    status: "aktif",
    tahun: 2025,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "🔍",
    warna_tema: "#8B5CF6",
    is_published: true,
    urutan: 2,
  },
  {
    nama: "MYSPAD",
    slug: "myspad",
    deskripsi:
      "Sistem Pemantauan Sekolah Penilaian dan Analitik Dinamik — dashboard AI yang menganalisis data peperiksaan dan kualiti sekolah dengan Gemini AI.",
    deskripsi_panjang:
      "MYSPAD ialah platform analitik canggih menggunakan Firebase dan Gemini AI untuk menghasilkan laporan dinamik tentang pencapaian sekolah. Ia menyokong eksport Excel, pembinaan formula tersuai, dan laporan berkumpulan.",
    tech_stack: ["React", "Vite", "Firebase", "Gemini AI", "Tailwind CSS"],
    tags: ["AI/ML", "Dashboard", "Firebase", "React", "Analitik", "Web App"],
    status: "aktif",
    tahun: 2026,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "🤖",
    warna_tema: "#10B981",
    is_published: true,
    urutan: 3,
  },
  {
    nama: "MyPemeriksaanJN",
    slug: "mypemeriksaanjn",
    deskripsi:
      "MySchoolJN — sistem pemilihan dan penugasan sekolah untuk pemeriksaan Jemaah Nazir. Membolehkan peneraju memilih sekolah berdasarkan kriteria tertentu.",
    deskripsi_panjang:
      "Aplikasi React berasaskan Supabase ini membantu peneraju mengurus pemilihan sekolah pemeriksaan mengikut sektor (SDTM, SPK, SDP, SPIP, SPHEMK). Termasuk penugasan nazir pemeriksa dan tracking status pemeriksaan.",
    tech_stack: ["React", "Vite", "Supabase", "Tailwind CSS", "Zustand", "Vercel"],
    tags: ["Web App", "Supabase", "RBAC", "Tracking", "React", "Dashboard"],
    status: "aktif",
    tahun: 2025,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "🏫",
    warna_tema: "#F59E0B",
    is_published: true,
    urutan: 4,
  },
  {
    nama: "eNazir Laravel",
    slug: "enazir-laravel",
    deskripsi:
      "Sistem eNazir versi moden berasaskan Laravel — platform pemeriksaan sekolah komprehensif dengan antara muka yang dinaik taraf menggunakan Tailwind CSS.",
    deskripsi_panjang:
      "Versi Laravel eNazir menawarkan seni bina yang lebih kukuh untuk sistem pemeriksaan sekolah. Dilengkapi dengan deployment staging/production, CI/CD pipeline GitLab, dan audit skop peranan yang terperinci.",
    tech_stack: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Vite", "GitLab CI"],
    tags: ["Web App", "Laravel", "RBAC", "Pemeriksaan", "CI/CD"],
    status: "aktif",
    tahun: 2026,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "⚙️",
    warna_tema: "#EF4444",
    is_published: true,
    urutan: 5,
  },
  {
    nama: "myNazir (SKPM)",
    slug: "mynazir",
    deskripsi:
      "Sistem pengurusan data SKPM (Standard Kualiti Pendidikan Malaysia) untuk Jemaah Nazir — berasaskan Laravel dengan Google OAuth dan pelaporan terperinci.",
    deskripsi_panjang:
      "myNazir menguruskan data Standard Kualiti Pendidikan Malaysia (SKPM) dengan sokongan Google OAuth untuk log masuk selamat. Sistem ini menggunakan Laravel dan MySQL untuk pengurusan rekod pemeriksaan yang komprehensif.",
    tech_stack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Google OAuth"],
    tags: ["Web App", "Laravel", "SKPM", "Report", "RBAC"],
    status: "aktif",
    tahun: 2025,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "📋",
    warna_tema: "#6366F1",
    is_published: true,
    urutan: 6,
  },
  {
    nama: "myKehadiranBRS",
    slug: "mykehadiranbrs",
    deskripsi:
      "Sistem kehadiran digital berasaskan QR Code untuk BRS — membolehkan pengambilan kehadiran pelajar secara pantas menggunakan imbasan QR dengan Supabase sebagai backend.",
    deskripsi_panjang:
      "myKehadiranBRS menggunakan teknologi QR Code (html5-qrcode) untuk pengambilan kehadiran secara real-time. Data disimpan dalam Supabase PostgreSQL dengan laporan kehadiran boleh dieksport dalam format PDF.",
    tech_stack: ["React", "Vite", "Supabase", "QR Code", "Tailwind CSS", "jsPDF"],
    tags: ["QR Code", "React", "Supabase", "Kehadiran", "Web App", "Real-time"],
    status: "aktif",
    tahun: 2026,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "📱",
    warna_tema: "#14B8A6",
    is_published: true,
    urutan: 7,
  },
  {
    nama: "Kalkulator Jarak v2",
    slug: "kalkulator-jarak-v2",
    deskripsi:
      "Aplikasi pengiraan jarak perjalanan untuk tujuan tuntutan perjalanan pegawai Jemaah Nazir — dibina dengan Next.js dan data geospatial.",
    deskripsi_panjang:
      "Versi 2 kalkulator jarak ini menggunakan Next.js dengan TypeScript untuk pengiraan jarak perjalanan yang lebih tepat. Aplikasi ini membantu pegawai mengira jarak perjalanan rasmi untuk tujuan tuntutan perjalanan.",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    tags: ["Web App", "Next.js", "Utiliti", "Geolokasi"],
    status: "aktif",
    tahun: 2025,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "📍",
    warna_tema: "#F97316",
    is_published: true,
    urutan: 8,
  },
  {
    nama: "eNazir (Legacy)",
    slug: "enazir-legacy",
    deskripsi:
      "Sistem eNazir versi asal berasaskan PHP — sistem pemeriksaan sekolah terawal yang menjadi asas kepada inovasi-inovasi Jemaah Nazir seterusnya.",
    deskripsi_panjang:
      "Sistem eNazir legacy dibina dalam PHP tulen dengan integrasi API sekolah, pengurusan borang pemeriksaan, eksport Excel, dan penjana PDF. Ia menjadi asas kepada versi-versi yang lebih moden.",
    tech_stack: ["PHP", "MySQL", "JavaScript", "CSS", "GitLab CI"],
    tags: ["Web App", "Legacy", "Pemeriksaan", "Report", "PHP"],
    status: "arkib",
    tahun: 2020,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "🗄️",
    warna_tema: "#6B7280",
    is_published: true,
    urutan: 9,
  },
  {
    nama: "eNazirCare Admin",
    slug: "enazircare-admin",
    deskripsi:
      "Panel pentadbiran eNazirCare — dibina dengan Google Apps Script untuk pengurusan data dan integrasi Google Workspace.",
    deskripsi_panjang:
      "eNazirCare Admin menggunakan Google Apps Script untuk integrasi penuh dengan ekosistem Google Workspace. Ia membolehkan pengurusan data terus dari Google Sheets dengan antara muka admin yang ringkas.",
    tech_stack: ["Google Apps Script", "JavaScript", "Google Workspace"],
    tags: ["Google Apps Script", "Admin", "Utiliti", "Web App"],
    status: "aktif",
    tahun: 2026,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "🔧",
    warna_tema: "#059669",
    is_published: true,
    urutan: 10,
  },
  {
    nama: "MyClaimJN",
    slug: "myclaim-jn",
    deskripsi:
      "Sistem tuntutan digital untuk Jemaah Nazir — memudahkan proses pengemukaan dan pemprosesan tuntutan pegawai secara dalam talian.",
    deskripsi_panjang:
      "MyClaimJN dibina menggunakan Google Apps Script dengan integrasi Google Sheets sebagai backend. Sistem ini membolehkan pegawai mengemukakan tuntutan perjalanan dan elaun secara digital.",
    tech_stack: ["Google Apps Script", "JavaScript", "Google Sheets", "HTML"],
    tags: ["Google Apps Script", "Tuntutan", "Utiliti", "Web App"],
    status: "aktif",
    tahun: 2026,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "💼",
    warna_tema: "#7C3AED",
    is_published: true,
    urutan: 11,
  },
  {
    nama: "AddMath Hero",
    slug: "addmath-hero",
    deskripsi:
      "Aplikasi mudah alih pembelajaran Matematik Tambahan — membantu pelajar sekolah menengah menguasai konsep AddMath melalui latihan interaktif.",
    deskripsi_panjang:
      "AddMath Hero ialah aplikasi pendidikan yang direka untuk membantu pelajar tingkatan 4 dan 5 menguasai subjek Matematik Tambahan. Dokumentasi penuh telah disediakan untuk pembangunan dan penerbitan aplikasi.",
    tech_stack: ["Mobile App", "Education"],
    tags: ["Mobile", "Pendidikan", "EduTech"],
    status: "dalam-pembangunan",
    tahun: 2026,
    link_demo: null,
    link_github: null,
    gambar_url: null,
    ikon: "📐",
    warna_tema: "#EC4899",
    is_published: true,
    urutan: 12,
  },
];

// ─── CV / Resume Data ────────────────────────────────────────────────────────

export const CV_PERSONAL = {
  nama: "Mohd Fisha Hafiz Bin Abidin",
  jawatan: "Pegawai ICT | Pembangun Sistem Digital",
  organisasi: "Jemaah Nazir, Kementerian Pendidikan Malaysia",
  lokasi: "Kuala Lumpur, Malaysia",
  email: "fisha@moe.gov.my",
  telefon: "013-4159484",
  telefonPejabat: "03-88844250",
  bio: "Pegawai ICT berpengalaman dalam pembangunan sistem digital inovatif untuk sektor kerajaan. Berkhidmat dalam sektor pendidikan awam sejak 2008, kini membangunkan 12+ sistem digital di Jemaah Nazir bagi meningkatkan kecekapan pemeriksaan sekolah dan transformasi pendidikan Malaysia. Pakar dalam web development moden, integrasi AI, cloud computing dan pembangunan aplikasi mudah alih.",
};

export const CV_PENDIDIKAN = [
  {
    tahun: "2007",
    kelayakan: "Ijazah Sarjana Muda",
    bidang: "Pendidikan",
    institusi: "Universiti Utara Malaysia (UUM)",
  },
];

export const CV_PENGALAMAN = [
  {
    tahun: "2017 – kini",
    jawatan: "Pegawai ICT / Pembangun Sistem Digital",
    org: "Jemaah Nazir, KPM",
    desc: "Membangunkan dan menyelenggara 12+ sistem digital bagi transformasi proses pemeriksaan sekolah dan pengurusan pendidikan negara. Mengintegrasikan teknologi AI, cloud dan mobile dalam ekosistem digital Jemaah Nazir.",
  },
  {
    tahun: "2014 – 2017",
    jawatan: "Pegawai ICT",
    org: "Bahagian Buku Teks, KPM",
    desc: "Berkhidmat dalam pengurusan teknologi maklumat dan pembangunan sistem di Bahagian Buku Teks, Kementerian Pendidikan Malaysia.",
  },
  {
    tahun: "2014",
    jawatan: "Pegawai ICT",
    org: "Bahagian Teknologi Pendidikan, KPM",
    desc: "Berkhidmat dalam pengurusan dan pembangunan teknologi pendidikan di peringkat kementerian.",
  },
  {
    tahun: "2008 – 2014",
    jawatan: "Guru / Pegawai Pendidikan",
    org: "SMK Lutong",
    desc: "Berkhidmat sebagai pendidik dalam sektor pendidikan awam, menjadi asas pengalaman dalam bidang pendidikan dan teknologi.",
  },
];

export const CV_PENCAPAIAN = [
  "Membangunkan 12+ sistem digital dalam masa 5 tahun untuk Jemaah Nazir, KPM",
  "Mempelopori integrasi AI (Gemini) dalam sistem analitik pendidikan sektor awam Malaysia",
  "Mengurangkan masa pemprosesan tuntutan & pemantauan sekolah melalui automasi digital penuh",
  "Membangunkan aplikasi mudah alih cross-platform (Android & iOS) untuk pengurusan pemeriksaan",
  "Mengimplementasi CI/CD pipeline (GitLab) untuk deployment berterusan sistem kerajaan",
  "Membina ekosistem digital bersepadu: web + mobile + AI + cloud dalam satu platform",
];

export const SKILL_GROUPS = [
  {
    kategori: "Web & Frontend",
    warna: "#3B82F6",
    ikon: "🌐",
    kemahiran: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "Vite", "Framer Motion"],
  },
  {
    kategori: "Backend & API",
    warna: "#8B5CF6",
    ikon: "⚙️",
    kemahiran: ["Node.js", "Laravel (PHP)", "REST API", "Python (Flask)", "Google Apps Script", "Webhooks"],
  },
  {
    kategori: "Database & Cloud",
    warna: "#06B6D4",
    ikon: "🗄️",
    kemahiran: ["Supabase", "Firebase", "MySQL", "PostgreSQL", "MongoDB", "Vercel", "Google Cloud"],
  },
  {
    kategori: "Mobile — Android",
    warna: "#10B981",
    ikon: "🤖",
    kemahiran: ["React Native", "Expo", "Android Studio", "Firebase FCM", "QR Code Integration", "Offline-first"],
  },
  {
    kategori: "Mobile — iOS",
    warna: "#64748B",
    ikon: "🍎",
    kemahiran: ["React Native (iOS)", "Expo EAS Build", "TestFlight", "Apple Push Notification", "Swift (asas)"],
  },
  {
    kategori: "Sistem Kerajaan",
    warna: "#F59E0B",
    ikon: "🏛️",
    kemahiran: ["MyGov API", "Sistem SAGA", "ePerolehan", "HRMIS", "SPP (Sistem Perkhidmatan Pendidikan)", "Google Workspace for Edu"],
  },
  {
    kategori: "Produktiviti & Tools",
    warna: "#EF4444",
    ikon: "🛠️",
    kemahiran: ["Git / GitHub", "VS Code", "Figma", "Postman", "Power BI", "Google Looker Studio", "Microsoft 365"],
  },
  {
    kategori: "AI & Analitik",
    warna: "#EC4899",
    ikon: "🤖",
    kemahiran: ["Gemini AI", "OpenAI API", "Chart.js", "Google Analytics", "Prompt Engineering", "AI Integration"],
  },
];

// ─── Tags & Status ────────────────────────────────────────────────────────────

export const ALL_TAGS = [
  "Semua",
  "Web App",
  "Dashboard",
  "Mobile",
  "React",
  "Next.js",
  "Laravel",
  "Firebase",
  "Supabase",
  "QR Code",
  "AI/ML",
  "RBAC",
  "Tracking",
  "Report",
  "Real-time",
  "Google Apps Script",
  "Pendidikan",
  "Pemantauan",
  "Utiliti",
];

export const STATUS_CONFIG = {
  aktif: {
    label: "Aktif",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  "dalam-pembangunan": {
    label: "Dalam Pembangunan",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  arkib: {
    label: "Arkib",
    color: "bg-gray-100 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  },
};
