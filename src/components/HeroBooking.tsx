import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Download, 
  FileText,
  X,
  Clock,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Search,
  Check,
  Package,
  Shield,
  Home,
  Store,
  Navigation,
  Radio,
  Activity
} from 'lucide-react';
import { VehicleIllustration } from './VehicleIllustrations';
import { ClickitLogoMark } from './ClickitLogo';
import { HeroLogisticsBackground } from './HeroLogisticsBackground';

interface HeroBookingProps {
  onDownloadAppClick?: () => void;
  openPartnerModal?: () => void;
  onHowItWorksClick?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

interface FleetType {
  id: 'bike' | 'threeWheeler' | 'tataAce' | 'bolero';
  illustrationId: string;
  name: string;
  badge: string;
  capacity: string;
  payloadKg: number;
  eta: string;
  bestFor: string;
  idealItems: string[];
  specs: string;
}

type InstallStage = 'playstore' | 'installing' | 'installed' | 'in_app';

interface ImageSlide {
  id: string;
  category: string;
  tabLabel: string;
  iconType: 'home' | 'store' | 'zap' | 'truck';
  title: string;
  subtitle: string;
  imageUrl: string;
  fallbackUrl: string;
  eta: string;
  liveBadge: string;
  highlightPill: string;
}

export const HeroBooking: React.FC<HeroBookingProps> = ({
  onDownloadAppClick,
  openPartnerModal,
  onHowItWorksClick,
}) => {
  // =========================================================================
  // LEFT SIDE: IMAGE SLIDER STATE
  // =========================================================================
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlideAutoPlaying, setIsSlideAutoPlaying] = useState(true);

  const imageSlides: ImageSlide[] = useMemo(() => [
    {
      id: 'express-courier',
      category: '2-Wheeler Instant Courier',
      tabLabel: '2W Express',
      iconType: 'zap',
      title: 'Hyperlocal 2-Wheeler Express Courier',
      subtitle: 'Fastest doorstep pickup in 10-15 mins for documents, keys, parcels & food orders.',
      imageUrl: '/images/2w-express.jpg',
      fallbackUrl: 'https://plain-apac-prod-public.komododecks.com/202609/17/bhfnPun1VOcfo2hy95Ky/image.jpg',
      eta: '10–15 Min Pickup',
      liveBadge: '⚡ 320+ Active Bikers',
      highlightPill: 'Instant Bike Dispatch • ₹40 Base'
    },
    {
      id: 'personal',
      category: 'Household & Furniture Relocation',
      tabLabel: 'House Shifting',
      iconType: 'home',
      title: 'Stress-Free House & Room Shifting',
      subtitle: 'Sofas, beds, appliances, carton packaging & verified loading helper crews.',
      imageUrl: '/images/house-shifting.jpg',
      fallbackUrl: 'https://plain-apac-prod-public.komododecks.com/202609/17/dmTDhWzQlEurfK9IKr7Z/image.jpg',
      eta: 'Immediate / Scheduled',
      liveBadge: '📦 100% Zero-Damage',
      highlightPill: 'Trained Helper & Labor Support'
    },
    {
      id: 'retail',
      category: 'Retail & Wholesale Logistics',
      tabLabel: 'B2B Retail',
      iconType: 'store',
      title: 'Wholesale Drops & Store Restocking',
      subtitle: 'Multi-stop delivery for shops, traders, distributors, textile & hardware merchants.',
      imageUrl: '/images/retailers-wholesalers.jpg',
      fallbackUrl: 'https://plain-apac-prod-public.komododecks.com/202609/17/Bc7pnwwZMZwUNSmxyGaA/image.jpg',
      eta: 'Instant Dispatch',
      liveBadge: '🛒 Bulk GST Invoicing',
      highlightPill: 'Multi-Stop Drop Routes'
    }
  ], []);

  // Smooth slide timer (fires once every 4.5s instead of rapid 100ms re-renders)
  useEffect(() => {
    if (!isSlideAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((curr) => (curr + 1) % imageSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSlideAutoPlaying, imageSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((curr) => (curr === 0 ? imageSlides.length - 1 : curr - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((curr) => (curr + 1) % imageSlides.length);
  };

  // =========================================================================
  // RIGHT SIDE: MOBILE APP INSTALLATION ANIMATION STATE
  // =========================================================================
  const [selectedFleetId, setSelectedFleetId] = useState<FleetType['id']>('tataAce');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [installStage, setInstallStage] = useState<InstallStage>('playstore');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const fleetTypes: FleetType[] = useMemo(() => [
    {
      id: 'bike',
      illustrationId: 'scooter-express',
      name: '2-Wheeler',
      badge: 'Fastest Delivery',
      capacity: 'Up to 20 kg',
      payloadKg: 20,
      eta: '10 mins',
      bestFor: 'Parcels, Documents, Retail Bags',
      idealItems: ['Urgent documents & legal files', 'Food, medicine & bakery items', 'Apparel & small retail parcels', 'Customer sample packets'],
      specs: 'Dimensions: Compact Carrier Box (under 20kg)'
    },
    {
      id: 'threeWheeler',
      illustrationId: 'three-wheeler',
      name: '3W Cargo Loader',
      badge: 'Electric & CNG',
      capacity: 'Up to 500 kg',
      payloadKg: 500,
      eta: '12 mins',
      bestFor: 'Wholesale Cartons & Shop Restocking',
      idealItems: ['FMCG boxes & grocery crates', 'E-commerce dispatch batches', 'Stationery & hardware cartons', 'Textile bundles & fabrics'],
      specs: 'Bed Size: 5.5 ft Open / Closed Cargo Bay'
    },
    {
      id: 'tataAce',
      illustrationId: 'tata-ace',
      name: 'Tata Ace (7ft)',
      badge: 'Most Popular',
      capacity: 'Up to 750 kg',
      payloadKg: 750,
      eta: '14 mins',
      bestFor: 'Commercial Stock, Furniture & Appliances',
      idealItems: ['Refrigerators, washing machines & sofas', 'Tiles, paint cans & hardware', 'Retail shop bulk replenishments', 'Warehouse to store transfers'],
      specs: 'Bed Size: 7 ft x 4.8 ft (Chota Hathi)'
    },
    {
      id: 'bolero',
      illustrationId: 'pickup-8ft',
      name: '8ft Pickup / Bolero',
      badge: 'High Capacity',
      capacity: 'Up to 1,500 kg',
      payloadKg: 1500,
      eta: '16 mins',
      bestFor: 'Industrial Cargo & Construction Material',
      idealItems: ['Industrial steel, pipes & heavy machinery', 'Large timber & plywood sheets', 'Mass palletized inventory', 'Heavy event & exhibition equipment'],
      specs: 'Bed Size: 8 ft - 9 ft Heavy Commercial Deck'
    }
  ], []);

  const activeFleet = useMemo(() => {
    return fleetTypes.find(f => f.id === selectedFleetId) || fleetTypes[2];
  }, [fleetTypes, selectedFleetId]);

  // High-End Animation Timeline: Play Store -> Installing -> Installed -> In-App
  useEffect(() => {
    if (!isAutoPlaying) return;
    let timer: NodeJS.Timeout;

    if (installStage === 'playstore') {
      timer = setTimeout(() => {
        setInstallStage('installing');
      }, 4000);
    } else if (installStage === 'installing') {
      timer = setTimeout(() => {
        setInstallStage('installed');
      }, 2400);
    } else if (installStage === 'installed') {
      timer = setTimeout(() => {
        setInstallStage('in_app');
      }, 2200);
    } else if (installStage === 'in_app') {
      timer = setTimeout(() => {
        setInstallStage('playstore');
      }, 6000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [installStage, isAutoPlaying]);

  const handleManualStageSelect = (stage: InstallStage) => {
    setInstallStage(stage);
  };

  const handleTriggerInstall = () => {
    setInstallStage('installing');
  };

  const activeSlide = imageSlides[currentSlideIndex];

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FFFDF9] via-[#F8F9FD] to-[#F0F3F9] text-zinc-900 overflow-hidden select-none border-b border-zinc-200/80">
      
      {/* Dynamic Animated Logistics Background (Topology, Moving Vehicles & City Hubs) */}
      <HeroLogisticsBackground />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: RICH IMAGE SHOWCASE WITH MINIMAL TEXT & CTAS
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            
            {/* Top Category Badge & Punchy Headline */}
            <div className="space-y-2.5">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-200/90 text-xs font-bold text-[#FF5D00] shadow-md shadow-orange-500/5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF5D00]" />
                <span className="tracking-wide uppercase text-[11px] font-black">India's On-Demand Logistics Network</span>
                <span className="text-zinc-300">•</span>
                <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  10–15 Min Pickup
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 leading-[1.12]">
                Deliver Anything In Your City. <br />
                <span className="text-[#FF5D00] drop-shadow-[0_2px_18px_rgba(255,93,0,0.22)]">Fast, Safe &amp; On-Demand.</span>
              </h1>
            </div>

            {/* =========================================================================
                THE LEFT-SIDE RICH IMAGE SHOWCASE (MINIMAL TEXT, MAX IMAGE IMPACT)
                ========================================================================= */}
            <div 
              className="relative rounded-3xl overflow-hidden border border-orange-200/90 ring-4 ring-orange-500/15 bg-zinc-950 shadow-[0_22px_55px_-12px_rgba(255,93,0,0.25)] group h-[430px] sm:h-[470px] lg:h-[500px] flex flex-col justify-between"
              onMouseEnter={() => setIsSlideAutoPlaying(false)}
              onMouseLeave={() => setIsSlideAutoPlaying(true)}
            >
              {/* Background Slide Image with Animated Crossfade - Ultra Vibrant & Crisp */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 z-0"
                >
                  <img
                    src={activeSlide.imageUrl}
                    alt={activeSlide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center brightness-[1.03] contrast-[1.06] saturate-[1.14] transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== activeSlide.fallbackUrl) {
                        target.src = activeSlide.fallbackUrl;
                      }
                    }}
                  />
                  {/* Balanced Vignettes - Keeps center 75% completely crystal clear & sunlit */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#08090C] via-[#08090C]/80 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Dynamic Highlight Pill (Center-Right Eye-Catcher) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`pill-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute right-4 top-20 z-10 pointer-events-none hidden sm:block"
                >
                  <div className="px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-orange-400/40 text-[11px] font-black text-white shadow-xl shadow-orange-500/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF5D00] animate-pulse" />
                    <span>{activeSlide.highlightPill}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Top Glass Bar: Category Badge & Slide Controls */}
              <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/25 text-xs font-extrabold text-white shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-[#FF5D00] animate-ping" />
                    <span className="text-[#FF7A29] font-black">{activeSlide.category}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-zinc-200 font-medium">{activeSlide.eta}</span>
                  </div>

                  {/* Live Telemetry Pill */}
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/40 text-xs font-bold text-emerald-400 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeSlide.liveBadge}</span>
                  </div>
                </div>

                {/* Minimalist Controls */}
                <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-full border border-white/20 shadow-md">
                  <button
                    type="button"
                    onClick={() => setIsSlideAutoPlaying(!isSlideAutoPlaying)}
                    title={isSlideAutoPlaying ? 'Pause' : 'Play'}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  >
                    {isSlideAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                  </button>
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    title="Previous"
                    className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    title="Next"
                    className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Minimalist Title & Segmented Progress */}
              <div className="relative z-10 p-5 sm:p-6 space-y-3.5">
                <div className="flex items-end justify-between gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                      className="space-y-1"
                    >
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">
                        {activeSlide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-200/95 font-medium line-clamp-1 drop-shadow">
                        {activeSlide.subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Guaranteed Safe Tag */}
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-white/20 text-[11px] font-semibold text-zinc-200 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF5D00]" />
                    <span>OTP &amp; GPS Verified</span>
                  </div>
                </div>

                {/* Sleek Segmented Slide Bars with Icons */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {imageSlides.map((slide, idx) => {
                    const isActive = currentSlideIndex === idx;
                    const IconComponent = 
                      slide.iconType === 'home' ? Home :
                      slide.iconType === 'store' ? Store :
                      slide.iconType === 'zap' ? Zap : Truck;

                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setCurrentSlideIndex(idx)}
                        className="group flex flex-col gap-1.5 text-left cursor-pointer focus:outline-none"
                      >
                        <div className="w-full h-1.5 rounded-full bg-white/25 overflow-hidden">
                          <div
                            key={`${slide.id}-${isActive ? currentSlideIndex : 'inactive'}`}
                            className={`h-full ${
                              isActive 
                                ? 'bg-[#FF5D00] shadow-[0_0_10px_#FF5D00] animate-slide-progress' 
                                : idx < currentSlideIndex 
                                ? 'bg-white/65 w-full' 
                                : 'bg-transparent w-0'
                            }`}
                          />
                        </div>
                        <div className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold truncate transition-colors ${
                          isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                        }`}>
                          <IconComponent className={`w-3 h-3 shrink-0 ${isActive ? 'text-[#FF5D00]' : 'text-zinc-500'}`} />
                          <span className="truncate">{slide.tabLabel}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* =========================================================================
                CALL TO ACTION BUTTONS
                ========================================================================= */}
            <div className="flex flex-wrap items-center justify-start gap-3.5 w-full pt-1">
              <button
                type="button"
                onClick={() => {
                  handleTriggerInstall();
                  if (onDownloadAppClick) onDownloadAppClick();
                }}
                className="group relative overflow-hidden bg-[#FF5D00] hover:bg-[#E05200] text-white font-black text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
              >
                <Smartphone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Install Clickit App</span>
                <span className="text-white/40">|</span>
                <span className="text-[11px] bg-black/20 px-2 py-0.5 rounded font-semibold">Google Play &amp; iOS</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="bg-white hover:bg-orange-50/70 text-zinc-900 font-bold text-xs sm:text-sm px-4 py-3.5 rounded-xl border border-zinc-200 shadow-sm hover:border-orange-300 hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#FF5D00]" />
                <span>Scan QR</span>
              </button>

              {openPartnerModal && (
                <button
                  type="button"
                  onClick={openPartnerModal}
                  className="text-xs sm:text-sm font-bold text-zinc-600 hover:text-zinc-950 flex items-center gap-1.5 transition-colors cursor-pointer py-2 group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Truck className="w-4 h-4 text-[#FF5D00] group-hover:scale-110 transition-transform" />
                  <span>Attach Vehicle &amp; Earn ₹45,000+</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Trust Proof Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-zinc-600 pt-0.5">
              <span className="flex items-center gap-1.5 text-zinc-800">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.9/5 Rating (15k+ Users)</span>
              </span>
              <span className="text-zinc-300">•</span>
              <span className="flex items-center gap-1.5 text-zinc-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Drivers</span>
              </span>
              <span className="text-zinc-300">•</span>
              <span className="flex items-center gap-1.5 text-zinc-800">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>100% GST Invoicing</span>
              </span>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: INTERACTIVE MOBILE PHONE INSTALLATION ANIMATION
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-4 lg:pt-0">
            
            {/* Interactive Stage Controller Pill Bar */}
            <div className="mb-3.5 flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-zinc-200 shadow-lg z-30">
              <button
                type="button"
                onClick={() => handleManualStageSelect('playstore')}
                className={`px-3.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  installStage === 'playstore' 
                    ? 'bg-[#01875F] text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <span>1. Play Store</span>
              </button>

              <button
                type="button"
                onClick={() => handleManualStageSelect('installing')}
                className={`px-3.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  installStage === 'installing' || installStage === 'installed'
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <span>2. Installing</span>
              </button>

              <button
                type="button"
                onClick={() => handleManualStageSelect('in_app')}
                className={`px-3.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  installStage === 'in_app' 
                    ? 'bg-[#FF5D00] text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <span>3. Clickit App</span>
              </button>

              {/* Replay / Auto-play Toggle */}
              <button
                type="button"
                onClick={() => {
                  setInstallStage('playstore');
                  setIsAutoPlaying(true);
                }}
                title="Replay Installation Animation"
                className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 transition-colors ml-0.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Realistic Titanium Matte Black Phone */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[340px] sm:max-w-[360px]"
            >
              
              {/* Floor Shadow with Breathing Expansion */}
              <div className="absolute -bottom-8 left-[10%] w-[80%] h-8 bg-black/60 rounded-full blur-xl -z-10" />

              {/* Realistic Premium Matte Black Phone Frame */}
              <div className="relative bg-[#0C0D12] rounded-[48px] p-3 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/20 border-4 border-zinc-800">
                
                {/* Dynamic Phone Speaker & Island Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>

                {/* Phone Screen Canvas with Smooth Animated Transition */}
                <div className="relative w-full h-[560px] sm:h-[600px] rounded-[38px] overflow-hidden bg-[#0E1017] border border-zinc-800 flex flex-col justify-between text-white">
                  
                  <AnimatePresence mode="wait">
                    {/* =========================================================
                        SCREEN 1 & 2 & 3: GOOGLE PLAY STORE INSTALLATION EXPERIENCE
                        ========================================================= */}
                    {(installStage === 'playstore' || installStage === 'installing' || installStage === 'installed') && (
                      <motion.div
                        key="playstore-screen"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full flex flex-col justify-between bg-[#131314] text-[#E3E3E3] p-4 pt-8"
                      >
                        {/* Play Store Top Bar */}
                        <div className="flex items-center justify-between text-zinc-400 pb-3 border-b border-zinc-800/80">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                              <span className="text-[#01875F] text-base font-black">Google</span> Play
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <Search className="w-4 h-4 text-zinc-400" />
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-[10px] font-bold text-white flex items-center justify-center">
                              S
                            </div>
                          </div>
                        </div>

                        {/* App Metadata Header */}
                        <div className="space-y-4 py-2">
                          <div className="flex gap-3.5 items-start">
                            {/* App Icon with Official Animated C-Pin Brand Mark */}
                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-950 to-[#181920] flex items-center justify-center text-white shadow-xl shadow-orange-500/20 border border-orange-500/40 shrink-0 p-2.5">
                              <ClickitLogoMark 
                                className="w-10 h-11" 
                                animated={installStage === 'installing'} 
                                pulse={true} 
                              />
                              
                              {/* Installing spinner overlay ring */}
                              {installStage === 'installing' && (
                                <div className="absolute -inset-1 rounded-[20px] border-2 border-emerald-500 border-t-transparent animate-spin" />
                              )}
                            </div>

                            {/* Titles */}
                            <div className="min-w-0 flex-1">
                              <h2 className="text-base font-bold text-white leading-tight">
                                Clickit: City Trucks &amp; Logistics
                              </h2>
                              <p className="text-xs text-[#01875F] font-semibold mt-0.5">
                                Clickit India Technologies
                              </p>
                              <p className="text-[10px] text-zinc-500 mt-0.5">
                                Contains ads • In-app purchases
                              </p>
                            </div>
                          </div>

                          {/* Play Store Stats Strip */}
                          <div className="grid grid-cols-4 gap-1 py-2 border-y border-zinc-800/80 text-center text-xs">
                            <div className="space-y-0.5">
                              <div className="font-bold text-white flex items-center justify-center gap-0.5">
                                <span>4.9</span>
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              </div>
                              <div className="text-[9px] text-zinc-400">18K reviews</div>
                            </div>
                            <div className="space-y-0.5 border-l border-zinc-800">
                              <div className="font-bold text-white">100K+</div>
                              <div className="text-[9px] text-zinc-400">Downloads</div>
                            </div>
                            <div className="space-y-0.5 border-l border-zinc-800">
                              <div className="font-bold text-white">28 MB</div>
                              <div className="text-[9px] text-zinc-400">Size</div>
                            </div>
                            <div className="space-y-0.5 border-l border-zinc-800">
                              <div className="font-bold text-white flex items-center justify-center">
                                <span className="border border-zinc-600 px-1 py-0.2 rounded text-[10px]">3+</span>
                              </div>
                              <div className="text-[9px] text-zinc-400">Rated for 3+</div>
                            </div>
                          </div>

                          {/* ===================================================
                              DYNAMIC INSTALL BUTTON / PROGRESS BAR
                              =================================================== */}
                          <div className="space-y-2 pt-1">
                            {/* STAGE 1: INSTALL BUTTON */}
                            {installStage === 'playstore' && (
                              <motion.button
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={handleTriggerInstall}
                                className="w-full py-2.5 px-4 rounded-full bg-[#01875F] hover:bg-[#00704F] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer active:scale-95"
                              >
                                <span>Install</span>
                              </motion.button>
                            )}

                            {/* STAGE 2: INSTALLING WITH HARDWARE-ACCELERATED CSS PROGRESS */}
                            {installStage === 'installing' && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    Downloading Clickit...
                                  </span>
                                  <span className="font-mono text-zinc-300 font-bold text-[11px]">28.4 MB</span>
                                </div>
                                
                                {/* Custom Google Play Progress Line */}
                                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#01875F] rounded-full animate-install-download" />
                                </div>

                                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                                  <span>Fast CDN Download</span>
                                  <span className="text-[#01875F] font-semibold">Verified by Play Protect</span>
                                </div>
                              </div>
                            )}

                            {/* STAGE 3: INSTALLED / OPEN BUTTON */}
                            {installStage === 'installed' && (
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  className="flex-1 py-2.5 px-3 rounded-full border border-zinc-700 text-zinc-400 font-bold text-xs cursor-default"
                                >
                                  Uninstall
                                </button>
                                <motion.button
                                  initial={{ scale: 0.95 }}
                                  animate={{ scale: [0.98, 1.02, 1] }}
                                  transition={{ duration: 0.3 }}
                                  onClick={() => setInstallStage('in_app')}
                                  className="flex-1 py-2.5 px-3 rounded-full bg-[#01875F] hover:bg-[#00704F] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/40 cursor-pointer animate-pulse"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Open</span>
                                </motion.button>
                              </div>
                            )}

                            {/* Play Protect Row */}
                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 justify-center pt-0.5">
                              <Shield className="w-3 h-3 text-[#01875F]" />
                              <span>Verified by Play Protect • Clean &amp; Safe</span>
                            </div>
                          </div>

                          {/* Screenshots Showcase Preview */}
                          <div className="space-y-1.5 pt-1">
                            <div className="text-[11px] font-bold text-zinc-300">App Preview</div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-zinc-900/90 rounded-xl p-2 border border-zinc-800 text-center space-y-1">
                                <div className="w-6 h-6 mx-auto rounded-lg bg-orange-500/20 text-[#FF5D00] flex items-center justify-center text-xs">
                                  🛵
                                </div>
                                <div className="text-[9px] font-extrabold text-white leading-tight">2-Wheelers</div>
                                <div className="text-[8px] text-zinc-400">10 Min Pickup</div>
                              </div>
                              <div className="bg-zinc-900/90 rounded-xl p-2 border border-zinc-800 text-center space-y-1">
                                <div className="w-6 h-6 mx-auto rounded-lg bg-orange-500/20 text-[#FF5D00] flex items-center justify-center text-xs">
                                  🚚
                                </div>
                                <div className="text-[9px] font-extrabold text-white leading-tight">Tata Ace</div>
                                <div className="text-[8px] text-zinc-400">Up to 750kg</div>
                              </div>
                              <div className="bg-zinc-900/90 rounded-xl p-2 border border-zinc-800 text-center space-y-1">
                                <div className="w-6 h-6 mx-auto rounded-lg bg-orange-500/20 text-[#FF5D00] flex items-center justify-center text-xs">
                                  🚛
                                </div>
                                <div className="text-[9px] font-extrabold text-white leading-tight">8ft Pickup</div>
                                <div className="text-[8px] text-zinc-400">1,500kg Load</div>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Play Store Bottom Bar */}
                        <div className="pt-2 text-center">
                          <span className="text-[10px] text-zinc-500">
                            Tap "Open" or wait for automatic launch
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* =========================================================
                        SCREEN 4: IN-APP BOOKING EXPERIENCE
                        ========================================================= */}
                    {installStage === 'in_app' && (
                      <motion.div
                        key="in-app-screen"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.45 }}
                        className="w-full h-full flex flex-col justify-between bg-[#0E1017] text-white p-4 pt-7"
                      >
                        {/* In-App Header */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center p-0.5 shadow-md">
                                <ClickitLogoMark className="w-4 h-4.5" animated={true} pulse={false} />
                              </div>
                              <div>
                                <div className="text-xs font-black text-white leading-tight flex items-center gap-1">
                                  <span>CLICKIT</span>
                                </div>
                                <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                                  <span>Jaipur Hub</span>
                                  <span className="text-emerald-400 font-bold">• Active</span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setInstallStage('playstore')}
                              className="text-[9px] font-bold text-zinc-400 bg-zinc-800 hover:text-white px-2 py-0.5 rounded-full"
                            >
                              Exit App
                            </button>
                          </div>

                          {/* Pickup & Drop Route Card */}
                          <div className="bg-[#151722] rounded-xl p-2.5 border border-zinc-800/90 space-y-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">Pickup Point</div>
                                <div className="text-xs font-bold text-white truncate">MI Road, City Center</div>
                              </div>
                            </div>

                            <div className="border-l border-dashed border-zinc-700 ml-1.5 pl-3.5 space-y-0.5">
                              <div className="text-[10px] text-zinc-500 font-medium">12.4 km • Est. 26 mins delivery</div>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5D00] shadow-sm shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">Drop Point</div>
                                <div className="text-xs font-bold text-white truncate">Malviya Nagar Industrial Area</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* In-App Vehicle List */}
                        <div className="space-y-1.5 flex-1 flex flex-col justify-center py-2">
                          <div className="text-[10px] font-bold text-zinc-400 px-1 uppercase tracking-wider flex items-center justify-between">
                            <span>Available Fleet Options</span>
                            <span className="text-[#FF7A29] font-semibold text-[10px]">Instant Proximity Dispatch</span>
                          </div>

                          <div className="space-y-1.5">
                            {fleetTypes.map((fleet) => {
                              const isSelected = selectedFleetId === fleet.id;
                              return (
                                <div
                                  key={fleet.id}
                                  onClick={() => setSelectedFleetId(fleet.id)}
                                  className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                    isSelected
                                      ? 'bg-gradient-to-r from-[#FF5D00]/25 to-[#181B26] border-[#FF5D00] shadow-md ring-1 ring-[#FF5D00]/40'
                                      : 'bg-[#151722]/80 hover:bg-[#1A1C2A] border-zinc-800/80 text-zinc-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-9 h-7 shrink-0 flex items-center justify-center">
                                      <VehicleIllustration vehicleId={fleet.illustrationId} className="w-9 h-6 object-contain" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-xs font-extrabold text-white flex items-center gap-1">
                                        <span>{fleet.name}</span>
                                        {isSelected && (
                                          <span className="text-[8px] bg-[#FF5D00] text-white px-1.5 py-0.2 rounded font-bold">
                                            Ready
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[10px] text-zinc-400 truncate">
                                        {fleet.capacity} payload
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <div className="text-[11px] font-extrabold text-emerald-400">{fleet.eta}</div>
                                    <div className="text-[9px] text-zinc-500 font-medium">Arrival</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* In-App Action Bar */}
                        <div className="space-y-2 pt-1 border-t border-zinc-800/80">
                          <button
                            type="button"
                            onClick={onDownloadAppClick}
                            className="w-full py-3 px-4 rounded-2xl bg-[#FF5D00] hover:bg-[#E05200] text-white font-black text-xs sm:text-sm flex items-center justify-between shadow-lg shadow-orange-500/30 transition-all cursor-pointer group"
                          >
                            <span>1-Tap Book {activeFleet.name}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>

              {/* CLEAN APP HIGHLIGHT CARDS (NO OVERLAPPING / NON-COLLIDING) */}
              <div className="grid grid-cols-2 gap-2.5 mt-4 w-full">
                <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-orange-200/90 shadow-md shadow-orange-500/5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center shrink-0 p-1">
                    <ClickitLogoMark className="w-5 h-5" animated={false} pulse={false} color="#FF5D00" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-zinc-900 leading-tight">10–15 Min Pickup</div>
                    <div className="text-[10px] text-zinc-500 font-medium leading-snug truncate">GPS Proximity Dispatch</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-zinc-200/90 shadow-md flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-zinc-900 leading-tight">Lightweight 28 MB</div>
                    <div className="text-[10px] text-zinc-500 font-medium leading-snug truncate">Play Protect Verified</div>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          QR CODE DOWNLOAD MODAL POPUP
          ========================================================================= */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-[#12141F] border border-zinc-700 rounded-3xl p-6 sm:p-7 shadow-2xl text-center space-y-5 text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800 p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 text-[#FF5D00] text-xs font-bold border border-orange-500/30">
                  <QrCode className="w-3.5 h-3.5" /> Instant App Download
                </div>
                <h3 className="text-xl font-black text-white">Scan to Install Clickit</h3>
                <p className="text-xs text-zinc-400">Point your smartphone camera to get the app immediately</p>
              </div>

              {/* Styled High-Contrast QR Code Visual */}
              <div className="bg-white p-5 rounded-2xl inline-block shadow-lg mx-auto border-4 border-[#FF5D00]/20">
                <svg viewBox="0 0 100 100" className="w-40 h-40">
                  <rect x="0" y="0" width="30" height="30" fill="#000" rx="3" />
                  <rect x="5" y="5" width="20" height="20" fill="#FFF" rx="2" />
                  <rect x="9" y="9" width="12" height="12" fill="#FF5D00" rx="1" />

                  <rect x="70" y="0" width="30" height="30" fill="#000" rx="3" />
                  <rect x="75" y="5" width="20" height="20" fill="#FFF" rx="2" />
                  <rect x="79" y="9" width="12" height="12" fill="#FF5D00" rx="1" />

                  <rect x="0" y="70" width="30" height="30" fill="#000" rx="3" />
                  <rect x="5" y="75" width="20" height="20" fill="#FFF" rx="2" />
                  <rect x="9" y="79" width="12" height="12" fill="#FF5D00" rx="1" />

                  <rect x="36" y="8" width="6" height="6" fill="#000" />
                  <rect x="48" y="8" width="6" height="14" fill="#000" />
                  <rect x="60" y="14" width="6" height="8" fill="#000" />

                  <rect x="8" y="36" width="14" height="6" fill="#000" />
                  <rect x="8" y="48" width="6" height="12" fill="#000" />
                  <rect x="18" y="54" width="8" height="6" fill="#000" />

                  <rect x="36" y="36" width="28" height="28" fill="#FF5D00" rx="4" />
                  <circle cx="50" cy="50" r="8" fill="#FFF" />
                  <path d="M 47 48 L 53 48 L 50 54 Z" fill="#FF5D00" />

                  <rect x="70" y="36" width="8" height="14" fill="#000" />
                  <rect x="84" y="42" width="10" height="8" fill="#000" />

                  <rect x="36" y="70" width="14" height="8" fill="#000" />
                  <rect x="56" y="76" width="8" height="16" fill="#000" />
                  <rect x="70" y="70" width="10" height="10" fill="#000" />
                  <rect x="86" y="84" width="8" height="8" fill="#000" />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-white">Available on Google Play &amp; Apple App Store</div>
                <div className="text-[10px] text-zinc-400">Compatible with Android 8.0+ and iOS 14.0+</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
