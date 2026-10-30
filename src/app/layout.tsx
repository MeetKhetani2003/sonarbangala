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
  title: "Hotel Sonar Bangla Goa | Boutique Stay Near Calangute Beach",
  description:
    "Authentic Bengali hospitality and coastal serenity in Goa. 5 mins walk to Calangute Beach. Couple-friendly rooms, romantic honeymoon bed art, and direct WhatsApp concierge booking.",
  keywords: [
    "Hotel Sonar Bangla Goa",
    "Best hotel in Calangute Goa",
    "Couple friendly hotel in Goa near beach",
    "Honeymoon stay Goa with bed decoration",
    "Boutique hotel North Goa",
    "Bengali hotel in Goa with authentic Bengali food",
    "Calangute Baga beach hotels",
  ],
  authors: [{ name: "Hotel Sonar Bangla Goa" }],
  creator: "Hotel Sonar Bangla",
  publisher: "Hotel Sonar Bangla",
  metadataBase: new URL("https://hotelsonarbanglagoa.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
  openGraph: {
    title: "Hotel Sonar Bangla Goa | Couple & Family Stay Near Beach",
    description:
      "A serene coastal sanctuary 450 meters from Calangute Beach. Couple-friendly rooms, romantic honeymoon setups, and direct WhatsApp booking.",
    url: "https://hotelsonarbanglagoa.com",
    siteName: "Hotel Sonar Bangla Goa",
    images: [
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Hotel Sonar Bangla Goa Couple Executive Room",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Sonar Bangla Goa | Best Couple & Family Stay Near Beach",
    description:
      "5 mins walk from Calangute Beach. Couple friendly rooms, honeymoon decor, and authentic Bengali hospitality.",
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"],
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
