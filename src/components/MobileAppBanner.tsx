import React, { useState } from 'react';
import { ClickitLogoMark } from './ClickitLogo';
import { PLAY_STORE_URL, PLAY_STORE_PACKAGE_ID } from '../data/mockData';
import { 
  Smartphone, 
  Mail, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck, 
  Zap, 
  Sparkles,
  QrCode,
  Download,
  Star,
  Check
} from 'lucide-react';

interface MobileAppBannerProps {
  onOpenPartnerModal?: () => void;
}

export const MobileAppBanner: React.FC<MobileAppBannerProps> = ({ onOpenPartnerModal }) => {
  const [iosEmail, setIosEmail] = useState('');
  const [iosSubmitted, setIosSubmitted] = useState(false);

  const handleIosWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!iosEmail.trim()) return;

    try {
      const stored = localStorage.getItem('clickit_ios_waitlist') || '[]';
      const list = JSON.parse(stored);
      list.push({ email: iosEmail.trim(), date: new Date().toISOString() });
      localStorage.setItem('clickit_ios_waitlist', JSON.stringify(list));
    } catch {
      // ignore
    }
    setIosSubmitted(true);
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(PLAY_STORE_URL)}&bgcolor=FFFFFF&color=000000&margin=4`;

  return (
    <div className="bg-white text-zinc-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 relative overflow-hidden select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* APP LAUNCH HERO BENTO CONTAINER */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-[#FFF9F5] via-[#FFF3EB] to-[#FFF8F2] border border-orange-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-orange-500/5 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 Cols): Headline, Value Props & Download Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Now Live on Google Play Store</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 leading-tight">
                Clickit Mobile App <br />
                <span className="text-[#FF5D00]">Is Officially Launched!</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 font-medium leading-relaxed max-w-xl">
                Experience Jaipur's fastest intracity logistics on your smartphone. Book 2-wheelers, 3-wheeler loaders, Tata Ace, and pickup trucks in under 60 seconds with live GPS tracking.
              </p>
            </div>

            {/* Direct Google Play Store Download Action */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3.5 bg-black hover:bg-zinc-800 text-white px-6 py-3.5 rounded-2xl shadow-xl shadow-black/20 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-200 border border-zinc-800 cursor-pointer active:scale-95"
              >
                {/* Official Google Play Vector Icon */}
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 512 512">
                  <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
                  <path fill="#34A853" d="M47 38.6c-4.4 7.7-6.9 17.5-6.9 29v376.8c0 11.5 2.5 21.3 6.9 29l212.9-213.7L47 38.6z"/>
                  <path fill="#FBBC04" d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"/>
                  <path fill="#EA4335" d="M444.2 235.8l-58.8-33.8-60.1 60.1 60.1 60.1 58.8-33.8c16.8-9.7 27.8-27.4 27.8-52.6 0-25.2-11-42.9-27.8-52.6z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-zinc-300 font-medium tracking-wider uppercase leading-none">
                    GET IT ON
                  </div>
                  <div className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                    Google Play
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform ml-1" />
              </a>

              {onOpenPartnerModal && (
                <button
                  type="button"
                  onClick={onOpenPartnerModal}
                  className="inline-flex items-center gap-2 bg-white hover:bg-orange-50/80 text-zinc-900 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl border border-zinc-200 hover:border-orange-300 shadow-xs transition-all cursor-pointer"
                >
                  <span>Become a Partner Driver</span>
                </button>
              )}
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-800 pt-2">
              <div className="flex items-center gap-2.5 bg-white/95 p-3 rounded-xl border border-orange-100 shadow-xs">
                <Zap className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">10-15 Min Rapid Driver Dispatch</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3 rounded-xl border border-orange-100 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">Play Protect Verified • 28 MB</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3 rounded-xl border border-orange-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">Live GPS Telemetry &amp; OTP Handoff</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3 rounded-xl border border-orange-100 shadow-xs">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span className="font-bold">Instant GST Invoice on Completion</span>
              </div>
            </div>

            {/* Apple iOS Notification Section */}
            <div className="pt-2 border-t border-orange-200/60 max-w-lg">
              <div className="flex items-center justify-between text-xs pb-2">
                <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-zinc-500" />
                  Have an iPhone?
                </span>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                  iOS App Coming Soon
                </span>
              </div>

              {!iosSubmitted ? (
                <form onSubmit={handleIosWaitlist} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email for iOS launch..."
                      value={iosEmail}
                      onChange={(e) => setIosEmail(e.target.value)}
                      className="w-full bg-white text-xs text-zinc-900 placeholder-zinc-400 rounded-xl pl-9 pr-3 py-2.5 border border-zinc-300 focus:border-[#FF5D00] focus:ring-1 focus:ring-[#FF5D00] focus:outline-none shadow-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    Notify Me
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-emerald-800 text-xs flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>You'll receive an email as soon as the iOS app drops on the Apple App Store!</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column (5 Cols): Real Scannable QR Code & Visual App Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white p-6 sm:p-8 rounded-3xl border border-orange-200/80 space-y-5 text-center shadow-lg relative">
            
            {/* Top Play Store Logo & App Title */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF5D00] to-orange-400 p-0.5 flex items-center justify-center shadow-md shadow-orange-500/20">
                <div className="w-full h-full bg-[#12141C] rounded-[14px] flex items-center justify-center">
                  <ClickitLogoMark className="w-8 h-9" animated={false} />
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-base font-black text-zinc-900 leading-tight">Clickit Delivery</h3>
                <p className="text-xs text-zinc-500 font-medium">com.clickit.in</p>
                <div className="flex items-center gap-1 mt-0.5 text-[11px] font-bold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Available on Google Play</span>
                </div>
              </div>
            </div>

            {/* Real Scannable QR Code */}
            <div className="bg-white p-3.5 rounded-2xl border-2 border-orange-200/90 shadow-md inline-block">
              <img 
                src={qrImageUrl}
                alt="Scan QR code to install Clickit Android App from Google Play Store"
                className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-xl"
                loading="lazy"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-black text-zinc-900 flex items-center justify-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-[#FF5D00]" />
                <span>Scan with your phone to install</span>
              </p>
              <p className="text-[11px] text-zinc-500 font-medium max-w-xs leading-relaxed">
                Open your phone's camera and point at this QR code to open the Google Play Store directly.
              </p>
            </div>

            {/* Direct Link as backup */}
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#FF5D00] hover:text-[#E05200] underline flex items-center justify-center gap-1 cursor-pointer pt-1"
            >
              <span>Or click here to open on Google Play</span>
              <ExternalLink className="w-3 h-3" />
            </a>

          </div>

        </div>

      </div>
    </div>
  );
};
