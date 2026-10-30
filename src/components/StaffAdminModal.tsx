'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Camera,
  UploadCloud,
  CheckCircle,
  Tag,
  Sparkles,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { GalleryPhoto } from '@/types/hotel';

interface StaffAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoUploaded: (photo: GalleryPhoto) => void;
}

export default function StaffAdminModal({
  isOpen,
  onClose,
  onPhotoUploaded,
}: StaffAdminModalProps) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [tag, setTag] = useState<
    'Honeymoon & Event Decor' | 'Daily Guest Moments' | 'Room Views' | 'Goa Vibe'
  >('Honeymoon & Event Decor');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  if (!isOpen) return null;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhotoUrl(val);
    setPreviewUrl(val);
  };

  const handleQuickPreset = (presetTitle: string, presetCaption: string, presetTag: typeof tag) => {
    setTitle(presetTitle);
    setCaption(presetCaption);
    setTag(presetTag);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl) {
      setStatusMessage({ type: 'error', text: 'Please enter an image URL.' });
      return;
    }
    if (!title) {
      setStatusMessage({ type: 'error', text: 'Please enter a photo title.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: photoUrl,
          title,
          caption,
          tag,
        }),
      });

      const data = await res.json();
      if (data.success && data.photo) {
        onPhotoUploaded(data.photo);
        setStatusMessage({
          type: 'success',
          text: '✓ Photo uploaded and published to MongoDB Goa Moments gallery!',
        });
        setTimeout(() => {
          onClose();
          setPhotoUrl('');
          setTitle('');
          setCaption('');
          setPreviewUrl(null);
          setStatusMessage(null);
        }, 1500);
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Failed to save photo to database',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Network error publishing photo',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-blue-950 flex items-center justify-between bg-[#0F2C59] text-white rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <Camera className="w-5 h-5 text-[#E5A93C]" />
            <div>
              <h3 className="font-serif font-semibold text-lg text-white">
                Hotel Staff Quick Portal
              </h3>
              <p className="text-xs text-stone-200">
                Connected directly to MongoDB Gallery &amp; Inquiries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {/* Direct Link to Professional Admin Dashboard */}
          <div className="bg-[#0F2C59]/10 border border-[#0F2C59]/20 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#0F2C59]" />
              <div className="text-xs">
                <span className="font-bold text-[#0F2C59] block">Full Backoffice Available</span>
                <span className="text-stone-600">Manage inquiries, home &amp; about content</span>
              </div>
            </div>
            <Link
              href="/admin"
              onClick={onClose}
              className="inline-flex items-center gap-1 bg-[#0F2C59] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs hover:bg-[#12366e] transition-colors"
            >
              <span>Open Admin</span>
              <ExternalLink className="w-3 h-3 text-[#E5A93C]" />
            </Link>
          </div>

          {/* Image URL Input */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              1. Image URL (Direct Cloud/CDN Image Link)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={photoUrl}
              onChange={handleUrlChange}
              className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
              required
            />
          </div>

          {/* Image Preview Box */}
          {previewUrl && (
            <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-300">
              <Image
                src={previewUrl}
                alt="Upload preview"
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                className="object-cover"
                unoptimized
              />
              <span className="absolute bottom-2 right-2 bg-stone-900/80 text-white text-[10px] px-2 py-0.5 rounded-md">
                Live Preview
              </span>
            </div>
          )}

          {/* Quick Preset Buttons for Staff */}
          <div>
            <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
              Quick 1-Click Title Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleQuickPreset(
                    'Anniversary Rose & Candlelight Bed Setup',
                    'Curated romantic bed decoration setup for arriving couple.',
                    'Honeymoon & Event Decor'
                  )
                }
                className="text-[11px] bg-rose-50 text-rose-800 border border-rose-200 px-2 py-1 rounded-lg hover:bg-rose-100 cursor-pointer"
              >
                🌹 Romantic Bed Decor
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickPreset(
                    'Fresh Coastal Seafood & Bengali Dining',
                    'Daily fresh catch Bhetki Paturi & authentic Bengali lunch platter.',
                    'Daily Guest Moments'
                  )
                }
                className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-1 rounded-lg hover:bg-amber-100 cursor-pointer"
              >
                🍲 Bengali Seafood Feast
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickPreset(
                    'Sunny Morning Stroll to Calangute Beach',
                    '5 minutes walk from hotel gate directly to the golden sand shoreline.',
                    'Goa Vibe'
                  )
                }
                className="text-[11px] bg-sky-50 text-sky-800 border border-sky-200 px-2 py-1 rounded-lg hover:bg-sky-100 cursor-pointer"
              >
                🌊 Calangute Beach 450m
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              2. Photo Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Honeymoon Candlelight Swan Bed Art"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
              required
            />
          </div>

          {/* Tag Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              3. Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  'Honeymoon & Event Decor',
                  'Daily Guest Moments',
                  'Room Views',
                  'Goa Vibe',
                ] as const
              ).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={`text-xs py-2 px-3 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                    tag === t
                      ? 'bg-[#0F2C59] text-white border-[#0F2C59] shadow-2xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              4. Caption / Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Prepared with fresh red roses, scented candles, and celebratory sparkling juice."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
            />
          </div>

          {/* Publish Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#0F2C59] hover:bg-[#12366e] text-white font-medium py-3 px-4 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing to MongoDB...</span>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-[#E5A93C]" />
                  <span>Publish 1-Click to Goa Moments</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
