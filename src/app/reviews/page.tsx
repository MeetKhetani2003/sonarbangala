'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import ReviewsSection from '@/components/ReviewsSection';
import {
  Star,
  ChevronRight,
  ShieldCheck,
  Award,
  ExternalLink,
} from 'lucide-react';
import { GOOGLE_MAPS_LINK } from '@/lib/whatsapp';

export default function ReviewsPage() {
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
            <span className="text-[#E5A93C]">Google Reviews &amp; Social Proof</span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] bg-[#0A1E3D] border border-blue-800 px-3 py-1 rounded-full font-bold mb-3">
            <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
            ★ 4.5+ Rating on Google Maps (Verified Reviews)
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Words of Warmth from Our Guests
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-200 font-normal leading-relaxed mb-6">
            Read candid memories and feedback shared by honeymoon couples, holidaying families, and travelers from Kolkata, Mumbai, Delhi, and beyond.
          </p>

          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0A1E3D] hover:bg-[#0c2347] text-[#E5A93C] text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full border border-blue-800 transition-all"
          >
            <span>Read All Google Maps Verified Reviews</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Main Reviews Hub */}
      <div className="flex-1">
        <ReviewsSection />
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

