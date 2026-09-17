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
  CreditCard,
  UserCheck,
  Award
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

  const content = {
    en: {
      badge: "Driver Partner Legal Terms",
      title: "Driver Partner Agreement",
      subtitle: "ClickIt Logistics Independent Delivery Partner Terms of Service",
      lastUpdated: "Last Updated: 15th Sept 2026",
      effectiveDate: "Effective Date: Immediate upon App Registration",
      intro: "This Delivery Partner Agreement (\"Agreement\", \"Terms\") constitutes a legally binding contract between you (an independent commercial driver, fleet operator, or courier partner, hereinafter referred to as \"Driver Partner\", \"You\", or \"Partner\") and Clickit Delivery Network Pvt. Ltd. (\"ClickIt\", \"Company\", \"We\", \"Us\"). By downloading, registering, or accepting trip requests through the ClickIt Driver Mobile Application (\"Driver App\"), you acknowledge and agree to abide by all the terms, policies, and conditions set forth herein.",
      developerNote: "In-App URL for mobile app developers:",
      sections: [
        {
          num: "1",
          title: "Nature of Relationship: Independent Contractor",
          desc: "You expressly acknowledge and agree that your relationship with ClickIt is strictly that of an independent contractor and business partner, on a principal-to-principal basis.",
          points: [
            "No Employment Relationship: Nothing in this Agreement creates any employer-employee, agency, joint venture, or partnership relationship between ClickIt and the Driver Partner.",
            "Work Flexibility: As an independent contractor, you retain the complete freedom to decide when to log in ('On Duty'), how many hours to operate, and when to go offline.",
            "No Minimum Hours: There is no mandatory shift or minimum hours obligation, subject to meeting active quality benchmarks on accepted orders.",
            "Multi-Platform Freedom: You are free to provide delivery services on other platforms or independently, provided you do not use ClickIt customers or confidential order information for unauthorized offline deals."
          ]
        },
        {
          num: "2",
          title: "Eligibility, Onboarding & Vehicle Documentation",
          desc: "To be activated and maintain active duty status on the ClickIt Driver App, you must satisfy all statutory eligibility criteria under the Indian Motor Vehicles Act, 1988, and submit valid documentation.",
          points: [
            "Age & Identity: You must be at least 18 years of age and hold a valid Aadhaar Card, PAN Card, and active Indian bank account/UPI ID.",
            "Driving License: Valid Commercial Driving License (or Transport / LMV / HMV endorsement as applicable to your vehicle category).",
            "Vehicle Registration: Original Registration Certificate (RC) showing valid commercial registration (yellow commercial plate where mandatory under state transport guidelines).",
            "Fitness, Insurance & PUC: Valid Vehicle Fitness Certificate, active Commercial Third-Party & Comprehensive Motor Insurance, and updated Pollution Under Control (PUC) certificate.",
            "Police Verification: Willingness to undergo background screening and police verification as required by state transport authorities."
          ]
        },
        {
          num: "3",
          title: "Order Acceptance, Pickup & Delivery Protocol",
          desc: "Once logged in as 'On Duty' on the Driver App, you will receive real-time delivery requests matched by ClickIt's dispatch algorithm.",
          points: [
            "Order Details: Each request displays estimated fare, pickup location, drop location, approximate distance, and cargo category.",
            "Acceptance Window: You have a limited timer (usually 30 to 45 seconds) to accept an incoming delivery order.",
            "Pickup Navigation: Once accepted, you must immediately proceed to the pickup location using the Driver App GPS navigation.",
            "Secure OTP Verification: You MUST verify the 4-digit Pickup OTP with the sender before loading the goods, and obtain the 4-digit Delivery OTP from the receiver upon safe handover. Never hand over cargo without OTP confirmation.",
            "Proof of Delivery (POD): The receiver's digital signature or photograph of unloaded cargo must be captured in the app where prompted."
          ]
        },
        {
          num: "4",
          title: "Fare Calculation, Platform Commission & Payout Schedule",
          desc: "ClickIt operates a transparent fare structure with automated settlements directly into your verified bank account or UPI.",
          points: [
            "Fare Components: Total trip fare is calculated based on Base Fare, Per-Kilometer Rate, Time/Waiting Charges (if applicable), and Helper/Loading add-on (if selected by customer).",
            "Platform Fee / Commission: ClickIt deducts a competitive platform technology facilitation fee (typically 10% to 15% plus applicable GST) from the gross trip fare.",
            "TDS Compliance: Mandatory Tax Deducted at Source (TDS under Section 194C/194-O of the Income Tax Act) is deducted and credited against your PAN number with quarterly Form 16A certificates.",
            "Payout Schedule: Earnings from completed digital trips are settled automatically to your registered bank account on a Daily or Weekly payout cycle (processed within 24 hours of settlement cutoff).",
            "Cash on Delivery (COD): For cash bookings, you collect the exact fare shown on the Driver App. Any platform commission balance is adjusted against your digital wallet."
          ]
        },
        {
          num: "5",
          title: "Toll Taxes, Parking & Extra Loading Charges",
          desc: "Clear guidelines regarding out-of-pocket highway expenses and loading-unloading labor.",
          points: [
            "Highway Tolls & State Border Tax: All fastag tolls and entry taxes incurred during an active trip with goods loaded are borne by the customer and automatically added to the digital invoice.",
            "Loading / Unloading: Standard drivers are not required to lift heavy commercial goods unless the customer has selected and paid for the 'Driver Loading Assistance' or 'Helper' option in the app.",
            "Waiting Time: Free loading/unloading waiting time is provided (15 mins for 2W/3W; 25 mins for 7ft/8ft trucks; 45 mins for large containers). Waiting exceeding this limit is billed automatically to the customer per minute."
          ]
        },
        {
          num: "6",
          title: "Cargo Inspection & Strictly Prohibited Goods",
          desc: "You must never knowingly accept, carry, or transport any illegal, contraband, or unauthorized goods on ClickIt.",
          points: [
            "Strictly Banned Items: Narcotics, psychotropic drugs, unlicensed firearms, ammunition, explosives, radioactive substances, flammable liquids/gas cylinders, unpackaged acid, counterfeit currency, bullion, or wildlife products.",
            "Right to Inspect: You have the right to visually inspect the external packaging of any consignment before loading. If goods appear suspicious, hazardous, or emit chemical fumes, refuse pickup and immediately report via the Driver App Emergency button.",
            "No Unauthorized Passengers: Never allow passengers, friends, or hitchhikers to ride inside cargo vehicle containers during an active trip.",
            "Legal Liability: The carriage of illegal contraband carries immediate termination of ClickIt account and full reporting to law enforcement authorities."
          ]
        },
        {
          num: "7",
          title: "Code of Conduct, Road Safety & Zero Tolerance",
          desc: "ClickIt holds its delivery fleet to the highest standards of professionalism, respect, and road safety.",
          points: [
            "Zero Tolerance on Alcohol/Drugs: Driving under the influence of alcohol, drugs, or intoxicating substances results in permanent blacklisting and legal action.",
            "Customer Courtesy: Treat all senders, receivers, and security guards with respect and courtesy. Verbal abuse, threats, or physical altercations are strictly prohibited.",
            "Road Traffic Rules: Strictly follow speed limits, traffic signals, seatbelt/helmet mandates, and avoid reckless overtaking or mobile phone use while driving.",
            "No Solicitation of Offline Orders: Asking customers for cash outside the app or attempting to bypass ClickIt platform bookings is considered commercial fraud."
          ]
        },
        {
          num: "8",
          title: "Trip Cancellations, Penalties & Reliability Score",
          desc: "Maintaining high order completion rates ensures fair dispatch and prevents customer inconvenience.",
          points: [
            "Driver-Initiated Cancellations: Cancelling trips after acceptance without a genuine emergency (e.g. vehicle breakdown) negatively impacts your Driver Acceptance Rating.",
            "Excessive Cancellations: Frequent unprompted cancellations may lead to temporary duty timeout (1 to 2 hours lock) or reduction in priority order dispatch.",
            "Customer Cancellation Compensation: If a customer cancels an order after you have arrived at the pickup location and marked 'Reached', a statutory Cancellation Fee is credited to your driver wallet.",
            "Customer Not Reachable: If the receiver is unreachable at the delivery destination for over 20 minutes, contact Driver Support for authorized return shipment procedures."
          ]
        },
        {
          num: "9",
          title: "Insurance, Accidental Cover & Vehicle Care",
          desc: "Safety and security for our Driver Partners and in-transit cargo.",
          points: [
            "Group Accidental Cover: Active ClickIt Driver Partners are covered under an accidental medical and death insurance policy during active online trip duty, subject to policy terms.",
            "Vehicle Maintenance: You are solely responsible for keeping your vehicle in roadworthy condition, including brakes, tires, lights, and valid fitness certification.",
            "Cargo Damage: In cases of proven gross negligence, rash driving resulting in cargo damage, or cargo theft, the Driver Partner will be held liable in accordance with the Carriers Act."
          ]
        },
        {
          num: "10",
          title: "Account Suspension, Deactivation & Dispute Resolution",
          desc: "Clear and fair processes governing account reviews and dispute resolution.",
          points: [
            "Grounds for Deactivation: Document expiry, fraudulent GPS spoofing, low customer ratings (< 4.2 stars over 50 trips), safety violations, or customer harassment.",
            "Right to Fair Appeal: If your account is temporarily suspended, you have the right to request a formal review by submitting your explanation to the ClickIt Partner Support team within 7 days.",
            "Governing Law: This Agreement is governed by the laws of India.",
            "Exclusive Jurisdiction: The competent courts at Jaipur, Rajasthan, India, shall have exclusive jurisdiction over all disputes arising under this Agreement."
          ]
        },
        {
          num: "11",
          title: "Partner Support Helpline & Grievance Officer",
          desc: "For any queries, payout assistance, roadside breakdown, or grievance redressal, contact our dedicated partner team:",
          points: [
            "Driver Partner Toll-Free Helpline: +91 1800 203 4567 (Available 24/7 in Hindi & English)",
            "Driver Support Email: partners@clickitlogistics.in",
            "Jaipur Logistics Operations Hub: Clickit Delivery Network Pvt. Ltd., Plot No. 42, Transport Nagar, Jaipur, Rajasthan 302004",
            "Grievance Officer: Mr. Rajesh Sharma, Head of Partner Fleet Operations (Email: partner.grievance@clickitlogistics.in)"
          ]
        }
      ]
    },
    hi: {
      badge: "डिलीवरी पार्टनर कानूनी नियम व शर्तें",
      title: "ड्राइवर पार्टनर अनुबंध (Driver Agreement)",
      subtitle: "क्लिकइट लॉजिस्टिक्स स्वतंत्र डिलीवरी पार्टनर सेवा शर्तें व नियम",
      lastUpdated: "अंतिम संशोधन: 15 सितम्बर 2026",
      effectiveDate: "प्रभावी तिथि: ड्राइवर ऐप पर रजिस्ट्रेशन के समय से प्रभावी",
      intro: "यह डिलीवरी पार्टनर अनुबंध (\"अनुबंध\", \"शर्तें\") आपके (स्वतंत्र वाणिज्यिक वाहन चालक, फ्लीट मालिक या कूरियर पार्टनर, जिसे आगे \"ड्राइवर पार्टनर\", \"आप\", या \"पार्टनर\" कहा जाएगा) और Clickit Delivery Network Pvt. Ltd. (\"ClickIt\", \"क्लिकइट\", \"कंपनी\", \"हम\") के बीच एक कानूनी रूप से बाध्यकारी समझौता है। ClickIt Driver Mobile App (\"ड्राइवर ऐप\") को डाउनलोड, रजिस्टर या उपयोग करके और डिलीवरी ऑर्डर स्वीकार करके, आप इसमें दिए गए सभी नियमों और शर्तों से पूर्णतः सहमत होते हैं।",
      developerNote: "मोबाइल ऐप डेवलपर्स के लिए इन-ऐप यूआरएल:",
      sections: [
        {
          num: "1",
          title: "संबंध की प्रकृति: स्वतंत्र ठेकेदार (Independent Contractor)",
          desc: "आप स्पष्ट रूप से स्वीकार करते हैं कि क्लिकइट के साथ आपका संबंध एक स्वतंत्र पार्टनर और ऑपरेटर का है, न कि किसी कर्मचारी या नौकर का।",
          points: [
            "कोई नौकरी/रोजगार संबंध नहीं: यह अनुबंध क्लिकइट और आपके बीच किसी भी प्रकार का नियोक्ता-कर्मचारी (Employer-Employee) संबंध स्थापित नहीं करता है।",
            "काम करने की पूरी आजादी: एक स्वतंत्र पार्टनर के रूप में आप स्वयं तय करते हैं कि आपको कब ऐप पर 'ऑन ड्यूटी' (On Duty) आना है और कब ऑफलाइन होना है।",
            "कोई अनिवार्य न्यूनतम घंटे नहीं: काम के लिए कोई बाध्यकारी न्यूनतम घंटे या निश्चित शिफ्ट नहीं है।",
            "अन्य प्लेटफॉर्म पर काम की स्वतंत्रता: आप अन्य लॉजिस्टिक्स कंपनियों या स्वतंत्र रूप से भी काम करने के लिए पूरी तरह स्वतंत्र हैं, बशर्ते आप क्लिकइट के ग्राहकों का डेटा अवैध ऑफलाइन सौदों के लिए उपयोग न करें।"
          ]
        },
        {
          num: "2",
          title: "पात्रता, रजिस्ट्रेशन और वाहन के आवश्यक दस्तावेज",
          desc: "क्लिकइट ड्राइवर ऐप पर अपनी आईडी एक्टिव करने और चलाने के लिए भारतीय मोटर वाहन अधिनियम (Motor Vehicles Act) के तहत वैध दस्तावेज होना अनिवार्य है।",
          points: [
            "आयु एवं पहचान पत्र: आपकी आयु कम से कम 18 वर्ष होनी चाहिए और आपके पास वैध आधार कार्ड, पैन कार्ड और बैंक खाता/UPI होना आवश्यक है।",
            "ड्राइविंग लाइसेंस (DL): वैध वाणिज्यिक/ट्रांसपोर्ट ड्राइविंग लाइसेंस (वाहन श्रेणी के अनुसार कमर्शियल एलएमवी या एचएमवी)।",
            "वाहन का रजिस्ट्रेशन (RC): वैध कमर्शियल आरसी (पीली नंबर प्लेट जहां राज्य परिवहन नियमों में अनिवार्य है)।",
            "फिटनेस, बीमा (Insurance) एवं प्रदूषण (PUC): वैध वाहन फिटनेस सर्टिफिकेट, चालू कमर्शियल थर्ड-पार्टी व व्यापक मोटर बीमा, और अपडेटेड पीयूसी (PUC)।",
            "पुलिस वेरिफिकेशन: राज्य परिवहन नियमों के अनुसार बैकग्राउंड वेरिफिकेशन और चरित्र सत्यापन की सहमति।"
          ]
        },
        {
          num: "3",
          title: "ऑर्डर स्वीकृति, पिकअप और सुरक्षित डिलीवरी नियम",
          desc: "ऐप पर ऑन ड्यूटी होने पर आपको क्लिकइट सिस्टम द्वारा सबसे नजदीकी डिलीवरी ऑर्डर भेजे जाते हैं।",
          points: [
            "ऑर्डर की पूरी जानकारी: प्रत्येक ऑर्डर स्क्रीन पर अनुमानित किराया, पिकअप पता, ड्रॉप पता, कुल दूरी और माल का प्रकार स्पष्ट दिखाई देता है।",
            "ऑर्डर स्वीकार करने का समय: स्क्रीन पर ऑर्डर आने पर 30 से 45 सेकंड के भीतर ऑर्डर स्वीकार करना होता है।",
            "पिकअप नेविगेशन: ऑर्डर स्वीकार करने के बाद तुरंत ऐप के मैप नेविगेशन के अनुसार पिकअप पते पर पहुंचें।",
            "अनिवार्य ओटीपी (OTP) वेरिफिकेशन: माल लोड करने से पहले माल भेजने वाले से 4-अंकों का पिकअप ओटीपी सत्यापित करें, और डिलीवरी पते पर माल उतारने के बाद रिसीवर से 4-अंकों का डिलीवरी ओटीपी अवश्य दर्ज करें। बिना ओटीपी माल कभी न छोड़ें।",
            "प्रूफ ऑफ डिलीवरी (POD): आवश्यकता पड़ने पर ऐप में उतारे गए माल की फोटो या रिसीवर के डिजिटल हस्ताक्षर लें।"
          ]
        },
        {
          num: "4",
          title: "किराया गणना, कमीशन और बैंक खाते में भुगतान",
          desc: "क्लिकइट पारदर्शी किराया प्रणाली का पालन करता है और आपकी पूरी कमाई सीधे आपके बैंक खाते या यूपीआई में भेजता है।",
          points: [
            "किराए के घटक: कुल किराया बेस फेयर (शुरुआती किराया), प्रति किलोमीटर दर, वेटिंग चार्ज (यदि लागू हो) और हेल्पर शुल्क (यदि ग्राहक ने चुना हो) को जोड़कर तय होता है।",
            "प्लेटफॉर्म शुल्क (कमीशन): क्लिकइट सकल ट्रिप किराए से 10% से 15% का वाजिब प्लेटफॉर्म सुविधा शुल्क और नियमानुसार जीएसटी काटता है।",
            "टीडीएस (TDS) कटौती: आयकर अधिनियम की धारा 194C/194-O के तहत अनिवार्य टीडीएस काटकर आपके पैन नंबर पर जमा किया जाता है, जिसका फॉर्म 16A आपको तिमाही मिलता है।",
            "भुगतान चक्र (Payouts): डिजिटल भुगतान वाली ट्रिप की कमाई दैनिक (Daily) या साप्ताहिक (Weekly) सीधे आपके बैंक खाते में 24 घंटे के भीतर भेज दी जाती है।",
            "कैश बुकिंग (COD): कैश ऑर्डर में ग्राहक से ऐप पर दिखाया गया सटीक किराया नकद प्राप्त करें। कंपनी का कमीशन आपके ऐप वॉलेट से स्वतः समायोजित होता है।"
          ]
        },
        {
          num: "5",
          title: "टोल टैक्स, पार्किंग और लोडिंग-अनलोडिंग नियम",
          desc: "रास्ते के खर्चों और हम्माली/लोडिंग के स्पष्ट नियम:",
          points: [
            "टोल टैक्स एवं बॉर्डर टैक्स: ट्रिप के दौरान माल ले जाते समय फास्टैग (FASTag) से कटा हुआ टोल या राज्य प्रवेश कर ग्राहक के बिल में जुड़ता है और ड्राइवर को वापस मिलता है।",
            "लोडिंग और अनलोडिंग: भारी माल चढ़ाना-उतारना ड्राइवर की जिम्मेदारी नहीं है, जब तक कि ग्राहक ने ऐप में अतिरिक्त शुल्क देकर 'लोडिंग सहायता' या 'हेल्पर' का विकल्प न चुना हो।",
            "फ्री वेटिंग टाइम: पिकअप और ड्रॉप पर माल चढ़ाने-उतारने के लिए फ्री समय मिलता है (छोटा हाथी/पिकअप के लिए 25 मिनट, बड़े ट्रक के लिए 45 मिनट)। इससे ज्यादा देर होने पर प्रति मिनट वेटिंग चार्ज ग्राहक पर लगता है।"
          ]
        },
        {
          num: "6",
          title: "सामान की जांच और पूर्णतः प्रतिबंधित सामग्री",
          desc: "क्लिकइट प्लेटफॉर्म पर किसी भी अवैध या गैर-कानूनी सामग्री को ले जाना सख्त मना है।",
          points: [
            "सख्त प्रतिबंधित सामान: नशीले पदार्थ, अवैध हथियार, गोला-बारूद, पटाखे/विस्फोटक, रेडियोधर्मी पदार्थ, ज्वलनशील तेजाब/गैस सिलेंडर, नकली नोट, सोना-चांदी के अवैध बिस्किट, या वन्यजीव उत्पाद।",
            "सामान देखने का अधिकार: आपको माल लोड करने से पहले बाहरी पैकेजिंग की जांच करने का पूरा अधिकार है। यदि कोई सामान संदिग्ध, खतरनाक या जहरीला लगे तो तुरंत मना करें और ऐप से सूचना दें।",
            "अनाधिकृत सवारी पर रोक: कमर्शियल माल वाहक वाहन में माल ले जाते समय किसी भी अनजान व्यक्ति को लिफ्ट न दें।",
            "कानूनी देयता: अवैध सामग्री ले जाने पर आईडी तुरंत ब्लॉक होगी और पुलिस व कानून प्रवर्तन एजेंसियों को सूचना दी जाएगी।"
          ]
        },
        {
          num: "7",
          title: "सड़क सुरक्षा, नशा निषेध और ग्राहक शिष्टाचार",
          desc: "क्लिकइट सभी ड्राइवर पार्टनर्स से सड़क पर उच्च आचरण और सुरक्षा की अपेक्षा रखता है।",
          points: [
            "शराब व नशीले पदार्थों पर जीरो टॉलरेंस: शराब पीकर गाड़ी चलाना या ड्यूटी के दौरान नशा करना पाए जाने पर आईडी स्थायी रूप से ब्लैकलिस्ट कर दी जाएगी।",
            "ग्राहक के साथ सम्मानजनक व्यवहार: माल भेजने वाले और पाने वाले के साथ हमेशा नम्रता और सम्मान से बात करें। गाली-गलौज या विवाद करने पर सख्त कार्रवाई होगी।",
            "यातायात नियमों का पालन: स्पीड लिमिट, ट्रैफिक लाइट, सीटबेल्ट/हेलमेट का पालन करें और वाहन चलाते समय मोबाइल पर अनावश्यक बात न करें।",
            "ऑफलाइन बुकिंग पर रोक: ग्राहक से ऐप के बाहर सीधे कैश लेन-देन करने या कमीशन चुराने का प्रयास धोखाधड़ी माना जाता है।"
          ]
        },
        {
          num: "8",
          title: "ऑर्डर रद्दीकरण, जुर्माना और ड्राइवर रेटिंग",
          desc: "ग्राहकों को बेहतर सेवा देने और समय की बचत के लिए रद्दीकरण नियम:",
          points: [
            "ड्राइवर द्वारा ट्रिप रद्द करना: बिना किसी वाजिब कारण (जैसे गाड़ी खराब होना) के बार-बार ट्रिप रद्द करने से आपकी ड्राइवर रेटिंग घटती है।",
            "अत्यधिक रद्दीकरण पर रोक: लगातार ऑर्डर ठुकराने या रद्द करने पर ऐप 1-2 घंटे के लिए टाइमआउट मोड में जा सकता है।",
            "ग्राहक द्वारा ऑर्डर रद्द होने पर मुआवजा: यदि आप पिकअप लोकेशन पर पहुंच चुके हैं ('Reached' मार्क कर चुके हैं) और ग्राहक ऑर्डर रद्द करता है, तो आपके वॉलेट में रद्दीकरण शुल्क (Cancellation Fee) जमा किया जाता है।",
            "रिसीवर का फोन न मिलने पर: ड्रॉप लोकेशन पर यदि रिसीवर 20 मिनट तक फोन न उठाए, तो सपोर्ट टीम से बात करके ही आगे का कदम उठाएं।"
          ]
        },
        {
          num: "9",
          title: "बीमा सुरक्षा, दुर्घटना कवर और माल का नुकसान",
          desc: "ड्राइवर भाई की सुरक्षा और माल की हिफाजत:",
          points: [
            "दुर्घटना बीमा कवर: क्लिकइट पर एक्टिव ड्यूटी के दौरान पात्र ड्राइवर पार्टनर्स को दुर्घटना चिकित्सा एवं मृत्यु बीमा कवर प्रदान किया जाता है।",
            "वाहन का रखरखाव: अपने वाहन के ब्रेक, टायर, लाइट, और तकनीकी स्थिति दुरुस्त रखना आपकी स्वयं की जिम्मेदारी है।",
            "लापरवाही से माल का नुकसान: यदि लापरवाही या खतरनाक ड्राइविंग के कारण माल को नुकसान पहुंचता है, तो कैरियर्स एक्ट के तहत समीक्षा की जाएगी।"
          ]
        },
        {
          num: "10",
          title: "खाता निलंबन, ब्लॉकलिस्ट और विवाद समाधान",
          desc: "आईडी ब्लॉक होने के कारण और निष्पक्ष अपील प्रक्रिया:",
          points: [
            "आईडी ब्लॉक होने के कारण: दस्तावेजों की समय-सीमा समाप्त होना, जीपीएस लोकेशन के साथ छेड़छाड़, खराब रेटिंग (< 4.2 स्टार), या ग्राहक के साथ अभद्रता।",
            "अपील करने का अधिकार: यदि आपकी आईडी अस्थायी रूप से बंद हुई है, तो आप 7 दिनों के भीतर सपोर्ट टीम को अपनी बात रखकर समीक्षा का अनुरोध कर सकते हैं।",
            "लागू कानून: यह अनुबंध पूरी तरह भारत सरकार और राजस्थान राज्य के कानूनों के अधीन है।",
            "न्यायालय क्षेत्राधिकार: इस अनुबंध से जुड़े किसी भी विवाद के निपटारे के लिए केवल जयपुर, राजस्थान स्थित न्यायालयों को ही अधिकार होगा।"
          ]
        },
        {
          num: "11",
          title: "पार्टनर हेल्पलाइन और शिकायत निवारण अधिकारी",
          desc: "किसी भी समस्या, भुगतान सहायता, सड़क पर गाड़ी खराब होने या शिकायत के लिए हमारे पार्टनर सपोर्ट से संपर्क करें:",
          points: [
            "ड्राइवर पार्टनर टोल-फ्री हेल्पलाइन: +91 1800 203 4567 (हिन्दी व अंग्रेजी में 24/7 उपलब्ध)",
            "ड्राइवर सहायता ईमेल: partners@clickitlogistics.in",
            "जयपुर फ्लीट ऑपरेशंस हब: Clickit Delivery Network Pvt. Ltd., प्लॉट नं. 42, ट्रांसपोर्ट नगर, जयपुर, राजस्थान 302004",
            "शिकायत निवारण अधिकारी: श्री राजेश शर्मा, हेड - पार्टनर ऑपरेशंस (Email: partner.grievance@clickitlogistics.in)"
          ]
        }
      ]
    }
  };

  const current = content[lang];

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
              /driver-agreement?lang={lang}
            </code>
          </div>
          <span className="text-zinc-500 text-[11px]">
            {lang === 'hi' ? 'ड्राइवर ऐप नियम व शर्तों हेतु तैयार' : 'Play Store & In-App KYC Compliant'}
          </span>
        </div>

        {/* Page Title & Intro */}
        <header className="mb-10 border-b border-zinc-800 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5" /> {current.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {current.title}
          </h1>
          <p className="text-zinc-400 font-medium text-sm sm:text-base">
            {current.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
            <span>{current.lastUpdated}</span>
            <span>•</span>
            <span className="text-orange-400/90">{current.effectiveDate}</span>
          </div>
        </header>

        {/* Intro Card */}
        <div className="bg-[#12141C] border border-zinc-800 rounded-2xl p-6 mb-10 shadow-md">
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            {current.intro}
          </p>
        </div>

        {/* Contract Clauses */}
        <div className="space-y-8">
          {current.sections.map((section) => (
            <section
              key={section.num}
              className="bg-[#12141C] border border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-sm transition-all hover:border-zinc-700"
            >
              <div className="flex items-start gap-3.5 mb-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#FF5D00] text-white font-black text-xs shrink-0 mt-0.5 shadow-sm">
                  {section.num}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {section.title}
                </h2>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-4 pl-10">
                {section.desc}
              </p>

              <div className="space-y-2.5 pl-10">
                {section.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5D00] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Signature / Acceptance Notice */}
        <div className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-zinc-900 border border-orange-500/20 rounded-2xl text-center space-y-3">
          <Shield className="w-8 h-8 text-[#FF5D00] mx-auto" />
          <h3 className="text-base font-bold text-white">
            {lang === 'hi' ? 'क्लिकइट डिलीवरी पार्टनर सुरक्षा व सम्मान' : 'ClickIt Driver Partner Commitment'}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'क्लिकइट परिवार का हिस्सा बनने के लिए आपका धन्यवाद। हम आपके परिश्रम का पूरा सम्मान करते हैं और सुरक्षित, पारदर्शी एवं बेहतर कमाई के अवसर प्रदान करने के लिए प्रतिबद्ध हैं।'
              : 'Thank you for being an esteemed partner in the ClickIt logistics fleet. We are dedicated to providing fair earnings, timely bank payouts, and comprehensive partner protection.'}
          </p>
          <div className="pt-2 text-xs text-zinc-500">
            Clickit Delivery Network Pvt. Ltd. • Jaipur, Rajasthan
          </div>
        </div>
      </div>
    </div>
  );
}
