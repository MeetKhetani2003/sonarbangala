'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { NEARBY_ATTRACTIONS, FAQS } from '@/data/hotelData';
import { AttractionProximity } from '@/types/hotel';
import { GOOGLE_MAPS_LINK, HOTEL_ADDRESS } from '@/lib/whatsapp';

export default function LocationNearby() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const getAttractionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-sky-600" />;
      case 'Sunset':
        return <Sunset className="w-5 h-5 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-rose-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-600" />;
      case 'Plane':
        return <Plane className="w-5 h-5 text-indigo-600" />;
      case 'Train':
        return <Train className="w-5 h-5 text-purple-600" />;
      default:
        return <MapPin className="w-5 h-5 text-amber-600" />;
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            Prime North Goa Location
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            Location, Proximity &amp; Nearby Hotspots
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Nestled on the prime Calangute-Baga corridor, Hotel Sonar Bangla places you within
            a comfortable 5-minute stroll to the beach shacks, water sports, and late-night music clubs.
          </p>
        </div>

        {/* Map & Address Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Map Embed Container */}
          <div className="lg:col-span-7 bg-stone-100 rounded-3xl overflow-hidden border border-stone-200 shadow-md relative aspect-16/10 sm:aspect-16/9 lg:aspect-auto lg:h-[420px]">
            <iframe
              title="Hotel Sonar Bangla Goa Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15378.140816990425!2d73.74868774783307!3d15.543501255562723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc158864b4c73%3A0xe53be0a68434a9b4!2sCalangute%20Beach!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            {/* Map Overlay Button */}
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md hover:bg-white text-stone-900 font-semibold text-xs py-2.5 px-4 rounded-xl shadow-lg border border-stone-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>Get Turn-by-Turn GPS Directions</span>
            </a>
          </div>

          {/* Location Summary Card */}
          <div className="lg:col-span-5 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                Hotel Address &amp; Landmarks
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-3">
                Hotel Sonar Bangla Goa
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                {HOTEL_ADDRESS}
              </p>

              {/* Quick Perks */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-stone-200/80">
                  <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">450m Walk to Calangute Beach</h4>
                    <p className="text-[11px] text-stone-500">Walk directly down the beach lane with zero traffic hassle.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3 rounded-xl border border-stone-200/80">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Scooter &amp; Bike Hub at Gate</h4>
                    <p className="text-[11px] text-stone-500">Activa &amp; Thar rentals delivered directly to the reception.</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition-colors"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Proximity Distance Guide (Grid Layout) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Proximity &amp; Distance Guide
            </h3>
            <span className="text-xs text-stone-500 font-medium">Estimated travel times</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEARBY_ATTRACTIONS.map((attraction: AttractionProximity) => (
              <div
                key={attraction.id}
                className="bg-stone-50 hover:bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white group-hover:bg-stone-100 border border-stone-200 transition-colors">
                      {getAttractionIcon(attraction.icon)}
                    </div>
                    <span className="text-xs font-bold text-stone-900 bg-white px-2.5 py-1 rounded-full border border-stone-200 shadow-2xs">
                      {attraction.distance}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-stone-900 mb-1 group-hover:text-amber-800 transition-colors">
                    {attraction.name}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {attraction.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{attraction.travelTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local FAQs Section (Accordion UI) */}
        <div id="faq" className="max-w-4xl mx-auto pt-6 border-t border-stone-200">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              Traveler Information
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Frequently Asked Questions (Goa Travel Guide)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Have questions about couple check-in, honeymoon setups, or bike rentals? We have answers.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-stone-900 text-sm sm:text-base hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-full bg-white border border-stone-200 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 pt-3 animate-in fade-in duration-150">
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

