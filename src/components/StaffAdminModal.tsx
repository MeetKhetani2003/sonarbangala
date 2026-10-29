'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  X,
  Camera,
  UploadCloud,
  CheckCircle,
  Tag,
  Sparkles,
  Lock,
  ArrowRight,
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewUrl(base64);
        setPhotoUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

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
      setStatusMessage({ type: 'error', text: 'Please upload an image or provide an image URL.' });
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
          text: '✓ Photo uploaded and published to Goa Moments gallery!',
        });
        setTimeout(() => {
          onClose();
          // Reset form
          setPhotoUrl('');
          setPreviewUrl(null);
          setTitle('');
          setCaption('');
          setStatusMessage(null);
        }, 1500);
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Failed to upload photo.',
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'Network error while publishing photo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif font-bold text-lg sm:text-xl">
                  Staff Quick Photo Upload
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full">
                  1-Click CMS
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Instantly update the guest-facing Goa Moments gallery
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

          {/* Image Picker / Camera Upload */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              1. Take Photo or Select from Mobile Camera
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-amber-600 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-stone-50 hover:bg-amber-50/40"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-1.5">
                <UploadCloud className="w-8 h-8 text-amber-600" />
                <span className="text-xs font-semibold text-stone-800">
                  Tap to Open Camera or Photo Gallery
                </span>
                <span className="text-[11px] text-stone-500">
                  Supports JPG, PNG, WEBP (Auto-optimized)
                </span>
              </div>
            </div>

            {/* Or Image URL */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-stone-400 text-xs shrink-0">or enter image link:</span>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={photoUrl.startsWith('data:') ? '' : photoUrl}
                onChange={handleUrlChange}
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              />
            </div>
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
                    'Happy Family Check-in Welcome',
                    'Warm hospitality greeting with traditional welcome drink.',
                    'Daily Guest Moments'
                  )
                }
                className="text-[11px] bg-blue-50 text-blue-800 border border-blue-200 px-2 py-1 rounded-lg hover:bg-blue-100 cursor-pointer"
              >
                👨‍👩‍👧 Family Check-in
              </button>
              <button
                type="button"
                onClick={() =>
                  handleQuickPreset(
                    'Freshly Sanitized Executive Balcony Suite',
                    'Cleaned and prepared according to highest hygiene standards.',
                    'Room Views'
                  )
                }
                className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-lg hover:bg-emerald-100 cursor-pointer"
              >
                ✨ Sanitized Room
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              2. Photo Title / Setup Name
            </label>
            <input
              type="text"
              placeholder="e.g. Special Candlelight & Bed Decoration for Mr. & Mrs. Sharma"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
              required
            />
          </div>

          {/* Tag Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              3. Category Tag
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
                      ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
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
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Publish Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-amber-400 font-medium py-3.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing to Website...</span>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
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

