import React, { useState } from "react";
import { 
  ArrowLeft, 
  Shield, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Phone, 
  Mail, 
  Globe, 
  Copy, 
  Check, 
  Truck, 
  Building2,
  Calendar,
  UserCheck,
  Award,
  Info
} from "lucide-react";

interface DriverAgreementProps {
  onNavigate?: (path: string) => void;
  initialLang?: 'en' | 'hi';
}

export default function DriverAgreement({ onNavigate, initialLang }: DriverAgreementProps) {
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
      const url = `${window.location.origin}/driver-agreement?lang=${lang}`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const companyDetails = {
    brand: "Clickit",
    legalEntity: "Promovers Logistics Solutions Private Limited",
    gstin: "08AARCP1294R1ZD",
    cin: "U52290RJ2026PTC114862",
    registeredOffice: "B-18-A, Ground Floor, Shiv Marg, Bani Park, Jaipur 302016, Rajasthan, India",
    version: "Version 1.0 • Driver App"
  };

  const sectionsEn = [
    {
      num: 1,
      title: "PURPOSE AND SCOPE",
      content: [
        "This Driver Partner Agreement (“Agreement”) sets out the rights, responsibilities and operating conditions applicable to a person registered with the Clickit Driver App to receive and perform delivery, pickup, logistics or transportation assignments (“Driver Partner”, “you” or “your”).",
        "Clickit is a technology-enabled logistics platform operated by Promovers Logistics Solutions Private Limited (“Clickit”, “Company”, “we”, “us” or “our”). This Agreement applies together with the Clickit Terms & Conditions, Privacy Policy, applicable fare rules, subscription plan terms, safety policies and other rules displayed in the Driver App.",
        "By clicking “I Agree”, completing onboarding, activating the Driver App, accepting an assignment or performing a Clickit assignment, you acknowledge that you have read, understood and accepted this Agreement."
      ]
    },
    {
      num: 2,
      title: "INDEPENDENT DRIVER PARTNER RELATIONSHIP",
      content: [
        "Unless a separate written employment agreement expressly states otherwise, you participate on the Clickit platform as an independent service provider and not as an employee, partner, agent or representative of Clickit.",
        "You are responsible for deciding whether to remain online and, subject to the Driver App’s applicable acceptance and cancellation rules, whether to accept assignments made available to you.",
        "Nothing in this Agreement authorises you to make representations, warranties, commitments or contracts on behalf of Clickit.",
        "You are responsible for your own income-tax, GST or other tax obligations, registrations and filings that legally apply to your activities, except to the extent Clickit is required by law to deduct, collect or report any amount."
      ]
    },
    {
      num: 3,
      title: "DRIVER ELIGIBILITY AND ONBOARDING",
      content: [
        "You must provide true, complete and current information during registration and verification.",
        "You must meet the eligibility requirements communicated by Clickit for the relevant vehicle/service category and location.",
        "You must provide valid identity/KYC information and such other documents as Clickit reasonably requires for onboarding, safety, fraud prevention or legal compliance.",
        "Clickit may verify documents directly or through authorised third parties and may require periodic re-verification or updated documents.",
        "Providing forged, altered, expired or misleading documents may result in immediate suspension or termination and may be reported where required by law."
      ]
    },
    {
      num: 4,
      title: "VEHICLE AND DOCUMENT REQUIREMENTS",
      content: [
        "You must use only a vehicle that is registered and approved for the relevant Clickit service category.",
        "You must maintain all licences, registration certificates, permits, fitness certificates, pollution-under-control certificates, insurance and other documents required by applicable law for the vehicle and service.",
        "You must ensure that the vehicle is roadworthy, clean, safe and suitable for the assigned shipment.",
        "You must not use an unauthorised vehicle, substitute driver or unapproved person to perform an assignment through your account.",
        "You must immediately inform Clickit of any suspension, expiry, cancellation or material change affecting your driving licence, vehicle documents or insurance."
      ]
    },
    {
      num: 5,
      title: "DRIVER APP AND ACCOUNT SECURITY",
      content: [
        "Your Driver App account is personal to you. You must not sell, rent, lend, transfer, share or allow another person to use your account.",
        "You must protect OTPs, passwords, device access and other account credentials.",
        "You must not manipulate GPS, trip status, online/offline status, fare information, wallet balances, ratings, referral benefits or other Platform data.",
        "You must not use automated tools, scripts, bots or technical methods to obtain assignments or interfere with the Platform.",
        "Any suspected account compromise must be reported to Clickit promptly."
      ]
    },
    {
      num: 6,
      title: "ASSIGNMENTS AND ACCEPTANCE",
      content: [
        "Assignments may be offered based on availability, location, vehicle category, customer requirements, operational rules and other factors used by the Platform.",
        "You may accept or decline assignments subject to the applicable Driver App rules. Repeated manipulation, false acceptance, intentional non-performance or abusive cancellation patterns may result in review or action.",
        "Once you accept an assignment, you must make reasonable efforts to complete it safely and in accordance with the Booking details.",
        "You must not accept an assignment and then demand additional money from the Customer to perform it."
      ]
    },
    {
      num: 7,
      title: "FARE, EARNINGS, COMMISSION AND DEDUCTIONS",
      content: [
        "Your applicable Driver Fare/earnings, platform commission, fees, incentives, bonuses, subscription benefits and other commercial terms will be displayed or communicated through the Driver App or applicable plan terms.",
        "Clickit may deduct contractually applicable commission, platform fees, subscription charges, penalties or other amounts that are lawfully due from your Clickit wallet/account balance or otherwise recover them as permitted by applicable law.",
        "Government taxes, statutory deductions or withholding requirements may apply to amounts payable to you.",
        "Clickit may correct demonstrable calculation errors, fraudulent credits or duplicate payments after verification and may recover amounts improperly credited.",
        "Fare structures, commission rates, incentives and subscription plans may be changed prospectively by Clickit subject to applicable contractual terms and law."
      ]
    },
    {
      num: 8,
      title: "DRIVER WALLET / ACCOUNT BALANCE",
      content: [
        "Where the Driver App provides a wallet or account balance, it is an internal Platform balance for permitted Clickit transactions and is not a bank account or deposit.",
        "You must not use the wallet for unlawful transactions or attempt to manipulate, duplicate, reverse or fraudulently increase its balance.",
        "Clickit may record and deduct applicable commission, subscription fees, platform charges or other amounts due under this Agreement.",
        "If a balance becomes negative or an amount is otherwise payable by you, Clickit may restrict assignments and recover the outstanding amount through lawful means.",
        "Any refund, withdrawal or transfer feature will be available only where expressly provided by Clickit and subject to applicable law and the relevant terms."
      ]
    },
    {
      num: 9,
      title: "CUSTOMER AND PACKAGE HANDLING",
      content: [
        "You must collect and deliver the Package only according to the Booking details and authorised instructions.",
        "You must not open, consume, inspect, replace, alter, remove, conceal or misuse the Package except where required for safety, lawful verification or an emergency.",
        "You must handle Packages with reasonable care and use appropriate securing methods during transport.",
        "You must not demand that a Customer disclose unnecessary personal information.",
        "You must not divert, sell, retain, pledge, abandon or otherwise misuse any Package.",
        "Any suspected loss, theft, tampering, leakage, prohibited goods or serious incident must be reported to Clickit immediately."
      ]
    },
    {
      num: 10,
      title: "PROHIBITED GOODS AND ILLEGAL ACTIVITIES",
      content: [
        "You must not knowingly accept or transport goods that are prohibited by law or by Clickit policy, including illegal drugs or controlled substances, explosives, unlawful weapons or ammunition, hazardous materials not authorised for the service, stolen or counterfeit goods, or other restricted items.",
        "If you reasonably suspect that a Package is illegal, dangerous or materially misdeclared, stop the transaction where safe to do so and contact Clickit support or the appropriate authority as required.",
        "You must not use Clickit assignments for smuggling, fraud, money laundering, theft or any other unlawful activity."
      ]
    },
    {
      num: 11,
      title: "CUSTOMER CONDUCT AND PROFESSIONAL BEHAVIOUR",
      content: [
        "You must behave professionally and respectfully toward Customers, recipients, vendors, security personnel, other drivers and Clickit personnel.",
        "Harassment, threats, intimidation, discrimination, physical violence, sexual misconduct, abusive language or retaliation against a Customer or recipient is strictly prohibited.",
        "You must not ask Customers for unauthorised tips, additional charges or personal favours as a condition of service.",
        "You must not share Customer contact details, address information, package information, photographs or other personal data except as necessary to perform the assignment or as permitted by law."
      ]
    },
    {
      num: 12,
      title: "SAFETY AND ROAD COMPLIANCE",
      content: [
        "You must comply with applicable traffic, transport, safety and road laws at all times.",
        "You must not drive while intoxicated, impaired, excessively fatigued or otherwise unfit to drive.",
        "You must not use a mobile phone or other device in a manner prohibited by traffic law while driving.",
        "You must not overload the vehicle or transport a Package in an unsafe manner.",
        "You are responsible for safe loading, securing and transportation to the extent within your control.",
        "Clickit may suspend access where there is a credible safety concern."
      ]
    },
    {
      num: 13,
      title: "ACCIDENTS, BREAKDOWNS AND EMERGENCIES",
      content: [
        "In the event of an accident, breakdown, theft, medical emergency or other serious incident, first take reasonable steps to protect life and safety and contact emergency services where necessary.",
        "You must report material incidents to Clickit as soon as reasonably practicable and provide accurate details and supporting documents.",
        "You must not admit liability, fabricate facts or destroy evidence relating to an incident.",
        "Clickit may request photographs, location records, police documents, insurance details or other evidence for incident management and claims."
      ]
    },
    {
      num: 14,
      title: "CASH COLLECTION AND PAYMENT",
      content: [
        "Where cash collection is enabled, you must collect only the amount shown or authorised through the Driver App.",
        "You must not demand unauthorised charges, alter the payable amount, issue false payment confirmations or retain cash beyond the applicable reconciliation process.",
        "You must accurately record cash collection and follow Clickit’s settlement instructions.",
        "Any cash shortage, disputed collection or suspected fraud may be investigated and adjusted in accordance with applicable rules and law."
      ]
    },
    {
      num: 15,
      title: "CUSTOMER PRIVACY AND DATA PROTECTION",
      content: [
        "You may receive access to Customer information such as name, phone number, pickup location, delivery location, recipient details and Booking information solely to perform the assignment.",
        "You must use such information only for the legitimate purpose of completing the Clickit assignment and must not retain, copy, sell, disclose or reuse it for personal or commercial purposes.",
        "You must delete or securely dispose of Customer information from personal devices or records when it is no longer required for the assignment or legally required recordkeeping.",
        "Clickit may process your personal information for onboarding, identity verification, safety, fraud prevention, payments, support, performance management and legal compliance in accordance with its Privacy Policy and applicable data-protection law. The DPDP Rules, 2025 have been notified by MeitY with phased commencement provisions."
      ]
    },
    {
      num: 16,
      title: "RATINGS, COMPLAINTS AND INVESTIGATIONS",
      content: [
        "Customers may rate or provide feedback about completed assignments.",
        "Clickit may review complaints, ratings, GPS/trip records, communications, payment records, photographs and other relevant information to investigate suspected misconduct or service failures.",
        "You must cooperate honestly with reasonable investigations and provide requested information within a reasonable time.",
        "Clickit may temporarily restrict assignments while investigating serious allegations, particularly where safety, fraud, theft or unlawful conduct is involved."
      ]
    },
    {
      num: 17,
      title: "SUSPENSION AND DEACTIVATION",
      content: [
        "Clickit may temporarily suspend or permanently deactivate your Driver App access for reasons including fraud, account sharing, document deficiencies, unsafe driving, serious complaints, theft, package misuse, prohibited goods, unlawful conduct, payment/wallet manipulation, repeated policy violations or material breach of this Agreement.",
        "Where reasonably practicable and legally appropriate, Clickit may provide an opportunity to explain or submit relevant evidence before a final decision on disputed matters.",
        "Suspension or deactivation does not automatically extinguish legitimate payment, claim, confidentiality, data-protection or other obligations that survive under this Agreement.",
        "Nothing in this clause prevents you from exercising any non-waivable legal right or remedy."
      ]
    },
    {
      num: 18,
      title: "INSURANCE AND PERSONAL RESPONSIBILITY",
      content: [
        "You must maintain the insurance required by applicable law for your vehicle and service and comply with the terms of such insurance.",
        "Where Clickit or a third party provides additional insurance or coverage for a particular assignment, it will be subject to the applicable policy terms, limits, exclusions and claim procedures.",
        "You remain responsible for your vehicle, personal equipment, lawful driving conduct and compliance with statutory requirements."
      ]
    },
    {
      num: 19,
      title: "INTELLECTUAL PROPERTY AND BRAND USE",
      content: [
        "Clickit retains all rights in the Clickit name, logo, Driver App, software, systems and other intellectual property.",
        "You may use Clickit branding, uniforms, stickers or other materials only in the manner authorised by Clickit.",
        "You must not represent yourself as an owner, employee, director, authorised spokesperson or legal representative of Clickit unless expressly authorised."
      ]
    },
    {
      num: 20,
      title: "CONFIDENTIALITY",
      content: [
        "You must keep confidential non-public information obtained through Clickit, including customer information, pricing systems, operational processes, technical information, internal communications and security procedures.",
        "This obligation does not apply to information that is lawfully public or must be disclosed by law, provided that where legally permitted you give Clickit reasonable prior notice."
      ]
    },
    {
      num: 21,
      title: "INDEMNITY AND LIABILITY",
      content: [
        "To the extent permitted by law, you are responsible for losses, claims, penalties, damages and reasonable costs arising from your fraud, wilful misconduct, unlawful conduct, misuse of Packages, breach of this Agreement, unauthorised use of Customer data or material violation of safety requirements.",
        "Clickit does not exclude or limit liability to the extent such limitation is prohibited by applicable law.",
        "Nothing in this Agreement transfers to you any liability that legally belongs solely to Clickit."
      ]
    },
    {
      num: 22,
      title: "TERM, EXIT AND FINAL SETTLEMENT",
      content: [
        "This Agreement begins when you accept it electronically and continues while your Driver Partner account remains active, unless terminated earlier.",
        "You may stop participating by requesting account closure through the designated Clickit process, subject to completion of active assignments and settlement of outstanding amounts.",
        "Clickit may terminate the Agreement for material breach, fraud, safety concerns, unlawful conduct or other legitimate reasons, subject to applicable law.",
        "Upon termination, you must return or stop using Clickit property, branding, confidential information and Customer data and must settle outstanding amounts."
      ]
    },
    {
      num: 23,
      title: "GOVERNING LAW AND DISPUTES",
      content: [
        "This Agreement is governed by the laws of India.",
        "The parties should first attempt to resolve disputes through Clickit support or its designated grievance process.",
        "Where arbitration is legally appropriate and agreed between the parties, the dispute may be referred to arbitration under the Arbitration and Conciliation Act, 1996. The seat/venue and procedure should be stated in the applicable arbitration arrangement or determined under applicable law.",
        "Nothing in this clause prevents a party from using a non-waivable statutory remedy before a competent authority or court."
      ]
    },
    {
      num: 24,
      title: "CHANGES TO THIS AGREEMENT",
      content: [
        "Clickit may update this Agreement to reflect changes in law, Services, technology, safety standards, commercial terms or operations.",
        "Material changes will be communicated through the Driver App or other reasonable means where required.",
        "Your continued use of the Driver App after the effective date of an updated Agreement will constitute acceptance to the extent permitted by applicable law."
      ]
    },
    {
      num: 25,
      title: "ELECTRONIC ACCEPTANCE",
      content: [
        "By selecting “I Agree”, entering an OTP, signing electronically, activating your Driver App account, accepting an assignment or otherwise using Clickit as a Driver Partner, you acknowledge that this Agreement has been made available to you and that you agree to be bound by it.",
        "Electronic records of acceptance, timestamps, device information and related Platform records may be maintained as evidence of acceptance, subject to applicable law."
      ]
    },
    {
      num: 26,
      title: "COMPANY DETAILS AND CONTACT",
      content: [
        "Brand: Clickit",
        "Legal Entity: Promovers Logistics Solutions Private Limited",
        "GSTIN: 08AARCP1294R1ZD",
        "CIN: U52290RJ2026PTC114862",
        "Registered Office: B-18-A, Ground Floor, Shiv Marg, Bani Park, Jaipur 302016, Rajasthan, India",
        "Driver Support Email: partners@clickitlogistics.in",
        "Driver Support Phone: +91 1800 203 4567",
        "Grievance Officer Email: grievance@clickitlogistics.in",
        "Effective Date: 15th September 2026",
        "Version: 1.0"
      ]
    }
  ];

  const sectionsHi = [
    {
      num: 1,
      title: "उद्देश्य और दायरा (PURPOSE AND SCOPE)",
      content: [
        "यह ड्राइवर पार्टनर अनुबंध (\"अनुबंध\") क्लिकइट ड्राइवर ऐप पर डिलीवरी, पिकअप, लॉजिस्टिक्स या परिवहन असाइनमेंट प्राप्त करने और करने के लिए पंजीकृत व्यक्ति (\"ड्राइवर पार्टनर\", \"आप\" या \"आपका\") पर लागू होने वाले अधिकारों, जिम्मेदारियों और परिचालन स्थितियों को निर्धारित करता है।",
        "क्लिकइट (Clickit) एक टेक्नोलॉजी-सक्षम लॉजिस्टिक्स प्लेटफॉर्म है जिसका संचालन Promovers Logistics Solutions Private Limited (\"क्लिकइट\", \"कंपनी\", \"हम\" या \"हमारा\") द्वारा किया जाता है। यह अनुबंध क्लिकइट के नियम व शर्तों, गोपनीयता नीति (Privacy Policy), लागू किराया नियमों, सब्सक्रिप्शन प्लान शर्तों, सुरक्षा नीतियों और ड्राइवर ऐप में प्रदर्शित अन्य नियमों के साथ लागू होता है।",
        "\"मैं सहमत हूँ\" (I Agree) पर क्लिक करके, ऑनबोर्डिंग पूरी करके, ड्राइवर ऐप को सक्रिय करके, किसी असाइनमेंट को स्वीकार करके या क्लिकइट असाइनमेंट पूरा करके, आप पुष्टि करते हैं कि आपने इस अनुबंध को पढ़, समझ और स्वीकार कर लिया है।"
      ]
    },
    {
      num: 2,
      title: "स्वतंत्र ड्राइवर पार्टनर संबंध (INDEPENDENT DRIVER PARTNER RELATIONSHIP)",
      content: [
        "जब तक कि कोई अलग लिखित रोजगार अनुबंध स्पष्ट रूप से अन्यथा न कहे, आप क्लिकइट प्लेटफॉर्म पर एक स्वतंत्र सेवा प्रदाता (Independent Service Provider) के रूप में भाग लेते हैं, न कि क्लिकइट के कर्मचारी, भागीदार, एजेंट या प्रतिनिधि के रूप में।",
        "आप यह तय करने के लिए स्वयं जिम्मेदार हैं कि कब ऑनलाइन रहना है और ड्राइवर ऐप के लागू स्वीकृति व रद्दीकरण नियमों के अधीन, आपको उपलब्ध कराए गए असाइनमेंट को स्वीकार करना है या नहीं।",
        "इस अनुबंध में कुछ भी आपको क्लिकइट की ओर से कोई भी प्रतिनिधित्व, वारंटी, प्रतिबद्धता या अनुबंध करने के लिए अधिकृत नहीं करता है।",
        "आप अपने स्वयं के आयकर, जीएसटी या अन्य कानूनी कर दायित्वों, पंजीकरण और रिटर्न दाखिल करने के लिए जिम्मेदार हैं, सिवाय उस सीमा के जहां कानून द्वारा क्लिकइट को कोई राशि काटने, एकत्र करने या रिपोर्ट करने की आवश्यकता होती है।"
      ]
    },
    {
      num: 3,
      title: "ड्राइवर पात्रता और ऑनबोर्डिंग (DRIVER ELIGIBILITY AND ONBOARDING)",
      content: [
        "आपको पंजीकरण और सत्यापन के दौरान सही, पूर्ण और वर्तमान जानकारी प्रदान करनी होगी।",
        "आपको संबंधित वाहन/सेवा श्रेणी और स्थान के लिए क्लिकइट द्वारा बताई गई पात्रता शर्तों को पूरा करना होगा।",
        "आपको ऑनबोर्डिंग, सुरक्षा, धोखाधड़ी रोकथाम या कानूनी अनुपालन के लिए वैध पहचान/केवाईसी (KYC) जानकारी और दस्तावेज प्रदान करने होंगे।",
        "क्लिकइट सीधे या अधिकृत तृतीय पक्षों के माध्यम से दस्तावेजों का सत्यापन कर सकता है और समय-समय पर पुनः सत्यापन या अद्यतन दस्तावेजों की मांग कर सकता है।",
        "जाली, परिवर्तित, समाप्त (Expired) या भ्रामक दस्तावेज जमा करने पर खाता तत्काल निलंबित या समाप्त किया जा सकता है और कानूनन रिपोर्ट किया जा सकता है।"
      ]
    },
    {
      num: 4,
      title: "वाहन और दस्तावेज आवश्यकताएं (VEHICLE AND DOCUMENT REQUIREMENTS)",
      content: [
        "आपको केवल उसी वाहन का उपयोग करना होगा जो संबंधित क्लिकइट सेवा श्रेणी के लिए पंजीकृत और स्वीकृत है।",
        "आपको वाहन और सेवा के लिए लागू कानून द्वारा आवश्यक सभी लाइसेंस, पंजीकरण प्रमाण पत्र (RC), परमिट, फिटनेस प्रमाण पत्र, प्रदूषण नियंत्रण (PUC) प्रमाण पत्र, बीमा और अन्य दस्तावेज चालू रखने होंगे।",
        "आपको यह सुनिश्चित करना होगा कि वाहन सड़क पर चलने योग्य (Roadworthy), साफ, सुरक्षित और सौंपे गए माल के लिए उपयुक्त है।",
        "आपको अपने खाते के माध्यम से किसी अनधिकृत वाहन, स्थानापन्न (Substitute) ड्राइवर या गैर-स्वीकृत व्यक्ति का उपयोग करने की सख्त मनाही है।",
        "ड्राइविंग लाइसेंस, वाहन दस्तावेजों या बीमा को प्रभावित करने वाले किसी भी निलंबन, समाप्ति, रद्दीकरण या बदलाव की सूचना तुरंत क्लिकइट को देनी होगी।"
      ]
    },
    {
      num: 5,
      title: "ड्राइवर ऐप और खाता सुरक्षा (DRIVER APP AND ACCOUNT SECURITY)",
      content: [
        "आपका ड्राइवर ऐप खाता आपका व्यक्तिगत है। आपको अपना खाता किसी अन्य व्यक्ति को बेचने, किराए पर देने, उधार देने, साझा करने या उपयोग करने की अनुमति नहीं है।",
        "आपको ओटीपी (OTP), पासवर्ड, डिवाइस एक्सेस और अन्य खाता क्रेडेंशियल्स की सुरक्षा करनी होगी।",
        "आपको जीपीएस (GPS), ट्रिप स्थिति, ऑनलाइन/ऑफलाइन स्थिति, किराया जानकारी, वॉलेट बैलेंस, रेटिंग या प्लेटफॉर्म डेटा में कोई हेरफेर (Manipulate) नहीं करना चाहिए।",
        "आपको असाइनमेंट प्राप्त करने या प्लेटफॉर्म में हस्तक्षेप करने के लिए स्वचालित टूल, स्क्रिप्ट, बॉट या अनधिकृत तकनीकी तरीकों का उपयोग नहीं करना चाहिए।",
        "खाते में किसी भी संदिग्ध छेड़छाड़ की सूचना तुरंत क्लिकइट को दी जानी चाहिए।"
      ]
    },
    {
      num: 6,
      title: "असाइनमेंट और स्वीकृति (ASSIGNMENTS AND ACCEPTANCE)",
      content: [
        "उपलब्धता, स्थान, वाहन श्रेणी, ग्राहक आवश्यकताओं, परिचालन नियमों और प्लेटफॉर्म द्वारा उपयोग किए जाने वाले अन्य कारकों के आधार पर असाइनमेंट पेश किए जा सकते हैं।",
        "आप लागू ऐप नियमों के अधीन असाइनमेंट स्वीकार या अस्वीकार कर सकते हैं। बार-बार हेरफेर, गलत स्वीकृति, जानबूझकर काम न करना या दुरुपयोगी रद्दीकरण पैटर्न समीक्षा या कार्रवाई का कारण बन सकते हैं।",
        "एक बार असाइनमेंट स्वीकार करने के बाद, आपको बुकिंग विवरण के अनुसार इसे सुरक्षित रूप से पूरा करने के लिए उचित प्रयास करने होंगे।",
        "आपको असाइनमेंट स्वीकार करके उसे पूरा करने के लिए ग्राहक से अतिरिक्त पैसों की अनधिकृत मांग नहीं करनी चाहिए।"
      ]
    },
    {
      num: 7,
      title: "किराया, कमाई, कमीशन और कटौतियां (FARE, EARNINGS, COMMISSION AND DEDUCTIONS)",
      content: [
        "आपका लागू ड्राइवर किराया/कमाई, प्लेटफॉर्म कमीशन, शुल्क, प्रोत्साहन (Incentives), बोनस और अन्य व्यावसायिक शर्तें ड्राइवर ऐप या लागू योजना शर्तों के माध्यम से प्रदर्शित की जाएंगी।",
        "क्लिकइट आपके वॉलेट/खाता शेष से कानूनी रूप से देय कमीशन, प्लेटफॉर्म शुल्क, सब्सक्रिप्शन शुल्क, जुर्माना या अन्य राशियों की कटौती कर सकता है।",
        "आपको देय राशियों पर सरकारी कर, वैधानिक कटौतियां या टीडीएस (TDS) आवश्यकताएं लागू हो सकती हैं।",
        "सत्यापन के बाद क्लिकइट गणना त्रुटियों, धोखाधड़ी वाले क्रेडिट या दोहरे भुगतानों को ठीक कर सकता है और गलत तरीके से क्रेडिट की गई राशियों को वसूल सकता है।",
        "किराया संरचना, कमीशन दरें, प्रोत्साहन और सब्सक्रिप्शन योजनाओं को लागू अनुबंध शर्तों और कानून के अधीन क्लिकइट द्वारा भविष्योन्मुखी रूप से बदला जा सकता है।"
      ]
    },
    {
      num: 8,
      title: "ड्राइवर वॉलेट / खाता शेष (DRIVER WALLET / ACCOUNT BALANCE)",
      content: [
        "जहां ड्राइवर ऐप वॉलेट या खाता शेष प्रदान करता है, वह अनुमत क्लिकइट लेनदेन के लिए एक आंतरिक प्लेटफॉर्म बैलेंस है और कोई बैंक खाता या जमा नहीं है।",
        "आपको गैर-कानूनी लेनदेन के लिए वॉलेट का उपयोग नहीं करना चाहिए और न ही इसके शेष में हेरफेर या धोखाधड़ी से वृद्धि करने का प्रयास करना चाहिए।",
        "क्लिकइट इस अनुबंध के तहत देय कमीशन, सब्सक्रिप्शन शुल्क, प्लेटफॉर्म शुल्क या अन्य राशियों को दर्ज और काट सकता है।",
        "यदि शेष राशि नकारात्मक हो जाती है या कोई राशि देय होती है, तो क्लिकइट असाइनमेंट को प्रतिबंधित कर सकता है और कानूनी माध्यमों से बकाया राशि वसूल सकता है।",
        "कोई भी रिफंड, निकासी या ट्रांसफर सुविधा केवल वहीं उपलब्ध होगी जहां क्लिकइट द्वारा स्पष्ट रूप से प्रदान की गई हो।"
      ]
    },
    {
      num: 9,
      title: "ग्राहक और पैकेज हैंडलिंग (CUSTOMER AND PACKAGE HANDLING)",
      content: [
        "आपको बुकिंग विवरण और अधिकृत निर्देशों के अनुसार ही पैकेज एकत्र (Pickup) और वितरित (Deliver) करना होगा।",
        "आपको पैकेज को खोलना, उपभोग करना, निरीक्षण करना, बदलना, हटाना, छिपाना या दुरुपयोग नहीं करना चाहिए, सिवाय जहां सुरक्षा, कानूनी सत्यापन या आपात स्थिति के लिए आवश्यक हो।",
        "आपको परिवहन के दौरान पैकेजों को उचित सावधानी से संभालना चाहिए और सुरक्षित तरीकों का उपयोग करना चाहिए।",
        "आपको ग्राहक से अनावश्यक व्यक्तिगत जानकारी मांगने का कोई अधिकार नहीं है।",
        "आपको किसी भी पैकेज को डाइवर्ट, बेचना, अपने पास रखना, गिरवी रखना या छोड़ना नहीं चाहिए।",
        "किसी भी नुकसान, चोरी, छेड़छाड़, रिसाव, प्रतिबंधित सामान या गंभीर घटना की सूचना तुरंत क्लिकइट को दी जानी चाहिए।"
      ]
    },
    {
      num: 10,
      title: "प्रतिबंधित सामान और अवैध गतिविधियां (PROHIBITED GOODS AND ILLEGAL ACTIVITIES)",
      content: [
        "आपको कानून द्वारा या क्लिकइट नीति द्वारा प्रतिबंधित सामानों को जानबूझकर स्वीकार या परिवहन नहीं करना चाहिए, जिसमें अवैध ड्रग्स या नियंत्रित पदार्थ, विस्फोटक, अवैध हथियार, गोला-बारूद, खतरनाक सामग्री, चोरी या नकली सामान शामिल हैं।",
        "यदि आपको संदेह है कि कोई पैकेज अवैध, खतरनाक या गलत तरीके से घोषित है, तो सुरक्षित होने पर लेनदेन रोकें और क्लिकइट सपोर्ट या उपयुक्त प्राधिकरण से संपर्क करें।",
        "आपको तस्करी, धोखाधड़ी, मनी लॉन्ड्रिंग, चोरी या किसी अन्य गैर-कानूनी गतिविधि के लिए क्लिकइट असाइनमेंट का उपयोग नहीं करना चाहिए।"
      ]
    },
    {
      num: 11,
      title: "ग्राहक आचरण और पेशेवर व्यवहार (CUSTOMER CONDUCT AND PROFESSIONAL BEHAVIOUR)",
      content: [
        "आपको ग्राहकों, प्राप्तकर्ताओं, विक्रेताओं, सुरक्षा कर्मियों, अन्य ड्राइवरों और क्लिकइट कर्मियों के प्रति पेशेवर और सम्मानपूर्वक व्यवहार करना होगा।",
        "उत्पीड़न, धमकी, डराना, भेदभाव, शारीरिक हिंसा, दुर्व्यवहार, अभद्र भाषा या ग्राहक के खिलाफ प्रतिशोध सख्त वर्जित है।",
        "आपको सेवा की शर्त के रूप में ग्राहकों से अनधिकृत टिप, अतिरिक्त शुल्क या व्यक्तिगत एहसान नहीं मांगना चाहिए।",
        "असाइनमेंट पूरा करने के लिए आवश्यक या कानून द्वारा अनुमत के अलावा ग्राहक के संपर्क विवरण, पते, पैकेज जानकारी या तस्वीरों को साझा नहीं करना चाहिए।"
      ]
    },
    {
      num: 12,
      title: "सुरक्षा और सड़क नियमों का अनुपालन (SAFETY AND ROAD COMPLIANCE)",
      content: [
        "आपको हर समय लागू यातायात, परिवहन, सुरक्षा और सड़क नियमों का पालन करना होगा।",
        "नशे की हालत में, अत्यधिक थकान में या वाहन चलाने के लिए अयोग्य होने पर गाड़ी न चलाएं।",
        "वाहन चलाते समय यातायात नियमों द्वारा निषिद्ध तरीके से मोबाइल फोन का उपयोग न करें।",
        "वाहन को ओवरलोड न करें और न ही असुरक्षित तरीके से माल का परिवहन करें।",
        "सुरक्षित लोडिंग और परिवहन के लिए अपने नियंत्रण की सीमा तक आप स्वयं जिम्मेदार हैं। सुरक्षा चिंता होने पर क्लिकइट पहुंच को निलंबित कर सकता है।"
      ]
    },
    {
      num: 13,
      title: "दुर्घटनाएं, ब्रेकडाउन और आपात स्थिति (ACCIDENTS, BREAKDOWNS AND EMERGENCIES)",
      content: [
        "दुर्घटना, ब्रेकडाउन, चोरी, चिकित्सा आपात स्थिति या अन्य गंभीर घटना की स्थिति में, सबसे पहले जीवन और सुरक्षा की रक्षा के लिए उचित कदम उठाएं और आपातकालीन सेवाओं से संपर्क करें।",
        "आपको यथाशीघ्र क्लिकइट को घटनाओं की रिपोर्ट करनी होगी और सटीक विवरण व सहायक दस्तावेज प्रदान करने होंगे।",
        "घटना से संबंधित दायित्व स्वीकार न करें, तथ्यों को न गढ़ें और न ही साक्ष्य नष्ट करें।",
        "क्लिकइट घटना प्रबंधन और दावों के लिए तस्वीरें, स्थान रिकॉर्ड, पुलिस दस्तावेज, बीमा विवरण आदि मांग सकता है।"
      ]
    },
    {
      num: 14,
      title: "नकद संग्रह और भुगतान (CASH COLLECTION AND PAYMENT)",
      content: [
        "जहां नकद संग्रह (Cash on Delivery) सक्षम है, आपको केवल ड्राइवर ऐप के माध्यम से दिखाई गई या अधिकृत राशि ही एकत्र करनी होगी।",
        "अनधिकृत शुल्क की मांग न करें, देय राशि में बदलाव न करें, गलत भुगतान पुष्टि जारी न करें या समाधान प्रक्रिया से परे नकदी अपने पास न रखें।",
        "आपको नकद संग्रह को सटीक रूप से रिकॉर्ड करना होगा और क्लिकइट के निपटान निर्देशों का पालन करना होगा।",
        "नकदी की कमी, विवादित संग्रह या संदिग्ध धोखाधड़ी की जांच की जा सकती है और लागू नियमों के अनुसार समायोजित किया जा सकता है।"
      ]
    },
    {
      num: 15,
      title: "ग्राहक गोपनीयता और डेटा सुरक्षा (CUSTOMER PRIVACY AND DATA PROTECTION)",
      content: [
        "आपको केवल असाइनमेंट निष्पादित करने के लिए ग्राहक जानकारी जैसे नाम, फोन नंबर, पिकअप पता, डिलीवरी पता और बुकिंग जानकारी तक पहुंच प्राप्त हो सकती है।",
        "आपको ऐसी जानकारी का उपयोग केवल असाइनमेंट पूरा करने के लिए करना चाहिए और इसे व्यक्तिगत या व्यावसायिक उपयोग के लिए रखना, कॉपी करना या बेचना नहीं चाहिए।",
        "असाइनमेंट या कानूनी रिकॉर्ड के लिए आवश्यकता न होने पर ग्राहक की जानकारी को व्यक्तिगत उपकरणों से सुरक्षित रूप से हटा दें।",
        "क्लिकइट अपनी गोपनीयता नीति और डेटा संरक्षण कानूनों के तहत ऑनबोर्डिंग, सुरक्षा, भुगतान और कानूनी अनुपालन के लिए आपकी व्यक्तिगत जानकारी को संसाधित कर सकता है। इलेक्ट्रॉनिक्स एवं सूचना प्रौद्योगिकी मंत्रालय (MeitY) द्वारा DPDP Rules, 2025 अधिसूचित किए गए हैं।"
      ]
    },
    {
      num: 16,
      title: "रेटिंग, शिकायतें और जांच (RATINGS, COMPLAINTS AND INVESTIGATIONS)",
      content: [
        "ग्राहक पूरे किए गए असाइनमेंट के बारे में रेटिंग या फीडबैक दे सकते हैं।",
        "क्लिकइट कदाचार या सेवा विफलताओं की जांच के लिए शिकायतों, रेटिंग, जीपीएस/ट्रिप रिकॉर्ड, संचार, भुगतान रिकॉर्ड और तस्वीरों की समीक्षा कर सकता है।",
        "आपको उचित जांच में ईमानदारी से सहयोग करना चाहिए और उचित समय के भीतर मांगी गई जानकारी प्रदान करनी चाहिए।",
        "गंभीर आरोपों (विशेषकर सुरक्षा, धोखाधड़ी या चोरी) की जांच करते समय क्लिकइट असाइनमेंट को अस्थायी रूप से प्रतिबंधित कर सकता है।"
      ]
    },
    {
      num: 17,
      title: "निलंबन और निष्क्रियता (SUSPENSION AND DEACTIVATION)",
      content: [
        "धोखाधड़ी, खाता साझा करना, दस्तावेज़ों की कमी, असुरक्षित ड्राइविंग, गंभीर शिकायतें, चोरी, पैकेज का दुरुपयोग, प्रतिबंधित सामान, गैर-कानूनी आचरण या इस अनुबंध के उल्लंघन पर क्लिकइट आपकी पहुंच को अस्थायी रूप से निलंबित या स्थायी रूप से निष्क्रिय कर सकता है।",
        "जहां उचित हो, विवादित मामलों पर अंतिम निर्णय से पहले क्लिकइट स्पष्टीकरण या साक्ष्य प्रस्तुत करने का अवसर प्रदान कर सकता है।",
        "निलंबन या निष्क्रियता से वैध भुगतान, गोपनीयता या डेटा-संरक्षण दायित्व स्वतः समाप्त नहीं होते हैं।",
        "इस खंड में कुछ भी आपको किसी भी गैर-छूट योग्य कानूनी अधिकार या उपाय का उपयोग करने से नहीं रोकता है।"
      ]
    },
    {
      num: 18,
      title: "बीमा और व्यक्तिगत जिम्मेदारी (INSURANCE AND PERSONAL RESPONSIBILITY)",
      content: [
        "आपको अपने वाहन और सेवा के लिए लागू कानून द्वारा आवश्यक बीमा चालू रखना होगा और ऐसी बीमा शर्तों का पालन करना होगा।",
        "जहां क्लिकइट या कोई तीसरा पक्ष किसी असाइनमेंट के लिए अतिरिक्त बीमा प्रदान करता है, वह लागू पॉलिसी शर्तों, सीमाओं और दावा प्रक्रियाओं के अधीन होगा।",
        "आप अपने वाहन, व्यक्तिगत उपकरण, वैध ड्राइविंग आचरण और वैधानिक आवश्यकताओं के अनुपालन के लिए स्वयं जिम्मेदार रहेंगे।"
      ]
    },
    {
      num: 19,
      title: "बौद्धिक संपदा और ब्रांड उपयोग (INTELLECTUAL PROPERTY AND BRAND USE)",
      content: [
        "क्लिकइट नाम, लोगो, ड्राइवर ऐप, सॉफ्टवेयर, सिस्टम और अन्य बौद्धिक संपदा में सभी अधिकार क्लिकइट के पास सुरक्षित हैं।",
        "आप क्लिकइट ब्रांडिंग, वर्दी, स्टिकर का उपयोग केवल क्लिकइट द्वारा अधिकृत तरीके से ही कर सकते हैं।",
        "आपको स्पष्ट रूप से अधिकृत किए बिना स्वयं को क्लिकइट का मालिक, कर्मचारी, निदेशक या अधिकृत प्रवक्ता के रूप में प्रस्तुत नहीं करना चाहिए।"
      ]
    },
    {
      num: 20,
      title: "गोपनीयता (CONFIDENTIALITY)",
      content: [
        "आपको क्लिकइट के माध्यम से प्राप्त गैर-सार्वजनिक जानकारी (ग्राहक जानकारी, मूल्य निर्धारण प्रणाली, परिचालन प्रक्रियाएं, आंतरिक संचार आदि) को गोपनीय रखना होगा।",
        "यह दायित्व उस जानकारी पर लागू नहीं होता है जो कानूनी रूप से सार्वजनिक है या कानून द्वारा प्रकट की जानी चाहिए।"
      ]
    },
    {
      num: 21,
      title: "क्षतिपूर्ति और देयता (INDEMNITY AND LIABILITY)",
      content: [
        "कानून द्वारा अनुमत सीमा तक, आप अपने द्वारा किए गए कपट (Fraud), जानबूझकर किए गए कदाचार, गैर-कानूनी आचरण, पैकेजों के दुरुपयोग, अनुबंध के उल्लंघन या सुरक्षा आवश्यकताओं के उल्लंघन से होने वाले नुकसान, दावों और जुर्माने के लिए जिम्मेदार हैं।",
        "क्लिकइट कानून द्वारा अनिवार्य देयता को सीमित या बहिष्कृत नहीं करता है।",
        "इस अनुबंध में कुछ भी आपको ऐसी किसी देयता को हस्तांतरित नहीं करता है जो कानूनी रूप से केवल क्लिकइट की है।"
      ]
    },
    {
      num: 22,
      title: "अवधि, निकास और अंतिम निपटान (TERM, EXIT AND FINAL SETTLEMENT)",
      content: [
        "यह अनुबंध तब शुरू होता है जब आप इसे इलेक्ट्रॉनिक रूप से स्वीकार करते हैं और जब तक आपका खाता सक्रिय रहता है, तब तक जारी रहता है।",
        "आप सक्रिय असाइनमेंट को पूरा करके और बकाया राशि का निपटान करके खाता बंद करने का अनुरोध कर सकते हैं।",
        "क्लिकइट गंभीर उल्लंघन, धोखाधड़ी, सुरक्षा चिंताओं या अन्य वैध कारणों से अनुबंध को समाप्त कर सकता है।",
        "समाप्ति पर, आपको क्लिकइट की संपत्ति, ब्रांडिंग और ग्राहक डेटा का उपयोग बंद करना होगा और बकाया राशि का निपटान करना होगा।"
      ]
    },
    {
      num: 23,
      title: "लागू कानून और विवाद (GOVERNING LAW AND DISPUTES)",
      content: [
        "यह अनुबंध भारत के कानूनों द्वारा शासित है।",
        "पक्षों को पहले क्लिकइट सपोर्ट या इसकी निर्दिष्ट शिकायत निवारण प्रक्रिया के माध्यम से विवादों को सुलझाने का प्रयास करना चाहिए।",
        "जहां मध्यस्थता उचित और सहमत हो, विवाद को मध्यस्थता और सुलह अधिनियम, 1996 (Arbitration and Conciliation Act, 1996) के तहत मध्यस्थता के लिए भेजा जा सकता है।",
        "इस खंड में कुछ भी किसी भी पक्ष को किसी सक्षम प्राधिकारी या अदालत के समक्ष वैधानिक उपाय का उपयोग करने से नहीं रोकता है।"
      ]
    },
    {
      num: 24,
      title: "इस अनुबंध में संशोधन (CHANGES TO THIS AGREEMENT)",
      content: [
        "कानून, सेवाओं, प्रौद्योगिकी, सुरक्षा मानकों या संचालन में बदलाव को दर्शाने के लिए क्लिकइट इस अनुबंध को अपडेट कर सकता है।",
        "महत्वपूर्ण परिवर्तनों की सूचना ड्राइवर ऐप या अन्य उचित माध्यमों से दी जाएगी।",
        "अपडेट किए गए अनुबंध की प्रभावी तिथि के बाद ड्राइवर ऐप का आपका निरंतर उपयोग नए अनुबंध की स्वीकृति माना जाएगा।"
      ]
    },
    {
      num: 25,
      title: "इलेक्ट्रॉनिक स्वीकृति (ELECTRONIC ACCEPTANCE)",
      content: [
        "\"मैं सहमत हूँ\" (I Agree) का चयन करके, ओटीपी दर्ज करके, इलेक्ट्रॉनिक रूप से हस्ताक्षर करके, अपना ड्राइवर ऐप खाता सक्रिय करके या असाइनमेंट स्वीकार करके, आप स्वीकार करते हैं कि यह अनुबंध आपको उपलब्ध कराया गया है और आप इससे बाध्य होने के लिए सहमत हैं।",
        "स्वीकृति के साक्ष्य के रूप में इलेक्ट्रॉनिक रिकॉर्ड, टाइमस्टैम्प और डिवाइस जानकारी बनाए रखी जा सकती है।"
      ]
    },
    {
      num: 26,
      title: "कंपनी विवरण और संपर्क (COMPANY DETAILS AND CONTACT)",
      content: [
        "ब्रांड (Brand): Clickit",
        "कानूनी इकाई (Legal Entity): Promovers Logistics Solutions Private Limited",
        "जीएसटीआईएन (GSTIN): 08AARCP1294R1ZD",
        "सीआईएन (CIN): U52290RJ2026PTC114862",
        "पंजीकृत कार्यालय (Registered Office): B-18-A, Ground Floor, Shiv Marg, Bani Park, Jaipur 302016, Rajasthan, India",
        "ड्राइवर सपोर्ट ईमेल: partners@clickitlogistics.in",
        "ड्राइवर सपोर्ट फोन: +91 1800 203 4567",
        "शिकायत निवारण अधिकारी ईमेल: grievance@clickitlogistics.in",
        "प्रभावी तिथि: 15 सितम्बर 2026",
        "संस्करण (Version): 1.0"
      ]
    }
  ];

  const currentSections = lang === 'hi' ? sectionsHi : sectionsEn;

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 font-sans pb-24">
      {/* Top Header / Breadcrumb Bar with Language Switcher */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/90 sticky top-0 z-20 backdrop-blur-md py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate ? onNavigate('/') : window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-[#00a6c7] transition-colors"
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
                    ? 'bg-[#00a6c7] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLangChange('hi')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  lang === 'hi'
                    ? 'bg-[#00a6c7] text-white shadow-sm'
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
            <Globe className="w-4 h-4 text-[#00a6c7] shrink-0" />
            <span>{lang === 'hi' ? 'मोबाइल ऐप डेवलपर्स के लिए इन-ऐप यूआरएल:' : 'In-App URL for mobile app developers:'}</span>
            <code className="bg-black px-2 py-0.5 rounded text-orange-400 font-mono text-[11px] select-all">
              /driver-agreement?lang={lang}
            </code>
          </div>
          <span className="text-zinc-500 text-[11px]">
            {companyDetails.version}
          </span>
        </div>

        {/* Page Title & Corporate Header */}
        <header className="mb-10 border-b border-zinc-800 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" /> CLICKIT • DRIVER APP
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            {lang === 'hi' ? 'ड्राइवर पार्टनर अनुबंध' : 'Driver Partner Agreement'}
          </h1>
          <p className="text-zinc-400 text-sm">
            {companyDetails.version}
          </p>

          {/* Official Corporate Entity Table */}
          <div className="mt-6 bg-[#12141C] border border-zinc-800 rounded-xl overflow-hidden text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-zinc-800/80">
              <div className="p-3 bg-zinc-900/60 font-semibold text-zinc-400 border-b sm:border-b-0 sm:border-r border-zinc-800/80">
                {lang === 'hi' ? 'ब्रांड (Brand)' : 'Brand'}
              </div>
              <div className="p-3 sm:col-span-2 text-white font-bold text-[#00a6c7]">
                {companyDetails.brand}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-zinc-800/80">
              <div className="p-3 bg-zinc-900/60 font-semibold text-zinc-400 border-b sm:border-b-0 sm:border-r border-zinc-800/80">
                {lang === 'hi' ? 'कानूनी इकाई (Legal Entity)' : 'Legal Entity'}
              </div>
              <div className="p-3 sm:col-span-2 text-white font-medium">
                {companyDetails.legalEntity}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-zinc-800/80">
              <div className="p-3 bg-zinc-900/60 font-semibold text-zinc-400 border-b sm:border-b-0 sm:border-r border-zinc-800/80">
                GSTIN
              </div>
              <div className="p-3 sm:col-span-2 text-zinc-200 font-mono">
                {companyDetails.gstin}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-zinc-800/80">
              <div className="p-3 bg-zinc-900/60 font-semibold text-zinc-400 border-b sm:border-b-0 sm:border-r border-zinc-800/80">
                CIN
              </div>
              <div className="p-3 sm:col-span-2 text-zinc-200 font-mono">
                {companyDetails.cin}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3">
              <div className="p-3 bg-zinc-900/60 font-semibold text-zinc-400 border-b sm:border-b-0 sm:border-r border-zinc-800/80">
                {lang === 'hi' ? 'पंजीकृत कार्यालय (Registered Office)' : 'Registered Office'}
              </div>
              <div className="p-3 sm:col-span-2 text-zinc-300 leading-relaxed">
                {companyDetails.registeredOffice}
              </div>
            </div>
          </div>
        </header>

        {/* 26 Complete Agreement Clauses */}
        <div className="space-y-6">
          {currentSections.map((sec) => (
            <section
              key={sec.num}
              className="bg-[#12141C] border border-zinc-800/90 hover:border-zinc-700/80 rounded-2xl p-6 sm:p-7 shadow-sm transition-all"
            >
              <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-start gap-2.5">
                <span className="text-[#00a6c7] font-black shrink-0">{sec.num}.</span>
                <span className="uppercase tracking-wide leading-snug">{sec.title}</span>
              </h2>

              <div className="space-y-3 pl-5 sm:pl-6 border-l-2 border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {sec.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Driver Partner Acknowledgement Form (Exact from Document Page 5 & 6) */}
        <div className="mt-12 bg-gradient-to-b from-[#151824] to-[#10121A] border-2 border-orange-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-6 h-6 text-[#00a6c7]" />
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide">
              {lang === 'hi' ? 'ड्राइवर पार्टनर पावती (DRIVER PARTNER ACKNOWLEDGEMENT)' : 'DRIVER PARTNER ACKNOWLEDGEMENT'}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
            {lang === 'hi'
              ? 'मैं पुष्टि करता हूँ कि मैंने इस ड्राइवर पार्टनर अनुबंध और लागू क्लिकइट नीतियों को पढ़ और समझ लिया है। मैं पुष्टि करता हूँ कि मेरे द्वारा प्रस्तुत जानकारी और दस्तावेज़ सत्य और वैध हैं। मैं लागू कानून, सुरक्षा आवश्यकताओं, क्लिकइट नीतियों और इस अनुबंध में दिए गए दायित्वों का पालन करने के लिए सहमत हूँ।'
              : 'I confirm that I have read and understood this Driver Partner Agreement and the applicable Clickit policies. I confirm that the information and documents submitted by me are true and valid. I agree to comply with applicable law, safety requirements, Clickit policies and the obligations in this Agreement.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
            <div className="bg-black/40 border border-zinc-800 p-3.5 rounded-xl">
              <span className="text-zinc-500 block text-[11px] font-semibold uppercase">Driver Partner Name</span>
              <div className="h-6 border-b border-dashed border-zinc-700 mt-1 text-zinc-400">
                [Recorded on App Registration]
              </div>
            </div>

            <div className="bg-black/40 border border-zinc-800 p-3.5 rounded-xl">
              <span className="text-zinc-500 block text-[11px] font-semibold uppercase">Mobile Number</span>
              <div className="h-6 border-b border-dashed border-zinc-700 mt-1 text-zinc-400">
                [Verified via OTP]
              </div>
            </div>

            <div className="bg-black/40 border border-zinc-800 p-3.5 rounded-xl">
              <span className="text-zinc-500 block text-[11px] font-semibold uppercase">Driver Partner ID</span>
              <div className="h-6 border-b border-dashed border-zinc-700 mt-1 text-zinc-400">
                [Generated in Driver App]
              </div>
            </div>

            <div className="bg-black/40 border border-zinc-800 p-3.5 rounded-xl">
              <span className="text-zinc-500 block text-[11px] font-semibold uppercase">Vehicle Number</span>
              <div className="h-6 border-b border-dashed border-zinc-700 mt-1 text-zinc-400">
                [Commercial RC Verified]
              </div>
            </div>

            <div className="bg-black/40 border border-zinc-800 p-3.5 rounded-xl">
              <span className="text-zinc-500 block text-[11px] font-semibold uppercase">Vehicle Type</span>
              <div className="h-6 border-b border-dashed border-zinc-700 mt-1 text-zinc-400">
                [Selected Fleet Category]
              </div>
            </div>

            <div className="bg-black/40 border border-zinc-800 p-3.5 rounded-xl">
              <span className="text-zinc-500 block text-[11px] font-semibold uppercase">Driving Licence No.</span>
              <div className="h-6 border-b border-dashed border-zinc-700 mt-1 text-zinc-400">
                [Transport DL Verified]
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-orange-300">
              <span className="font-bold">Signature / Electronic Acceptance: </span>
              <span>Accepted via in-app "I Agree" toggle & OTP confirmation</span>
            </div>
            <div className="text-zinc-400 shrink-0">
              Place: Jaipur, Rajasthan
            </div>
          </div>
        </div>

        {/* IMPORTANT LEGAL REVIEW NOTE (Exact from Document Page 6) */}
        <div className="mt-8 p-5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-400 space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-wider text-[11px]">
            <Info className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Important Legal Review Note</span>
          </div>
          <p className="leading-relaxed">
            This is a production-oriented commercial agreement for Clickit’s Driver App. The Ministry of Road Transport and Highways published the Motor Vehicle Aggregator Guidelines 2025, which expressly contemplate an agreement between an aggregator and driver specifying rights and obligations.
          </p>
        </div>
      </div>
    </div>
  );
}
