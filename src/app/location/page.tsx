'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import LocationNearby from '@/components/LocationNearby';
import {
  MapPin,
  ChevronRight,
  Bike,
  Waves,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { buildWhatsAppUrl, buildCallUrl, HOTEL_PHONE_DISPLAY } from '@/lib/whatsapp';

export default function LocationPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* Banner (Luxury Blue #0F2C59) */}
      <section className="relative bg-[#0F2C59] text-white py-16 sm:py-24 overflow-hidden border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-stone-300 mb-4 font-medium">
            <Link href="/" className="hover:text-[#E5A93C] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#E5A93C]">Location &amp; Distance Guide</span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] bg-[#0A1E3D] border border-blue-800 px-3 py-1 rounded-full font-bold mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
            North Goa Beach Corridor · 450m to Calangute Beach
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Location &amp; Goa Distance Guide
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-200 font-normal leading-relaxed mb-6">
            Located just 450 meters (a leisurely 5-minute stroll) from Calangute Beach, on the vibrant corridor connecting Calangute, Baga &amp; Anjuna.
          </p>
        </div>
      </section>

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

