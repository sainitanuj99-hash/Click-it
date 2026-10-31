import React, { useEffect, useState } from 'react';

// =========================================================================
// CONFIG: EDIT YOUR APP DOWNLOAD LINKS HERE
// =========================================================================
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.clickit.in";
export const APP_STORE_URL = "https://apps.apple.com/in/app/clickit-on-demand-logistics/id6814781045";
// =========================================================================

export type DeviceType = 'android' | 'ios' | 'other';

/**
 * Detects visitor device type based on userAgent, platform, and touch capabilities.
 * Supports manual URL simulation overrides (?device=android, ?device=ios, ?device=desktop)
 * as well as ?preview=true to preview the desktop card on any device without redirecting.
 */
export function detectDevice(): DeviceType {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'other';
  }

  // URL override helper for testing and developer preview
  const searchParams = new URLSearchParams(window.location.search);
  const override = searchParams.get('device') || searchParams.get('simulate') || searchParams.get('test');
  if (override === 'android') return 'android';
  if (override === 'ios') return 'ios';
  if (override === 'desktop' || override === 'other') return 'other';

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';

  // 1. Android devices
  if (/android/i.test(userAgent)) {
    return 'android';
  }

  // 2. iPhone, iPad and iPod
  if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return 'ios';
  }

  // 3. iPadOS 13+ (reports as "MacIntel" with touch support)
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return 'ios';
  }

  // 4. Desktop or unknown
  return 'other';
}

export default function AppDownload() {
  const [device, setDevice] = useState<DeviceType>(() => {
    if (typeof window !== 'undefined') {
      return detectDevice();
    }
    return 'other';
  });

  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [targetStoreUrl, setTargetStoreUrl] = useState<string>('');

  useEffect(() => {
    // 1. Set <meta name="robots" content="noindex">
    let robotsMeta = document.querySelector('meta[name="robots"]');
    const prevRobots = robotsMeta ? robotsMeta.getAttribute('content') : null;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    // Update document title for the /app route
    const prevTitle = document.title;
    document.title = 'Download Clickit App';

    // 2. Device detection & smart redirect
    const detected = detectDevice();
    setDevice(detected);

    const searchParams = new URLSearchParams(window.location.search);
    const isPreview = searchParams.get('preview') === 'true' || searchParams.get('noredirect') === 'true';

    if (!isPreview) {
      if (detected === 'android') {
        setIsRedirecting(true);
        setTargetStoreUrl(PLAY_STORE_URL);
        try {
          window.location.replace(PLAY_STORE_URL);
        } catch {
          window.location.href = PLAY_STORE_URL;
        }
      } else if (detected === 'ios') {
        setIsRedirecting(true);
        setTargetStoreUrl(APP_STORE_URL);
        try {
          window.location.replace(APP_STORE_URL);
        } catch {
          window.location.href = APP_STORE_URL;
        }
      }
    }

    return () => {
      // Restore previous title and robots meta on unmount
      document.title = prevTitle;
      if (robotsMeta) {
        if (prevRobots) {
          robotsMeta.setAttribute('content', prevRobots);
        } else {
          robotsMeta.remove();
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-zinc-50 dark:bg-[#07080C] text-zinc-900 dark:text-zinc-100 font-sans antialiased transition-colors duration-200">
      
      {/* Fallback for users with JavaScript disabled */}
      <noscript>
        <div className="w-full max-w-md mx-auto mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs text-center">
          JavaScript is disabled in your browser. Tap a store button below to download the app directly:
        </div>
      </noscript>

      {/* Main Container / Card */}
      <main className="w-full max-w-md bg-white dark:bg-[#12141C] border border-zinc-200/90 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl shadow-zinc-200/50 dark:shadow-black/60 text-center relative overflow-hidden">
        
        {/* Subtle Brand Accent Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF5D00]/15 dark:bg-[#FF5D00]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand App Icon: Original Clickit Logo */}
        <div className="relative mx-auto mb-5 w-20 h-20 rounded-2xl overflow-hidden shadow-xl shadow-orange-500/25 border border-zinc-200/90 dark:border-zinc-800 bg-black flex items-center justify-center p-2.5 transition-transform hover:scale-105 select-none">
          <img
            src="/favicon-512x512.png"
            alt="Clickit Logo"
            className="w-full h-full object-contain rounded-xl"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
            }}
          />
        </div>

        {isRedirecting ? (
          /* =========================================================================
             1. REDIRECTING STATE (Minimal, Fast, Instant)
             ========================================================================= */
          <div className="space-y-4 py-2">
            <div className="inline-flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-zinc-200 dark:border-zinc-800 border-t-[#FF5D00] rounded-full animate-spin" />
            </div>

            <div className="space-y-1">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                Redirecting…
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Opening {device === 'android' ? 'Google Play Store' : 'Apple App Store'} for you.
              </p>
            </div>

            <p className="text-xs text-zinc-400 dark:text-zinc-500 pt-3">
              If the store didn’t open automatically,{' '}
              <a
                href={targetStoreUrl}
                className="text-[#FF5D00] hover:text-orange-600 font-semibold underline underline-offset-2"
              >
                tap here to open
              </a>.
            </p>
          </div>
        ) : (
          /* =========================================================================
             2. DESKTOP / UNKNOWN DEVICE CARD
             ========================================================================= */
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Download our app
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
                Get Clickit on your mobile device for fast bookings, verified drivers, and live GPS delivery tracking.
              </p>
            </div>

            {/* Store Download Buttons */}
            <div className="flex flex-col gap-3 pt-1">
              
              {/* Google Play Button */}
              <a
                href={PLAY_STORE_URL}
                className="group relative flex items-center justify-center gap-3.5 px-5 py-3.5 rounded-2xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-800/90 dark:hover:bg-zinc-700/90 border border-zinc-800 dark:border-zinc-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                aria-label="Get it on Google Play"
              >
                {/* Official Google Play Icon */}
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 512 512" fill="none">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#4285F4" />
                  <path d="M47 38.6c-4.4 7.7-6.9 17.5-6.9 29v376.8c0 11.5 2.5 21.3 6.9 29l212.9-213.7L47 38.6z" fill="#34A853" />
                  <path d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" fill="#FBBC04" />
                  <path d="M444.2 235.8l-58.8-33.8-60.1 60.1 60.1 60.1 58.8-33.8c16.8-9.7 27.8-27.4 27.8-52.6 0-25.2-11-42.9-27.8-52.6z" fill="#EA4335" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] font-medium tracking-wider uppercase text-zinc-400 group-hover:text-zinc-300">
                    Get it on
                  </div>
                  <div className="text-sm font-bold text-white tracking-wide">
                    Google Play
                  </div>
                </div>
              </a>

              {/* Apple App Store Button */}
              <a
                href={APP_STORE_URL}
                className="group relative flex items-center justify-center gap-3.5 px-5 py-3.5 rounded-2xl bg-zinc-900 hover:bg-black text-white dark:bg-zinc-800/90 dark:hover:bg-zinc-700/90 border border-zinc-800 dark:border-zinc-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                aria-label="Download on the App Store"
              >
                {/* Official Apple Icon */}
                <svg className="w-6 h-6 shrink-0 fill-current text-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.07-7.69-7.85-11.98-14.35-5.88-8.91-10.45-18.79-13.72-29.63-3.27-10.84-4.91-21.2-4.91-31.08 0-14.36 3.59-26.31 10.77-35.86 7.18-9.54 16.32-14.42 27.42-14.64 4.8 0 10.15 1.25 16.06 3.75 5.91 2.5 9.71 3.86 11.4 4.08 1.48-.32 5.39-1.74 11.73-4.26 6.34-2.52 11.69-3.7 16.06-3.53 12.2.65 22.09 5.33 29.67 14.04-10.67 6.42-15.89 15.24-15.67 26.44.22 8.7 3.69 16.05 10.41 22.04 6.72 6 14.46 9.38 23.23 10.15-2.28 7.08-4.99 13.93-8.13 20.55zM119.22 31.81c0-7.07 2.57-13.74 7.71-20.02 5.14-6.28 11.51-10.41 19.11-12.4-.87 7.07-3.56 13.62-8.08 19.65-4.52 6.03-10.63 10.23-18.34 12.6-.14-.76-.4-1.63-.4-2.58z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] font-medium tracking-wider uppercase text-zinc-400 group-hover:text-zinc-300">
                    Download on the
                  </div>
                  <div className="text-sm font-bold text-white tracking-wide">
                    App Store
                  </div>
                </div>
              </a>

            </div>

          </div>
        )}

      </main>

      {/* Footer Branding Note */}
      <footer className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600 font-medium">
        Clickit • On-Demand Hyperlocal &amp; Intracity Logistics
      </footer>

    </div>
  );
}
