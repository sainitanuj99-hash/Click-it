import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Menu, X, Bike, Truck, Zap, MapPin } from 'lucide-react';
import { ClickitWordmark } from './ClickitLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openQuoteModal: () => void;
  openPartnerModal?: () => void;
}

interface VehicleServiceItem {
  id: string;
  name: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
}

const VEHICLE_SERVICES: VehicleServiceItem[] = [
  {
    id: '2-wheeler',
    name: '2 Wheeler',
    Icon: Bike,
    accentColor: '#00a6c7',
  },
  {
    id: 'auto',
    name: 'Auto',
    Icon: Zap,
    accentColor: '#38BDF8',
  },
  {
    id: 'tata-ace',
    name: 'Tata Ace',
    Icon: Truck,
    accentColor: '#F59E0B',
  },
  {
    id: 'chota-hathi',
    name: 'Chota Hathi',
    Icon: Truck,
    accentColor: '#00a6c7',
  },
  {
    id: 'bolero-pickup',
    name: 'Bolero Pickup',
    Icon: Truck,
    accentColor: '#10B981',
  },
];

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  openQuoteModal,
  openPartnerModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleIndex, setVehicleIndex] = useState(0);
  const [isTickerHovered, setIsTickerHovered] = useState(false);

  useEffect(() => {
    if (isTickerHovered) return;
    const interval = setInterval(() => {
      setVehicleIndex((prev) => (prev + 1) % VEHICLE_SERVICES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isTickerHovered]);

  const currentVehicle = VEHICLE_SERVICES[vehicleIndex];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0A0B10]/95 backdrop-blur-md text-white border-b border-zinc-800/80 shadow-lg select-none">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Clickit Unified Brand Logo + Schbang-Style Kinetic Service Lockup */}
        <div 
          onClick={() => setActiveTab('estimate')}
          className="cursor-pointer group py-1 flex items-center select-none"
          onMouseEnter={() => setIsTickerHovered(true)}
          onMouseLeave={() => setIsTickerHovered(false)}
        >
          {/* Integrated Logo Wordmark & Rotating Vehicle Typography */}
          <div className="flex items-baseline gap-2 sm:gap-2.5 select-none">
            {/* Clickit Official Default Wordmark */}
            <ClickitWordmark 
              className="text-2xl sm:text-[30px] group-hover:opacity-95 transition-opacity"
              textColorIt="white"
              showTrailingDot={false}
            />

            {/* Seamless Schbang-Style Typographic Slash */}
            <span className="text-zinc-600 font-light text-xl sm:text-2xl leading-none select-none">
              /
            </span>

            {/* Rolling Vehicle Wordmark Part of Logo */}
            <div className="h-8 sm:h-9 overflow-hidden relative min-w-[120px] sm:min-w-[170px] inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVehicle.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-white font-bold text-base sm:text-lg tracking-normal leading-none"
                >
                  <currentVehicle.Icon 
                    className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" 
                    style={{ color: currentVehicle.accentColor }} 
                  />
                  <span className="whitespace-nowrap group-hover:text-[#00a6c7] transition-colors">
                    {currentVehicle.name}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('estimate')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'estimate'
                ? 'text-[#00a6c7] bg-orange-500/15 border border-orange-500/30 font-black shadow-sm'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('about-us')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'about-us'
                ? 'text-[#00a6c7] bg-orange-500/15 border border-orange-500/30 font-black shadow-sm'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
            }`}
          >
            About Us
          </button>

          <button
            onClick={openPartnerModal}
            className="px-3.5 py-2 rounded-xl text-zinc-300 hover:text-[#00a6c7] hover:bg-orange-500/10 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Partner With Us
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <MapPin className="w-3.5 h-3.5 text-[#00a6c7]" />
            <span>Jaipur</span>
          </div>
          <button
            onClick={() => setActiveTab('app')}
            className="relative overflow-hidden bg-[#00a6c7] hover:bg-[#008fae] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
          >
            <Smartphone className="w-4 h-4" /> Download App
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0B10] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <button
            onClick={() => { setActiveTab('estimate'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              activeTab === 'estimate' ? 'bg-orange-500/15 border border-orange-500/30 text-[#00a6c7]' : 'text-zinc-300 hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('about-us'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
              activeTab === 'about-us' ? 'bg-orange-500/15 border border-orange-500/30 text-[#00a6c7]' : 'text-zinc-300 hover:text-white'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => { if (openPartnerModal) openPartnerModal(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-zinc-300 hover:text-[#00a6c7]"
          >
            Become a Partner
          </button>
          <button
            onClick={() => { setActiveTab('app'); setMobileMenuOpen(false); }}
            className="w-full mt-2 bg-[#00a6c7] text-white text-xs font-black py-3 rounded-xl text-center shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-4 h-4" /> Download Clickit App
          </button>
        </div>
      )}
    </header>
  );
};
