import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Location & Directions | Hotel Sonar Bangla Goa | 450m from Calangute Beach',
  description: 'Hotel Sonar Bangla Goa is located 450m from Calangute Beach on Calangute-Baga Road, North Goa. 1.2km from Baga Beach, 28km from Mopa Airport. Easy access to Fort Aguada & Anjuna Beach.',
  keywords: [
    'Hotel Sonar Bangla location Goa',
    'hotel near Calangute beach address',
    'hotel Calangute Baga road Goa',
    'how to reach Hotel Sonar Bangla',
    'hotel near Mopa airport Goa',
    'hotel directions Calangute North Goa',
  ],
  alternates: { canonical: '/location' },
  openGraph: {
    title: 'Location | Hotel Sonar Bangla Goa | 450m from Calangute Beach',
    description: '450m from Calangute Beach, 1.2km from Baga Beach. On Calangute-Baga Road, North Goa 403516. 28km from Mopa Airport.',
    url: 'https://www.hotelshonarbangla.in/location',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
