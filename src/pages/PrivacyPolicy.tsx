import React, { useState } from "react";
import { Shield, ArrowLeft, Mail, Phone, Lock, FileText, Globe, Copy, Check } from "lucide-react";

interface PrivacyPolicyProps {
  onNavigate?: (path: string) => void;
  initialLang?: 'en' | 'hi';
}

export default function PrivacyPolicy({ onNavigate, initialLang }: PrivacyPolicyProps) {
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
      const url = `${window.location.origin}/privacy-policy?lang=${lang}`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const content = {
    en: {
      badge: "Data Protection & Security",
      officialBadge: "Official Policy",
      title: "Privacy Policy",
      lastUpdated: "Last Updated: 15th Sept 2026",
      effectiveDate: "Effective Date: 15th Sept 2026",
      deepLinkNote: "In-App URL for developers:",
      intro: "This Privacy Policy explains how ClickIt (\"Company,\" \"we,\" \"us,\" or \"our\") collects, uses, discloses, and protects your information when you use our website and mobile application (collectively, the \"ClickIt Platform\"), whether as a Customer or a Delivery Partner.",
      sections: [
        {
          title: "1. Information We Collect",
          items: [
            ["Account Information", "Name, phone number, email address, and password."],
            ["Delivery Partner Information", "Government ID proof, address proof, vehicle registration and documents, bank/UPI details, and profile photo (for KYC and verification)."],
            ["Location Data", "Real-time GPS location while using the app, to enable pickup, delivery, and tracking."],
            ["Transaction Information", "Booking history, payment details, invoices, and order status."],
            ["Device & Usage Information", "Device type, IP address, app version, and interaction data collected automatically for performance and security purposes."],
          ],
        },
        {
          title: "2. How We Use Your Information",
          list: [
            "To create and manage your account",
            "To process bookings, match Delivery Partners, and complete deliveries",
            "To process payments and generate invoices",
            "To verify Delivery Partner identity and eligibility",
            "To provide customer support and resolve disputes",
            "To send booking updates, offers, and service notifications",
            "To improve app performance and prevent fraud or misuse",
          ],
        },
        {
          title: "3. Sharing of Information",
          paragraph: "We do not sell your personal information. We may share information with:",
          list: [
            "Delivery Partners/Customers as needed to complete a booking",
            "Payment gateway providers to process transactions",
            "Law enforcement or regulators when required by law",
            "Service providers who support our operations (e.g., cloud hosting, SMS/notification services), bound by confidentiality obligations",
          ],
        },
        {
          title: "4. Data Retention",
          paragraph: "We retain your information for as long as your account is active or as needed to comply with legal, tax, or regulatory obligations.",
        },
        {
          title: "5. Data Security",
          paragraph: "We use reasonable technical and organizational measures (including SSL encryption and access controls) to protect your data from unauthorized access, alteration, or disclosure.",
        },
        {
          title: "6. Your Rights",
          paragraph: "You may access, update, or request deletion of your personal information by contacting us at support@justclickit.in. You may also opt out of promotional communications at any time.",
        },
        {
          title: "7. Children's Privacy",
          paragraph: "ClickIt is not intended for use by individuals under the age of 18.",
        },
        {
          title: "8. Changes to This Policy",
          paragraph: "We may update this Policy periodically. Continued use of the Platform after changes are posted constitutes acceptance of the revised Policy.",
        },
        {
          title: "9. Grievance Officer & Contact Details",
          paragraph: "Pursuant to the Information Technology Act, 2000, for privacy questions or escalations contact:",
          contactInfo: {
            officer: "Grievance Officer, Clickit Delivery Network Pvt. Ltd.",
            email: "grievance@justclickit.in",
            supportEmail: "support@justclickit.in",
            phone: "+91 141 498 2200 / 1800-CLICKIT"
          }
        },
      ]
    },
    hi: {
      badge: "डेटा सुरक्षा एवं गोपनीयता संरक्षण",
      officialBadge: "आधिकारिक नीति",
      title: "गोपनीयता नीति (Privacy Policy)",
      lastUpdated: "अंतिम संशोधन: 15 सितंबर 2026",
      effectiveDate: "लागू तिथि: 15 सितंबर 2026",
      deepLinkNote: "मोबाइल ऐप में हिंदी में लिंक करने हेतु यूआरएल:",
      intro: "यह गोपनीयता नीति स्पष्ट करती है कि ClickIt (\"कंपनी\", \"हम\" या \"हमारा\") आपकी व्यक्तिगत जानकारी कैसे एकत्र, उपयोग, साझा और सुरक्षित करता है जब आप हमारी वेबसाइट या मोबाइल ऐप (सामूहिक रूप से \"क्लिकइट प्लेटफॉर्म\") का उपयोग एक ग्राहक या डिलीवरी पार्टनर के रूप में करते हैं।",
      sections: [
        {
          title: "1. हम कौन-सी जानकारी एकत्र करते हैं (Information We Collect)",
          items: [
            ["खाता संबंधी जानकारी (Account Information)", "आपका नाम, मोबाइल फोन नंबर, ईमेल आईडी एवं सुरक्षित पासवर्ड।"],
            ["डिलीवरी पार्टनर दस्तावेज (KYC Data)", "पहचान पत्र (आधार/पैन), ड्राइविंग लाइसेंस, वाहन का आरसी व बीमा दस्तावेज, बैंक/यूपीआई विवरण एवं प्रोफाइल फोटो (केवाईसी सत्यापन हेतु)।"],
            ["स्थान / जीपीएस डेटा (Real-time GPS Location)", "ऐप के उपयोग के दौरान वास्तविक समय (Live) जीपीएस लोकेशन, जिससे पिकअप, सुरक्षित पार्सल डिलीवरी और लाइव ट्रैकिंग संभव हो सके।"],
            ["लेन-देन एवं बुकिंग रिकॉर्ड (Transaction Data)", "बुकिंग का इतिहास, भुगतान का प्रकार, इनवॉइस (बिल) और ऑर्डर की स्थिति।"],
            ["डिवाइस एवं तकनीकी जानकारी (Device & App Usage)", "डिवाइस का मॉडल, आईपी पता (IP Address), ऑपरेटिंग सिस्टम और सुरक्षा व धोखाधड़ी रोकथाम हेतु विश्लेषणात्मक डेटा।"],
          ],
        },
        {
          title: "2. आपकी जानकारी का उपयोग (How We Use Your Information)",
          list: [
            "आपका सुरक्षित उपयोगकर्ता खाता बनाने व प्रबंधित करने के लिए",
            "लॉजिस्टिक्स बुकिंग स्वीकार करने, निकटतम डिलीवरी पार्टनर से मिलान करने और पार्सल पहुंचाने के लिए",
            "डिजिटल भुगतान संसाधित करने और जीएसटी इनवॉइस जारी करने के लिए",
            "डिलीवरी पार्टनर्स की पहचान व पृष्ठभूमि (KYC) सत्यापित करने के लिए",
            "24x7 ग्राहक सहायता प्रदान करने और विवादों का समाधान करने के लिए",
            "लाइव डिलीवरी स्टेटस, सुरक्षा अलर्ट व आवश्यक सूचनाएं भेजने के लिए",
            "ऐप के प्रदर्शन को बेहतर बनाने और किसी भी प्रकार की धोखाधड़ी या दुरुपयोग को रोकने के लिए",
          ],
        },
        {
          title: "3. जानकारी साझा करना (Sharing of Information)",
          paragraph: "हम आपकी व्यक्तिगत जानकारी को किसी भी तीसरे पक्ष को बेचते नहीं हैं। आपकी जानकारी केवल निम्नलिखित आवश्यक परिस्थितियों में ही साझा की जाती है:",
          list: [
            "संबंधित डिलीवरी पार्टनर अथवा ग्राहक के साथ, जो उस विशिष्ट ऑर्डर को पूरा करने के लिए आवश्यक हो (जैसे पिकअप/डिलीवरी पता व फोन नंबर)",
            "सुरक्षित ऑनलाइन लेन-देन के लिए आरबीआई द्वारा अधिकृत पेमेंट गेटवे प्रदाताओं के साथ",
            "कानूनी आवश्यकता, अदालती आदेश या सरकारी विनियामक एजेंसियों के अनुरोध पर",
            "विश्वसनीय तकनीकी क्लाउड इंफ्रास्ट्रक्चर एवं एसएमएस सेवा प्रदाताओं के साथ, जो कड़े गोपनीयता अनुबंधों से बंधे हैं",
          ],
        },
        {
          title: "4. डेटा का संरक्षण एवं प्रतिधारण (Data Retention)",
          paragraph: "हम आपकी व्यक्तिगत जानकारी को तब तक सुरक्षित रखते हैं जब तक आपका खाता सक्रिय रहता है अथवा भारतीय कर, लॉजिस्टिक्स और कानूनी नियमों के अनुपालन के लिए आवश्यक होता है।",
        },
        {
          title: "5. डेटा सुरक्षा (Data Security & Encryption)",
          paragraph: "आपकी जानकारी को अनधिकृत पहुंच, दुरुपयोग या चोरी से सुरक्षित रखने के लिए हम अत्याधुनिक एन्क्रिप्शन (SSL/TLS), सुरक्षित सर्वर और सख्त प्रमाणीकरण प्रक्रियाओं का उपयोग करते हैं।",
        },
        {
          title: "6. उपयोगकर्ता के अधिकार (Your Privacy Rights)",
          paragraph: "आपको अपनी प्रोफ़ाइल जानकारी देखने, सुधारने अथवा खाता हटाने (Delete Account) का पूरा अधिकार है। इसके लिए आप सीधे ऐप सेटिंग्स या support@justclickit.in पर ईमेल करके अनुरोध कर सकते हैं।",
        },
        {
          title: "7. बच्चों व नाबालिगों की गोपनीयता (Children's Privacy)",
          paragraph: "क्लिकइट प्लेटफॉर्म 18 वर्ष से कम आयु के नाबालिगों के स्वतंत्र उपयोग के लिए निर्देशित नहीं है।",
        },
        {
          title: "8. गोपनीयता नीति में बदलाव (Policy Updates)",
          paragraph: "हम सेवाओं में सुधार या सरकारी नियमों के अनुसार समय-समय पर इस नीति को संशोधित कर सकते हैं। नीति में किए गए बदलाव ऐप और वेबसाइट पर प्रकाशित होने के तुरंत बाद प्रभावी माने जाएंगे।",
        },
        {
          title: "9. शिकायत निवारण अधिकारी एवं संपर्क (Grievance Officer)",
          paragraph: "सूचना प्रौद्योगिकी (आईटी) अधिनियम के तहत किसी भी गोपनीयता संबंधी प्रश्न या शिकायत के लिए हमारे नोडल अधिकारी से संपर्क करें:",
          contactInfo: {
            officer: "शिकायत निवारण अधिकारी, क्लिकइट डिलीवरी नेटवर्क प्राइवेट लिमिटेड",
            email: "grievance@justclickit.in",
            supportEmail: "support@justclickit.in",
            phone: "+91 141 498 2200 / 1800-CLICKIT"
          }
        },
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 font-sans pb-24 selection:bg-orange-500/30 selection:text-orange-200">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-30 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate ? onNavigate('/') : window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-[#00a6c7] transition-colors py-1.5 px-2.5 -ml-2 rounded-lg hover:bg-zinc-900"
          >
            <ArrowLeft className="w-4 h-4 text-[#00a6c7]" />
            {lang === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}
          </button>

          {/* Language Switcher Pill */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1 shadow-inner">
              <button
                type="button"
                onClick={() => handleLangChange('en')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                  lang === 'en'
                    ? 'bg-[#00a6c7] text-white shadow-md shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => handleLangChange('hi')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                  lang === 'hi'
                    ? 'bg-[#00a6c7] text-white shadow-md shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>हिन्दी (Hindi)</span>
              </button>
            </div>

            {/* Copy In-App Link */}
            <button
              onClick={copyInAppLink}
              title="Copy URL to link in App"
              className="inline-flex items-center gap-1.5 text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded-full transition-colors"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">{lang === 'hi' ? 'लिंक कॉपी हो गया' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">{lang === 'hi' ? 'ऐप लिंक कॉपी करें' : 'Copy App Link'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <header className="mb-8 border-b border-zinc-800 pb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              <Shield className="w-3.5 h-3.5 text-[#00a6c7]" />
              {t.badge}
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-orange-400 font-semibold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              <Lock className="w-3.5 h-3.5" /> {t.officialBadge}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-sm text-zinc-400">{t.lastUpdated} • {t.effectiveDate}</p>

          {/* In-app linking banner */}
          <div className="mt-4 p-3 bg-[#12141C] border border-zinc-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400">
            <div>
              <span className="text-zinc-300 font-semibold">{t.deepLinkNote} </span>
              <code className="bg-zinc-900 px-2 py-0.5 rounded text-orange-400 font-mono">
                /privacy-policy?lang={lang}
              </code>
            </div>
            <button
              onClick={() => handleLangChange(lang === 'en' ? 'hi' : 'en')}
              className="text-[#00a6c7] hover:underline font-semibold text-left sm:text-right"
            >
              {lang === 'en' ? 'हिन्दी में पढ़ें (Switch to Hindi)' : 'Read in English'}
            </button>
          </div>
        </header>

        {/* Intro Card */}
        <div className="bg-[#12141C] border border-zinc-800/90 rounded-2xl p-6 mb-8 shadow-lg text-zinc-300 leading-relaxed text-sm sm:text-base">
          {t.intro}
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {t.sections.map((section, i) => (
            <section 
              key={i} 
              className="bg-[#12141C] border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl p-6 sm:p-7 shadow-sm space-y-4"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#00a6c7]">{section.title}</span>
              </h2>

              {section.paragraph && (
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {section.paragraph}
                </p>
              )}

              {section.items && (
                <dl className="space-y-3 pt-1">
                  {section.items.map(([label, desc], j) => (
                    <div key={j} className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/60">
                      <dt className="font-semibold text-orange-400 text-sm mb-1">{label}</dt>
                      <dd className="text-zinc-300 leading-relaxed text-xs sm:text-sm">{desc}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {section.list && (
                <ul className="space-y-2.5 text-zinc-300 text-sm sm:text-base pt-1">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a6c7] mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.contactInfo && (
                <div className="mt-4 p-5 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-2 text-xs sm:text-sm">
                  <div className="font-bold text-white text-base">
                    {section.contactInfo.officer}
                  </div>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs">
                    <a
                      href={`mailto:${section.contactInfo.email}`}
                      className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {section.contactInfo.email}
                    </a>
                    <a
                      href={`tel:${section.contactInfo.phone}`}
                      className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {section.contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer Navigation CTA */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate ? onNavigate('/terms-and-conditions') : null}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-[#00a6c7] transition-colors"
          >
            <FileText className="w-4 h-4 text-[#00a6c7]" />
            {lang === 'hi' ? 'नियम एवं शर्तें (Terms and Conditions) देखें' : 'View Terms and Conditions'}
          </button>
          <div className="text-xs text-zinc-500">
            © 2026 Clickit Delivery Network Pvt. Ltd.
          </div>
        </div>
      </div>
    </div>
  );
}
