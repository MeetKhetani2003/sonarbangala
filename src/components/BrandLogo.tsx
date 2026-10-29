'use client';

import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
}

export default function BrandLogo({
  variant = 'dark',
  size = 'md',
  showSubtext = true,
}: BrandLogoProps) {
  const isLight = variant === 'light';

  const emblemSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-sm font-semibold',
    md: 'text-base sm:text-lg font-semibold',
    lg: 'text-xl sm:text-2xl font-semibold',
  };

  const subtextSizes = {
    sm: 'text-[9px] tracking-[0.22em]',
    md: 'text-[10px] tracking-[0.24em]',
    lg: 'text-[11px] tracking-[0.28em]',
  };

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
      {/* Modern Coastal Luxury Monogram Crest */}
      <div
        className={`${emblemSizes[size]} rounded-xl ${
          isLight ? 'bg-[#0A1E3D] border border-blue-900/60' : 'bg-[#0F2C59] border border-[#0F2C59]'
        } flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-102 shadow-xs`}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-3/5 h-3/5 text-[#E5A93C]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Crest Outline */}
          <path
            d="M12 28C10 22 13 14 24 10C35 14 38 22 36 28C34 34 29 38 24 40C19 38 14 34 12 28Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          {/* Monogram S */}
          <path
            d="M20 18C20 16 22 15 24 15C26.5 15 28 16.2 28 18C28 20 25.5 21 23 22C20 23.2 18 25 18 28C18 31 20.5 33 24 33C27 33 29 31.5 29 29.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle Star/Sun Accent */}
          <circle cx="24" cy="8" r="1.5" fill="currentColor" />
          <path d="M24 5V6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-serif tracking-tight leading-none transition-colors ${titleSizes[size]} ${
            isLight ? 'text-white' : 'text-[#0F2C59]'
          }`}
        >
          Hotel Sonar Bangla
        </span>
        {showSubtext && (
          <span
            className={`font-sans uppercase font-medium mt-1 ${subtextSizes[size]} ${
              isLight ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Goa · Near Beach
          </span>
        )}
      </div>
    </Link>
  );
}
