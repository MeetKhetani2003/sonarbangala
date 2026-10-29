'use client';

import Link from 'next/link';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  Star,
  Heart,
  Camera,
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import {
  HOTEL_PHONE_DISPLAY,
  HOTEL_ADDRESS,
  HOTEL_EMAIL,
  GOOGLE_MAPS_LINK,
  buildCallUrl,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';

interface FooterProps {
  onOpenStaffModal?: () => void;
  onOpenInquiryModal?: () => void;
}

export default function Footer({ onOpenStaffModal, onOpenInquiryModal }: FooterProps) {
  return (
    <footer className="bg-[#0A1E3D] text-stone-300 pt-16 pb-24 md:pb-16 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <BrandLogo variant="light" size="md" />

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              Where authentic Bengali hospitality, culinary soul, and peaceful coastal luxury meet in Goa.
              Located 450 meters from Calangute Beach, tailored for couples, honeymooners, and family retreats.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-white bg-[#0F2C59] px-3 py-1 rounded-full border border-blue-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Couple Friendly
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] bg-[#0F2C59] px-3 py-1 rounded-full border border-blue-800 font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
                4.5★ Google Verified
              </span>
            </div>
          </div>

          {/* Col 2: Multi-Page Navigation */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 font-normal">
              <li>
                <Link href="/" className="hover:text-[#E5A93C] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-[#E5A93C] transition-colors">
                  Rooms &amp; Suites
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#E5A93C] transition-colors">
                  Goa Moments Gallery
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-[#E5A93C] transition-colors">
                  Location &amp; Distance Guide
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#E5A93C] transition-colors">
                  Live Google Reviews
                </Link>
              </li>
              <li>
                <Link href="/honeymoon-special" className="hover:text-[#E5A93C] transition-colors text-[#FF6B6B]">
                  Honeymoon Bed Decor
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-[#E5A93C] transition-colors">
                  Bengali Cuisine &amp; Dining
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E5A93C] transition-colors">
                  Contact &amp; Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Concierge & Reservations */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide">
              Direct Contact Channels
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-300 font-normal">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5A93C] transition-colors leading-relaxed"
                >
                  {HOTEL_ADDRESS}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href={buildCallUrl()} className="hover:text-[#E5A93C] font-semibold text-white">
                  {HOTEL_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#FF6B6B] shrink-0 fill-[#FF6B6B]" />
                <a
                  href={buildWhatsAppUrl({ source: 'footer' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#FF6B6B] font-bold"
                >
                  24/7 WhatsApp Concierge Desk
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="text-stone-300">{HOTEL_EMAIL}</span>
              </li>
            </ul>

            <div className="mt-5">
              {onOpenInquiryModal ? (
                <button
                  onClick={onOpenInquiryModal}
                  className="w-full bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer"
                >
                  Check Availability Online
                </button>
              ) : (
                <Link
                  href="/contact"
                  className="w-full inline-block text-center bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-transform active:scale-98"
                >
                  Contact Concierge Desk
                </Link>
              )}
            </div>
          </div>

          {/* Col 4: Embedded Map Snippet & Staff Portal */}
          <div>
            <h4 className="font-serif font-semibold text-white text-base mb-4 tracking-wide">
              Property Location Map
            </h4>

            {/* Embedded Map Snippet */}
            <div className="rounded-xl overflow-hidden border border-blue-900 aspect-16/9 w-full relative mb-4 bg-stone-900">
              <iframe
                title="Hotel Sonar Bangla Location Map"
                src="https://maps.google.com/maps?q=Calangute+Beach+Goa+Hotel+Sonar+Bangla&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] text-stone-300 font-semibold">
              <span className="bg-[#0F2C59] border border-blue-800 px-2 py-1 rounded-md">
                Calangute Beach (5 Min Walk)
              </span>
              <span className="bg-[#0F2C59] border border-blue-800 px-2 py-1 rounded-md">
                100% Couple Friendly Stay
              </span>
              <span className="bg-[#0F2C59] border border-blue-800 px-2 py-1 rounded-md">
                Honeymoon Bed Art
              </span>
            </div>

            {onOpenStaffModal && (
              <div className="pt-3 border-t border-blue-900 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-medium">Hotel Staff:</span>
                <button
                  onClick={onOpenStaffModal}
                  className="flex items-center gap-1.5 text-xs text-[#E5A93C] hover:text-amber-300 bg-[#0F2C59] hover:bg-[#12366e] px-3 py-1.5 rounded-lg border border-blue-800 transition-colors cursor-pointer font-bold"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Staff 1-Click Upload</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-normal">
          <p>© {new Date().getFullYear()} Hotel Sonar Bangla, Goa. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF6B6B] fill-[#FF6B6B]" />
            <span>for authentic hospitality, romance, and serene beach getaways</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
