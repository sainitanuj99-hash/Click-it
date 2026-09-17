import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Award, Zap, Eye, Globe, Copy, Check, ShieldCheck, HeartHandshake } from "lucide-react";

interface AboutUsProps {
  onNavigate?: (path: string) => void;
  initialLang?: 'en' | 'hi';
}

export default function AboutUs({ onNavigate, initialLang }: AboutUsProps) {
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    if (initialLang) return initialLang;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('lang') === 'hi' || window.location.hash.includes('lang=hi')) {
        return 'hi';
      }
    }
    return 'en';
  });

  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleLangChange = (newLang: 'en' | 'hi') => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const copyInAppLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/about-us?lang=${lang}`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const content = {
    en: {
      badge: "On-Demand Logistics Network",
      category: "About ClickIt",
      title: "Moving Your World, One Click at a Time",
      developerNote: "In-App URL for mobile app developers:",
      p1: "ClickIt was built to solve a simple problem: getting goods from point A to point B shouldn't be complicated, expensive, or unreliable.",
      p2: "We connect individuals and businesses who need to move goods — big or small — with a trusted network of verified Delivery Partners, all through a few taps on your phone. Whether it's a same-day parcel, a bulk commercial shipment, or a scheduled fleet pickup, ClickIt makes logistics simple, transparent, and fast.",
      whatWeDoTitle: "What We Do",
      whatWeDoDesc: "ClickIt offers on-demand and scheduled intracity & intercity transport services across Jaipur and Rajasthan. We provide real-time GPS tracking, upfront transparent pricing with zero surge surprises, and dedicated priority support for both business enterprises and independent Delivery Partners.",
      whyTitle: "Why ClickIt",
      features: [
        {
          title: "Verified Delivery Partners",
          desc: "Every driver partner on our platform undergoes strict police, driving license, and commercial vehicle background verification.",
        },
        {
          title: "Transparent Upfront Pricing",
          desc: "No hidden charges or bargaining. Clear kilometer and hourly rates known to both customer and driver before booking.",
        },
        {
          title: "Real-Time GPS Tracking",
          desc: "Live route tracking with secure OTP verification at both pickup and delivery locations for peace of mind.",
        },
        {
          title: "Reliable 24/7 Support",
          desc: "Our dedicated operations and partner support helpline is always active to assist drivers and shippers on every route.",
        },
      ],
      visionTitle: "Our Vision",
      visionDesc: "To build India's most trusted, technologically advanced on-demand logistics ecosystem — empowering shippers with speed and reliability while enabling commercial fleet drivers to earn higher, dignified, and timely livelihoods with full respect.",
      motto: "Samman Apka, Zimedari Humari",
    },
    hi: {
      badge: "ऑन-डिमांड लॉजिस्टिक्स नेटवर्क",
      category: "क्लिकइट के बारे में (About Us)",
      title: "आपकी हर डिलीवरी को आसान और भरोसेमंद बनाना",
      developerNote: "मोबाइल ऐप डेवलपर्स के लिए इन-ऐप यूआरएल:",
      p1: "ClickIt (क्लिकइट) की शुरुआत एक सरल संकल्प के साथ हुई: सामान को एक स्थान से दूसरे स्थान तक पहुंचाना कठिन, महंगा या अनिश्चित नहीं होना चाहिए।",
      p2: "हम सामान भेजने वाले छोटे-बड़े व्यापारियों, उद्यमियों और आम नागरिकों को हमारे भरोसेमंद, पुलिस-वेरिफाइड डिलीवरी पार्टनर्स (ड्राइवर भाइयों) से जोड़ते हैं। चाहे वह छोटा पार्सल हो, 2-व्हीलर डिलीवरी हो, या 7ft, 8ft, 14ft और कंटेनर ट्रक का बड़ा माल — क्लिकइट लॉजिस्टिक्स को तेज़, पारदर्शी और आसान बनाता है।",
      whatWeDoTitle: "हम क्या करते हैं",
      whatWeDoDesc: "क्लिकइट जयपुर और पूरे राजस्थान में त्वरित और निर्धारित (शेड्यूल्ड) माल परिवहन सेवाएं प्रदान करता है। इसमें रियल-टाइम लाइव जीपीएस ट्रैकिंग, पहले से तय पारदर्शी किराया, और ग्राहक एवं ड्राइवर दोनों के लिए 24/7 हेल्पलाइन सहायता शामिल है।",
      whyTitle: "क्लिकइट को क्यों चुनें?",
      features: [
        {
          title: "सत्यापित डिलीवरी पार्टनर्स",
          desc: "हमारे प्लेटफॉर्म पर प्रत्येक ड्राइवर का ड्राइविंग लाइसेंस, आरसी, वाहन फिटनेस, और पुलिस बैकग्राउंड वेरिफिकेशन सुनिश्चित किया जाता है।",
        },
        {
          title: "पारदर्शी और फिक्स किराया",
          desc: "कोई छुपा हुआ शुल्क या मोलभाव नहीं। बुकिंग से पहले ही सटीक किराया स्क्रीन पर प्रदर्शित होता है।",
        },
        {
          title: "लाइव जीपीएस ट्रैकिंग एवं ओटीपी सुरक्षा",
          desc: "पिकअप से लेकर डिलीवरी तक सुरक्षित ओटीपी कोड और मैप पर गाड़ी की सटीक लोकेशन लाइव देखें।",
        },
        {
          title: "24/7 त्वरित सपोर्ट",
          desc: "सड़क पर किसी भी समस्या या ट्रिप सहायता के लिए हमारी समर्पित कस्टमर व ड्राइवर हेल्पलाइन हमेशा तत्पर है।",
        },
      ],
      visionTitle: "हमारा विजन (Our Vision)",
      visionDesc: "भारत का सबसे भरोसेमंद और सशक्त लॉजिस्टिक्स नेटवर्क बनना — जहां व्यापारियों को निर्बाध व त्वरित डिलीवरी मिले और हमारे ड्राइवर पार्टनर्स को उनकी मेहनत का पूरा सम्मान, उचित किराया और सुरक्षित भविष्य मिले।",
      motto: "सम्मान आपका, ज़िम्मेदारी हमारी",
    },
  };

  const current = content[lang];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 font-sans pb-24">
      {/* Top Bar with Language Switcher */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/90 sticky top-0 z-20 backdrop-blur-md py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate ? onNavigate('/') : window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-[#FF5D00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {lang === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}
          </button>

          {/* Language Selector Buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
              <button
                onClick={() => handleLangChange('en')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  lang === 'en'
                    ? 'bg-[#FF5D00] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLangChange('hi')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  lang === 'hi'
                    ? 'bg-[#FF5D00] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>

            {/* Copy In-App Link Button */}
            <button
              onClick={copyInAppLink}
              className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 px-3 py-1 rounded-lg text-xs font-medium transition-all"
              title="Copy URL for Driver App WebView"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">{lang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{lang === 'hi' ? 'यूआरएल कॉपी करें' : 'Copy URL'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
        {/* Developer Deep Link Helper Banner */}
        <div className="mb-8 p-3.5 bg-zinc-900/90 border border-zinc-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <Globe className="w-4 h-4 text-[#FF5D00] shrink-0" />
            <span>{current.developerNote}</span>
            <code className="bg-black px-2 py-0.5 rounded text-orange-400 font-mono text-[11px] select-all">
              /about-us?lang={lang}
            </code>
          </div>
          <span className="text-zinc-500 text-[11px]">
            {lang === 'hi' ? 'ड्राइवर ऐप वेबव्यू के लिए उपयुक्त' : 'Ready for Driver App WebView'}
          </span>
        </div>

        <header className="mb-10 border-b border-zinc-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> {current.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {current.title}
          </h1>
          <p className="text-zinc-400 font-medium text-sm">
            {current.category} • Clickit Delivery Network Pvt. Ltd.
          </p>
        </header>

        {/* Intro Story Cards */}
        <div className="space-y-4 mb-10">
          <div className="bg-[#12141C] border border-zinc-800 rounded-2xl p-6 shadow-md text-zinc-300 leading-relaxed text-sm sm:text-base">
            {current.p1}
          </div>

          <div className="bg-[#12141C] border border-zinc-800 rounded-2xl p-6 shadow-md text-zinc-300 leading-relaxed text-sm sm:text-base">
            {current.p2}
          </div>
        </div>

        {/* What We Do */}
        <section className="mb-10 bg-[#12141C] border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-[#FF5D00]">{current.whatWeDoTitle}</span>
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            {current.whatWeDoDesc}
          </p>
        </section>

        {/* Why ClickIt */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-5 flex items-center gap-2">
            <span className="text-[#FF5D00]">{current.whyTitle}</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {current.features.map((f, i) => (
              <div 
                key={i} 
                className="bg-[#12141C] border border-zinc-800 hover:border-orange-500/40 transition-all rounded-2xl p-5 shadow-sm space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0" />
                  <h3 className="font-bold text-white text-base">{f.title}</h3>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pl-6">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Vision */}
        <section className="bg-gradient-to-r from-[#12141C] to-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-sm mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#FF5D00]" />
            <span className="text-[#FF5D00]">{current.visionTitle}</span>
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base mb-4">
            {current.visionDesc}
          </p>
          <div className="inline-block bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-xl text-[#FF5D00] font-bold text-sm tracking-wide">
            "{current.motto}"
          </div>
        </section>
      </div>
    </div>
  );
}
