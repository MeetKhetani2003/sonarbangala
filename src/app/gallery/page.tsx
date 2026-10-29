'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import GoaMomentsGallery from '@/components/GoaMomentsGallery';
import { Sparkles, ChevronRight, Camera } from 'lucide-react';
import { GalleryPhoto } from '@/types/hotel';

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

      {/* Page Banner (Luxury Blue #0F2C59) */}
      <section className="relative bg-[#0F2C59] text-white py-16 sm:py-24 overflow-hidden border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-stone-300 mb-4 font-medium">
            <Link href="/" className="hover:text-[#E5A93C] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#E5A93C]">Goa Moments &amp; Gallery</span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] bg-[#0A1E3D] border border-blue-800 px-3 py-1 rounded-full font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Daily Updated by Hotel Staff
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            &ldquo;Goa Moments&rdquo; &amp; Daily Gallery
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-200 font-normal leading-relaxed mb-6">
            Explore authentic daily snapshots of romantic candlelight bed decorations, joyful family moments, coastal seafood dinners, and sunny beach mornings.
          </p>

          <button
            onClick={() => setIsStaffModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#0A1E3D] hover:bg-[#0c2347] text-[#E5A93C] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-blue-800 shadow-xs cursor-pointer transition-all"
          >
            <Camera className="w-4 h-4 text-[#E5A93C]" />
            <span>Staff 1-Click Photo Upload</span>
          </button>
        </div>
      </section>

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

