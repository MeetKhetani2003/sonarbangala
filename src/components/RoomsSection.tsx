'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  SlidersHorizontal,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { INITIAL_ROOMS } from '@/data/hotelData';
import { Room } from '@/types/hotel';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import RoomCard from './RoomCard';

export default function RoomsSection() {
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Carousel ref & active state for when rooms > 4
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const isCarouselMode = INITIAL_ROOMS.length > 4;

  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const cardWidth = 480; // approximate width of item
    const index = Math.round(scrollLeft / cardWidth);
    setCarouselIndex(Math.min(index, INITIAL_ROOMS.length - 1));
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons, { passive: true });
      updateScrollButtons();
      return () => el.removeEventListener('scroll', updateScrollButtons);
    }
  }, [isCarouselMode]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const openRoomModal = (room: Room, initialIndex = 0) => {
    setSelectedRoomForModal(room);
    setActiveImageIndex(initialIndex);
  };

  return (
    <section id="rooms" className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Controls Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 text-center sm:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-[#0F2C59]/10 text-[#0F2C59] px-3 py-0.5 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3 h-3 text-[#E5A93C]" />
              <span>Featured Accommodations</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F2C59] tracking-tight mb-2">
              Featured Rooms &amp; Suites
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
              Handpicked couple sanctuaries and spacious family suites just 450m from Calangute Beach.
              Direct inquiries receive our verified best rate guarantee, zero hidden taxes, and priority check-in.
            </p>
          </div>

          {/* Carousel Navigation Controls (Visible when more than 4 rooms or on small screens) */}
          {isCarouselMode && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-stone-500 font-medium hidden sm:inline mr-2">
                {carouselIndex + 1} of {INITIAL_ROOMS.length} Stays
              </span>
              <button
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
                aria-label="Previous room"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'bg-white text-[#0F2C59] border-stone-300 hover:bg-stone-50 shadow-xs'
                    : 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
                aria-label="Next room"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  canScrollRight
                    ? 'bg-[#0F2C59] text-white border-[#0F2C59] hover:bg-[#0c2347] shadow-xs'
                    : 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Display Mode: 
            - When <= 4 rooms: Clean, minimal 2-column grid.
            - When > 4 rooms: Interactive, smooth horizontal snap Carousel!
        */}
        {isCarouselMode ? (
          /* Carousel Layout (> 4 Rooms) */
          <div className="relative mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              ref={carouselRef}
              className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-none"
            >
              {INITIAL_ROOMS.map((room) => (
                <div
                  key={room.id}
                  className="w-[88vw] sm:w-[420px] md:w-[480px] shrink-0 snap-start flex flex-col"
                >
                  <RoomCard
                    room={room}
                    onOpenPhotosModal={(r, idx) => openRoomModal(r, idx)}
                    sourceContext="featured_carousel"
                  />
                </div>
              ))}
            </div>

            {/* Carousel Pagination Progress Indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {INITIAL_ROOMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!carouselRef.current) return;
                    const cardWidth = 480;
                    carouselRef.current.scrollTo({
                      left: i * cardWidth,
                      behavior: 'smooth',
                    });
                  }}
                  aria-label={`Go to room ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === carouselIndex ? 'w-6 bg-[#0F2C59]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* 4 Cards in 1 Row on Desktop, then 2nd Row if more added! */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
            {INITIAL_ROOMS.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onOpenPhotosModal={(r, idx) => openRoomModal(r, idx)}
                sourceContext="home_featured_grid"
              />
            ))}
          </div>
        )}

        {/* Explore All Stays CTA */}
        <div className="text-center pt-2">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-[#0F2C59] hover:bg-[#0c2347] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-xs transition-all"
          >
            <span>Compare All {INITIAL_ROOMS.length} Rooms &amp; View Specifications</span>
            <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
          </Link>
        </div>
      </div>

      {/* Room Photo Gallery Modal */}
      {selectedRoomForModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-300 flex flex-col">
            <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
                  {selectedRoomForModal.name}
                </h3>
                <span className="text-xs text-stone-600 font-medium">
                  {selectedRoomForModal.tagline}
                </span>
              </div>
              <button
                onClick={() => setSelectedRoomForModal(null)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/10 w-full bg-stone-900">
              <Image
                src={selectedRoomForModal.images[activeImageIndex]}
                alt={`${selectedRoomForModal.name} photo ${activeImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />

              {selectedRoomForModal.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? selectedRoomForModal.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        (prev + 1) % selectedRoomForModal.images.length
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-stone-900/75 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-md font-medium">
                {activeImageIndex + 1} / {selectedRoomForModal.images.length}
              </div>
            </div>

            <div className="p-3 bg-stone-100 flex gap-2 overflow-x-auto">
              {selectedRoomForModal.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    idx === activeImageIndex ? 'border-[#0F2C59] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <Image src={img} alt="thumbnail" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-sm text-stone-700 leading-relaxed font-normal">
                {selectedRoomForModal.description}
              </p>

              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-stone-600 font-medium block">Direct Booking Special:</span>
                  <span className="font-serif text-2xl font-bold text-[#0F2C59]">
                    ₹{selectedRoomForModal.price}
                  </span>
                  <span className="text-xs text-stone-500 font-medium"> / night (No extra OTA tax)</span>
                </div>

                <a
                  href={buildWhatsAppUrl({
                    roomName: selectedRoomForModal.name,
                    source: 'room_modal',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md cursor-pointer transition-transform active:scale-98"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Inquire Availability on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
