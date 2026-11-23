/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBooking } from './components/HeroBooking';
import { MobileAppBanner } from './components/MobileAppBanner';
import { WhyChooseClickit } from './components/WhyChooseClickit';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { usePageSeo } from './hooks/usePageSeo';

// Lazy-loaded secondary pages & modals for optimal initial page-load performance
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const HelpSupport = lazy(() => import('./pages/HelpSupport'));
const DriverAgreement = lazy(() => import('./pages/DriverAgreement'));
const DriverFAQs = lazy(() => import('./pages/DriverFAQs'));
const AppDownload = lazy(() => import('./pages/AppDownload'));
const EnterpriseQuoteModal = lazy(() => import('./components/EnterpriseQuoteModal').then(m => ({ default: m.EnterpriseQuoteModal })));
const PartnerModal = lazy(() => import('./components/PartnerModal').then(m => ({ default: m.PartnerModal })));

// Canonical page paths. Old or short URLs (e.g. /about, /terms) are 301-redirected
// to these in vercel.json; the same aliases are accepted here for local development.
const PATH_TO_TAB: Record<string, string> = {
  '/': 'home',
  '/index.html': 'home',
  '/about-us': 'about-us',
  '/help-support': 'help-support',
  '/driver-faqs': 'driver-faqs',
  '/driver-agreement': 'driver-agreement',
  '/terms-and-conditions': 'terms-and-conditions',
  '/privacy-policy': 'privacy-policy',
  '/app': 'app',
  // aliases
  '/about': 'about-us',
  '/help': 'help-support',
  '/support': 'help-support',
  '/contact': 'help-support',
  '/terms': 'terms-and-conditions',
  '/terms-of-service': 'terms-and-conditions',
  '/tos': 'terms-and-conditions',
  '/privacy': 'privacy-policy',
  '/driver-faq': 'driver-faqs',
  '/driver-terms': 'driver-agreement',
  '/partner-agreement': 'driver-agreement',
  '/driver-contract': 'driver-agreement',
  '/download': 'app',
};

// Older links used ?page=privacy or #privacy on the homepage; keep those working.
const getTabFromHomeHint = (hint: string): string => {
  if (hint.includes('driver-agreement') || hint.includes('driver-terms') || hint.includes('partner-agreement') || hint.includes('driver-contract')) return 'driver-agreement';
  if (hint.includes('driver-faq')) return 'driver-faqs';
  if (hint.includes('terms') || hint.includes('condition') || hint.includes('tos')) return 'terms-and-conditions';
  if (hint.includes('privacy')) return 'privacy-policy';
  if (hint.includes('about')) return 'about-us';
  if (hint.includes('help') || hint.includes('support')) return 'help-support';
  if (hint === 'app' || hint.includes('download')) return 'app';
  return 'home';
};

// Helper to determine the current tab from the URL pathname, hash, or query param
const getTabFromLocation = (): string => {
  if (typeof window === 'undefined') return 'home';
  const path = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
  const tab = PATH_TO_TAB[path];
  if (!tab) return 'not-found';
  if (tab !== 'home') return tab;

  const hash = (window.location.hash || '').toLowerCase().replace(/^#\/?/, '');
  const urlParams = new URLSearchParams(window.location.search || '');
  const queryPage = (urlParams.get('page') || urlParams.get('p') || urlParams.get('tab') || '').toLowerCase();
  return getTabFromHomeHint(hash || queryPage);
};

const NotFound: React.FC<{ onHome: () => void }> = ({ onHome }) => (
  <section className="max-w-xl mx-auto px-6 py-24 sm:py-32 text-center space-y-5">
    <p className="text-sm font-bold tracking-widest uppercase text-[#C2410C]">Error 404</p>
    <h1 className="text-3xl sm:text-4xl font-black text-zinc-900">This page doesn't exist</h1>
    <p className="text-zinc-600">
      The link may be old or mistyped. You can book a delivery or learn about Clickit from the homepage.
    </p>
    <a
      href="/"
      onClick={(e) => { e.preventDefault(); onHome(); }}
      className="inline-block bg-[#C2410C] hover:bg-[#9A3412] text-white text-sm font-bold px-6 py-3 rounded-xl"
    >
      Go to homepage
    </a>
  </section>
);

// Helper to get URL path from tab name
const getPathFromTab = (tab: string): string => {
  if (tab === 'driver-agreement' || tab === 'driver-terms') return '/driver-agreement';
  if (tab === 'driver-faqs' || tab === 'driver-faq') return '/driver-faqs';
  if (tab === 'terms-and-conditions' || tab === 'terms') return '/terms-and-conditions';
  if (tab === 'privacy-policy') return '/privacy-policy';
  if (tab === 'about-us' || tab === 'about') return '/about-us';
  if (tab === 'help-support' || tab === 'help') return '/help-support';
  if (tab === 'app') return '/app';
  return '/';
};

export default function App() {
  const [activeTab, setActiveTabState] = useState<string>(getTabFromLocation());
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [aiAdvisorCargo, setAiAdvisorCargo] = useState<any>(null);

  // Sync document title, canonical link, and OpenGraph metadata per route
  usePageSeo(activeTab);

  // Sync state and push browser history URL
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    const newPath = getPathFromTab(tab);
    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct path navigation helper
  const navigateByPath = (path: string) => {
    const cleanPath = path.toLowerCase().replace(/\/$/, '') || '/';
    if (cleanPath.includes('driver-agreement') || cleanPath.includes('driver-terms') || cleanPath.includes('partner-agreement')) setActiveTab('driver-agreement');
    else if (cleanPath.includes('driver-faq') || cleanPath.includes('driver-faqs')) setActiveTab('driver-faqs');
    else if (cleanPath === '/terms-and-conditions' || cleanPath === '/terms' || cleanPath === '/terms-of-service') setActiveTab('terms-and-conditions');
    else if (cleanPath === '/privacy-policy') setActiveTab('privacy-policy');
    else if (cleanPath === '/about-us' || cleanPath === '/about') setActiveTab('about-us');
    else if (cleanPath === '/help-support' || cleanPath === '/help') setActiveTab('help-support');
    else if (cleanPath === '/app') setActiveTab('app');
    else setActiveTab('home');
  };

  // Handle browser back/forward buttons and hash navigation
  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getTabFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleDownloadAppRedirect = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
    setTimeout(() => {
      const appSection = document.getElementById('mobile-app-download');
      if (appSection) {
        appSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleHowItWorksScroll = () => {
    const howItWorksEl = document.getElementById('how-it-works');
    if (howItWorksEl) {
      howItWorksEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Standalone public route at /app (without navbar, sidebar, or footer)
  if (activeTab === 'app') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-[#07080C] flex items-center justify-center text-zinc-400">Loading…</div>}>
        <AppDownload />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080C] text-zinc-900 flex flex-col font-sans selection:bg-[#FF5D00] selection:text-white w-full relative">
      
      {/* 
        SCHBANG FIXED NAVBAR:
        Permanently anchored at top-0 with z-50 across entire viewport scroll,
        remaining visible both during normal scrolling and when the footer shutter lifts.
      */}
      <Navbar
        activeTab={activeTab === 'home' ? 'estimate' : activeTab}
        setActiveTab={(tab) => setActiveTab(tab === 'estimate' ? 'home' : tab)}
        openQuoteModal={() => { setAiAdvisorCargo(null); setIsQuoteModalOpen(true); }}
        openPartnerModal={() => setIsPartnerModalOpen(true)}
      />

      {/* 
        SCHBANG SHUTTER FOREGROUND CONTAINER:
        Houses all page content. Features curved bottom corners and high-depth elevation drop shadow.
        As the user reaches the bottom of the page, this shutter lifts upwards,
        smoothly revealing the sticky dark footer underneath while the Navbar remains fixed on top.
      */}
      <div 
        className="relative z-10 bg-[#F8F9FD] text-zinc-900 rounded-b-[40px] sm:rounded-b-[50px] lg:rounded-b-[60px] shadow-[0_25px_60px_rgba(0,0,0,0.7)] min-h-screen flex flex-col overflow-hidden pt-20"
        style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
      >
        
        {/* Main View Area */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <>
              <HeroBooking
                onDownloadAppClick={handleDownloadAppRedirect}
                openPartnerModal={() => setIsPartnerModalOpen(true)}
                onHowItWorksClick={handleHowItWorksScroll}
              />
              
              {/* Built for Everyone (Why Clickit) */}
              <WhyChooseClickit 
                onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
                onBookClick={handleDownloadAppRedirect}
              />
              
              {/* Frequently Asked Questions */}
              <FAQSection
                onNavigate={navigateByPath}
                onOpenQuoteModal={() => { setAiAdvisorCargo(null); setIsQuoteModalOpen(true); }}
                onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
              />

              {/* Mobile App Download */}
              <div id="mobile-app-download">
                <MobileAppBanner onOpenPartnerModal={() => setIsPartnerModalOpen(true)} />
              </div>
            </>
          )}

          <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-zinc-400">Loading...</div>}>
            {(activeTab === 'about-us' || activeTab === 'about') && (
              <AboutUs onNavigate={navigateByPath} />
            )}

            {(activeTab === 'driver-agreement' || activeTab === 'driver-terms') && (
              <DriverAgreement onNavigate={navigateByPath} />
            )}

            {(activeTab === 'driver-faqs' || activeTab === 'driver-faq') && (
              <DriverFAQs onNavigate={navigateByPath} />
            )}

            {activeTab === 'privacy-policy' && (
              <PrivacyPolicy onNavigate={navigateByPath} />
            )}

            {(activeTab === 'terms-and-conditions' || activeTab === 'terms') && (
              <TermsAndConditions onNavigate={navigateByPath} />
            )}

            {(activeTab === 'help-support' || activeTab === 'help') && (
              <HelpSupport onNavigate={navigateByPath} />
            )}

            {activeTab === 'not-found' && (
              <NotFound onHome={() => setActiveTab('home')} />
            )}
          </Suspense>
        </main>

        {/* 
          SCHBANG SHUTTER CURTAIN LIP (REMAINS VISIBLE BY ~24% AT TOP OF SCREEN)
          Solid white curved bar meeting the black footer with seamless rounded corners
        */}
        <div className="w-full bg-white border-t border-zinc-200/80 px-6 sm:px-12 lg:px-16 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-[40px] sm:rounded-b-[50px] lg:rounded-b-[60px]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5D00] animate-pulse" />
            <span className="text-xs font-black tracking-wider uppercase text-zinc-900">
              Clickit Express Fleet
            </span>
            <span className="hidden md:inline text-zinc-300">•</span>
            <span className="hidden md:inline text-xs font-medium text-zinc-500">
              India's On-Demand Logistics Network • 10–15 Min Express Pickup
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownloadAppRedirect}
              className="bg-[#FF5D00] hover:bg-[#E05200] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Get App
            </button>
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold px-4 py-2 rounded-lg border border-zinc-200 transition-all cursor-pointer"
            >
              Attach Fleet
            </button>
          </div>
        </div>

      </div>

      {/* 
        STICKY FOOTER REVEAL (SCHBANG SHUTTER EFFECT):
        Positioned sticky at bottom-0 with z-0, smoothly revealed as the shutter above rises.
      */}
      <Footer
        setActiveTab={setActiveTab}
        openQuoteModal={() => { setAiAdvisorCargo(null); setIsQuoteModalOpen(true); }}
        openPartnerModal={() => setIsPartnerModalOpen(true)}
      />

      {/* Lazy Modals */}
      <Suspense fallback={null}>
        {isQuoteModalOpen && (
          <EnterpriseQuoteModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
            initialCargoDetails={aiAdvisorCargo}
          />
        )}

        {isPartnerModalOpen && (
          <PartnerModal
            isOpen={isPartnerModalOpen}
            onClose={() => setIsPartnerModalOpen(false)}
          />
        )}
      </Suspense>

    </div>
  );
}
