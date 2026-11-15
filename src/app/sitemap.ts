import type { MetadataRoute } from 'next'

const BASE = 'https://www.hotelshonarbangla.in'
const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${BASE}/rooms/hotel-exterior.jpg`,
        `${BASE}/rooms/room-blue-headboard.jpg`,
        `${BASE}/rooms/room-grey-tufted-clean.jpg`,
        `${BASE}/rooms/room-deluxe-tv-sofa.jpg`,
        `${BASE}/rooms/room-balcony-palm.jpg`,
      ],
    },
    {
      url: `${BASE}/rooms`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [
        `${BASE}/rooms/room-blue-headboard.jpg`,
        `${BASE}/rooms/room-grey-sofa-wide.jpg`,
        `${BASE}/rooms/room-deluxe-tv-sofa.jpg`,
        `${BASE}/rooms/room-grey-tufted-clean.jpg`,
        `${BASE}/rooms/room-balcony-palm.jpg`,
        `${BASE}/rooms/hotel-corridor-1.jpg`,
        `${BASE}/rooms/room-bathroom.jpg`,
        `${BASE}/rooms/hotel-exterior.jpg`,
      ],
    },
    {
      url: `${BASE}/rooms/couple-duo-executive`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [
        `${BASE}/rooms/room-blue-headboard.jpg`,
        `${BASE}/rooms/room-balcony-palm.jpg`,
        `${BASE}/rooms/hotel-corridor-1.jpg`,
        `${BASE}/rooms/room-bathroom.jpg`,
      ],
    },
    {
      url: `${BASE}/rooms/family-group-suite`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [
        `${BASE}/rooms/room-grey-sofa-wide.jpg`,
        `${BASE}/rooms/room-grey-tufted-sofa.jpg`,
        `${BASE}/rooms/hotel-corridor-2.jpg`,
        `${BASE}/rooms/room-bathroom.jpg`,
      ],
    },
    {
      url: `${BASE}/rooms/honeymoon-jacuzzi-suite`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [
        `${BASE}/rooms/room-deluxe-tv-sofa.jpg`,
        `${BASE}/rooms/room-balcony-palm.jpg`,
        `${BASE}/rooms/room-grey-tufted-sofa.jpg`,
      ],
    },
    {
      url: `${BASE}/rooms/deluxe-garden-patio`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [
        `${BASE}/rooms/room-grey-tufted-clean.jpg`,
        `${BASE}/rooms/room-grey-tufted-simple.jpg`,
        `${BASE}/rooms/room-grey-tufted-angle.jpg`,
      ],
    },
    {
      url: `${BASE}/honeymoon-special`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/gallery`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [
        `${BASE}/rooms/hotel-exterior.jpg`,
        `${BASE}/rooms/room-blue-headboard.jpg`,
        `${BASE}/rooms/room-grey-tufted-clean.jpg`,
        `${BASE}/rooms/room-balcony-palm.jpg`,
        `${BASE}/rooms/room-bathroom.jpg`,
      ],
    },
    {
      url: `${BASE}/dining`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE}/location`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE}/reviews`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE}/contact`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
