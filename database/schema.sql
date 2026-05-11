-- =============================================
-- FISHA Innovation Hub — Supabase Schema
-- =============================================

-- Buat table inovasi
CREATE TABLE IF NOT EXISTS inovasi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  nama TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  deskripsi TEXT NOT NULL,
  deskripsi_panjang TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'aktif' CHECK (status IN ('aktif', 'dalam-pembangunan', 'arkib')),
  tahun INTEGER NOT NULL DEFAULT 2025,
  link_demo TEXT,
  link_github TEXT,
  gambar_url TEXT,
  ikon TEXT NOT NULL DEFAULT '🚀',
  warna_tema TEXT NOT NULL DEFAULT '#3B82F6',
  is_published BOOLEAN NOT NULL DEFAULT true,
  urutan INTEGER NOT NULL DEFAULT 99
);

-- Index untuk carian
CREATE INDEX IF NOT EXISTS idx_inovasi_slug ON inovasi(slug);
CREATE INDEX IF NOT EXISTS idx_inovasi_published ON inovasi(is_published);
CREATE INDEX IF NOT EXISTS idx_inovasi_tags ON inovasi USING gin(tags);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inovasi_updated_at
  BEFORE UPDATE ON inovasi
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security (RLS)
ALTER TABLE inovasi ENABLE ROW LEVEL SECURITY;

-- Public boleh baca yang published sahaja
CREATE POLICY "Public read published inovasi"
  ON inovasi FOR SELECT
  USING (is_published = true);

-- Admin (authenticated) boleh buat semua
CREATE POLICY "Authenticated full access"
  ON inovasi FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- =============================================
-- Seed data (jalankan selepas buat table)
-- =============================================
INSERT INTO inovasi (nama, slug, deskripsi, deskripsi_panjang, tech_stack, tags, status, tahun, ikon, warna_tema, is_published, urutan) VALUES
(
  'STTPMP',
  'sttpmp',
  'Sistem Tahap Tindakan Perakuan Menteri Pendidikan — sistem pengesanan dan pemantauan maklum balas serta syor daripada JPN secara real-time.',
  'STTPMP menyediakan papan pemuka trafik light berwarna merah/kuning/hijau untuk menjejaki status tindakan perakuan Menteri Pendidikan.',
  ARRAY['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel'],
  ARRAY['Dashboard', 'Tracking', 'RBAC', 'Real-time', 'Web App', 'Supabase'],
  'aktif', 2025, '📊', '#3B82F6', true, 1
),
(
  'SPAK-JN',
  'spak-jn',
  'Sistem Pemantauan dan Analitik Kualiti untuk Jemaah Nazir — platform pemantauan instrumen pemeriksaan sekolah berasaskan Firebase dengan AI analytics.',
  'SPAK-JN menggunakan Firebase Firestore untuk pengurusan data pemeriksaan sekolah dengan sokongan Gemini AI untuk analitik dinamik.',
  ARRAY['React', 'Vite', 'Firebase', 'MongoDB', 'Node.js', 'Gemini AI'],
  ARRAY['Dashboard', 'AI/ML', 'Firebase', 'React', 'Pemantauan', 'Web App'],
  'aktif', 2025, '🔍', '#8B5CF6', true, 2
),
(
  'MYSPAD',
  'myspad',
  'Sistem Pemantauan Sekolah Penilaian dan Analitik Dinamik — dashboard AI untuk analisis data peperiksaan dan kualiti sekolah.',
  'MYSPAD menggunakan Firebase dan Gemini AI untuk laporan dinamik tentang pencapaian sekolah dengan eksport Excel dan pembinaan formula tersuai.',
  ARRAY['React', 'Vite', 'Firebase', 'Gemini AI', 'Tailwind CSS'],
  ARRAY['AI/ML', 'Dashboard', 'Firebase', 'React', 'Analitik', 'Web App'],
  'aktif', 2026, '🤖', '#10B981', true, 3
),
(
  'MyPemeriksaanJN',
  'mypemeriksaanjn',
  'MySchoolJN — sistem pemilihan dan penugasan sekolah untuk pemeriksaan Jemaah Nazir.',
  'Aplikasi React berasaskan Supabase membantu peneraju mengurus pemilihan sekolah pemeriksaan mengikut sektor.',
  ARRAY['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Zustand', 'Vercel'],
  ARRAY['Web App', 'Supabase', 'RBAC', 'Tracking', 'React', 'Dashboard'],
  'aktif', 2025, '🏫', '#F59E0B', true, 4
),
(
  'eNazir Laravel',
  'enazir-laravel',
  'Sistem eNazir versi moden berasaskan Laravel dengan antara muka Tailwind CSS yang dinaik taraf.',
  'Versi Laravel eNazir dengan deployment staging/production, CI/CD pipeline GitLab, dan audit skop peranan.',
  ARRAY['Laravel', 'PHP', 'Tailwind CSS', 'MySQL', 'Vite', 'GitLab CI'],
  ARRAY['Web App', 'Laravel', 'RBAC', 'Pemeriksaan', 'CI/CD'],
  'aktif', 2026, '⚙️', '#EF4444', true, 5
),
(
  'myNazir (SKPM)',
  'mynazir',
  'Sistem pengurusan data SKPM untuk Jemaah Nazir dengan Google OAuth dan pelaporan terperinci.',
  'myNazir menguruskan data SKPM dengan sokongan Google OAuth untuk log masuk selamat.',
  ARRAY['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Google OAuth'],
  ARRAY['Web App', 'Laravel', 'SKPM', 'Report', 'RBAC'],
  'aktif', 2025, '📋', '#6366F1', true, 6
),
(
  'myKehadiranBRS',
  'mykehadiranbrs',
  'Sistem kehadiran digital berasaskan QR Code untuk BRS dengan Supabase sebagai backend.',
  'myKehadiranBRS menggunakan QR Code untuk pengambilan kehadiran secara real-time dengan laporan PDF.',
  ARRAY['React', 'Vite', 'Supabase', 'QR Code', 'Tailwind CSS', 'jsPDF'],
  ARRAY['QR Code', 'React', 'Supabase', 'Kehadiran', 'Web App', 'Real-time'],
  'aktif', 2026, '📱', '#14B8A6', true, 7
),
(
  'Kalkulator Jarak v2',
  'kalkulator-jarak-v2',
  'Aplikasi pengiraan jarak perjalanan untuk tuntutan perjalanan pegawai Jemaah Nazir.',
  'Versi 2 kalkulator jarak menggunakan Next.js dengan TypeScript untuk pengiraan jarak perjalanan yang tepat.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  ARRAY['Web App', 'Next.js', 'Utiliti', 'Geolokasi'],
  'aktif', 2025, '📍', '#F97316', true, 8
),
(
  'eNazir (Legacy)',
  'enazir-legacy',
  'Sistem eNazir versi asal berasaskan PHP — asas kepada inovasi-inovasi Jemaah Nazir seterusnya.',
  'Sistem eNazir legacy dibina dalam PHP dengan integrasi API sekolah, eksport Excel, dan penjana PDF.',
  ARRAY['PHP', 'MySQL', 'JavaScript', 'CSS', 'GitLab CI'],
  ARRAY['Web App', 'Legacy', 'Pemeriksaan', 'Report', 'PHP'],
  'arkib', 2020, '🗄️', '#6B7280', true, 9
),
(
  'eNazirCare Admin',
  'enazircare-admin',
  'Panel pentadbiran eNazirCare dibina dengan Google Apps Script untuk integrasi Google Workspace.',
  'eNazirCare Admin menggunakan Google Apps Script untuk pengurusan data terus dari Google Sheets.',
  ARRAY['Google Apps Script', 'JavaScript', 'Google Workspace'],
  ARRAY['Google Apps Script', 'Admin', 'Utiliti', 'Web App'],
  'aktif', 2026, '🔧', '#059669', true, 10
),
(
  'MyClaimJN',
  'myclaim-jn',
  'Sistem tuntutan digital untuk Jemaah Nazir — pengemukaan dan pemprosesan tuntutan pegawai secara dalam talian.',
  'MyClaimJN dibina dengan Google Apps Script dan Google Sheets sebagai backend untuk pengemukaan tuntutan digital.',
  ARRAY['Google Apps Script', 'JavaScript', 'Google Sheets', 'HTML'],
  ARRAY['Google Apps Script', 'Tuntutan', 'Utiliti', 'Web App'],
  'aktif', 2026, '💼', '#7C3AED', true, 11
),
(
  'AddMath Hero',
  'addmath-hero',
  'Aplikasi mudah alih pembelajaran Matematik Tambahan untuk pelajar sekolah menengah.',
  'AddMath Hero ialah aplikasi pendidikan untuk membantu pelajar tingkatan 4 dan 5 menguasai Matematik Tambahan.',
  ARRAY['Mobile App', 'Education'],
  ARRAY['Mobile', 'Pendidikan', 'EduTech'],
  'dalam-pembangunan', 2026, '📐', '#EC4899', true, 12
)
ON CONFLICT (slug) DO NOTHING;
