'use client';

import React from 'react';
import Link from 'next/link';
import {
  Waves,
  Wind,
  Wifi,
  Flame,
  Tv,
  ShieldCheck,
  MapPin,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface FacilityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  tagColor: string;
  highlight?: string;
}

const FACILITIES: FacilityItem[] = [
  {
    id: 'pool',
    title: 'Outdoor Swimming Pool',
    subtitle: 'Clean & Refreshing Pool',
    description:
      'Take a cool dip after exploring Calangute Beach or unwind on poolside loungers under lush tropical palm trees with warm Goa breezes.',
    icon: <Waves className="w-6 h-6 text-sky-600" />,
    badge: 'Guest Favorite',
    tagColor: 'bg-sky-50 text-sky-800 border-sky-200',
    highlight: 'Clean water maintained daily · Free access for all guests',
  },
  {
    id: 'ac',
    title: 'Air Conditioning (AC)',
    subtitle: 'Whisper-Quiet Split Inverter',
    description:
      'Every room and suite features a modern split inverter AC to ensure cool, tranquil, and restorative sleep after days in the coastal sun.',
    icon: <Wind className="w-6 h-6 text-[#0F2C59]" />,
    badge: 'In Every Room',
    tagColor: 'bg-blue-50 text-blue-900 border-blue-200',
    highlight: 'Individual remote control · Energy-efficient silent cooling',
  },
  {
    id: 'wifi',
    title: 'High-Speed Wi-Fi',
    subtitle: 'Fast Wireless Internet',
    description:
      'Seamless internet connectivity throughout all bedrooms, private balconies, and open areas for smooth remote working, video calls, or OTT streaming.',
    icon: <Wifi className="w-6 h-6 text-indigo-600" />,
    badge: '100% Free',
    tagColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    highlight: 'Unlimited high-speed bandwidth · Multi-device support',
  },
  {
    id: 'hot-water',
    title: '24/7 Hot Water',
    subtitle: 'Dedicated Bathroom Geysers',
    description:
      'Enjoy refreshing, continuous hot showers anytime with private in-bathroom instant geysers and well-maintained sanitary fittings.',
    icon: <Flame className="w-6 h-6 text-[#E5A93C]" />,
    badge: 'Round the Clock',
    tagColor: 'bg-amber-50 text-amber-900 border-amber-200',
    highlight: 'Immediate water heating · Attached private bathrooms',
  },
  {
    id: 'tv',
    title: 'Smart LED TV',
    subtitle: 'In-Room Entertainment',
    description:
      'Relax in bed with your favorite shows, movies, live news, and sports on a crisp flat-screen smart LED TV equipped with digital satellite channels.',
    icon: <Tv className="w-6 h-6 text-stone-700" />,
    badge: 'Cable & Satellite',
    tagColor: 'bg-stone-100 text-stone-800 border-stone-200',
    highlight: 'OTT compatible · Multi-language channels for all guests',
  },
];

export default function HotelFacilities() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFA] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#0F2C59]/10 text-[#0F2C59] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Real Utilities &amp; Property Facilities</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-900 tracking-tight mb-4">
            Essential Comforts for a Relaxed Goa Stay
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            No unexpected surprises. Hotel Sonar Bangla provides the verified essentials you need for a comfortable, hygienic, and leisurely holiday near Calangute Beach.
          </p>
        </div>

        {/* 5 Core Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FACILITIES.map((facility, index) => (
            <div
              key={facility.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group ${
                index === 0 ? 'lg:col-span-1 md:col-span-2' : ''
              }`}
            >
              <div>
                {/* Icon & Badge Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-[#FAFAFA] border border-stone-200/80 flex items-center justify-center group-hover:scale-108 transition-transform shadow-xs">
                    {facility.icon}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${facility.tagColor}`}
                  >
                    {facility.badge}
                  </span>
                </div>

                {/* Facility Titles */}
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  {facility.subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2C59] mb-3">
                  {facility.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal mb-5">
                  {facility.description}
                </p>
              </div>

              {/* Feature Pill Footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] text-stone-600">{facility.highlight}</span>
              </div>
            </div>
          ))}

          {/* 6th Card: Additional Value Highlight Card */}
          <div className="bg-[#0F2C59] text-white rounded-3xl p-6 sm:p-7 border border-blue-950 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#E5A93C]" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E5A93C] text-stone-950">
                  Direct Guarantee
                </span>
              </div>

              <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider block mb-1">
                Hospitality &amp; Location
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                100% Couple Friendly &amp; 450m Beach
              </h3>

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal mb-5">
                Discreet couple privacy, romantic rose petal bed art on request, and an effortless 5-minute stroll directly to Calangute Beach with zero OTA commission markups.
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between">
              <a
                href={buildWhatsAppUrl({
                  specialRequest: 'Inquiring about swimming pool hours, AC room availability and direct rates',
                  source: 'facilities_card',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Inquire on WhatsApp</span>
              </a>

              <Link
                href="/rooms"
                className="text-xs font-bold text-[#E5A93C] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View Rooms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Strip Summary */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="text-xs font-bold text-stone-800">Outdoor Swimming Pool</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-stone-800">Split Inverter AC</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span className="text-xs font-bold text-stone-800">Free High-Speed Wi-Fi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-bold text-stone-800">24/7 Hot Water Geyser</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
            <span className="text-xs font-bold text-stone-800">Smart LED TV in Room</span>
          </div>
        </div>
      </div>
    </section>
  );
}

