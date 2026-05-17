import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FISHA Innovation Hub | Portal Inovasi Digital",
  description:
    "Showcase inovasi digital yang dibangunkan oleh Fisha — sistem-sistem moden untuk transformasi pendidikan Malaysia.",
  keywords: ["Fisha", "inovasi digital", "sistem pendidikan", "FISHA", "MOE Malaysia"],
  authors: [{ name: "Fisha" }],
  openGraph: {
    title: "FISHA Innovation Hub",
    description: "Portal Inovasi Digital",
    type: "website",
    locale: "ms_MY",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/brand/favicon-16x16-v2.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32x32-v2.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/android-chrome-192x192-v2.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/android-chrome-512x512-v2.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon-v2.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/brand/favicon-32x32-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
