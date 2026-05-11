import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FISHA Innovation Hub | Portal Inovasi Digital Jemaah Nazir",
  description:
    "Showcase inovasi digital yang dibangunkan oleh Jemaah Nazir — sistem-sistem moden untuk transformasi pendidikan Malaysia.",
  keywords: ["Jemaah Nazir", "inovasi digital", "sistem pendidikan", "FISHA", "MOE Malaysia"],
  authors: [{ name: "Jemaah Nazir" }],
  openGraph: {
    title: "FISHA Innovation Hub",
    description: "Portal Inovasi Digital Jemaah Nazir",
    type: "website",
    locale: "ms_MY",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
