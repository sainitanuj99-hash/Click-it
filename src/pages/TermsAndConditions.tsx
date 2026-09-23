import React, { useState, useEffect } from "react";
import { Shield, ArrowLeft, FileText, CheckCircle2, AlertTriangle, Scale, Phone, Mail, Globe, Copy, Check } from "lucide-react";

interface TermsAndConditionsProps {
  onNavigate?: (path: string) => void;
  initialLang?: 'en' | 'hi';
}

export default function TermsAndConditions({ onNavigate, initialLang }: TermsAndConditionsProps) {
  // Check URL param ?lang=hi or prop
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

  // Sync lang state with URL parameter for easy in-app sharing
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
      const url = `${window.location.origin}/terms-and-conditions?lang=${lang}`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  // Content definitions in English & Hindi
  const content = {
    en: {
      badge: "Legal & Regulatory",
      title: "Terms and Conditions",
      subtitle: "ClickIt Logistics & Delivery Network Agreement",
      lastUpdated: "Last Updated: 15th Sept 2026",
      effectiveDate: "Effective Date: 15th Sept 2026",
      intro: "Welcome to ClickIt! These Terms and Conditions (\"Terms\", \"Agreement\") govern your access to and use of ClickIt's mobile application, website, and logistics booking services (collectively, the \"ClickIt Platform\"). By registering, accessing, or placing orders via the ClickIt Platform, you agree to be bound by these Terms. If you do not agree, please do not use the Platform.",
      deepLinkNote: "In-App URL for developers:",
      sections: [
        {
          num: "1",
          title: "Definitions and Overview of Services",
          desc: "ClickIt acts as a digital technology aggregator connecting users (\"Customers\", \"Shippers\") who require logistics, parcel transportation, or cargo delivery services with independent verified commercial vehicle operators and couriers (\"Delivery Partners\"). ClickIt does not itself own or operate commercial transport vehicles unless expressly stated.",
          points: [
            "Platform: The digital marketplace mobile app and web portal operated by Clickit Delivery Network Pvt. Ltd.",
            "Customer: Any individual or business entity booking a vehicle or courier delivery through the Platform.",
            "Delivery Partner: Independent driver, fleet operator, or courier executive registered on ClickIt to fulfill deliveries.",
            "Consignment / Cargo: The physical packages, goods, cartons, or materials handed over for transport."
          ]
        },
        {
          num: "2",
          title: "User Eligibility and Account Registration",
          desc: "To book or provide services on ClickIt, you must be at least 18 years of age and legally competent to enter into binding contracts under Indian law. You are solely responsible for maintaining the confidentiality of your credentials and account OTPs.",
          points: [
            "Accurate Data: You agree to provide true, accurate, and up-to-date information during profile creation and booking.",
            "Account Security: Any activity executed through your verified phone number or authenticated credentials will be deemed initiated by you.",
            "KYC Requirements: Commercial shippers and delivery partners must complete mandatory KYC verification as mandated by logistics guidelines."
          ]
        },
        {
          num: "3",
          title: "Booking, Fares, Tolls & Payments",
          desc: "Pricing is dynamically estimated based on vehicle type, travel distance, expected transit duration, route road tolls, and localized supply-demand metrics.",
          points: [
            "Fare Transparency: The fare estimate displayed at booking covers base fare and estimated distance. Final invoices reflect verified GPS odometer distances.",
            "Toll & Parking Charges: State border taxes, highway tolls, MCD fees, and physical parking fees incurred during transit are payable by the Customer upon proof.",
            "Waiting Time Charges: Free loading/unloading buffer is 15 minutes for 2-wheelers and 30-45 minutes for trucks. Excess waiting time is billed as per published vehicle rate slabs.",
            "Payment Modes: Supports UPI, Net Banking, Credit/Debit Cards, Corporate Credit Wallets, and Cash on Delivery (COD) where available."
          ]
        },
        {
          num: "4",
          title: "Prohibited Goods and Cargo Safety Policy",
          desc: "Customers strictly warrant that consignments do not contain any illegal, dangerous, contraband, or hazardous materials under Indian law. The carrier reserves the right to inspect packages.",
          points: [
            "Strictly Prohibited: Explosives, firearms, ammunition, flammable chemicals, narcotics, illegal wildlife products, radioactive items, counterfeit currency, or unmanifested bullion.",
            "Perishable & Sensitive Items: Perishables or temperature-controlled consignments must only be booked under dedicated Cold-Chain fleet options.",
            "Packaging Responsibility: The customer is solely responsible for durable packaging, protective cushioning, and correct recipient labeling."
          ]
        },
        {
          num: "5",
          title: "Cancellation and Refund Policy",
          desc: "Bookings can be cancelled subject to driver allocation status and dispatch distance.",
          points: [
            "Pre-Driver Assignment: 100% free cancellation with instant credit/refund.",
            "Post-Driver Dispatch: If cancelled after a Delivery Partner has traveled toward the pickup location, a nominal trip cancellation compensation fee (₹30 to ₹150 depending on vehicle class) applies to compensate the partner's fuel and time.",
            "Failed Delivery / Incorrect Address: If recipient is unreachable after reasonable attempts (minimum 3 phone attempts and 20 min wait), cargo will be returned to sender at standard return haulage fare."
          ]
        },
        {
          num: "6",
          title: "Delivery Partner & Customer Conduct",
          desc: "We mandate strict professionalism, mutual respect, and zero tolerance for harassment, discrimination, or abusive conduct on the ClickIt network.",
          points: [
            "Direct Offline Haggling Prohibited: Negotiating off-platform cash transactions or bypassing digital booking violates ClickIt partner compliance.",
            "e-POD Verification: Recipient must sign physical or digital proof of delivery (e-POD) or share the delivery OTP to complete the journey.",
            "Reporting Misconduct: Any unprofessional behavior can be flagged immediately via the 24/7 in-app Help Center."
          ]
        },
        {
          num: "7",
          title: "Transit Protection, Claims & Limitation of Liability",
          desc: "ClickIt facilitates secure transit through verified partners and GPS route tracing. Cargo damage claims are handled pursuant to our Transit Protection Guidelines.",
          points: [
            "Standard Liability Cap: ClickIt's aggregate liability for verified loss or transit damage to eligible standard consignments is capped at declared invoice value up to ₹10,000, or actual freight charges paid, whichever is lower, unless extra transit cargo protection was opted.",
            "Claim Window: All transit damage or pilferage claims must be reported within 24 hours of delivery alongside unboxing photographs and waybill receipt.",
            "Indirect Damages: ClickIt is not liable for indirect, consequential, lost business opportunities, or force majeure events (floods, curfews, state road closures)."
          ]
        },
        {
          num: "8",
          title: "Governing Law and Dispute Resolution",
          desc: "These Terms are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, controversy, or claim arising out of these Terms shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan, India."
        },
        {
          num: "9",
          title: "Grievance Officer and Legal Inquiries",
          desc: "Pursuant to the Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020, our designated Grievance Officer can be contacted at:",
          officerDetails: {
            name: "Grievance Redressal Desk",
            company: "Clickit Delivery Network Pvt. Ltd.",
            address: "Logistics Park, MI Road / VKI Area, Jaipur, Rajasthan 302013",
            email: "grievance@justclickit.in",
            supportEmail: "support@justclickit.in",
            phone: "+91 141 498 2200 / 1800-CLICKIT"
          }
        }
      ]
    },
    hi: {
      badge: "कानूनी एवं विनियामक दस्तावेज",
      title: "नियम एवं शर्तें (Terms and Conditions)",
      subtitle: "क्लिकइट लॉजिस्टिक्स एवं डिलीवरी नेटवर्क सेवा अनुबंध",
      lastUpdated: "अंतिम संशोधन: 15 सितंबर 2026",
      effectiveDate: "लागू तिथि: 15 सितंबर 2026",
      intro: "क्लिकइट (ClickIt) में आपका स्वागत है! यह नियम एवं शर्तें (\"नियम\", \"अनुबंध\") आपके द्वारा क्लिकइट के मोबाइल एप्लिकेशन, वेबसाइट और लॉजिस्टिक्स व पार्सल डिलीवरी सेवाओं (जिन्हें संयुक्त रूप से \"क्लिकइट प्लेटफॉर्म\" कहा गया है) के उपयोग को नियंत्रित करती हैं। क्लिकइट प्लेटफॉर्म पर पंजीकरण करने, ऑर्डर बुक करने या सेवाओं का उपयोग करने पर आप इन नियमों से कानूनी रूप से बाध्य होने की सहमति देते हैं। यदि आप इन नियमों से सहमत नहीं हैं, तो कृपया प्लेटफॉर्म का उपयोग न करें।",
      deepLinkNote: "मोबाइल ऐप में हिंदी में खोलने के लिए यूआरएल (App Link):",
      sections: [
        {
          num: "1",
          title: "परिभाषाएं एवं सेवाओं का विवरण (Overview of Services)",
          desc: "क्लिकइट एक डिजिटल तकनीक आधारित प्लेटफॉर्म (Technology Aggregator) के रूप में कार्य करता है, जो सामान भेजने वाले ग्राहकों (Customers / Shippers) को स्वतंत्र व सत्यापित वाणिज्यिक वाहन चालकों और डिलीवरी पार्टनर्स (Delivery Partners) से जोड़ता है। जब तक स्पष्ट रूप से लिखित न हो, क्लिकइट स्वयं वाणिज्यिक मालवाहक वाहनों का मालिक नहीं है बल्कि बुकिंग और तकनीक सुविधा प्रदाता है।",
          points: [
            "प्लेटफॉर्म (Platform): क्लिकइट डिलीवरी नेटवर्क प्राइवेट लिमिटेड द्वारा संचालित मोबाइल ऐप और वेबसाइट।",
            "ग्राहक (Customer): कोई भी व्यक्ति, व्यापारी या संस्था जो सामान भेजने के लिए वाहन या कूरियर बुक करता है।",
            "डिलीवरी पार्टनर (Delivery Partner): प्लेटफॉर्म से जुड़े सत्यापित ड्राइवर, फ्लीट ऑपरेटर या डिलीवरी राइडर।",
            "सामान / कार्गो (Consignment): ग्राहक द्वारा परिवहन हेतु सौंपा गया सामान, कार्टन, पार्सल अथवा उत्पाद।"
          ]
        },
        {
          num: "2",
          title: "उपयोगकर्ता पात्रता एवं खाता सुरक्षा (User Eligibility)",
          desc: "क्लिकइट की सेवाओं का उपयोग करने के लिए आपकी आयु कम से कम 18 वर्ष होनी चाहिए तथा आप भारतीय अनुबंध अधिनियम के तहत वैध अनुबंध करने में सक्षम होने चाहिए।",
          points: [
            "सटीक जानकारी: पंजीकरण और बुकिंग के समय आपको सही मोबाइल नंबर, नाम और पते की जानकारी देना अनिवार्य है।",
            "ओटीपी एवं खाता सुरक्षा: आपके पंजीकृत मोबाइल नंबर व ओटीपी के माध्यम से की गई समस्त बुकिंग व गतिविधि के लिए आप स्वयं जिम्मेदार होंगे।",
            "केवाईसी सत्यापन (KYC): व्यापारिक ग्राहकों एवं डिलीवरी पार्टनर्स को सरकारी नियमों के तहत पहचान व वाहन दस्तावेजों का सत्यापन कराना अनिवार्य है।"
          ]
        },
        {
          num: "3",
          title: "बुकिंग, किराया, टोल टैक्स एवं भुगतान नियम (Fares, Tolls & Payments)",
          desc: "सामान के वजन, वाहन के प्रकार, तय की जाने वाली दूरी और अनुमानित समय के आधार पर किराया पारदर्शी तरीके से स्क्रीन पर प्रदर्शित किया जाता है।",
          points: [
            "किराए की पारदर्शिता: बुकिंग के समय दिखने वाला किराया बेस किराया और अनुमानित दूरी पर आधारित होता है। अंतिम बिल जीपीएस ओडोमीटर दूरी के अनुसार निर्धारित होता है।",
            "टोल टैक्स एवं पार्किंग शुल्क: रास्ते में लगने वाले राज्य सीमा कर, हाईवे टोल, एमसीडी शुल्क व वैध पार्किंग शुल्क रसीद दिखाने पर ग्राहक द्वारा देय होंगे।",
            "लोडिंग / अनलोडिंग प्रतीक्षा समय: 2-व्हीलर के लिए 15 मिनट तथा मालवाहक गाड़ियों के लिए 30-45 मिनट का समय निःशुल्क है। अतिरिक्त प्रतीक्षा समय पर प्रति मिनट निर्धारित शुल्क लागू होगा।",
            "भुगतान के माध्यम: यूपीआई (UPI), नेट बैंकिंग, क्रेडिट/डेबिट कार्ड, कॉर्पोरेट वॉलेट और चुनिंदा ऑर्डर्स पर नकद (Cash on Delivery) स्वीकार्य है।"
          ]
        },
        {
          num: "4",
          title: "प्रतिबंधित सामान एवं माल सुरक्षा नीति (Prohibited Goods)",
          desc: "ग्राहक यह सुनिश्चित करने के लिए पूरी तरह उत्तरदायी हैं कि भेजे जा रहे सामान में कोई भी अवैध, खतरनाक, ज्वलनशील या प्रतिबंधित वस्तु शामिल नहीं है।",
          points: [
            "पूर्णतः प्रतिबंधित सामान: हथियार, गोला-बारूद, विस्फोटक सामग्री, नशीले पदार्थ (ड्रग्स/शराब), गैर-कानूनी वन्यजीव सामग्री, नकली मुद्रा, खतरनाक रसायन व अनाधिकृत कीमती धातुएं।",
            "जल्दी खराब होने वाला सामान: खाद्य सामग्री या तापमान-संवेदनशील सामान को केवल कोल्ड-चेन (Refrigerated) वाहनों के अंतर्गत ही बुक किया जाना चाहिए।",
            "पैकिंग की जिम्मेदारी: सामान को सुरक्षित, टूटने-फूटने से बचाने योग्य मजबूत पैकिंग में पैक करना और सही प्राप्तकर्ता का नाम-पता अंकित करना ग्राहक का दायित्व है।"
          ]
        },
        {
          num: "5",
          title: "रद्दीकरण एवं रिफंड नीति (Cancellation & Refund Policy)",
          desc: "बुकिंग को ड्राइवर की स्थिति व दूरी के आधार पर रद्द किया जा सकता है।",
          points: [
            "ड्राइवर असाइन होने से पूर्व: 100% निःशुल्क रद्दीकरण, कोई शुल्क नहीं काटा जाएगा।",
            "ड्राइवर के निकलने के पश्चात रद्दीकरण: यदि ड्राइवर पिकअप स्थान की ओर निकल चुका है और फिर ट्रिप रद्द की जाती है, तो ड्राइवर के ईंधन व समय की क्षतिपूर्ति हेतु नाममात्र रद्दीकरण शुल्क (वाहन के अनुसार ₹30 से ₹150) लागू होगा।",
            "गलत पता अथवा अप्राप्य प्राप्तकर्ता: यदि पर्याप्त प्रयासों (कम से कम 3 कॉल और 20 मिनट प्रतीक्षा) के बाद भी प्राप्तकर्ता उपस्थित नहीं होता, तो सामान मानक वापसी शुल्क पर प्रेषक को वापस भेज दिया जाएगा।"
          ]
        },
        {
          num: "6",
          title: "डिलीवरी पार्टनर एवं ग्राहक आचरण (Conduct & Safety)",
          desc: "क्लिकइट नेटवर्क पर परस्पर सम्मान, शिष्टाचार और सुरक्षित कार्य वातावरण सुनिश्चित करना हमारी प्राथमिकता है। किसी भी प्रकार के दुर्व्यवहार या धोखाधड़ी पर शून्य-सहनशीलता (Zero Tolerance) की नीति है।",
          points: [
            "ऑफलाइन सौदेबाजी निषेध: ऐप को बाईपास करके सीधे नकद लेन-देन करना क्लिकइट नीतियों का गंभीर उल्लंघन है।",
            "सुरक्षित डिलीवरी सत्यापन (e-POD): डिलीवरी पूर्ण होने पर प्राप्तकर्ता का डिजिटल हस्ताक्षर या 4-अंकों का डिलीवरी ओटीपी (OTP) साझा करना अनिवार्य है।",
            "शिकायत व सहायता: किसी भी प्रकार की असुविधा या अनुचित व्यवहार की शिकायत तुरंत 24/7 सहायता केंद्र पर दर्ज की जा सकती है।"
          ]
        },
        {
          num: "7",
          title: "परिवहन सुरक्षा, दावा प्रक्रिया एवं दायित्व की सीमा (Transit Protection & Liability)",
          desc: "क्लिकइट जीपीएस ट्रैकिंग और बैकग्राउंड-सत्यापित पार्टनर्स के माध्यम से सुरक्षित डिलीवरी उपलब्ध कराता है।",
          points: [
            "मानक दायित्व सीमा: पारगमन के दौरान अप्रत्याशित क्षति की स्थिति में क्लिकइट का दायित्व माल के घोषित मूल्य (अधिकतम ₹10,000 तक) अथवा वास्तविक भुगतान किए गए भाड़े तक ही सीमित रहेगा, जब तक कि अतिरिक्त ट्रांजिट बीमा न लिया गया हो।",
            "दावा दर्ज करने की अवधि: डिलीवरी प्राप्त होने के 24 घंटे के भीतर डिलीवरी रसीद एवं पार्सल की फोटो सहित क्लेम support@justclickit.in पर दर्ज करना अनिवार्य है।",
            "अप्रत्यक्ष हानि: प्राकृतिक आपदाओं (बाढ़, तूफान), सरकारी प्रतिबंधों, सड़क जाम या ग्राहक द्वारा अनुचित पैकिंग के कारण हुई क्षति के लिए क्लिकइट उत्तरदायी नहीं होगा।"
          ]
        },
        {
          num: "8",
          title: "लागू कानून एवं क्षेत्राधिकार (Governing Law & Jurisdiction)",
          desc: "यह नियम एवं शर्तें भारतीय कानूनों के अनुसार शासित और लागू होंगी। इन नियमों या सेवाओं से उत्पन्न किसी भी विवाद के समाधान के लिए केवल जयपुर, राजस्थान, भारत की सक्षम अदालतों का ही विशेष क्षेत्राधिकार होगा।"
        },
        {
          num: "9",
          title: "शिकायत निवारण अधिकारी एवं संपर्क विवरण (Grievance Officer)",
          desc: "सूचना प्रौद्योगिकी अधिनियम, 2000 तथा उपभोक्ता संरक्षण (ई-कॉमर्स) नियम, 2020 के अंतर्गत नियुक्त हमारे नोडल शिकायत निवारण अधिकारी से संपर्क करें:",
          officerDetails: {
            name: "शिकायत निवारण प्रकोष्ठ (Grievance Cell)",
            company: "क्लिकइट डिलीवरी नेटवर्क प्राइवेट लिमिटेड (Clickit Delivery Network Pvt. Ltd.)",
            address: "लॉजिस्टिक्स पार्क, एमआई रोड / वीकेआई एरिया, जयपुर, राजस्थान 302013",
            email: "grievance@justclickit.in",
            supportEmail: "support@justclickit.in",
            phone: "+91 141 498 2200 / 1800-CLICKIT"
          }
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 font-sans pb-24 selection:bg-orange-500/30 selection:text-orange-200">
      {/* Top Header Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-30 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate ? onNavigate('/') : window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-[#00a6c7] transition-colors py-1.5 px-2.5 -ml-2 rounded-lg hover:bg-zinc-900"
          >
            <ArrowLeft className="w-4 h-4 text-[#00a6c7]" />
            {lang === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Main App'}
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

            {/* Copy Link Button for App Linking */}
            <button
              onClick={copyInAppLink}
              title="Copy URL to embed in App"
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

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Title & Metadata */}
        <header className="mb-8 border-b border-zinc-800 pb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
              <Scale className="w-3.5 h-3.5 text-[#00a6c7]" />
              {t.badge}
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              {t.lastUpdated}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-sm text-zinc-400 font-medium">
            {t.subtitle} • {t.effectiveDate}
          </p>

          {/* In-app linking banner */}
          <div className="mt-4 p-3 bg-[#12141C] border border-zinc-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400">
            <div>
              <span className="text-zinc-300 font-semibold">{t.deepLinkNote} </span>
              <code className="bg-zinc-900 px-2 py-0.5 rounded text-orange-400 font-mono">
                /terms-and-conditions?lang={lang}
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

        {/* Intro Box */}
        <div className="bg-[#12141C] border border-zinc-800/90 rounded-2xl p-6 mb-8 shadow-lg text-zinc-300 leading-relaxed text-sm sm:text-base">
          {t.intro}
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {t.sections.map((section, idx) => (
            <section
              key={idx}
              className="bg-[#12141C] border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-2xl p-6 sm:p-7 shadow-sm space-y-4"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-400 font-extrabold text-sm flex items-center justify-center border border-orange-500/20 shrink-0 mt-0.5">
                  {section.num}
                </span>
                <span className="text-zinc-100">{section.title}</span>
              </h2>

              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {section.desc}
              </p>

              {section.points && section.points.length > 0 && (
                <div className="pt-2 space-y-2.5">
                  {section.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/50">
                      <CheckCircle2 className="w-4 h-4 text-[#00a6c7] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.officerDetails && (
                <div className="mt-4 p-5 bg-zinc-950/80 border border-zinc-800 rounded-xl space-y-3 text-xs sm:text-sm">
                  <div className="font-bold text-white text-base">
                    {section.officerDetails.name}
                  </div>
                  <div className="text-zinc-400">
                    {section.officerDetails.company}
                  </div>
                  <div className="text-zinc-400">
                    {section.officerDetails.address}
                  </div>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs">
                    <a
                      href={`mailto:${section.officerDetails.email}`}
                      className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {section.officerDetails.email}
                    </a>
                    <a
                      href={`tel:${section.officerDetails.phone}`}
                      className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {section.officerDetails.phone}
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
            onClick={() => onNavigate ? onNavigate('/privacy-policy') : null}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-[#00a6c7] transition-colors"
          >
            <Shield className="w-4 h-4 text-[#00a6c7]" />
            {lang === 'hi' ? 'गोपनीयता नीति (Privacy Policy) देखें' : 'View Privacy Policy'}
          </button>
          <div className="text-xs text-zinc-500">
            © 2026 Clickit Delivery Network Pvt. Ltd.
          </div>
        </div>
      </div>
    </div>
  );
}
