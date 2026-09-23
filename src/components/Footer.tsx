import React from 'react';
import { 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { ClickitWordmark } from './ClickitLogo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openQuoteModal: () => void;
  openPartnerModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openQuoteModal }) => {
  return (
    <footer className="sticky bottom-0 z-0 h-[82vh] max-h-[85vh] sm:h-[80vh] sm:max-h-[82vh] bg-black text-white flex flex-col justify-between px-4 sm:px-8 lg:px-10 pt-12 sm:pt-16 pb-5 sm:pb-6 select-none overflow-hidden">
      
      {/* 
        SCHBANG SIGNATURE GIANT LOGO CENTERPIECE:
        Faithful to official Clickit brand logo:
        - Monogram C-Pin as the dot over the 'i' after 'l' (fully visible with abundant headroom)
        - Trailing brand dot after the logo (Clickit.)
      */}
      <div className="flex-1 flex flex-col justify-center items-center my-auto relative pt-4 sm:pt-6 pb-2 w-full">
        <div className="w-full flex items-center justify-center overflow-visible">
          <h1 className="text-[16vw] sm:text-[17.5vw] md:text-[18.5vw] lg:text-[19.5vw] leading-[0.9] select-none inline-flex items-baseline group cursor-default whitespace-nowrap">
            <ClickitWordmark 
              className="group-hover:scale-[1.01] transition-transform duration-300"
              textColorIt="white"
              showTrailingDot={false}
            />
          </h1>
        </div>
        <p className="text-zinc-400 font-medium uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[11px] sm:text-xs md:text-sm text-center mt-2 sm:mt-3">
          Samman Apka, Zimedari Humari
        </p>
      </div>

      {/* Divider Line Matching Schbang */}
      <div className="w-full border-t border-zinc-800/90 my-2 sm:my-2.5" />

      {/* GMB Verified NAP (Name, Address, Phone) & Google Maps Link for Local Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5 text-[11px] sm:text-xs text-zinc-400 py-1">
        <div className="flex items-center gap-1.5 text-center lg:text-left flex-wrap justify-center lg:justify-start">
          <MapPin className="w-3.5 h-3.5 text-[#00a6c7] shrink-0" />
          <span>
            <strong className="text-zinc-200">Clickit Logistics (Jaipur HQ):</strong> B-18-A, Ground Floor, Shiv Marg, Bani Park, Jaipur 302016, Rajasthan
          </span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400 flex-wrap justify-center">
          <a href="tel:+911414982200" className="hover:text-white transition-colors flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#00a6c7]" />
            <span>+91 141 498 2200</span>
          </a>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <a href="mailto:support@justclickit.in" className="hover:text-white transition-colors flex items-center gap-1">
            <Mail className="w-3 h-3 text-[#00a6c7]" />
            <span>support@justclickit.in</span>
          </a>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <a 
            href="https://maps.google.com/?q=Clickit+Logistics+Bani+Park+Jaipur" 
            target="_blank" 
            rel="noreferrer"
            className="text-[#00a6c7] hover:underline flex items-center gap-1 font-semibold"
            title="Clickit on Google Maps"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="w-full border-t border-zinc-900 my-1 sm:my-1.5" />

      {/* Bottom Row: Socials (Left), Navigation (Center), Copyright (Right) */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-zinc-400">
        
        {/* Left: Social Media Icon Blocks */}
        <div className="flex items-center gap-2.5">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-8 h-8 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 hover:border-zinc-700"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-8 h-8 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 hover:border-zinc-700"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-8 h-8 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 hover:border-zinc-700"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-8 h-8 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 hover:border-zinc-700"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>

        {/* Center: Horizontal Clean Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 font-medium text-white/85 text-xs sm:text-[13px]">
          <button 
            onClick={() => setActiveTab('about-us')} 
            className="hover:text-[#00a6c7] transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button 
            onClick={() => setActiveTab('driver-faqs')} 
            className="hover:text-[#00a6c7] transition-colors cursor-pointer"
          >
            Driver FAQs
          </button>
          <button 
            onClick={() => setActiveTab('driver-agreement')} 
            className="hover:text-[#00a6c7] transition-colors cursor-pointer"
          >
            Driver Agreement
          </button>
          <button 
            onClick={() => setActiveTab('help-support')} 
            className="hover:text-[#00a6c7] transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button 
            onClick={() => setActiveTab('privacy-policy')} 
            className="hover:text-[#00a6c7] transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <button 
            onClick={() => setActiveTab('terms-and-conditions')} 
            className="hover:text-[#00a6c7] transition-colors cursor-pointer"
          >
            Terms
          </button>
        </div>

        {/* Right: Signature Tagline matching Schbang screenshot */}
        <div className="text-center lg:text-right text-[11px] leading-snug text-zinc-500 font-medium">
          <p className="text-zinc-300">Proudly created in India.</p>
          <p>All Right Reserved, All Wrong Reversed.</p>
        </div>

      </div>

    </footer>
  );
};

