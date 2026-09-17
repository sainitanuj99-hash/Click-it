import React from 'react';
import { 
  Truck, 
  Zap, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  HeartHandshake, 
  Clock, 
  ArrowRight,
  PhoneCall,
  Sparkles,
  Building2,
  PackageCheck
} from 'lucide-react';
import { ClickitLogo } from './ClickitLogo';

interface AboutUsProps {
  setActiveTab: (tab: string) => void;
  openPartnerModal?: () => void;
  openQuoteModal?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  setActiveTab,
  openPartnerModal,
  openQuoteModal
}) => {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 font-sans pb-20">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-[#0E1017] to-[#0B0C0E]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5D00]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering On-Demand Goods & Cargo Logistics
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Moving <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5D00] via-orange-400 to-amber-300">Jaipur & India</span> Forward, One Click at a Time.
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Clickit Logistics is India’s tech-first intracity and intercity goods delivery platform. We connect local businesses, traders, and everyday shippers directly with verified driver partners in minutes.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('estimate')}
              className="bg-[#FF5D00] hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2 text-sm"
            >
              Book Delivery Now <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openPartnerModal}
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-orange-400" /> Become a Partner
            </button>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#12141C] border border-zinc-800 p-6 rounded-2xl shadow-2xl">
          <div className="p-4 border-r border-zinc-800/80 last:border-none text-center">
            <p className="text-2xl sm:text-4xl font-extrabold text-[#FF5D00] font-mono">50,000+</p>
            <p className="text-xs text-zinc-400 font-medium mt-1">Trips Completed</p>
          </div>
          <div className="p-4 border-r border-zinc-800/80 last:border-none text-center">
            <p className="text-2xl sm:text-4xl font-extrabold text-white font-mono">2,500+</p>
            <p className="text-xs text-zinc-400 font-medium mt-1">Verified Fleet Partners</p>
          </div>
          <div className="p-4 border-r border-zinc-800/80 last:border-none text-center">
            <p className="text-2xl sm:text-4xl font-extrabold text-white font-mono">28 Min</p>
            <p className="text-xs text-zinc-400 font-medium mt-1">Avg Intracity SLA</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl sm:text-4xl font-extrabold text-emerald-400 font-mono">99.2%</p>
            <p className="text-xs text-zinc-400 font-medium mt-1">On-Time SLA</p>
          </div>
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest">
              <Building2 className="w-4 h-4" /> Our Story
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Solving the Chaos of Fragmented Local Goods Transport
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Founded with a mission to eliminate empty return trips, unpredictable pricing, and long loading wait times, Clickit Logistics transformed Jaipur's local freight industry.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Whether it's a small parcel moved by a 2-wheeler express bike or a 10-ton commercial container transported across intercity industrial highways, Clickit provides end-to-end live tracking, digital proof of delivery, and guaranteed driver assignment within 3 minutes.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 font-medium">
              <div className="flex items-center gap-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Zero Surge Pricing Architecture</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>GST Verified Invoicing for B2B</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Live Cargo Insurance Coverage</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>24/7 Dedicated Logistics Helpline</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-tr from-orange-500/20 to-zinc-800/40 p-1 rounded-3xl border border-zinc-800 shadow-2xl">
              <div className="bg-[#12141C] p-8 rounded-[22px] space-y-6">
                <ClickitLogo size="lg" textColor="mixed" animated={true} />
                <div className="border-t border-zinc-800 pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Smart Driver Dispatch Engine</h4>
                      <p className="text-xs text-zinc-400 mt-1">Algorithmic matching routes nearby 3-wheelers and mini trucks directly to your pickup gate within 180 seconds.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">100% Background-Checked Drivers</h4>
                      <p className="text-xs text-zinc-400 mt-1">Every driver undergoes strict KYC document validation, license verification, and physical vehicle safety inspections.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      <PackageCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Multi-Stop Route Batching</h4>
                      <p className="text-xs text-zinc-400 mt-1">Deliver up to 10 orders in a single trip, saving businesses up to 35% on daily logistics fuel costs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Company Core Values */}
      <section className="bg-[#0E1015] py-20 border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Our Guiding Values</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Built on Trust, Speed, and Fairness</h2>
            <p className="text-zinc-400 text-sm">We believe logistics should empower local commerce while respecting the livelihoods of driver partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#12141C] border border-zinc-800 p-6 rounded-2xl space-y-3 hover:border-orange-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Guaranteed Punctuality</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Time is revenue for businesses. Our route optimizer factors in real-time Jaipur traffic and industrial zone rush hours to ensure accurate ETA commitments.
              </p>
            </div>

            <div className="bg-[#12141C] border border-zinc-800 p-6 rounded-2xl space-y-3 hover:border-orange-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Driver Partner Welfare</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We offer instant daily earnings payouts, fuel discounts, and family health insurance support to make driver lives sustainable and dignified.
              </p>
            </div>

            <div className="bg-[#12141C] border border-zinc-800 p-6 rounded-2xl space-y-3 hover:border-orange-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Enterprise Scalability</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                From micro-merchants on MI Road to large manufacturing plants in Sitapura & VKI Area, our platform scales with your shipping volume seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Major Regional Logistics Hubs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Operating Coverage</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Our Key Regional Hubs</h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm">
            High-density dispatch stations ensuring 10-minute pickup response times across Jaipur metropolitan and industrial belts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#12141C] border border-zinc-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-orange-500" /> VKI Industrial Area Hub
            </div>
            <p className="text-xs text-zinc-400">Serving heavy machinery, hardware, and chemical manufacturing freight.</p>
          </div>

          <div className="bg-[#12141C] border border-zinc-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-orange-500" /> Sitapura Industrial Hub
            </div>
            <p className="text-xs text-zinc-400">Dedicated 2-wheeler & pickup fleet for gems, jewelry, and IT hardware.</p>
          </div>

          <div className="bg-[#12141C] border border-zinc-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-orange-500" /> Mansarovar & Sanganer
            </div>
            <p className="text-xs text-zinc-400">High-volume retail goods, textiles, and e-commerce last-mile hub.</p>
          </div>

          <div className="bg-[#12141C] border border-zinc-800 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-orange-500" /> Transport Nagar Gateway
            </div>
            <p className="text-xs text-zinc-400">Intercity highway containers connecting Jaipur to Delhi NCR, Ahmedabad, and Agra.</p>
          </div>
        </div>
      </section>

      {/* 6. Call To Action Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-[#FF5D00] to-amber-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ready to Simplify Your Logistics?</h3>
            <p className="text-orange-100 text-xs sm:text-sm max-w-xl">
              Get instant fare calculations, book mini-trucks on demand, or set up a dedicated business corporate billing account with Clickit today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('estimate')}
              className="bg-white text-zinc-950 font-bold px-6 py-3.5 rounded-xl hover:bg-zinc-100 transition-all text-sm shadow-lg"
            >
              Get Instant Estimate
            </button>
            <button
              onClick={openQuoteModal}
              className="bg-black/30 hover:bg-black/40 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
            >
              Contact Corporate Sales
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
