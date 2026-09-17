import React, { useState, useMemo } from "react";
import { 
  ArrowLeft, 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageSquare, 
  ChevronDown,
  Search,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  UserCheck,
  AlertTriangle,
  FileText,
  Headphones,
  ExternalLink
} from "lucide-react";

interface HelpSupportProps {
  onNavigate?: (path: string) => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  bulletPoints?: string[];
  category: string;
  tag?: string;
}

export default function HelpSupport({ onNavigate }: HelpSupportProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>("get-started-2"); // Default open one helpful item

  const categories = [
    { id: "all", name: "All Topics", icon: HelpCircle },
    { id: "getting-started", name: "Getting Started", icon: CheckCircle2 },
    { id: "booking-orders", name: "Booking & Tracking", icon: Truck },
    { id: "payments-invoicing", name: "Payments & GST", icon: CreditCard },
    { id: "partner-support", name: "Partner & Driver Help", icon: UserCheck },
    { id: "account-security", name: "Account & Security", icon: ShieldCheck },
    { id: "issues-claims", name: "Issues & Claims", icon: AlertTriangle },
  ];

  const faqs: FAQItem[] = [
    // Getting Started
    {
      id: "get-started-1",
      category: "getting-started",
      question: "How do I create a ClickIt customer or business account?",
      answer: "Creating an account on ClickIt is instant and 100% digital. You can register on the web or download the ClickIt Mobile App.",
      bulletPoints: [
        "Enter your 10-digit Indian mobile phone number.",
        "Verify instantly with the 4-digit SMS OTP.",
        "Provide your Name or Business Name and set a default pickup address.",
        "Add your Company GSTIN (optional) if you need automated input tax credit invoices."
      ],
      tag: "Account Setup"
    },
    {
      id: "get-started-2",
      category: "getting-started",
      question: "How do I book my first delivery on ClickIt?",
      answer: "Booking on-demand logistics takes less than 60 seconds with our streamlined 4-step dispatch system:",
      bulletPoints: [
        "Select your vehicle: Choose between 2-Wheeler (documents/parcels), 3-Wheeler Loader, Tata Ace (7ft), Pickup (8ft/9ft), or Heavy 14ft-19ft Trucks.",
        "Enter pickup and drop locations with receiver's contact details.",
        "Review upfront transparent pricing — zero hidden charges or unexpected surges.",
        "Confirm your booking. Our smart dispatch engine allocates the closest verified driver partner in under 2 minutes with live GPS tracking."
      ],
      tag: "Popular"
    },
    {
      id: "get-started-3",
      category: "getting-started",
      question: "How are trip fares and estimates calculated?",
      answer: "ClickIt follows a completely transparent, distance-and-vehicle-based pricing model:",
      bulletPoints: [
        "Base Fare: Covers minimum initial kilometers and vehicle mobilization.",
        "Per-KM Rate: A fixed standard rate per additional kilometer according to vehicle category.",
        "Loading / Waiting Time: Free initial 30–45 mins loading buffer included with commercial trucks.",
        "Tolls & Parking: Automatically itemized if applicable, with zero arbitrary markups."
      ],
      tag: "Pricing"
    },
    {
      id: "get-started-4",
      category: "getting-started",
      question: "What goods and items are permissible to transport?",
      answer: "ClickIt handles all standard commercial goods, wholesale shipments, electronics, consumer goods, apparel, and hardware.",
      bulletPoints: [
        "Permitted: Retail inventory, e-commerce parcels, industrial equipment, textile bales, grocery stock, and appliances.",
        "Strictly Prohibited: Hazardous flammable chemicals, explosives, illegal contraband, live animals, or weapons under applicable transport laws."
      ],
      tag: "Policy"
    },

    // Booking & Orders
    {
      id: "booking-1",
      category: "booking-orders",
      question: "How do I track my delivery in real-time?",
      answer: "Once a driver partner is allocated, a live tracking link is generated and sent via SMS to both sender and recipient. You can view vehicle live GPS movements, exact route status, driver contact number, and ETA directly inside the app or browser tracking page."
    },
    {
      id: "booking-2",
      category: "booking-orders",
      question: "Can I modify drop locations or cancel a booking?",
      answer: "Yes, you have full flexibility over your booking before pickup:",
      bulletPoints: [
        "Free Cancellation: You can cancel free of charge before the driver partner arrives at the pickup address.",
        "Modify Route / Drop Points: You can adjust the destination or add multiple drop stops directly in the live order screen before vehicle departure."
      ],
      tag: "Flexibility"
    },
    {
      id: "booking-3",
      category: "booking-orders",
      question: "What should I do if my assigned driver partner is delayed?",
      answer: "Our intelligent dispatch engine monitors trip progress continuously. If a driver is delayed due to city traffic:",
      bulletPoints: [
        "Call the driver directly via the in-app call button for an immediate status update.",
        "If delayed beyond 15 minutes, tap 'Reassign Driver' to instantly assign another nearest vehicle without extra charges.",
        "Reach our live logistics helpline (1800-CLICKIT-LOGISTICS) for priority operational escalation."
      ]
    },
    {
      id: "booking-4",
      category: "booking-orders",
      question: "How does multi-stop delivery work for retail and B2B orders?",
      answer: "ClickIt allows you to configure up to 5 drop locations in a single trip. Perfect for distributors, retailers, and e-commerce deliveries with route optimization to save up to 40% on logistics costs."
    },

    // Payments & Invoicing
    {
      id: "payments-1",
      category: "payments-invoicing",
      question: "What payment methods are supported on ClickIt?",
      answer: "We support a wide variety of secure payment methods for individuals and enterprises:",
      bulletPoints: [
        "UPI: Instant payment via Google Pay, PhonePe, Paytm, BHIM, or any UPI app.",
        "Cards & Netbanking: Visa, MasterCard, RuPay debit/credit cards and 50+ netbanking portals.",
        "Cash on Delivery / Receiver Pay: Option for sender or consignee to pay in cash upon delivery.",
        "ClickIt Prepaid Wallet & Corporate Credit: Enterprise billing with monthly credit cycles."
      ]
    },
    {
      id: "payments-2",
      category: "payments-invoicing",
      question: "How do I download my GST tax invoices?",
      answer: "GST invoices are automatically generated upon trip completion. You can download them instantly from 'Order History' -> 'View Invoice' or receive them in PDF format directly on your registered business email."
    },
    {
      id: "payments-3",
      category: "payments-invoicing",
      question: "What is ClickIt's refund policy for cancelled or failed trips?",
      answer: "Refunds for eligible cancellations or failed trip allocations are processed automatically: UPI & Wallet refunds are credited instantly; debit/credit card refunds reflect in your bank account within 2 to 4 business days."
    },

    // Partner Support
    {
      id: "partner-1",
      category: "partner-support",
      question: "How do I register as a ClickIt Driver Partner?",
      answer: "Joining ClickIt as a transport partner is fast and hassle-free:",
      bulletPoints: [
        "Download the ClickIt Partner App on Android or iOS.",
        "Submit required documents: Driving License (DL), Vehicle RC, Insurance Certificate, and Aadhaar Card.",
        "Document verification is completed within 2 to 4 business hours.",
        "Start accepting nearby trip requests immediately upon approval."
      ],
      tag: "Earn with Us"
    },
    {
      id: "partner-2",
      category: "partner-support",
      question: "When and how do Driver Partners receive trip earnings?",
      answer: "ClickIt provides daily automated UPI settlement. All trip earnings, customer tips, and daily performance incentives are transferred directly to your registered bank account every morning by 8:00 AM."
    },
    {
      id: "partner-3",
      category: "partner-support",
      question: "What should I do if my KYC documents get rejected?",
      answer: "If any document is unclear or expired, the Partner App will notify you of the specific reason. Re-upload a clear, well-lit photo of the original document, or visit the nearest ClickIt Partner Onboarding Center for in-person verification assistance."
    },

    // Account & Security
    {
      id: "account-1",
      category: "account-security",
      question: "How do I update my business GSTIN or billing profile?",
      answer: "Navigate to Account Settings -> Business Profile. Enter your verified 15-digit GSTIN number, legal entity name, and registered state tax address. All subsequent invoices will reflect your GSTIN for seamless input tax credit (ITC) claims."
    },
    {
      id: "account-2",
      category: "account-security",
      question: "How is my personal and shipment data kept secure?",
      answer: "ClickIt employs end-to-end 256-bit SSL encryption for all transaction data. Phone numbers between customers and drivers are masked to protect customer privacy and security."
    },

    // Issues & Claims
    {
      id: "issues-1",
      category: "issues-claims",
      question: "What should I do in case of damaged or lost goods during transit?",
      answer: "All commercial shipments transported via ClickIt are backed by our comprehensive Transit Protection policy:",
      bulletPoints: [
        "Immediately take high-resolution photos/videos of the damaged goods before releasing the vehicle.",
        "Report the issue via the active trip screen by selecting 'Report Damage/Loss' or email support@justclickit.in within 24 hours.",
        "Our dedicated claims resolution desk reviews inspection reports and processes reimbursement claims within 48 to 72 business hours."
      ],
      tag: "Protection"
    },
    {
      id: "issues-2",
      category: "issues-claims",
      question: "How do I escalate an unresolved dispute or driver misbehavior?",
      answer: "We uphold a zero-tolerance policy against misconduct, unauthorized surcharges, or unprofessional behavior. You can lodge an escalation via our 24/7 dedicated escalation desk at grievance@justclickit.in or contact the Grievance Officer directly."
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      const matchesSearch = 
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.bulletPoints && faq.bulletPoints.some(bp => bp.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 font-sans pb-24 selection:bg-orange-500/30 selection:text-orange-200">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/80 sticky top-0 z-30 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate ? onNavigate('/') : window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-[#FF5D00] transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-zinc-900"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5D00]" /> Back to Main App
          </button>
          <div className="inline-flex items-center gap-2 text-xs text-orange-400 font-semibold bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20 shadow-sm">
            <Headphones className="w-3.5 h-3.5 text-orange-400" /> 24/7 Priority Logistics Helpdesk
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Hero Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <HelpCircle className="w-4 h-4 text-[#FF5D00]" />
            Official ClickIt Help Center &amp; FAQs
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How can we help you today?
          </h1>
          <p className="text-sm sm:text-base text-zinc-400">
            Find answers to common questions about bookings, transparent fares, live tracking, GST invoices, and partner onboarding.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mt-6">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers (e.g. tracking, cancellation, GST invoice, driver partner)..."
              className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-lg transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </header>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar pt-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-[#FF5D00] text-white border-[#FF5D00] shadow-md shadow-orange-500/20"
                    : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-zinc-400"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Questions & Answers Accordion Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF5D00]" />
              Frequently Answered Questions
              <span className="text-xs text-zinc-500 font-normal ml-2">({filteredFaqs.length} results)</span>
            </h2>
            <button
              onClick={() => {
                if (expandedId) {
                  setExpandedId(null);
                } else if (filteredFaqs.length > 0) {
                  setExpandedId(filteredFaqs[0].id);
                }
              }}
              className="text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              {expandedId ? "Collapse All" : "Expand First"}
            </button>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="bg-[#12141C] border border-zinc-800/80 rounded-2xl p-10 text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-zinc-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No matching answers found</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                We couldn't find an answer matching "{searchQuery}". You can browse categories or speak directly with our 24/7 support team.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white rounded-xl transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = expandedId === faq.id;
                return (
                  <div
                    key={faq.id}
                    id={`faq-${faq.id}`}
                    className={`bg-[#12141C] border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-orange-500/60 shadow-lg shadow-orange-500/5 ring-1 ring-orange-500/20"
                        : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="space-y-1.5 pr-2">
                        <div className="flex items-center gap-2">
                          {faq.tag && (
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                              {faq.tag}
                            </span>
                          )}
                          <span className="text-[11px] text-zinc-500 capitalize">
                            {faq.category.replace("-", " ")}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`p-1.5 rounded-full mt-1 shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-orange-500 text-white rotate-180" : "bg-zinc-800/80 text-zinc-400"
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 border-t border-zinc-800/60 space-y-3">
                        <p className="leading-relaxed text-zinc-300 pt-2 font-normal">
                          {faq.answer}
                        </p>
                        {faq.bulletPoints && (
                          <ul className="space-y-2 pl-2 pt-1">
                            {faq.bulletPoints.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                                <span className="text-[#FF5D00] font-bold mt-1 text-xs shrink-0">•</span>
                                <span className="leading-relaxed">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Still Need Help? Direct Support Channels */}
        <section className="bg-gradient-to-br from-[#12141C] to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-[#FF5D00]" /> Still have questions? Contact Support
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Our logistics coordinators and support specialists are active 24 hours a day, 7 days a week.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Agents Online
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Email Support */}
            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800/80 hover:border-orange-500/40 transition-colors space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-400 font-medium">Email Support</div>
              <div className="text-sm font-bold text-white break-all">support@justclickit.in</div>
              <p className="text-[11px] text-zinc-500">Average response time: &lt; 15 mins</p>
            </div>

            {/* Toll-Free Phone */}
            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800/80 hover:border-orange-500/40 transition-colors space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-400 font-medium">Toll-Free Helpline</div>
              <div className="text-sm font-bold text-white">1800-CLICKIT-LOGISTICS</div>
              <p className="text-[11px] text-zinc-500">Available 24x7 for active trips</p>
            </div>

            {/* In-App Live Chat */}
            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800/80 hover:border-orange-500/40 transition-colors space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-400 font-medium">In-App Live Chat</div>
              <div className="text-sm font-bold text-white">Instant Bot &amp; Agent</div>
              <p className="text-[11px] text-zinc-500">Accessible from active trip view</p>
            </div>

            {/* Grievance & Escalations */}
            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800/80 hover:border-orange-500/40 transition-colors space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-400 font-medium">Grievance Officer</div>
              <div className="text-sm font-bold text-white break-all">grievance@justclickit.in</div>
              <p className="text-[11px] text-zinc-500">Statutory IT escalation cell</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
