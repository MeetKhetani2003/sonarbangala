import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Honeymoon Special Package Goa | Hotel Sonar Bangla | Rose Bed Decor & Candlelight',
  description: 'Honeymoon Special Package at Hotel Sonar Bangla Goa. Rose petal bed decoration, candlelight setup, poolside room, Bengali hospitality. 450m from Calangute Beach. Book on WhatsApp.',
  keywords: [
    'honeymoon package Goa hotel',
    'honeymoon special Goa near Calangute',
    'rose petal bed decoration Goa',
    'romantic package hotel North Goa',
    'anniversary special hotel Goa',
    'candlelight setup hotel Goa Calangute',
    'newlywed couple hotel Goa',
  ],
  alternates: { canonical: '/honeymoon-special' },
  openGraph: {
    title: 'Honeymoon Special Package | Hotel Sonar Bangla Goa',
    description: 'Rose petal bed art, candlelight, poolside romance & Bengali hospitality near Calangute Beach. Special honeymoon package. Book on WhatsApp.',
    url: 'https://www.hotelshonarbangla.in/honeymoon-special',
    images: [{ url: 'https://www.hotelshonarbangla.in/rooms/room-deluxe-tv-sofa.jpg', width: 1200, height: 630, alt: 'Honeymoon Special Package Hotel Sonar Bangla Goa' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
