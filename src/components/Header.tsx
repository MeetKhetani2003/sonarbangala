'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MapPin,
  Phone,
  MessageCircle,
  Menu,
  X,
  CalendarCheck,
  ShieldCheck,
  Camera,
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import {
  HOTEL_PHONE_DISPLAY,
  GOOGLE_MAPS_LINK,
  buildCallUrl,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';

interface HeaderProps {
  onOpenInquiryModal?: () => void;
  onOpenStaffModal?: () => void;
}

export default function Header({ onOpenInquiryModal, onOpenStaffModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Core navigation as per specification: Home, Rooms, Gallery, Location, Reviews
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Rooms', href: '/rooms' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Location', href: '/location' },
    { label: 'Reviews', href: '/reviews' },
  ];

  const secondaryDrawerLinks = [
    { label: 'Honeymoon Special', href: '/honeymoon-special' },
    { label: 'Bengali Dining', href: '/dining' },
    { label: 'Contact & Inquiry', href: '/contact' },
  ];

  return (
    <>
      {/* 1. Top Announcement Bar (Luxury Blue #0F2C59) */}
      <div className="bg-[#0F2C59] text-white text-xs py-2 px-4 sm:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-200 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
              <span className="font-medium truncate">
                Location: Near Beach, Goa
              </span>
            </a>
            <span className="text-blue-300 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-stone-200 font-medium">
              📞 Direct Booking Discount Available
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={buildWhatsAppUrl({ source: 'top_bar' })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#E5A93C] hover:text-amber-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#E5A93C] text-[#0F2C59]" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={buildCallUrl()}
              className="hidden sm:flex items-center gap-1 text-stone-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-stone-300" />
              <span>{HOTEL_PHONE_DISPLAY}</span>
            </a>

            {onOpenStaffModal && (
              <button
                onClick={onOpenStaffModal}
                className="hidden md:inline-flex items-center gap-1 text-[11px] text-blue-200 hover:text-white transition-colors cursor-pointer"
                title="Staff 1-Click Upload"
              >
                <Camera className="w-3 h-3 text-[#E5A93C]" />
                <span>Staff Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Clean Luxury Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white shadow-xs border-b border-stone-200'
            : 'bg-white border-b border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <BrandLogo size="md" />

          {/* Desktop Nav - Clean 5 Links as Specified */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`py-1 transition-colors ${
                    isActive
                      ? 'text-[#0F2C59] font-bold border-b-2 border-[#0F2C59]'
                      : 'hover:text-[#0F2C59]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Direct WhatsApp Concierge Button in Sunset Coral */}
            <a
              href={buildWhatsAppUrl({ source: 'header' })}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-[#0F2C59] bg-[#0F2C59]/10 hover:bg-[#0F2C59]/15 text-xs font-semibold px-3.5 py-2 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FF6B6B] fill-[#FF6B6B]" />
              <span>WhatsApp Chat</span>
            </a>

            {/* Check Availability CTA Button (Sunset Coral #FF6B6B) */}
            {onOpenInquiryModal ? (
              <button
                onClick={onOpenInquiryModal}
                className="flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-white" />
                <span>Check Availability</span>
              </button>
            ) : (
              <Link
                href="/rooms"
                className="flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs transition-colors"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-white" />
                <span>Check Availability</span>
              </Link>
            )}

            {/* Clean Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-stone-800 hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6 text-[#0F2C59]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Clean, Calm, Generously Spaced) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60"
          />

          {/* Drawer Sheet */}
          <div className="relative w-full max-w-sm h-full bg-white flex flex-col z-10 animate-in slide-in-from-right duration-250 border-l border-stone-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-[#FAFAFA]">
              <BrandLogo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Clean Links List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 px-3 rounded-xl text-base transition-colors ${
                        isActive
                          ? 'font-bold text-[#0F2C59] bg-blue-50'
                          : 'font-medium text-stone-800 hover:bg-stone-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Secondary links */}
              <div className="pt-3 border-t border-stone-100 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-3 block mb-1">
                  More Experiences
                </span>
                {secondaryDrawerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-3 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Booking Button inside Drawer */}
              <div className="pt-4 border-t border-stone-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenInquiryModal) onOpenInquiryModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white text-sm font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <CalendarCheck className="w-4 h-4 text-white" />
                  <span>Check Availability</span>
                </button>
              </div>

              {/* Staff Portal Link */}
              {onOpenStaffModal && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenStaffModal();
                    }}
                    className="w-full flex items-center justify-center gap-2 text-[#0F2C59] bg-[#0F2C59]/10 hover:bg-[#0F2C59]/15 text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#0F2C59]" />
                    <span>Staff Photo Upload</span>
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Bottom Quick Action */}
            <div className="p-5 border-t border-stone-100 bg-[#FAFAFA] flex gap-2">
              <a
                href={buildCallUrl()}
                className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-stone-200 text-[#0F2C59] font-semibold py-3 rounded-xl text-xs hover:bg-stone-50 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0F2C59]" />
                <span>Call Desk</span>
              </a>
              <a
                href={buildWhatsAppUrl({ source: 'mobile_drawer' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-semibold py-3 rounded-xl text-xs transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white text-[#FF6B6B]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
