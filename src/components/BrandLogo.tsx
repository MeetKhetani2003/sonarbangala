'use client';

import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
}

export default function BrandLogo({
  variant = 'dark',
  size = 'md',
}: BrandLogoProps) {
  const isLight = variant === 'light';

  // Proportional height & width mapping matching 482x108 aspect ratio (4.46)
  const sizeMap = {
    sm: { height: 34, width: 152 },
    md: { height: 42, width: 188 },
    lg: { height: 50, width: 224 },
  };

  const { height, width } = sizeMap[size];

  return (
    <Link
      href="/"
      className="inline-flex items-center group select-none transition-transform duration-200 active:scale-98"
      aria-label="Hotel Sonar Bangla Goa Homepage"
    >
      <div
        className="relative shrink-0"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Image
          src={isLight ? '/images/logo-horizontal-white.png' : '/images/logo-horizontal.png'}
          alt="Hotel Sonar Bangla - Goa Near Beach"
          fill
          priority
          sizes="(max-width: 768px) 152px, 224px"
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
