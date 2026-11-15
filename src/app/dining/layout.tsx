import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bengali Dining & Cuisine | Hotel Sonar Bangla Goa | Authentic Home-Style Food',
  description: 'Enjoy authentic Bengali cuisine at Hotel Sonar Bangla Goa. Ilish Macher Jhol, Luchi-Alur Dom, Rui Kalia, Prawn Malai Curry & Goan coastal seafood. Home-style Bengali food in Calangute, Goa.',
  keywords: [
    'Bengali food restaurant Goa',
    'authentic Bengali cuisine Calangute Goa',
    'hotel with Bengali food Goa',
    'Ilish mach Goa restaurant',
    'Bengali hotel dining Goa',
    'home cooked Bengali food Goa',
  ],
  alternates: { canonical: '/dining' },
  openGraph: {
    title: 'Bengali Dining | Hotel Sonar Bangla Goa | Authentic Home-Style Cuisine',
    description: 'Authentic Bengali & Goan seafood at Hotel Sonar Bangla. Ilish, Rui Kalia, Prawn Malai Curry & Luchi-Alur Dom in Calangute, Goa.',
    url: 'https://www.hotelshonarbangla.in/dining',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
