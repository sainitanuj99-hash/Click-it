import React from 'react';
import { 
  Instagram, 
  Facebook,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { ClickitWordmark } from './ClickitLogo';
import { PLAY_STORE_URL, INSTAGRAM_URL, FACEBOOK_URL } from '../data/mockData';

const FOOTER_LINKS: { tab: string; href: string; label: string }[] = [
  { tab: 'about-us', href: '/about-us', label: 'About Us' },
  { tab: 'driver-faqs', href: '/driver-faqs', label: 'Driver FAQs' },
  { tab: 'driver-agreement', href: '/driver-agreement', label: 'Driver Agreement' },
  { tab: 'help-support', href: '/help-support', label: 'Contact' },
  { tab: 'privacy-policy', href: '/privacy-policy', label: 'Privacy' },
  { tab: 'terms-and-conditions', href: '/terms-and-conditions', label: 'Terms' },
];

// Let Ctrl/Cmd/middle-click open the page in a new tab; otherwise navigate in-app.
const isPlainLeftClick = (e: React.MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

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
          <div role="img" aria-label="Clickit" className="text-[16vw] sm:text-[17.5vw] md:text-[18.5vw] lg:text-[19.5vw] leading-[0.9] select-none inline-flex items-baseline group cursor-default whitespace-nowrap">
            <ClickitWordmark 
              className="group-hover:scale-[1.01] transition-transform duration-300"
              textColorClick="orange"
              textColorIt="white"
              showTrailingDot={false}
            />
          </div>
        </div>
        <p className="text-zinc-400 font-medium uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[11px] sm:text-xs md:text-sm text-center mt-2 sm:mt-3">
          Samman Apka, Zimmedari Humari
        </p>
      </div>

      {/* Divider Line Matching Schbang */}
      <div className="w-full border-t border-zinc-800/90 my-2 sm:my-2.5" />

      {/* GMB Verified NAP (Name, Address, Phone) & Google Maps Link for Local Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5 text-[11px] sm:text-xs text-zinc-400 py-1">
        <div className="flex items-center gap-1.5 text-center lg:text-left flex-wrap justify-center lg:justify-start">
          <MapPin className="w-3.5 h-3.5 text-[#FF5D00] shrink-0" />
          <span>
            <strong className="text-zinc-200">Clickit (Jaipur HQ):</strong> B 18, Shiv Marg, opp. DHARMANS SANSTHAN, Banipark, Kanti Nagar, Bani Park, Jaipur, Rajasthan 302016
          </span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400 flex-wrap justify-center">
          <a href="tel:+919145091460" className="hover:text-white transition-colors flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#FF5D00]" />
            <span>+91 91450 91460</span>
          </a>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <a href="mailto:support@justclickit.in" className="hover:text-white transition-colors flex items-center gap-1">
            <Mail className="w-3 h-3 text-[#FF5D00]" />
            <span>support@justclickit.in</span>
          </a>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <a 
            href="https://maps.google.com/?q=Clickit+Bani+Park+Jaipur" 
            target="_blank" 
            rel="noreferrer"
            className="text-[#FF5D00] hover:underline flex items-center gap-1 font-semibold"
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
        
        {/* Left: Social Media Icon Blocks & Google Play Badge */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center lg:justify-start">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white text-[11px] font-bold transition-all hover:scale-105 hover:border-zinc-700"
            title="Download Clickit on Google Play"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 512 512">
              <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
              <path fill="#34A853" d="M47 38.6c-4.4 7.7-6.9 17.5-6.9 29v376.8c0 11.5 2.5 21.3 6.9 29l212.9-213.7L47 38.6z"/>
              <path fill="#FBBC04" d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"/>
              <path fill="#EA4335" d="M444.2 235.8l-58.8-33.8-60.1 60.1 60.1 60.1 58.8-33.8c16.8-9.7 27.8-27.4 27.8-52.6 0-25.2-11-42.9-27.8-52.6z"/>
            </svg>
            <span>Google Play</span>
          </a>

          {INSTAGRAM_URL && (
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 hover:border-zinc-700"
              aria-label="Clickit on Instagram"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {FACEBOOK_URL && (
            <a 
              href={FACEBOOK_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white flex items-center justify-center transition-all hover:scale-105 hover:border-zinc-700"
              aria-label="Clickit on Facebook"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Center: Horizontal Clean Nav Links */}
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 font-medium text-white/85 text-xs sm:text-[13px]">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return;
                e.preventDefault();
                setActiveTab(link.tab);
              }}
              className="px-1.5 py-2.5 hover:text-[#FF5D00] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Official Copyright */}
        <div className="text-center lg:text-right text-[11px] text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} Promovers Logistics Solutions Private Limited (Clickit). All rights reserved.</p>
        </div>

      </div>

    </footer>
  );
};

