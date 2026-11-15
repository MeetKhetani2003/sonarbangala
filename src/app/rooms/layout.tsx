import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rooms & Suites | Hotel Sonar Bangla Goa | From ₹1,800/Person Near Calangute Beach',
  description: 'Choose from Couple Executive Rooms, Family Suites & Honeymoon Suites at Hotel Sonar Bangla Goa. Rooms from ₹1,800/person/night with pool, AC, Wi-Fi & hot water. 450m from Calangute Beach.',
  keywords: [
    'rooms in hotel near Calangute beach',
    'couple room Goa with pool',
    'honeymoon suite North Goa',
    'family suite Calangute Goa',
    'hotel room with swimming pool Goa',
    'best couple hotel Baga Calangute',
    'hotel Sonar Bangla rooms price',
  ],
  alternates: { canonical: '/rooms' },
  openGraph: {
    title: 'Rooms & Suites | Hotel Sonar Bangla Goa | From ₹1,800/Person',
    description: 'Couple Executive Rooms, Honeymoon Suites & Family Suites near Calangute Beach. Pool, AC, Wi-Fi & Bengali hospitality.',
    url: 'https://www.hotelshonarbangla.in/rooms',
    images: [{ url: 'https://www.hotelshonarbangla.in/rooms/room-blue-headboard.jpg', width: 1200, height: 630, alt: 'Hotel Sonar Bangla Goa Couple Room' }],
  },
}

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
