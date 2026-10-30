'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Sparkles,
  Heart,
  Calendar,
  Users,
  Phone,
  Search,
  Filter,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Clock,
  Home,
  Image as ImageIcon,
  BookOpen,
  FileText,
  AlertCircle,
  Eye,
  Check,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { HOTEL_PHONE_DISPLAY } from '@/lib/whatsapp';

type AdminTab = 'inquiries' | 'gallery' | 'homepage' | 'about_us';

interface InquiryItem {
  _id: string;
  name?: string;
  phone?: string;
  email?: string;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  specialRequest?: string;
  romanticDecor?: boolean;
  status?: 'new' | 'contacted' | 'booked' | 'archived';
  source?: string;
  createdAt?: string;
}

interface GalleryDoc {
  id: string;
  url: string;
  title: string;
  caption?: string;
  tag: string;
  date?: string;
}

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('admingoa');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('inquiries');

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // Gallery State
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryDoc[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoTag, setNewPhotoTag] = useState('Honeymoon & Event Decor');
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [galleryMsg, setGalleryMsg] = useState<string | null>(null);

  // Content State
  const [contentLoading, setContentLoading] = useState(false);
  const [contentSaving, setContentSaving] = useState(false);
  const [contentMsg, setContentMsg] = useState<string | null>(null);

  const [homeContent, setHomeContent] = useState({
    announcementText: '⚡ Direct Booking Desk: Best Rates Guaranteed · Save 15% · 100% Couple Friendly Stay',
    heroTitle: 'Designed for Comfort, Rest & Romance in North Goa',
    heroSubtitle: 'Escape to a serene boutique sanctuary just 450 meters from Calangute Beach. Enjoy authentic Bengali cuisine, romantic honeymoon bed setups, and heartfelt coastal hospitality.',
    beachDistance: '450 meters (5 mins walk to Calangute Beach)',
    phoneDisplay: HOTEL_PHONE_DISPLAY,
    whatsappResponseTime: 'Replies in < 2 minutes',
  });

  const [aboutContent, setAboutContent] = useState({
    storyTitle: "Where Bengal's Soulful Hospitality Meets Goa's Golden Shores",
    storyContent:
      'Hotel Sonar Bangla was envisioned as an intimate coastal sanctuary for discerning travelers, newlyweds, and families who appreciate heartfelt hospitality and culinary comfort. Situated just 450 meters from the golden sands of Calangute Beach, we blend serene coastal leisure with the warmth of Bengali culture.',
    cuisineHighlight:
      'From morning Koraishutir Kochuri to fresh coastal Bhetki Paturi, jumbo Chingri Malai Curry, and slow-simmered Kosha Mangsho, our kitchen prepares pure, homestyle food using authentic stone-ground spices.',
    locationHighlight:
      'Tucked away in a tranquil, tree-lined lane only a 5-minute stroll from Calangute Beach, yet moments away from vibrant beach shacks, scooter rentals, and North Goa nightlife.',
  });

  // Check Auth on Mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch Data Once Authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
      fetchGallery();
      fetchContent();
    }
  }, [isAuthenticated]);

  // Auth Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Authentication failed');
      }
    } catch {
      setLoginError('Network error while logging in');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } finally {
      setIsAuthenticated(false);
      setPassword('');
    }
  };

  // Inquiries Handlers
  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load inquiries', err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) =>
            inq._id === id ? { ...inq, status: newStatus as any } : inq
          )
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Gallery Handlers
  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && Array.isArray(data.photos)) {
        setGalleryPhotos(data.photos);
      }
    } catch (err) {
      console.error('Failed to load gallery', err);
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl || !newPhotoTitle) return;

    setIsAddingPhoto(true);
    setGalleryMsg(null);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: newPhotoUrl,
          title: newPhotoTitle,
          caption: newPhotoCaption || newPhotoTitle,
          tag: newPhotoTag,
        }),
      });
      const data = await res.json();
      if (data.success && data.photo) {
        setGalleryPhotos((prev) => [data.photo, ...prev]);
        setNewPhotoUrl('');
        setNewPhotoTitle('');
        setNewPhotoCaption('');
        setGalleryMsg('✓ Photo published to MongoDB gallery!');
        setTimeout(() => setGalleryMsg(null), 3500);
      } else {
        setGalleryMsg(`Error: ${data.message}`);
      }
    } catch (err: any) {
      setGalleryMsg(`Error: ${err.message}`);
    } finally {
      setIsAddingPhoto(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo from the MongoDB gallery?')) return;

    try {
      const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  // Content Handlers
  const fetchContent = async () => {
    setContentLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success && data.content) {
        if (data.content.homepage) setHomeContent(data.content.homepage);
        if (data.content.about_us) setAboutContent(data.content.about_us);
      }
    } catch (err) {
      console.error('Failed to load site content', err);
    } finally {
      setContentLoading(false);
    }
  };

  const handleSaveHomeContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setContentSaving(true);
    setContentMsg(null);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'homepage', data: homeContent }),
      });
      const data = await res.json();
      if (data.success) {
        setContentMsg('✓ Home page content saved to MongoDB!');
        setTimeout(() => setContentMsg(null), 4000);
      }
    } finally {
      setContentSaving(false);
    }
  };

  const handleSaveAboutContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setContentSaving(true);
    setContentMsg(null);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'about_us', data: aboutContent }),
      });
      const data = await res.json();
      if (data.success) {
        setContentMsg('✓ About Us content saved to MongoDB!');
        setTimeout(() => setContentMsg(null), 4000);
      }
    } finally {
      setContentSaving(false);
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus =
      inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const query = inquirySearch.toLowerCase();
    const matchesSearch =
      !query ||
      inq.name?.toLowerCase().includes(query) ||
      inq.phone?.toLowerCase().includes(query) ||
      inq.roomType?.toLowerCase().includes(query) ||
      inq.specialRequest?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  // Render Login Card if not authenticated
  if (isAuthenticated === false) {
    return (
      <main className="min-h-screen bg-stone-950 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#0F2C59] border border-blue-400/30 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-[#E5A93C]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Hotel Sonar Bangla
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Direct Desk &amp; Content Management Portal
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MongoDB Connected</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-[#E5A93C]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-[#E5A93C]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#E5A93C] hover:bg-[#d89c32] text-stone-950 font-bold py-3 rounded-xl transition-all text-sm mt-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? 'Verifying Credentials...' : 'Sign In to Admin Portal'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-stone-800 text-center">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-white transition-colors"
            >
              ← Back to Hotel Sonar Bangla Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Loading State
  if (isAuthenticated === null) {
    return (
      <main className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-300">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E5A93C]" />
          <span className="text-sm font-semibold">Loading Admin Dashboard...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F5F2] flex flex-col font-sans">
      {/* Top Professional Header Bar */}
      <header className="bg-[#0F2C59] text-white border-b border-blue-950 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" variant="light" />
            <span className="hidden sm:inline-block w-px h-6 bg-blue-900" />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold tracking-wider text-[#E5A93C] uppercase">
                Hotel Concierge &amp; CMS Backoffice
              </span>
              <span className="text-[11px] text-stone-300">
                Connected to MongoDB Cluster0 · Calangute Beach, Goa
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-stone-300" />
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-500/30 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* Metric Cards Banner (Mobbin Pattern) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
              Total Inquiries
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0F2C59]">
                {inquiries.length}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                MongoDB Synced
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
              New Leads
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FF6B6B]">
                {newInquiriesCount}
              </span>
              {newInquiriesCount > 0 ? (
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full animate-pulse">
                  Action Required
                </span>
              ) : (
                <span className="text-xs font-semibold text-stone-400">All cleared</span>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
              Gallery Photos
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0F2C59]">
                {galleryPhotos.length}
              </span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Active in Cloud
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
              Email Notifications
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Active via Gmail
              </span>
              <span className="text-[10px] text-stone-400">meetkhetani1111</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation (Mobbin Clean Pills) */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-[#0F2C59] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <FileText className="w-4 h-4 text-[#E5A93C]" />
            <span>Guest Inquiries</span>
            {newInquiriesCount > 0 && (
              <span className="bg-[#FF6B6B] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {newInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#0F2C59] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#E5A93C]" />
            <span>Gallery Photos ({galleryPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'homepage'
                ? 'bg-[#0F2C59] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Home className="w-4 h-4 text-[#E5A93C]" />
            <span>Home Page Content</span>
          </button>

          <button
            onClick={() => setActiveTab('about_us')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'about_us'
                ? 'bg-[#0F2C59] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#E5A93C]" />
            <span>About Us &amp; Story</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <section className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'new', 'contacted', 'booked', 'archived'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setInquiryStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                      inquiryStatusFilter === status
                        ? 'bg-[#0F2C59] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-1 sm:flex-initial min-w-[220px]">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, room..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  />
                </div>
                <button
                  onClick={fetchInquiries}
                  className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Refresh Inquiries"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${inquiriesLoading ? 'animate-spin' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Inquiries List */}
            {inquiriesLoading ? (
              <div className="bg-white rounded-2xl p-12 text-center text-stone-500 border border-stone-200">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0F2C59] mb-2" />
                <p className="text-sm font-semibold">Loading real-time inquiries from MongoDB...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-stone-500 border border-stone-200">
                <FileText className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                <p className="text-sm font-semibold text-stone-700">No inquiries match your criteria</p>
                <p className="text-xs text-stone-400 mt-1">
                  When guests submit inquiry forms on the website, they appear here instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInquiries.map((inq) => {
                  const cleanPhone = inq.phone ? inq.phone.replace(/[^\d+]/g, '') : '';
                  const guestWhatsAppHref = cleanPhone
                    ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
                        `Hello ${inq.name || 'Guest'}, this is Hotel Sonar Bangla Calangute Goa regarding your booking inquiry for ${inq.roomType || 'room'}. We would be happy to confirm availability and exclusive direct rates for you!`
                      )}`
                    : null;

                  return (
                    <div
                      key={inq._id}
                      className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all hover:border-stone-300"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-serif font-bold text-base sm:text-lg text-[#0F2C59]">
                            {inq.name || 'Anonymous Guest'}
                          </span>

                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              inq.status === 'new'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : inq.status === 'contacted'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : inq.status === 'booked'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {inq.status || 'new'}
                          </span>

                          {inq.romanticDecor && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                              <Heart className="w-3 h-3 text-[#FF6B6B] fill-[#FF6B6B]" />
                              <span>Honeymoon Bed Decor</span>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600">
                          <span className="font-semibold text-stone-900">
                            🏨 {inq.roomType || 'Couple / Duo Room'}
                          </span>
                          <span>
                            📅 {inq.checkIn || 'TBD'} → {inq.checkOut || 'TBD'}
                          </span>
                          <span>👥 {inq.guests || '2 Guests'}</span>
                          {inq.phone && inq.phone !== 'Not provided' && (
                            <span>📞 {inq.phone}</span>
                          )}
                        </div>

                        {inq.specialRequest && (
                          <p className="text-xs text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-100 italic">
                            &ldquo;{inq.specialRequest}&rdquo;
                          </p>
                        )}

                        <div className="text-[11px] text-stone-400">
                          Source: {inq.source || 'Website'} ·{' '}
                          {inq.createdAt
                            ? new Date(inq.createdAt).toLocaleString('en-IN', {
                                timeZone: 'Asia/Kolkata',
                              })
                            : 'Recent'}
                        </div>
                      </div>

                      {/* Right Column: Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-100 shrink-0">
                        {/* Status Select */}
                        <select
                          value={inq.status || 'new'}
                          onChange={(e) =>
                            handleUpdateInquiryStatus(inq._id, e.target.value)
                          }
                          className="text-xs bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-2 font-semibold text-stone-800 cursor-pointer focus:ring-1 focus:ring-[#0F2C59]"
                        >
                          <option value="new">Mark as New</option>
                          <option value="contacted">Mark as Contacted</option>
                          <option value="booked">Mark as Booked</option>
                          <option value="archived">Mark as Archived</option>
                        </select>

                        {/* WhatsApp Guest */}
                        {guestWhatsAppHref && (
                          <a
                            href={guestWhatsAppHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xs transition-transform active:scale-95"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                            <span>WhatsApp Guest</span>
                          </a>
                        )}

                        {/* Call Guest */}
                        {cleanPhone && (
                          <a
                            href={`tel:${cleanPhone}`}
                            className="inline-flex items-center gap-1.5 bg-[#0F2C59] hover:bg-[#12366e] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#E5A93C]" />
                            <span>Call</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: GALLERY PHOTOS MANAGEMENT */}
        {activeTab === 'gallery' && (
          <section className="space-y-6">
            {/* Add Photo Card */}
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-6">
              <h2 className="font-serif font-bold text-lg text-[#0F2C59] mb-1">
                Add New Photo to MongoDB Gallery
              </h2>
              <p className="text-xs text-stone-500 mb-4">
                Enter an image URL (e.g. Unsplash, Cloudinary, AWS S3) to immediately publish to the live Goa Moments gallery.
              </p>

              {galleryMsg && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold mb-4 ${
                    galleryMsg.startsWith('✓')
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {galleryMsg}
                </div>
              )}

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Image URL (Direct Image Link) *
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Photo Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Honeymoon Candlelight Bed Art &amp; Swans"
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Category Tag
                    </label>
                    <select
                      value={newPhotoTag}
                      onChange={(e) => setNewPhotoTag(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59] cursor-pointer"
                    >
                      <option value="Honeymoon & Event Decor">🌹 Honeymoon &amp; Event Decor</option>
                      <option value="Daily Guest Moments">📸 Daily Guest Moments</option>
                      <option value="Bengali Dining & Cuisine">🍲 Bengali Dining &amp; Cuisine</option>
                      <option value="Room Views">🛏️ Room Views &amp; Sanctuaries</option>
                      <option value="Goa Vibe">🌊 Calangute Beach &amp; Goa Vibe</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Caption / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fresh rose petals hand-arranged for anniversary guests."
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                    />
                  </div>
                </div>

                {/* Instant Image Preview */}
                {newPhotoUrl && (
                  <div className="relative aspect-16/9 max-w-sm rounded-xl overflow-hidden bg-stone-100 border border-stone-300 shadow-inner">
                    <Image
                      src={newPhotoUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <span className="absolute bottom-2 left-2 bg-stone-950/80 text-white text-[10px] px-2 py-0.5 rounded-md">
                      Live Preview
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAddingPhoto}
                  className="inline-flex items-center gap-2 bg-[#0F2C59] hover:bg-[#12366e] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 text-[#E5A93C]" />
                  <span>{isAddingPhoto ? 'Saving to Database...' : 'Save & Publish Photo'}</span>
                </button>
              </form>
            </div>

            {/* Gallery Photos Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-base text-[#0F2C59]">
                  Live MongoDB Gallery Photos ({galleryPhotos.length})
                </h3>
                <button
                  onClick={fetchGallery}
                  className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${galleryLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {galleryLoading ? (
                <div className="bg-white rounded-2xl p-10 text-center text-stone-500 border border-stone-200">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0F2C59] mb-2" />
                  <p className="text-sm">Fetching gallery photos...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
                    >
                      <div className="relative aspect-4/3 w-full bg-stone-900 overflow-hidden">
                        <Image
                          src={photo.url}
                          alt={photo.title}
                          fill
                          sizes="(max-width: 600px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[#E5A93C] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {photo.tag}
                        </span>
                      </div>

                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-xs text-stone-900 line-clamp-1">
                            {photo.title}
                          </h4>
                          {photo.caption && (
                            <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                              {photo.caption}
                            </p>
                          )}
                        </div>

                        <div className="pt-2 mt-2 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-[10px] text-stone-400">
                            {photo.date || 'Active'}
                          </span>
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: HOME PAGE CONTENT */}
        {activeTab === 'homepage' && (
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-6 max-w-3xl">
            <h2 className="font-serif font-bold text-lg text-[#0F2C59] mb-1">
              Edit Live Home Page Content
            </h2>
            <p className="text-xs text-stone-500 mb-4">
              Update announcements, hero headlines, and customer response promises saved in MongoDB.
            </p>

            {contentMsg && (
              <div className="p-3 rounded-xl text-xs font-semibold mb-4 bg-emerald-50 text-emerald-800 border border-emerald-200">
                {contentMsg}
              </div>
            )}

            <form onSubmit={handleSaveHomeContent} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Top Announcement Strip Banner
                </label>
                <input
                  type="text"
                  value={homeContent.announcementText}
                  onChange={(e) =>
                    setHomeContent({ ...homeContent, announcementText: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Hero Main Headline (H1)
                </label>
                <input
                  type="text"
                  value={homeContent.heroTitle}
                  onChange={(e) =>
                    setHomeContent({ ...homeContent, heroTitle: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={homeContent.heroSubtitle}
                  onChange={(e) =>
                    setHomeContent({ ...homeContent, heroSubtitle: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Beach Distance Highlight
                  </label>
                  <input
                    type="text"
                    value={homeContent.beachDistance}
                    onChange={(e) =>
                      setHomeContent({ ...homeContent, beachDistance: e.target.value })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    WhatsApp Desk Promise
                  </label>
                  <input
                    type="text"
                    value={homeContent.whatsappResponseTime}
                    onChange={(e) =>
                      setHomeContent({
                        ...homeContent,
                        whatsappResponseTime: e.target.value,
                      })
                    }
                    className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={contentSaving}
                className="inline-flex items-center gap-2 bg-[#0F2C59] hover:bg-[#12366e] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-[#E5A93C]" />
                <span>{contentSaving ? 'Saving to Database...' : 'Save Home Page Content'}</span>
              </button>
            </form>
          </section>
        )}

        {/* TAB 4: ABOUT US CONTENT */}
        {activeTab === 'about_us' && (
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-6 max-w-3xl">
            <h2 className="font-serif font-bold text-lg text-[#0F2C59] mb-1">
              Edit About Us &amp; Hotel Narrative
            </h2>
            <p className="text-xs text-stone-500 mb-4">
              Update the hotel story, Bengali culinary heritage narrative, and Calangute location description in MongoDB.
            </p>

            {contentMsg && (
              <div className="p-3 rounded-xl text-xs font-semibold mb-4 bg-emerald-50 text-emerald-800 border border-emerald-200">
                {contentMsg}
              </div>
            )}

            <form onSubmit={handleSaveAboutContent} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Story Headline
                </label>
                <input
                  type="text"
                  value={aboutContent.storyTitle}
                  onChange={(e) =>
                    setAboutContent({ ...aboutContent, storyTitle: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Hotel Story &amp; Heritage Narrative
                </label>
                <textarea
                  rows={4}
                  value={aboutContent.storyContent}
                  onChange={(e) =>
                    setAboutContent({ ...aboutContent, storyContent: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Bengali Cuisine &amp; Dining Highlight
                </label>
                <textarea
                  rows={3}
                  value={aboutContent.cuisineHighlight}
                  onChange={(e) =>
                    setAboutContent({ ...aboutContent, cuisineHighlight: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Calangute Beach Location Highlight
                </label>
                <textarea
                  rows={3}
                  value={aboutContent.locationHighlight}
                  onChange={(e) =>
                    setAboutContent({ ...aboutContent, locationHighlight: e.target.value })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#0F2C59]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={contentSaving}
                className="inline-flex items-center gap-2 bg-[#0F2C59] hover:bg-[#12366e] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-[#E5A93C]" />
                <span>{contentSaving ? 'Saving to Database...' : 'Save About Us Content'}</span>
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

