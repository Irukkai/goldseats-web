import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldseats.app"),
  title: {
    default: "GoldSeats — Find the best seat in the house",
    template: "%s · GoldSeats",
  },
  description:
    "GoldSeats scores every available seat in a cinema auditorium and tells you exactly where to sit, then hands you off to the theatre to book.",
  openGraph: {
    type: "website",
    siteName: "GoldSeats",
    url: "https://goldseats.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-ink text-cream min-h-dvh antialiased">{children}</body>
    </html>
  );
}
