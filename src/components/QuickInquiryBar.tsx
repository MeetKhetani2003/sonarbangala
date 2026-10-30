'use client';

import { useState } from 'react';
import { Calendar, Users, ShieldCheck, CheckCircle2, Heart, Loader2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function QuickInquiryBar() {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [roomType, setRoomType] = useState('Couple / Duo Executive Room');
  const [guests, setGuests] = useState('2 Adults (Couple)');
  const [romanticDecor, setRomanticDecor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleInquireWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification('Sending inquiry to concierge...');

    const fallbackUrl = buildWhatsAppUrl({
      roomType,
      checkIn,
      checkOut,
      guests,
      specialRequest: romanticDecor
        ? 'Please include Honeymoon / Romantic Bed Decoration details & pricing'
        : undefined,
      source: 'quick_inquiry_bar',
    });

    try {
      // 1. Send inquiry to backend -> saves in MongoDB & triggers email from user's gmail to client's mail
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType,
          checkIn,
          checkOut,
          guests,
          romanticDecor,
          specialRequest: romanticDecor
            ? 'Honeymoon / Romantic Bed Decoration setup requested'
            : '',
          source: 'quick_inquiry_bar',
        }),
      });

      const data = await res.json();
      const targetUrl = data.whatsappUrl || fallbackUrl;

      setNotification('Inquiry sent! Opening WhatsApp chat...');
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Direct inquiry API failed, falling back to direct WhatsApp link', err);
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200/90 p-4 sm:p-6 lg:p-7 transition-all">
      {/* Top Value Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-[#0F2C59]">
            Direct Concierge Desk
          </span>
          <span className="text-[11px] text-[#0F2C59] bg-stone-100 px-2.5 py-0.5 rounded-full font-semibold border border-stone-200">
            Best Rate Guaranteed · Save 15%
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-600 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Couple Friendly
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Zero Commission
          </span>
        </div>
      </div>

      <form onSubmit={handleInquireWhatsApp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
        {/* Check-in Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#0F2C59] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#E5A93C]" />
            Check-in Date
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full h-11 bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59] font-medium transition-colors"
            required
          />
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#0F2C59] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#E5A93C]" />
            Check-out Date
          </label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full h-11 bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59] font-medium transition-colors"
            required
          />
        </div>

        {/* Room Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#0F2C59] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#E5A93C]" />
            Accommodation
          </label>
          <select
            value={roomType}
            onChange={(e) => {
              setRoomType(e.target.value);
              if (e.target.value.includes('Couple')) {
                setGuests('2 Adults (Couple)');
              } else {
                setGuests('4 Guests (Family / Friends)');
              }
            }}
            className="w-full h-11 bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59] font-medium transition-colors cursor-pointer"
          >
            <option value="Couple / Duo Executive Room">Couple / Duo Room (Balcony)</option>
            <option value="Family & Group Premium Suite">Family Suite (Spacious 4-6)</option>
            <option value="Multiple Rooms / Group Stay">Multiple Rooms / Group Stay</option>
          </select>
        </div>

        {/* Guests Count */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#0F2C59] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#E5A93C]" />
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full h-11 bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59] font-medium transition-colors cursor-pointer"
          >
            <option value="2 Adults (Couple)">2 Adults (Couple)</option>
            <option value="1 Adult (Solo Traveler)">1 Adult (Solo)</option>
            <option value="3 Guests (Couple + Child)">3 Guests (Couple + Child)</option>
            <option value="4 Guests (Family / Friends)">4 Guests (Family / Friends)</option>
            <option value="5+ Guests (Large Group)">5+ Guests (Large Group)</option>
          </select>
        </div>

        {/* Real WhatsApp CTA Action */}
        <div className="flex flex-col">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-4 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer text-xs sm:text-sm disabled:opacity-75"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <WhatsAppIcon className="w-4 h-4 fill-white" />
            )}
            <span className="truncate">{isSubmitting ? 'Sending...' : 'Inquire on WhatsApp'}</span>
          </button>
        </div>
      </form>

      {/* Romantic Honeymoon Decor Checkbox & Status */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none group font-medium">
          <input
            type="checkbox"
            checked={romanticDecor}
            onChange={(e) => setRomanticDecor(e.target.checked)}
            className="rounded text-[#0F2C59] focus:ring-[#0F2C59] w-4 h-4 cursor-pointer"
          />
          <span className="flex items-center gap-1.5 group-hover:text-[#0F2C59] transition-colors">
            <Heart className="w-3.5 h-3.5 text-[#FF6B6B] fill-[#FF6B6B]" />
            <span className="font-semibold text-stone-800">Add Romantic / Honeymoon Bed Decoration</span> (Fresh rose petals &amp; candlelight setup on arrival)
          </span>
        </label>

        <span className="text-[11px] text-stone-500 font-normal">
          {notification ? (
            <span className="text-emerald-600 font-semibold">{notification}</span>
          ) : (
            '⚡ Direct desk replies in < 2 minutes'
          )}
        </span>
      </div>
    </div>
  );
}
