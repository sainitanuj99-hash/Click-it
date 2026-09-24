import React, { useState } from "react";
import { 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  UserCheck, 
  AlertTriangle, 
  Phone, 
  Mail, 
  Globe, 
  Copy, 
  Check, 
  ShieldCheck,
  Zap,
  MapPin,
  Clock
} from "lucide-react";

interface DriverFAQsProps {
  onNavigate?: (path: string) => void;
  initialLang?: 'en' | 'hi';
}

interface FAQItem {
  id: string;
  category: string;
  categoryName: string;
  q: string;
  a: string;
  bullets?: string[];
}

export default function DriverFAQs({ onNavigate, initialLang }: DriverFAQsProps) {
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

  const [openIds, setOpenIds] = useState<string[]>(['onboarding-1', 'earnings-1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
      const url = `${window.location.origin}/driver-faqs?lang=${lang}`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const content = {
    en: {
      badge: "Driver Partner Knowledge Base",
      title: "Driver Partner Frequently Asked Questions",
      subtitle: "Everything you need to know about registering, accepting trips, daily earnings, and partner support on ClickIt.",
      developerNote: "In-App URL for mobile app developers:",
      searchPlaceholder: "Search driver questions (e.g. payout, documents, cancellation, toll)...",
      allCategory: "All Categories",
      categories: [
        { id: 'onboarding', label: 'Registration & Docs' },
        { id: 'trips', label: 'Orders & Trips' },
        { id: 'earnings', label: 'Earnings & Payouts' },
        { id: 'loading', label: 'Tolls & Loading' },
        { id: 'cancellation', label: 'Cancellations' },
        { id: 'support', label: 'Safety & Helpline' },
      ],
      faqs: [
        {
          id: 'onboarding-1',
          category: 'onboarding',
          categoryName: 'Registration & Docs',
          q: "What documents are required to attach my vehicle with ClickIt?",
          a: "Attaching your commercial vehicle on ClickIt is 100% digital and paperless via the Driver App. You will need photos of the following original documents:",
          bullets: [
            "Valid Driving License (Commercial / Transport category).",
            "Vehicle Registration Certificate (RC) with commercial registration.",
            "Valid Commercial Vehicle Insurance policy.",
            "Vehicle Fitness Certificate and updated Pollution Certificate (PUC).",
            "Aadhaar Card and PAN Card for KYC verification.",
            "Cancelled Cheque or Bank Passbook photo (for automated daily payouts)."
          ]
        },
        {
          id: 'onboarding-2',
          category: 'onboarding',
          categoryName: 'Registration & Docs',
          q: "How long does it take for my driver account to get approved and activated?",
          a: "Once you upload clear photographs of your documents in the Driver App, our verification team verifies them within 2 to 4 business hours. You will receive an SMS and WhatsApp notification once your account is active to take orders.",
          bullets: [
            "Ensure all four corners of the documents are visible.",
            "Avoid flash glare or blurry photos for instant approval."
          ]
        },
        {
          id: 'onboarding-3',
          category: 'onboarding',
          categoryName: 'Registration & Docs',
          q: "Can I drive if the vehicle is registered in someone else's name?",
          a: "Yes. If the vehicle is owned by a family member or fleet owner, you can attach it by providing an authorization letter / NOC from the registered owner along with their RC and your own valid Driving License.",
        },
        {
          id: 'trips-1',
          category: 'trips',
          categoryName: 'Orders & Trips',
          q: "How do I receive and accept delivery orders on ClickIt?",
          a: "Whenever you are ready to earn, simply toggle the 'On Duty' button at the top of the Driver App. When an order matches your vehicle category nearby, your phone will ring and show:",
          bullets: [
            "Estimated total trip earning.",
            "Pickup location and exact distance from your current location.",
            "Drop-off destination and goods category.",
            "Tap 'Accept Order' within 35 seconds to confirm the trip."
          ]
        },
        {
          id: 'trips-2',
          category: 'trips',
          categoryName: 'Orders & Trips',
          q: "Why is OTP verification mandatory at pickup and delivery?",
          a: "OTP (One-Time Password) guarantees that you are handing over goods to the authorized person and protects your earnings. Always verify the 4-digit Pickup OTP before loading, and collect the 4-digit Delivery OTP from the receiver before marking the order completed.",
        },
        {
          id: 'trips-3',
          category: 'trips',
          categoryName: 'Orders & Trips',
          q: "Can I reject an order if I am resting or unavailable?",
          a: "Yes. As an independent partner, you are free to accept or decline. However, if you are resting or not available, please switch your status to 'Off Duty'. Continuously rejecting orders while 'On Duty' lowers your dispatch priority score.",
        },
        {
          id: 'earnings-1',
          category: 'earnings',
          categoryName: 'Earnings & Payouts',
          q: "How is the trip fare calculated on ClickIt?",
          a: "Trip fares are calculated automatically by the ClickIt digital meter based on transparent rates:",
          bullets: [
            "Base Fare: Includes initial distance and base loading time.",
            "Distance Rate: Flat rate per kilometer for intracity and highway transit.",
            "Waiting Time: Automatically billed if customer exceeds free loading time.",
            "Helper / Labor Add-on: Extra payment added directly to your wallet if loading assistance was chosen."
          ]
        },
        {
          id: 'earnings-2',
          category: 'earnings',
          categoryName: 'Earnings & Payouts',
          q: "When and how will my earnings be transferred to my bank account?",
          a: "ClickIt provides automated Daily and Weekly payout settlements directly to your registered bank account or UPI ID. Digital payments made by customers (Online / Wallet) are processed within 24 hours without any transfer charges.",
        },
        {
          id: 'earnings-3',
          category: 'earnings',
          categoryName: 'Earnings & Payouts',
          q: "How do daily incentives and peak hour bonuses work?",
          a: "ClickIt offers generous milestone incentives (e.g., complete 5 trips for extra ₹400 bonus) during festival peaks, industrial rush hours, and weekend campaigns. All active bonuses are displayed under the 'Incentives' tab in your Driver App.",
        },
        {
          id: 'loading-1',
          category: 'loading',
          categoryName: 'Tolls & Loading',
          q: "Who pays for highway toll tax, state border tax, or parking fees?",
          a: "All legitimate FASTag highway tolls and parking charges incurred during an active loaded trip are 100% reimbursed. The customer's digital invoice includes the toll amount, which is credited directly to your driver wallet upon trip completion.",
        },
        {
          id: 'loading-2',
          category: 'loading',
          categoryName: 'Tolls & Loading',
          q: "Is the driver required to lift and load heavy goods?",
          a: "No. Standard drivers are only responsible for safe driving and cargo transport. If the customer requires manual lifting, they must select the 'Driver Loading Assistance' or 'Helper' option in the app, for which you receive an additional labor fee.",
        },
        {
          id: 'cancellation-1',
          category: 'cancellation',
          categoryName: 'Cancellations',
          q: "What happens if a customer cancels the order after I reach the pickup location?",
          a: "If you have marked 'Reached Pickup Location' in the app and the customer cancels or fails to hand over the goods, ClickIt automatically awards you a statutory Cancellation Compensation fee credited straight to your wallet.",
        },
        {
          id: 'cancellation-2',
          category: 'cancellation',
          categoryName: 'Cancellations',
          q: "What should I do if the receiver is not answering the phone at drop-off?",
          a: "Wait at the drop location for at least 15 minutes and call the customer. If they remain unreachable, tap the 'Call Support' button in the app. Our operations team will either resolve the contact or authorize paid return transit to the sender.",
        },
        {
          id: 'support-1',
          category: 'support',
          categoryName: 'Safety & Helpline',
          q: "What should I do in case of a vehicle breakdown or emergency during a trip?",
          a: "Your safety and the safety of the cargo are paramount. Immediately press the 'SOS / Emergency' button in the Driver App or call our 24/7 Partner Helpline at +91 1800 203 4567. Our operations team will dispatch a rescue fleet vehicle to transfer the goods seamlessly.",
        },
        {
          id: 'support-2',
          category: 'support',
          categoryName: 'Safety & Helpline',
          q: "Are ClickIt Driver Partners covered under accidental insurance?",
          a: "Yes! Active ClickIt Driver Partners are covered under our complimentary Group Accidental Insurance policy covering medical hospitalization and personal accidental disability/death benefits while on an active online trip.",
        }
      ]
    },
    hi: {
      badge: "ड्राइवर पार्टनर सहायता केंद्र",
      title: "ड्राइवर पार्टनर अक्सर पूछे जाने वाले सवाल (Driver FAQs)",
      subtitle: "गाड़ी जोड़ने, ट्रिप शुरू करने, रोजाना कमाई, बैंक भुगतान और हेल्पलाइन से जुड़ी सभी महत्वपूर्ण जानकारियां।",
      developerNote: "मोबाइल ऐप डेवलपर्स के लिए इन-ऐप यूआरएल:",
      searchPlaceholder: "सवाल खोजें (जैसे: पेमेंट, दस्तावेज, टोल, कैंसिलेशन, इंसेंटिव)...",
      allCategory: "सभी विषय",
      categories: [
        { id: 'onboarding', label: 'रजिस्ट्रेशन व दस्तावेज' },
        { id: 'trips', label: 'ऑर्डर व ट्रिप' },
        { id: 'earnings', label: 'कमाई व भुगतान' },
        { id: 'loading', label: 'टोल व लोडिंग' },
        { id: 'cancellation', label: 'रद्दीकरण (Cancel)' },
        { id: 'support', label: 'सुरक्षा व हेल्पलाइन' },
      ],
      faqs: [
        {
          id: 'onboarding-1',
          category: 'onboarding',
          categoryName: 'रजिस्ट्रेशन व दस्तावेज',
          q: "क्लिकइट के साथ अपनी गाड़ी जोड़ने के लिए कौन से दस्तावेज चाहिए?",
          a: "क्लिकइट ड्राइवर ऐप पर अपनी गाड़ी जोड़ना बहुत आसान और पूरी तरह डिजिटल है। आपको ऐप में निम्नलिखित मूल दस्तावेजों की साफ फोटो अपलोड करनी होगी:",
          bullets: [
            "वैध ड्राइविंग लाइसेंस (कमर्शियल/ट्रांसपोर्ट श्रेणी)।",
            "वाहन का रजिस्ट्रेशन सर्टिफिकेट (कमर्शियल आरसी)।",
            "वाहन का चालू कमर्शियल इंश्योरेंस (बीमा)।",
            "वाहन का फिटनेस सर्टिफिकेट एवं पॉल्यूशन सर्टिफिकेट (PUC)।",
            "आधार कार्ड और पैन कार्ड (KYC के लिए)।",
            "बैंक पासबुक या कैंसल चेक की फोटो (दैनिक बैंक भुगतान के लिए)।"
          ]
        },
        {
          id: 'onboarding-2',
          category: 'onboarding',
          categoryName: 'रजिस्ट्रेशन व दस्तावेज',
          q: "दस्तावेज जमा करने के बाद खाता चालू होने में कितना समय लगता है?",
          a: "ऐप में दस्तावेज अपलोड करने के 2 से 4 घंटे के भीतर हमारी वेरिफिकेशन टीम दस्तावेजों की जांच करके आपकी आईडी चालू कर देती है। खाता चालू होते ही आपके मोबाइल पर एसएमएस और व्हाट्सएप आ जाता है।",
          bullets: [
            "दस्तावेज के चारों कोने साफ दिखने चाहिए।",
            "धुंधली फोटो से बचें ताकि खाता तुरंत सक्रिय हो सके।"
          ]
        },
        {
          id: 'onboarding-3',
          category: 'onboarding',
          categoryName: 'रजिस्ट्रेशन व दस्तावेज',
          q: "क्या मैं किसी दूसरे (परिवार/मालिक) की गाड़ी चला सकता हूँ?",
          a: "हाँ। यदि गाड़ी आपके परिवार के सदस्य या फ्लीट मालिक के नाम पर है, तो आप मालिक का सहमति पत्र (NOC) और उनकी आरसी के साथ अपना खुद का ड्राइविंग लाइसेंस लगाकर गाड़ी चला सकते हैं।",
        },
        {
          id: 'trips-1',
          category: 'trips',
          categoryName: 'ऑर्डर व ट्रिप',
          q: "क्लिकइट पर डिलीवरी ऑर्डर कैसे मिलते हैं और कैसे स्वीकार करें?",
          a: "जब भी आप काम के लिए तैयार हों, ऐप में ऊपर 'ऑन ड्यूटी' (On Duty) का बटन दबाएं। आपके नजदीकी इलाके का ऑर्डर आते ही आपके फोन पर घंटी बजेगी और स्क्रीन पर दिखेगा:",
          bullets: [
            "ट्रिप की कुल अनुमानित कमाई।",
            "पिकअप का पता और वहां तक की सटीक दूरी।",
            "ड्रॉप लोकेशन और सामान का प्रकार।",
            "ऑर्डर लेने के लिए 35 सेकंड के भीतर 'स्वीकार करें' (Accept) पर टैप करें।"
          ]
        },
        {
          id: 'trips-2',
          category: 'trips',
          categoryName: 'ऑर्डर व ट्रिप',
          q: "पिकअप और डिलीवरी पर ओटीपी (OTP) लेना क्यों जरूरी है?",
          a: "ओटीपी यह सुनिश्चित करता है कि माल सही व्यक्ति तक पहुंचा है और आपकी कमाई पूरी तरह सुरक्षित है। माल लोड करने से पहले 4-अंकों का पिकअप ओटीपी अवश्य लें, और सामान उतारने के बाद रिसीवर से डिलीवरी ओटीपी लेकर ही ट्रिप समाप्त करें।",
        },
        {
          id: 'trips-3',
          category: 'trips',
          categoryName: 'ऑर्डर व ट्रिप',
          q: "क्या मैं व्यस्त होने पर ऑर्डर अस्वीकार कर सकता हूँ?",
          a: "हाँ, आप स्वतंत्र पार्टनर हैं। लेकिन अगर आप आराम कर रहे हैं या गाड़ी चलाने में असमर्थ हैं, तो कृपया ऐप को 'ऑफ ड्यूटी' (Off Duty) कर दें। ऑन ड्यूटी रहते हुए बार-बार ऑर्डर ठुकराने से नए ऑर्डर मिलने की प्राथमिकता कम हो सकती है।",
        },
        {
          id: 'earnings-1',
          category: 'earnings',
          categoryName: 'कमाई व भुगतान',
          q: "क्लिकइट पर ट्रिप का किराया कैसे तय होता है?",
          a: "किराया क्लिकइट के पारदर्शी डिजिटल मीटर द्वारा स्वतः निकाला जाता है:",
          bullets: [
            "बेस फेयर: इसमें शुरुआती दूरी और लोडिंग का बेसिक समय शामिल होता है।",
            "प्रति किलोमीटर दर: शहर और हाईवे की तय दर के अनुसार किलोमीटर का किराया।",
            "वेटिंग चार्ज: यदि ग्राहक तय समय से ज्यादा देर लगाए, तो प्रति मिनट वेटिंग चार्ज स्वतः जुड़ता है।",
            "हेल्पर/लोडिंग चार्ज: यदि ग्राहक ने लोडिंग सहायता चुनी है, तो उसका अतिरिक्त पैसा सीधे आपके वॉलेट में जुड़ता है।"
          ]
        },
        {
          id: 'earnings-2',
          category: 'earnings',
          categoryName: 'कमाई व भुगतान',
          q: "मेरी कमाई मेरे बैंक खाते में कब और कैसे आएगी?",
          a: "क्लिकइट दैनिक (Daily) और साप्ताहिक (Weekly) बैंक ट्रांसफर सुविधा देता है। ऑनलाइन पेमेंट वाले ऑर्डर्स की कमाई 24 घंटे के भीतर बिना किसी ट्रांसफर चार्ज के सीधे आपके बैंक खाते या यूपीआई में भेज दी जाती है।",
        },
        {
          id: 'earnings-3',
          category: 'earnings',
          categoryName: 'कमाई व भुगतान',
          q: "इंसेंटिव और बोनस कैसे मिलते हैं?",
          a: "त्योहारों, सुबह-शाम के व्यस्त समय और वीकेंड पर क्लिकइट आकर्षक टारगेट इंसेंटिव देता है (जैसे 5 ट्रिप पूरी करने पर ₹400 अतिरिक्त बोनस)। सभी चालू ऑफर्स आप ड्राइवर ऐप के 'इंसेंटिव' टैब में देख सकते हैं।",
        },
        {
          id: 'loading-1',
          category: 'loading',
          categoryName: 'टोल व लोडिंग',
          q: "हाईवे टोल टैक्स, बॉर्डर टैक्स और पार्किंग का पैसा कौन देता है?",
          a: "माल लदी गाड़ी के दौरान लगा हुआ फास्टैग टोल और वैध पार्किंग का पूरा पैसा ग्राहक के बिल में जुड़ता है। ट्रिप पूरी होते ही यह पूरा पैसा आपके ड्राइवर वॉलेट में तुरंत वापस जुड़ जाता है।",
        },
        {
          id: 'loading-2',
          category: 'loading',
          categoryName: 'टोल व लोडिंग',
          q: "क्या ड्राइवर को भारी सामान चढ़ाना और उतारना अनिवार्य है?",
          a: "नहीं। ड्राइवर का मुख्य कार्य सुरक्षित गाड़ी चलाना और माल पहुंचाना है। यदि ग्राहक को लोडिंग-अनलोडिंग के लिए मदद चाहिए, तो वे ऐप में 'हेल्पर' का विकल्प चुनते हैं, जिसके लिए ड्राइवर को अलग से मेहनत का शुल्क मिलता है।",
        },
        {
          id: 'cancellation-1',
          category: 'cancellation',
          categoryName: 'रद्दीकरण (Cancel)',
          q: "यदि पिकअप लोकेशन पर पहुंचने के बाद ग्राहक ऑर्डर रद्द कर दे तो क्या होगा?",
          a: "यदि आप पिकअप लोकेशन पर पहुंचकर ऐप में 'Reached' दबा चुके हैं और ग्राहक ऑर्डर कैंसिल करता है, तो आपके नुकसान की भरपाई के लिए कंपनी की तरफ से रद्दीकरण शुल्क (Cancellation Fee) सीधे आपके वॉलेट में जमा कर दिया जाता है।",
        },
        {
          id: 'cancellation-2',
          category: 'cancellation',
          categoryName: 'रद्दीकरण (Cancel)',
          q: "ड्रॉप लोकेशन पर पहुंचने के बाद यदि रिसीवर फोन न उठाए तो क्या करें?",
          a: "कम से कम 15 मिनट ड्रॉप लोकेशन पर रुकें और ग्राहक से संपर्क करें। यदि फोन न लगे, तो ऐप में 'सपोर्ट कॉल' का बटन दबाएं। हमारी टीम तुरंत ग्राहक से बात करेगी या माल वापस लाने का पूरा किराया देकर वापसी अधिकृत करेगी।",
        },
        {
          id: 'support-1',
          category: 'support',
          categoryName: 'सुरक्षा व हेल्पलाइन',
          q: "रास्ते में गाड़ी खराब होने या दुर्घटना होने पर क्या करें?",
          a: "आपकी और माल की सुरक्षा हमारे लिए सर्वोपरि है। तुरंत ऐप का 'इमरजेंसी / SOS' बटन दबाएं या पार्टनर हेल्पलाइन 1800 203 4567 पर कॉल करें। हमारी टीम मौके पर तुरंत बैकअप वाहन भेजकर माल ट्रांसफर कराएगी।",
        },
        {
          id: 'support-2',
          category: 'support',
          categoryName: 'सुरक्षा व हेल्पलाइन',
          q: "क्या क्लिकइट ड्राइवर भाइयों को दुर्घटना बीमा कवर मिलता है?",
          a: "हाँ! क्लिकइट के साथ एक्टिव ड्यूटी पर गाड़ी चलाने वाले सभी पात्र पार्टनर्स को मानद ग्रुप दुर्घटना बीमा (Accidental Insurance) कवर मिलता है, जिसमें आकस्मिक अस्पताल खर्च और दुर्घटना सहायता शामिल है।",
        }
      ]
    }
  };

  const current = content[lang];

  const filteredFaqs = current.faqs.filter(faq => {
    const matchesCat = selectedCat === 'all' || faq.category === selectedCat;
    const matchesQuery = searchQuery === '' || 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 font-sans pb-24">
      {/* Top Header / Breadcrumb Bar with Language Switcher */}
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
              /driver-faqs?lang={lang}
            </code>
          </div>
          <span className="text-zinc-500 text-[11px]">
            {lang === 'hi' ? 'ड्राइवर ऐप सहायता वेबव्यू के लिए उपयुक्त' : 'Optimized for Driver Mobile WebView'}
          </span>
        </div>

        {/* Page Title & Intro */}
        <header className="mb-8 border-b border-zinc-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" /> {current.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {current.title}
          </h1>
          <p className="text-zinc-400 font-medium text-sm sm:text-base">
            {current.subtitle}
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={current.searchPlaceholder}
            className="w-full bg-[#12141C] border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FF5D00] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCat === 'all'
                ? 'bg-[#FF5D00] text-white shadow-sm'
                : 'bg-[#12141C] text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            {current.allCategory}
          </button>
          {current.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === cat.id
                  ? 'bg-[#FF5D00] text-white shadow-sm'
                  : 'bg-[#12141C] text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-[#12141C] border border-zinc-800 rounded-2xl text-zinc-400 text-sm">
              {lang === 'hi' ? 'कोई सवाल नहीं मिला। कृपया अन्य शब्द खोजें।' : 'No questions matched your search query.'}
            </div>
          ) : (
            filteredFaqs.map(faq => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-[#12141C] border border-zinc-800/90 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                        {faq.categoryName}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-white pt-1 leading-snug">
                        {faq.q}
                      </h2>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0 mt-1">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#FF5D00]" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-zinc-800/60 text-sm text-zinc-300 leading-relaxed space-y-3">
                      <p>{faq.a}</p>
                      {faq.bullets && (
                        <div className="space-y-2 pt-1 pl-1">
                          {faq.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                              <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 24/7 Helpline Support Box */}
        <div className="mt-12 p-6 sm:p-7 bg-[#12141C] border border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#FF5D00] shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                {lang === 'hi' ? 'कोई अन्य सवाल या सड़क पर सहायता चाहिए?' : 'Have more questions or need on-road help?'}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm">
                {lang === 'hi' ? 'हमारी 24/7 ड्राइवर पार्टनर हेल्पलाइन पर तुरंत बात करें' : 'Call our 24/7 Driver Partner Operations Helpline'}
              </p>
            </div>
          </div>

          <a
            href="tel:18002034567"
            className="w-full sm:w-auto text-center bg-[#FF5D00] hover:bg-[#E05200] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95"
          >
            1800 203 4567 (Toll Free)
          </a>
        </div>
      </div>
    </div>
  );
}
