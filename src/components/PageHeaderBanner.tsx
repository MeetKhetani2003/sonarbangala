'use client';

import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';

export interface PageHeaderHighlight {
  icon?: React.ReactNode;
  label: string;
}

export interface PageHeaderBannerProps {
  breadcrumbLabel: string;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle: string;
  backgroundImage: string;
  highlights?: PageHeaderHighlight[];
  actions?: React.ReactNode;
}

export default function PageHeaderBanner({
  breadcrumbLabel,
  badgeText,
  badgeIcon,
  title,
  subtitle,
  backgroundImage,
  highlights = [],
  actions,
}: PageHeaderBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-stone-950 text-white py-16 sm:py-20 lg:py-24 border-b border-stone-800">
      {/* Background Photography with Ambient Controlled Tints (Zero Gradients) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out scale-103"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[#0F2C59]/40" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Breadcrumb Glass Capsule */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-medium text-stone-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#E5A93C] font-semibold">{breadcrumbLabel}</span>
          </div>
        </nav>

        {/* Editorial Pill Badge */}
        {badgeText && (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5A93C] bg-[#0F2C59]/90 border border-blue-400/30 px-3.5 py-1 rounded-full mb-3 shadow-xs">
            {badgeIcon || <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />}
            <span>{badgeText}</span>
          </div>
        )}

        {/* Authoritative Editorial H1 */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4 leading-[1.12]">
          {title}
        </h1>

        {/* Hospitable Descriptive Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-stone-200 font-normal leading-relaxed mb-6">
          {subtitle}
        </p>

        {/* Quick Highlights Strip (Mobbin Value Ribbon) */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {highlights.map((h, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 bg-black/45 backdrop-blur-md text-stone-200 text-xs px-3 py-1 rounded-full border border-white/15 font-medium"
              >
                {h.icon}
                <span>{h.label}</span>
              </span>
            ))}
          </div>
        )}

        {/* Optional Action CTA Group */}
        {actions && <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>}
      </div>
    </section>
  );
}

