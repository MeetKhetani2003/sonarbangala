import { FAQS } from '@/data/hotelData';
import { HOTEL_ADDRESS, HOTEL_PHONE, HOTEL_EMAIL } from '@/lib/whatsapp';

export default function JsonLd() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Hotel', 'LodgingBusiness', 'LocalBusiness'],
        '@id': 'https://hotelsonarbanglagoa.com/#hotel',
        name: 'Hotel Sonar Bangla Goa',
        alternateName: 'Sonar Bangla Hotel Goa',
        description:
          'Ranked top couple-friendly and family boutique stay near Calangute and Baga Beach in North Goa. Enjoy romantic honeymoon bed decorations, private balconies, authentic Bengali food, and direct WhatsApp concierge booking at lowest guaranteed rates.',
        url: 'https://hotelsonarbanglagoa.com',
        telephone: HOTEL_PHONE,
        email: HOTEL_EMAIL,
        priceRange: '₹₹ (₹2,499 - ₹4,999)',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Credit Card, Bank Transfer',
        image: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: HOTEL_ADDRESS,
          addressLocality: 'Calangute',
          addressRegion: 'Goa',
          postalCode: '403516',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 15.5435,
          longitude: 73.7554,
        },
        hasMap: 'https://maps.google.com/?q=Hotel+Sonar+Bangla+Calangute+Goa',
        checkinTime: '12:00:00',
        checkoutTime: '10:30:00',
        petsAllowed: false,
        starRating: {
          '@type': 'Rating',
          ratingValue: '4.8',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.85',
          reviewCount: '128',
          bestRating: '5',
          worstRating: '1',
        },
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Inverter Air Conditioning', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Free High Speed Wi-Fi', value: true },
          { '@type': 'LocationFeatureSpecification', name: '24/7 Hot Geyser Water', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Smart LED TV', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Couple Friendly', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Private Balcony', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Honeymoon Bed Decoration', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Authentic Bengali Cuisine', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Scooter & Bike Rental Desk', value: true },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://hotelsonarbanglagoa.com/#faq',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

