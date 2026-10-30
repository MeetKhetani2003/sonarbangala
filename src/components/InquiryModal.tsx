'use client';

import { useState } from 'react';
import {
  X,
  CalendarCheck,
  Phone,
  Sparkles,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { buildWhatsAppUrl, buildCallUrl, HOTEL_PHONE_DISPLAY } from '@/lib/whatsapp';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [roomType, setRoomType] = useState('Couple / Duo Executive Room');
  const [guests, setGuests] = useState('2 Adults (Couple)');
  const [romanticDecor, setRomanticDecor] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fallbackUrl = buildWhatsAppUrl({
      roomType,
      checkIn,
      checkOut,
      guests,
      specialRequest: romanticDecor
        ? `Guest Name: ${guestName || 'Guest'} · Contact: ${phone || 'Direct'} · Please include Romantic/Honeymoon Bed Decoration details`
        : `Guest Name: ${guestName || 'Guest'} · Contact: ${phone || 'Direct'}`,
      source: 'check_availability_modal',
    });

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName || 'Guest',
          phone: phone || 'Not provided',
          roomType,
          checkIn,
          checkOut,
          guests,
          romanticDecor,
          specialRequest: romanticDecor
            ? 'Guest requested Romantic / Honeymoon Bed Decoration with fresh rose petals & candlelight'
            : '',
          source: 'check_availability_modal',
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
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-blue-950 flex items-center justify-between bg-[#0F2C59] text-white rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <CalendarCheck className="w-5 h-5 text-[#E5A93C]" />
            <div>
              <h3 className="font-serif font-semibold text-lg sm:text-xl text-white">
                Check Room Availability
              </h3>
              <p className="text-xs text-stone-200 font-normal">
                Direct Desk Guarantee · Inquiry Sent to Client &amp; WhatsApp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#0A1E3D] hover:bg-[#12366e] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/80 flex items-center gap-2 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Couple Friendly Guarantee:</strong> Instant response &amp; zero hidden taxes via direct concierge booking.
            </span>
          </div>

          {/* Guest Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F2C59] font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                WhatsApp / Phone (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F2C59] font-medium"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F2C59] font-medium"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F2C59] font-medium"
                required
              />
            </div>
          </div>

          {/* Room Type */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Room Category
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F2C59] font-medium cursor-pointer"
            >
              <option value="Couple / Duo Executive Room">Couple / Duo Executive Room (Romantic Balcony)</option>
              <option value="Family & Group Premium Suite">Family & Group Premium Suite (Spacious 4-6)</option>
              <option value="Multiple Rooms for Group / Wedding">Multiple Rooms for Group / Wedding</option>
            </select>
          </div>

          {/* Number of Guests */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Number of Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F2C59] font-medium cursor-pointer"
            >
              <option value="2 Adults (Couple)">2 Adults (Couple)</option>
              <option value="1 Adult">1 Adult</option>
              <option value="3 Guests (Couple + Child)">3 Guests (Couple + Child)</option>
              <option value="4 Guests (Family / Friends)">4 Guests (Family / Friends)</option>
              <option value="5+ Guests">5+ Guests</option>
            </select>
          </div>

          {/* Romantic Bed Decor Checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 select-none">
              <input
                type="checkbox"
                checked={romanticDecor}
                onChange={(e) => setRomanticDecor(e.target.checked)}
                className="rounded text-[#0F2C59] focus:ring-[#0F2C59] w-4 h-4 cursor-pointer"
              />
              <span className="flex items-center gap-1 font-medium text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Include Romantic / Honeymoon Bed Decoration setup details
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-3 space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer text-sm disabled:opacity-75"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <WhatsAppIcon className="w-4 h-4 fill-white" />
              )}
              <span>{isSubmitting ? 'Sending to Desk...' : 'Inquire on WhatsApp'}</span>
            </button>

            <a
              href={buildCallUrl()}
              className="w-full flex items-center justify-center gap-2 bg-[#FAFAFA] hover:bg-stone-100 text-[#0F2C59] font-bold py-2.5 px-4 rounded-xl border border-stone-200 transition-colors text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F2C59]" />
              <span>Or Call Direct: {HOTEL_PHONE_DISPLAY}</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
