'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Heart,
  MessageCircle,
  Filter,
  PlusCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Calendar,
  Tag,
  Share2,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { GalleryPhoto } from '@/types/hotel';
import { INITIAL_GALLERY_PHOTOS } from '@/data/hotelData';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface GoaMomentsGalleryProps {
  onOpenStaffModal: () => void;
  externalPhotos?: GalleryPhoto[];
}

export default function GoaMomentsGallery({
  onOpenStaffModal,
  externalPhotos,
}: GoaMomentsGalleryProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(INITIAL_GALLERY_PHOTOS);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  useEffect(() => {
    if (externalPhotos && externalPhotos.length > 0) {
      setPhotos(externalPhotos);
    }
  }, [externalPhotos]);

  // Load from API on mount
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success && data.photos) {
          setPhotos(data.photos);
        }
      } catch (err) {
        console.error('Error fetching gallery photos:', err);
      }
    }
    fetchPhotos();
  }, []);

  const filterTabs = [
    'All',
    'Honeymoon & Couple Setups',
    'Daily Guests',
    'Room Views',
    'Events',
  ];

  const filteredPhotos =
    selectedTag === 'All'
      ? photos
      : photos.filter((photo) => {
          if (selectedTag === 'Honeymoon & Couple Setups') {
            return photo.tag.includes('Honeymoon') || photo.tag.includes('Decor') || photo.tag.includes('Couple');
          }
          if (selectedTag === 'Daily Guests') {
            return photo.tag.includes('Guest') || photo.tag.includes('Dining');
          }
          if (selectedTag === 'Room Views') {
            return photo.tag.includes('Room') || photo.tag.includes('View');
          }
          if (selectedTag === 'Events') {
            return photo.tag.includes('Event') || photo.tag.includes('Goa');
          }
          return photo.tag === selectedTag;
        });

  const openLightbox = (photo: GalleryPhoto) => {
    setActiveLightboxPhoto(photo);
  };

  const closeLightbox = () => {
    setActiveLightboxPhoto(null);
  };

  const nextLightbox = () => {
    if (!activeLightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activeLightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActiveLightboxPhoto(filteredPhotos[nextIndex]);
  };

  const prevLightbox = () => {
    if (!activeLightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activeLightboxPhoto.id);
    const prevIndex = (currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1);
    setActiveLightboxPhoto(filteredPhotos[prevIndex]);
  };

  const handleShare = (photo: GalleryPhoto) => {
    if (navigator.share) {
      navigator.share({
        title: photo.title,
        text: `Look at this beautiful setup at Hotel Sonar Bangla Goa: ${photo.caption}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0F2C59] px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
              Daily Updated by Hotel Staff
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C59] tracking-tight">
              &ldquo;Goa Moments&rdquo; Dynamic Gallery &amp; Experience Hub
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Explore real daily photos from our property, candid honeymoon bed setups, anniversary surprise
              decorations, and joyful guest moments uploaded directly by our hospitality team.
            </p>
          </div>

          {/* 1-Click Staff Upload Trigger */}
          <button
            onClick={onOpenStaffModal}
            className="self-start md:self-auto flex items-center gap-2 bg-[#0F2C59] hover:bg-[#0c2347] text-[#E5A93C] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all border border-blue-900 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#E5A93C]" />
            <span>Staff 1-Click Upload</span>
          </button>
        </div>

        {/* Filter Pills Bar (Mobbin Sticky / Horizontal Filter Pattern) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTag(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === tab
                  ? 'bg-[#0F2C59] text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry / Staggered Card Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-4/3 sm:aspect-auto overflow-hidden bg-stone-100">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Tag Pill Floating on Photo */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#0F2C59]/85 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                    {photo.tag}
                  </span>
                </div>

                {/* Upload Date Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-white/90 backdrop-blur-md text-[#0F2C59] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    {photo.date}
                  </span>
                </div>

                {/* Hover Overlay with WhatsApp Inquiry Cue */}
                <div className="absolute inset-0 bg-[#0F2C59]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <span className="bg-[#25D366] text-white text-xs font-bold px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                    Want a Similar Setup? Ask on WhatsApp
                  </span>
                </div>
              </div>

              {/* Photo Caption & Title */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-snug mb-1.5 group-hover:text-amber-800 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                    {photo.caption}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Heart className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                    Verified Guest Setup
                  </span>
                  <span className="text-amber-700 font-medium underline">
                    Click to Enlarge &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox with Direct WhatsApp Inquiry CTA */}
      {activeLightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev / Next navigation */}
          <button
            onClick={prevLightbox}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextLightbox}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div className="max-w-4xl w-full flex flex-col items-center max-h-[90vh]">
            <div className="relative w-full h-[52vh] sm:h-[65vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={activeLightboxPhoto.url}
                alt={activeLightboxPhoto.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
            </div>

            {/* Lightbox Footer Bar with High-Intent WhatsApp Inquiry CTA */}
            <div className="w-full mt-4 bg-stone-900/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="bg-amber-500/90 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {activeLightboxPhoto.tag}
                  </span>
                  <span className="text-xs text-stone-400">
                    Uploaded: {activeLightboxPhoto.date}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {activeLightboxPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                  {activeLightboxPhoto.caption}
                </p>
              </div>

              {/* Direct Conversion CTA (WhatsApp routing with photo context) */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => handleShare(activeLightboxPhoto)}
                  className="p-3 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                  title="Share setup"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <a
                  href={buildWhatsAppUrl({
                    photoTitle: activeLightboxPhoto.title,
                    source: 'gallery_lightbox',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-transform active:scale-98 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Want a Similar Setup? Ask Us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Toast */}
      {copiedNotification && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-4 py-2 rounded-full shadow-lg border border-stone-700">
          Link copied to clipboard!
        </div>
      )}
    </section>
  );
}

