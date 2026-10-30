'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import {
  Users,
  Bed,
  Maximize2,
  Wind,
  Wifi,
  Flame,
  Tv,
  Coffee,
  Sun,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Phone,
  CheckCircle2,
  ChevronRight,
  Clock,
  Heart,
  ChevronLeft,
} from 'lucide-react';
import { INITIAL_ROOMS } from '@/data/hotelData';
import { buildWhatsAppUrl, buildCallUrl, HOTEL_PHONE_DISPLAY } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function HoneymoonJacuzziSuitePage() {
  const room = INITIAL_ROOMS.find((r) => r.id === 'honeymoon-jacuzzi-suite') || INITIAL_ROOMS[0];
  const [activeImage, setActiveImage] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const whatsAppInquiryUrl = buildWhatsAppUrl({
    roomName: room.name,
    source: 'honeymoon_jacuzzi_pdp',
    specialRequest: 'Inquiring about Signature Honeymoon Jacuzzi Suite and complimentary bed decoration',
  });

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-stone-200 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/rooms" className="hover:text-amber-800 transition-colors">Rooms &amp; Suites</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-amber-900 font-semibold">{room.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        {/* Main Grid: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left: Gallery Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden bg-stone-900 shadow-md">
              <Image
                src={room.images[activeImage]}
                alt={`${room.name} photo ${activeImage + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-[#0F2C59]/95 text-[#E5A93C] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-[#E5A93C]/30 shadow-md">
                  {room.highlightBadge}
                </span>
                <span className="bg-white/95 text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
                  {room.view}
                </span>
              </div>

              {room.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) => (prev === 0 ? room.images.length - 1 : prev - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev + 1) % room.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-md">
                {activeImage + 1} / {room.images.length} Photos
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-6 gap-2">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === idx
                      ? 'border-[#0F2C59] ring-2 ring-[#0F2C59]/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="thumbnail" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Booking & Inquiry Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#0F2C59] uppercase tracking-wider block mb-1">
                  Luxury Suite Showcase
                </span>
                <h1 className="font-serif text-3xl font-semibold text-stone-900 leading-tight">
                  {room.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 font-normal mt-1 leading-relaxed">
                  {room.tagline}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium block">Direct WhatsApp Rate:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-stone-400 line-through">₹{room.originalPrice}</span>
                    <span className="font-serif text-3xl font-bold text-[#0F2C59]">₹{room.price}</span>
                    <span className="text-xs text-stone-600 font-medium">/ night</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    Best Rate Guaranteed
                  </span>
                  <span className="block text-[10px] text-stone-500 mt-1">Zero OTA Commissions</span>
                </div>
              </div>

              {/* Special Add-On Highlight */}
              {room.specialAddon && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-amber-900">Celebration Setup Included:</strong>
                    <p className="mt-0.5 text-stone-700 font-normal">{room.specialAddon}</p>
                  </div>
                </div>
              )}

              {/* Direct Inquiry CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsAppInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-98 text-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Inquire Suite on WhatsApp</span>
                </a>

                <a
                  href={buildCallUrl()}
                  className="w-full flex items-center justify-center gap-2 bg-[#FAFAFA] hover:bg-stone-100 text-[#0F2C59] font-bold py-3 px-4 rounded-xl border border-stone-200 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-[#E5A93C]" />
                  <span>Call Reception ({HOTEL_PHONE_DISPLAY})</span>
                </a>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-stone-100 text-center text-xs">
                <div>
                  <Users className="w-4 h-4 text-[#0F2C59] mx-auto mb-1" />
                  <span className="font-medium text-stone-800">{room.capacity}</span>
                </div>
                <div className="border-x border-stone-200">
                  <Bed className="w-4 h-4 text-[#0F2C59] mx-auto mb-1" />
                  <span className="font-medium text-stone-800">{room.bedType}</span>
                </div>
                <div>
                  <Maximize2 className="w-4 h-4 text-[#0F2C59] mx-auto mb-1" />
                  <span className="font-medium text-stone-800">{room.size}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />
      <StickyMobileBar />
      <InquiryModal isOpen={isInquiryModalOpen} onClose={() => setIsInquiryModalOpen(false)} />
      <StaffAdminModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onPhotoUploaded={() => {}}
      />
    </main>
  );
}

