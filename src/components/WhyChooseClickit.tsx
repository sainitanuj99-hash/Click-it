import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Package, 
  Truck, 
  Store, 
  Home, 
  FileText, 
  Gift, 
  Utensils 
} from 'lucide-react';

interface WhyChooseClickitProps {
  onOpenPartnerModal?: () => void;
  onBookClick?: () => void;
}

export const WhyChooseClickit: React.FC<WhyChooseClickitProps> = ({ 
  onOpenPartnerModal, 
  onBookClick 
}) => {
  const [activeBusinessTag, setActiveBusinessTag] = useState<string>('Multiple pickups and drops');
  const [activePersonalTag, setActivePersonalTag] = useState<string>('Gift delivery');

  const businessPills = [
    { label: 'Multiple pickups and drops', icon: Truck },
    { label: 'Urgent restocking', icon: Store },
    { label: 'Planned delivery', icon: Package }
  ];

  const personalPills = [
    { label: 'Lunch delivery', icon: Utensils },
    { label: 'Document delivery', icon: FileText },
    { label: 'Home shifting', icon: Home },
    { label: 'Gift delivery', icon: Gift }
  ];

  return (
    <section className="relative bg-white text-zinc-900 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 overflow-hidden select-none">
      
      {/* Ambient warm background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-gradient-to-b from-orange-400/8 via-amber-300/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF5D00] shadow-sm mb-1">
            <span>Tailored for Every Need</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
            Built for everyone
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 font-medium">
            Whether you run a shop or need an urgent delivery
          </p>
        </div>

        {/* =========================================================================
            2-COLUMN SHOWCASE CARDS
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* -----------------------------------------------------------------------
              CARD 1: Retailers & Wholesalers (BUSINESS USE)
              ----------------------------------------------------------------------- */}
          <div className="bg-[#FAFBFD] border border-zinc-200/90 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:border-orange-200/90 transition-all duration-300 group">
            
            {/* Card Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  Retailers &amp; Wholesalers
                </h3>
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#FF5D00] bg-orange-100/70 px-2.5 py-1 rounded-full shrink-0">
                  BUSINESS USE
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-zinc-600 font-medium leading-relaxed">
                Move bulk loads or single orders - pickups, drops, all in one booking.
              </p>
            </div>

            {/* Photo Container */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-md">
              <img 
                src="/images/retailers-wholesalers.jpg" 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== 'https://plain-apac-prod-public.komododecks.com/202609/17/Bc7pnwwZMZwUNSmxyGaA/image.jpg') {
                    target.src = 'https://plain-apac-prod-public.komododecks.com/202609/17/Bc7pnwwZMZwUNSmxyGaA/image.jpg';
                  }
                }}
                alt="Clickit delivery partner delivering express parcel to retail merchant outside shop"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Subtle vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Brand Watermark Overlay */}
              <div className="absolute bottom-3 right-3 bg-black/85 px-3 py-1 rounded-md border border-white/20 text-[10px] font-bold text-white tracking-wider uppercase flex items-center gap-1 shadow-md">
                <span className="text-[#FF5D00] font-black">Click</span>it Logistics • B2B Freight
              </div>
            </div>

            {/* Bottom Pill Tags */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {businessPills.map((pill) => {
                const isSelected = activeBusinessTag === pill.label;
                return (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => {
                      setActiveBusinessTag(pill.label);
                      if (onBookClick) onBookClick();
                    }}
                    className={`text-xs sm:text-[13px] font-bold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#FF5D00] text-white border-[#FF5D00] shadow-md shadow-orange-500/25' 
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-orange-50 hover:text-zinc-900 hover:border-orange-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

          </div>

          {/* -----------------------------------------------------------------------
              CARD 2: Individuals (PERSONAL USE)
              ----------------------------------------------------------------------- */}
          <div className="bg-[#FAFBFD] border border-zinc-200/90 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:border-orange-200/90 transition-all duration-300 group">
            
            {/* Card Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  Individuals
                </h3>
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#FF5D00] bg-orange-100/70 px-2.5 py-1 rounded-full shrink-0">
                  PERSONAL USE
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-zinc-600 font-medium leading-relaxed">
                Send parcels to anybody in minutes
              </p>
            </div>

            {/* Photo Container */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-md">
              <img 
                src="/images/individuals.jpg" 
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== 'https://plain-apac-prod-public.komododecks.com/202609/17/pY4EZPeZUXM3ar0wx8ZV/image.jpg') {
                    target.src = 'https://plain-apac-prod-public.komododecks.com/202609/17/pY4EZPeZUXM3ar0wx8ZV/image.jpg';
                  }
                }}
                alt="Clickit express delivery courier delivering package to customer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Subtle vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Instant Delivery Badge */}
              <div className="absolute top-3 left-3 bg-black/85 px-3 py-1.5 rounded-lg border border-white/20 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#FF5D00] animate-pulse" />
                <span>Express Doorstep Delivery</span>
              </div>

              {/* Brand Watermark Overlay */}
              <div className="absolute bottom-3 right-3 bg-black/85 px-3 py-1 rounded-md border border-white/20 text-[10px] font-bold text-white tracking-wider uppercase flex items-center gap-1 shadow-md">
                <span className="text-[#FF5D00] font-black">Click</span>it Express • Instant
              </div>
            </div>

            {/* Bottom Pill Tags */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {personalPills.map((pill) => {
                const isSelected = activePersonalTag === pill.label;
                return (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => {
                      setActivePersonalTag(pill.label);
                      if (onBookClick) onBookClick();
                    }}
                    className={`text-xs sm:text-[13px] font-bold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#FF5D00] text-white border-[#FF5D00] shadow-md shadow-orange-500/25' 
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-orange-50 hover:text-zinc-900 hover:border-orange-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
