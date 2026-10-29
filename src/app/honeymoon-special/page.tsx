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
  Heart,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Gift,
  Sun,
  Flame,
} from 'lucide-react';
import { buildWhatsAppUrl, buildCallUrl, HOTEL_PHONE_DISPLAY } from '@/lib/whatsapp';

export default function HoneymoonSpecialPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const packages = [
    {
      name: 'Classic Romantic Rose Bed Setup',
      tagline: 'Delicate rose petal bed art & warm ambient lighting',
      price: '₹1,299',
      duration: 'Prepared on check-in arrival',
      features: [
        'Fresh red rose petal heart bed calligraphy',
        'Scented candlelight tealights & warm lanterns',
        'Customized handwritten welcoming message card',
        'Complimentary sweet indulgence chocolates',
      ],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Grand Anniversary & Honeymoon Canopy',
      tagline: 'Fairy light canopy, floral bed art & celebration cake',
      price: '₹2,499',
      duration: 'Recommended for honeymooners & anniversaries',
      features: [
        'Full fairy light bed canopy with sheer drapes',
        'Lavish red & white rose petal decorative layout',
        'Decadent celebration cake (Chocolate / Red Velvet)',
        'Sparkling fruit beverage & flute glasses',
        'Aromatic lavender room diffuser setup',
      ],
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Intimate Candlelight Dinner & Stay Experience',
      tagline: 'Curated 4-course dinner with private balcony ambiance',
      price: '₹3,799',
      duration: 'Evening 7:30 PM onwards',
      features: [
        'Private decorated balcony candlelight table setup',
        '4-course chef curated dinner (Bengali / Coastal Seafood / North Indian)',
        'Floral bouquet presentation on arrival',
        'Complete honeymoon bed decoration included',
      ],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* Hero Banner (Luxury Blue #0F2C59) */}
      <section className="relative bg-[#0F2C59] text-white py-16 sm:py-24 overflow-hidden border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-stone-300 mb-4 font-medium">
            <Link href="/" className="hover:text-[#E5A93C] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#E5A93C]">Honeymoon &amp; Romantic Stays</span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] bg-[#0A1E3D] border border-blue-800 px-3 py-1 rounded-full font-bold mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#FF6B6B] text-[#FF6B6B]" />
            Goa Romance &amp; Celebrations
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Celebrate Love on Goa&apos;s Golden Coast
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-200 font-normal leading-relaxed mb-8">
            An intimate sanctuary for couples and newlyweds. Enjoy discreet hospitality, private balconies, and handcrafted romantic setups arranged seamlessly before your arrival.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={buildWhatsAppUrl({
                specialRequest: 'Inquiring about Honeymoon Package & Bed Decoration options',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-xs transition-transform active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#FF6B6B]" />
              <span>Inquire Honeymoon Setups on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Package Showcase */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight mb-3">
            Curated Romantic Add-on Packages
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-normal leading-relaxed">
            Select any room and pair it with our signature decoration services. We handle every detail discreetly to ensure a magical surprise for your partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#12161E]/80 text-rose-300 text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-md">
                  {pkg.duration}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug">
                      {pkg.name}
                    </h3>
                  </div>
                  <span className="font-serif text-2xl font-bold text-rose-900 block mb-2">
                    {pkg.price}
                  </span>
                  <p className="text-xs text-stone-600 font-normal mb-5">
                    {pkg.tagline}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-stone-700 font-normal">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={buildWhatsAppUrl({
                    specialRequest: `Interested in booking the "${pkg.name}" for our stay`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-300 font-semibold text-xs py-3 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Reserve Setup on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 100% Couple Friendly Privacy Guarantee */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 mb-1">
                100% Couple Friendly &amp; Private Stay Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-normal leading-relaxed max-w-2xl">
                We respect your peace and personal space. Married and unmarried couples (18+) are warmly welcomed with zero uncomfortable questions. Simply show standard government ID at check-in.
              </p>
            </div>
          </div>

          <Link
            href="/rooms/couple-duo-executive"
            className="shrink-0 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold px-5 py-3 rounded-full transition-colors"
          >
            Explore Couple Executive Room &rarr;
          </Link>
        </div>
      </section>

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

