import React, { useState } from "react";
import {
  Briefcase,
  Sparkles,
  Phone,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Send,
  Users,
  Award,
  Share2,
  Check,
  Video,
  PenTool,
  Palette,
  TrendingUp,
  ArrowLeft
} from "lucide-react";

interface CareersProps {
  onNavigate?: (path: string) => void;
  initialLang?: 'en' | 'hi';
}

// Authentic WhatsApp icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.69 8.23-8.22 8.23zm4.51-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.54.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
  </svg>
);

// Recruitment phone & WhatsApp
const HR_PHONE_RAW = "919145091460";
const HR_PHONE_DISPLAY = "+91 91450 91460";
const HR_PHONE_COMPACT = "+91450 91460";

export default function Careers({ onNavigate, initialLang }: CareersProps) {
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

  // Form State tailored for Content Planner Intern
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    portfolioLink: "",
    primarySkill: "Reels & Short-Form Video Concepts",
    city: "Jaipur (or Hybrid)",
    duration: "3 - 6 Months",
    education: "Pursuing College / Recent Graduate",
    creativePitch: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);

  const generateWhatsAppUrl = (customText?: string) => {
    const text = customText || encodeURIComponent(
      `Hello Clickit Team! 🎨✨\nI saw your hiring post on Facebook and want to apply for the *Content Planner Intern* role.\n\n👤 Name: ${formData.fullName || "Candidate"}\n📞 Phone: ${formData.phone || "N/A"}\n🔗 Portfolio / Instagram: ${formData.portfolioLink || "Will share on chat"}\n💡 Primary Skill: ${formData.primarySkill}\n📍 City: ${formData.city}\n\nPlease share the interview task and next steps!`
    );
    return `https://wa.me/${HR_PHONE_RAW}?text=${text}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert(lang === 'hi' ? 'कृपया अपना पूरा नाम और फोन नंबर दर्ज करें।' : 'Please enter your full name and phone number.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const generatedId = `CLK-CONT-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationId(generatedId);

      try {
        const stored = JSON.parse(localStorage.getItem("clickit_job_applications") || "[]");
        stored.push({
          id: generatedId,
          role: "Content Planner Intern",
          ...formData,
          appliedAt: new Date().toISOString()
        });
        localStorage.setItem("clickit_job_applications", JSON.stringify(stored));
      } catch (err) {
        // ignore storage errors
      }

      setSubmitting(false);
      setSubmitted(true);

      const successEl = document.getElementById("application-success-banner");
      if (successEl) {
        successEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/careers`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-[#0B0C0E] text-zinc-100 min-h-screen py-6 sm:py-10">
      
      {/* Floating Sticky Mobile WhatsApp Apply CTA */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden">
        <a
          href={generateWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] font-bold text-sm active:scale-95 transition-all"
        >
          <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
          <span>Apply on WhatsApp</span>
        </a>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Top Breadcrumb & Share */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <button
              onClick={() => onNavigate ? onNavigate('/') : window.location.href = '/'}
              className="hover:text-[#FF5D00] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-zinc-200 font-bold">
              {lang === 'hi' ? 'करियर और इंटर्नशिप' : 'Careers & Internships'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
              title="Share job link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-xs font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-[#FF5D00] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'hi' ? 'bg-[#FF5D00] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* HERO BANNER - Spotlight on Content Planner Intern */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1A0B02] via-[#2A1002] to-[#FF5D00]/90 text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl border border-orange-500/30">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#FF5D00]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-6">
            
            {/* Active Hiring Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-orange-500/40 text-xs sm:text-sm font-bold tracking-wide text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>
                {lang === 'hi' ? 'सीधी भर्ती एक्टिव: कंटेंट प्लानर इंटर्न' : 'Active Opening: Content Planner Intern'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {lang === 'hi' ? (
                <>
                  क्लिकिट के लिए बनाएं <br className="hidden sm:inline" />
                  <span className="text-[#FFA048]">वायरल कंटेंट और कहानियां</span>
                </>
              ) : (
                <>
                  Shape the Creative Voice of <br className="hidden sm:inline" />
                  <span className="text-[#FFA048]">Clickit Logistics Jaipur</span>
                </>
              )}
            </h1>

            <p className="text-zinc-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-medium">
              {lang === 'hi'
                ? 'क्या आप रील्स, मीम्स, क्रिएटिव सोशल मीडिया और नई मार्केटिंग रणनीतियों के दीवाने हैं? क्लिकिट लॉजिस्टिक्स को तलाश है एक एनर्जेटिक कंटेंट प्लानर इंटर्न की! अभी व्हाट्सएप या फॉर्म से अप्लाई करें।'
                : 'Love brainstorming viral reels, writing sharp Hinglish copy, and building creator-style campaigns? Join Clickit as our Content Planner Intern. Real ownership, hands-on brand building, and fast-track PPO.'}
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              
              {/* Primary WhatsApp Action to specified number */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-emerald-950/40 active:scale-98 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
                <span>
                  {lang === 'hi' ? 'व्हाट्सएप पर अप्लाई करें' : 'Apply on WhatsApp'}
                </span>
                <span className="text-xs bg-black/25 px-2 py-0.5 rounded-md font-mono font-semibold">
                  {HR_PHONE_COMPACT}
                </span>
              </a>

              {/* Scroll to Online Form */}
              <a
                href="#apply-form-section"
                className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-100 px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all cursor-pointer"
              >
                <span>{lang === 'hi' ? 'ऑनलाइन फॉर्म भरें' : 'Fill 2-Min Form'}</span>
                <ArrowRight className="w-4 h-4 text-[#FF5D00]" />
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:${HR_PHONE_RAW}`}
                className="inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 text-white border border-white/20 px-4 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all font-mono"
              >
                <Phone className="w-4 h-4 text-[#FFA048]" />
                <span>{HR_PHONE_DISPLAY}</span>
              </a>
            </div>

            {/* Role Micro Details */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-zinc-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {lang === 'hi' ? 'मासिक स्टाइपेंड + इंसेंटिव्स' : 'Monthly Stipend + Incentives'}
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {lang === 'hi' ? 'जयपुर हेडक्वार्टर / हाइब्रिड' : 'Jaipur (Bani Park) / Hybrid'}
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {lang === 'hi' ? 'सर्टिफिकेट + PPO अवसर' : 'Certificate + PPO Opportunity'}
              </span>
            </div>
          </div>
        </div>

        {/* DETAILED ACTIVE JOB CARD: Content Planner Intern */}
        <div className="bg-[#12141C] rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-orange-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FF5D00] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl shadow-xs">
            ⭐ Active Recruitment
          </div>

          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500/10 text-[#FF5D00] border border-orange-500/25">
                  Brand & Creative Marketing
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">
                  Internship (3 - 6 Months)
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Pre-Placement Offer (PPO) Eligible
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Content Planner Intern
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF5D00] shrink-0" />
                <span>Jaipur (Bani Park Head Office) • Hybrid Flexibility</span>
              </p>
            </div>

            {/* Key Responsibilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/15 text-[#FF5D00] flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">
                  {lang === 'hi' ? 'रील्स और शॉर्ट वीडियो प्लानिंग' : 'Short-Form Video & Reels Concepts'}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {lang === 'hi'
                    ? 'इंस्टाग्राम रील्स और यूट्यूब शॉर्ट्स के लिए नए कॉन्सेप्ट्स, हुक्स और स्क्रिप्ट्स तैयार करना।'
                    : 'Ideate punchy, thumb-stopping reel concepts, relatable hooks, and scripts showing fast delivery & driver hustle.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <PenTool className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">
                  {lang === 'hi' ? 'सोशल मीडिया कंटेंट कैलेंडर' : 'Weekly & Monthly Content Calendar'}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {lang === 'hi'
                    ? 'इंस्टाग्राम, फेसबुक और लिंक्डइन के लिए हफ्ते का पूरा कैलेंडर और कैप्शन्स लिखना।'
                    : 'Manage scheduling, witty Hinglish captions, hashtags, and post distribution across Instagram, Facebook, and LinkedIn.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">
                  {lang === 'hi' ? 'ट्रेंड्स और मोमेंट मार्केटिंग' : 'Meme & Moment Marketing'}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {lang === 'hi'
                    ? 'इंटरनेट पर ट्रेंड कर रहे ऑडियो और मीम्स को क्लिकिट के लॉजिस्टिक्स ब्रांड के साथ तुरंत कनेक्ट करना।'
                    : 'Spot trending audio, viral formats, and Jaipur cultural moments, remixing them quickly for Clickit.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">
                  {lang === 'hi' ? 'ड्राइवर और कस्टमर की रियल स्टोरीज़' : 'Real Stories from the Ground'}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {lang === 'hi'
                    ? 'हमारे ड्राइवर पार्टनर्स और जयपुर के व्यापारियों के साथ इंटरव्यू और प्रेरणादायक वीडियो बनाना।'
                    : 'Capture human-interest stories of local business owners, driver milestones, and city delivery journeys.'}
                </p>
              </div>

            </div>

            {/* Who can apply */}
            <div className="border-t border-zinc-800 pt-5 space-y-3">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#FF5D00]">
                {lang === 'hi' ? 'कौन आवेदन कर सकता है?' : 'Who We Are Looking For:'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>College students or recent graduates passionate about content creation & marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Strong Hindi & English writing skills with natural, conversational voice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Basic hands-on familiarity with Canva / CapCut / Premiere or phone video apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Available for 3 to 6 months internship in Jaipur (Hybrid/In-office)</span>
                </li>
              </ul>
            </div>

            {/* Direct Contact Bar inside Card */}
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-orange-200">
                  Have questions or want to share your portfolio directly?
                </div>
                <div className="text-xs text-zinc-300 font-medium mt-0.5">
                  Connect directly with the hiring lead on WhatsApp or Call: <strong className="font-mono text-white">{HR_PHONE_DISPLAY}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp HR</span>
                </a>

                <a
                  href={`tel:${HR_PHONE_RAW}`}
                  className="inline-flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-zinc-700 transition-all font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF5D00]" />
                  <span>Call HR</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* APPLICATION FORM - Tailored for Content Planner Intern */}
        <div id="apply-form-section" className="scroll-mt-24">
          <div className="bg-[#12141C] rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl">
            
            <div className="border-b border-zinc-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-[#FF5D00] font-bold text-xs mb-2 border border-orange-500/25">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'hi' ? 'कंटेंट प्लानर इंटर्न आवेदन फॉर्म' : 'Direct Application • Content Planner Intern'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {lang === 'hi' ? 'अपनी डिटेल्स शेयर करें' : 'Apply for Content Planner Intern'}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Fill the short application below or message us directly on WhatsApp at <strong className="font-mono text-white">{HR_PHONE_DISPLAY}</strong>.
                </p>
              </div>

              {/* Direct WhatsApp Pill */}
              <div className="shrink-0 flex items-center gap-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Submission Success Banner */}
            {submitted && (
              <div
                id="application-success-banner"
                className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-emerald-300">
                      {lang === 'hi' ? 'आवेदन सफलतापूर्वक प्राप्त हुआ!' : 'Application Received!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-400 mt-1">
                      {lang === 'hi' 
                        ? `आपका एप्लीकेशन रेफरेंस नंबर है: ${applicationId}। हमारी टीम आपसे व्हाट्सएप / फोन पर जल्द संपर्क करेगी।`
                        : `Your application tracking reference is: ${applicationId}. Our marketing team will connect with you via WhatsApp or Call on ${formData.phone || "your number"}.`}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={generateWhatsAppUrl(encodeURIComponent(
                      `Hello Clickit Team! 🎨\nI just submitted my application for *Content Planner Intern* on your website.\n\nApplication ID: *${applicationId}*\nName: *${formData.fullName}*\nPhone: *${formData.phone}*\nPortfolio: *${formData.portfolioLink || "N/A"}*\n\nPlease confirm receipt!`
                    ))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Send Application ID to {HR_PHONE_COMPACT} on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-colors cursor-pointer"
                  >
                    Edit / Submit Again
                  </button>
                </div>
              </div>
            )}

            {/* Application Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white placeholder-zinc-500"
                  />
                </div>

                {/* Mobile / WhatsApp Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'मोबाइल / व्हाट्सएप नंबर *' : 'Mobile / WhatsApp Number *'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white font-mono placeholder-zinc-500"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'ईमेल पता' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white placeholder-zinc-500"
                  />
                </div>

                {/* Social / Portfolio / Work Link */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'इंस्टाग्राम प्रोफाइल / पोर्टफोलियो / ड्राइव लिंक *' : 'Instagram Handle, LinkedIn, or Portfolio Link *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. instagram.com/yourhandle or Google Drive link of your edits/samples"
                      value={formData.portfolioLink}
                      onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white placeholder-zinc-500"
                    />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'शहर / स्थान' : 'Current City'}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white placeholder-zinc-500"
                  />
                </div>

                {/* Primary Content Superpower */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'आपकी मुख्य स्किल (सुपरपावर)' : 'Primary Content Superpower'}
                  </label>
                  <select
                    value={formData.primarySkill}
                    onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white font-medium"
                  >
                    <option value="Reels & Short-Form Video Concepts">Reels & Short-Form Video Concepts</option>
                    <option value="Creative Copywriting & Scripts">Creative Copywriting & Scripts</option>
                    <option value="Visual Design & Canva / Graphics">Visual Design & Canva / Graphics</option>
                    <option value="Meme & Moment Marketing">Meme & Moment Marketing</option>
                    <option value="Content Strategy & Social Media Planning">Content Strategy & Planning</option>
                    <option value="All-Rounder Content Creator">All-Rounder Creator</option>
                  </select>
                </div>

                {/* Internship Duration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'इंटर्नशिप अवधि' : 'Available Duration'}
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white font-medium"
                  >
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months (Preferred for PPO)">6 Months (Preferred for PPO)</option>
                    <option value="Full-Time Immediate">Full-Time Immediate Role</option>
                  </select>
                </div>

                {/* Education Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'शिक्षा स्तर' : 'Education Status'}
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white font-medium"
                  >
                    <option value="Pursuing Graduation (College Student)">College Student (Any stream)</option>
                    <option value="Recent Graduate (2023 - 2026)">Recent Graduate</option>
                    <option value="Mass Comm / Journalism / Design Background">Media / Design / Mass Comm Student</option>
                    <option value="Self-Taught Creator / Freelancer">Self-Taught Creator / Freelancer</option>
                  </select>
                </div>

                {/* Creative Pitch / Idea */}
                <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                  <label className="text-xs font-bold text-zinc-300">
                    {lang === 'hi' ? 'क्लिकिट के लिए कोई 1 रील / कंटेंट आईडिया शेयर करें (वैकल्पिक)' : 'Share 1 creative reel / content idea for Clickit Logistics (Optional, but gives you an edge!)'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. A funny POV reel comparing moving furniture on a scooter vs booking Clickit in 10 mins..."
                    value={formData.creativePitch}
                    onChange={(e) => setFormData({ ...formData, creativePitch: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5D00] focus:border-[#FF5D00] bg-zinc-900 text-white placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">
                  Direct recruiter hotline: <strong className="font-mono text-zinc-200">{HR_PHONE_DISPLAY}</strong>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Send on WhatsApp ({HR_PHONE_COMPACT})</span>
                  </a>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 bg-[#FF5D00] hover:bg-[#E05200] disabled:opacity-75 text-white px-6 py-3 rounded-xl font-black text-sm shadow-md shadow-orange-500/20 active:scale-98 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Perks for Content Planner Intern */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF5D00]">
              {lang === 'hi' ? 'इंटर्नशिप के फायदे' : 'Why Intern at Clickit'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'रियल ब्रांड, रियल ग्रोथ' : 'Real Brand Building, Zero Coffee-Runs'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#12141C] p-5 rounded-2xl border border-zinc-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-[#FF5D00] flex items-center justify-center mb-3">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">
                Full Creative Ownership
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct access to founders and marketing heads. Your scripts and visual concepts actually go live.
              </p>
            </div>

            <div className="bg-[#12141C] p-5 rounded-2xl border border-zinc-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">
                PPO & Fast Career Track
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Top performing interns convert to Full-Time Content Strategist & Social Lead roles with full-time packages.
              </p>
            </div>

            <div className="bg-[#12141C] p-5 rounded-2xl border border-zinc-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">
                Stipend + Certificate + LOR
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Competitive monthly stipend, verified internship certificate, and personalized recommendation letter.
              </p>
            </div>

            <div className="bg-[#12141C] p-5 rounded-2xl border border-zinc-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">
                Jaipur Bani Park Studio Hub
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Work from our central Jaipur headquarters with camera gear, shoot access, and hybrid flexibility.
              </p>
            </div>
          </div>
        </div>

        {/* Walk-in & Recruiter Contact Banner with User's Number */}
        <div className="rounded-3xl bg-[#12141C] text-white p-6 sm:p-10 border border-zinc-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 font-semibold text-xs border border-zinc-800">
              <MapPin className="w-3.5 h-3.5 text-[#FF5D00]" />
              <span>Jaipur HQ & Recruitment Desk</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Ready to create content for Clickit?
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">Clickit Logistics Private Limited:</strong><br />
              Ground Floor, B-18-A, Shiv Marg, near Collectorate Circle, Bani Park, Jaipur, Rajasthan 302016.<br />
              Recruiter Helpline: <strong className="text-white font-mono">{HR_PHONE_DISPLAY} ({HR_PHONE_COMPACT})</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp {HR_PHONE_COMPACT}</span>
            </a>

            <a
              href={`tel:${HR_PHONE_RAW}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-zinc-100 transition-all shadow-md font-mono"
            >
              <Phone className="w-4 h-4 text-[#FF5D00]" />
              <span>Call {HR_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
