'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Refrigerator,
  Sparkles,
  MessageCircle,
  Eye,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { INITIAL_ROOMS } from '@/data/hotelData';
import { Room } from '@/types/hotel';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function RoomsSection() {
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind className="w-3.5 h-3.5 text-sky-600" />;
      case 'Wifi':
        return <Wifi className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Flame':
        return <Flame className="w-3.5 h-3.5 text-amber-600" />;
      case 'Tv':
        return <Tv className="w-3.5 h-3.5 text-stone-600" />;
      case 'Coffee':
        return <Coffee className="w-3.5 h-3.5 text-amber-700" />;
      case 'Sun':
        return <Sun className="w-3.5 h-3.5 text-yellow-500" />;
      case 'Users':
        return <Users className="w-3.5 h-3.5 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Refrigerator':
        return <Refrigerator className="w-3.5 h-3.5 text-cyan-600" />;
      default:
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  const openRoomModal = (room: Room) => {
    setSelectedRoomForModal(room);
    setActiveImageIndex(0);
  };

  return (
    <section id="rooms" className="py-16 sm:py-24 bg-[#FDFBF7] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-amber-100/70 text-amber-900 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Curated Stays in Goa
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight mb-3">
            Rooms &amp; Stay Sanctuaries
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
            Designed for intimate couple retreats, celebratory honeymoons, and relaxed family holidays.
            Direct reservations receive our best rate guarantee, zero hidden taxes, and priority check-in.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12">
          {INITIAL_ROOMS.map((room) => {
            const whatsAppUrl = buildWhatsAppUrl({
              roomName: room.name,
              source: `room_card_${room.id}`,
            });
            const detailUrl = `/rooms/${room.id}`;

            return (
              <div
                key={room.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Room Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                    {room.highlightBadge && (
                      <span className="bg-stone-900 text-amber-400 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full tracking-wider uppercase border border-stone-800">
                        {room.highlightBadge}
                      </span>
                    )}
                    <span className="bg-white/95 text-stone-900 text-xs font-medium px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                      <Sun className="w-3 h-3 text-amber-600" />
                      {room.view}
                    </span>
                  </div>

                  {/* Photo Counter & Preview Trigger */}
                  <button
                    onClick={() => openRoomModal(room)}
                    className="absolute bottom-4 right-4 z-10 bg-black/75 hover:bg-black text-white text-xs font-medium px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View {room.images.length} Photos</span>
                  </button>
                </div>

                {/* Room Card Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Header: Title & Pricing */}
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <Link href={detailUrl} className="hover:text-amber-800 transition-colors">
                        <h3 className="font-serif text-2xl font-semibold text-stone-900">
                          {room.name}
                        </h3>
                      </Link>
                      <div>
                        <span className="text-xs text-stone-400 line-through mr-1.5 font-medium">
                          ₹{room.originalPrice}
                        </span>
                        <span className="font-serif text-2xl font-bold text-amber-900">
                          ₹{room.price}
                        </span>
                        <span className="text-xs text-stone-600 font-normal"> / night</span>
                      </div>
                    </div>

                    <p className="text-stone-700 text-xs sm:text-sm font-normal mb-4">
                      {room.tagline}
                    </p>

                    {/* Quick Specs Pill Row */}
                    <div className="flex flex-wrap items-center gap-3 py-2.5 px-3 bg-[#FBF9F5] rounded-xl border border-stone-200/60 mb-5 text-xs text-stone-800 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-stone-600" />
                        <span>{room.capacity}</span>
                      </div>
                      <span className="text-stone-300">·</span>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-stone-600" />
                        <span>{room.bedType}</span>
                      </div>
                      <span className="text-stone-300">·</span>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-stone-600" />
                        <span>{room.size}</span>
                      </div>
                    </div>

                    {/* Special Add-On Tag / Highlight */}
                    {room.specialAddon && (
                      <div className="mb-5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-950 font-normal">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-amber-900">Curated Add-on:</strong> {room.specialAddon}
                        </span>
                      </div>
                    )}

                    {/* Amenity Chips */}
                    <div className="mb-6">
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 block mb-2 font-semibold">
                        Included Room Amenities
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((amenity) => (
                          <span
                            key={amenity.label}
                            className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-800 text-xs px-3 py-1.5 rounded-full border border-stone-200 font-medium"
                          >
                            {getAmenityIcon(amenity.icon)}
                            <span>{amenity.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions: Dual Inquiry Triggers */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => openRoomModal(room)}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#FAFAFA] hover:bg-stone-100 text-[#0F2C59] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl border border-stone-200 transition-colors text-center cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#0F2C59]" />
                      <span>View Room &amp; Photos</span>
                    </button>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition-transform active:scale-98 text-center"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-[#FF6B6B]" />
                      <span className="truncate">Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Stays CTA */}
        <div className="text-center">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-[#0F2C59] hover:bg-[#0c2347] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-xs transition-all"
          >
            <span>Compare All Rooms &amp; View Full Specifications</span>
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
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeImageIndex ? 'border-amber-600 scale-105' : 'border-transparent opacity-70'
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
                  <span className="font-serif text-2xl font-bold text-amber-900">
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
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
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
