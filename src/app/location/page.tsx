'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import LocationNearby from '@/components/LocationNearby';
import PageHeaderBanner from '@/components/PageHeaderBanner';
import {
  MapPin,
  ChevronRight,
  Bike,
  Waves,
  Sparkles,
  Phone,
  MessageCircle,
  Navigation,
  Car,
} from 'lucide-react';
import { buildWhatsAppUrl, buildCallUrl, HOTEL_PHONE_DISPLAY, GOOGLE_MAPS_LINK } from '@/lib/whatsapp';

export default function LocationPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* Atmospheric Page Hero Banner */}
      <PageHeaderBanner
        breadcrumbLabel="Location & Distance Guide"
        badgeText="North Goa Beach Corridor · 450m to Beach"
        badgeIcon={<MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />}
        title="Location & Goa Distance Guide"
        subtitle="Located just 450 meters (a leisurely 5-minute stroll) from Calangute Beach, on the vibrant corridor connecting Calangute, Baga & Anjuna."
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85"
        highlights={[
          { icon: <Waves className="w-3.5 h-3.5 text-sky-400" />, label: '450m Stroll to Calangute Beach' },
          { icon: <Bike className="w-3.5 h-3.5 text-[#E5A93C]" />, label: 'Scooter & Activa Hub at Gate' },
          { icon: <Car className="w-3.5 h-3.5 text-emerald-400" />, label: 'Airport & Station Pickups' },
        ]}
        actions={
          <>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform active:scale-98"
            >
              <Navigation className="w-4 h-4 fill-white text-[#FF6B6B]" />
              <span>Get Turn-by-Turn GPS Route</span>
            </a>
            <a
              href={buildWhatsAppUrl({
                specialRequest: 'Inquiring about directions and hotel gate pickup assistance',
                source: 'location_hero',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full border border-white/20 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#FF6B6B]" />
              <span>Ask Concierge on WhatsApp</span>
            </a>
          </>
        }
      />

      {/* Scooter & Transport Desk Feature */}
      <section className="py-10 bg-[#FAFAFA] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0F2C59] flex items-center justify-center shrink-0 border border-blue-200">
              <Bike className="w-6 h-6 text-[#0F2C59]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#0F2C59]">
                Verified Scooter &amp; Self-Drive Car Rental Desk
              </h3>
              <p className="text-xs text-stone-700 font-normal">
                Honda Activas, Royal Enfields &amp; Thars delivered directly to the hotel entrance with transparent government rates.
              </p>
            </div>
          </div>

          <a
            href={buildWhatsAppUrl({
              specialRequest: 'Inquiring about scooter / car rental delivery to Hotel Sonar Bangla',
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-transform active:scale-98 flex items-center gap-1.5 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-[#FF6B6B]" />
            <span>Arrange Bike via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Main Location & FAQ Section */}
      <div className="flex-1">
        <LocationNearby />
      </div>

      <Footer
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      <StickyMobileBar />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

      <StaffAdminModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onPhotoUploaded={() => {}}
      />
    </main>
  );
}

