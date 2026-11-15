import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deluxe Garden Patio Room | Hotel Sonar Bangla Goa | ₹1,800/Person',
  description: 'Deluxe Garden Patio Room at Hotel Sonar Bangla Goa. Ground-floor, private garden sit-out, pool access, AC, Wi-Fi, hot water & king bed. 100% couple-friendly near Calangute Beach.',
  keywords: [
    'deluxe room hotel Goa Calangute',
    'garden patio room Goa',
    'budget couple hotel Calangute',
    'affordable hotel near Calangute beach with pool',
    'couple room with garden view Goa',
    'ground floor room hotel North Goa',
  ],
  alternates: { canonical: '/rooms/deluxe-garden-patio' },
  openGraph: {
    title: 'Deluxe Garden Patio Room | Hotel Sonar Bangla Goa | ₹1,800/Person',
    description: 'Ground-floor garden room with pool access, king bed, AC & Wi-Fi near Calangute Beach. Best value couple room. ₹1,800/person/night.',
    url: 'https://www.hotelshonarbangla.in/rooms/deluxe-garden-patio',
    images: [{ url: 'https://www.hotelshonarbangla.in/rooms/room-grey-tufted-clean.jpg', width: 1200, height: 630, alt: 'Deluxe Garden Patio Room Hotel Sonar Bangla Goa' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
