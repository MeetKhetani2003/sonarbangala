import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Executive Couple Room with Balcony | Hotel Sonar Bangla Goa | ₹1,800/Person',
  description: 'Book Executive Duo Couple Room at Hotel Sonar Bangla Goa. King bed, private balcony, pool access, AC, Wi-Fi, hot water. Couple-friendly. 450m from Calangute Beach. From ₹1,800/person/night.',
  keywords: [
    'couple room hotel Goa Calangute',
    'hotel with private balcony near Calangute beach',
    'couple friendly room North Goa',
    'executive couple room Goa with pool',
    'romantic room Calangute Baga',
    'honeymoon room Goa with balcony',
  ],
  alternates: { canonical: '/rooms/couple-duo-executive' },
  openGraph: {
    title: 'Executive Couple Room with Balcony | Hotel Sonar Bangla Goa',
    description: 'King bed, private balcony, swimming pool, AC & Wi-Fi. 100% couple-friendly. 450m from Calangute Beach. From ₹1,800/person/night.',
    url: 'https://www.hotelshonarbangla.in/rooms/couple-duo-executive',
    images: [{ url: 'https://www.hotelshonarbangla.in/rooms/room-blue-headboard.jpg', width: 1200, height: 630, alt: 'Executive Couple Room with Balcony Hotel Sonar Bangla Goa' }],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
