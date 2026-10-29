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
  Eye,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { INITIAL_ROOMS } from '@/data/hotelData';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function RoomsPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'couple' | 'family'>('all');

  const filteredRooms =
    activeCategory === 'all'
      ? INITIAL_ROOMS
      : INITIAL_ROOMS.filter((r) => r.category === activeCategory);

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* Page Header Banner */}
      {/* Page Header Banner (Luxury Blue #0F2C59) */}
      <section className="relative bg-[#0F2C59] text-white py-16 sm:py-24 overflow-hidden border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-stone-300 mb-4 font-medium">
            <Link href="/" className="hover:text-[#E5A93C] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#E5A93C]">Rooms &amp; Suites</span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] bg-[#0A1E3D] border border-blue-800 px-3 py-1 rounded-full font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Coastal Comfort in Calangute
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Designed for Comfort, Rest &amp; Romance
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-200 font-normal leading-relaxed">
            Thoughtfully designed for romantic couple retreats, anniversary escapes, and multi-generational family holidays in North Goa.
          </p>
        </div>
      </section>

      {/* Rooms Showcase Section */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Category Filter Tabs as Specified: All Rooms | Couple / Duo Rooms | Family & Group Suites */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Rooms' },
            { id: 'couple', label: 'Couple / Duo Rooms' },
            { id: 'family', label: 'Family & Group Suites' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#0F2C59] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {filteredRooms.map((room) => {
            const detailUrl = `/rooms/${room.id}`;
            const whatsAppUrl = buildWhatsAppUrl({
              roomName: room.name,
              source: `rooms_page_${room.id}`,
            });

            return (
              <div
                key={room.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                    {room.highlightBadge && (
                      <span className="bg-[#12161E]/90 text-amber-300 text-[11px] font-medium px-3 py-1 rounded-full tracking-wider uppercase backdrop-blur-md border border-amber-400/20">
                        {room.highlightBadge}
                      </span>
                    )}
                  </div>

                  <Link
                    href={detailUrl}
                    className="absolute bottom-4 right-4 z-10 bg-black/70 hover:bg-black text-white text-xs font-medium px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Room Details &amp; Photos</span>
                  </Link>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <Link href={detailUrl} className="hover:text-amber-800 transition-colors">
                        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                          {room.name}
                        </h2>
                      </Link>
                      <div>
                        <span className="text-xs text-stone-400 line-through mr-1.5">
                          ₹{room.originalPrice}
                        </span>
                        <span className="font-serif text-2xl font-bold text-amber-900">
                          ₹{room.price}
                        </span>
                        <span className="text-xs text-stone-500 font-medium"> / night</span>
                      </div>
                    </div>

                    <p className="text-stone-600 text-xs sm:text-sm font-normal mb-5">
                      {room.tagline}
                    </p>

                    {/* Quick Specs */}
                    <div className="flex flex-wrap items-center gap-3 py-2.5 px-3 bg-[#FBF9F5] rounded-xl border border-stone-200/60 mb-5 text-xs text-stone-700">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-stone-500" />
                        <span>{room.capacity}</span>
                      </div>
                      <span className="text-stone-300">·</span>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-stone-500" />
                        <span>{room.bedType}</span>
                      </div>
                      <span className="text-stone-300">·</span>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-stone-500" />
                        <span>{room.size}</span>
                      </div>
                    </div>

                    {/* Special Add-on */}
                    {room.specialAddon && (
                      <div className="mb-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2 text-xs text-amber-900 font-normal">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-amber-900">Curated Add-on:</strong> {room.specialAddon}
                        </span>
                      </div>
                    )}

                    {/* Amenity chips */}
                    <div className="mb-6">
                      <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-2 font-medium">
                        Featured Amenities
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((amenity) => (
                          <span
                            key={amenity.label}
                            className="inline-flex items-center gap-1.5 bg-stone-100/80 text-stone-700 text-xs px-3 py-1 rounded-full border border-stone-200 font-medium"
                          >
                            <span>{amenity.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions: View Photos | Inquire on WhatsApp */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={detailUrl}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#FAFAFA] hover:bg-stone-100 text-[#0F2C59] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl border border-stone-200 transition-colors text-center"
                    >
                      <Eye className="w-4 h-4 text-[#0F2C59]" />
                      <span>View Photos &amp; Specs</span>
                    </Link>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition-transform active:scale-98 text-center"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-[#FF6B6B]" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mb-2 text-center">
            Room Category Comparison
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 text-center mb-8 font-normal">
            Find the perfect accommodation tailored to your travel party.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Feature / Specification</th>
                  <th className="py-3 px-4 text-amber-900 font-serif text-base">Couple / Duo Executive</th>
                  <th className="py-3 px-4 text-stone-900 font-serif text-base">Family &amp; Group Suite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-normal text-stone-700">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-stone-900">Ideal For</td>
                  <td className="py-3.5 px-4">Couples, Honeymooners, Duo Friends</td>
                  <td className="py-3.5 px-4">Families (4-6), Group Travelers</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-stone-900">Bedding</td>
                  <td className="py-3.5 px-4">1 King Size Plush Bed</td>
                  <td className="py-3.5 px-4">2 King Beds + Extra Mattresses</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-stone-900">Balcony / View</td>
                  <td className="py-3.5 px-4">Private Sit-out with Palm View</td>
                  <td className="py-3.5 px-4">Spacious Balcony with Poolside View</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-stone-900">Honeymoon Bed Decor</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">✓ Available on Request</td>
                  <td className="py-3.5 px-4">✓ Available on Request</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-stone-900">Bengali Dining &amp; Baby Food</td>
                  <td className="py-3.5 px-4">✓ Room Service Available</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">✓ Custom Preparation on Demand</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-stone-900">Direct Rate</td>
                  <td className="py-3.5 px-4 font-serif text-base font-bold text-amber-900">₹2,499 / night</td>
                  <td className="py-3.5 px-4 font-serif text-base font-bold text-stone-900">₹4,299 / night</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Direct Booking Perks Banner */}
        <div className="bg-[#12161E] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
          <div>
            <span className="text-amber-400 text-xs uppercase tracking-wider font-semibold block mb-1">
              Direct Concierge Guarantee
            </span>
            <h3 className="font-serif text-2xl font-semibold text-white mb-2">
              Why Reserve Directly with Hotel Sonar Bangla?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-normal max-w-xl">
              Zero OTA markups, priority room allotment, customized bed decorations, and complimentary WhatsApp concierge for scooter rentals and airport cabs.
            </p>
          </div>

          <button
            onClick={() => setIsInquiryModalOpen(true)}
            className="shrink-0 bg-stone-900 hover:bg-black text-amber-300 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-stone-700 transition-colors cursor-pointer"
          >
            Check Availability Now
          </button>
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

