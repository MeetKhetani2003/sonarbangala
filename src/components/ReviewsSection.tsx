'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Star,
  ShieldCheck,
  Award,
  HeartHandshake,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { ReviewItem } from '@/types/hotel';
import { INITIAL_REVIEWS } from '@/data/hotelData';
import { GOOGLE_MAPS_LINK } from '@/lib/whatsapp';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [overallRating, setOverallRating] = useState<number>(4.85);
  const [totalReviews, setTotalReviews] = useState<number>(128);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          if (data.overallRating) setOverallRating(data.overallRating);
          if (data.totalReviews) setTotalReviews(data.totalReviews);
        }
      } catch (err) {
        console.error('Failed to load live reviews:', err);
      }
    }
    loadReviews();
  }, []);

  const filterOptions = ['All', 'Couple', 'Family', 'Solo'];

  const filteredReviews =
    selectedCategoryFilter === 'All'
      ? reviews
      : reviews.filter((r) => r.travelerType === selectedCategoryFilter);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Trust Badges Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0F2C59] px-3.5 py-1 rounded-full text-xs font-bold mb-3 border border-blue-200">
            <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
            Live Verified Google Ratings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2C59] tracking-tight mb-4">
            Guest Experiences &amp; Social Proof
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Ranked among the most trusted stays in Calangute &amp; North Goa. Read authentic feedback
            from couples, honeymooners, and family vacationers.
          </p>
        </div>

        {/* High-Trust Hero Score Box (Mobbin Hospitality Pattern) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Score Column */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-stone-200 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-serif text-5xl sm:text-6xl font-bold text-[#0F2C59]">
                  {overallRating.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center gap-1 text-[#E5A93C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#E5A93C] text-[#E5A93C]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#0F2C59] bg-blue-50 px-2 py-0.5 rounded-md mt-1 inline-block border border-blue-200">
                    ★ 4.5+ Rating on Google Maps
                  </span>
                </div>
              </div>

              <p className="text-sm text-stone-600 mb-3">
                Based on <strong className="text-stone-900">{totalReviews}+ Verified Guest Reviews</strong> across Google Places &amp; Direct Concierge Stays.
              </p>

              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2C59] hover:text-blue-900 hover:underline"
              >
                <span>View Google Maps Business Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right Trust Badges Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Badge 1 */}
              <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-stone-200/70 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F2C59] text-xs sm:text-sm mb-1">
                  100% Couple Friendly
                </h4>
                <p className="text-[11px] text-stone-500">
                  Zero judgment, private balconies, hassle-free ID check-in.
                </p>
              </div>

              {/* Badge 2 */}
              <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-stone-200/70 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0F2C59] mb-2.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F2C59] text-xs sm:text-sm mb-1">
                  24/7 Security &amp; Hygiene
                </h4>
                <p className="text-[11px] text-stone-500">
                  Daily sanitized rooms, CCTV surveillance &amp; locked gates.
                </p>
              </div>

              {/* Badge 3 */}
              <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-stone-200/70 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#E5A93C] mb-2.5">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F2C59] text-xs sm:text-sm mb-1">
                  Best Rate Guarantee
                </h4>
                <p className="text-[11px] text-stone-500">
                  Direct WhatsApp rates beat all OTA commission prices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Traveler Type Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-stone-500 mr-2">Filter Reviews:</span>
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedCategoryFilter(opt)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategoryFilter === opt
                  ? 'bg-[#0F2C59] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {review.authorPhoto ? (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-stone-200">
                        <Image
                          src={review.authorPhoto}
                          alt={review.authorName}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center shrink-0">
                        {review.authorName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {review.authorName}
                      </h4>
                      <span className="text-[11px] text-stone-500 block">
                        {review.stayContext}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-stone-400 shrink-0">
                    {review.relativeTime}
                  </span>
                </div>

                {/* Stars Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(review.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-stone-700 ml-1.5">
                    {review.rating.toFixed(1)} / 5.0
                  </span>
                </div>

                {/* Feedback Comment */}
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>

                {/* Resort Management Response */}
                {review.hotelResponse && (
                  <div className="bg-stone-50 rounded-xl p-3 border-l-3 border-amber-600 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 text-stone-800 font-semibold mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                      <span>Resort Manager Response</span>
                      <span className="text-stone-400 font-normal">({review.hotelResponse.date})</span>
                    </div>
                    <p className="text-stone-600 italic">
                      &ldquo;{review.hotelResponse.text}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer: Verified Badge & Helpful Count */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Google Review
                </span>

                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-stone-400" />
                  {review.helpfulCount} people found this helpful
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

