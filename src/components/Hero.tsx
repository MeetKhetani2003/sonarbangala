'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  MapPin,
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Camera,
  CheckCircle2,
  X,
  Heart,
  Compass,
  Waves,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import QuickInquiryBar from './QuickInquiryBar';
import { HOTEL_PHONE_DISPLAY, buildCallUrl, buildWhatsAppUrl } from '@/lib/whatsapp';

interface HeroSlide {
  id: string;
  category: string;
  iconName: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  roomLink: string;
  featurePill: string;
  specialRequest: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'couple-romance',
    category: 'Couple & Honeymoon',
    iconName: 'Heart',
    badge: '100% Couple Friendly · Private Balconies',
    title: 'Experience Premium Comfort & Romance in Goa',
    subtitle: 'Quiet couple sanctuaries with swimming pool access, private sit-out balconies, whisper-quiet split AC, and bespoke romantic bed calligraphy on arrival.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2200&q=85',
    ctaText: 'Inquire Couple Stay',
    roomLink: '/rooms/couple-duo-executive',
    featurePill: '🏊 Swimming Pool · ❄️ AC · 📶 Wi-Fi · 🚿 24/7 Hot Water · 📺 TV',
    specialRequest: 'Inquiring about Couple Executive Room with Balcony and romantic setup',
  },
  {
    id: 'beach-proximity',
    category: '450m To Beach',
    iconName: 'Compass',
    badge: '5 Mins Stroll to Calangute Golden Sands',
    title: 'Wake Up Minutes From Sunset Shacks & Ocean Waves',
    subtitle: 'Tucked away in quiet greenery yet steps from Calangute Beach, water sports, vibrant shacks, and North Goa nightlife.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=85',
    ctaText: 'Inquire Beach Stay',
    roomLink: '/location',
    featurePill: '🏖️ 450m Walk to Calangute Beach',
    specialRequest: 'Inquiring about room availability near Calangute Beach',
  },
  {
    id: 'honeymoon-decor',
    category: 'Bed Art & Decor',
    iconName: 'Sparkles',
    badge: 'Curated Romantic Bed Art & Candlelight',
    title: 'Surprise Your Partner with Magical Bed Art',
    subtitle: 'Hand-crafted fresh red rose petal calligraphy, heart motifs, scented candles, and celebratory anniversary cakes waiting in your room.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85',
    ctaText: 'Request Romantic Decor',
    roomLink: '/honeymoon-special',
    featurePill: '🕯️ Rose Petal Calligraphy & Mood Lights',
    specialRequest: 'Want to book Romantic / Honeymoon Bed Decoration setup for upcoming stay',
  },
  {
    id: 'family-comfort',
    category: 'Family Suites',
    iconName: 'ShieldCheck',
    badge: 'Spacious 4-6 Guests · Homestyle Bengali Food',
    title: 'Generous Family Suites with Warm Bengali Hospitality',
    subtitle: 'Interconnected rooms, child-safe spaces, extra bedding, and comforting home-style Bengali meals prepared fresh daily.',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2200&q=85',
    ctaText: 'Inquire Family Suite',
    roomLink: '/rooms/family-group-suite',
    featurePill: '🍲 Fresh Homestyle Bengali Cuisine',
    specialRequest: 'Inquiring about Family Luxury Suite for 4-6 guests with dining',
  },
];

const PREVIEW_GALLERY = [
  { url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=85', caption: 'Clean Outdoor Swimming Pool' },
  { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85', caption: 'Executive Duo Couple Balcony Room' },
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85', caption: 'Fresh Rose Petal Honeymoon Bed Art' },
  { url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=85', caption: 'Spacious Family & Group Suite' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85', caption: 'Calangute Beach 450m Walking Distance' },
  { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=85', caption: 'Plush Bedding & Ambient Night Mood' },
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85', caption: 'Private Balcony with Tropical Palms' },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || isGalleryOpen) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isGalleryOpen]);

  const activeSlide = HERO_SLIDES[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const openLightboxAt = (idx: number) => {
    setLightboxIndex(idx);
    setIsGalleryOpen(true);
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-[#FAFAFA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 100% Full-Bleed Edge-to-Edge Hero Visual Container */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] overflow-hidden flex flex-col justify-between bg-stone-950">
        {/* Full-Width Background Slides */}
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Full-width Image with Ken Burns Zoom */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Ambient Controlled Overlays (No Gradients) */}
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-[#0F2C59]/30" />
            </div>
          );
        })}

        {/* Content Container (Constrained width for typography, but background is 100% edge-to-edge) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-32 sm:pb-36 lg:pb-40 flex flex-col justify-between flex-1">
          {/* Top Row: Experience Switcher + Live Concierge Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
            {/* Experience Category Switcher (Floating Glass Pills that also indicate current slide) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none select-none bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/15">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-[#0F2C59] shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {slide.iconName === 'Heart' && (
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-[#FF6B6B] fill-[#FF6B6B]' : 'text-stone-400'
                        }`}
                      />
                    )}
                    {slide.iconName === 'Compass' && (
                      <Compass
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-[#0F2C59]' : 'text-stone-400'
                        }`}
                      />
                    )}
                    {slide.iconName === 'Sparkles' && (
                      <Sparkles
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-[#E5A93C]' : 'text-stone-400'
                        }`}
                      />
                    )}
                    {slide.iconName === 'ShieldCheck' && (
                      <ShieldCheck
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-emerald-600' : 'text-stone-400'
                        }`}
                      />
                    )}
                    <span>{slide.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Top Right Actions: Photo Peek & Live Direct Concierge Badge */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => openLightboxAt(0)}
                aria-label="View photo gallery"
                className="hidden sm:flex items-center gap-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white font-medium text-xs px-3.5 py-1.5 rounded-full border border-white/15 transition-all cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>18+ Photos</span>
              </button>

              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md text-stone-200 text-xs px-3.5 py-1.5 rounded-full border border-white/15">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">Direct Desk Online</span>
                <span className="hidden sm:inline text-stone-400">·</span>
                <span className="hidden sm:inline text-amber-400 font-semibold">Replies &lt; 2 min</span>
              </div>
            </div>
          </div>

          {/* Center-Bottom Hero Editorial Presentation & Google Review Card Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 text-white space-y-4">
              {/* Trust Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#E5A93C] text-stone-950 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-stone-950" />
                  4.5★ Google Verified
                </span>

                <span className="inline-flex items-center gap-1.5 bg-[#0F2C59] text-stone-100 px-3 py-1 rounded-full text-[11px] font-semibold border border-blue-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {activeSlide.badge}
                </span>

                <span className="hidden sm:inline-flex items-center gap-1.5 bg-black/50 text-stone-200 px-3 py-1 rounded-full text-[11px] font-medium border border-white/10 backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
                  Calangute Beach 450m
                </span>

                <span className="hidden md:inline-flex items-center gap-1.5 bg-sky-950/70 text-sky-300 px-3 py-1 rounded-full text-[11px] font-semibold border border-sky-400/30 backdrop-blur-md">
                  <Waves className="w-3.5 h-3.5 text-sky-400" />
                  Swimming Pool
                </span>
              </div>

              {/* Editorial H1 Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.12]">
                {activeSlide.title}
              </h1>

              {/* Subheadline with Balanced Line Flow */}
              <p className="text-sm sm:text-base lg:text-lg text-stone-200 font-normal max-w-2xl leading-relaxed">
                {activeSlide.subtitle}
              </p>

              {/* Micro Feature Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-stone-100 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
                  {activeSlide.featurePill}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Save 15% via Direct WhatsApp
                </span>
              </div>

              {/* Action CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {/* Primary WhatsApp CTA Button */}
                <a
                  href={buildWhatsAppUrl({
                    source: `hero_${activeSlide.id}`,
                    specialRequest: activeSlide.specialRequest,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-full shadow-lg transition-transform active:scale-98 text-xs sm:text-sm cursor-pointer group"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white group-hover:rotate-12 transition-transform" />
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Secondary White Luxury Button */}
                <Link
                  href={activeSlide.roomLink}
                  className="flex items-center gap-2 bg-white hover:bg-stone-100 text-[#0F2C59] font-bold px-5 py-3.5 rounded-full shadow-xs transition-colors text-xs sm:text-sm"
                >
                  <span>Explore Accommodations</span>
                </Link>

                {/* Photos Gallery Lightbox Trigger Button */}
                <button
                  onClick={() => openLightboxAt(0)}
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold px-4 py-3.5 rounded-full border border-white/20 transition-all text-xs sm:text-sm cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-[#E5A93C]" />
                  <span>Peek 18+ Photos</span>
                </button>

                {/* Reception Call Button */}
                <a
                  href={buildCallUrl()}
                  className="hidden md:flex items-center gap-2 text-stone-300 hover:text-white px-3 py-3 text-xs font-semibold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>{HOTEL_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

            {/* Google Social Proof Card (Gracefully Placed in Grid Column - No Overlaps) */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="w-full max-w-[300px] bg-black/60 backdrop-blur-md border border-white/15 p-4 rounded-2xl text-white shadow-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#E5A93C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E5A93C]" />
                    ))}
                  </div>
                  <span className="font-bold text-sm bg-white/15 px-2 py-0.5 rounded-md text-white">4.5 / 5.0</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-normal">
                  &ldquo;Special rose petal bed decor for our anniversary was magical. Super clean couple sanctuary near beach!&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-stone-300">
                  <span className="font-semibold text-amber-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Google Verified
                  </span>
                  <span className="text-stone-300 font-medium">128+ Guest Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls (Prev / Next Arrows) */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Quick Inquiry Bar Widget (Smoothly Overlapping Hero Base into Light Sand Background) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 lg:-mt-24 pb-8 sm:pb-12">
        <QuickInquiryBar />
      </div>

      {/* Full-Screen Lightbox Photo Preview Modal */}
      {isGalleryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white max-w-5xl mx-auto w-full pt-2">
            <div>
              <span className="text-[#E5A93C] text-xs font-bold uppercase tracking-wider">
                Hotel Sonar Bangla Goa
              </span>
              <h4 className="font-serif text-base sm:text-lg text-white">
                {PREVIEW_GALLERY[lightboxIndex].caption}
              </h4>
            </div>
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image View */}
          <div className="relative flex-1 flex items-center justify-center my-4 max-w-5xl mx-auto w-full">
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-stone-900 border border-stone-800">
              <Image
                src={PREVIEW_GALLERY[lightboxIndex].url}
                alt={PREVIEW_GALLERY[lightboxIndex].caption}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            {/* Nav Arrows */}
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev === 0 ? PREVIEW_GALLERY.length - 1 : prev - 1))
              }
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev + 1) % PREVIEW_GALLERY.length)
              }
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer Thumbnails & Inquire WhatsApp Trigger */}
          <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
              {PREVIEW_GALLERY.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    idx === lightboxIndex
                      ? 'border-[#E5A93C] scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={item.url}
                    alt={item.caption}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <a
              href={buildWhatsAppUrl({
                specialRequest: `Interested in booking: ${PREVIEW_GALLERY[lightboxIndex].caption}`,
                source: 'hero_lightbox',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all active:scale-98 shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#FF6B6B]" />
              <span>Inquire This Room on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
