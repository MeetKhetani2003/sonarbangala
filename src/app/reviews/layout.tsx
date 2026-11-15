import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guest Reviews & Ratings | Hotel Sonar Bangla Goa | 4.8★ Near Calangute Beach',
  description: 'Read verified guest reviews of Hotel Sonar Bangla Goa. 4.8/5 star rating from 128+ guests. Couples, families & honeymooners praise our rooms, pool, Bengali food & WhatsApp service.',
  keywords: [
    'Hotel Sonar Bangla Goa reviews',
    'best hotel Calangute reviews',
    'couple hotel Goa guest reviews',
    'Bengali hotel Goa ratings',
    'hotel near Calangute beach reviews',
  ],
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: 'Guest Reviews | Hotel Sonar Bangla Goa | 4.8★ Rating',
    description: '4.8/5 star rating from 128+ verified guest reviews. Top-rated couple & family hotel near Calangute Beach, Goa.',
    url: 'https://www.hotelshonarbangla.in/reviews',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
