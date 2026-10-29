'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import RoomsSection from '@/components/RoomsSection';
import GoaMomentsGallery from '@/components/GoaMomentsGallery';
import ReviewsSection from '@/components/ReviewsSection';
import LocationNearby from '@/components/LocationNearby';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import {
  Heart,
  Utensils,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  CalendarCheck,
  MessageCircle,
} from 'lucide-react';
import { GalleryPhoto } from '@/types/hotel';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function Home() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [customPhotos, setCustomPhotos] = useState<GalleryPhoto[]>([]);

  const handlePhotoUploaded = (newPhoto: GalleryPhoto) => {
    setCustomPhotos((prev) => [newPhoto, ...prev]);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* 1. Header & Navigation (Mobile-First) */}
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* 2. Hero Section & Quick Inquiry Bar */}
      <Hero />

      {/* 3. Trust & Feature Highlights Grid (5 Key Icons) */}
      <section className="py-8 sm:py-10 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FAFAFA] border border-stone-200 hover:border-[#0F2C59]/30 transition-all">
              <span className="text-2xl sm:text-3xl mb-2">👩‍❤️‍👨</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#0F2C59] mb-1">100% Couple Friendly</h3>
              <p className="text-[11px] text-stone-600 font-normal">Discreet, safe &amp; welcoming with valid ID</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FAFAFA] border border-stone-200 hover:border-[#0F2C59]/30 transition-all">
              <span className="text-2xl sm:text-3xl mb-2">🏖️</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#0F2C59] mb-1">5 Mins to Beach</h3>
              <p className="text-[11px] text-stone-600 font-normal">450m stroll to Calangute golden sands</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FAFAFA] border border-stone-200 hover:border-[#0F2C59]/30 transition-all">
              <span className="text-2xl sm:text-3xl mb-2">🌺</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#0F2C59] mb-1">Honeymoon Decor On-Request</h3>
              <p className="text-[11px] text-stone-600 font-normal">Fresh rose bed art &amp; candlelight</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FAFAFA] border border-stone-200 hover:border-[#0F2C59]/30 transition-all">
              <span className="text-2xl sm:text-3xl mb-2">📶</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#0F2C59] mb-1">Free High-Speed Wi-Fi</h3>
              <p className="text-[11px] text-stone-600 font-normal">Fast, seamless connectivity in every room</p>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center p-4 rounded-2xl bg-[#FAFAFA] border border-stone-200 hover:border-[#0F2C59]/30 transition-all">
              <span className="text-2xl sm:text-3xl mb-2">🧹</span>
              <h3 className="font-bold text-xs sm:text-sm text-[#0F2C59] mb-1">Daily Housekeeping &amp; Hygiene</h3>
              <p className="text-[11px] text-stone-600 font-normal">Sanitized linens &amp; 24/7 hot water</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Story & Coastal Heritage Feature */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[#0F2C59] text-xs uppercase tracking-wider font-bold">
                The Heritage of Sonar Bangla
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F2C59] leading-tight">
                Authentic Bengali Hospitality, Whispering Palms &amp; Golden Sands
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                Hotel Sonar Bangla Goa was born from a singular passion: bringing the heartfelt warmth, culinary soul, and attentive care of traditional Bengal to the sun-drenched shores of North Goa.
              </p>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                Tucked quietly away just 450 meters from Calangute Beach, our sanctuary offers serene couple privacy, customized romantic celebrations, and nourishing home-style cooking for multi-generational families.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 bg-[#0F2C59] hover:bg-[#0c2347] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all"
                >
                  <span>Explore Rooms &amp; Suites</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C]" />
                </Link>
                <Link
                  href="/dining"
                  className="inline-flex items-center gap-2 bg-[#FAFAFA] hover:bg-stone-100 text-[#0F2C59] font-bold text-xs sm:text-sm px-5 py-3 rounded-full border border-stone-200 transition-all"
                >
                  <Utensils className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Bengali Dining Menu</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-stone-100 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                  alt="Couple Balcony Suite"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-[#0F2C59]/85 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-md font-semibold">
                  Executive Duo Room
                </span>
              </div>
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-stone-100 shadow-sm mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Romantic Honeymoon Bed Setup"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-[#0F2C59]/85 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-md font-semibold">
                  Honeymoon Bed Art
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Room & Stay Showcase (Inquiry-Driven) */}
      <RoomsSection />

      {/* 5. Honeymoon & Romantic Celebration Teaser Banner (Luxury Blue #0F2C59) */}
      <section className="py-14 bg-[#0F2C59] text-white border-y border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#E5A93C] text-xs uppercase tracking-wider font-bold">
              <Heart className="w-4 h-4 fill-[#FF6B6B] text-[#FF6B6B]" />
              <span>Honeymoon &amp; Anniversary Special</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              Surprise Your Partner with Fresh Floral Bed Art &amp; Candlelight
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 font-normal max-w-2xl leading-relaxed">
              Arriving in Goa for a romantic escape? Our hospitality team curates fresh rose petal bed calligraphy, heart motifs, fairy light canopies, and celebratory cakes on demand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/honeymoon-special"
              className="bg-white hover:bg-stone-100 text-[#0F2C59] font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-xs transition-all"
            >
              Explore Romantic Packages
            </Link>
            <a
              href={buildWhatsAppUrl({
                specialRequest: 'Inquiring about romantic bed decor setups for upcoming couple trip',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-transform active:scale-98 flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#FF6B6B]" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. "Goa Moments" Dynamic Gallery & Experience Hub */}
      <GoaMomentsGallery
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
        externalPhotos={customPhotos}
      />

      {/* 7. Live Google Reviews & Social Proof */}
      <ReviewsSection />

      {/* 8. Location, Nearby Attractions & FAQ Powerhouse */}
      <LocationNearby />

      {/* 9. Footer */}
      <Footer
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
      />

      {/* Fixed Sticky Mobile Bottom Bar */}
      <StickyMobileBar />

      {/* Modals */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

      <StaffAdminModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onPhotoUploaded={handlePhotoUploaded}
      />
    </main>
  );
}
