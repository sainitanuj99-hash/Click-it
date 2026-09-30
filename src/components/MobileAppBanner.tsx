import React, { useState, useEffect } from 'react';
import { ClickitLogoMark } from './ClickitLogo';
import { 
  Smartphone, 
  Mail, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Bell,
  Clock,
  Gift
} from 'lucide-react';

interface MobileAppBannerProps {
  onOpenPartnerModal?: () => void;
}

export const MobileAppBanner: React.FC<MobileAppBannerProps> = ({ onOpenPartnerModal }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalWaitlistCount, setTotalWaitlistCount] = useState(1420);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('clickit_app_waitlist');
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list)) {
          setTotalWaitlistCount(1420 + list.length);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const existing = localStorage.getItem('clickit_app_waitlist');
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        email: email.trim(),
        phone: phone.trim(),
        joinedAt: new Date().toISOString()
      });
      localStorage.setItem('clickit_app_waitlist', JSON.stringify(list));
      setTotalWaitlistCount(prev => prev + 1);
    } catch {
      // ignore local storage error
    }

    setIsSubmitted(true);
  };

  return (
    <div className="bg-white text-zinc-900 py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 relative overflow-hidden select-none">
      
      {/* Background ambient warm lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* MOBILE APP WAITLIST BENTO SHOWCASE */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-[#FFF9F5] via-[#FFF3EB] to-[#FFF8F2] border border-orange-200/90 rounded-3xl p-8 sm:p-12 shadow-xl shadow-orange-500/5 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (7 Cols): Waiting List Header & Email Form */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-200 text-[#FF5D00] text-xs font-black uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5D00] animate-pulse" />
                Coming Soon to Android &amp; iOS
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 leading-tight">
                Please Join the App Waiting List <br />
                <span className="text-[#FF5D00]">Get Early Access &amp; Launch Download Link</span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed max-w-xl">
                We're putting the finishing touches on the Clickit mobile app. Join our launch waiting list today. When the app goes live, we'll email you your direct download link along with exclusive early-bird booking perks!
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-800 pt-1">
              <div className="flex items-center gap-2.5 bg-white/95 p-3.5 rounded-xl border border-orange-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">Instant Email Link at Launch</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3.5 rounded-xl border border-orange-100 shadow-xs">
                <Gift className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">₹100 First Order Discount</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3.5 rounded-xl border border-orange-100 shadow-xs">
                <Zap className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">Priority Driver Matching</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/95 p-3.5 rounded-xl border border-orange-100 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span className="font-bold">Live GPS Telemetry &amp; Proof</span>
              </div>
            </div>

            {/* Waiting List Capture Form */}
            {!isSubmitted ? (
              <form onSubmit={handleJoinWaitlist} className="space-y-3 pt-2">
                <label className="text-xs font-bold text-zinc-700 block">
                  Join the Waiting List to Receive Your Download Link:
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white text-xs text-zinc-900 placeholder-zinc-400 rounded-xl px-4 py-3 border border-zinc-300 focus:border-[#FF5D00] focus:ring-1 focus:ring-[#FF5D00] focus:outline-none shadow-xs"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Mobile number (optional)..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white text-xs text-zinc-900 placeholder-zinc-400 rounded-xl px-4 py-3 border border-zinc-300 focus:border-[#FF5D00] focus:ring-1 focus:ring-[#FF5D00] focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="bg-[#FF5D00] hover:bg-[#E05200] text-white font-black text-xs px-7 py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/25 whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-2"
                  >
                    <span>Join Priority Waiting List</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-[11px] font-semibold text-zinc-500">
                    🔥 <strong className="text-zinc-800">{totalWaitlistCount.toLocaleString()}+</strong> users already on waitlist
                  </span>
                </div>
              </form>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2 text-emerald-900 max-w-lg">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>You're on the priority waiting list!</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                  We have registered <strong>{email}</strong>. When the Clickit app goes live, we'll email you a direct download link with your ₹100 welcome credit immediately.
                </p>
                <button
                  type="button"
                  onClick={() => { setIsSubmitted(false); setEmail(''); setPhone(''); }}
                  className="text-[11px] font-bold text-emerald-800 underline hover:text-emerald-900 pt-1 block cursor-pointer"
                >
                  Register another email
                </button>
              </div>
            )}

          </div>

          {/* Right Column (5 Cols): App Preview & Early Access Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white p-8 sm:p-10 rounded-2xl border border-orange-200/80 space-y-6 text-center shadow-lg">
            
            {/* Visual Icon Badge */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#FF5D00] to-orange-400 p-1 flex items-center justify-center shadow-xl shadow-orange-500/20">
              <div className="w-full h-full bg-[#12141C] rounded-[22px] flex items-center justify-center">
                <ClickitLogoMark className="w-12 h-14" animated={true} />
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-base font-black text-zinc-900 flex items-center justify-center gap-1.5">
                <Bell className="w-4 h-4 text-[#FF5D00]" /> Launch Notification Guarantee
              </p>
              <p className="text-xs text-zinc-500 font-medium max-w-xs leading-relaxed">
                When the app goes live on Google Play and Apple App Store, all waitlist members receive instant bulk email notification with the official download link.
              </p>
            </div>

            <div className="w-full space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-zinc-600 bg-zinc-50 px-4 py-2.5 rounded-xl border border-zinc-200">
                <span className="font-bold text-zinc-800">Google Play Store</span>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">Coming Soon</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-600 bg-zinc-50 px-4 py-2.5 rounded-xl border border-zinc-200">
                <span className="font-bold text-zinc-800">Apple App Store</span>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">Coming Soon</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 font-medium">
              Compatible with Android 8.0+ &amp; iOS 14.0+
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};
