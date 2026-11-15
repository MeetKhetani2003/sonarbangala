import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Hotel Sonar Bangla Goa | WhatsApp +91 90640 22151',
  description: 'Contact Hotel Sonar Bangla Goa for bookings, inquiries & reservations. WhatsApp: +91 90640 22151. Located on Calangute-Baga Road, North Goa 403516. Direct booking = lowest rates guaranteed.',
  keywords: [
    'Hotel Sonar Bangla Goa contact number',
    'hotel Calangute Goa phone',
    'book hotel Goa WhatsApp',
    'hotel reservations Calangute North Goa',
    'hotel Sonar Bangla WhatsApp booking',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Hotel Sonar Bangla Goa | WhatsApp Booking',
    description: 'Contact us on WhatsApp +91 90640 22151 for direct booking, lowest rates & priority room. Calangute-Baga Road, North Goa.',
    url: 'https://www.hotelshonarbangla.in/contact',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
