'use client';

import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function FloatingWhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = buildWhatsAppUrl({
    specialRequest: 'Hello Hotel Sonar Bangla Concierge! I am on your website and would like to inquire about room availability & direct rates.',
    source: 'floating_whatsapp_button',
  });

  return (
    <aside
      aria-label="WhatsApp Concierge Chat"
      className="fixed bottom-22 sm:bottom-7 right-5 z-40 flex items-center gap-3 select-none"
    >
      {/* Tooltip / Speech Bubble */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-stone-900/90 text-white text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl border border-stone-700/60 backdrop-blur-md transition-all duration-300 origin-right ${
          isHovered
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 translate-x-3 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Chat with Concierge · <span className="text-[#E5A93C]">Replies &lt; 2 min</span></span>
      </div>

      {/* Main Circular WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] text-white shadow-2xl hover:shadow-[0_10px_25px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Direct WhatsApp Concierge Chat"
      >
        {/* Radar Ping Animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />

        {/* Real Official WhatsApp Icon */}
        <WhatsAppIcon className="w-8 h-8 relative z-10 fill-white drop-shadow-sm transition-transform duration-300 group-hover:rotate-6" />

        {/* Live Notification Indicator */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 text-[9px] font-bold text-white items-center justify-center shadow-xs">
            1
          </span>
        </span>
      </a>
    </aside>
  );
}

