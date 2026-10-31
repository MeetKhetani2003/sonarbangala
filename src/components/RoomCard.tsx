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
  Waves,
  Sparkles,
  MessageCircle,
  Eye,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowRight,
  Camera,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { Room } from '@/types/hotel';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface RoomCardProps {
  room: Room;
  onOpenPhotosModal?: (room: Room, initialIndex?: number) => void;
  sourceContext?: string;
}

export default function RoomCard({
  room,
  onOpenPhotosModal,
  sourceContext = 'room_card',
}: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const images = room.images && room.images.length > 0 ? room.images : ['/placeholder.jpg'];
  const detailUrl = `/rooms/${room.id}`;
  const whatsAppUrl = buildWhatsAppUrl({
    roomName: room.name,
    source: `${sourceContext}_${room.id}`,
  });

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleCardImageClick = () => {
    if (onOpenPhotosModal) {
      onOpenPhotosModal(room, currentImageIndex);
    }
  };

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind className="w-3 h-3 text-[#0F2C59]" />;
      case 'Wifi':
        return <Wifi className="w-3 h-3 text-blue-600" />;
      case 'Flame':
        return <Flame className="w-3 h-3 text-[#E5A93C]" />;
      case 'Waves':
        return <Waves className="w-3 h-3 text-sky-600" />;
      case 'Tv':
        return <Tv className="w-3 h-3 text-stone-700" />;
      case 'Coffee':
        return <Coffee className="w-3 h-3 text-amber-800" />;
      case 'Sun':
        return <Sun className="w-3 h-3 text-[#E5A93C]" />;
      case 'Users':
        return <Users className="w-3 h-3 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3 h-3 text-emerald-600" />;
      case 'Refrigerator':
        return <Refrigerator className="w-3 h-3 text-cyan-700" />;
      default:
        return <CheckCircle className="w-3 h-3 text-emerald-600" />;
    }
  };

  const discountAmount = room.originalPrice ? room.originalPrice - room.price : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group h-full">
      {/* 1. Compact, Cinematic Media Header */}
      <div
        onClick={handleCardImageClick}
        className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-900 cursor-pointer select-none"
      >
        <Image
          src={images[currentImageIndex]}
          alt={`${room.name} photo ${currentImageIndex + 1}`}
          fill
          priority={currentImageIndex === 0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-103 transition-transform duration-700"
        />

        {/* Ambient Subtle Vignette */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between gap-1 pointer-events-none">
          {room.highlightBadge && (
            <span className="inline-flex items-center gap-1 bg-[#0F2C59]/95 text-[#E5A93C] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md border border-[#E5A93C]/30 shadow-xs truncate max-w-[150px]">
              <Sparkles className="w-2.5 h-2.5 text-[#E5A93C] shrink-0" />
              <span className="truncate">{room.highlightBadge}</span>
            </span>
          )}

          <div className="flex items-center gap-1 ml-auto pointer-events-auto">
            <span className="bg-black/50 backdrop-blur-md text-stone-100 text-[9px] font-medium px-2 py-0.5 rounded-full border border-white/20 shadow-xs flex items-center gap-1">
              <Sun className="w-2.5 h-2.5 text-[#E5A93C] shrink-0" />
              <span className="truncate max-w-[90px]">{room.view.split('with')[0]}</span>
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              aria-label="Save to favorites"
              className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-black/75 transition-all cursor-pointer shadow-xs"
            >
              <Heart
                className={`w-3 h-3 transition-transform active:scale-125 ${
                  isLiked ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-white'
                }`}
              />
            </button>
          </div>
        </div>

        {/* In-Card Next/Prev Slider Controls */}
        {images.length > 1 && (
          <div className="pointer-events-auto">
            <button
              onClick={handlePrevImage}
              aria-label="Previous photo"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next photo"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bottom Pagination Micro-Dots & Photo Counter */}
        <div className="absolute bottom-1.5 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-0.5 bg-black/45 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/15">
            {images.slice(0, 5).map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === currentImageIndex ? 'w-2.5 bg-[#E5A93C]' : 'w-1 bg-white/50'
                }`}
              />
            ))}
          </div>

          <span className="bg-black/50 backdrop-blur-md text-stone-200 text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-white/15 flex items-center gap-1">
            <Camera className="w-2.5 h-2.5 text-[#E5A93C]" />
            <span>{currentImageIndex + 1}/{images.length}</span>
          </span>
        </div>
      </div>

      {/* 2. Minimalist, Compact Body Formatted for 4-Card Row */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Header Row: Room Title & Pricing */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link href={detailUrl} className="group-hover:text-blue-950 transition-colors">
                <h3 className="font-serif text-base sm:text-lg font-semibold text-[#0F2C59] leading-tight truncate">
                  {room.name}
                </h3>
              </Link>
              <p className="text-stone-600 text-[11px] font-normal truncate mt-0.5">
                {room.tagline}
              </p>
            </div>

            {/* Price Presentation */}
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-1">
                {room.originalPrice && (
                  <span className="text-[10px] text-stone-400 line-through font-medium">
                    ₹{room.originalPrice}
                  </span>
                )}
                <span className="font-serif text-lg font-bold text-[#0F2C59]">
                  ₹{room.price}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">/nt</span>
              </div>
              {discountAmount > 0 && (
                <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block">
                  Save ₹{discountAmount}
                </span>
              )}
            </div>
          </div>

          {/* 3. Sleek 3-Point Specs Ribbon */}
          <div className="flex items-center justify-between gap-1 py-1 px-2 bg-[#FAFAFA] rounded-md border border-stone-200/70 mt-2 text-[10px] text-stone-700 font-medium">
            <div className="flex items-center gap-1 truncate">
              <Users className="w-3 h-3 text-[#0F2C59] shrink-0" />
              <span className="truncate">{room.capacity.split('(')[0]}</span>
            </div>
            <span className="text-stone-300">·</span>
            <div className="flex items-center gap-1 truncate">
              <Bed className="w-3 h-3 text-[#0F2C59] shrink-0" />
              <span className="truncate">{room.bedType.split('+')[0].replace('Plush', '')}</span>
            </div>
            <span className="text-stone-300">·</span>
            <div className="flex items-center gap-1 shrink-0">
              <Maximize2 className="w-3 h-3 text-[#0F2C59]" />
              <span>{room.size}</span>
            </div>
          </div>

          {/* 4. Curated Special Add-On */}
          {room.specialAddon && (
            <div className="mt-2 px-2 py-1 rounded-md bg-[#FFFDF9] border border-[#E5A93C]/40 flex items-center gap-1.5 text-[10px] text-stone-800">
              <Sparkles className="w-3 h-3 text-[#E5A93C] shrink-0" />
              <span className="truncate">
                <strong className="font-semibold text-[#0F2C59]">Special: </strong>
                {room.specialAddon}
              </span>
            </div>
          )}

          {/* 5. Minimalist Amenity Chips (Real Core Facilities) */}
          <div className="mt-2 flex flex-wrap gap-1">
            {room.amenities.slice(0, 5).map((amenity) => (
              <span
                key={amenity.label}
                className="inline-flex items-center gap-1 bg-[#FAFAFA] text-stone-700 text-[9px] px-1.5 py-0.5 rounded border border-stone-200 font-medium"
              >
                {getAmenityIcon(amenity.icon)}
                <span>{amenity.label}</span>
              </span>
            ))}
            {room.amenities.length > 5 && (
              <span className="text-[9px] text-stone-400 font-medium self-center pl-0.5">
                +{room.amenities.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* 6. Dual Action Triggers */}
        <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 mt-1">
          <Link
            href={detailUrl}
            className="shrink-0 flex items-center justify-center gap-1 bg-[#FAFAFA] hover:bg-stone-100 text-[#0F2C59] font-bold text-[11px] py-1.5 px-2.5 rounded-lg border border-stone-200 transition-colors text-center"
            title="View Room Details & Specs"
          >
            <Eye className="w-3 h-3 text-[#0F2C59]" />
            <span>Details</span>
          </Link>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[11px] py-1.5 px-2.5 rounded-lg shadow-xs transition-transform active:scale-98 text-center group/btn min-w-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-white shrink-0" />
            <span className="truncate">Inquire WhatsApp</span>
            <ArrowRight className="w-2.5 h-2.5 text-white/90 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
