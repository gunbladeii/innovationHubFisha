# FISHA Innovation Hub

Portal awam untuk mempamerkan 12 sistem digital inovatif yang dibangunkan oleh **Jemaah Nazir**, Kementerian Pendidikan Malaysia.

## Ciri-ciri Utama

- **Galeri Inovasi** — Grid kad interaktif untuk semua 12 sistem digital
- **Penapis & Carian** — Tapis mengikut tag teknologi atau cari mengikut nama
- **CMS Admin** — Panel pengurusan kandungan (demo mode, Supabase-ready)
- **Reka bentuk Responsif** — Berfungsi pada desktop, tablet, dan mudah alih
- **Tema Kerajaan** — Reka bentuk profesional biru + putih

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router, TypeScript
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Supabase](https://supabase.com/) — Backend & database (optional)
- [Lucide React](https://lucide.dev/) — Ikon
- [Framer Motion](https://www.framer.com/motion/) — Animasi

## Mula Projek

### 1. Install dependencies

```bash
npm install
```

### 2. Sediakan environment variables

Salin fail contoh:

```bash
copy .env.local.example .env.local
```

Edit `.env.local` dan isi nilai Supabase anda (optional untuk mode demo):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Jalankan server pembangunan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) dalam pelayar.

## Halaman

| URL | Keterangan |
|-----|-----------|
| `/` | Halaman awam — galeri inovasi |
| `/admin` | Panel CMS admin |

## Setup Supabase (Optional)

Jika anda ingin menggunakan Supabase sebagai backend:

1. Cipta projek baru di [supabase.com](https://supabase.com)
2. Pergi ke **SQL Editor** dalam Supabase dashboard
3. Jalankan fail SQL: `database/schema.sql`
4. Isi nilai URL dan anon key dalam `.env.local`
5. Uncomment kod Supabase dalam `app/admin/page.tsx`

## Struktur Projek

```
InovasiSistemFisha/
├── app/
│   ├── admin/          # Panel CMS admin
│   ├── globals.css     # Global styles + Tailwind
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Halaman utama
├── components/
│   ├── FilterBar.tsx   # Bar carian dan penapis tag
│   ├── HeroSection.tsx # Bahagian hero halaman utama
│   ├── InovasiCard.tsx # Kad inovasi individual
│   ├── InovasiGrid.tsx # Grid semua kad dengan state filtering
│   └── Navbar.tsx      # Bar navigasi atas
├── database/
│   └── schema.sql      # SQL schema + seed data untuk Supabase
├── lib/
│   ├── data.ts         # Data statik 12 inovasi
│   ├── database.types.ts # TypeScript types untuk Supabase
│   └── supabase.ts     # Supabase client
└── .env.local.example  # Contoh environment variables
```

## Inovasi yang Dipamerkan

1. **STTPMP** — Sistem Pengurusan Syor, Teguran & Tindakan
2. **SPAK-JN** — Sistem Pemantauan AI Kurikulum
3. **MYSPAD** — Sistem Penarafan Dinamik AI
4. **MyPemeriksaanJN** — Pengurusan Pemeriksaan Digital
5. **eNazir Laravel** — Portal Inspektorat Sekolah
6. **myNazir (SKPM)** — Standard Kualiti Pendidikan Malaysia
7. **myKehadiranBRS** — Sistem Kehadiran QR Code
8. **Kalkulator Jarak v2** — Pengiraan Zon Sekolah
9. **eNazir (Legacy)** — Sistem Legasi Pemeriksaan
10. **eNazirCare Admin** — Pengurusan Kebajikan
11. **MyClaimJN** — Sistem Tuntutan Digital
12. **AddMath Hero** — Platform Pembelajaran AI

## Skrip NPM

```bash
npm run dev      # Jalankan server pembangunan
npm run build    # Build untuk production
npm run start    # Jalankan server production
npm run lint     # Semak linting
```

---

Dibangunkan oleh **Fisha**, MoE.
