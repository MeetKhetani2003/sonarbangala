export interface Room {
  id: string;
  name: string;
  tagline: string;
  category: 'couple' | 'family';
  price: number;
  originalPrice: number;
  capacity: string;
  bedType: string;
  size: string;
  view: string;
  images: string[];
  features: string[];
  amenities: { icon: string; label: string }[];
  highlightBadge?: string;
  specialAddon?: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  tag: 'Honeymoon & Event Decor' | 'Daily Guest Moments' | 'Room Views' | 'Goa Vibe';
  date: string;
  uploadedByStaff?: boolean;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  relativeTime: string;
  stayContext: string;
  travelerType: 'Couple' | 'Family' | 'Friends' | 'Solo';
  comment: string;
  helpfulCount: number;
  hotelResponse?: {
    date: string;
    text: string;
  };
}

export interface AttractionProximity {
  id: string;
  name: string;
  category: 'Beach' | 'Nightlife' | 'Transit' | 'Dining' | 'Sightseeing';
  distance: string;
  travelTime: string;
  icon: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Stay Policies' | 'Location & Rentals' | 'Booking & Payments' | 'Amenities';
}

