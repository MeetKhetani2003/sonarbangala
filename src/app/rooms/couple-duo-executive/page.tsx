'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

export default function CoupleRoomDetailPage() {
  const room = INITIAL_ROOMS[0]; // Couple / Duo Executive Room
  const [activeImage, setActiveImage] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const whatsAppInquiryUrl = buildWhatsAppUrl({
    roomName: room.name,
    source: 'couple_room_pdp',
    specialRequest: 'Please include Honeymoon / Romantic Candlelight Bed Decoration details',
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

      {/* Main PDP Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                100% Couple Friendly
              </span>
              <span className="bg-rose-50 text-rose-800 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-rose-200/60">
                Romantic Bed Art Available
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight">
              {room.name}
            </h1>
            <p className="text-stone-600 text-sm sm:text-base font-normal mt-1">
              {room.tagline} · Calangute Beach 5-Min Stroll
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="flex items-baseline md:justify-end gap-2">
              <span className="text-xs text-stone-400 line-through">₹{room.originalPrice}</span>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-900">
                ₹{room.price}
              </span>
              <span className="text-xs text-stone-500 font-medium"> / night</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">
              ✓ Direct WhatsApp Rate (Zero OTA Tax Markups)
            </span>
          </div>
        </div>

        {/* Gallery Bento / Carousel (Mobbin Benchmark) */}
        <div className="relative aspect-16/10 sm:aspect-21/9 w-full rounded-3xl overflow-hidden bg-stone-900 shadow-md mb-8">
          <Image
            src={room.images[activeImage]}
            alt={room.name}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />

          {/* Carousel Arrows */}
          <button
            onClick={() => setActiveImage((prev) => (prev === 0 ? room.images.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveImage((prev) => (prev + 1) % room.images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Photo Counter Pill */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md font-medium">
            {activeImage + 1} / {room.images.length} Photos
          </div>
        </div>

        {/* Thumbnails Row */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {room.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                idx === activeImage ? 'border-amber-700 scale-102' : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="thumbnail" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>

        {/* Two-Column PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Room Narrative & Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <Users className="w-5 h-5 text-amber-700 mb-1" />
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-medium">Guests</span>
                <span className="text-xs sm:text-sm font-medium text-stone-900">{room.capacity}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <Bed className="w-5 h-5 text-amber-700 mb-1" />
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-medium">Bedding</span>
                <span className="text-xs sm:text-sm font-medium text-stone-900">{room.bedType}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <Maximize2 className="w-5 h-5 text-amber-700 mb-1" />
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-medium">Room Size</span>
                <span className="text-xs sm:text-sm font-medium text-stone-900">{room.size}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <Sun className="w-5 h-5 text-amber-700 mb-1" />
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-medium">View</span>
                <span className="text-xs sm:text-sm font-medium text-stone-900">Private Balcony</span>
              </div>
            </div>

            {/* Room Narrative */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200">
              <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-3">
                Experience the Ambiance
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal mb-4">
                {room.description}
              </p>
              <p className="text-sm text-stone-700 leading-relaxed font-normal">
                Wake up to tropical morning sunlight filtering through sheer curtains, step onto your private balcony for warm tea, and take a quick 5-minute barefoot stroll to Calangute Beach. In the evening, the room transforms into an intimate candlelit haven.
              </p>
            </div>

            {/* Special Honeymoon Bed Decoration Feature Callout */}
            <div className="bg-rose-50/80 p-6 sm:p-8 rounded-3xl border border-rose-200/80">
              <div className="flex items-center gap-2 text-rose-900 text-xs font-semibold mb-2 uppercase tracking-wider">
                <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                Curated Romantic Bed Art Experience
              </div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
                Honeymoon &amp; Anniversary Bed Decoration on Request
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-normal leading-relaxed mb-4">
                Surprise your partner with fresh red rose petal bed calligraphy, heart motifs, warm aromatic tealight lamps, celebratory balloons, and custom greeting messages prepared meticulously by our hospitality team.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={buildWhatsAppUrl({
                    roomName: room.name,
                    specialRequest: 'Inquiring about Romantic Honeymoon Bed Decoration setup & photos',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-semibold px-4 py-2.5 rounded-full shadow-xs transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Request Bed Decor Setup via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Included Amenities Grid */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200">
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-4">
                All Included Room Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                {room.amenities.map((a) => (
                  <div key={a.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Check-in Policies */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200">
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-4">
                Stay Policies &amp; Couple Privacy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700 font-normal">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 font-semibold block">Check-in / Check-out:</strong>
                    Check-in: 12:00 PM | Check-out: 10:30 AM (Priority early check-in available on direct bookings).
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 font-semibold block">100% Couple Friendly:</strong>
                    Welcoming married &amp; unmarried couples (18+) with standard government photo ID (Aadhaar, Passport, DL).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget (Desktop) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-md">
              <div className="flex items-baseline justify-between mb-4 border-b border-stone-100 pb-3">
                <div>
                  <span className="text-xs text-stone-400 line-through">₹{room.originalPrice}</span>
                  <span className="font-serif text-3xl font-bold text-amber-900 block">
                    ₹{room.price}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">per night</span>
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
                  Direct Rate
                </span>
              </div>

              <div className="space-y-3 mb-6 text-xs text-stone-700 font-normal">
                <div className="flex items-center justify-between">
                  <span>Room Category:</span>
                  <strong className="font-semibold text-stone-800">Couple / Duo Executive</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Occupancy:</span>
                  <strong className="font-semibold text-stone-800">2 Adults</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Honeymoon Decor:</span>
                  <strong className="font-semibold text-rose-700">Available on Request</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Beach Distance:</span>
                  <strong className="font-semibold text-stone-800">5 Mins Walk (450m)</strong>
                </div>
              </div>

              <a
                href={whatsAppInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-transform active:scale-98 text-sm mb-3"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={buildCallUrl()}
                className="w-full flex items-center justify-center gap-2 bg-[#FAFAFA] hover:bg-stone-100 text-[#0F2C59] font-bold py-2.5 px-4 rounded-xl border border-stone-200 transition-colors text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#0F2C59]" />
                <span>Call Concierge: {HOTEL_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobbin Sticky Bottom Mobile PDP Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 shadow-xl flex items-center justify-between pb-[calc(0.65rem+env(safe-area-inset-bottom))]">
        <div>
          <span className="font-serif text-xl font-bold text-[#0F2C59] block leading-tight">
            ₹{room.price}
          </span>
          <span className="text-[10px] text-stone-600 font-medium">/ night · Direct Rate</span>
        </div>

        <a
          href={whatsAppInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#25D366] text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-md active:scale-95 transition-all"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
          <span>Inquire on WhatsApp</span>
        </a>
      </div>

      <Footer
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

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

