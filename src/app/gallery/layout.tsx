import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery | Hotel Sonar Bangla Goa | Rooms, Decor & Goa Moments',
  description: 'Explore Hotel Sonar Bangla Goa photo gallery — couple rooms, honeymoon bed decoration, family suites, swimming pool, hotel exterior & Calangute beach moments.',
  keywords: [
    'Hotel Sonar Bangla Goa photos',
    'hotel gallery Calangute Goa',
    'honeymoon decoration photos Goa',
    'hotel room photos North Goa',
    'couple room photos Goa Calangute',
  ],
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Photo Gallery | Hotel Sonar Bangla Goa',
    description: 'Rooms, honeymoon decor, family suites, pool & beach moments at Hotel Sonar Bangla Goa near Calangute Beach.',
    url: 'https://www.hotelshonarbangla.in/gallery',
    images: [{ url: 'https://www.hotelshonarbangla.in/rooms/hotel-exterior.jpg', width: 1200, height: 630, alt: 'Hotel Sonar Bangla Goa Gallery' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
