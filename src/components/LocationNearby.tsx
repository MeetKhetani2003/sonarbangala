'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Navigation,
  Waves,
  Sunset,
  Sparkles,
  Plane,
  Train,
  Compass,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  ExternalLink,
  Bike,
  Car,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { NEARBY_ATTRACTIONS, FAQS } from '@/data/hotelData';
import { AttractionProximity } from '@/types/hotel';
import { GOOGLE_MAPS_LINK, HOTEL_ADDRESS, buildWhatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

export default function LocationNearby() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Beach' | 'Nightlife' | 'Sightseeing' | 'Transit'>('All');

  const filteredAttractions =
    activeCategory === 'All'
      ? NEARBY_ATTRACTIONS
      : NEARBY_ATTRACTIONS.filter((a) => a.category === activeCategory);

  const getAttractionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-4 h-4 text-sky-600" />;
      case 'Sunset':
        return <Sunset className="w-4 h-4 text-[#E5A93C]" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-rose-500" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-emerald-600" />;
      case 'Plane':
        return <Plane className="w-4 h-4 text-blue-600" />;
      case 'Train':
        return <Train className="w-4 h-4 text-purple-600" />;
      default:
        return <MapPin className="w-4 h-4 text-[#0F2C59]" />;
    }
  };

  const getGoogleMapsDirectionsUrl = (destinationQuery?: string, name?: string) => {
    const destination = destinationQuery || name || 'Calangute Beach';
    return `https://www.google.com/maps/dir/?api=1&origin=Hotel+Sonar+Bangla+Calangute+Goa&destination=${encodeURIComponent(
      destination + ', Goa'
    )}`;
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="location" className="py-14 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#0F2C59]/10 text-[#0F2C59] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>North Goa Beach Corridor · 450m to Calangute Beach</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F2C59] tracking-tight mb-3">
            Location, Proximity &amp; Nearby Hotspots
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Nestled quietly just 450 meters from Calangute Beach, Hotel Sonar Bangla gives you effortless walking access to the sea while keeping you close to Baga shacks, Tito’s Lane nightlife, and airport expressways.
          </p>
        </div>

        {/* Map & Address Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14 items-stretch">
          {/* Map Embed Container */}
          <div className="lg:col-span-7 bg-stone-100 rounded-3xl overflow-hidden border border-stone-200 shadow-sm relative min-h-[360px] sm:min-h-[420px]">
            <iframe
              title="Hotel Sonar Bangla Goa Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15378.140816990425!2d73.74868774783307!3d15.543501255562723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc158864b4c73%3A0xe53be0a68434a9b4!2sCalangute%20Beach!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[360px] sm:min-h-[420px]"
            />
            {/* Map Overlay Button */}
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 z-10 bg-white hover:bg-stone-50 text-[#0F2C59] font-bold text-xs py-2.5 px-4 rounded-xl shadow-md border border-stone-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>Get Turn-by-Turn GPS Directions</span>
            </a>
          </div>

          {/* Location Summary & Mobility Perks */}
          <div className="lg:col-span-5 bg-[#FAFAFA] rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2C59] mb-2">
                <MapPin className="w-4 h-4 text-[#E5A93C]" />
                <span>Hotel Address &amp; Landmarks</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#0F2C59] mb-2">
                Hotel Sonar Bangla Goa
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5 font-normal">
                {HOTEL_ADDRESS}
              </p>

              {/* 3 Concierge Highlights */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-stone-200">
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-700 shrink-0">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F2C59]">450m Beach Shortcut (5 Mins Walk)</h4>
                    <p className="text-[11px] text-stone-500 font-normal">Walk straight down our tranquil lane directly to the golden sand and beach shacks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-stone-200">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <Bike className="w-4 h-4 text-[#E5A93C]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F2C59]">Scooter &amp; Activa Rental Desk</h4>
                    <p className="text-[11px] text-stone-500 font-normal">Activas &amp; Royal Enfields delivered to our reception from ₹350/day. Transparent pricing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-stone-200">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <Car className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F2C59]">Airport &amp; Station Direct Cabs</h4>
                    <p className="text-[11px] text-stone-500 font-normal">Fixed-rate reliable AC taxis arranged directly on WhatsApp for Mopa (GOX) and Dabolim.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#0F2C59] hover:bg-[#0c2347] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-colors text-center"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={buildWhatsAppUrl({
                  specialRequest: 'Inquiring about directions / airport taxi pickup to Hotel Sonar Bangla',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-transform active:scale-98 text-center"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                <span>Ask Concierge on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 🌟 UPGRADED USEFUL PROXIMITY & DISTANCE GUIDE 🌟 */}
        <div className="mb-16">
          {/* Top Bar with Category Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Goa Travel &amp; Distance Assistant</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F2C59]">
                Proximity &amp; Distance Guide
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm font-normal mt-0.5">
                Exact distances, estimated travel times, local concierge tips, and 1-click Google Maps directions.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
              {[
                { id: 'All', label: 'All Hotspots' },
                { id: 'Beach', label: '🏖️ Beaches' },
                { id: 'Nightlife', label: '🍸 Nightlife' },
                { id: 'Sightseeing', label: '🏰 Forts' },
                { id: 'Transit', label: '✈️ Transit & Rail' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#0F2C59] text-white shadow-xs'
                      : 'bg-[#FAFAFA] hover:bg-stone-200 text-stone-700 border border-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actionable Attraction Cards Grid (4 in a row on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredAttractions.map((attraction: AttractionProximity) => {
              const directionsUrl = getGoogleMapsDirectionsUrl(attraction.mapQuery, attraction.name);
              const isTransit = attraction.category === 'Transit';

              const whatsAppRideUrl = buildWhatsAppUrl({
                specialRequest: isTransit
                  ? `Need assistance booking airport/station taxi transfer for: ${attraction.name}`
                  : `Inquiring about scooter / cab rental for visiting: ${attraction.name}`,
              });

              return (
                <div
                  key={attraction.id}
                  className="bg-white hover:border-[#0F2C59]/40 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Visual Photo Header */}
                    {attraction.image && (
                      <div className="relative h-32 w-full overflow-hidden bg-stone-900">
                        <Image
                          src={attraction.image}
                          alt={attraction.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/25" />

                        {/* Distance Badge */}
                        <span className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                          {attraction.distance}
                        </span>

                        {/* Category Pill */}
                        <span className="absolute bottom-2.5 left-2.5 bg-[#0F2C59]/90 backdrop-blur-md text-[#E5A93C] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#E5A93C]/30 flex items-center gap-1">
                          {getAttractionIcon(attraction.icon)}
                          <span>{attraction.category}</span>
                        </span>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="p-3.5 sm:p-4">
                      {/* Name & Distance (if no image) */}
                      {!attraction.image && (
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="p-1.5 rounded-lg bg-[#FAFAFA] border border-stone-200">
                            {getAttractionIcon(attraction.icon)}
                          </span>
                          <span className="text-[10px] font-bold text-[#0F2C59] bg-[#FAFAFA] px-2 py-0.5 rounded-md border border-stone-200">
                            {attraction.distance}
                          </span>
                        </div>
                      )}

                      <h4 className="font-serif font-semibold text-sm sm:text-base text-[#0F2C59] mb-1 line-clamp-1 group-hover:text-blue-950 transition-colors">
                        {attraction.name}
                      </h4>

                      <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-2 mb-2 font-normal">
                        {attraction.description}
                      </p>

                      {/* Travel Mode & Duration */}
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md mb-2.5 border border-emerald-100">
                        <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{attraction.travelTime}</span>
                      </div>

                      {/* Useful Insider Tip */}
                      {attraction.insiderTip && (
                        <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E5A93C]/40 text-[10px] text-stone-700 leading-snug">
                          <strong className="text-[#0F2C59] font-bold">💡 Tip: </strong>
                          <span>{attraction.insiderTip}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons: 1-Click Directions & WhatsApp Taxi/Scooter */}
                  <div className="p-3.5 sm:p-4 pt-0 flex items-center gap-1.5">
                    {/* Google Maps Directions */}
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 bg-[#FAFAFA] hover:bg-stone-100 text-[#0F2C59] font-bold text-[11px] py-1.5 px-2 rounded-lg border border-stone-300 transition-colors text-center"
                      title="Open Turn-by-Turn Route in Google Maps"
                    >
                      <Navigation className="w-3 h-3 text-[#0F2C59]" />
                      <span>Directions</span>
                    </a>

                    {/* WhatsApp Transit or Scooter Trigger */}
                    <a
                      href={whatsAppRideUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 bg-[#FF6B6B] hover:bg-[#fa5b5b] text-white font-bold text-[11px] py-1.5 px-2 rounded-lg shadow-xs transition-transform active:scale-98 text-center truncate"
                      title={isTransit ? 'Book Taxi Pickup' : 'Arrange Scooter'}
                    >
                      <MessageCircle className="w-3 h-3 fill-white text-[#FF6B6B] shrink-0" />
                      <span className="truncate">{isTransit ? 'Book Cab' : 'Rent Scooter'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Local FAQs Section (Accordion UI) */}
        <div id="faq" className="max-w-4xl mx-auto pt-6 border-t border-stone-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 bg-[#0F2C59]/10 text-[#0F2C59] px-3.5 py-1 rounded-full text-xs font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Traveler Information</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F2C59]">
              Frequently Asked Questions (Goa Travel Guide)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-normal">
              Practical guidance on couple check-in, honeymoon setups, and local scooter rentals.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="bg-[#FAFAFA] rounded-2xl border border-stone-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-semibold text-[#0F2C59] text-sm sm:text-base hover:text-blue-900 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-full bg-white border border-stone-200 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0F2C59]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 pt-3 animate-in fade-in duration-150 font-normal">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
