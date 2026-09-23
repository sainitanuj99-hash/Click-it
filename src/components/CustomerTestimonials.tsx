import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, ShieldCheck, ThumbsUp, Sparkles, Building, User } from 'lucide-react';

export const CustomerTestimonials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const testimonials = [
    {
      id: 1,
      name: 'Pooja Mehta',
      role: 'Small Business Owner',
      company: 'Mehta Handicrafts',
      category: 'retail',
      city: 'Sitapura, Jaipur',
      quote: 'Super fast delivery across VKIA and Sitapura. Clickit is our daily logistics lifeline for moving ceramic and brass inventory securely without breakages.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      tripsDone: '420+ Orders'
    },
    {
      id: 2,
      name: 'Rohit Sharma',
      role: 'Regular Shipper',
      company: 'Personal Dispatch',
      category: 'personal',
      city: 'Mansarovar, Jaipur',
      quote: 'Very easy to use the app in Jaipur and track my shipments in real-time. Booked a Tata Ace and the verified driver arrived at my doorstep in 8 minutes flat.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300',
      tripsDone: '28 Orders'
    },
    {
      id: 3,
      name: 'Ankit Verma',
      role: 'E-commerce Seller',
      company: 'Verma Tech Supplies',
      category: 'ecommerce',
      city: 'Jagatpura, Jaipur',
      quote: 'Great service for our business deliveries from Mansarovar to Jagatpura. The multi-stop drop option and instant digital e-POD saved us 35% in monthly courier expenses.',
      rating: 5,
      avatar: '/images/ankit-verma.jpg',
      tripsDone: '650+ Orders'
    },
    {
      id: 4,
      name: 'Sneha Kulkarni',
      role: 'Textile Distributor',
      company: 'Kulkarni Fabrics & Yarns',
      category: 'b2b',
      city: 'VKI Industrial Area, Jaipur',
      quote: 'Moving heavy fabric bales between VKI Industrial Area and Sitapura solved our entire supply chain bottlenecks. Transparent GST invoices are ready immediately after delivery.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
      tripsDone: '1,200+ Orders'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTestimonials = testimonials.filter((t) => 
    activeCategory === 'all' ? true : t.category === activeCategory
  );

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === filteredTestimonials.length - 1 ? 0 : prev + 1));
  };

  const getVisibleTestimonials = () => {
    const list = filteredTestimonials;
    if (list.length === 0) return [];
    const visible = [];
    const count = Math.min(3, list.length);
    for (let i = 0; i < count; i++) {
      visible.push(list[(currentIndex + i) % list.length]);
    }
    return visible;
  };

  return (
    <section className="relative bg-[#F1F5F9] text-slate-900 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/90 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* LAYERED BACKGROUND DECORATIONS */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none"></div>
      
      {/* Ambient background light orbs */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gradient-to-r from-orange-200/30 to-amber-100/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-blue-100/40 via-orange-100/25 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Decorative oversized background watermark icon */}
      <Quote className="w-96 h-96 text-slate-300/20 absolute -bottom-16 -right-16 pointer-events-none rotate-12" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header with Stats & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#00a6c7] bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/25 inline-flex items-center gap-2 shadow-sm">
              <ThumbsUp className="w-3.5 h-3.5 text-[#00a6c7]" /> Verified Customer Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Trusted by <span className="text-[#00a6c7] relative inline-block">
                1 Lakh+
                <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-orange-500/20 rounded-full"></span>
              </span> Shippers &amp; Businesses
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Read how local retail stores, manufacturers, and everyday shippers rely on Clickit for timely dispatches.
            </p>
          </div>

          {/* Navigation Slider Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="p-3.5 rounded-2xl bg-white/90 border border-slate-300/80 text-slate-700 hover:text-slate-900 hover:border-[#00a6c7] hover:shadow-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="p-3.5 rounded-2xl bg-white/90 border border-slate-300/80 text-slate-700 hover:text-slate-900 hover:border-[#00a6c7] hover:shadow-lg transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar p-1.5 bg-slate-200/80 rounded-2xl max-w-fit border border-slate-200">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'b2b', label: 'B2B & Industrial' },
            { id: 'ecommerce', label: 'E-Commerce Sellers' },
            { id: 'retail', label: 'Retail & MSME' },
            { id: 'personal', label: 'Personal Parcels' },
          ].map((tab) => {
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveCategory(tab.id); setCurrentIndex(0); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#00a6c7] text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Testimonials Cards Grid (Pristine Light Cards with Depth) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getVisibleTestimonials().map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 p-8 rounded-3xl space-y-6 relative flex flex-col justify-between hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-200 group hover:-translate-y-1"
            >
              <Quote className="w-10 h-10 text-orange-500/10 absolute top-6 right-6 group-hover:text-orange-500/25 transition-colors" />

              <div className="space-y-4">
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Shipper
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-orange-500/30 shadow-md"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Shubham_Bhati_2026.jpg') {
                      target.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Shubham_Bhati_2026.jpg';
                    }
                  }}
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                  <p className="text-[11px] font-medium text-slate-500 truncate">{item.role} • {item.city}</p>
                  <p className="text-[10px] font-bold text-[#00a6c7] flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3" /> {item.tripsDone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Metrics Banner */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-sm">
              <div className="flex items-center gap-0.5 text-xs font-black text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                <span>4.9</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Rated 4.9/5 by 85,000+ Users</div>
              <div className="text-xs text-slate-500">Google Play Store &amp; Apple App Store</div>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-black text-xs sm:text-sm shadow-sm px-1">
              99.4%
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">On-Time SLA Delivery Rate</div>
              <div className="text-xs text-slate-500">Across 1.5 Lakh+ monthly trips</div>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">100% In-Transit Protection</div>
              <div className="text-xs text-slate-500">Verified driver partners with background KYC</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
