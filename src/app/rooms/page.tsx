'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import PageHeaderBanner from '@/components/PageHeaderBanner';
import HotelFacilities from '@/components/HotelFacilities';
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
  MapPin,
  CalendarCheck,
  Waves,
} from 'lucide-react';
import { INITIAL_ROOMS } from '@/data/hotelData';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import RoomCard from '@/components/RoomCard';

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

      {/* Rich Atmospheric Page Hero Banner */}
      <PageHeaderBanner
        breadcrumbLabel="Rooms & Suites"
        badgeText="Coastal Comfort in Calangute"
        title="Designed for Comfort, Rest & Romance"
        subtitle="Thoughtfully designed for romantic couple retreats, celebratory honeymoons, and relaxed family holidays in North Goa."
        backgroundImage="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=85"
        highlights={[
          { icon: <Waves className="w-3.5 h-3.5 text-sky-400" />, label: 'Swimming Pool Access' },
          { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, label: '100% Couple Friendly Stay' },
          { icon: <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />, label: '450m Walk to Calangute Beach' },
          { icon: <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />, label: 'AC, Wi-Fi, Hot Water & TV' },
          { icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />, label: 'Zero Extra OTA Taxes' },
        ]}
        actions={
          <>
            <a
              href={buildWhatsAppUrl({
                specialRequest: 'Inquiring about best available rates across all rooms',
                source: 'rooms_page_hero',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform active:scale-98"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Inquire Best Rates on WhatsApp</span>
            </a>
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full border border-white/20 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#E5A93C]" />
              <span>Check Availability</span>
            </button>
          </>
        }
      />

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

        {/* Room Cards: 4 in 1 Row on Desktop, then 2nd Row if more added */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              sourceContext="rooms_page"
            />
          ))}
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

      {/* Verified Hotel Utilities & Facilities (Pool, AC, Wi-Fi, Hot Water, TV) */}
      <HotelFacilities />

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

