import { FAQS } from '@/data/hotelData';
import { HOTEL_PHONE, HOTEL_EMAIL } from '@/lib/whatsapp';

const BASE = 'https://www.hotelshonarbangla.in';

export default function JsonLd() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebSite with SearchAction
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        url: BASE,
        name: 'Hotel Sonar Bangla Goa',
        description: 'Official website of Hotel Sonar Bangla Goa — boutique couple & family hotel 450m from Calangute Beach, North Goa.',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
      // 2. Main Hotel / LodgingBusiness / LocalBusiness
      {
        '@type': ['Hotel', 'LodgingBusiness', 'LocalBusiness'],
        '@id': `${BASE}/#hotel`,
        name: 'Hotel Sonar Bangla Goa',
        alternateName: ['Sonar Bangla Hotel Goa', 'Hotel Shonarbangla Goa', 'Hotel Sonarbangla Calangute'],
        description:
          'Top couple-friendly and family boutique hotel near Calangute and Baga Beach in North Goa. Rooms from ₹1,800/person/night with swimming pool, split AC, free Wi-Fi, 24/7 hot water, Smart TV, authentic Bengali food & honeymoon bed decoration.',
        url: BASE,
        telephone: HOTEL_PHONE,
        email: HOTEL_EMAIL,
        priceRange: '₹₹ (₹1,800 – ₹5,000 per person per night)',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Credit Card, Net Banking, Bank Transfer',
        image: [
          `${BASE}/rooms/hotel-exterior.jpg`,
          `${BASE}/rooms/room-blue-headboard.jpg`,
          `${BASE}/rooms/room-grey-tufted-clean.jpg`,
          `${BASE}/rooms/room-deluxe-tv-sofa.jpg`,
          `${BASE}/rooms/room-balcony-palm.jpg`,
          `${BASE}/rooms/room-grey-sofa-wide.jpg`,
        ],
        logo: `${BASE}/images/logo-icon.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calangute - Baga Road, Near Beach',
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
        checkinTime: '12:00',
        checkoutTime: '10:30',
        petsAllowed: false,
        starRating: { '@type': 'Rating', ratingValue: '3' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '128',
          bestRating: '5',
          worstRating: '1',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Split Inverter Air Conditioning', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Free High-Speed Wi-Fi', value: true },
          { '@type': 'LocationFeatureSpecification', name: '24/7 Hot Geyser Water', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Smart LED TV', value: true },
          { '@type': 'LocationFeatureSpecification', name: '100% Couple Friendly', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Private Balcony', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Honeymoon Bed Decoration', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Authentic Bengali Cuisine', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Scooter & Bike Rental Desk', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Airport Transfer Assistance', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'WhatsApp Concierge', value: true },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Hotel Room Types',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Executive Duo Couple Room',
              description: 'King bed, private balcony, pool access, AC, Wi-Fi, hot water. 100% couple-friendly.',
              price: '1800',
              priceCurrency: 'INR',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: '1800', priceCurrency: 'INR', unitText: 'per person per night' },
              url: `${BASE}/rooms/couple-duo-executive`,
              availability: 'https://schema.org/InStock',
            },
            {
              '@type': 'Offer',
              name: 'Family Luxury Suite',
              description: '2 king beds for 4-6 guests, dual AC, pool, Wi-Fi, Bengali food.',
              price: '2200',
              priceCurrency: 'INR',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: '2200', priceCurrency: 'INR', unitText: 'per person per night' },
              url: `${BASE}/rooms/family-group-suite`,
              availability: 'https://schema.org/InStock',
            },
            {
              '@type': 'Offer',
              name: 'Signature Honeymoon Suite',
              description: 'Rose petal decor, candlelight, sunset balcony, pool view. For romantic couples.',
              price: '2500',
              priceCurrency: 'INR',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: '2500', priceCurrency: 'INR', unitText: 'per person per night' },
              url: `${BASE}/rooms/honeymoon-jacuzzi-suite`,
              availability: 'https://schema.org/InStock',
            },
            {
              '@type': 'Offer',
              name: 'Deluxe Garden Patio Room',
              description: 'Ground-floor garden room, king bed, pool access, AC, Wi-Fi. Best value.',
              price: '1800',
              priceCurrency: 'INR',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: '1800', priceCurrency: 'INR', unitText: 'per person per night' },
              url: `${BASE}/rooms/deluxe-garden-patio`,
              availability: 'https://schema.org/InStock',
            },
          ],
        },
        sameAs: [
          'https://www.google.com/maps?q=Hotel+Sonar+Bangla+Calangute+Goa',
        ],
      },
      // 3. FAQPage
      {
        '@type': 'FAQPage',
        '@id': `${BASE}/#faq`,
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      // 4. BreadcrumbList for key pages
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Rooms & Suites', item: `${BASE}/rooms` },
          { '@type': 'ListItem', position: 3, name: 'Honeymoon Special', item: `${BASE}/honeymoon-special` },
          { '@type': 'ListItem', position: 4, name: 'Dining', item: `${BASE}/dining` },
          { '@type': 'ListItem', position: 5, name: 'Gallery', item: `${BASE}/gallery` },
          { '@type': 'ListItem', position: 6, name: 'Location', item: `${BASE}/location` },
          { '@type': 'ListItem', position: 7, name: 'Reviews', item: `${BASE}/reviews` },
          { '@type': 'ListItem', position: 8, name: 'Contact', item: `${BASE}/contact` },
        ],
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
