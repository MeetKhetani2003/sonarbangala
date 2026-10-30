'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import PageHeaderBanner from '@/components/PageHeaderBanner';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Send,
  Navigation,
  Loader2,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import {
  HOTEL_PHONE_DISPLAY,
  HOTEL_ADDRESS,
  HOTEL_EMAIL,
  GOOGLE_MAPS_LINK,
  buildCallUrl,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';

export default function ContactPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [roomType, setRoomType] = useState('Couple / Duo Executive Room');
  const [message, setMessage] = useState('');
  const [romanticDecor, setRomanticDecor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fallbackUrl = buildWhatsAppUrl({
      roomType,
      checkIn,
      checkOut,
      specialRequest: `Guest: ${name} (${phone}) · ${message}${
        romanticDecor ? ' · Please include Romantic/Honeymoon Bed Decoration details' : ''
      }`,
      source: 'contact_page_form',
    });

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Guest',
          phone: phone || 'Not provided',
          roomType,
          checkIn,
          checkOut,
          specialRequest: message,
          romanticDecor,
          source: 'contact_page_form',
        }),
      });

      const data = await res.json();
      const targetUrl = data.whatsappUrl || fallbackUrl;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('API submission failed, launching WhatsApp directly', err);
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* Rich Atmospheric Page Hero Banner */}
      <PageHeaderBanner
        breadcrumbLabel="Contact & Direct Inquiry"
        badgeText="Direct Concierge Desk · Calangute Beach"
        badgeIcon={<Phone className="w-3.5 h-3.5 text-[#E5A93C]" />}
        title="We Are Here to Welcome You to Goa"
        subtitle="Reach out directly to our 24/7 reception desk for priority reservations, customized romantic setups, and scooter or taxi assistance."
        backgroundImage="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85"
        highlights={[
          { icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />, label: 'Replies in < 2 Mins on WhatsApp' },
          { icon: <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />, label: 'Direct Desk Rate Guarantee' },
          { icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" />, label: 'Calangute Beach 450m' },
        ]}
        actions={
          <>
            <a
              href={buildWhatsAppUrl({
                specialRequest: 'General inquiry or room booking reservation request',
                source: 'contact_hero',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#FF6B6B]" />
              <span>Direct WhatsApp Desk</span>
            </a>
            <a
              href={buildCallUrl()}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full border border-white/20 transition-all"
            >
              <Phone className="w-4 h-4 text-[#E5A93C]" />
              <span>Call Reception ({HOTEL_PHONE_DISPLAY})</span>
            </a>
          </>
        }
      />

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-semibold text-stone-900 border-b border-stone-100 pb-3">
                Direct Contact Channels
              </h2>

              {/* WhatsApp Card */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">WhatsApp Concierge Desk</h3>
                  <p className="text-xs text-stone-600 font-normal mb-1">
                    Instant responses for rate quotes &amp; photos (24/7)
                  </p>
                  <a
                    href={buildWhatsAppUrl({ source: 'contact_page' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
                  >
                    Open WhatsApp Chat &rarr;
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">Direct Phone Line</h3>
                  <p className="text-xs text-stone-600 font-normal mb-1">
                    Speak directly with on-duty hotel reception
                  </p>
                  <a
                    href={buildCallUrl()}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-900"
                  >
                    {HOTEL_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">Hotel Location &amp; Directions</h3>
                  <p className="text-xs text-stone-600 font-normal leading-relaxed mb-2">
                    {HOTEL_ADDRESS}
                  </p>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-800 hover:underline font-semibold"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">Reservations Email</h3>
                  <p className="text-xs text-stone-600 font-normal">
                    {HOTEL_EMAIL}
                  </p>
                </div>
              </div>
            </div>

            {/* Check-in Times & Guarantee */}
            <div className="bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Reception Hours: 24/7 Active Desk</span>
              </div>
              <p className="text-xs text-stone-300 font-normal leading-relaxed">
                Check-in from 12:00 PM. Check-out until 10:30 AM. Arriving early on morning flights? Message us on WhatsApp for priority early room preparation.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
            <div className="mb-6">
              <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider block mb-1">
                Direct Inquiry Form
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                Plan Your Stay with Us
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-normal mt-1">
                Submitting this form connects you directly with our manager on WhatsApp with all details pre-filled.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sourav Mukherjee"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">Check-in Date</label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-stone-700 block mb-1">Check-out Date</label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">Preferred Room Type</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="Couple / Duo Executive Room">Couple / Duo Executive Room (Romantic Balcony)</option>
                  <option value="Family & Group Premium Suite">Family & Group Premium Suite (Spacious 4-6)</option>
                  <option value="Multiple Rooms for Celebration">Multiple Rooms for Celebration / Group</option>
                </select>
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none">
                  <input
                    type="checkbox"
                    checked={romanticDecor}
                    onChange={(e) => setRomanticDecor(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="flex items-center gap-1 font-medium text-rose-800">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    Request Honeymoon / Romantic Candlelight Bed Decoration setup
                  </span>
                </label>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700 block mb-1">Special Requests / Questions</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Need scooter rental ready on check-in, early flight arrival, Bengali thali for dinner..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-98 text-xs sm:text-sm cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                )}
                <span>{isSubmitting ? 'Sending to Desk...' : 'Submit Inquiry & Open WhatsApp'}</span>
              </button>
            </form>
          </div>
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

