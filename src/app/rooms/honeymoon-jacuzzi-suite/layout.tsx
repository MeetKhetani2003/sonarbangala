import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Honeymoon Suite with Balcony & Pool View | Hotel Sonar Bangla Goa | ₹2,500/Person',
  description: 'Signature Honeymoon Suite at Hotel Sonar Bangla Goa. Rose petal bed decor, candlelight, sunset balcony & pool view. 100% couple-friendly. 450m from Calangute Beach. ₹2,500/person/night.',
  keywords: [
    'honeymoon suite Goa near beach',
    'romantic hotel Calangute Goa',
    'honeymoon room with balcony North Goa',
    'rose petal bed decoration hotel Goa',
    'candlelight dinner room Goa',
    'romantic suite Calangute Baga',
    'honeymoon special Goa hotel',
  ],
  alternates: { canonical: '/rooms/honeymoon-jacuzzi-suite' },
  openGraph: {
    title: 'Signature Honeymoon Suite | Hotel Sonar Bangla Goa | Sunset Balcony',
    description: 'Romantic honeymoon suite with rose petal decor, candlelight, sunset balcony & pool view near Calangute Beach. ₹2,500/person/night.',
    url: 'https://www.hotelshonarbangla.in/rooms/honeymoon-jacuzzi-suite',
    images: [{ url: 'https://www.hotelshonarbangla.in/rooms/room-deluxe-tv-sofa.jpg', width: 1200, height: 630, alt: 'Honeymoon Suite Hotel Sonar Bangla Goa' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
