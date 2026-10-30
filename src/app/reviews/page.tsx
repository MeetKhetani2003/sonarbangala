'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import ReviewsSection from '@/components/ReviewsSection';
import PageHeaderBanner from '@/components/PageHeaderBanner';
import {
  Star,
  ChevronRight,
  ShieldCheck,
  Award,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { GOOGLE_MAPS_LINK, buildWhatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function ReviewsPage() {
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
        breadcrumbLabel="Google Reviews & Social Proof"
        badgeText="★ 4.5+ Rating on Google Maps (Verified Reviews)"
        badgeIcon={<Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />}
        title="Words of Warmth from Our Guests"
        subtitle="Read candid memories and feedback shared by honeymoon couples, holidaying families, and travelers from Kolkata, Mumbai, Delhi, and beyond."
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85"
        highlights={[
          { icon: <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />, label: '4.5 / 5.0 Google Rating' },
          { icon: <Award className="w-3.5 h-3.5 text-[#E5A93C]" />, label: '128+ Verified Reviews' },
          { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, label: '100% Couple Friendly Verified' },
        ]}
        actions={
          <>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform active:scale-98"
            >
              <span>Read All Google Reviews</span>
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
            <a
              href={buildWhatsAppUrl({
                specialRequest: 'Sharing feedback or inquiring about guest experience',
                source: 'reviews_hero',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-lg transition-transform active:scale-98"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Share Experience on WhatsApp</span>
            </a>
          </>
        }
      />

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

