import React, { useState } from 'react';
import { ClickitLogoMark } from './ClickitLogo';
import { 
  Smartphone, 
  QrCode, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  MapPin,
  Clock,
  FileCheck
} from 'lucide-react';

interface MobileAppBannerProps {
  onOpenPartnerModal?: () => void;
}

export const MobileAppBanner: React.FC<MobileAppBannerProps> = ({ onOpenPartnerModal }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsSent, setSmsSent] = useState(false);

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setSmsSent(true);
      setTimeout(() => setSmsSent(false), 4000);
    }
  };

  return (
    <div className="bg-white text-zinc-900 py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 relative overflow-hidden select-none">
      
      {/* Background ambient warm lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* MOBILE APP PROMOTIONAL BENTO SHOWCASE */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-[#FFF9F5] via-[#FFF3EB] to-[#FFF8F2] border border-orange-200/90 rounded-3xl p-8 sm:p-12 shadow-xl shadow-orange-500/5 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (7 Cols): Mobile App Powerhouse & SMS Sender */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-200 text-[#FF5D00] text-xs font-black uppercase tracking-wider shadow-xs">
                <ClickitLogoMark className="w-3.5 h-4" animated={true} pulse={false} />
                The Clickit Mobile App
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 leading-tight">
                Instant Logistics in Your Pocket <br />
                <span className="text-[#FF5D00]">Available on Android &amp; iOS</span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed max-w-xl">
                Book express bikes, 3-wheelers, Tata Ace, or multi-stop bulk trucks with a tap. Track live GPS telemetry, receive instant WhatsApp status updates, and download automated GST tax invoices.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-800 pt-1">
              <div className="flex items-center gap-2.5 bg-white/95 p-3.5 rounded-xl border border-orange-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">Live GPS Map Telemetry</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3.5 rounded-xl border border-orange-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">Digital e-POD Signature &amp; OTP</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3.5 rounded-xl border border-orange-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">Instant UPI &amp; Wallet Payments</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3.5 rounded-xl border border-orange-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">24/7 Dedicated Logistics Helpdesk</span>
              </div>
            </div>

            {/* SMS Download Link Input */}
            <form onSubmit={handleSendSms} className="space-y-2 pt-2">
              <label className="text-xs font-bold text-zinc-700">
                Get Direct App Download Link on Your Phone:
              </label>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-white text-xs text-zinc-900 placeholder-zinc-400 rounded-xl px-4 py-3 border border-zinc-300 flex-1 focus:border-[#FF5D00] focus:ring-1 focus:ring-[#FF5D00] focus:outline-none shadow-xs"
                />
                <button
                  type="submit"
                  className="bg-[#FF5D00] hover:bg-[#E05200] text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-orange-500/25 whitespace-nowrap cursor-pointer active:scale-95"
                >
                  Send App Link
                </button>
              </div>
              {smsSent && (
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SMS download link sent to {phoneNumber}!
                </p>
              )}
            </form>

          </div>

          {/* Right Column (5 Cols): QR Code & App Badges */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white p-8 sm:p-10 rounded-2xl border border-orange-200/80 space-y-6 text-center shadow-lg">
            
            {/* High-Contrast QR Code Card with Centered Brand Logo */}
            <div className="w-40 h-40 bg-zinc-50 p-3.5 rounded-2xl shadow-md border border-zinc-200 flex flex-col items-center justify-center relative group">
              <div className="w-full h-full border-2 border-zinc-900 p-1.5 grid grid-cols-5 gap-1">
                <div className="bg-zinc-900 col-span-2 row-span-2 rounded-sm"></div>
                <div className="bg-zinc-900 col-span-1"></div>
                <div className="bg-zinc-900 col-span-2 row-span-2 rounded-sm"></div>
                <div className="bg-zinc-900 col-span-1"></div>
                <div className="bg-[#FF5D00] col-span-2"></div>
                <div className="bg-zinc-900 col-span-3"></div>
                <div className="bg-zinc-900 col-span-2 row-span-2 rounded-sm"></div>
                <div className="bg-zinc-900 col-span-1"></div>
                <div className="bg-zinc-900 col-span-2"></div>
              </div>

              {/* Centered Clickit Brand Emblem */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-zinc-900 flex items-center justify-center p-1 shadow-xl">
                  <ClickitLogoMark className="w-6 h-7" animated={false} />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-black text-zinc-900 flex items-center justify-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#FF5D00]" /> Scan to Install Clickit App
              </p>
              <p className="text-xs text-zinc-500 font-medium">
                Compatible with iOS 14.0+ &amp; Android 8.0+
              </p>
            </div>

            <div className="flex gap-3 justify-center pt-1 w-full max-w-xs">
              <button className="flex-1 bg-zinc-900 hover:bg-black text-white text-xs py-3 px-4 rounded-xl font-bold transition-all shadow-sm cursor-pointer">
                Google Play
              </button>
              <button className="flex-1 bg-zinc-900 hover:bg-black text-white text-xs py-3 px-4 rounded-xl font-bold transition-all shadow-sm cursor-pointer">
                App Store
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
