import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pixelas.store'),
  title: "Pixelas — Alat Software Kreatif",
  description: "Alat software bertenaga AI premium untuk profesional kreatif",
  openGraph: {
    title: "Pixelas — Alat Software Kreatif",
    description: "Alat software bertenaga AI premium untuk profesional kreatif",
    siteName: "Pixelas",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${instrumentSerif.variable} ${jakarta.className}`}>{children}</body>
    </html>
  );
}
