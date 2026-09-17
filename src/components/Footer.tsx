import React from 'react';
import { 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook
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
              showTrailingDot={true}
              animatedPin={false}
            />
          </h1>
        </div>
        <p className="text-zinc-400 font-medium uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[11px] sm:text-xs md:text-sm text-center mt-2 sm:mt-3">
          Samman Apka, Zimedari Humari
        </p>
      </div>

      {/* Divider Line Matching Schbang */}
      <div className="w-full border-t border-zinc-800/90 my-2 sm:my-2.5" />

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
            className="hover:text-[#FF5D00] transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button 
            onClick={() => setActiveTab('driver-faqs')} 
            className="hover:text-[#FF5D00] transition-colors cursor-pointer"
          >
            Driver FAQs
          </button>
          <button 
            onClick={() => setActiveTab('driver-agreement')} 
            className="hover:text-[#FF5D00] transition-colors cursor-pointer"
          >
            Driver Agreement
          </button>
          <button 
            onClick={() => setActiveTab('help-support')} 
            className="hover:text-[#FF5D00] transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button 
            onClick={() => setActiveTab('privacy-policy')} 
            className="hover:text-[#FF5D00] transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <button 
            onClick={() => setActiveTab('terms-and-conditions')} 
            className="hover:text-[#FF5D00] transition-colors cursor-pointer"
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

