'use client';

import { Phone, MapPin } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { buildCallUrl, buildWhatsAppUrl, GOOGLE_MAPS_LINK } from '@/lib/whatsapp';

export default function StickyMobileBar() {
  return (
    <aside
      aria-label="Quick mobile contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-stone-200 px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-[calc(0.65rem+env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto items-center">
        {/* 1. Call Reception */}
        <a
          href={buildCallUrl()}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAFAFA] active:bg-stone-100 text-[#0F2C59] transition-colors border border-stone-200"
          aria-label="Call Hotel Sonar Bangla Reception directly"
        >
          <Phone className="w-4 h-4 text-[#0F2C59] mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Call Reception</span>
        </a>

        {/* 2. WhatsApp Inquiry (Highlighted Official WhatsApp Green) */}
        <a
          href={buildWhatsAppUrl({ source: 'sticky_bottom_bar' })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366] active:bg-[#20ba59] text-white shadow-md transition-transform active:scale-98"
          aria-label="Inquire on WhatsApp with Hotel Concierge"
        >
          <div className="flex items-center gap-1 mb-0.5">
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
          <span className="text-[11px] font-bold tracking-tight">WhatsApp Inquiry</span>
        </a>

        {/* 3. Map */}
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#FAFAFA] active:bg-stone-100 text-[#0F2C59] transition-colors border border-stone-200"
          aria-label="Open Hotel Sonar Bangla location in Google Maps"
        >
          <MapPin className="w-4 h-4 text-[#E5A93C] mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Map</span>
        </a>
      </div>
    </aside>
  );
}

