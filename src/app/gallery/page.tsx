'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import GoaMomentsGallery from '@/components/GoaMomentsGallery';
import PageHeaderBanner from '@/components/PageHeaderBanner';
import { Sparkles, ChevronRight, Camera, Heart, MessageCircle, MapPin } from 'lucide-react';
import { GalleryPhoto } from '@/types/hotel';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function GalleryPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [customPhotos, setCustomPhotos] = useState<GalleryPhoto[]>([]);

  const handlePhotoUploaded = (newPhoto: GalleryPhoto) => {
    setCustomPhotos((prev) => [newPhoto, ...prev]);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* Atmospheric Page Hero Banner */}
      <PageHeaderBanner
        breadcrumbLabel="Goa Moments & Gallery"
        badgeText="Daily Updated by Hotel Staff"
        title="&ldquo;Goa Moments&rdquo; & Daily Gallery"
        subtitle="Explore authentic daily snapshots of romantic candlelight bed decorations, joyful family moments, coastal seafood dinners, and sunny beach mornings."
        backgroundImage="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85"
        highlights={[
          { icon: <Camera className="w-3.5 h-3.5 text-[#E5A93C]" />, label: 'Daily Real Photo Updates' },
          { icon: <Heart className="w-3.5 h-3.5 text-[#FF6B6B] fill-[#FF6B6B]" />, label: 'Honeymoon & Anniversary Setups' },
          { icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" />, label: 'Calangute Beach 450m' },
        ]}
        actions={
          <>
            <button
              onClick={() => setIsStaffModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform active:scale-98 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-white" />
              <span>Staff 1-Click Upload</span>
            </button>
            <a
              href={buildWhatsAppUrl({
                specialRequest: 'Want to inquire about replicating one of the bed decoration setups from the gallery',
                source: 'gallery_hero',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-lg transition-transform active:scale-98 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Request Similar Setup</span>
            </a>
          </>
        }
      />

      {/* Gallery Section */}
      <div className="flex-1">
        <GoaMomentsGallery
          onOpenStaffModal={() => setIsStaffModalOpen(true)}
          externalPhotos={customPhotos}
        />
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
        onPhotoUploaded={handlePhotoUploaded}
      />
    </main>
  );
}

