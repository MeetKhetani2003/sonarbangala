import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Hotel Sonar Bangla Goa | Best Couple & Family Hotel Near Calangute Beach",
  description:
    "Boutique hotel 450m from Calangute Beach, North Goa. Couple-friendly rooms from ₹1,800/person/night. Swimming pool, AC, free Wi-Fi, 24/7 hot water & authentic Bengali food. Zero OTA taxes. Book on WhatsApp: +91 90640 22151",
  keywords: [
    "Hotel Sonar Bangla Goa",
    "Hotel in Calangute with swimming pool",
    "Best hotel in Calangute Goa",
    "Couple friendly hotel in Goa near beach",
    "Honeymoon stay Goa with bed decoration",
    "Boutique hotel North Goa with pool",
    "Bengali hotel in Goa with authentic Bengali food",
    "Calangute Baga beach hotels with AC and pool",
    "Hotel Shonarbangla Goa",
    "best hotel near Calangute beach with pool",
    "couple friendly hotel Goa 2025",
    "honeymoon hotel Goa North",
    "Bengali hotel Calangute Goa",
    "hotel near Baga beach",
    "direct booking hotel Goa lowest rate",
  ],
  authors: [{ name: "Hotel Sonar Bangla Goa" }],
  creator: "Hotel Sonar Bangla",
  publisher: "Hotel Sonar Bangla",
  metadataBase: new URL("https://www.hotelshonarbangla.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
  openGraph: {
    title: "Hotel Sonar Bangla Goa | Couple & Family Stay Near Calangute Beach",
    description:
      "Boutique hotel 450m from Calangute Beach, North Goa. Couple-friendly rooms from ₹1,800/person. Pool, AC, Wi-Fi, Bengali food & honeymoon decor. Direct WhatsApp booking.",
    url: "https://www.hotelshonarbangla.in",
    siteName: "Hotel Sonar Bangla Goa",
    images: [
      {
        url: "https://www.hotelshonarbangla.in/rooms/hotel-exterior.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Sonar Bangla Goa — Boutique Hotel Near Calangute Beach",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Sonar Bangla Goa | Couple & Family Stay Near Calangute Beach",
    description:
      "Boutique hotel 450m from Calangute Beach, North Goa. Couple-friendly rooms from ₹1,800/person. Pool, AC, Wi-Fi, Bengali food & honeymoon decor. Direct WhatsApp booking.",
    images: ["https://www.hotelshonarbangla.in/rooms/hotel-exterior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAFA] text-stone-900 font-sans selection:bg-[#FF6B6B]/20 selection:text-[#0F2C59]">
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
