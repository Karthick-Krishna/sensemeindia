import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/lib/data-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "SenseMe India — Luxury Essential Oils, Fragrance & Aroma Formulations",
  description: "Explore pure essential oils, diffuser blends, artisan fragrance oils, and ultrasonic diffusion systems from SenseMe India (Mylal Exports, Coimbatore, India).",
  keywords: "essential oils, fragrance oils, diffuser oils, aroma products, SenseMe India, Coimbatore, natural oils, aromatherapy, soap making oils, candle making fragrance",
  openGraph: {
    title: "SenseMe India — Luxury Essential Oils & Fragrance Formulations",
    description: "Discover a carefully presented collection of essential oils, diffuser blends and aroma systems from SenseMe India.",
    url: "https://sensemeindia.com",
    siteName: "SenseMe India",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SenseMe India — Essential Oils & Fragrance Formulations",
    description: "Discover pure essential oils, fragrance concentrates, and ultrasonic diffusion systems.",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-transparent.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-[#FDFBF7] text-[#1A1D1A]">
        <DataProvider>
          <CustomCursor />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </DataProvider>
      </body>
    </html>
  );
}
