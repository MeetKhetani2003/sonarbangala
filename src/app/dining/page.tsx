'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';
import InquiryModal from '@/components/InquiryModal';
import StaffAdminModal from '@/components/StaffAdminModal';
import PageHeaderBanner from '@/components/PageHeaderBanner';
import {
  Utensils,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Clock,
  Heart,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export default function DiningPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const menuSections = [
    {
      title: 'Morning Bengali Breakfast Classics',
      timing: '8:00 AM – 10:30 AM',
      description: 'Hot, freshly puffed delicacies served with sweet coastal morning breezes.',
      items: [
        { name: 'Koraishutir Kochuri & Alur Dom', desc: 'Fluffy pea-stuffed bread with slow-simmered spiced potatoes', tag: 'Chef Signature' },
        { name: 'Luchi & Chholar Dal with Narkel', desc: 'Crispy golden puffed breads with aromatic Bengal gram lentil & fresh coconut flakes', tag: 'Guest Favorite' },
        { name: 'Dim Pao & Masala Omelette', desc: 'Local Goa pao bread with double egg herbs & green chillies' },
        { name: 'Mishti & Cha', desc: 'Warm traditional milk tea paired with Kolkata sandesh or roshogolla' },
      ],
    },
    {
      title: 'Fresh Coastal Seafood & Bengal Curries',
      timing: '1:00 PM – 3:30 PM & 7:30 PM – 10:45 PM',
      description: 'Prepared using daily fresh Goa Arabian Sea catch seasoned with authentic Kolkata spices.',
      items: [
        { name: 'Coastal Bhetki Paturi', desc: 'Fresh local sea bass coated in freshly stone-ground mustard paste, wrapped in banana leaf and gently pan-charred', tag: 'Must Try' },
        { name: 'Goa Gold Prawn (Chingri) Malai Curry', desc: 'Jumbo coastal prawns simmered in silky coconut milk cream, green cardamom, and subtle garam masala', tag: 'Signature' },
        { name: 'Shorshe Ilish (Seasonal / On Request)', desc: 'Precious Hilsa steaks gently simmered in yellow-black mustard emulsion with slit green chillies' },
        { name: 'Katla / Rui Machher Kalia', desc: 'Rich caramelized onion and raisin gravy with tender river carp' },
        { name: 'Traditional Kosha Mangsho & Basanti Pulao', desc: 'Slow-cooked velvety goat mutton in rich dark spices paired with fragrant sweet golden pulao' },
      ],
    },
    {
      title: 'Vegetarian Comfort & Homestyle Platters',
      timing: 'All Day Dining',
      description: 'Nourishing comfort food crafted just like home for families and traveling elders.',
      items: [
        { name: 'Traditional Shukto', desc: 'Gentle bittersweet vegetable stew with raw banana, drumsticks, and bori dumplings' },
        { name: 'Aloo Jhinge Posto', desc: 'Potatoes and ridge gourd slow-braised in creamy poppy seed paste with green chillies' },
        { name: 'Bhaja Moong Dal & Jhuri Aloo Bhaja', desc: 'Roasted yellow lentil soup with shredded crisp potato matchsticks and steamed Gobindobhog rice' },
        { name: 'Baby Food / Mild Khichuri (On Request)', desc: 'Salt-free or low-spice pureed vegetable khichdi prepared fresh for infants with loving care' },
      ],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Header
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* Rich Atmospheric Page Hero Banner */}
      <PageHeaderBanner
        breadcrumbLabel="Bengali Dining & Cuisine"
        badgeText="Heritage Culinary Traditions in Goa"
        badgeIcon={<Utensils className="w-3.5 h-3.5 text-[#E5A93C]" />}
        title="Taste of Bengal by the Arabian Sea"
        subtitle="Where Bengal's revered mustard marinades, tender Bhetki Paturi, and Sunday Kosha Mangsho meet fresh coastal Goa catch and beach breezes."
        backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85"
        highlights={[
          { icon: <Utensils className="w-3.5 h-3.5 text-[#E5A93C]" />, label: 'Authentic Bengali Homestyle Recipes' },
          { icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />, label: 'Fresh Arabian Sea Daily Catch' },
          { icon: <Flame className="w-3.5 h-3.5 text-[#FF6B6B]" />, label: 'Live Koraishuti Kochuri & Paturi' },
        ]}
        actions={
          <a
            href={buildWhatsAppUrl({
              specialRequest: 'Inquiring about in-house Bengali dining and customized meal requests',
              source: 'dining_hero',
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg transition-transform active:scale-98"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Connect with Chef &amp; Concierge on WhatsApp</span>
          </a>
        }
      />

      {/* Culinary Narrative & Menus */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 relative aspect-16/10 rounded-3xl overflow-hidden bg-stone-900 shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
              alt="Authentic Bengali Seafood Feast"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-amber-800 text-xs uppercase tracking-wider font-semibold">
              The Hotel Sonar Bangla Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight">
              A Home Away from Home for Every Bengali Food Lover
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
              While Goa is world-famous for its shacks and beach nightlife, travelers often miss comforting, authentic homestyle food. At Hotel Sonar Bangla, our in-house master chefs prepare soulful Bengali delicacies crafted with pure mustard oil, imported Panch Phoron, and daily coastal morning catches.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
              Whether you crave hot Luchis before heading to Calangute Beach or a decadent Bhetki Paturi dinner on your private balcony, every meal is prepared with warmth and reverence.
            </p>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="space-y-12 mb-20">
          {menuSections.map((sec) => (
            <div key={sec.title} className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 border-b border-stone-100 pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-stone-900">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-normal mt-0.5">{sec.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60 self-start sm:self-auto">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{sec.timing}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {sec.items.map((item) => (
                  <div key={item.name} className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-200/70 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-serif text-lg font-semibold text-stone-900">
                          {item.name}
                        </h4>
                        {item.tag && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full shrink-0">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-700 font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      <StickyMobileBar />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

      <StaffAdminModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onPhotoUploaded={() => {}}
      />
    </main>
  );
}

