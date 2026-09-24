import React, { useState } from "react";
import { Shield, ArrowLeft, Mail, Phone, Lock, FileText, Globe, Copy, Check, Trash2, AlertCircle, Share2, EyeOff, Smartphone, Server } from "lucide-react";

interface PrivacyPolicyProps {
  onNavigate?: (path: string) => void;
  initialLang?: 'en' | 'hi';
}

interface ShareRow {
  who: string;
  what: string;
  why: string;
}

interface SectionItem {
  subtitle?: string;
  text?: string;
  bullets?: string[];
}

interface PrivacySection {
  number: string;
  title: string;
  intro?: string;
  subsections?: {
    title: string;
    description: string;
    bullets?: string[];
    note?: string;
  }[];
  bullets?: string[];
  table?: ShareRow[];
  extraNote?: string;
  contactBox?: {
    title: string;
    subtitle: string;
    email: string;
    supportEmail: string;
    phone: string;
    statutoryNote: string;
  };
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
  const [copiedEn, setCopiedEn] = useState(false);
  const [copiedHi, setCopiedHi] = useState(false);
  const [copiedBundle, setCopiedBundle] = useState(false);

  const getBaseOrigin = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('justclickit.in')) {
        return 'https://justclickit.in';
      }
      return window.location.origin;
    }
    return 'https://justclickit.in';
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
      const url = `${getBaseOrigin()}/privacy-policy?lang=${lang}`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const copySpecificLangUrl = (targetLang: 'en' | 'hi') => {
    const url = `${getBaseOrigin()}/privacy-policy?lang=${targetLang}`;
    navigator.clipboard.writeText(url);
    if (targetLang === 'en') {
      setCopiedEn(true);
      setTimeout(() => setCopiedEn(false), 2500);
    } else {
      setCopiedHi(true);
      setTimeout(() => setCopiedHi(false), 2500);
    }
  };

  const copyDeveloperBundle = () => {
    const base = getBaseOrigin();
    const bundleText = `Clickit Privacy Policy URLs (for Mobile App & Play Store/App Store):\n• English: ${base}/privacy-policy?lang=en\n• Hindi: ${base}/privacy-policy?lang=hi\n• Default (Auto-detect): ${base}/privacy-policy`;
    navigator.clipboard.writeText(bundleText);
    setCopiedBundle(true);
    setTimeout(() => setCopiedBundle(false), 2500);
  };

  const content = {
    en: {
      badge: "Clickit Data Protection & Privacy",
      officialBadge: "Official Policy Document",
      title: "Clickit - Privacy Policy",
      lastUpdated: "Last Updated: 24th Sept 2026",
      effectiveDate: "Effective Date: 24th Sept 2026",
      deepLinkNote: "In-App URL for mobile integration:",
      intro1: 'This Privacy Policy explains how ClickIt (“Company,” “we,” “us,” or “our”), operated by Clickit Delivery Network Pvt. Ltd., collects, uses, shares, and protects your information when you use our website (justclickit.in) and our mobile apps Clickit (Customer) and Clickit Partner (Delivery Partner) (together, the “ClickIt Platform”).',
      intro2: 'By creating an account or using the Platform, you agree to this Policy.',
      callout: 'We do not sell your personal information. We do not use your data for third-party advertising, and we do not collect advertising IDs for ads.',
      tableHeaders: {
        who: "Who",
        what: "What",
        why: "Why"
      },
      sections: [
        {
          number: "1",
          title: "1. Information We Collect",
          intro: "We collect the following. Some items apply only if you use that feature or that app.",
          subsections: [
            {
              title: "Account and profile",
              description: "Name, phone number, email address, profile photo, language (English or Hindi), operating state/city, and GSTIN if you provide it.\nYou sign in with a one-time password (OTP) sent to your phone. We do not collect a password.\nCustomers may also sign in with Google or Apple. In that case we receive the name, email, and account identifier those services share with us."
            },
            {
              title: "WhatsApp and SMS",
              description: "If you choose, we may send the login OTP or service updates on WhatsApp. On Android we may use Google Play SMS User Consent so you can approve autofill of the login OTP. We do not request SMS inbox permission and we do not read your other messages."
            },
            {
              title: "Delivery Partner verification (Clickit Partner)",
              description: "Driving licence, vehicle RC, Aadhaar (front and back), PAN, profile photo, vehicle type, fuel type, and vehicle registration number. Vehicle and GST numbers may be checked through our payment/KYC partner (Cashfree). These documents are used only to verify you can operate on the Platform."
            },
            {
              title: "Addresses and booking details",
              description: "Saved places (for example Home or Work), pickup and drop addresses and coordinates, receiver name and phone, parcel/item description, and booking notes."
            },
            {
              title: "Location",
              description: "We collect precise location:",
              bullets: [
                "Customers: to set pickup/drop on the map and to follow the Delivery Partner during an active booking.",
                "Delivery Partners: while you are online or on an active delivery, including when the app is not on screen (a persistent notification is shown on Android). We share this live location with the Customer for that booking so they can track the delivery."
              ],
              note: "You can stop Partner location sharing by going offline or finishing the delivery, and you can revoke location permission in device Settings."
            },
            {
              title: "Photos",
              description: "Profile photo; Partner KYC documents; pickup and delivery proof photos taken with the camera or chosen from the gallery."
            },
            {
              title: "Payments and wallet",
              description: "Booking payments, invoices, wallet recharges, deductions, refunds, and ride-package purchases. Card, UPI, and net-banking are processed by Cashfree. We do not store your full card number or UPI PIN."
            },
            {
              title: "Ratings, support, and communications",
              description: "Star ratings and review text; support tickets and messages; cancellation reason and remarks."
            },
            {
              title: "Device and technical data",
              description: "Device type, OS, app version, IP address, crash/performance logs, network status, and a push notification identifier (OneSignal) so we can send booking and account alerts.\nLogin tokens are stored on your device so you stay signed in."
            },
            {
              title: "Website",
              description: "On justclickit.in we may use cookies or similar tools for session, language, and security.\nWe do not collect contacts, microphone audio, or your SMS inbox."
            }
          ]
        },
        {
          number: "2",
          title: "2. How We Use Your Information",
          bullets: [
            "Create and manage your account, including language",
            "Send and verify OTP (SMS and, if you choose, WhatsApp)",
            "Process bookings, match Delivery Partners, and complete deliveries",
            "Share live location between the Customer and the assigned Partner during an active booking",
            "Verify Partner identity, vehicle, and eligibility (KYC)",
            "Store delivery proof",
            "Process payments, invoices, refunds, and wallet credits",
            "Let parties contact each other about a booking (for example a call to the number on that booking)",
            "Provide support and handle disputes, ratings, and cancellations",
            "Send transactional alerts (push, SMS, or WhatsApp)",
            "Send offers only if you have opted in; you can opt out anytime",
            "Improve reliability, prevent fraud, and meet legal duties"
          ],
          extraNote: "We use your information only for these purposes, or a closely related purpose we tell you about."
        },
        {
          number: "3",
          title: "3. How We Share Information",
          intro: "We do not sell personal information. We share information only as needed to run the Platform:",
          table: [
            {
              who: "The other party on a booking (Customer or Delivery Partner)",
              what: "Name, phone, addresses, live location during the trip, vehicle details as needed",
              why: "Complete and track the delivery"
            },
            {
              who: "Cashfree",
              what: "Payment, refund, GSTIN / vehicle checks",
              why: "Payments and verification"
            },
            {
              who: "OneSignal",
              what: "Push identifier and alert content",
              why: "Booking and account notifications"
            },
            {
              who: "Mapbox",
              what: "Coordinates and map requests",
              why: "Maps, routes, and addresses"
            },
            {
              who: "Microsoft Azure",
              what: "Documents and proof photos",
              why: "Secure file storage"
            },
            {
              who: "Google / Apple",
              what: "Only if you sign in with them",
              why: "Account sign-in"
            },
            {
              who: "SMS / WhatsApp providers",
              what: "Phone number and message content",
              why: "OTP and service messages"
            },
            {
              who: "Hosting and security providers",
              what: "Technical logs",
              why: "Operate and protect the Platform"
            },
            {
              who: "Regulators or law enforcement",
              what: "What the law requires",
              why: "Legal compliance"
            }
          ],
          extraNote: "Realtime tracking uses our servers (including a live connection) to pass location between the assigned Partner and the Customer for that booking only."
        },
        {
          number: "4",
          title: "4. Data Retention",
          intro: "We keep information while your account is active, and longer when the law, tax rules, fraud prevention, or a dispute requires it.",
          subsections: [
            {
              title: "When you delete your account we remove:",
              description: "login access; email; profile photo; saved addresses; KYC documents and GST details (if any); notification identifiers.\nYour mobile number is released so it can be registered again."
            },
            {
              title: "We may retain:",
              description: "your name on past bookings; your phone number in masked form (for example 914XXXXX60); booking, payment, invoice, and support records."
            }
          ],
          bullets: [
            "This leftover data is not a live account. You cannot sign in.",
            "Unused wallet or package balance is not refunded after deletion. If a refund is available, request it before you delete the account."
          ]
        },
        {
          number: "5",
          title: "5. Data Security",
          intro: "We use reasonable technical and organisational measures, including encryption in transit, restricted staff access, and secure cloud storage. No method of transmission or storage is 100% secure."
        },
        {
          number: "6",
          title: "6. Your Rights, Choices, and Account Deletion",
          bullets: [
            "You may access or update your profile in the app: Settings → Edit Profile.",
            "You may turn location, camera, photos, or notifications off in device Settings. Some features will not work without them.",
            "You may opt out of promotional messages in the app or by emailing support@justclickit.in. Transactional messages about bookings, OTP, or your account may still be sent."
          ],
          subsections: [
            {
              title: "Delete your account (Google Play and App Store requirement)",
              description: "You have the permanent right to delete your account through either of these methods:",
              bullets: [
                "In the app: Settings → Edit Profile → Delete Account → confirm.",
                "Without the app: Email support@justclickit.in from your registered phone or email. Subject: Delete my Clickit account. Include your full name and registered mobile number."
              ],
              note: "In-app deletion is processed immediately. Email requests are completed within 30 days.\nYou cannot delete an account while a delivery is in progress. Finish or cancel it first.\nDeletion is permanent."
            }
          ]
        },
        {
          number: "7",
          title: "7. Children's Privacy",
          intro: "The Platform is only for users aged 18 or over. We do not knowingly collect information from children. If you believe we have, contact us and we will delete it."
        },
        {
          number: "8",
          title: "8. International Processing",
          intro: "Our servers are used to provide the service in India. Some partners (including Cashfree, OneSignal, Mapbox, Azure, Google, and Apple) may process data on servers outside India. They may do so only to provide their service to us, under their terms and applicable law."
        },
        {
          number: "9",
          title: "9. Changes to This Policy",
          intro: "We may update this Policy. The “Last Updated” date will change. Continued use after an update means you accept the revised Policy. Material changes will be posted on this page."
        },
        {
          number: "10",
          title: "10. Grievance Officer and Contact",
          intro: "For privacy questions, deletion help, or escalations:",
          contactBox: {
            title: "Grievance Officer, Clickit Delivery Network Pvt. Ltd.",
            subtitle: "Clickit Legal & Grievance Department",
            email: "grievance@justclickit.in",
            supportEmail: "support@justclickit.in",
            phone: "+91 141 498 2200",
            statutoryNote: "Pursuant to the Information Technology Act, 2000, and applicable Indian data-protection law."
          }
        }
      ]
    },
    hi: {
      badge: "क्लिकइट डेटा सुरक्षा एवं गोपनीयता संरक्षण",
      officialBadge: "आधिकारिक नीति दस्तावेज़",
      title: "Clickit - प्राइवेसी नीति (Privacy Policy)",
      lastUpdated: "अंतिम अपडेट: 24 सितंबर 2026",
      effectiveDate: "प्रभावी तिथि: 24 सितंबर 2026",
      deepLinkNote: "मोबाइल ऐप में हिंदी में लिंक करने हेतु यूआरएल:",
      intro1: 'यह प्राइवेसी नीति बताती है कि ClickIt (“कंपनी,” “हम”), जिसका संचालन Clickit Delivery Network Pvt. Ltd. करता है, आपकी जानकारी कैसे एकत्र, उपयोग, साझा और सुरक्षित करता है — जब आप हमारी वेबसाइट (justclickit.in) और मोबाइल ऐप Clickit (Customer) तथा Clickit Partner (Delivery Partner) का उपयोग करते हैं (एक साथ, “ClickIt Platform”)।',
      intro2: 'खाता बनाने या प्लेटफ़ॉर्म का उपयोग करने पर आप इस नीति से सहमत होते हैं।',
      callout: 'हम आपकी व्यक्तिगत जानकारी बेचते नहीं हैं। हम आपके डेटा का उपयोग तीसरे पक्ष के विज्ञापन के लिए नहीं करते, और विज्ञापन के लिए Advertising ID नहीं लेते।',
      tableHeaders: {
        who: "किससे",
        what: "क्या",
        why: "क्यों"
      },
      sections: [
        {
          number: "1",
          title: "1. हम कौन-सी जानकारी एकत्र करते हैं",
          intro: "नीचे दी गई जानकारी एकत्र होती है। कुछ चीजें केवल उसी ऐप या फीचर पर लागू होती हैं जिसका आप उपयोग करते हैं।",
          subsections: [
            {
              title: "खाता और प्रोफ़ाइल",
              description: "नाम, मोबाइल नंबर, ईमेल पता, प्रोफ़ाइल फोटो, भाषा (अंग्रेज़ी या हिन्दी), राज्य/शहर, और GSTIN (यदि आप दें)।\nआप मोबाइल पर भेजे गए वन-टाइम पासवर्ड (OTP) से साइन इन करते हैं। हम पासवर्ड नहीं लेते।\nCustomer Google या Apple से भी साइन इन कर सकते हैं। उस स्थिति में हमें वह नाम, ईमेल और अकाउंट पहचानकर्ता मिल सकता है जो ये सेवाएँ हमारे साथ साझा करती हैं।"
            },
            {
              title: "WhatsApp और SMS",
              description: "यदि आप चुनें, तो हम लॉगिन OTP या सेवा अपडेट WhatsApp पर भेज सकते हैं। Android पर हम Google Play SMS User Consent का उपयोग कर सकते हैं, ताकि आप लॉगिन OTP ऑटोफ़िल को मंज़ूर कर सकें। हम SMS इनबॉक्स की अनुमति नहीं माँगते और आपके अन्य संदेश नहीं पढ़ते।"
            },
            {
              title: "Delivery Partner वेरिफिकेशन (Clickit Partner)",
              description: "ड्राइविंग लाइसेंस, वाहन RC, आधार (आगे और पीछे), PAN, प्रोफ़ाइल फोटो, वाहन प्रकार, ईंधन प्रकार, और वाहन रजिस्ट्रेशन नंबर। वाहन और GST नंबर की जाँच हमारे पेमेंट/KYC पार्टनर (Cashfree) से हो सकती है। ये दस्तावेज़ केवल यह सत्यापित करने के लिए हैं कि आप प्लेटफ़ॉर्म पर काम कर सकते हैं।"
            },
            {
              title: "पते और बुकिंग विवरण",
              description: "सेव किए गए स्थान (जैसे होम या वर्क), पिकअप और ड्रॉप पते तथा कोऑर्डिनेट्स, रिसीवर का नाम और फ़ोन, पार्सल/आइटम विवरण, और बुकिंग नोट्स।"
            },
            {
              title: "लोकेशन",
              description: "हम सटीक लोकेशन एकत्र करते हैं:",
              bullets: [
                "Customer: मैप पर पिकअप/ड्रॉप सेट करने और एक्टिव बुकिंग के दौरान Delivery Partner को फ़ॉलो करने के लिए।",
                "Delivery Partner: जब आप ऑनलाइन हों या एक्टिव डिलीवरी पर हों — ऐप स्क्रीन पर न होने पर भी (Android पर एक स्थायी नोटिफिकेशन दिखता है)। हम यह लाइव लोकेशन उस बुकिंग के Customer के साथ शेयर करते हैं, ताकि वे डिलीवरी ट्रैक कर सकें।"
              ],
              note: "Partner लोकेशन शेयरिंग रोकने के लिए ऑफ़लाइन हों या डिलीवरी पूरी करें। डिवाइस Settings में लोकेशन अनुमति भी वापस ले सकते हैं।"
            },
            {
              title: "फोटो",
              description: "प्रोफ़ाइल फोटो; Partner के KYC दस्तावेज़; कैमरा से ली गई या गैलरी से चुनी गई पिकअप और डिलीवरी प्रूफ़ फोटो।"
            },
            {
              title: "पेमेंट और वॉलेट",
              description: "बुकिंग पेमेंट, इनवॉइस, वॉलेट रिचार्ज, कटौती, रिफ़ंड, और राइड-पैकेज खरीदारी। कार्ड, UPI और नेट-बैंकिंग Cashfree से प्रोसेस होते हैं। हम आपका पूरा कार्ड नंबर या UPI PIN स्टोर नहीं करते।"
            },
            {
              title: "रेटिंग, सपोर्ट और संचार",
              description: "स्टार रेटिंग और रिव्यू टेक्स्ट; सपोर्ट टिकट और संदेश; रद्द करने का कारण और टिप्पणी।"
            },
            {
              title: "डिवाइस और तकनीकी डेटा",
              description: "डिवाइस प्रकार, OS, ऐप वर्शन, IP पता, क्रैश/परफ़ॉर्मेंस लॉग, नेटवर्क स्थिति, और पुश-नोटिफिकेशन पहचानकर्ता (OneSignal), ताकि हम बुकिंग और खाता अलर्ट भेज सकें।\nसाइन इन बनाए रखने के लिए लॉगिन टोकन आपके डिवाइस पर स्टोर होते हैं।"
            },
            {
              title: "वेबसाइट",
              description: "justclickit.in पर हम सेशन, भाषा और सुरक्षा के लिए कुकीज़ या ऐसी ही तकनीक इस्तेमाल कर सकते हैं।\nहम संपर्क सूची, माइक्रोफ़ोन ऑडियो, या आपका SMS इनबॉक्स एकत्र नहीं करते।"
            }
          ]
        },
        {
          number: "2",
          title: "2. हम जानकारी का उपयोग कैसे करते हैं",
          bullets: [
            "आपका खाता बनाना और प्रबंधित करना, भाषा सहित",
            "OTP भेजना और सत्यापित करना (SMS और, यदि आप चुनें, WhatsApp)",
            "बुकिंग प्रोसेस करना, Delivery Partner मैच करना, और डिलीवरी पूरी करना",
            "एक्टिव बुकिंग के दौरान Customer और नियुक्त Partner के बीच लाइव लोकेशन शेयर करना",
            "Partner की पहचान, वाहन और पात्रता सत्यापित करना (KYC)",
            "डिलीवरी प्रूफ़ स्टोर करना",
            "पेमेंट, इनवॉइस, रिफ़ंड और वॉलेट क्रेडिट प्रोसेस करना",
            "बुकिंग के बारे में एक-दूसरे से संपर्क कराना (उदाहरण: उस बुकिंग पर दिए नंबर पर कॉल)",
            "सपोर्ट देना तथा विवाद, रेटिंग और रद्दीकरण संभालना",
            "ट्रांजैक्शनल अलर्ट भेजना (पुश, SMS, या WhatsApp)",
            "ऑफ़र केवल तभी भेजना जब आपने सहमति दी हो; आप कभी भी ऑप्ट आउट कर सकते हैं",
            "विश्वसनीयता सुधारना, धोखाधड़ी रोकना, और कानूनी दायित्व पूरे करना"
          ],
          extraNote: "हम आपकी जानकारी केवल इन उद्देश्यों के लिए उपयोग करते हैं, या किसी निकट संबंधी उद्देश्य के लिए जिसके बारे में हम आपको बताएँगे।"
        },
        {
          number: "3",
          title: "3. हम जानकारी कैसे साझा करते हैं",
          intro: "हम व्यक्तिगत जानकारी नहीं बेचते। प्लेटफ़ॉर्म चलाने के लिए केवल ज़रूरत के अनुसार शेयर करते हैं:",
          table: [
            {
              who: "उसी बुकिंग का दूसरा पक्ष (Customer या Delivery Partner)",
              what: "नाम, फ़ोन, पते, यात्रा के दौरान लाइव लोकेशन, ज़रूरत अनुसार वाहन विवरण",
              why: "डिलीवरी पूरी और ट्रैक करना"
            },
            {
              who: "Cashfree",
              what: "पेमेंट, रिफ़ंड, GSTIN / वाहन जाँच",
              why: "पेमेंट और वेरिफिकेशन"
            },
            {
              who: "OneSignal",
              what: "पुश पहचानकर्ता और अलर्ट सामग्री",
              why: "बुकिंग और खाता सूचनाएँ"
            },
            {
              who: "Mapbox",
              what: "कोऑर्डिनेट्स और मैप अनुरोध",
              why: "मैप, रूट और पते"
            },
            {
              who: "Microsoft Azure",
              what: "दस्तावेज़ और प्रूफ़ फ़ोटो",
              why: "सुरक्षित फ़ाइल स्टोरेज"
            },
            {
              who: "Google / Apple",
              what: "केवल यदि आप उन्हीं से साइन इन करें",
              why: "खाता साइन-इन"
            },
            {
              who: "SMS / WhatsApp प्रदाता",
              what: "फ़ोन नंबर और संदेश सामग्री",
              why: "OTP और सेवा संदेश"
            },
            {
              who: "होस्टिंग और सुरक्षा प्रदाता",
              what: "तकनीकी लॉग",
              why: "प्लेटफ़ॉर्म चलाना और सुरक्षित रखना"
            },
            {
              who: "नियामक या कानून प्रवर्तन",
              what: "जो कानून माँगे",
              why: "कानूनी अनुपालन"
            }
          ],
          extraNote: "रियलटाइम ट्रैकिंग हमारे सर्वर (लाइव कनेक्शन सहित) से होती है, ताकि लोकेशन केवल उसी बुकिंग के नियुक्त Partner और Customer के बीच जाए।"
        },
        {
          number: "4",
          title: "4. डेटा कितने समय तक रखा जाता है",
          intro: "हम जानकारी खाता सक्रिय रहने तक रखते हैं, और उससे अधिक तब रखते हैं जब कानून, कर नियम, धोखाधड़ी रोकथाम, या कोई विवाद हो।",
          subsections: [
            {
              title: "जब आप खाता हटाते हैं, हम हटाते हैं:",
              description: "लॉगिन एक्सेस; ईमेल; प्रोफ़ाइल फोटो; सेव किए गए पते; KYC दस्तावेज़ और GST विवरण (यदि हों); नोटिफिकेशन पहचानकर्ता।\nआपका मोबाइल नंबर मुक्त हो जाता है, ताकि उसे दोबारा रजिस्टर किया जा सके।"
            },
            {
              title: "हम रख सकते हैं:",
              description: "पिछली बुकिंग पर आपका नाम; मास्क्ड रूप में आपका फ़ोन नंबर (जैसे 914XXXXX60); बुकिंग, पेमेंट, इनवॉइस और सपोर्ट रिकॉर्ड।"
            }
          ],
          bullets: [
            "यह बचा डेटा लाइव खाता नहीं है। आप इसमें साइन इन नहीं कर सकते।",
            "हटाने के बाद बचा वॉलेट या पैकेज बैलेंस रिफ़ंड नहीं होता। यदि रिफ़ंड उपलब्ध हो, तो खाता हटाने से पहले लें।"
          ]
        },
        {
          number: "5",
          title: "5. डेटा सुरक्षा",
          intro: "हम उचित तकनीकी और संगठनात्मक उपाय इस्तेमाल करते हैं, जिनमें ट्रांजिट में एन्क्रिप्शन, सीमित स्टाफ एक्सेस, और सुरक्षित क्लाउड स्टोरेज शामिल हैं। ट्रांसमिशन या स्टोरेज का कोई तरीका 100% सुरक्षित नहीं होता।"
        },
        {
          number: "6",
          title: "6. आपके अधिकार, विकल्प और खाता हटाना",
          bullets: [
            "आप अपनी जानकारी ऐप में देख या अपडेट कर सकते हैं: सेटिंग्स → प्रोफ़ाइल संपादित करें।",
            "आप डिवाइस Settings में लोकेशन, कैमरा, फोटो या सूचनाएँ बंद कर सकते हैं। इनके बिना कुछ सुविधाएँ काम नहीं करेंगी।",
            "प्रमोशनल संदेश बंद करने के लिए ऐप का उपयोग करें या support@justclickit.in पर लिखें। बुकिंग, OTP या खाते से जुड़े ट्रांजैक्शनल संदेश फिर भी आ सकते हैं।"
          ],
          subsections: [
            {
              title: "अपना खाता हटाएँ (Google Play और App Store आवश्यकता)",
              description: "आपको अपना खाता स्थायी रूप से हटाने का पूर्ण अधिकार है:",
              bullets: [
                "ऐप में: सेटिंग्स → प्रोफ़ाइल संपादित करें → खाता हटाएँ → पुष्टि करें।",
                "ऐप के बिना: अपने रजिस्टर्ड फ़ोन या ईमेल से support@justclickit.in पर लिखें। विषय: Delete my Clickit account। अपना पूरा नाम और रजिस्टर्ड मोबाइल नंबर लिखें।"
              ],
              note: "ऐप में हटाना तुरंत प्रोसेस होता है। ईमेल अनुरोध 30 दिनों में पूरे होते हैं।\nयदि कोई डिलीवरी चल रही हो, तो खाता नहीं हटेगा। पहले उसे पूरा करें या रद्द करें।\nहटाना स्थायी है।"
            }
          ]
        },
        {
          number: "7",
          title: "7. बच्चों की गोपनीयता",
          intro: "यह प्लेटफ़ॉर्म केवल 18 वर्ष या उससे अधिक आयु के उपयोगकर्ताओं के लिए है। हम जानबूझकर बच्चों से जानकारी एकत्र नहीं करते। यदि आपको लगे कि हमने ली है, तो संपर्क करें — हम उसे हटा देंगे।"
        },
        {
          number: "8",
          title: "8. अंतर्राष्ट्रीय प्रोसेसिंग",
          intro: "हमारे सर्वर भारत में सेवा देने के लिए उपयोग होते हैं। कुछ पार्टनर (जिनमें Cashfree, OneSignal, Mapbox, Azure, Google और Apple शामिल हैं) डेटा भारत के बाहर के सर्वर पर प्रोसेस कर सकते हैं। वे ऐसा केवल हमें अपनी सेवा देने के लिए, अपनी शर्तों और लागू कानून के अंतर्गत कर सकते हैं।"
        },
        {
          number: "9",
          title: "9. इस नीति में बदलाव",
          intro: "हम इस नीति को अपडेट कर सकते हैं। “अंतिम अपडेट” की तारीख बदल जाएगी। अपडेट के बाद प्लेटफ़ॉर्म का उपयोग जारी रखना संशोधित नीति की स्वीकृति माना जाएगा। महत्वपूर्ण बदलाव इस पेज पर पोस्ट किए जाएँगे।"
        },
        {
          number: "10",
          title: "10. शिकायत अधिकारी और संपर्क",
          intro: "गोपनीयता संबंधी सवाल, खाता हटाने में मदद, या शिकायत के लिए:",
          contactBox: {
            title: "शिकायत अधिकारी, Clickit Delivery Network Pvt. Ltd.",
            subtitle: "Clickit विधिक एवं शिकायत निवारण विभाग",
            email: "grievance@justclickit.in",
            supportEmail: "support@justclickit.in",
            phone: "+91 141 498 2200",
            statutoryNote: "सूचना प्रौद्योगिकी अधिनियम, 2000, और लागू भारतीय डेटा-संरक्षण कानून के अंतर्गत।"
          }
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 font-sans pb-24 selection:bg-[#00a6c7]/30 selection:text-[#00a6c7]">
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
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#00a6c7] text-white shadow-md shadow-[#00a6c7]/25'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => handleLangChange('hi')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  lang === 'hi'
                    ? 'bg-[#00a6c7] text-white shadow-md shadow-[#00a6c7]/25'
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
              className="inline-flex items-center gap-1.5 text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
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
            <div className="inline-flex items-center gap-1.5 text-xs text-[#00a6c7] font-semibold bg-[#00a6c7]/10 px-3 py-1 rounded-full border border-[#00a6c7]/20">
              <Lock className="w-3.5 h-3.5" /> {t.officialBadge}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-sm text-zinc-400">{t.lastUpdated} • {t.effectiveDate}</p>

          {/* In-app linking banner */}
          <div className="mt-4 p-4 bg-[#12141C] border border-zinc-800 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-300 font-semibold">{t.deepLinkNote}</span>
                <code className="bg-zinc-900 px-2 py-0.5 rounded text-[#00a6c7] font-mono font-medium">
                  {getBaseOrigin()}/privacy-policy?lang={lang}
                </code>
              </div>
              <button
                onClick={() => handleLangChange(lang === 'en' ? 'hi' : 'en')}
                className="text-[#00a6c7] hover:underline font-semibold text-left sm:text-right cursor-pointer"
              >
                {lang === 'en' ? 'हिन्दी में पढ़ें (Switch to Hindi)' : 'Read in English'}
              </button>
            </div>

            {/* Quick Action Copy Buttons for Developers */}
            <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-zinc-400 text-[11px] font-medium mr-1">Share with Developers:</span>
              
              {/* Copy English Link */}
              <button
                type="button"
                onClick={() => copySpecificLangUrl('en')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                  copiedEn
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700/80 text-zinc-200'
                }`}
              >
                {copiedEn ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-[#00a6c7]" />}
                <span>{copiedEn ? 'English URL Copied!' : 'Copy English URL'}</span>
              </button>

              {/* Copy Hindi Link */}
              <button
                type="button"
                onClick={() => copySpecificLangUrl('hi')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ${
                  copiedHi
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700/80 text-zinc-200'
                }`}
              >
                {copiedHi ? <Check className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5 text-[#00a6c7]" />}
                <span>{copiedHi ? 'Hindi URL Copied!' : 'Copy Hindi URL'}</span>
              </button>

              {/* Copy Complete Bundle */}
              <button
                type="button"
                onClick={copyDeveloperBundle}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium ml-auto ${
                  copiedBundle
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {copiedBundle ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copiedBundle ? 'Bundle Copied!' : 'Copy Both Links'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Intro Card */}
        <div className="bg-[#12141C] border border-zinc-800/90 rounded-2xl p-6 sm:p-7 mb-8 shadow-lg text-zinc-300 leading-relaxed text-sm sm:text-base space-y-4">
          <p>{t.intro1}</p>
          <p className="font-medium text-white">{t.intro2}</p>
          <div className="p-4 rounded-xl bg-[#00a6c7]/10 border border-[#00a6c7]/25 text-[#00a6c7] font-semibold flex items-start gap-3">
            <EyeOff className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm leading-relaxed">{t.callout}</span>
          </div>
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

              {section.intro && (
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {section.intro}
                </p>
              )}

              {/* Subsections (e.g., Account & Profile, WhatsApp, Location, etc.) */}
              {section.subsections && (
                <div className="space-y-4 pt-1">
                  {section.subsections.map((sub, j) => (
                    <div key={j} className="bg-zinc-950/60 p-4 sm:p-5 rounded-xl border border-zinc-800/60 space-y-2">
                      <h3 className="font-bold text-[#00a6c7] text-sm sm:text-base">
                        {sub.title}
                      </h3>
                      {sub.description && (
                        <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
                          {sub.description}
                        </p>
                      )}
                      {sub.bullets && sub.bullets.length > 0 && (
                        <ul className="space-y-2 text-zinc-300 text-xs sm:text-sm pt-1 pl-1">
                          {sub.bullets.map((b, k) => (
                            <li key={k} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00a6c7] mt-1.5 shrink-0"></span>
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {sub.note && (
                        <div className="pt-2 text-xs text-zinc-400 italic border-t border-zinc-800/50 whitespace-pre-line">
                          {sub.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* General Bullet Lists */}
              {section.bullets && (
                <ul className="space-y-2.5 text-zinc-300 text-sm sm:text-base pt-1">
                  {section.bullets.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a6c7] mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Sharing Table for Section 3 */}
              {section.table && (
                <div className="overflow-x-auto pt-2 -mx-2 sm:mx-0">
                  <table className="w-full text-left border-collapse border border-zinc-800 rounded-xl overflow-hidden text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-zinc-900/90 text-zinc-200 border-b border-zinc-800 font-bold">
                        <th className="p-3 sm:p-3.5 border-r border-zinc-800 w-1/4 sm:w-1/4">
                          {t.tableHeaders.who}
                        </th>
                        <th className="p-3 sm:p-3.5 border-r border-zinc-800 w-2/5 sm:w-2/5">
                          {t.tableHeaders.what}
                        </th>
                        <th className="p-3 sm:p-3.5">
                          {t.tableHeaders.why}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80 bg-zinc-950/40 text-zinc-300">
                      {section.table.map((row, idx) => (
                        <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="p-3 sm:p-3.5 font-semibold text-white border-r border-zinc-800 align-top">
                            {row.who}
                          </td>
                          <td className="p-3 sm:p-3.5 text-zinc-300 border-r border-zinc-800 align-top leading-relaxed">
                            {row.what}
                          </td>
                          <td className="p-3 sm:p-3.5 text-zinc-300 align-top leading-relaxed font-medium">
                            {row.why}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Extra note / closing remark */}
              {section.extraNote && (
                <p className="text-zinc-300 text-xs sm:text-sm pt-1 leading-relaxed bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-800/50">
                  {section.extraNote}
                </p>
              )}

              {/* Section 10 Grievance Officer & Contact Box */}
              {section.contactBox && (
                <div className="mt-4 p-5 sm:p-6 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-3 text-xs sm:text-sm shadow-inner">
                  <div>
                    <div className="font-bold text-white text-base sm:text-lg">
                      {section.contactBox.title}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {section.contactBox.subtitle}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm">
                    <a
                      href={`mailto:${section.contactBox.email}`}
                      className="inline-flex items-center gap-2 text-[#00a6c7] hover:underline font-semibold"
                    >
                      <Mail className="w-4 h-4" />
                      Email: {section.contactBox.email}
                    </a>
                    <a
                      href={`mailto:${section.contactBox.supportEmail}`}
                      className="inline-flex items-center gap-2 text-zinc-300 hover:text-white font-semibold"
                    >
                      <Mail className="w-4 h-4 text-zinc-400" />
                      Support: {section.contactBox.supportEmail}
                    </a>
                    <a
                      href={`tel:${section.contactBox.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-2 text-zinc-300 hover:text-white font-semibold"
                    >
                      <Phone className="w-4 h-4 text-zinc-400" />
                      Phone: {section.contactBox.phone}
                    </a>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-400 leading-relaxed">
                    {section.contactBox.statutoryNote}
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-[#00a6c7] transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#00a6c7]" />
            {lang === 'hi' ? 'नियम एवं शर्तें (Terms & Conditions) देखें' : 'View Terms and Conditions'}
          </button>
          <div className="text-xs text-zinc-500">
            © 2026 Clickit Delivery Network Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
