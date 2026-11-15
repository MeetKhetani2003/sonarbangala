import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Family & Group Suite | Hotel Sonar Bangla Goa | ₹2,200/Person',
  description: 'Spacious Family & Group Suite for 4-6 guests at Hotel Sonar Bangla Goa. 2 king beds, dual AC, pool, Wi-Fi, Bengali food & 450m from Calangute Beach. From ₹2,200/person/night.',
  keywords: [
    'family suite hotel Goa Calangute',
    'group accommodation North Goa',
    'hotel for 4-6 people Calangute',
    'family hotel near beach Goa with pool',
    'Bengali family hotel Goa',
    'group suite North Goa near beach',
  ],
  alternates: { canonical: '/rooms/family-group-suite' },
  openGraph: {
    title: 'Family & Group Suite | Hotel Sonar Bangla Goa | 4-6 Guests',
    description: 'Spacious suite with 2 king beds for families & groups. Pool, dual AC, Wi-Fi, Bengali cuisine. 450m from Calangute Beach. ₹2,200/person/night.',
    url: 'https://www.hotelshonarbangla.in/rooms/family-group-suite',
    images: [{ url: 'https://www.hotelshonarbangla.in/rooms/room-grey-sofa-wide.jpg', width: 1200, height: 630, alt: 'Family Suite Hotel Sonar Bangla Goa' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
